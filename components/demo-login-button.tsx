"use client";

import { useRouter } from "next/navigation";
import { useSignIn } from "@clerk/nextjs";
import { useState } from "react";

export default function DemoLoginButton() {
  const { isLoaded, signIn, setActive } = useSignIn();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onDemoClick = async () => {
    if (!isLoaded || loading) return;
    setLoading(true);

    try {
      const identifier = process.env.NEXT_PUBLIC_DEMO_USER_EMAIL;
      const password = process.env.NEXT_PUBLIC_DEMO_USER_PASSWORD;

      if (!identifier || !password) {
        throw new Error(
          "Demo credentials missing in env (NEXT_PUBLIC_DEMO_USER_EMAIL / _PASSWORD)."
        );
      }

      const result = await signIn.create({ identifier, password });

      if (
        (result as any).status === "complete" &&
        (result as any).createdSessionId
      ) {
        await setActive({ session: (result as any).createdSessionId });
        // now redirect into your app
        router.push("/dashboard");
        return;
      }

      console.error("Unexpected sign-in result:", result);
      alert(
        "Demo login requires additional verification. Please Sign in instead."
      );
    } catch (err: any) {
      console.error("Demo login error:", err);
      alert(err?.message ?? "Demo login failed. Please try Sign in.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={onDemoClick}
      disabled={loading}
      className="px-6 py-2 rounded-lg bg-indigo-100 text-indigo-700 font-semibold shadow hover:bg-indigo-200 hover:scale-105 hover:shadow-lg active:scale-95 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-fuchsia-400 disabled:opacity-60"
      aria-label="Try demo account"
    >
      {loading ? "Signing in…" : "Demo Login"}
    </button>
  );
}
