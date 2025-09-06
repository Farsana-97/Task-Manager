import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from "react-hot-toast";
const api = import.meta.env.VITE_API_URL



export const UserDashboard = () => {
  const [tasks, setTasks] = useState([]);

  const [form, setForm] = useState({ 
    title: "", 
    description: "", 
    status: "" 
  });

  const [editingId, setEditingId] = useState(null);

  const fetchMyTasks = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${api}/api/tasks/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchMyTasks();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (editingId) {
        await axios.patch(`${api}/api/tasks/${editingId}`, form, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success(" Task updated successfully!");
      } else {
        await axios.post(`${api}/api/tasks/`, form, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success(" New Task added successfully!");

      }
      setForm({ title: "", description: "", status: "" });
      setEditingId(null);
      fetchMyTasks();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${api}/api/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success(" Task deleted!");
      fetchMyTasks();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (task) => {
    setForm({
      title: task.title,
      description: task.description,
      status: task.status,
    });
    setEditingId(task._id);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-teal-100 to-blue-100 p-8">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl p-6">
        <h2 className="text-2xl font-bold text-teal-700 mb-4 text-center">
          {editingId ? "✏️ Edit Task" : "➕ Add New Task"}
        </h2>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-xl shadow-md"
        >
          <input
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            value={form.title}
            type="text"
            placeholder="Enter Task"
            className="border border-teal-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-teal-500"
          />
          <textarea
            name="description"
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            placeholder="Description"
            value={form.description}
            className="border border-teal-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-teal-500"
          />
          <select
            name="status"
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value })}
            className="border border-teal-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-teal-500"
          >
            <option value="">-- Select Status --</option>
            <option value="todo">To Do</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>

          <button
            className="bg-gradient-to-r from-green-500 to-teal-500 text-white font-semibold py-2 rounded-lg shadow-md hover:scale-105 transition"
          >
            {editingId ? "Update Task" : "Add Task"}
          </button>
        </form>

        <div className="mt-8">
          <h2 className="text-xl font-bold text-teal-700 mb-4 text-center">
            📋 My Task List
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full border border-teal-200 rounded-xl overflow-hidden shadow-lg">
              <thead className="bg-gradient-to-r from-green-200 to-blue-200 text-teal-900">
                <tr>
                  <th className="p-3 text-left">Title</th>
                  <th className="p-3 text-left">Description</th>
                  <th className="p-3 text-left">Status</th>
                  <th className="p-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((x) => (
                  <tr
                    key={x._id}
                    className="border-b border-teal-100 hover:bg-teal-50 transition"
                  >
                    <td className="p-3">{x.title}</td>
                    <td className="p-3">{x.description}</td>
                    <td className="p-3">
                     
                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                          {x.status}
                        </span>
                     
                    </td>
                    <td className="p-3 flex gap-2 justify-center">
                      <button
                        onClick={() => handleEdit(x)}
                        className="px-3 py-1 bg-yellow-400 text-white rounded-lg shadow hover:scale-105 transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(x._id)}
                        className="px-3 py-1 bg-red-500 text-white rounded-lg shadow hover:scale-105 transition"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
                {tasks.length === 0 && (
                  <tr>
                    <td colSpan="4" className="p-6 text-center text-gray-500">
                      No Tasks found 👀
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
