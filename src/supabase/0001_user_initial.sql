-- =========================================
-- 1. テーブル作成 (ユーザー/プロフィール系)
-- =========================================

-- プロフィール実体 (t_profile)
CREATE TABLE public.t_profile (
    id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    user_name varchar UNIQUE,
    display_name varchar NOT NULL,
    affiliation text,
    bio text,
    avatar_url text,
    is_setup_completed boolean DEFAULT false,
    created_at timestamp DEFAULT now(),
    created_by uuid REFERENCES auth.users(id),
    created_kino_id text,
    updated_at timestamp DEFAULT now(),
    updated_by uuid REFERENCES auth.users(id),
    updated_kino_id text,
    deleted_at timestamp
);

-- スキルタグマスタ (m_profile_skill_tag)
CREATE TABLE public.m_profile_skill_tag (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name varchar NOT NULL UNIQUE,
    created_at timestamp DEFAULT now(),
    created_by uuid REFERENCES public.t_profile(id),
    created_kino_id text,
    updated_at timestamp DEFAULT now(),
    updated_by uuid REFERENCES public.t_profile(id),
    updated_kino_id text,
    deleted_at timestamp
);

-- プロフィールスキルリレーション (r_profile_skill_tag)
CREATE TABLE public.r_profile_skill_tag (
    profile_id uuid REFERENCES public.t_profile(id) ON DELETE CASCADE,
    skill_tag_id uuid REFERENCES public.m_profile_skill_tag(id) ON DELETE CASCADE,
    created_at timestamp DEFAULT now(),
    created_by uuid REFERENCES public.t_profile(id),
    created_kino_id text,
    updated_at timestamp DEFAULT now(),
    updated_by uuid REFERENCES public.t_profile(id),
    updated_kino_id text,
    deleted_at timestamp,
    PRIMARY KEY (profile_id, skill_tag_id)
);

-- =========================================
-- 2. 共通機能 (トリガー関数)
-- =========================================
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS trigger AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- =========================================
-- 3. 自動更新トリガーの適用
-- =========================================
CREATE TRIGGER trg_t_profile_updated_at BEFORE UPDATE ON public.t_profile FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER trg_m_profile_skill_tag_updated_at BEFORE UPDATE ON public.m_profile_skill_tag FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER trg_r_profile_skill_tag_updated_at BEFORE UPDATE ON public.r_profile_skill_tag FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

-- =========================================
-- 4. ビューの構築 (論理削除フィルタリング済)
-- =========================================
CREATE VIEW public.v_profile AS SELECT * FROM public.t_profile WHERE deleted_at IS NULL;
CREATE VIEW public.v_profile_skill_tag AS SELECT * FROM public.m_profile_skill_tag WHERE deleted_at IS NULL;
CREATE VIEW public.v_profile_skill_relation AS SELECT * FROM public.r_profile_skill_tag WHERE deleted_at IS NULL;
