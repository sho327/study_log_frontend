import { Database } from './database.types'

/**
 * t_project テーブルの単一行のデータ型
 */
export type T_ProjectRow = Database['public']['Tables']['t_project']['Row']

/**
 * m_project_category テーブルの単一行のデータ型
 */
export type M_ProjectCategoryRow = Database['public']['Tables']['m_project_category']['Row']

/**
 * r_project_member テーブルの単一行のデータ型
 */
export type R_ProjectMemberRow = Database['public']['Tables']['r_project_member']['Row']

/**
 * m_project_tool テーブルの単一行のデータ型
 */
export type M_ProjectToolRow = Database['public']['Tables']['m_project_tool']['Row']

/**
 * r_project_tool テーブルの単一行のデータ型
 */
export type R_ProjectToolRow = Database['public']['Tables']['r_project_tool']['Row']

/**
 * t_project_requirement テーブルの単一行のデータ型
 */
export type T_ProjectRequirementRow = Database['public']['Tables']['t_project_requirement']['Row']

/**
 * r_project_requirement テーブルの単一行のデータ型
 */
export type R_ProjectRequirementRow = Database['public']['Tables']['r_project_requirement']['Row']
