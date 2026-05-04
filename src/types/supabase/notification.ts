import { Database } from './database.types'

/**
 * t_notification テーブルの単一行のデータ型
 */
export type T_NotificationRow = Database['public']['Tables']['t_notification']['Row']

/**
 * t_notification_read テーブルの単一行のデータ型
 */
export type T_NotificationReadRow = Database['public']['Tables']['t_notification_read']['Row']
