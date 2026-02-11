"use client";

import { useRouter } from "next/navigation";

export default function Auth() {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="w-full min-h-screen bg-dark-900 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-accent-gold mb-6">
          Authentication
        </h1>
        <p className="text-gray-300 mb-8">
          This is the auth page. Coming soon...
        </p>
        <button
          onClick={handleBack}
          className="px-6 py-3 bg-accent-gold text-dark-900 rounded font-bold hover:opacity-90 transition"
        >
          ← Back
        </button>
      </div>
    </div>
  );
}
