-- =========================================
-- 全テーブルのRLS有効化（ポリシーなし＝全拒否）
-- =========================================
-- 1. ユーザー系
ALTER TABLE public.t_profile ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.m_profile_skill_tag ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.r_profile_skill_tag ENABLE ROW LEVEL SECURITY;

-- 2. スペース系
ALTER TABLE public.t_space ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.r_space ENABLE ROW LEVEL SECURITY;

-- 3. プロジェクト系
ALTER TABLE public.t_project ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.m_project_category ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.r_project_member ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.m_project_tool ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.r_project_tool ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.t_project_requirement ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.r_project_requirement ENABLE ROW LEVEL SECURITY;

-- 4. タスク設定系
ALTER TABLE public.m_project_task_category ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.r_project_task_category ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.m_project_task_status ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.r_project_task_status ENABLE ROW LEVEL SECURITY;

-- 5. タスク実体系
ALTER TABLE public.t_task ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.r_task_assignee ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.t_task_attachment ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.r_task_attachment ENABLE ROW LEVEL SECURITY;

-- 6. 通知系
ALTER TABLE public.t_notification ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.t_notification_read ENABLE ROW LEVEL SECURITY;
