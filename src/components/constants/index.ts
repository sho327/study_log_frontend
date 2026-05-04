/**
 * 共通定数の設定
 * @args
 * @createdBy KatoShogo
 * @createdAt 2026/01/18
 */

// ============================================================================
// 定数
// ============================================================================
// アプリ名
export const appInfo = {
    APP_NAME: 'Unimoa',
    APP_DESCRIPTION: 'Unimoa',
    GENERATOR: 'React/Next.js',
}
/** ページルート一覧 */
export const pageRoutes = {
    TOP: `/`,
    AUTH: {
        LOGIN: `/login`,
        SIGNUP: `/signup`,
        INITIAL_SETUP: `/initial_setup`,
        QUICK_SETUP: `/quick_setup`,
        PASSWORD_RESET_REQUEST: `/password_reset_request`,
        PASSWORD_RESET: `/password_reset`,
        USER_ACTIVATE_REQUEST: `/user_activate_request`,
        USER_ACTIVATE: `/user_activate`,
    },
    MAIN: {
        DASHBOARD: `/dashboard`,
        PROJECT_LIST: `/project/list`,
        PROJECT_DETAIL: `/project/detail`,
        PROJECT_SAVE: `/project/save`,
        PROJECT_MEMBER_LIST: `/project/member/list`,
        MEMBER_LIST: `/member/list`,
        NOTIFICATION_LIST: `/notification/list`,
        NOTIFICATION_DETAIL: `/notification/detail`,
    },
    PROJECT: {
        DASHBOARD: `/project/xxx/dashboard`,
        TASK: {
            LIST: `/project/xxx/task/list`,
            DETAIL: `/project/xxx/task/detail`,
            SAVE: `/project/xxx/task/save`,
        },
        MEMBER: {
            LIST: `/project/xxx/member/list`,
        }
    }
}
export const selectedSpaceIdCookie = 'selected-space-id'
