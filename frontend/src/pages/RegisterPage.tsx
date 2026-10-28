import axios from "axios";
import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";

import { api } from "../services/api";

export function RegisterPage() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();
    setError("");
    setSubmitting(true);

    const form = new FormData(event.currentTarget);

    const data = {
      ngo_name: String(form.get("ngo_name") ?? ""),
      location: String(form.get("location") ?? ""),
      focus_area: String(form.get("focus_area") ?? ""),
      full_name: String(form.get("full_name") ?? ""),
      email: String(form.get("email") ?? ""),
      password: String(form.get("password") ?? ""),
    };

    try {
      await api.post("/auth/register", data);
      navigate("/login", {
        state: {
          message:
            "NGO registered successfully. Please log in.",
        },
      });
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const detail = err.response?.data?.detail;

        setError(
          typeof detail === "string"
            ? detail
            : "Check your details and try again.",
        );
      } else {
        setError("Registration failed. Please try again.");
      }
    } finally {
      setSubmitting(false);
    }
  }

  const inputClass =
    "mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-emerald-600";

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f7f9f5] px-5 py-12">
      <div className="w-full max-w-2xl rounded-[2rem] border border-slate-100 bg-white p-8 shadow-xl shadow-emerald-950/5 sm:p-10">
        <Link
          to="/"
          className="font-bold text-emerald-800"
        >
          ✳ Impact Bhoomi
        </Link>

        <h1 className="mt-8 text-3xl font-bold">
          Create your NGO workspace
        </h1>
        <p className="mt-2 text-slate-600">
          One secure space for your organization’s work.
        </p>

        {error && (
          <p
            role="alert"
            className="mt-5 rounded-xl bg-red-50 p-4 text-sm text-red-700"
          >
            {error}
          </p>
        )}

        <form
          onSubmit={handleSubmit}
          className="mt-8 grid gap-5 sm:grid-cols-2"
        >
          <label className="text-sm font-semibold">
            NGO name
            <input
              name="ngo_name"
              required
              minLength={2}
              maxLength={200}
              className={inputClass}
              placeholder="Green Earth Foundation"
            />
          </label>

          <label className="text-sm font-semibold">
            Location
            <input
              name="location"
              required
              minLength={2}
              className={inputClass}
              placeholder="Bengaluru"
            />
          </label>

          <label className="text-sm font-semibold">
            Focus area
            <input
              name="focus_area"
              required
              minLength={2}
              className={inputClass}
              placeholder="Environment"
            />
          </label>

          <label className="text-sm font-semibold">
            Administrator name
            <input
              name="full_name"
              required
              minLength={2}
              className={inputClass}
              placeholder="Your full name"
            />
          </label>

          <label className="text-sm font-semibold sm:col-span-2">
            Work email
            <input
              name="email"
              type="email"
              required
              className={inputClass}
              placeholder="you@ngo.org"
            />
          </label>

          <label className="text-sm font-semibold sm:col-span-2">
            Password
            <input
              name="password"
              type="password"
              required
              minLength={8}
              className={inputClass}
              placeholder="At least 8 characters"
            />
          </label>

          <button
            disabled={submitting}
            className="rounded-xl bg-emerald-800 px-5 py-4 font-semibold text-white hover:bg-emerald-900 disabled:opacity-60 sm:col-span-2"
          >
            {submitting
              ? "Creating workspace..."
              : "Create workspace"}
          </button>
        </form>

        <p className="mt-6 text-sm text-slate-600">
          Already registered?{" "}
          <Link
            to="/login"
            className="font-semibold text-emerald-700"
          >
            Log in
          </Link>
        </p>
      </div>
    </main>
  );
}
