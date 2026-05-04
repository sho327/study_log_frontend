import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ["Inter", "Noto Sans JP", "sans-serif"],
            },
            colors: {
                // daisyUIのbase-200を変数として参照可能に
                background: "oklch(var(--b2))",
            },
        },
    },
    plugins: [require("daisyui")],
    daisyui: {
        themes: [
            "light", "dark", "cupcake", "bumblebee", "emerald", "corporate",
            "synthwave", "retro", "cyberpunk", "valentine", "halloween",
            "garden", "forest", "aqua", "lofi", "pastel", "fantasy",
            "wireframe", "black", "luxury", "dracula", "cmyk", "autumn",
            "business", "acid", "lemonade", "night", "coffee", "winter",
            "dim", "nord", "sunset", "caramellatte", "abyss", "silk",
            {
                unimoa_light: {
                    // ...require("daisyui/src/theming/themes")["light"],
                    // light設定時にテキストカラー等でprimary等daisyUI設定を参照したい場合(badge-primary等はglobal.cssの「--p」設定で反映される)
                    "primary": "oklch(0.73 0.11 162)",            // --p   (例: bg-primary)
                    "primary-content": "oklch(100 0 0)",          // --pc  (例: text-primary-content)
                    "secondary": "oklch(0.71 0.01 220.0)",        // --se  (例: bg-secondary)※umi/secondary
                    "secondary-content": "oklch(100 0 0)",        // --sec (例: text-secondary-content)
                    "accent": "oklch(0.65 0.07 45)",              // --ac  (例: text-accent)
                    "accent-content": "oklch(100 0 0)",           // --acc (例: text-accent-content)
                    "info": "oklch(0.61 0.15 243.64)",            // --in  (例: bg-info)※umi/info
                    "info-content": "oklch(100 0 0)",             // --inc (例: text-info-content)
                    "success": "oklch(0.73 0.11 162)",            // --su  (例: bg-success)※umi/success
                    "success-content": "oklch(100 0 0)",          // --suc (例: text-success-content)
                    "warning": "oklch(0.71 0.16 52.33)",          // --wa  (例: bg-warning)※umi/warning
                    'warning-content': 'oklch(100 0 0)',          // --erc (例: text-error-content)
                    "error": "oklch(0.60 0.20 27.33)",            // --er  (例: bg-error)※umi/danger
                    'error-content': 'oklch(100 0 0)',            // --erc (例: text-error-content)
                    "neutral": "oklch(0.27 0.01 256.85)",         // --nc  (例: bg-neutral)※gray-800
                    'neutral-content': 'oklch(100 0 0)',          // --ncc (例: text-neutral-content)
                    "base-100": "oklch(0.95 0.006 162)",          // --b1(Body背景、カードの背景、入力フォーム、モーダル)※カード/入力フォームは白で上書きが必須
                    "base-200": "oklch(0.95 0.006 162)",          // --b2(ボーダーカラー)
                    "base-300": "oklch(0.96 0.003 264.54)",       // --b3(ホバー時の背景色)※gray-100
                    "base-content": "oklch(0.44 0.01 256.85)",    // --bc(デフォルトテキストカラー)※gray-600
                    // ※text-gray-500についてはどうしても残ってしまう(後で一括変換でどこかの変数に入れても良いかも)
                },
            },
        ],
        base: true,
    },
};
export default config;
