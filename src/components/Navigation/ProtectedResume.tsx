"use client";

import { FaFilePdf } from 'react-icons/fa6';

interface ProtectedResumeProps {
  className?: string;
}

export default function ProtectedResume({ className }: ProtectedResumeProps) {
  const resumePath = '/resume.pdf';

  const handleClick = () => {
    window.open(resumePath, '_blank', 'noopener,noreferrer');
  };

  return (
    <button
      onClick={handleClick}
      aria-label="Open Résumé"
      title="View résumé (opens in new tab)"
      className={`flex items-center gap-2 ${className}`}
    >
      <FaFilePdf className="size-[14px] text-[14px]" />
      Résumé
    </button>
  );
}
