-- =========================================
-- 1. テーブル作成 (お知らせ/通知系)
-- =========================================

-- 通知トラン (t_notification)
CREATE TABLE public.t_notification (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    type varchar NOT NULL CHECK (type IN ('system', 'project', 'task', 'mention')), -- system, project, task, mention
    title varchar NOT NULL,
    description text,
    target_space_id uuid REFERENCES public.t_space(id) ON DELETE CASCADE,
    target_project_id uuid REFERENCES public.t_project(id) ON DELETE CASCADE,
    target_profile_id uuid REFERENCES public.t_profile(id) ON DELETE CASCADE,
    parameters jsonb, -- { "path": "/projects/123", "task_id": "..." } 等
    created_at timestamp DEFAULT now(),
    created_by uuid REFERENCES public.t_profile(id),
    created_kino_id text,
    updated_at timestamp DEFAULT now(),
    updated_by uuid REFERENCES public.t_profile(id),
    updated_kino_id text,
    deleted_at timestamp
);

-- 通知既読トラン (t_notification_read)
CREATE TABLE public.t_notification_read (
    notification_id uuid REFERENCES public.t_notification(id) ON DELETE CASCADE,
    created_at timestamp DEFAULT now(),
    created_by uuid NOT NULL REFERENCES public.t_profile(id), -- 既読したユーザー
    created_kino_id text,
    updated_at timestamp DEFAULT now(),
    updated_by uuid REFERENCES public.t_profile(id),
    updated_kino_id text,
    deleted_at timestamp,
    PRIMARY KEY (notification_id, created_by)
);

-- =========================================
-- 2. 自動更新トリガーの適用
-- =========================================
CREATE TRIGGER trg_t_notification_updated_at 
    BEFORE UPDATE ON public.t_notification 
    FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER trg_t_notification_read_updated_at 
    BEFORE UPDATE ON public.t_notification_read 
    FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

-- =========================================
-- 3. ビューの構築 (論理削除フィルタリング済)
-- =========================================
CREATE VIEW public.v_notification AS 
    SELECT * FROM public.t_notification WHERE deleted_at IS NULL;

CREATE VIEW public.v_notification_read AS 
    SELECT * FROM public.t_notification_read WHERE deleted_at IS NULL;
