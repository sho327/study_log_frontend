-- =========================================
-- 1. ビューの削除 (依存関係の最上位)
-- =========================================
DROP VIEW IF EXISTS public.v_notification_read CASCADE;
DROP VIEW IF EXISTS public.v_notification CASCADE;
DROP VIEW IF EXISTS public.v_task_attachment_relation CASCADE;
DROP VIEW IF EXISTS public.v_task_attachment CASCADE;
DROP VIEW IF EXISTS public.v_task_assignee CASCADE;
DROP VIEW IF EXISTS public.v_task CASCADE;
DROP VIEW IF EXISTS public.v_project_task_status_relation CASCADE;
DROP VIEW IF EXISTS public.v_project_task_status CASCADE;
DROP VIEW IF EXISTS public.v_project_task_category_relation CASCADE;
DROP VIEW IF EXISTS public.v_project_task_category CASCADE;
DROP VIEW IF EXISTS public.v_project_tool_relation CASCADE;
DROP VIEW IF EXISTS public.v_project_tool CASCADE;
DROP VIEW IF EXISTS public.v_project_requirement_relation CASCADE;
DROP VIEW IF EXISTS public.v_project_requirement CASCADE;
DROP VIEW IF EXISTS public.v_project_member CASCADE;
DROP VIEW IF EXISTS public.v_project CASCADE;
DROP VIEW IF EXISTS public.v_project_category CASCADE;
DROP VIEW IF EXISTS public.v_space_relation CASCADE;
DROP VIEW IF EXISTS public.v_space CASCADE;
DROP VIEW IF EXISTS public.v_profile_skill_relation CASCADE;
DROP VIEW IF EXISTS public.v_profile_skill_tag CASCADE;
DROP VIEW IF EXISTS public.v_profile CASCADE;

-- =========================================
-- 2. テーブルの削除 (CASCADEにより紐づくトリガーも自動消滅)
-- =========================================
-- ※ CASCADEにより、各テーブルの updated_at トリガーや外部キー制約もまとめて削除されます。
DROP TABLE IF EXISTS public.t_notification_read CASCADE;
DROP TABLE IF EXISTS public.t_notification CASCADE;
DROP TABLE IF EXISTS public.r_task_attachment CASCADE;
DROP TABLE IF EXISTS public.t_task_attachment CASCADE;
DROP TABLE IF EXISTS public.r_task_assignee CASCADE;
DROP TABLE IF EXISTS public.t_task CASCADE;
DROP TABLE IF EXISTS public.r_project_task_status CASCADE;
DROP TABLE IF EXISTS public.m_project_task_status CASCADE;
DROP TABLE IF EXISTS public.r_project_task_category CASCADE;
DROP TABLE IF EXISTS public.m_project_task_category CASCADE;
DROP TABLE IF EXISTS public.r_project_tool CASCADE;
DROP TABLE IF EXISTS public.m_project_tool CASCADE;
DROP TABLE IF EXISTS public.r_project_requirement CASCADE;
DROP TABLE IF EXISTS public.t_project_requirement CASCADE;
DROP TABLE IF EXISTS public.r_project_member CASCADE;
DROP TABLE IF EXISTS public.t_project CASCADE;
DROP TABLE IF EXISTS public.m_project_category CASCADE;
DROP TABLE IF EXISTS public.r_space CASCADE;
DROP TABLE IF EXISTS public.t_space CASCADE;
DROP TABLE IF EXISTS public.r_profile_skill_tag CASCADE;
DROP TABLE IF EXISTS public.m_profile_skill_tag CASCADE;
DROP TABLE IF EXISTS public.t_profile CASCADE;

-- =========================================
-- 3. 特殊なトリガーの削除 (自前で削除しないテーブル用)
-- =========================================
-- auth.usersはシステムテーブルで削除しないため、トリガーだけ個別に削除します
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- ※ trg_prevent_personal_space_deletion は public.t_space に紐づいていたため、
-- 上記の DROP TABLE ... t_space CASCADE で既に消滅しています。
-- ここで個別に DROP TRIGGER を書くと「テーブルがない」と怒られるので書きません。

-- =========================================
-- 4. 関数の削除 (最後に掃除)
-- =========================================
-- トリガーがすべて消えた後なので、依存関係エラー（2BP01）は発生しません
DROP FUNCTION IF EXISTS public.handle_new_user() CASCADE;
DROP FUNCTION IF EXISTS public.prevent_personal_space_deletion() CASCADE;
DROP FUNCTION IF EXISTS public.update_updated_at_column() CASCADE;

-- =========================================
-- 初期化完了
-- =========================================
