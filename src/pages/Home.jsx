import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import Footer from "../components/Footer";
import BeginJourney from "../components/BeginJourney";
import ContactPage from "./ContactPage";
import Loader, { PageLoader } from '../components/Loader';
import { useState } from "react";

export default function Home() {
  // const [isLoading, setIsLoading] = useState(true);

  // if (isLoading) {
  //   return <PageLoader />;
  // }

  return (
    <div className="w-full ">
      <HeroSection />
      <BeginJourney />
      <ContactPage />
    </div>
  );
}
