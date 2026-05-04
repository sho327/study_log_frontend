import { Database } from './database.types'

/**
 * t_task テーブルの単一行のデータ型
 */
export type T_TaskRow = Database['public']['Tables']['t_task']['Row']

/**
 * r_task_assignee テーブルの単一行のデータ型
 */
export type R_TaskAssigneeRow = Database['public']['Tables']['r_task_assignee']['Row']

/**
 * t_task_attachment テーブルの単一行のデータ型
 */
export type T_TaskAttachmentRow = Database['public']['Tables']['t_task_attachment']['Row']

/**
 * r_task_attachment テーブルの単一行のデータ型
 */
export type R_TaskAttachmentRow = Database['public']['Tables']['r_task_attachment']['Row']
