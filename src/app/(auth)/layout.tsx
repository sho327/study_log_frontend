import ClientAuthLayout from "@/components/layout/clientAuthLayout";

export default function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <ClientAuthLayout>
            {children}
        </ClientAuthLayout>
    )
}
