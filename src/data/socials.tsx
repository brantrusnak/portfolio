import { Social } from "@/types";
import { FaEnvelope, FaLinkedin, FaGithubAlt, FaFilePdf } from "react-icons/fa6";

export const socials: readonly Social[] = [
  {
    id: "email",
    url: "mailto:me@brantrusnak.com",
    icon: <FaEnvelope />,
  },
  {
    id: "linkedin",
    url: "https://www.linkedin.com/in/brantrusnak/",
    icon: <FaLinkedin />,
  },
  {
    id: "github",
    url: "https://github.com/brantrusnak/",
    icon: <FaGithubAlt />,
  },
  {
    id: "resume",
    url: "/Brant_Rusnak_Senior_Frontend_Engineer.pdf",
    icon: <FaFilePdf />,
  },
];