import { useState } from "react";
import { loginUser } from "../redux/userSlice";
import { useDispatch, useSelector } from "react-redux";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {loading, error} = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = { email, password };
      dispatch(loginUser(data));
      alert("Login successful");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <>
    <form
      onSubmit={handleSubmit}
      className="max-w-sm mx-auto bg-white p-6 rounded-lg shadow-md"
    >
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-2 border rounded mb-4"
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-2 border rounded mb-4"
        required
      />
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <button className="w-full bg-blue-600 text-white py-2 rounded">
        {loading ? "Logging in..." : "Login"}
      </button>
    </form>
    <div className="max-w-sm mx-auto mt-4 text-center">
        <p className="text-gray-600">
          Don't have an account?{" "}
          <a href="/register" className="text-blue-600 hover:underline">
            Register here
          </a>
        </p>
      </div>
    </>
  );
}
