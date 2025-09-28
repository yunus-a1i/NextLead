import { useState } from "react";
import { createUser } from "../redux/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function RegisterForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    contact: "",
  });
  const { loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(createUser(form)).unwrap();
      alert("Registration successful");
      navigate("/login");
    } catch (err) {
      alert(err.message || "Registration failed");
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="max-w-sm mx-auto bg-white p-6 rounded-lg shadow-md"
      >
        <h2 className="text-2xl font-bold mb-4">Register</h2>
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-4"
          required
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-4"
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-4"
          required
        />
        <input
          name="contact"
          placeholder="contact"
          value={form.contact}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-4"
        />

        {error && <p className="text-red-500 mb-4">{error}</p>}
        <button className="w-full bg-green-600 text-white py-2 rounded">
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
      <div className="max-w-sm mx-auto mt-4 text-center">
        <p className="text-gray-600">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 hover:underline">
            Login here
          </a>
        </p>
      </div>
    </>
  );
}
