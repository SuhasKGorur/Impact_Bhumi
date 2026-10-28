import axios from "axios";
import { useState, type FormEvent } from "react";
import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

import { useAuth } from "../context/AuthContext";

export function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const successMessage = (
    location.state as { message?: string } | null
  )?.message;

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();
    setError("");
    setSubmitting(true);

    const form = new FormData(event.currentTarget);

    try {
      await login(
        String(form.get("email") ?? ""),
        String(form.get("password") ?? ""),
      );

      navigate("/dashboard", { replace: true });
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(
          err.response?.data?.detail ??
            "Unable to log in.",
        );
      } else {
        setError("Unable to log in. Please try again.");
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="grid min-h-screen lg:grid-cols-2">
      <section className="flex items-center justify-center bg-[#f7f9f5] px-6 py-12">
        <div className="w-full max-w-md">
          <Link
            to="/"
            className="text-xl font-bold text-emerald-800"
          >
            ✳ Impact Bhoomi
          </Link>

          <h1 className="mt-14 text-4xl font-bold text-[#17352b]">
            Welcome back.
          </h1>

          <p className="mt-3 text-slate-600">
            Sign in to your NGO workspace.
          </p>

          {successMessage && (
            <p className="mt-6 rounded-xl bg-emerald-50 p-4 text-sm text-emerald-800">
              {successMessage}
            </p>
          )}

          {error && (
            <p
              role="alert"
              className="mt-6 rounded-xl bg-red-50 p-4 text-sm text-red-700"
            >
              {error}
            </p>
          )}

          <form
            onSubmit={handleSubmit}
            className="mt-8 space-y-5"
          >
            <label className="block text-sm font-semibold">
              Email
              <input
                name="email"
                type="email"
                required
                className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-emerald-600"
                placeholder="you@ngo.org"
              />
            </label>

            <label className="block text-sm font-semibold">
              Password
              <input
                name="password"
                type="password"
                required
                className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-emerald-600"
                placeholder="Your password"
              />
            </label>

            <button
              disabled={submitting}
              className="w-full rounded-xl bg-emerald-800 py-4 font-semibold text-white hover:bg-emerald-900 disabled:opacity-60"
            >
              {submitting ? "Signing in..." : "Log in"}
            </button>
          </form>

          <p className="mt-7 text-sm text-slate-600">
            New to Impact Bhoomi?{" "}
            <Link
              to="/register"
              className="font-semibold text-emerald-700"
            >
              Register your NGO
            </Link>
          </p>
        </div>
      </section>

      <section className="hidden bg-emerald-900 p-14 text-white lg:flex lg:flex-col lg:justify-between">
        <div className="text-xl font-bold">
          A better way to make an impact.
        </div>

        <div>
          <div className="mb-8 text-7xl">✳</div>
          <h2 className="max-w-lg text-5xl font-bold leading-tight">
            Your mission deserves a clearer view.
          </h2>
          <p className="mt-6 max-w-md text-lg text-emerald-100">
            Bring your people, activities and outcomes
            together. Build the foundation for
            context-aware AI assistance.
          </p>
        </div>

        <p className="text-emerald-200">
          Impact Bhoomi · NGO impact platform
        </p>
      </section>
    </main>
  );
}
