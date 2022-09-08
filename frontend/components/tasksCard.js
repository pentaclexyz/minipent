import ReactMarkdown from "react-markdown";

export function TasksCard({tasks}) {
    return (
        <table className={"table-fixed text-sm my-4 p-2 w-full text-left align-text-top editorial"}>
            <colgroup>
                <col className={"w-1/4"}/>
                <col className={"w-1/4"}/>
                <col/>
            </colgroup>
            <thead>
            <tr className={""}>
                <th className={"border-collapse border border-white"}>Name</th>
                <th className={"border-collapse border border-white"}>Status</th>
                <th className={"border-collapse border border-white"}>Details</th>
            </tr>
            </thead>
            <tbody>
            {tasks.map((task, i) => (
                <tr key={i}>
                    <td className={"border-collapse border border-white w-1/4"}><ReactMarkdown>{task.name}</ReactMarkdown></td>
                    <td className={"border-collapse border border-white w-1/2"}><ReactMarkdown>{task.status}</ReactMarkdown></td>
                    <td className={"border-collapse border border-white w-1/4"}><ReactMarkdown>{task.content}</ReactMarkdown></td>
                </tr>
            ))}
            </tbody>
        </table>
);
}
