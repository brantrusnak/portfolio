import { About, Projects, Skills, Works } from "@/app/features";
import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navigation/Navbar";
import { Fragment } from "react";

export default function HomePage() {
  return (
    <Fragment>
      <Navbar />
      <About />
      <Skills />
      <Works />
      <Projects />
      <Footer />
    </Fragment>
  );
}
