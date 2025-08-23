// src/components/RegisterForm.jsx
import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function RegisterForm() {
  const { register } = useContext(AuthContext);
  const [form, setForm] = useState({ name: "", email: "", password: "", phone: "", role: "candidate" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(form);
      alert("Registration successful");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      <input name="name" placeholder="Name" value={form.name} onChange={handleChange} className="w-full p-2 border rounded mb-4" required />
      <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} className="w-full p-2 border rounded mb-4" required />
      <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} className="w-full p-2 border rounded mb-4" required />
      <input name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} className="w-full p-2 border rounded mb-4" />
      <select name="role" value={form.role} onChange={handleChange} className="w-full p-2 border rounded mb-4">
        <option value="candidate">Candidate</option>
        <option value="recruiter">Recruiter</option>
      </select>
      <button className="w-full bg-green-600 text-white py-2 rounded">Register</button>
    </form>
  );
}
