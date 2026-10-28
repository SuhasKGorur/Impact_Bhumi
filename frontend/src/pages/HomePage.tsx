import {
    ArrowRight,
    BarChart3,
    CalendarDays,
    HeartHandshake,
    Sparkles,
  } from "lucide-react";
  import { Link } from "react-router-dom";
  
  const features = [
    {
      icon: HeartHandshake,
      title: "One place for your people",
      text: "Organize your NGO workspace and prepare to manage volunteers as your community grows.",
    },
    {
      icon: CalendarDays,
      title: "Events with purpose",
      text: "Plan initiatives, track participation and connect activities to measurable outcomes.",
    },
    {
      icon: BarChart3,
      title: "Impact you can explain",
      text: "Bring goals, activities and reporting together in a clear operational dashboard.",
    },
  ];
  
  export function HomePage() {
    return (
      <main className="min-h-screen bg-[#f7f9f5] text-[#17352b]">
        <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
          <Link to="/" className="flex items-center gap-3 text-xl font-bold">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-800 text-white">
              ✳
            </span>
            Impact Bhoomi
          </Link>
  
          <nav className="flex items-center gap-3">
            <Link
              to="/login"
              className="rounded-xl px-4 py-2 font-medium hover:bg-white"
            >
              Log in
            </Link>
            <Link
              to="/register"
              className="rounded-xl bg-emerald-800 px-5 py-3 font-semibold text-white hover:bg-emerald-900"
            >
              Start your NGO
            </Link>
          </nav>
        </header>
  
        <section className="mx-auto grid max-w-7xl gap-12 px-6 pb-24 pt-16 lg:grid-cols-2 lg:items-center">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-800">
              <Sparkles size={16} />
              Built for impact. Designed for people.
            </span>
  
            <h1 className="mt-8 max-w-3xl text-5xl font-bold leading-tight tracking-tight sm:text-6xl">
              Make every good action
              <span className="text-emerald-700">
                {" "}count.
              </span>
            </h1>
  
            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
              An AI-based platform designed to help NGOs
              organize their work, understand their impact
              and make informed decisions. Begin with your
              own secure NGO workspace.
            </p>
  
            <div className="mt-9 flex flex-wrap gap-4">
              <Link
                to="/register"
                className="inline-flex items-center gap-2 rounded-2xl bg-emerald-800 px-6 py-4 font-semibold text-white shadow-lg shadow-emerald-900/15 hover:bg-emerald-900"
              >
                Create your workspace
                <ArrowRight size={18} />
              </Link>
  
              <a
                href="#how-it-works"
                className="rounded-2xl border border-slate-200 bg-white px-6 py-4 font-semibold hover:border-emerald-400"
              >
                Explore the platform
              </a>
            </div>
          </div>
  
          <div className="relative">
            <div className="absolute -inset-5 rounded-[2.5rem] bg-emerald-100/70 blur-2xl" />
  
            <div className="relative overflow-hidden rounded-[2rem] border border-emerald-100 bg-white p-7 shadow-2xl shadow-emerald-950/10">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">
                    Your organization
                  </p>
                  <h2 className="mt-1 text-2xl font-bold">
                    A clearer path to impact
                  </h2>
                </div>
                <div className="rounded-2xl bg-emerald-100 p-3 text-emerald-800">
                  <BarChart3 />
                </div>
              </div>
  
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {[
                  ["01", "Build your NGO workspace"],
                  ["02", "Organize your community"],
                  ["03", "Track meaningful outcomes"],
                  ["04", "Get AI-assisted insights"],
                ].map(([number, label]) => (
                  <div
                    key={number}
                    className="min-h-36 rounded-2xl bg-[#f7f9f5] p-5"
                  >
                    <span className="text-sm font-bold text-emerald-700">
                      {number}
                    </span>
                    <p className="mt-6 font-semibold">
                      {label}
                    </p>
                  </div>
                ))}
              </div>
  
              <p className="mt-6 text-sm text-slate-500">
                AI-assisted features will be enabled as
                their modules are integrated.
              </p>
            </div>
          </div>
        </section>
  
        <section
          id="how-it-works"
          className="bg-white px-6 py-20"
        >
          <div className="mx-auto max-w-7xl">
            <p className="font-semibold text-emerald-700">
              THE PLATFORM
            </p>
            <h2 className="mt-3 max-w-2xl text-4xl font-bold">
              Give your mission a better operating system.
            </h2>
  
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {features.map(({ icon: Icon, title, text }) => (
                <div
                  key={title}
                  className="rounded-3xl border border-slate-100 bg-[#f7f9f5] p-7"
                >
                  <Icon
                    className="text-emerald-700"
                    size={30}
                  />
                  <h3 className="mt-8 text-xl font-bold">
                    {title}
                  </h3>
                  <p className="mt-3 leading-7 text-slate-600">
                    {text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    );
  }
  