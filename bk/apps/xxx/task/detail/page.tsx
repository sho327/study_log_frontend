import TaskDetail from "@/components/page/project/task/detail";

export default function Page({ params }: { params: { projectId: string, taskId: string } }) {
    return (
        <TaskDetail projectId={params.projectId} taskId={params.taskId} />
    );
}
