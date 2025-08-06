import { FaHeart } from "react-icons/fa6";
import Socials from "@/components/Footer/Socials";

export default function Footer() {
  return (
    <footer className="p-6 text-sm flex flex-col gap-6 justify-center items-center bg-card">
      <div className="container">
        <div className="flex justify-center md:justify-end items-center gap-2 mb-4 text-gray-400">
          <Socials />
        </div>
        <small className="flex justify-center md:justify-end items-center gap-2 text-gray-400">
          <span>Made with</span>
          <FaHeart className="text-pink-500" aria-label="Love" />
          <span>by Brant Rusnak · © {new Date().getFullYear()}</span>
        </small>
      </div>
    </footer>
  );
}
