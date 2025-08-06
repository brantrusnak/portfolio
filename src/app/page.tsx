import { About, Projects, Skills, Works } from "@/app/sections";
import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navigation/Navbar";
import { MotionProvider } from "@/context/MotionProvider";

export default function HomePage() {
  return (
    <MotionProvider>
      <Navbar />
      <About />
      <Skills />
      <Works />
      <Projects />
      <Footer />
    </MotionProvider>
  );
}
