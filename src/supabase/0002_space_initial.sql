-- =========================================
-- 1. テーブル作成 (スペース系)
-- =========================================

-- スペース実体 (t_space)
CREATE TABLE public.t_space (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    display_name varchar NOT NULL,
    description text,
    owner_id uuid NOT NULL REFERENCES public.t_profile(id),
    is_personal boolean DEFAULT false,
    avatar_url text,
    created_at timestamp DEFAULT now(),
    created_by uuid REFERENCES public.t_profile(id),
    created_kino_id text,
    updated_at timestamp DEFAULT now(),
    updated_by uuid REFERENCES public.t_profile(id),
    updated_kino_id text,
    deleted_at timestamp
);

-- スペースリレーション (r_space)
CREATE TABLE public.r_space (
    profile_id uuid REFERENCES public.t_profile(id) ON DELETE CASCADE,
    space_id uuid REFERENCES public.t_space(id) ON DELETE CASCADE,
    role varchar NOT NULL CHECK (role IN ('admin', 'member')),
    status varchar NOT NULL CHECK (status IN ('active', 'inviting', 'left')),
    created_at timestamp DEFAULT now(),
    created_by uuid REFERENCES public.t_profile(id),
    created_kino_id text,
    updated_at timestamp DEFAULT now(),
    updated_by uuid REFERENCES public.t_profile(id),
    updated_kino_id text,
    deleted_at timestamp,
    PRIMARY KEY (profile_id, space_id)
);

-- =========================================
-- 2. 自動更新トリガーの適用
-- =========================================
CREATE TRIGGER trg_t_space_updated_at 
    BEFORE UPDATE ON public.t_space 
    FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER trg_r_space_updated_at 
    BEFORE UPDATE ON public.r_space 
    FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

-- =========================================
-- 3. ビューの構築 (論理削除フィルタリング済)
-- =========================================
CREATE VIEW public.v_space AS 
    SELECT * FROM public.t_space WHERE deleted_at IS NULL;

CREATE VIEW public.v_space_relation AS 
    SELECT * FROM public.r_space WHERE deleted_at IS NULL;

-- =========================================
-- 4. 個人スペース削除防止ロジック
-- =========================================
CREATE OR REPLACE FUNCTION public.prevent_personal_space_deletion()
RETURNS trigger AS $$
BEGIN
    -- 物理削除(DELETE) または 論理削除(deleted_atの更新) を検知
    IF OLD.is_personal = TRUE AND (TG_OP = 'DELETE' OR NEW.deleted_at IS NOT NULL) THEN 
        RAISE EXCEPTION '個人スペースはシステム上削除できません。';
    END IF;
    RETURN OLD;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_prevent_personal_space_deletion
    BEFORE DELETE OR UPDATE ON public.t_space
    FOR EACH ROW EXECUTE FUNCTION public.prevent_personal_space_deletion();

-- =========================================
-- 5. Auth連携: 自動プロフィール・個人スペース作成
-- =========================================
-- 注: この関数は t_profile, t_space, r_space すべてに依存します。
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
DECLARE
  personal_space_id UUID;
  base_name TEXT;
  generated_user_name TEXT;
BEGIN
  -- メールアドレスの @ より前を取得
  base_name := COALESCE(NULLIF(SPLIT_PART(NEW.email, '@', 1), ''), 'user');
  
  -- user_nameの初期値を生成 (重複回避のためIDの末尾4桁を付与)
  generated_user_name := base_name || '_' || RIGHT(NEW.id::text, 4);

  -- 1. プロフィール作成 (user_name / display_name の両方を設定)
  INSERT INTO public.t_profile (
    id, 
    user_name, 
    display_name, 
    avatar_url, 
    is_setup_completed, 
    created_by, 
    updated_by,
    created_kino_id,
    updated_kino_id
  )
  VALUES (
    NEW.id, 
    generated_user_name, 
    base_name, -- 表示名はメールのローカル部をそのまま使用
    NEW.raw_user_meta_data->>'avatar_url', 
    false, 
    NEW.id, 
    NEW.id,
    'system',
    'system'
  );

  -- 2. 個人スペース作成
  INSERT INTO public.t_space (
    display_name, 
    description, 
    owner_id, 
    is_personal, 
    created_by, 
    updated_by,
    created_kino_id,
    updated_kino_id
  )
  VALUES (
    base_name || 'の個人スペース', 
    base_name || 'さんの個人的なスペースです。', 
    NEW.id, 
    TRUE, 
    NEW.id, 
    NEW.id,
    'system',
    'system'
  )
  RETURNING id INTO personal_space_id;

  -- 3. スペースリレーション登録
  INSERT INTO public.r_space (
    profile_id, 
    space_id, 
    role, 
    status, 
    created_by, 
    updated_by,
    created_kino_id,
    updated_kino_id
  )
  VALUES (
    NEW.id, 
    personal_space_id, 
    'admin', 
    'active', 
    NEW.id, 
    NEW.id,
    'system',
    'system'
  );

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- トリガーの作成
CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
