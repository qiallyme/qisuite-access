import { FormEvent, useState } from "react";
import { Link } from "react-router";
import { ChevronLeftIcon } from "../../icons";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Button from "../ui/button/Button";
import { supabase } from "../../lib/supabaseClient";

export default function SignInForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState<string | null>(null);
  return (
    <div className="flex flex-col flex-1">
      <div className="w-full max-w-md pt-10 mx-auto">
        <Link
          to="/"
          className="inline-flex items-center text-sm text-gray-500 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
        >
          <ChevronLeftIcon className="size-5" />
          Back to dashboard
        </Link>
      </div>
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
              Sign In
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Enter your email and password to sign in!
            </p>
          </div>
          <div>
            <form
              onSubmit={async (e: FormEvent) => {
                e.preventDefault();
                setError(null);
                setLoading(true);
                const { error } = await supabase.auth.signInWithOtp({
                  email,
                  options: {
                    emailRedirectTo:
                      (import.meta.env.VITE_SITE_URL as string) || window.location.origin,
                    shouldCreateUser: false,
                  },
                });
                setLoading(false);
                if (error) {
                  // If user does not exist in auth.users, Supabase returns an error
                  setError(
                    "You must be invited first. Please contact support if you believe this is a mistake.",
                  );
                  setOtpSent(null);
                } else {
                  setOtpSent("Magic link sent. Check your email.");
                }
              }}
            >
              <div className="space-y-6">
                <div>
                  <Label>
                    Email <span className="text-error-500">*</span>{" "}
                  </Label>
                  <Input
                    placeholder="info@gmail.com"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                {error && (
                  <div className="text-error-500 text-sm">{error}</div>
                )}
                {otpSent && (
                  <div className="text-success-500 text-sm">{otpSent}</div>
                )}
                <div>
                  <Button className="w-full" size="sm" disabled={loading || !email}>
                    {loading ? "Sending link..." : "Send magic link"}
                  </Button>
                </div>
              </div>
            </form>

            <div className="mt-5">
              <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
                Don&apos;t have an account? {""}
                <Link
                  to="/signup"
                  className="text-brand-500 hover:text-brand-600 dark:text-brand-400"
                >
                  Sign Up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
