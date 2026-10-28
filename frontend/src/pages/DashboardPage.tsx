import { useEffect, useState } from "react";
import {
  ArrowUpRight,
  BarChart3,
  CalendarDays,
  FileText,
  LayoutDashboard,
  LogOut,
  Sparkles,
  Users,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import {
  getAuthToken,
  useAuth,
} from "../context/AuthContext";
import { api } from "../services/api";

type Overview = {
  message: string;
  ngo: {
    id: number;
    name: string;
    location: string;
    focus_area: string;
  };
  current_user: {
    name: string;
    role: string;
  };
};

const modules = [
  {
    icon: Users,
    name: "Volunteers",
    description:
      "Keep your community organized in one place.",
  },
  {
    icon: CalendarDays,
    name: "Events",
    description:
      "Plan initiatives and track participation.",
  },
  {
    icon: BarChart3,
    name: "Impact",
    description:
      "Connect activities to measurable outcomes.",
  },
  {
    icon: FileText,
    name: "Reports",
    description:
      "Turn your records into useful summaries.",
  },
];

export function DashboardPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [overview, setOverview] =
    useState<Overview | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = getAuthToken();

    api
      .get<Overview>("/dashboard/overview", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => setOverview(response.data))
      .catch(() => {
        setError(
          "Could not load your workspace. Check that the backend is running.",
        );
      });
  }, []);

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <div className="min-h-screen bg-[#f7f9f5] text-[#17352b] lg:grid lg:grid-cols-[260px_1fr]">
      <aside className="border-b border-slate-200 bg-white p-6 lg:min-h-screen lg:border-b-0 lg:border-r">
        <Link
          to="/"
          className="text-xl font-bold text-emerald-800"
        >
          ✳ Impact Bhoomi
        </Link>

        <div className="mt-10 rounded-2xl bg-emerald-50 p-4">
          <p className="text-xs font-bold uppercase tracking-wide text-emerald-700">
            Your workspace
          </p>
          <p className="mt-2 font-semibold">
            {user?.ngo.name}
          </p>
          <p className="mt-1 text-sm text-slate-500">
            {user?.ngo.location}
          </p>
        </div>

        <nav className="mt-8 space-y-2">
          <div className="flex items-center gap-3 rounded-xl bg-emerald-800 px-4 py-3 font-semibold text-white">
            <LayoutDashboard size={18} />
            Overview
          </div>

          <p className="px-4 pt-5 text-xs font-bold uppercase tracking-wide text-slate-400">
            Modules coming next
          </p>

          {modules.map(({ icon: Icon, name }) => (
            <div
              key={name}
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-slate-500"
            >
              <Icon size={18} />
              {name}
            </div>
          ))}
        </nav>

        <button
          onClick={handleLogout}
          className="mt-10 flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-100"
        >
          <LogOut size={18} />
          Log out
        </button>
      </aside>

      <main className="px-6 py-8 sm:px-10">
        <header className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm text-slate-500">
              NGO workspace / Overview
            </p>
            <h1 className="mt-2 text-3xl font-bold">
              Good to see you,{" "}
              {user?.full_name.split(" ")[0]}.
            </h1>
          </div>

          <div className="rounded-full border border-emerald-200 bg-white px-4 py-2 text-sm font-medium text-emerald-800">
            ● Workspace active
          </div>
        </header>

        {error && (
          <p
            role="alert"
            className="mt-8 rounded-xl bg-red-50 p-4 text-red-700"
          >
            {error}
          </p>
        )}

        <section className="mt-9 overflow-hidden rounded-[2rem] bg-emerald-900 p-8 text-white sm:p-10">
          <div className="flex items-center gap-2 text-sm font-semibold text-emerald-200">
            <Sparkles size={17} />
            YOUR FOUNDATION IS READY
          </div>

          <h2 className="mt-5 max-w-2xl text-3xl font-bold sm:text-4xl">
            {overview?.message ??
              `Welcome to ${user?.ngo.name}`}
          </h2>

          <p className="mt-4 max-w-2xl leading-7 text-emerald-100">
            Your organization now has its own secure
            workspace. Next, we’ll add volunteers,
            events, impact tracking and the AI agents
            that use this information responsibly.
          </p>

          <div className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white/10 px-4 py-3 text-sm">
            NGO ID: {user?.ngo_id}
            <ArrowUpRight size={16} />
          </div>
        </section>

        <section className="mt-10">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-sm font-semibold text-emerald-700">
                BUILDING YOUR PLATFORM
              </p>
              <h2 className="mt-2 text-2xl font-bold">
                Your modules
              </h2>
            </div>
            <span className="text-sm text-slate-500">
              Phase 1 of the build
            </span>
          </div>

          <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {modules.map(
              ({ icon: Icon, name, description }) => (
                <div
                  key={name}
                  className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm"
                >
                  <div className="inline-flex rounded-xl bg-emerald-50 p-3 text-emerald-800">
                    <Icon size={23} />
                  </div>
                  <h3 className="mt-6 text-lg font-bold">
                    {name}
                  </h3>
                  <p className="mt-2 min-h-14 text-sm leading-6 text-slate-500">
                    {description}
                  </p>
                  <p className="mt-5 text-xs font-semibold uppercase tracking-wide text-emerald-700">
                    Next build phase
                  </p>
                </div>
              ),
            )}
          </div>
        </section>

        <section className="mt-10 rounded-2xl border border-slate-100 bg-white p-7">
          <p className="text-sm font-semibold text-emerald-700">
            ORGANIZATION PROFILE
          </p>
          <h2 className="mt-2 text-xl font-bold">
            {user?.ngo.name}
          </h2>
          <div className="mt-5 flex flex-wrap gap-3 text-sm">
            <span className="rounded-full bg-[#f7f9f5] px-4 py-2">
              📍 {user?.ngo.location}
            </span>
            <span className="rounded-full bg-[#f7f9f5] px-4 py-2">
              ✳ {user?.ngo.focus_area}
            </span>
            <span className="rounded-full bg-[#f7f9f5] px-4 py-2">
              👤 {user?.role}
            </span>
          </div>
        </section>
      </main>
    </div>
  );
}
