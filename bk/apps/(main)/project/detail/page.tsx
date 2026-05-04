import ProjectDetail from "@/components/page/main/project/detail";

export default function Page({ params }: { params: { id: string } }) {
    // 実際には params.id に基づいてデータを取得するが、現在はモックデータを使用
    const mockProject = {
        id: params.id,
        title: "2025年度 工学部学祭 公式サイト制作",
        category: "Web制作",
        description: "今年の学祭サイトをReact+Next.jsでゼロから構築します。現在はエンジニア2名、デザイナー1名が参加していますが、さらにフロントエンドの実装を手伝ってくれる仲間と、広報用画像を作ってくれるデザイナーをあと1名ずつ募集しています。",
        leader: {
            id: "leader1",
            name: "佐藤 健太",
            university: "工学部 3年",
        },
        members: [
            { id: "member1", name: "佐藤 健太", univ: '工学部 3年', catch: 'フロントエンド開発が得意です。', tags: ['React', 'Next.js'], avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=佐藤健太" },
            { id: "member2", name: "田中 美咲", univ: 'デザイン学部 2年', catch: 'UI/UXデザインならお任せください。', tags: ['Figma', 'UI/UX'], avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=田中美咲" },
            { id: "member3", name: "鈴木 一郎", univ: '経済学部 4年', catch: 'データ分析とマーケティングに関心があります。', tags: ['Python', 'SQL'], avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=鈴木一郎" },
            { id: "member4", name: "高橋 結衣", univ: '文学部 1年', catch: 'プログラミング初心者ですが頑張ります！', tags: ['HTML', 'CSS'], avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=高橋結衣" },
            { id: "member5", name: "小林 翼", univ: '情報科学部 2年', catch: 'バックエンドとインフラ周りを担当します。', tags: ['Node.js', 'AWS'], avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=小林翼" },
            { id: "member6", name: "中村 葵", univ: '芸術学部 3年', catch: 'イラストやグラフィックが得意です。', tags: ['Illustrator', 'Photoshop'], avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=中村葵" },
            { id: "member7", name: "伊藤 悠", univ: '商学部 2年', catch: 'プロジェクトマネジメントと進行管理をサポートします。', tags: ['PM', '進行管理'], avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=伊藤悠" },
        ],
        requirements: [
            "週に1回、オンラインの進捗MTGに参加できる方",
            "Git / GitHubの基本的な使い方がわかる方",
            "新しい技術を学ぶ意欲がある方（未経験OK！）",
        ],
        tags: ["React", "Next.js", "Figma", "TailwindCSS"],
    };

    return <ProjectDetail project={mockProject} />;
}
