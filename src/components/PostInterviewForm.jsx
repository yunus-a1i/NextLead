import { useState } from "react";
import { createInterview } from "../services/interviewServices";

export default function PostInterviewForm({ onPosted }) {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user")); // ✅ parse

  const [form, setForm] = useState({
    title: "",
    company: "",
    location: "",
    description: "",
    date: "",
    time: "",
  });

  if (!user || user.role !== "recruiter") {
    return <p className="text-center text-gray-500 mt-6">Only recruiters can post interviews.</p>;
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await createInterview(form, token);
      alert("Interview posted successfully!");
      setForm({
        title: "",
        company: "",
        location: "",
        description: "",
        date: "",
        time: "",
      });
      if (onPosted) onPosted(data);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md mt-6 border"
    >
      <h2 className="text-2xl font-bold mb-4">Post an Interview</h2>

      <input name="title" placeholder="Job Title" value={form.title} onChange={handleChange}
        className="w-full p-2 border rounded mb-3" required />

      <input name="company" placeholder="Company Name" value={form.company} onChange={handleChange}
        className="w-full p-2 border rounded mb-3" required />

      <input name="location" placeholder="Location" value={form.location} onChange={handleChange}
        className="w-full p-2 border rounded mb-3" required />

      <textarea name="description" placeholder="Job Description" value={form.description} onChange={handleChange}
        className="w-full p-2 border rounded mb-3" required />

      <input type="date" name="date" value={form.date} onChange={handleChange}
        className="w-full p-2 border rounded mb-3" required />

      <input type="time" name="time" value={form.time} onChange={handleChange}
        className="w-full p-2 border rounded mb-3" required />

      <button className="w-full bg-blue-600 text-white py-2 rounded">
        Post Interview
      </button>
    </form>
  );
}
