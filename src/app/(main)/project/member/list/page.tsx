import ProjectMemberList from "@/components/page/main/project/member/list";

export default function Page() {
    return (
        <main className="flex-1 overflow-y-auto p-6 transition-all duration-300">
            <ProjectMemberList />
        </main>
    );
}