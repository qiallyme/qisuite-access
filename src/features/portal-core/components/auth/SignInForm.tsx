import { FormEvent, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { getPortalCoreConfig } from "../../lib/env";

export default function SignInForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState<string | null>(null);
  const { siteUrl } = getPortalCoreConfig();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
            Sign in to Portal Core
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            Enter your email to receive a magic link
          </p>
        </div>
        <form
          className="mt-8 space-y-6"
          onSubmit={async (e: FormEvent) => {
            e.preventDefault();
            setError(null);
            setLoading(true);
            const { error } = await supabase.auth.signInWithOtp({
              email,
              options: {
                emailRedirectTo: siteUrl || window.location.origin,
                shouldCreateUser: false,
              },
            });
            setLoading(false);
            if (error) {
              setError(
                "You must be invited first. Please contact support if you believe this is a mistake.",
              );
              setOtpSent(null);
            } else {
              setOtpSent("Magic link sent. Check your email.");
            }
          }}
        >
          <div>
            <label htmlFor="email" className="sr-only">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {error && (
            <div className="text-red-600 text-sm text-center">{error}</div>
          )}
          {otpSent && (
            <div className="text-green-600 text-sm text-center">{otpSent}</div>
          )}

          <div>
            <button
              type="submit"
              disabled={loading || !email}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Sending link..." : "Send magic link"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
