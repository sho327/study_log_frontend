-- =========================================
-- 1. テーブル作成 (タスク・ステータス設定系)
-- =========================================

-- プロジェクトタスクカテゴリマスタ (m_project_task_category)
CREATE TABLE public.m_project_task_category (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id uuid NOT NULL REFERENCES public.t_project(id) ON DELETE CASCADE,
    name varchar NOT NULL,
    sort_order integer DEFAULT 0,
    created_at timestamp DEFAULT now(),
    created_by uuid REFERENCES public.t_profile(id),
    created_kino_id text,
    updated_at timestamp DEFAULT now(),
    updated_by uuid REFERENCES public.t_profile(id),
    updated_kino_id text,
    deleted_at timestamp
);

-- プロジェクトタスクカテゴリリレーション (r_project_task_category)
CREATE TABLE public.r_project_task_category (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(), -- t_taskからの参照用にサロゲートキーを用意
    project_id uuid NOT NULL REFERENCES public.t_project(id) ON DELETE CASCADE,
    category_id uuid NOT NULL REFERENCES public.m_project_task_category(id) ON DELETE CASCADE,
    created_at timestamp DEFAULT now(),
    created_by uuid REFERENCES public.t_profile(id),
    created_kino_id text,
    updated_at timestamp DEFAULT now(),
    updated_by uuid REFERENCES public.t_profile(id),
    updated_kino_id text,
    deleted_at timestamp,
    UNIQUE(project_id, category_id) -- 二重登録防止
);

-- プロジェクトタスクステータスマスタ (m_project_task_status)
CREATE TABLE public.m_project_task_status (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id uuid NOT NULL REFERENCES public.t_project(id) ON DELETE CASCADE,
    name varchar NOT NULL,
    sort_order integer DEFAULT 0,
    created_at timestamp DEFAULT now(),
    created_by uuid REFERENCES public.t_profile(id),
    created_kino_id text,
    updated_at timestamp DEFAULT now(),
    updated_by uuid REFERENCES public.t_profile(id),
    updated_kino_id text,
    deleted_at timestamp
);

-- プロジェクトタスクステータスリレーション (r_project_task_status)
CREATE TABLE public.r_project_task_status (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(), -- t_taskからの参照用にサロゲートキーを用意
    project_id uuid NOT NULL REFERENCES public.t_project(id) ON DELETE CASCADE,
    status_id uuid NOT NULL REFERENCES public.m_project_task_status(id) ON DELETE CASCADE,
    created_at timestamp DEFAULT now(),
    created_by uuid REFERENCES public.t_profile(id),
    created_kino_id text,
    updated_at timestamp DEFAULT now(),
    updated_by uuid REFERENCES public.t_profile(id),
    updated_kino_id text,
    deleted_at timestamp,
    UNIQUE(project_id, status_id) -- 二重登録防止
);

-- =========================================
-- 2. 自動更新トリガーの適用
-- =========================================
CREATE TRIGGER trg_m_project_task_category_updated_at BEFORE UPDATE ON public.m_project_task_category FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER trg_r_project_task_category_updated_at BEFORE UPDATE ON public.r_project_task_category FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER trg_m_project_task_status_updated_at BEFORE UPDATE ON public.m_project_task_status FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER trg_r_project_task_status_updated_at BEFORE UPDATE ON public.r_project_task_status FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

-- =========================================
-- 3. ビューの構築 (論理削除フィルタリング済)
-- =========================================
CREATE VIEW public.v_project_task_category AS SELECT * FROM public.m_project_task_category WHERE deleted_at IS NULL;
CREATE VIEW public.v_project_task_category_relation AS SELECT * FROM public.r_project_task_category WHERE deleted_at IS NULL;
CREATE VIEW public.v_project_task_status AS SELECT * FROM public.m_project_task_status WHERE deleted_at IS NULL;
CREATE VIEW public.v_project_task_status_relation AS SELECT * FROM public.r_project_task_status WHERE deleted_at IS NULL;
