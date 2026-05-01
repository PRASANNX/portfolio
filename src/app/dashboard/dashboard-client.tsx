"use client";

import { useState } from "react";
import Link from "next/link";
import { CreateProjectModal } from "@/components/CreateProjectModal";

interface Project {
  id: string;
  name: string;
  slug: string;
  accent_color: string;
  billing_tier: string;
  created_at: string;
  role: string;
}

interface DashboardClientProps {
  firstName: string;
  totalUsers: number;
  projects: Project[];
}

export function DashboardClient({
  firstName,
  totalUsers,
  projects,
}: DashboardClientProps) {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="p-6 sm:p-8 max-w-5xl">
      {/* Header */}
      <div className="mb-10">
        <h1
          className="text-2xl sm:text-3xl font-black text-black tracking-tight mb-1"
          style={{ fontFamily: "Montserrat, sans-serif" }}
        >
          Welcome back, {firstName}.
        </h1>
        <p className="body text-gray-500">
          Here's what's happening across your projects today.
        </p>
      </div>

      {/* Metrics Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-10">
        <div className="card p-6">
          <p
            className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            Platform Users
          </p>
          <p
            className="text-4xl font-black text-black"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            {totalUsers}
          </p>
          <p className="body text-gray-400 mt-1 text-xs">Live from database</p>
        </div>

        <div className="card p-6">
          <p
            className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            My Projects
          </p>
          {projects.length > 0 ? (
            <>
              <p
                className="text-4xl font-black text-black"
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                {projects.length}
              </p>
              <p className="body text-gray-400 mt-1 text-xs">
                Active organizations
              </p>
            </>
          ) : (
            <div>
              <p className="text-sm text-gray-400 mb-3">No projects yet.</p>
              <button
                onClick={() => setShowModal(true)}
                className="text-xs font-semibold hover:underline"
                style={{
                  color: "var(--accent)",
                  fontFamily: "Montserrat, sans-serif",
                }}
              >
                Launch your first project →
              </button>
            </div>
          )}
        </div>

        <div className="card p-6">
          <p
            className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            Revenue (MRR)
          </p>
          <div>
            <p className="text-sm text-gray-400 mb-3">Ready to earn?</p>
            <button
              className="text-xs font-semibold hover:underline"
              style={{
                color: "var(--accent)",
                fontFamily: "Montserrat, sans-serif",
              }}
            >
              Setup Razorpay integration →
            </button>
          </div>
        </div>
      </div>

      {/* My Projects Section */}
      {projects.length > 0 && (
        <div className="mb-10">
          <div className="flex items-center justify-between mb-5">
            <h2
              className="text-sm font-bold text-black uppercase tracking-widest"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              My Projects
            </h2>
            <button
              onClick={() => setShowModal(true)}
              className="text-xs font-semibold hover:underline"
              style={{
                color: "var(--accent)",
                fontFamily: "Montserrat, sans-serif",
              }}
            >
              + New Project
            </button>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {projects.map((project) => (
              <Link
                key={project.id}
                href={`/${project.slug}`}
                className="card p-5 flex items-center gap-4 hover:border-gray-300 transition-colors duration-150 group"
              >
                <span
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-black text-sm flex-shrink-0"
                  style={{
                    backgroundColor: project.accent_color || "#FF5F1F",
                    fontFamily: "Montserrat, sans-serif",
                  }}
                >
                  {project.name.charAt(0).toUpperCase()}
                </span>
                <div className="flex-1 min-w-0">
                  <p
                    className="text-sm font-bold text-black truncate group-hover:underline"
                    style={{ fontFamily: "Montserrat, sans-serif" }}
                  >
                    {project.name}
                  </p>
                  <p className="text-xs text-gray-400 truncate">
                    /{project.slug} · {project.billing_tier} ·{" "}
                    <span className="capitalize">{project.role}</span>
                  </p>
                </div>
                <svg
                  className="w-4 h-4 text-gray-300 group-hover:text-black transition-colors flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="border-t border-gray-200 pt-8">
        <h2
          className="text-sm font-bold text-black uppercase tracking-widest mb-5"
          style={{ fontFamily: "Montserrat, sans-serif" }}
        >
          Quick Actions
        </h2>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setShowModal(true)}
            className="btn-primary text-sm px-5 py-2.5"
          >
            New Project
          </button>
          <button className="btn-secondary text-sm px-5 py-2.5">
            Invite Member
          </button>
          <button className="btn-ghost text-sm px-4 py-2.5">
            View Documentation
          </button>
        </div>
      </div>

      {/* Create Project Modal */}
      <CreateProjectModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      />
    </div>
  );
}
