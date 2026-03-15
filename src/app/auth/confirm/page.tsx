"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../../lib/supabase";

export default function ConfirmPage() {
  const router = useRouter();
  const [message, setMessage] = useState("Confirming your email...");
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    // Supabase automatically processes the confirmation token in the URL
    // We just need to check if the session is now active
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setMessage("Email confirmed successfully! You can now sign in.");
        setIsSuccess(true);
        // Redirect to sign-in after 3 seconds
        setTimeout(() => router.push("/signin"), 3000);
      } else {
        // Check for error parameters in URL (if any)
        const params = new URLSearchParams(window.location.search);
        const error = params.get("error");
        const errorDescription = params.get("error_description");
        if (error) {
          setMessage(`Confirmation failed: ${errorDescription || error}`);
        } else {
          setMessage("Confirmation link invalid or expired.");
        }
      }
    });
  }, [router]);

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-6">
      <div className="w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-2xl p-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Email Confirmation</h1>
        <p className="text-neutral-300 mb-6">{message}</p>
        {!isSuccess && (
          <button
            onClick={() => router.push("/signin")}
            className="bg-cyan-500 text-black px-6 py-3 rounded-lg font-semibold hover:bg-cyan-400"
          >
            Go to Sign In
          </button>
        )}
      </div>
    </main>
  );
}