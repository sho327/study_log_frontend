export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      // =========================================
      // 1. ユーザー/プロフィール系
      // =========================================
      t_profile: {
        Row: {
          id: string // FK: auth.users.id
          user_name: string | null
          display_name: string
          affiliation: string | null
          bio: string | null
          avatar_url: string | null
          is_setup_completed: boolean
          created_at: string
          created_by: string | null
          updated_at: string
          deleted_at: string | null
        }
      }
      m_profile_skill_tag: {
        Row: {
          id: string
          name: string
          created_at: string
          created_by: string | null
        }
      }
      r_profile_skill_tag: {
        Row: {
          profile_id: string // FK: t_profile.id
          skill_tag_id: string // FK: m_profile_skill_tag.id
          created_at: string
        }
      }

      // =========================================
      // 2. スペース系
      // =========================================
      t_space: {
        Row: {
          id: string
          display_name: string
          description: string | null
          owner_id: string // FK: t_profile.id
          is_personal: boolean
          avatar_url: string | null
          created_at: string
          updated_at: string
          deleted_at: string | null
        }
      }
      r_space: {
        Row: {
          profile_id: string // FK: t_profile.id
          space_id: string // FK: t_space.id
          role: 'owner' | 'admin' | 'member'
          status: 'active' | 'inviting' | 'left'
          created_at: string
        }
      }

      // =========================================
      // 3. プロジェクト系
      // =========================================
      t_project: {
        Row: {
          id: string
          space_id: string // FK: t_space.id
          title: string
          description: string | null
          category_id: string | null // FK: m_project_category.id
          leader_id: string | null // FK: t_profile.id
          status: 'not_started' | 'ongoing' | 'completed' | 'archived'
          max_members: number | null
          is_public: boolean
          start_date: string | null
          end_date: string | null
          icon_url: string | null
          created_at: string
          updated_at: string
          deleted_at: string | null
        }
      }
      m_project_category: {
        Row: {
          id: string
          space_id: string // FK: t_space.id
          name: string
          created_at: string
        }
      }
      r_project_member: {
        Row: {
          project_id: string // FK: t_project.id
          profile_id: string // FK: t_profile.id
          role: 'owner' | 'admin' | 'member' | 'viewer'
          created_at: string
        }
      }
      m_project_tool: {
        Row: { id: string; space_id: string; name: string; created_at: string }
      }
      r_project_tool: {
        Row: { project_id: string; tool_id: string; created_at: string }
      }
      t_project_requirement: {
        Row: { id: string; content: string; is_required: boolean; sort_order: number; created_at: string }
      }
      r_project_requirement: {
        Row: { project_id: string; requirement_id: string; created_at: string }
      }

      // =========================================
      // 4. タスク設定系 (カテゴリ・ステータス)
      // =========================================
      m_project_task_category: {
        Row: {
          id: string
          project_id: string // FK: t_project.id
          name: string
          sort_order: number
          created_at: string
        }
      }
      r_project_task_category: {
        Row: { project_id: string; category_id: string; created_at: string }
      }
      m_project_task_status: {
        Row: {
          id: string
          name: string
          sort_order: number
          created_at: string
        }
      }
      r_project_task_status: {
        Row: { project_id: string; status_id: string; created_at: string }
      }

      // =========================================
      // 5. タスク本体 (ここが重要！)
      // =========================================
      t_task: {
        Row: {
          id: string
          project_id: string // FK: t_project.id
          title: string
          description: string | null
          priority: 'low' | 'medium' | 'high' | null
          main_assignee_id: string | null // FK: t_profile.id (主担当)
          reviewer_id: string | null // FK: t_profile.id (確認者)
          category_rel_id: string | null // FK: r_project_task_category.id
          status_rel_id: string | null // FK: r_project_task_status.id
          plan_start_at: string | null
          plan_end_at: string | null
          actual_start_at: string | null
          actual_end_at: string | null
          estimated_hours: number | null
          actual_hours: number | null
          sort_order: number
          created_at: string
          updated_at: string
          deleted_at: string | null
        }
      }
      r_task_assignee: {
        Row: {
          task_id: string // FK: t_task.id
          profile_id: string // FK: t_profile.id (複数人アサイン用)
          created_at: string
        }
      }
      t_task_attachment: {
        Row: { id: string; file_url: string; created_at: string }
      }
      r_task_attachment: {
        Row: { task_id: string; attachment_id: string; created_at: string }
      }

      // =========================================
      // 6. 通知系
      // =========================================
      t_notification: {
        Row: {
          id: string
          type: string // system, project, task, etc
          title: string
          description: string | null
          target_space_id: string | null // FK: t_space.id
          target_project_id: string | null // FK: t_project.id
          target_profile_id: string | null // FK: t_profile.id
          parameters: Json | null
          created_at: string
        }
      }
      t_notification_read: {
        Row: {
          notification_id: string // FK: t_notification.id
          created_by: string // FK: t_profile.id
          created_at: string
        }
      }
    }
  }
}