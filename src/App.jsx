import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import RegisterPage from "./pages/Register";
import LoginPage from "./pages/Login";
import BeginJourney from "./components/BeginJourney";
import InterviewsPage from "./pages/InterviewsPage";
import ProfilePage from "./pages/ProfilePage";
import ForCandidates from "./pages/ForCandidates";
import ForRecruiters from "./pages/ForRecruiters";
import ContactPage from "./pages/ContactPage";
import HelpCenter from "./pages/HelpCenter";
import Blog from "./pages/BlogPage";
import SomethingWentWrongPage from "./pages/SomethingWentWrongPage";
import BlogDetailPage from "./pages/BlogDetailPage";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/journey" element={<BeginJourney />} />
        <Route path="/interviews" element={<InterviewsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/candidates" element={<ForCandidates />} />
        <Route path="/recruiters" element={<ForRecruiters />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/help" element={<HelpCenter />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="blog/detail" element={<BlogDetailPage />} />
        <Route path="*" element={<SomethingWentWrongPage />} />
        {/* Add more routes here */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
