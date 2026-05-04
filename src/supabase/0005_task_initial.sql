-- =========================================
-- 1. テーブル作成 (タスク・添付ファイル系)
-- =========================================

-- タスク本体 (t_task)
CREATE TABLE public.t_task (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id uuid NOT NULL REFERENCES public.t_project(id) ON DELETE CASCADE,
    title varchar NOT NULL,
    description text,
    priority varchar NOT NULL CHECK (priority IN ('low', 'medium', 'high')),
    main_assignee_id uuid REFERENCES public.t_profile(id),
    reviewer_id uuid REFERENCES public.t_profile(id),
    category_rel_id uuid REFERENCES public.r_project_task_category(id),
    status_rel_id uuid REFERENCES public.r_project_task_status(id),
    plan_start_at timestamp,
    plan_end_at timestamp,
    actual_start_at timestamp,
    actual_end_at timestamp,
    estimated_hours numeric(10, 2),
    actual_hours numeric(10, 2),
    sort_order integer DEFAULT 0,
    created_at timestamp DEFAULT now(),
    created_by uuid REFERENCES public.t_profile(id),
    created_kino_id text,
    updated_at timestamp DEFAULT now(),
    updated_by uuid REFERENCES public.t_profile(id),
    updated_kino_id text,
    deleted_at timestamp
);

-- タスク担当者リレーション (r_task_assignee)
-- ※一タスクに対して複数人担当する場合を想定
CREATE TABLE public.r_task_assignee (
    task_id uuid REFERENCES public.t_task(id) ON DELETE CASCADE,
    profile_id uuid REFERENCES public.t_profile(id) ON DELETE CASCADE,
    created_at timestamp DEFAULT now(),
    created_by uuid REFERENCES public.t_profile(id),
    created_kino_id text,
    updated_at timestamp DEFAULT now(),
    updated_by uuid REFERENCES public.t_profile(id),
    updated_kino_id text,
    deleted_at timestamp,
    PRIMARY KEY (task_id, profile_id)
);

-- タスク添付ファイル (t_task_attachment)
CREATE TABLE public.t_task_attachment (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    file_url text NOT NULL,
    created_at timestamp DEFAULT now(),
    created_by uuid REFERENCES public.t_profile(id),
    created_kino_id text,
    updated_at timestamp DEFAULT now(),
    updated_by uuid REFERENCES public.t_profile(id),
    updated_kino_id text,
    deleted_at timestamp
);

-- タスク添付ファイルリレーション (r_task_attachment)
CREATE TABLE public.r_task_attachment (
    task_id uuid REFERENCES public.t_task(id) ON DELETE CASCADE,
    attachment_id uuid REFERENCES public.t_task_attachment(id) ON DELETE CASCADE,
    created_at timestamp DEFAULT now(),
    created_by uuid REFERENCES public.t_profile(id),
    created_kino_id text,
    updated_at timestamp DEFAULT now(),
    updated_by uuid REFERENCES public.t_profile(id),
    updated_kino_id text,
    deleted_at timestamp,
    PRIMARY KEY (task_id, attachment_id)
);

-- =========================================
-- 2. 自動更新トリガーの適用
-- =========================================
CREATE TRIGGER trg_t_task_updated_at BEFORE UPDATE ON public.t_task FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER trg_r_task_assignee_updated_at BEFORE UPDATE ON public.r_task_assignee FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER trg_t_task_attachment_updated_at BEFORE UPDATE ON public.t_task_attachment FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER trg_r_task_attachment_updated_at BEFORE UPDATE ON public.r_task_attachment FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

-- =========================================
-- 3. ビューの構築 (論理削除フィルタリング済)
-- =========================================
CREATE VIEW public.v_task AS SELECT * FROM public.t_task WHERE deleted_at IS NULL;
CREATE VIEW public.v_task_assignee AS SELECT * FROM public.r_task_assignee WHERE deleted_at IS NULL;
CREATE VIEW public.v_task_attachment AS SELECT * FROM public.t_task_attachment WHERE deleted_at IS NULL;
CREATE VIEW public.v_task_attachment_relation AS SELECT * FROM public.r_task_attachment WHERE deleted_at IS NULL;
