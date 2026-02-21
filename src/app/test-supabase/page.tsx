"use client";

import { useState, useEffect } from "react";
import { getProjects, createProject, deleteProject, Project } from "@/lib/projectsCrud";

export default function SupabaseTestPage() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [newName, setNewName] = useState("");
    const [newDesc, setNewDesc] = useState("");

    const fetchProjects = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await getProjects();
            setProjects(data);
        } catch (err: any) {
            setError(err.message || "Failed to fetch projects");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newName) return;
        try {
            await createProject({ name: newName, description: newDesc || undefined });
            setNewName("");
            setNewDesc("");
            fetchProjects();
        } catch (err: any) {
            setError(err.message || "Failed to create project");
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await deleteProject(id);
            fetchProjects();
        } catch (err: any) {
            setError(err.message || "Failed to delete project");
        }
    };

    return (
        <div className="p-8 max-w-4xl mx-auto text-black">
            <h1 className="text-3xl font-bold mb-6 text-white text-center">Supabase Integration Test</h1>

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
                    {error}
                </div>
            )}

            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                <h2 className="text-xl font-semibold mb-4">Add New Project</h2>
                <form onSubmit={handleCreate} className="flex flex-col md:flex-row gap-4 items-end">
                    <div className="w-full">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                        <input
                            type="text"
                            value={newName}
                            onChange={(e) => setNewName(e.target.value)}
                            className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                            placeholder="Project Name"
                            required
                        />
                    </div>
                    <div className="w-full">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <input
                            type="text"
                            value={newDesc}
                            onChange={(e) => setNewDesc(e.target.value)}
                            className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                            placeholder="Optional Description"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded transition-colors"
                    >
                        Create
                    </button>
                </form>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex justify-between items-center mb-6 border-b pb-4">
                    <h2 className="text-xl font-semibold">Projects List</h2>
                    <button
                        onClick={fetchProjects}
                        className="text-blue-600 hover:text-blue-800 font-medium hover:underline flex items-center gap-1"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                        Refresh Data
                    </button>
                </div>

                {loading ? (
                    <div className="flex justify-center p-8">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    </div>
                ) : projects.length === 0 ? (
                    <div className="text-center p-8 text-gray-500 border-2 border-dashed rounded-lg">
                        No projects found. Add one above to test the connection.
                    </div>
                ) : (
                    <ul className="space-y-3">
                        {projects.map((p) => (
                            <li key={p.id} className="border border-gray-200 p-4 rounded-lg flex justify-between items-center bg-gray-50 hover:bg-gray-100 transition-colors">
                                <div>
                                    <h3 className="font-bold text-gray-800">{p.name}</h3>
                                    <p className="text-sm text-gray-600">{p.description || <span className="italic text-gray-400">No description</span>}</p>
                                    {p.created_at && <p className="text-xs text-gray-400 mt-1">Created: {new Date(p.created_at).toLocaleString()}</p>}
                                </div>
                                <button
                                    onClick={() => handleDelete(p.id)}
                                    className="text-red-600 hover:text-red-800 hover:bg-red-50 p-2 rounded transition-colors"
                                    title="Delete project"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}
