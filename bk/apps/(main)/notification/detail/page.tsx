import NotificationDetail from "@/components/page/main/notification/detail";

export default function Page() {
    // 実際には params.id に基づいてデータを取得するが、現在はモックデータを使用
    const mockNotif = {
        id: 1,
        type: 'task' as const,
        title: '卒業研究の資料提出期限が近づいています',
        body: '「卒業研究の最終報告用スライドおよび要旨」の提出期限があと2時間で終了します。\n\n現在、システム上では「未提出」の状態となっています。至急内容を確認し、提出ボタンを押してください。提出後に完了通知が届かない場合は、事務局までお問い合わせください。',
        date: '2024/05/20 10:30',
        isUnread: true
    };

    return <NotificationDetail notification={mockNotif} />;
}
