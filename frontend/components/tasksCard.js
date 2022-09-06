import ReactMarkdown from "react-markdown";

export function TasksCard({tasks}) {
    return (
        <table className={"table-fixed text-sm p-2 w-full text-left align-text-top"}>
            <colgroup>
                <col className={"w-1/4"}/>
                <col className={"w-1/4"}/>
                <col/>
            </colgroup>
            <thead>
            <tr className={""}>
                <th className={"border-collapse border border-white p-2"}>Name</th>
                <th className={"border-collapse border border-white p-2"}>Status</th>
                <th className={"border-collapse border border-white p-2"}>Details</th>
            </tr>
            </thead>
            <tbody>
            {tasks.map((task, i) => (
                <tr key={i}>
                    <td className={"border-collapse border border-white p-2 w-1/4"}><ReactMarkdown>{task.name}</ReactMarkdown></td>
                    <td className={"border-collapse border border-white p-2 w-1/2"}><ReactMarkdown>{task.status}</ReactMarkdown></td>
                    <td className={"border-collapse border border-white p-2 w-1/4"}><ReactMarkdown>{task.content}</ReactMarkdown></td>
                </tr>
            ))}
            </tbody>
        </table>
);
}
