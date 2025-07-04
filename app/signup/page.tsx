"use client";
import { signup } from "@/app/auth/actions";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema, type SignupSchema } from "./validation";
import { useState } from "react";

export default function SignupPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupSchema>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: SignupSchema) => {
    setIsSubmitting(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("password", data.password);

      const result = await signup(formData);

      if (result?.error) {
        setError(result.error);
      }
    } catch (error) {
      console.error("Signup error:", error);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-light text-slate-900 mb-2">
            Create account
          </h1>
          <p className="text-slate-600 text-sm">
            Join us today and get started
          </p>
        </div>

        <div className="bg-white/70 backdrop-blur-sm rounded-sm shadow-xl border border-white/20 p-8">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-2">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-slate-700"
              >
                Name
              </label>
              <input
                {...register("name")}
                id="name"
                type="text"
                autoComplete="name"
                className={`w-full px-4 py-3 rounded-xl border bg-white/50 text-slate-900 placeholder-slate-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 ${
                  errors.name
                    ? "border-red-300 focus:border-red-500 focus:ring-red-500/20"
                    : "border-slate-200 hover:border-slate-300"
                }`}
                placeholder="Enter your name"
              />
              {errors.name && (
                <p className="text-red-500 text-sm animate-in slide-in-from-top-1 duration-200">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-slate-700"
              >
                Email address
              </label>
              <input
                {...register("email")}
                id="email"
                type="email"
                autoComplete="email"
                className={`w-full px-4 py-3 rounded-xl border bg-white/50 text-slate-900 placeholder-slate-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 ${
                  errors.email
                    ? "border-red-300 focus:border-red-500 focus:ring-red-500/20"
                    : "border-slate-200 hover:border-slate-300"
                }`}
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="text-red-500 text-sm animate-in slide-in-from-top-1 duration-200">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-slate-700"
              >
                Password
              </label>
              <input
                {...register("password")}
                id="password"
                type="password"
                autoComplete="new-password"
                className={`w-full px-4 py-3 rounded-xl border bg-white/50 text-slate-900 placeholder-slate-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 ${
                  errors.password
                    ? "border-red-300 focus:border-red-500 focus:ring-red-500/20"
                    : "border-slate-200 hover:border-slate-300"
                }`}
                placeholder="Create a password"
              />
              {errors.password && (
                <p className="text-red-500 text-sm animate-in slide-in-from-top-1 duration-200">
                  {errors.password.message}
                </p>
              )}
            </div>

            {error && (
              <div className="p-4 rounded-xl bg-red-50 border border-red-200 animate-in slide-in-from-top-2 duration-300">
                <p className="text-red-700 text-sm text-center">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 px-4 bg-slate-900 text-white rounded-xl font-medium transition-all duration-200 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-500/20 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed transform hover:scale-[0.99] active:scale-[0.97]"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Creating account...
                </span>
              ) : (
                "Create account"
              )}
            </button>
          </form>
        </div>

        <div className="text-center mt-6">
          <p className="text-slate-600 text-sm">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-slate-900 font-medium hover:text-slate-700 transition-colors duration-200"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
