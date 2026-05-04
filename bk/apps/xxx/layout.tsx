import ClientProjectLayout from "@/components/layout/clientProjectLayout";

export default function ProjectLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <ClientProjectLayout>
            {children}
        </ClientProjectLayout>
    )
}
