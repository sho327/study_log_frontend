import { Database } from './database.types'

/**
 * t_profile テーブルの単一行のデータ型
 */
export type T_ProfileRow = Database['public']['Tables']['t_profile']['Row']

/**
 * m_profile_skill_tag テーブルの単一行のデータ型
 */
export type M_ProfileSkillTagRow = Database['public']['Tables']['m_profile_skill_tag']['Row']

/**
 * r_profile_skill_tag テーブルの単一行のデータ型
 */
export type R_ProfileSkillTagRow = Database['public']['Tables']['r_profile_skill_tag']['Row']
