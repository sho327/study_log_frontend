export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      m_profile_skill_tag: {
        Row: {
          created_at: string | null
          created_by: string | null
          created_kino_id: string | null
          deleted_at: string | null
          id: string
          name: string
          updated_at: string | null
          updated_by: string | null
          updated_kino_id: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          created_kino_id?: string | null
          deleted_at?: string | null
          id?: string
          name: string
          updated_at?: string | null
          updated_by?: string | null
          updated_kino_id?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          created_kino_id?: string | null
          deleted_at?: string | null
          id?: string
          name?: string
          updated_at?: string | null
          updated_by?: string | null
          updated_kino_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "m_profile_skill_tag_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "t_profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "m_profile_skill_tag_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "m_profile_skill_tag_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "t_profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "m_profile_skill_tag_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_profile"
            referencedColumns: ["id"]
          },
        ]
      }
      m_project_category: {
        Row: {
          created_at: string | null
          created_by: string | null
          created_kino_id: string | null
          deleted_at: string | null
          end_date: string | null
          icon_url: string | null
          id: string
          name: string
          space_id: string
          start_date: string | null
          updated_at: string | null
          updated_by: string | null
          updated_kino_id: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          created_kino_id?: string | null
          deleted_at?: string | null
          end_date?: string | null
          icon_url?: string | null
          id?: string
          name: string
          space_id: string
          start_date?: string | null
          updated_at?: string | null
          updated_by?: string | null
          updated_kino_id?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          created_kino_id?: string | null
          deleted_at?: string | null
          end_date?: string | null
          icon_url?: string | null
          id?: string
          name?: string
          space_id?: string
          start_date?: string | null
          updated_at?: string | null
          updated_by?: string | null
          updated_kino_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "m_project_category_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "t_profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "m_project_category_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "m_project_category_space_id_fkey"
            columns: ["space_id"]
            isOneToOne: false
            referencedRelation: "t_space"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "m_project_category_space_id_fkey"
            columns: ["space_id"]
            isOneToOne: false
            referencedRelation: "v_space"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "m_project_category_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "t_profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "m_project_category_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_profile"
            referencedColumns: ["id"]
          },
        ]
      }
      m_project_task_category: {
        Row: {
          created_at: string | null
          created_by: string | null
          created_kino_id: string | null
          deleted_at: string | null
          id: string
          name: string
          project_id: string
          sort_order: number | null
          updated_at: string | null
          updated_by: string | null
          updated_kino_id: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          created_kino_id?: string | null
          deleted_at?: string | null
          id?: string
          name: string
          project_id: string
          sort_order?: number | null
          updated_at?: string | null
          updated_by?: string | null
          updated_kino_id?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          created_kino_id?: string | null
          deleted_at?: string | null
          id?: string
          name?: string
          project_id?: string
          sort_order?: number | null
          updated_at?: string | null
          updated_by?: string | null
          updated_kino_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "m_project_task_category_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "t_profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "m_project_task_category_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "m_project_task_category_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "t_project"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "m_project_task_category_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "v_project"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "m_project_task_category_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "t_profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "m_project_task_category_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_profile"
            referencedColumns: ["id"]
          },
        ]
      }
      m_project_task_status: {
        Row: {
          created_at: string | null
          created_by: string | null
          created_kino_id: string | null
          deleted_at: string | null
          id: string
          name: string
          project_id: string
          sort_order: number | null
          updated_at: string | null
          updated_by: string | null
          updated_kino_id: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          created_kino_id?: string | null
          deleted_at?: string | null
          id?: string
          name: string
          project_id: string
          sort_order?: number | null
          updated_at?: string | null
          updated_by?: string | null
          updated_kino_id?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          created_kino_id?: string | null
          deleted_at?: string | null
          id?: string
          name?: string
          project_id?: string
          sort_order?: number | null
          updated_at?: string | null
          updated_by?: string | null
          updated_kino_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "m_project_task_status_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "t_profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "m_project_task_status_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "m_project_task_status_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "t_project"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "m_project_task_status_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "v_project"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "m_project_task_status_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "t_profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "m_project_task_status_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_profile"
            referencedColumns: ["id"]
          },
        ]
      }
      m_project_tool: {
        Row: {
          created_at: string | null
          created_by: string | null
          created_kino_id: string | null
          deleted_at: string | null
          id: string
          name: string
          space_id: string
          updated_at: string | null
          updated_by: string | null
          updated_kino_id: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          created_kino_id?: string | null
          deleted_at?: string | null
          id?: string
          name: string
          space_id: string
          updated_at?: string | null
          updated_by?: string | null
          updated_kino_id?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          created_kino_id?: string | null
          deleted_at?: string | null
          id?: string
          name?: string
          space_id?: string
          updated_at?: string | null
          updated_by?: string | null
          updated_kino_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "m_project_tool_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "t_profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "m_project_tool_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "m_project_tool_space_id_fkey"
            columns: ["space_id"]
            isOneToOne: false
            referencedRelation: "t_space"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "m_project_tool_space_id_fkey"
            columns: ["space_id"]
            isOneToOne: false
            referencedRelation: "v_space"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "m_project_tool_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "t_profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "m_project_tool_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_profile"
            referencedColumns: ["id"]
          },
        ]
      }
      r_profile_skill_tag: {
        Row: {
          created_at: string | null
          created_by: string | null
          created_kino_id: string | null
          deleted_at: string | null
          profile_id: string
          skill_tag_id: string
          updated_at: string | null
          updated_by: string | null
          updated_kino_id: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          created_kino_id?: string | null
          deleted_at?: string | null
          profile_id: string
          skill_tag_id: string
          updated_at?: string | null
          updated_by?: string | null
          updated_kino_id?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          created_kino_id?: string | null
          deleted_at?: string | null
          profile_id?: string
          skill_tag_id?: string
          updated_at?: string | null
          updated_by?: string | null
          updated_kino_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "r_profile_skill_tag_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "t_profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "r_profile_skill_tag_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "r_profile_skill_tag_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "t_profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "r_profile_skill_tag_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "v_profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "r_profile_skill_tag_skill_tag_id_fkey"
            columns: ["skill_tag_id"]
            isOneToOne: false
            referencedRelation: "m_profile_skill_tag"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "r_profile_skill_tag_skill_tag_id_fkey"
            columns: ["skill_tag_id"]
            isOneToOne: false
            referencedRelation: "v_profile_skill_tag"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "r_profile_skill_tag_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "t_profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "r_profile_skill_tag_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_profile"
            referencedColumns: ["id"]
          },
        ]
      }
      r_project_member: {
        Row: {
          created_at: string | null
          created_by: string | null
          created_kino_id: string | null
          deleted_at: string | null
          profile_id: string
          project_id: string
          role: string
          updated_at: string | null
          updated_by: string | null
          updated_kino_id: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          created_kino_id?: string | null
          deleted_at?: string | null
          profile_id: string
          project_id: string
          role: string
          updated_at?: string | null
          updated_by?: string | null
          updated_kino_id?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          created_kino_id?: string | null
          deleted_at?: string | null
          profile_id?: string
          project_id?: string
          role?: string
          updated_at?: string | null
          updated_by?: string | null
          updated_kino_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "r_project_member_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "t_profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "r_project_member_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "r_project_member_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "t_profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "r_project_member_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "v_profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "r_project_member_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "t_project"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "r_project_member_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "v_project"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "r_project_member_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "t_profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "r_project_member_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_profile"
            referencedColumns: ["id"]
          },
        ]
      }
      r_project_requirement: {
        Row: {
          created_at: string | null
          created_by: string | null
          created_kino_id: string | null
          deleted_at: string | null
          project_id: string
          requirement_id: string
          updated_at: string | null
          updated_by: string | null
          updated_kino_id: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          created_kino_id?: string | null
          deleted_at?: string | null
          project_id: string
          requirement_id: string
          updated_at?: string | null
          updated_by?: string | null
          updated_kino_id?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          created_kino_id?: string | null
          deleted_at?: string | null
          project_id?: string
          requirement_id?: string
          updated_at?: string | null
          updated_by?: string | null
          updated_kino_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "r_project_requirement_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "t_profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "r_project_requirement_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "r_project_requirement_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "t_project"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "r_project_requirement_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "v_project"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "r_project_requirement_requirement_id_fkey"
            columns: ["requirement_id"]
            isOneToOne: false
            referencedRelation: "t_project_requirement"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "r_project_requirement_requirement_id_fkey"
            columns: ["requirement_id"]
            isOneToOne: false
            referencedRelation: "v_project_requirement"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "r_project_requirement_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "t_profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "r_project_requirement_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_profile"
            referencedColumns: ["id"]
          },
        ]
      }
      r_project_task_category: {
        Row: {
          category_id: string
          created_at: string | null
          created_by: string | null
          created_kino_id: string | null
          deleted_at: string | null
          id: string
          project_id: string
          updated_at: string | null
          updated_by: string | null
          updated_kino_id: string | null
        }
        Insert: {
          category_id: string
          created_at?: string | null
          created_by?: string | null
          created_kino_id?: string | null
          deleted_at?: string | null
          id?: string
          project_id: string
          updated_at?: string | null
          updated_by?: string | null
          updated_kino_id?: string | null
        }
        Update: {
          category_id?: string
          created_at?: string | null
          created_by?: string | null
          created_kino_id?: string | null
          deleted_at?: string | null
          id?: string
          project_id?: string
          updated_at?: string | null
          updated_by?: string | null
          updated_kino_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "r_project_task_category_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "m_project_task_category"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "r_project_task_category_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "v_project_task_category"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "r_project_task_category_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "t_profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "r_project_task_category_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "r_project_task_category_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "t_project"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "r_project_task_category_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "v_project"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "r_project_task_category_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "t_profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "r_project_task_category_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_profile"
            referencedColumns: ["id"]
          },
        ]
      }
      r_project_task_status: {
        Row: {
          created_at: string | null
          created_by: string | null
          created_kino_id: string | null
          deleted_at: string | null
          id: string
          project_id: string
          status_id: string
          updated_at: string | null
          updated_by: string | null
          updated_kino_id: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          created_kino_id?: string | null
          deleted_at?: string | null
          id?: string
          project_id: string
          status_id: string
          updated_at?: string | null
          updated_by?: string | null
          updated_kino_id?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          created_kino_id?: string | null
          deleted_at?: string | null
          id?: string
          project_id?: string
          status_id?: string
          updated_at?: string | null
          updated_by?: string | null
          updated_kino_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "r_project_task_status_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "t_profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "r_project_task_status_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "r_project_task_status_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "t_project"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "r_project_task_status_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "v_project"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "r_project_task_status_status_id_fkey"
            columns: ["status_id"]
            isOneToOne: false
            referencedRelation: "m_project_task_status"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "r_project_task_status_status_id_fkey"
            columns: ["status_id"]
            isOneToOne: false
            referencedRelation: "v_project_task_status"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "r_project_task_status_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "t_profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "r_project_task_status_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_profile"
            referencedColumns: ["id"]
          },
        ]
      }
      r_project_tool: {
        Row: {
          created_at: string | null
          created_by: string | null
          created_kino_id: string | null
          deleted_at: string | null
          project_id: string
          tool_id: string
          updated_at: string | null
          updated_by: string | null
          updated_kino_id: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          created_kino_id?: string | null
          deleted_at?: string | null
          project_id: string
          tool_id: string
          updated_at?: string | null
          updated_by?: string | null
          updated_kino_id?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          created_kino_id?: string | null
          deleted_at?: string | null
          project_id?: string
          tool_id?: string
          updated_at?: string | null
          updated_by?: string | null
          updated_kino_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "r_project_tool_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "t_profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "r_project_tool_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "r_project_tool_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "t_project"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "r_project_tool_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "v_project"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "r_project_tool_tool_id_fkey"
            columns: ["tool_id"]
            isOneToOne: false
            referencedRelation: "m_project_tool"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "r_project_tool_tool_id_fkey"
            columns: ["tool_id"]
            isOneToOne: false
            referencedRelation: "v_project_tool"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "r_project_tool_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "t_profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "r_project_tool_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_profile"
            referencedColumns: ["id"]
          },
        ]
      }
      r_space: {
        Row: {
          created_at: string | null
          created_by: string | null
          created_kino_id: string | null
          deleted_at: string | null
          profile_id: string
          role: string
          space_id: string
          status: string
          updated_at: string | null
          updated_by: string | null
          updated_kino_id: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          created_kino_id?: string | null
          deleted_at?: string | null
          profile_id: string
          role: string
          space_id: string
          status: string
          updated_at?: string | null
          updated_by?: string | null
          updated_kino_id?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          created_kino_id?: string | null
          deleted_at?: string | null
          profile_id?: string
          role?: string
          space_id?: string
          status?: string
          updated_at?: string | null
          updated_by?: string | null
          updated_kino_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "r_space_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "t_profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "r_space_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "r_space_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "t_profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "r_space_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "v_profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "r_space_space_id_fkey"
            columns: ["space_id"]
            isOneToOne: false
            referencedRelation: "t_space"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "r_space_space_id_fkey"
            columns: ["space_id"]
            isOneToOne: false
            referencedRelation: "v_space"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "r_space_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "t_profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "r_space_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_profile"
            referencedColumns: ["id"]
          },
        ]
      }
      r_task_assignee: {
        Row: {
          created_at: string | null
          created_by: string | null
          created_kino_id: string | null
          deleted_at: string | null
          profile_id: string
          task_id: string
          updated_at: string | null
          updated_by: string | null
          updated_kino_id: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          created_kino_id?: string | null
          deleted_at?: string | null
          profile_id: string
          task_id: string
          updated_at?: string | null
          updated_by?: string | null
          updated_kino_id?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          created_kino_id?: string | null
          deleted_at?: string | null
          profile_id?: string
          task_id?: string
          updated_at?: string | null
          updated_by?: string | null
          updated_kino_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "r_task_assignee_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "t_profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "r_task_assignee_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "r_task_assignee_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "t_profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "r_task_assignee_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "v_profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "r_task_assignee_task_id_fkey"
            columns: ["task_id"]
            isOneToOne: false
            referencedRelation: "t_task"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "r_task_assignee_task_id_fkey"
            columns: ["task_id"]
            isOneToOne: false
            referencedRelation: "v_task"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "r_task_assignee_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "t_profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "r_task_assignee_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_profile"
            referencedColumns: ["id"]
          },
        ]
      }
      r_task_attachment: {
        Row: {
          attachment_id: string
          created_at: string | null
          created_by: string | null
          created_kino_id: string | null
          deleted_at: string | null
          task_id: string
          updated_at: string | null
          updated_by: string | null
          updated_kino_id: string | null
        }
        Insert: {
          attachment_id: string
          created_at?: string | null
          created_by?: string | null
          created_kino_id?: string | null
          deleted_at?: string | null
          task_id: string
          updated_at?: string | null
          updated_by?: string | null
          updated_kino_id?: string | null
        }
        Update: {
          attachment_id?: string
          created_at?: string | null
          created_by?: string | null
          created_kino_id?: string | null
          deleted_at?: string | null
          task_id?: string
          updated_at?: string | null
          updated_by?: string | null
          updated_kino_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "r_task_attachment_attachment_id_fkey"
            columns: ["attachment_id"]
            isOneToOne: false
            referencedRelation: "t_task_attachment"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "r_task_attachment_attachment_id_fkey"
            columns: ["attachment_id"]
            isOneToOne: false
            referencedRelation: "v_task_attachment"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "r_task_attachment_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "t_profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "r_task_attachment_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "r_task_attachment_task_id_fkey"
            columns: ["task_id"]
            isOneToOne: false
            referencedRelation: "t_task"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "r_task_attachment_task_id_fkey"
            columns: ["task_id"]
            isOneToOne: false
            referencedRelation: "v_task"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "r_task_attachment_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "t_profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "r_task_attachment_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_profile"
            referencedColumns: ["id"]
          },
        ]
      }
      t_notification: {
        Row: {
          created_at: string | null
          created_by: string | null
          created_kino_id: string | null
          deleted_at: string | null
          description: string | null
          id: string
          parameters: Json | null
          target_profile_id: string | null
          target_project_id: string | null
          target_space_id: string | null
          title: string
          type: string
          updated_at: string | null
          updated_by: string | null
          updated_kino_id: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          created_kino_id?: string | null
          deleted_at?: string | null
          description?: string | null
          id?: string
          parameters?: Json | null
          target_profile_id?: string | null
          target_project_id?: string | null
          target_space_id?: string | null
          title: string
          type: string
          updated_at?: string | null
          updated_by?: string | null
          updated_kino_id?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          created_kino_id?: string | null
          deleted_at?: string | null
          description?: string | null
          id?: string
          parameters?: Json | null
          target_profile_id?: string | null
          target_project_id?: string | null
          target_space_id?: string | null
          title?: string
          type?: string
          updated_at?: string | null
          updated_by?: string | null
          updated_kino_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "t_notification_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "t_profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "t_notification_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "t_notification_target_profile_id_fkey"
            columns: ["target_profile_id"]
            isOneToOne: false
            referencedRelation: "t_profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "t_notification_target_profile_id_fkey"
            columns: ["target_profile_id"]
            isOneToOne: false
            referencedRelation: "v_profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "t_notification_target_project_id_fkey"
            columns: ["target_project_id"]
            isOneToOne: false
            referencedRelation: "t_project"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "t_notification_target_project_id_fkey"
            columns: ["target_project_id"]
            isOneToOne: false
            referencedRelation: "v_project"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "t_notification_target_space_id_fkey"
            columns: ["target_space_id"]
            isOneToOne: false
            referencedRelation: "t_space"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "t_notification_target_space_id_fkey"
            columns: ["target_space_id"]
            isOneToOne: false
            referencedRelation: "v_space"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "t_notification_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "t_profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "t_notification_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_profile"
            referencedColumns: ["id"]
          },
        ]
      }
      t_notification_read: {
        Row: {
          created_at: string | null
          created_by: string
          created_kino_id: string | null
          deleted_at: string | null
          notification_id: string
          updated_at: string | null
          updated_by: string | null
          updated_kino_id: string | null
        }
        Insert: {
          created_at?: string | null
          created_by: string
          created_kino_id?: string | null
          deleted_at?: string | null
          notification_id: string
          updated_at?: string | null
          updated_by?: string | null
          updated_kino_id?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string
          created_kino_id?: string | null
          deleted_at?: string | null
          notification_id?: string
          updated_at?: string | null
          updated_by?: string | null
          updated_kino_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "t_notification_read_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "t_profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "t_notification_read_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "t_notification_read_notification_id_fkey"
            columns: ["notification_id"]
            isOneToOne: false
            referencedRelation: "t_notification"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "t_notification_read_notification_id_fkey"
            columns: ["notification_id"]
            isOneToOne: false
            referencedRelation: "v_notification"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "t_notification_read_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "t_profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "t_notification_read_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_profile"
            referencedColumns: ["id"]
          },
        ]
      }
      t_profile: {
        Row: {
          affiliation: string | null
          avatar_url: string | null
          bio: string | null
          created_at: string | null
          created_by: string | null
          created_kino_id: string | null
          deleted_at: string | null
          display_name: string
          id: string
          is_setup_completed: boolean | null
          updated_at: string | null
          updated_by: string | null
          updated_kino_id: string | null
          user_name: string | null
        }
        Insert: {
          affiliation?: string | null
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          created_by?: string | null
          created_kino_id?: string | null
          deleted_at?: string | null
          display_name: string
          id: string
          is_setup_completed?: boolean | null
          updated_at?: string | null
          updated_by?: string | null
          updated_kino_id?: string | null
          user_name?: string | null
        }
        Update: {
          affiliation?: string | null
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          created_by?: string | null
          created_kino_id?: string | null
          deleted_at?: string | null
          display_name?: string
          id?: string
          is_setup_completed?: boolean | null
          updated_at?: string | null
          updated_by?: string | null
          updated_kino_id?: string | null
          user_name?: string | null
        }
        Relationships: []
      }
      t_project: {
        Row: {
          category_id: string | null
          created_at: string | null
          created_by: string | null
          created_kino_id: string | null
          deleted_at: string | null
          description: string | null
          end_date: string | null
          icon_url: string | null
          id: string
          is_public: boolean | null
          leader_id: string | null
          max_members: number | null
          space_id: string
          start_date: string | null
          status: string
          title: string
          updated_at: string | null
          updated_by: string | null
          updated_kino_id: string | null
        }
        Insert: {
          category_id?: string | null
          created_at?: string | null
          created_by?: string | null
          created_kino_id?: string | null
          deleted_at?: string | null
          description?: string | null
          end_date?: string | null
          icon_url?: string | null
          id?: string
          is_public?: boolean | null
          leader_id?: string | null
          max_members?: number | null
          space_id: string
          start_date?: string | null
          status: string
          title: string
          updated_at?: string | null
          updated_by?: string | null
          updated_kino_id?: string | null
        }
        Update: {
          category_id?: string | null
          created_at?: string | null
          created_by?: string | null
          created_kino_id?: string | null
          deleted_at?: string | null
          description?: string | null
          end_date?: string | null
          icon_url?: string | null
          id?: string
          is_public?: boolean | null
          leader_id?: string | null
          max_members?: number | null
          space_id?: string
          start_date?: string | null
          status?: string
          title?: string
          updated_at?: string | null
          updated_by?: string | null
          updated_kino_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "t_project_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "m_project_category"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "t_project_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "v_project_category"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "t_project_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "t_profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "t_project_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "t_project_leader_id_fkey"
            columns: ["leader_id"]
            isOneToOne: false
            referencedRelation: "t_profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "t_project_leader_id_fkey"
            columns: ["leader_id"]
            isOneToOne: false
            referencedRelation: "v_profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "t_project_space_id_fkey"
            columns: ["space_id"]
            isOneToOne: false
            referencedRelation: "t_space"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "t_project_space_id_fkey"
            columns: ["space_id"]
            isOneToOne: false
            referencedRelation: "v_space"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "t_project_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "t_profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "t_project_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_profile"
            referencedColumns: ["id"]
          },
        ]
      }
      t_project_requirement: {
        Row: {
          content: string
          created_at: string | null
          created_by: string | null
          created_kino_id: string | null
          deleted_at: string | null
          id: string
          is_required: boolean | null
          sort_order: number | null
          updated_at: string | null
          updated_by: string | null
          updated_kino_id: string | null
        }
        Insert: {
          content: string
          created_at?: string | null
          created_by?: string | null
          created_kino_id?: string | null
          deleted_at?: string | null
          id?: string
          is_required?: boolean | null
          sort_order?: number | null
          updated_at?: string | null
          updated_by?: string | null
          updated_kino_id?: string | null
        }
        Update: {
          content?: string
          created_at?: string | null
          created_by?: string | null
          created_kino_id?: string | null
          deleted_at?: string | null
          id?: string
          is_required?: boolean | null
          sort_order?: number | null
          updated_at?: string | null
          updated_by?: string | null
          updated_kino_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "t_project_requirement_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "t_profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "t_project_requirement_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "t_project_requirement_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "t_profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "t_project_requirement_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_profile"
            referencedColumns: ["id"]
          },
        ]
      }
      t_space: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          created_by: string | null
          created_kino_id: string | null
          deleted_at: string | null
          description: string | null
          display_name: string
          id: string
          is_personal: boolean | null
          owner_id: string
          updated_at: string | null
          updated_by: string | null
          updated_kino_id: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          created_by?: string | null
          created_kino_id?: string | null
          deleted_at?: string | null
          description?: string | null
          display_name: string
          id?: string
          is_personal?: boolean | null
          owner_id: string
          updated_at?: string | null
          updated_by?: string | null
          updated_kino_id?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          created_by?: string | null
          created_kino_id?: string | null
          deleted_at?: string | null
          description?: string | null
          display_name?: string
          id?: string
          is_personal?: boolean | null
          owner_id?: string
          updated_at?: string | null
          updated_by?: string | null
          updated_kino_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "t_space_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "t_profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "t_space_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "t_space_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "t_profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "t_space_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "v_profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "t_space_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "t_profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "t_space_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_profile"
            referencedColumns: ["id"]
          },
        ]
      }
      t_task: {
        Row: {
          actual_end_at: string | null
          actual_hours: number | null
          actual_start_at: string | null
          category_rel_id: string | null
          created_at: string | null
          created_by: string | null
          created_kino_id: string | null
          deleted_at: string | null
          description: string | null
          estimated_hours: number | null
          id: string
          main_assignee_id: string | null
          plan_end_at: string | null
          plan_start_at: string | null
          priority: string
          project_id: string
          reviewer_id: string | null
          sort_order: number | null
          status_rel_id: string | null
          title: string
          updated_at: string | null
          updated_by: string | null
          updated_kino_id: string | null
        }
        Insert: {
          actual_end_at?: string | null
          actual_hours?: number | null
          actual_start_at?: string | null
          category_rel_id?: string | null
          created_at?: string | null
          created_by?: string | null
          created_kino_id?: string | null
          deleted_at?: string | null
          description?: string | null
          estimated_hours?: number | null
          id?: string
          main_assignee_id?: string | null
          plan_end_at?: string | null
          plan_start_at?: string | null
          priority: string
          project_id: string
          reviewer_id?: string | null
          sort_order?: number | null
          status_rel_id?: string | null
          title: string
          updated_at?: string | null
          updated_by?: string | null
          updated_kino_id?: string | null
        }
        Update: {
          actual_end_at?: string | null
          actual_hours?: number | null
          actual_start_at?: string | null
          category_rel_id?: string | null
          created_at?: string | null
          created_by?: string | null
          created_kino_id?: string | null
          deleted_at?: string | null
          description?: string | null
          estimated_hours?: number | null
          id?: string
          main_assignee_id?: string | null
          plan_end_at?: string | null
          plan_start_at?: string | null
          priority?: string
          project_id?: string
          reviewer_id?: string | null
          sort_order?: number | null
          status_rel_id?: string | null
          title?: string
          updated_at?: string | null
          updated_by?: string | null
          updated_kino_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "t_task_category_rel_id_fkey"
            columns: ["category_rel_id"]
            isOneToOne: false
            referencedRelation: "r_project_task_category"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "t_task_category_rel_id_fkey"
            columns: ["category_rel_id"]
            isOneToOne: false
            referencedRelation: "v_project_task_category_relation"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "t_task_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "t_profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "t_task_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "t_task_main_assignee_id_fkey"
            columns: ["main_assignee_id"]
            isOneToOne: false
            referencedRelation: "t_profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "t_task_main_assignee_id_fkey"
            columns: ["main_assignee_id"]
            isOneToOne: false
            referencedRelation: "v_profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "t_task_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "t_project"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "t_task_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "v_project"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "t_task_reviewer_id_fkey"
            columns: ["reviewer_id"]
            isOneToOne: false
            referencedRelation: "t_profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "t_task_reviewer_id_fkey"
            columns: ["reviewer_id"]
            isOneToOne: false
            referencedRelation: "v_profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "t_task_status_rel_id_fkey"
            columns: ["status_rel_id"]
            isOneToOne: false
            referencedRelation: "r_project_task_status"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "t_task_status_rel_id_fkey"
            columns: ["status_rel_id"]
            isOneToOne: false
            referencedRelation: "v_project_task_status_relation"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "t_task_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "t_profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "t_task_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_profile"
            referencedColumns: ["id"]
          },
        ]
      }
      t_task_attachment: {
        Row: {
          created_at: string | null
          created_by: string | null
          created_kino_id: string | null
          deleted_at: string | null
          file_url: string
          id: string
          updated_at: string | null
          updated_by: string | null
          updated_kino_id: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          created_kino_id?: string | null
          deleted_at?: string | null
          file_url: string
          id?: string
          updated_at?: string | null
          updated_by?: string | null
          updated_kino_id?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          created_kino_id?: string | null
          deleted_at?: string | null
          file_url?: string
          id?: string
          updated_at?: string | null
          updated_by?: string | null
          updated_kino_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "t_task_attachment_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "t_profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "t_task_attachment_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "t_task_attachment_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "t_profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "t_task_attachment_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_profile"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      v_notification: {
        Row: {
          created_at: string | null
          created_by: string | null
          created_kino_id: string | null
          deleted_at: string | null
          description: string | null
          id: string | null
          parameters: Json | null
          target_profile_id: string | null
          target_project_id: string | null
          target_space_id: string | null
          title: string | null
          type: string | null
          updated_at: string | null
          updated_by: string | null
          updated_kino_id: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          created_kino_id?: string | null
          deleted_at?: string | null
          description?: string | null
          id?: string | null
          parameters?: Json | null
          target_profile_id?: string | null
          target_project_id?: string | null
          target_space_id?: string | null
          title?: string | null
          type?: string | null
          updated_at?: string | null
          updated_by?: string | null
          updated_kino_id?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          created_kino_id?: string | null
          deleted_at?: string | null
          description?: string | null
          id?: string | null
          parameters?: Json | null
          target_profile_id?: string | null
          target_project_id?: string | null
          target_space_id?: string | null
          title?: string | null
          type?: string | null
          updated_at?: string | null
          updated_by?: string | null
          updated_kino_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "t_notification_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "t_profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "t_notification_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "t_notification_target_profile_id_fkey"
            columns: ["target_profile_id"]
            isOneToOne: false
            referencedRelation: "t_profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "t_notification_target_profile_id_fkey"
            columns: ["target_profile_id"]
            isOneToOne: false
            referencedRelation: "v_profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "t_notification_target_project_id_fkey"
            columns: ["target_project_id"]
            isOneToOne: false
            referencedRelation: "t_project"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "t_notification_target_project_id_fkey"
            columns: ["target_project_id"]
            isOneToOne: false
            referencedRelation: "v_project"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "t_notification_target_space_id_fkey"
            columns: ["target_space_id"]
            isOneToOne: false
            referencedRelation: "t_space"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "t_notification_target_space_id_fkey"
            columns: ["target_space_id"]
            isOneToOne: false
            referencedRelation: "v_space"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "t_notification_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "t_profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "t_notification_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_profile"
            referencedColumns: ["id"]
          },
        ]
      }
      v_notification_read: {
        Row: {
          created_at: string | null
          created_by: string | null
          created_kino_id: string | null
          deleted_at: string | null
          notification_id: string | null
          updated_at: string | null
          updated_by: string | null
          updated_kino_id: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          created_kino_id?: string | null
          deleted_at?: string | null
          notification_id?: string | null
          updated_at?: string | null
          updated_by?: string | null
          updated_kino_id?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          created_kino_id?: string | null
          deleted_at?: string | null
          notification_id?: string | null
          updated_at?: string | null
          updated_by?: string | null
          updated_kino_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "t_notification_read_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "t_profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "t_notification_read_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "t_notification_read_notification_id_fkey"
            columns: ["notification_id"]
            isOneToOne: false
            referencedRelation: "t_notification"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "t_notification_read_notification_id_fkey"
            columns: ["notification_id"]
            isOneToOne: false
            referencedRelation: "v_notification"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "t_notification_read_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "t_profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "t_notification_read_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_profile"
            referencedColumns: ["id"]
          },
        ]
      }
      v_profile: {
        Row: {
          affiliation: string | null
          avatar_url: string | null
          bio: string | null
          created_at: string | null
          created_by: string | null
          created_kino_id: string | null
          deleted_at: string | null
          display_name: string | null
          id: string | null
          is_setup_completed: boolean | null
          updated_at: string | null
          updated_by: string | null
          updated_kino_id: string | null
          user_name: string | null
        }
        Insert: {
          affiliation?: string | null
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          created_by?: string | null
          created_kino_id?: string | null
          deleted_at?: string | null
          display_name?: string | null
          id?: string | null
          is_setup_completed?: boolean | null
          updated_at?: string | null
          updated_by?: string | null
          updated_kino_id?: string | null
          user_name?: string | null
        }
        Update: {
          affiliation?: string | null
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          created_by?: string | null
          created_kino_id?: string | null
          deleted_at?: string | null
          display_name?: string | null
          id?: string | null
          is_setup_completed?: boolean | null
          updated_at?: string | null
          updated_by?: string | null
          updated_kino_id?: string | null
          user_name?: string | null
        }
        Relationships: []
      }
      v_profile_skill_relation: {
        Row: {
          created_at: string | null
          created_by: string | null
          created_kino_id: string | null
          deleted_at: string | null
          profile_id: string | null
          skill_tag_id: string | null
          updated_at: string | null
          updated_by: string | null
          updated_kino_id: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          created_kino_id?: string | null
          deleted_at?: string | null
          profile_id?: string | null
          skill_tag_id?: string | null
          updated_at?: string | null
          updated_by?: string | null
          updated_kino_id?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          created_kino_id?: string | null
          deleted_at?: string | null
          profile_id?: string | null
          skill_tag_id?: string | null
          updated_at?: string | null
          updated_by?: string | null
          updated_kino_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "r_profile_skill_tag_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "t_profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "r_profile_skill_tag_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "r_profile_skill_tag_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "t_profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "r_profile_skill_tag_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "v_profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "r_profile_skill_tag_skill_tag_id_fkey"
            columns: ["skill_tag_id"]
            isOneToOne: false
            referencedRelation: "m_profile_skill_tag"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "r_profile_skill_tag_skill_tag_id_fkey"
            columns: ["skill_tag_id"]
            isOneToOne: false
            referencedRelation: "v_profile_skill_tag"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "r_profile_skill_tag_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "t_profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "r_profile_skill_tag_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_profile"
            referencedColumns: ["id"]
          },
        ]
      }
      v_profile_skill_tag: {
        Row: {
          created_at: string | null
          created_by: string | null
          created_kino_id: string | null
          deleted_at: string | null
          id: string | null
          name: string | null
          updated_at: string | null
          updated_by: string | null
          updated_kino_id: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          created_kino_id?: string | null
          deleted_at?: string | null
          id?: string | null
          name?: string | null
          updated_at?: string | null
          updated_by?: string | null
          updated_kino_id?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          created_kino_id?: string | null
          deleted_at?: string | null
          id?: string | null
          name?: string | null
          updated_at?: string | null
          updated_by?: string | null
          updated_kino_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "m_profile_skill_tag_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "t_profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "m_profile_skill_tag_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "m_profile_skill_tag_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "t_profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "m_profile_skill_tag_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_profile"
            referencedColumns: ["id"]
          },
        ]
      }
      v_project: {
        Row: {
          category_id: string | null
          created_at: string | null
          created_by: string | null
          created_kino_id: string | null
          deleted_at: string | null
          description: string | null
          end_date: string | null
          icon_url: string | null
          id: string | null
          is_public: boolean | null
          leader_id: string | null
          max_members: number | null
          space_id: string | null
          start_date: string | null
          status: string | null
          title: string | null
          updated_at: string | null
          updated_by: string | null
          updated_kino_id: string | null
        }
        Insert: {
          category_id?: string | null
          created_at?: string | null
          created_by?: string | null
          created_kino_id?: string | null
          deleted_at?: string | null
          description?: string | null
          end_date?: string | null
          icon_url?: string | null
          id?: string | null
          is_public?: boolean | null
          leader_id?: string | null
          max_members?: number | null
          space_id?: string | null
          start_date?: string | null
          status?: string | null
          title?: string | null
          updated_at?: string | null
          updated_by?: string | null
          updated_kino_id?: string | null
        }
        Update: {
          category_id?: string | null
          created_at?: string | null
          created_by?: string | null
          created_kino_id?: string | null
          deleted_at?: string | null
          description?: string | null
          end_date?: string | null
          icon_url?: string | null
          id?: string | null
          is_public?: boolean | null
          leader_id?: string | null
          max_members?: number | null
          space_id?: string | null
          start_date?: string | null
          status?: string | null
          title?: string | null
          updated_at?: string | null
          updated_by?: string | null
          updated_kino_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "t_project_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "m_project_category"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "t_project_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "v_project_category"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "t_project_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "t_profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "t_project_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "t_project_leader_id_fkey"
            columns: ["leader_id"]
            isOneToOne: false
            referencedRelation: "t_profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "t_project_leader_id_fkey"
            columns: ["leader_id"]
            isOneToOne: false
            referencedRelation: "v_profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "t_project_space_id_fkey"
            columns: ["space_id"]
            isOneToOne: false
            referencedRelation: "t_space"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "t_project_space_id_fkey"
            columns: ["space_id"]
            isOneToOne: false
            referencedRelation: "v_space"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "t_project_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "t_profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "t_project_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_profile"
            referencedColumns: ["id"]
          },
        ]
      }
      v_project_category: {
        Row: {
          created_at: string | null
          created_by: string | null
          created_kino_id: string | null
          deleted_at: string | null
          end_date: string | null
          icon_url: string | null
          id: string | null
          name: string | null
          space_id: string | null
          start_date: string | null
          updated_at: string | null
          updated_by: string | null
          updated_kino_id: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          created_kino_id?: string | null
          deleted_at?: string | null
          end_date?: string | null
          icon_url?: string | null
          id?: string | null
          name?: string | null
          space_id?: string | null
          start_date?: string | null
          updated_at?: string | null
          updated_by?: string | null
          updated_kino_id?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          created_kino_id?: string | null
          deleted_at?: string | null
          end_date?: string | null
          icon_url?: string | null
          id?: string | null
          name?: string | null
          space_id?: string | null
          start_date?: string | null
          updated_at?: string | null
          updated_by?: string | null
          updated_kino_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "m_project_category_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "t_profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "m_project_category_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "m_project_category_space_id_fkey"
            columns: ["space_id"]
            isOneToOne: false
            referencedRelation: "t_space"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "m_project_category_space_id_fkey"
            columns: ["space_id"]
            isOneToOne: false
            referencedRelation: "v_space"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "m_project_category_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "t_profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "m_project_category_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_profile"
            referencedColumns: ["id"]
          },
        ]
      }
      v_project_member: {
        Row: {
          created_at: string | null
          created_by: string | null
          created_kino_id: string | null
          deleted_at: string | null
          profile_id: string | null
          project_id: string | null
          role: string | null
          updated_at: string | null
          updated_by: string | null
          updated_kino_id: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          created_kino_id?: string | null
          deleted_at?: string | null
          profile_id?: string | null
          project_id?: string | null
          role?: string | null
          updated_at?: string | null
          updated_by?: string | null
          updated_kino_id?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          created_kino_id?: string | null
          deleted_at?: string | null
          profile_id?: string | null
          project_id?: string | null
          role?: string | null
          updated_at?: string | null
          updated_by?: string | null
          updated_kino_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "r_project_member_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "t_profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "r_project_member_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "r_project_member_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "t_profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "r_project_member_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "v_profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "r_project_member_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "t_project"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "r_project_member_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "v_project"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "r_project_member_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "t_profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "r_project_member_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_profile"
            referencedColumns: ["id"]
          },
        ]
      }
      v_project_requirement: {
        Row: {
          content: string | null
          created_at: string | null
          created_by: string | null
          created_kino_id: string | null
          deleted_at: string | null
          id: string | null
          is_required: boolean | null
          sort_order: number | null
          updated_at: string | null
          updated_by: string | null
          updated_kino_id: string | null
        }
        Insert: {
          content?: string | null
          created_at?: string | null
          created_by?: string | null
          created_kino_id?: string | null
          deleted_at?: string | null
          id?: string | null
          is_required?: boolean | null
          sort_order?: number | null
          updated_at?: string | null
          updated_by?: string | null
          updated_kino_id?: string | null
        }
        Update: {
          content?: string | null
          created_at?: string | null
          created_by?: string | null
          created_kino_id?: string | null
          deleted_at?: string | null
          id?: string | null
          is_required?: boolean | null
          sort_order?: number | null
          updated_at?: string | null
          updated_by?: string | null
          updated_kino_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "t_project_requirement_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "t_profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "t_project_requirement_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "t_project_requirement_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "t_profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "t_project_requirement_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_profile"
            referencedColumns: ["id"]
          },
        ]
      }
      v_project_requirement_relation: {
        Row: {
          created_at: string | null
          created_by: string | null
          created_kino_id: string | null
          deleted_at: string | null
          project_id: string | null
          requirement_id: string | null
          updated_at: string | null
          updated_by: string | null
          updated_kino_id: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          created_kino_id?: string | null
          deleted_at?: string | null
          project_id?: string | null
          requirement_id?: string | null
          updated_at?: string | null
          updated_by?: string | null
          updated_kino_id?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          created_kino_id?: string | null
          deleted_at?: string | null
          project_id?: string | null
          requirement_id?: string | null
          updated_at?: string | null
          updated_by?: string | null
          updated_kino_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "r_project_requirement_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "t_profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "r_project_requirement_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "r_project_requirement_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "t_project"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "r_project_requirement_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "v_project"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "r_project_requirement_requirement_id_fkey"
            columns: ["requirement_id"]
            isOneToOne: false
            referencedRelation: "t_project_requirement"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "r_project_requirement_requirement_id_fkey"
            columns: ["requirement_id"]
            isOneToOne: false
            referencedRelation: "v_project_requirement"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "r_project_requirement_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "t_profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "r_project_requirement_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_profile"
            referencedColumns: ["id"]
          },
        ]
      }
      v_project_task_category: {
        Row: {
          created_at: string | null
          created_by: string | null
          created_kino_id: string | null
          deleted_at: string | null
          id: string | null
          name: string | null
          project_id: string | null
          sort_order: number | null
          updated_at: string | null
          updated_by: string | null
          updated_kino_id: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          created_kino_id?: string | null
          deleted_at?: string | null
          id?: string | null
          name?: string | null
          project_id?: string | null
          sort_order?: number | null
          updated_at?: string | null
          updated_by?: string | null
          updated_kino_id?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          created_kino_id?: string | null
          deleted_at?: string | null
          id?: string | null
          name?: string | null
          project_id?: string | null
          sort_order?: number | null
          updated_at?: string | null
          updated_by?: string | null
          updated_kino_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "m_project_task_category_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "t_profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "m_project_task_category_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "m_project_task_category_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "t_project"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "m_project_task_category_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "v_project"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "m_project_task_category_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "t_profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "m_project_task_category_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_profile"
            referencedColumns: ["id"]
          },
        ]
      }
      v_project_task_category_relation: {
        Row: {
          category_id: string | null
          created_at: string | null
          created_by: string | null
          created_kino_id: string | null
          deleted_at: string | null
          id: string | null
          project_id: string | null
          updated_at: string | null
          updated_by: string | null
          updated_kino_id: string | null
        }
        Insert: {
          category_id?: string | null
          created_at?: string | null
          created_by?: string | null
          created_kino_id?: string | null
          deleted_at?: string | null
          id?: string | null
          project_id?: string | null
          updated_at?: string | null
          updated_by?: string | null
          updated_kino_id?: string | null
        }
        Update: {
          category_id?: string | null
          created_at?: string | null
          created_by?: string | null
          created_kino_id?: string | null
          deleted_at?: string | null
          id?: string | null
          project_id?: string | null
          updated_at?: string | null
          updated_by?: string | null
          updated_kino_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "r_project_task_category_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "m_project_task_category"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "r_project_task_category_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "v_project_task_category"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "r_project_task_category_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "t_profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "r_project_task_category_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "r_project_task_category_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "t_project"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "r_project_task_category_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "v_project"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "r_project_task_category_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "t_profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "r_project_task_category_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_profile"
            referencedColumns: ["id"]
          },
        ]
      }
      v_project_task_status: {
        Row: {
          created_at: string | null
          created_by: string | null
          created_kino_id: string | null
          deleted_at: string | null
          id: string | null
          name: string | null
          project_id: string | null
          sort_order: number | null
          updated_at: string | null
          updated_by: string | null
          updated_kino_id: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          created_kino_id?: string | null
          deleted_at?: string | null
          id?: string | null
          name?: string | null
          project_id?: string | null
          sort_order?: number | null
          updated_at?: string | null
          updated_by?: string | null
          updated_kino_id?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          created_kino_id?: string | null
          deleted_at?: string | null
          id?: string | null
          name?: string | null
          project_id?: string | null
          sort_order?: number | null
          updated_at?: string | null
          updated_by?: string | null
          updated_kino_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "m_project_task_status_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "t_profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "m_project_task_status_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "m_project_task_status_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "t_project"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "m_project_task_status_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "v_project"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "m_project_task_status_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "t_profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "m_project_task_status_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_profile"
            referencedColumns: ["id"]
          },
        ]
      }
      v_project_task_status_relation: {
        Row: {
          created_at: string | null
          created_by: string | null
          created_kino_id: string | null
          deleted_at: string | null
          id: string | null
          project_id: string | null
          status_id: string | null
          updated_at: string | null
          updated_by: string | null
          updated_kino_id: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          created_kino_id?: string | null
          deleted_at?: string | null
          id?: string | null
          project_id?: string | null
          status_id?: string | null
          updated_at?: string | null
          updated_by?: string | null
          updated_kino_id?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          created_kino_id?: string | null
          deleted_at?: string | null
          id?: string | null
          project_id?: string | null
          status_id?: string | null
          updated_at?: string | null
          updated_by?: string | null
          updated_kino_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "r_project_task_status_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "t_profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "r_project_task_status_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "r_project_task_status_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "t_project"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "r_project_task_status_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "v_project"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "r_project_task_status_status_id_fkey"
            columns: ["status_id"]
            isOneToOne: false
            referencedRelation: "m_project_task_status"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "r_project_task_status_status_id_fkey"
            columns: ["status_id"]
            isOneToOne: false
            referencedRelation: "v_project_task_status"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "r_project_task_status_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "t_profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "r_project_task_status_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_profile"
            referencedColumns: ["id"]
          },
        ]
      }
      v_project_tool: {
        Row: {
          created_at: string | null
          created_by: string | null
          created_kino_id: string | null
          deleted_at: string | null
          id: string | null
          name: string | null
          space_id: string | null
          updated_at: string | null
          updated_by: string | null
          updated_kino_id: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          created_kino_id?: string | null
          deleted_at?: string | null
          id?: string | null
          name?: string | null
          space_id?: string | null
          updated_at?: string | null
          updated_by?: string | null
          updated_kino_id?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          created_kino_id?: string | null
          deleted_at?: string | null
          id?: string | null
          name?: string | null
          space_id?: string | null
          updated_at?: string | null
          updated_by?: string | null
          updated_kino_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "m_project_tool_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "t_profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "m_project_tool_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "m_project_tool_space_id_fkey"
            columns: ["space_id"]
            isOneToOne: false
            referencedRelation: "t_space"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "m_project_tool_space_id_fkey"
            columns: ["space_id"]
            isOneToOne: false
            referencedRelation: "v_space"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "m_project_tool_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "t_profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "m_project_tool_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_profile"
            referencedColumns: ["id"]
          },
        ]
      }
      v_project_tool_relation: {
        Row: {
          created_at: string | null
          created_by: string | null
          created_kino_id: string | null
          deleted_at: string | null
          project_id: string | null
          tool_id: string | null
          updated_at: string | null
          updated_by: string | null
          updated_kino_id: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          created_kino_id?: string | null
          deleted_at?: string | null
          project_id?: string | null
          tool_id?: string | null
          updated_at?: string | null
          updated_by?: string | null
          updated_kino_id?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          created_kino_id?: string | null
          deleted_at?: string | null
          project_id?: string | null
          tool_id?: string | null
          updated_at?: string | null
          updated_by?: string | null
          updated_kino_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "r_project_tool_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "t_profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "r_project_tool_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "r_project_tool_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "t_project"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "r_project_tool_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "v_project"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "r_project_tool_tool_id_fkey"
            columns: ["tool_id"]
            isOneToOne: false
            referencedRelation: "m_project_tool"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "r_project_tool_tool_id_fkey"
            columns: ["tool_id"]
            isOneToOne: false
            referencedRelation: "v_project_tool"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "r_project_tool_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "t_profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "r_project_tool_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_profile"
            referencedColumns: ["id"]
          },
        ]
      }
      v_space: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          created_by: string | null
          created_kino_id: string | null
          deleted_at: string | null
          description: string | null
          display_name: string | null
          id: string | null
          is_personal: boolean | null
          owner_id: string | null
          updated_at: string | null
          updated_by: string | null
          updated_kino_id: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          created_by?: string | null
          created_kino_id?: string | null
          deleted_at?: string | null
          description?: string | null
          display_name?: string | null
          id?: string | null
          is_personal?: boolean | null
          owner_id?: string | null
          updated_at?: string | null
          updated_by?: string | null
          updated_kino_id?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          created_by?: string | null
          created_kino_id?: string | null
          deleted_at?: string | null
          description?: string | null
          display_name?: string | null
          id?: string | null
          is_personal?: boolean | null
          owner_id?: string | null
          updated_at?: string | null
          updated_by?: string | null
          updated_kino_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "t_space_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "t_profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "t_space_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "t_space_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "t_profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "t_space_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "v_profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "t_space_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "t_profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "t_space_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_profile"
            referencedColumns: ["id"]
          },
        ]
      }
      v_space_relation: {
        Row: {
          created_at: string | null
          created_by: string | null
          created_kino_id: string | null
          deleted_at: string | null
          profile_id: string | null
          role: string | null
          space_id: string | null
          status: string | null
          updated_at: string | null
          updated_by: string | null
          updated_kino_id: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          created_kino_id?: string | null
          deleted_at?: string | null
          profile_id?: string | null
          role?: string | null
          space_id?: string | null
          status?: string | null
          updated_at?: string | null
          updated_by?: string | null
          updated_kino_id?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          created_kino_id?: string | null
          deleted_at?: string | null
          profile_id?: string | null
          role?: string | null
          space_id?: string | null
          status?: string | null
          updated_at?: string | null
          updated_by?: string | null
          updated_kino_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "r_space_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "t_profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "r_space_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "r_space_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "t_profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "r_space_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "v_profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "r_space_space_id_fkey"
            columns: ["space_id"]
            isOneToOne: false
            referencedRelation: "t_space"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "r_space_space_id_fkey"
            columns: ["space_id"]
            isOneToOne: false
            referencedRelation: "v_space"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "r_space_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "t_profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "r_space_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_profile"
            referencedColumns: ["id"]
          },
        ]
      }
      v_task: {
        Row: {
          actual_end_at: string | null
          actual_hours: number | null
          actual_start_at: string | null
          category_rel_id: string | null
          created_at: string | null
          created_by: string | null
          created_kino_id: string | null
          deleted_at: string | null
          description: string | null
          estimated_hours: number | null
          id: string | null
          main_assignee_id: string | null
          plan_end_at: string | null
          plan_start_at: string | null
          priority: string | null
          project_id: string | null
          reviewer_id: string | null
          sort_order: number | null
          status_rel_id: string | null
          title: string | null
          updated_at: string | null
          updated_by: string | null
          updated_kino_id: string | null
        }
        Insert: {
          actual_end_at?: string | null
          actual_hours?: number | null
          actual_start_at?: string | null
          category_rel_id?: string | null
          created_at?: string | null
          created_by?: string | null
          created_kino_id?: string | null
          deleted_at?: string | null
          description?: string | null
          estimated_hours?: number | null
          id?: string | null
          main_assignee_id?: string | null
          plan_end_at?: string | null
          plan_start_at?: string | null
          priority?: string | null
          project_id?: string | null
          reviewer_id?: string | null
          sort_order?: number | null
          status_rel_id?: string | null
          title?: string | null
          updated_at?: string | null
          updated_by?: string | null
          updated_kino_id?: string | null
        }
        Update: {
          actual_end_at?: string | null
          actual_hours?: number | null
          actual_start_at?: string | null
          category_rel_id?: string | null
          created_at?: string | null
          created_by?: string | null
          created_kino_id?: string | null
          deleted_at?: string | null
          description?: string | null
          estimated_hours?: number | null
          id?: string | null
          main_assignee_id?: string | null
          plan_end_at?: string | null
          plan_start_at?: string | null
          priority?: string | null
          project_id?: string | null
          reviewer_id?: string | null
          sort_order?: number | null
          status_rel_id?: string | null
          title?: string | null
          updated_at?: string | null
          updated_by?: string | null
          updated_kino_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "t_task_category_rel_id_fkey"
            columns: ["category_rel_id"]
            isOneToOne: false
            referencedRelation: "r_project_task_category"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "t_task_category_rel_id_fkey"
            columns: ["category_rel_id"]
            isOneToOne: false
            referencedRelation: "v_project_task_category_relation"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "t_task_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "t_profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "t_task_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "t_task_main_assignee_id_fkey"
            columns: ["main_assignee_id"]
            isOneToOne: false
            referencedRelation: "t_profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "t_task_main_assignee_id_fkey"
            columns: ["main_assignee_id"]
            isOneToOne: false
            referencedRelation: "v_profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "t_task_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "t_project"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "t_task_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "v_project"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "t_task_reviewer_id_fkey"
            columns: ["reviewer_id"]
            isOneToOne: false
            referencedRelation: "t_profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "t_task_reviewer_id_fkey"
            columns: ["reviewer_id"]
            isOneToOne: false
            referencedRelation: "v_profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "t_task_status_rel_id_fkey"
            columns: ["status_rel_id"]
            isOneToOne: false
            referencedRelation: "r_project_task_status"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "t_task_status_rel_id_fkey"
            columns: ["status_rel_id"]
            isOneToOne: false
            referencedRelation: "v_project_task_status_relation"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "t_task_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "t_profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "t_task_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_profile"
            referencedColumns: ["id"]
          },
        ]
      }
      v_task_assignee: {
        Row: {
          created_at: string | null
          created_by: string | null
          created_kino_id: string | null
          deleted_at: string | null
          profile_id: string | null
          task_id: string | null
          updated_at: string | null
          updated_by: string | null
          updated_kino_id: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          created_kino_id?: string | null
          deleted_at?: string | null
          profile_id?: string | null
          task_id?: string | null
          updated_at?: string | null
          updated_by?: string | null
          updated_kino_id?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          created_kino_id?: string | null
          deleted_at?: string | null
          profile_id?: string | null
          task_id?: string | null
          updated_at?: string | null
          updated_by?: string | null
          updated_kino_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "r_task_assignee_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "t_profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "r_task_assignee_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "r_task_assignee_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "t_profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "r_task_assignee_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "v_profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "r_task_assignee_task_id_fkey"
            columns: ["task_id"]
            isOneToOne: false
            referencedRelation: "t_task"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "r_task_assignee_task_id_fkey"
            columns: ["task_id"]
            isOneToOne: false
            referencedRelation: "v_task"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "r_task_assignee_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "t_profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "r_task_assignee_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_profile"
            referencedColumns: ["id"]
          },
        ]
      }
      v_task_attachment: {
        Row: {
          created_at: string | null
          created_by: string | null
          created_kino_id: string | null
          deleted_at: string | null
          file_url: string | null
          id: string | null
          updated_at: string | null
          updated_by: string | null
          updated_kino_id: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          created_kino_id?: string | null
          deleted_at?: string | null
          file_url?: string | null
          id?: string | null
          updated_at?: string | null
          updated_by?: string | null
          updated_kino_id?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          created_kino_id?: string | null
          deleted_at?: string | null
          file_url?: string | null
          id?: string | null
          updated_at?: string | null
          updated_by?: string | null
          updated_kino_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "t_task_attachment_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "t_profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "t_task_attachment_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "t_task_attachment_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "t_profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "t_task_attachment_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_profile"
            referencedColumns: ["id"]
          },
        ]
      }
      v_task_attachment_relation: {
        Row: {
          attachment_id: string | null
          created_at: string | null
          created_by: string | null
          created_kino_id: string | null
          deleted_at: string | null
          task_id: string | null
          updated_at: string | null
          updated_by: string | null
          updated_kino_id: string | null
        }
        Insert: {
          attachment_id?: string | null
          created_at?: string | null
          created_by?: string | null
          created_kino_id?: string | null
          deleted_at?: string | null
          task_id?: string | null
          updated_at?: string | null
          updated_by?: string | null
          updated_kino_id?: string | null
        }
        Update: {
          attachment_id?: string | null
          created_at?: string | null
          created_by?: string | null
          created_kino_id?: string | null
          deleted_at?: string | null
          task_id?: string | null
          updated_at?: string | null
          updated_by?: string | null
          updated_kino_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "r_task_attachment_attachment_id_fkey"
            columns: ["attachment_id"]
            isOneToOne: false
            referencedRelation: "t_task_attachment"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "r_task_attachment_attachment_id_fkey"
            columns: ["attachment_id"]
            isOneToOne: false
            referencedRelation: "v_task_attachment"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "r_task_attachment_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "t_profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "r_task_attachment_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "r_task_attachment_task_id_fkey"
            columns: ["task_id"]
            isOneToOne: false
            referencedRelation: "t_task"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "r_task_attachment_task_id_fkey"
            columns: ["task_id"]
            isOneToOne: false
            referencedRelation: "v_task"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "r_task_attachment_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "t_profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "r_task_attachment_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_profile"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
