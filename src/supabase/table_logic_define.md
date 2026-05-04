## データベース・ロジック定義 (Triggers & Views)

### ■ 1. 自動更新機能 (Auto-Update Triggers)

データの更新漏れを防ぎ、常に正確な「最終更新日時」を保持するための共通機能です。

| 機能名 | 内容 |
| --- | --- |
| **`update_updated_at_column()`** | `UPDATE` 発行時に `updated_at` を現在時刻に自動書き換えする。 |
| **対象テーブル** | `t_`, `m_`, `r_` から始まる全てのテーブル。 |

---

### ■ 2. 論理削除ビュー (Active Data Views)

`deleted_at IS NULL`（削除されていないデータ）のみを抽出する参照用ビューです。

* **命名規則:** `v_テーブル名`
* **設計意図:** アプリケーション側で常に削除フラグを意識する必要をなくし、開発スピードと安全性を向上させます。

---

### ■ 3. Auth連携：自動初期セットアップ (User Onboarding)

Supabase Authでのサインアップを検知し、アプリ利用に必要な最小限の「器」を自動生成します。

#### `handle_new_user()`

1. **仮プロフィール作成**: メールアドレスから「仮の表示名」と「一意のユーザーID」を生成。`is_setup_completed = false` で作成し、初回ログイン時の入力を促します。
2. **個人スペース作成**: ユーザー専用の `is_personal = true` なスペースを自動生成。
3. **管理者権限付与**: 作成した個人スペースの `admin` 権限を自身に付与。

---

### ■ 4. データ保護ルール (Data Integrity)

システムの根幹に関わるデータの整合性を守るためのガードレールです。

#### `prevent_personal_space_deletion()`

* **役割**: ユーザーのホームとなる「個人スペース」の削除（物理・論理ともに）を禁止します。
* **理由**: 個人スペースが失われると、プロフィールの整合性やログイン後の挙動に致命的な影響が出るためです。

---

### ■ SQLコードブロック (最新版)

```sql
-- =========================================
-- 共通機能 (トリガー関数)
-- =========================================
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS trigger AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- =========================================
-- ビューの構築 (論理削除フィルタリング済)
-- =========================================
-- 代表的なもののみ記載。必要に応じて各テーブル分を作成
CREATE OR REPLACE VIEW v_profile AS SELECT * FROM t_profile WHERE deleted_at IS NULL;
CREATE OR REPLACE VIEW v_space AS SELECT * FROM t_space WHERE deleted_at IS NULL;
CREATE OR REPLACE VIEW v_project AS SELECT * FROM t_project WHERE deleted_at IS NULL;
CREATE OR REPLACE VIEW v_task AS SELECT * FROM t_task WHERE deleted_at IS NULL;

-- =========================================
-- Auth連携: 自動プロフィール・個人スペース作成
-- =========================================
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

    -- 1. プロフィール作成 (is_setup_completed = false で初期化)
    INSERT INTO public.t_profile (
        id, 
        user_name, 
        display_name, 
        avatar_url, 
        is_setup_completed,
        created_by, 
        updated_by
    )
    VALUES (
        NEW.id, 
        generated_user_name, 
        base_name, 
        NEW.raw_user_meta_data->>'avatar_url', 
        false,
        NEW.id, 
        NEW.id
    );

    -- 2. 個人スペース作成
    INSERT INTO public.t_space (
        display_name, 
        description, 
        owner_id, 
        is_personal, 
        created_by, 
        updated_by
    )
    VALUES (
        base_name || 'の個人スペース', 
        base_name || 'さんの個人的なスペースです。', 
        NEW.id, 
        TRUE, 
        NEW.id, 
        NEW.id
    )
    RETURNING id INTO personal_space_id;

    -- 3. スペースリレーション登録 (Admin/Active)
    INSERT INTO public.r_space (
        profile_id, 
        space_id, 
        role, 
        status, 
        created_by, 
        updated_by
    )
    VALUES (
        NEW.id, 
        personal_space_id, 
        'admin', 
        'active', 
        NEW.id, 
        NEW.id
    );

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- トリガー作成
CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- =========================================
-- 個人スペース削除防止
-- =========================================
CREATE OR REPLACE FUNCTION public.prevent_personal_space_deletion()
RETURNS trigger AS $$
BEGIN
    -- 物理削除(DELETE) または 論理削除(deleted_atの更新) を検知
    IF OLD.is_personal = TRUE AND (TG_OP = 'DELETE' OR (NEW.deleted_at IS NOT NULL AND OLD.deleted_at IS NULL)) THEN 
        RAISE EXCEPTION '個人スペースはシステム上削除できません。';
    END IF;
    RETURN OLD;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_prevent_personal_space_deletion
    BEFORE DELETE OR UPDATE ON t_space
    FOR EACH ROW EXECUTE FUNCTION public.prevent_personal_space_deletion();

```
