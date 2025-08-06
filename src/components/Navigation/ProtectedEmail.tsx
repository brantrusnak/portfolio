"use client";

import { useState, useEffect } from "react";
import { FaEnvelope, FaPaperPlane } from "react-icons/fa6";

interface ProtectedEmailProps {
  className?: string;
}

export default function ProtectedEmail({ className }: ProtectedEmailProps) {
  const [email, setEmail] = useState<string>("");
  const [showEmail, setShowEmail] = useState<boolean>(false);

  useEffect(() => {
    const emailParts = ["brant", "rusnak", "@", "gmail", ".", "com"];
    setEmail(emailParts.join(""));
  }, []);

  const handleClick = (e: React.MouseEvent) => {
    if (!showEmail) {
      e.preventDefault();
      setShowEmail(true);
    } else {
      window.location.href = `mailto:${email}`;
    }
  };

  return (
    <button
      onClick={handleClick}
      title={showEmail ? "Click to email" : "Click to reveal email"}
      aria-label={showEmail ? "Send email" : "Reveal email address"}
      className={`flex items-center gap-2 ${className}`}
    >
      {showEmail ? (
        <FaPaperPlane className="size-[14px] text-[14px]" />
      ) : (
        <FaEnvelope className="size-[14px] text-[14px]" />
      )}
      {showEmail ? email : "Reveal Email"}
    </button>
  );
}
