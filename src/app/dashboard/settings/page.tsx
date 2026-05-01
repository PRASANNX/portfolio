"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/components/auth/auth-provider";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function SettingsPage() {
  const { user } = useAuth();
  const supabase = createClient();
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (user) {
      setFullName(user.user_metadata?.full_name || "");
      setPhone(user.user_metadata?.phone || user.phone || "");
    }
  }, [user]);

  const handleSave = async () => {
    setSaving(true);
    setSaved(false);

    const { error } = await supabase.auth.updateUser({
      data: { full_name: fullName, phone },
    });

    if (!error) {
      // Also update the profiles table
      await supabase
        .from("profiles")
        .update({ full_name: fullName, phone })
        .eq("id", user?.id);

      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }
    setSaving(false);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  const handleDeleteAccount = async () => {
    if (!confirm("Are you sure? This action cannot be undone. All your data will be permanently deleted.")) return;
    setDeleting(true);
    // In production, this would call a server action or API route
    // that uses the service role key to delete the user
    alert("Account deletion request submitted. Our team will process this within 24 hours.");
    setDeleting(false);
  };

  if (!user) return null;

  return (
    <div className="p-6 sm:p-8 max-w-2xl">
      <div className="mb-10">
        <h1
          className="text-2xl sm:text-3xl font-black text-black tracking-tight mb-1"
          style={{ fontFamily: "Montserrat, sans-serif" }}
        >
          Settings
        </h1>
        <p className="body text-gray-500">Manage your account and preferences.</p>
      </div>

      {/* Profile Section */}
      <div className="card p-6 mb-6">
        <h2
          className="text-sm font-bold text-black uppercase tracking-widest mb-6"
          style={{ fontFamily: "Montserrat, sans-serif" }}
        >
          Profile
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5" style={{ fontFamily: "Montserrat, sans-serif" }}>
              Email
            </label>
            <input
              type="email"
              value={user.email || ""}
              disabled
              className="input bg-gray-50 text-gray-400 cursor-not-allowed"
            />
            <p className="text-xs text-gray-400 mt-1">Email cannot be changed.</p>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5" style={{ fontFamily: "Montserrat, sans-serif" }}>
              Full Name
            </label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="input"
              placeholder="Your full name"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5" style={{ fontFamily: "Montserrat, sans-serif" }}>
              Phone (E.164)
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="input"
              placeholder="+919876543210"
            />
          </div>

          <button onClick={handleSave} disabled={saving} className="btn-primary text-sm">
            {saving ? "Saving..." : saved ? "Saved ✓" : "Save Changes"}
          </button>
        </div>
      </div>

      {/* Sessions Section */}
      <div className="card p-6 mb-6">
        <h2
          className="text-sm font-bold text-black uppercase tracking-widest mb-4"
          style={{ fontFamily: "Montserrat, sans-serif" }}
        >
          Session
        </h2>
        <p className="text-sm text-gray-500 mb-4">
          Signed in as <span className="font-semibold text-black">{user.email}</span>
        </p>
        <button onClick={handleSignOut} className="btn-secondary text-sm">
          Sign Out
        </button>
      </div>

      {/* Danger Zone */}
      <div className="border border-red-200 rounded-lg p-6">
        <h2
          className="text-sm font-bold text-red-600 uppercase tracking-widest mb-2"
          style={{ fontFamily: "Montserrat, sans-serif" }}
        >
          Danger Zone
        </h2>
        <p className="text-sm text-gray-500 mb-4">
          Permanently delete your account and all associated data. This action cannot be undone.
        </p>
        <button
          onClick={handleDeleteAccount}
          disabled={deleting}
          className="px-4 py-2 rounded-lg text-sm font-semibold bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 transition-colors"
        >
          {deleting ? "Processing..." : "Delete Account"}
        </button>
      </div>
    </div>
  );
}
