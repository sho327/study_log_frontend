import { Button, ButtonProps } from "@/components/ui/button";

export const AuthButton = (props: ButtonProps) => (
    <Button
        {...props}
        className={`w-full font-black text-[13px] rounded-xl ${props.className || ""}`}
    />
);

// 補足：もしAuthButtonだけで「処理中...」と文字を変えたいならこう書けます
// const AuthButtonBase = ({ children, isLoading, ...props }: ButtonProps) => (
//     <Button {...props} isLoading={isLoading}>
//         {isLoading ? "処理中..." : children}
//     </Button>
// );