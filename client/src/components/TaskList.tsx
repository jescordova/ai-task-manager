import { useEffect, useState } from "react";
import { getTasks, deleteTask, updateTask } from "../services/api";
import type { Task } from "../services/api";
import CreateTask from "./CreateTask";

export default function TaskList() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchTasks = async () => {
        setLoading(true);
        setError(null);

        const token = localStorage.getItem("token");
        if (!token) {
            setError("No authentication token found");
            setLoading(false);
            return;
        }

        try {
            const { tasks: fetchedTasks } = await getTasks(token);
            setTasks(fetchedTasks || []);
        } catch (err: any) {
            console.error("Error fetching tasks:", err);
            setError(err.message || "Failed to fetch tasks");
        } finally {
            setLoading(false);
        }
    };
    
    useEffect(() => {
        fetchTasks();
    }, []);

    // 🔥 SUPPRIMER SANS RELOAD
    const handleDelete = async (id: string) => {
        const token = localStorage.getItem("token");
        if (!token) return;

        await deleteTask(token, id);

        // update instantané ⚡
        setTasks((prev) => prev.filter((t) => t._id !== id));
    };

    const toggleComplete = async (id: string, current: boolean) => {
        const token = localStorage.getItem("token");
        if (!token) return;

        await updateTask(token, id, { completed: !current });

        // mise à jour locale instantanée ⚡
        setTasks((prev) =>
            prev.map((t) =>
            t._id === id ? { ...t, completed: !current } : t
            )
        );
    };

    if (loading) {
        return <div className="p-4">Loading tasks...</div>;
    }

    if (error) {
        return <div className="p-4 text-red-500">Error: {error}</div>;
    }

    return (
        <div className="space-y-4">
            <h2 className="text-xl font-bold">My Tasks 📋</h2>
            <CreateTask onCreated={fetchTasks} />
            {tasks.length === 0 ? (
                <p className="text-gray-500">No tasks found. Create your first task!</p>
            ) : (
                tasks.map((task) => (
                    <div key={task._id} className="bg-gray-50 p-4 rounded-lg flex justify-between items-center hover:shadow transition">
                        <div>
                            <h3 className="text-lg font-semibold">
                            <span
                                className={`font-medium ${
                                    task.completed ? "line-through text-gray-400" : ""
                                }`}
                                >
                                {task.title}
                            </span>       
                            </h3>
                            {task.description && (<p className="text-gray-600 mt-1">{task.description}</p>)}
                            <p className="text-sm">
                                Completed: {task.completed ? "✅ Yes" : "❌ No"}
                            </p>                    
                        </div>

                        {/* Update Task */}
                        <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            checked={task.completed}
                            onChange={() => toggleComplete(task._id, task.completed)}
                            />

                        <span
                            className={task.completed ? "line-through text-gray-400" : ""}
                            >
                            {task.title}
                        </span>
                        </div>

                        {/* Delete Task*/}
                        <button
                            onClick={() => handleDelete(task._id)}
                            className="text-sm text-red-500 hover:text-red-700 transition"
                        >
                            Delete  🗑️
                        </button>
                    </div>
                ))
            )}
        </div>
    );
}