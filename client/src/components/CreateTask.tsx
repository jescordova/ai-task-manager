import { useState, useRef } from "react";
import { createTask } from "../services/api";

interface CreateTaskProps {
  onCreated: () => void;
}

export default function CreateTask({ onCreated }: CreateTaskProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const titleRef = useRef<HTMLInputElement>(null); // pour remettre le focus

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      setError("Task title cannot be empty");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      setError("Not authenticated");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await createTask(token, title, description.trim() || undefined);

      // reset champs
      setTitle("");
      setDescription("");

      onCreated(); // recharge liste

      titleRef.current?.focus(); // focus sur input titre 😎
    } catch (err: any) {
      console.error("Failed to create task", err);
      setError(err.message || "Unable to add task");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-2 bg-white p-4 rounded shadow"
    >
      <input
        ref={titleRef}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Nouvelle tâche..."
        className="border p-2 rounded"
        disabled={loading}
      />

      <input
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description (optionnelle)"
        className="border p-2 rounded"
        disabled={loading}
      />

      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition disabled:opacity-50"
        disabled={loading}
      >
        {loading ? "Adding…" : "Ajouter ➕"}
      </button>

      {error && (
        <p className="text-red-500 text-sm">{error}</p>
      )}
    </form>
  );
}