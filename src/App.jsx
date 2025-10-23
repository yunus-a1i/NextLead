import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import BeginJourney from "./components/BeginJourney";
import InterviewsPage from "./pages/InterviewsPage";
import ProfilePage from "./pages/ProfilePage";
import ForCandidates from "./pages/ForCandidates";
import ForRecruiters from "./pages/ForRecruiters";
import ContactPage from "./pages/ContactPage";
import HelpCenter from "./pages/HelpCenter";
// import Blog from "./pages/BlogPage";
import SomethingWentWrongPage from "./pages/SomethingWentWrongPage";
// import BlogDetailPage from "./pages/BlogDetailPage";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import Layout from "./layouts/Layout";
import RecruiterDashboard from "./pages/RecruiterDashboard";
import CandidateDashboard from "./pages/CandidateDashboard";
import LoginPortal from "./pages/LoginPortal";

function App() {
  return (
    <Routes>
      {/* Layout Wrapper */}
      <Route path="/login-portal" element={<LoginPortal />} />
      <Route path="/register" element={<RegisterForm />} />
      <Route path="/login" element={<LoginForm />} />
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/journey" element={<BeginJourney />} />
        <Route path="/interviews" element={<InterviewsPage />} />
        <Route path="/user/profile" element={<ProfilePage />} />
        <Route path="/candidates" element={<ForCandidates />} />
        <Route path="/recruiters" element={<ForRecruiters />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/help" element={<HelpCenter />} />
      </Route>
      <Route path="/recruiter/dashboard" element={<RecruiterDashboard />} />
      <Route path="/candidate/dashboard" element={<CandidateDashboard />} />
      <Route path="*" element={<SomethingWentWrongPage />} />

      {/* future */}
      {/* <Route path="/blog/detail" element={<BlogDetailPage />} /> */}
      {/* <Route path="/blog" element={<Blog />} /> */}
    </Routes>
  );
}

export default App;


// app.use(
//   cors({
//     origin: 'http://localhost:5173',
//     credentials: true,
//   })
// );

// export async function updateUser(req: Request, res: Response, next: NextFunction) {
//   try {
//     const { id, name, contact, resumeLink, projects, domain, skills, experience, education, bio, profilePhotoLink } = req.body;

//     // 1️⃣ Check for required id
//     if (!id) {
//       return res.status(400).json({
//         success: false,
//         message: 'Id is required.',
//       });
//     }

//     // 2️⃣ Check if user exists
//     const existingUser = await User.findById(id);
//     if (!existingUser) {
//       return res.status(404).json({
//         success: false,
//         message: 'User not found.',
//       });
//     }

//     // 3️⃣ Build dynamic update object (only non-empty values)
//     const updates: any = {};
//     if (name) updates.name = name;
//     if (contact) updates.contact = contact;
//     if (resumeLink) updates.resumeLink = resumeLink;
//     if (projects) updates.projects = projects;
//     if (domain) updates.domain = domain;
//     if (skills) updates.skills = skills;
//     if (experience) updates.experience = experience;
//     if (education) updates.education = education;
//     if (bio) updates.bio = bio;
//     if (profilePhotoLink) updates.profilePhotoLink = profilePhotoLink;

//     // 4️⃣ Validate that there's at least one field to update
//     if (Object.keys(updates).length === 0) {
//       return res.status(400).json({
//         success: false,
//         message: 'No fields provided to update.',
//       });
//     }

//     // 5️⃣ Perform update
//     const updatedUser = await User.findByIdAndUpdate(id, { $set: updates }, { new: true }).select('-password');

//     // 6️⃣ Respond
//     return res.status(200).json({
//       success: true,
//       message: 'User updated successfully.',
//       data: updatedUser,
//     });
//   } catch (error) {
//     console.error('UpdateUser Error:', error);
//     next(error);
//   }
// }