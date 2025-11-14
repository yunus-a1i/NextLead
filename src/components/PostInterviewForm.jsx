import { useState } from "react";
import { createInterview } from "../services/interviewServices";

export default function PostInterviewForm({ onPosted }) {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  const [form, setForm] = useState({
    title: "",
    description: "",
    qualifications: "",
    experience: "",
    interviewDate: "",
    startTime: "",
    endTime: "",
    location: "",
    address: "",
    contactEmail: "",
    contactPhone: "",
    salaryRange: "",
    numberOfVacancies: "",
  });

  if (!user || user.role !== "recruiter") {
    return (
      <p className="text-center text-gray-500 mt-6">
        Only recruiters can post interviews.
      </p>
    );
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
        description: "",
        qualifications: "",
        experience: "",
        interviewDate: "",
        startTime: "",
        endTime: "",
        location: "",
        address: "",
        contactEmail: "",
        contactPhone: "",
        salaryRange: "",
        numberOfVacancies: "",
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

      <input
        name="title"
        placeholder="Job Title"
        value={form.title}
        onChange={handleChange}
        className="w-full p-2 border rounded mb-3"
        required
      />

      <textarea
        name="description"
        placeholder="Job Description"
        value={form.description}
        onChange={handleChange}
        className="w-full p-2 border rounded mb-3"
        required
      />

      <input
        name="qualifications"
        placeholder="Qualifications"
        value={form.qualifications}
        onChange={handleChange}
        className="w-full p-2 border rounded mb-3"
      />

      <input
        name="experience"
        placeholder="Experience Required"
        value={form.experience}
        onChange={handleChange}
        className="w-full p-2 border rounded mb-3"
      />

      <input
        type="date"
        name="interviewDate"
        value={form.interviewDate}
        onChange={handleChange}
        className="w-full p-2 border rounded mb-3"
        required
      />

      <input
        type="time"
        name="startTime"
        value={form.startTime}
        onChange={handleChange}
        className="w-full p-2 border rounded mb-3"
      />

      <input
        type="time"
        name="endTime"
        value={form.endTime}
        onChange={handleChange}
        className="w-full p-2 border rounded mb-3"
      />

      <input
        name="location"
        placeholder="Location (e.g., Noida)"
        value={form.location}
        onChange={handleChange}
        className="w-full p-2 border rounded mb-3"
        required
      />

      <input
        name="address"
        placeholder="Full Address"
        value={form.address}
        onChange={handleChange}
        className="w-full p-2 border rounded mb-3"
      />

      <input
        type="email"
        name="contactEmail"
        placeholder="Contact Email"
        value={form.contactEmail}
        onChange={handleChange}
        className="w-full p-2 border rounded mb-3"
      />

      <input
        type="tel"
        name="contactPhone"
        placeholder="Contact Phone"
        value={form.contactPhone}
        onChange={handleChange}
        className="w-full p-2 border rounded mb-3"
      />

      <input
        name="salaryRange"
        placeholder="Salary Range (e.g., 4-6 LPA)"
        value={form.salaryRange}
        onChange={handleChange}
        className="w-full p-2 border rounded mb-3"
      />

      <input
        type="number"
        name="numberOfVacancies"
        placeholder="Number of Vacancies"
        value={form.numberOfVacancies}
        onChange={handleChange}
        className="w-full p-2 border rounded mb-3"
      />

      <button className="w-full bg-blue-600 text-white py-2 rounded">
        Post Interview
      </button>
    </form>
  );
}
