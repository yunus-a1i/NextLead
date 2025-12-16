import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToasts } from "../components/Toast";

export default function OAuthCallback() {
  const navigate = useNavigate();
  const { success, error } = useToasts();

  useEffect(() => {
    try {
      const hash = window.location.hash.startsWith("#")
        ? window.location.hash.substring(1)
        : window.location.hash;

      const params = new URLSearchParams(hash);
      const accessToken = params.get("access_token");
      const id = params.get("id");
      const role = params.get("role"); // 'candidate' | 'recruiter'

      if (!accessToken || !id || !role) {
        error("Invalid OAuth response");
        navigate("/login?role=candidate");
        return;
      }

      // Store token & role (adjust keys to your app)
      localStorage.setItem("access_token", accessToken);
      localStorage.setItem("user_id", id);
      localStorage.setItem("role", role);

      success("Logged in with Google!");

      if (role === "candidate") {
        navigate("/candidate/dashboard");
      } else {
        navigate("/recruiter/dashboard");
      }
    } catch (err) {
      console.error(err);
      error("OAuth error");
      navigate("/login?role=candidate");
    }
  }, [navigate, success, error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="text-center text-gray-600 text-sm">
        Completing your sign in...
      </div>
    </div>
  );
}
