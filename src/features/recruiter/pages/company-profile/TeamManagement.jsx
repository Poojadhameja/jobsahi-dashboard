import React, { useMemo, useState } from "react";
import {
  LuUsers,
  LuMail,
  LuEye,
  LuShieldCheck,
  LuPencil,
  LuTrash2,
  LuChevronDown,
} from "react-icons/lu";

import { PrimaryButton } from "@shared/components/Button";
import { COLORS, TAILWIND_COLORS } from "@shared/WebConstant";

const RolePill = ({ role = "viewer" }) => {
  const isAdmin = role === "admin";
  return (
    <span
      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm border
        ${isAdmin ? "text-white border-transparent" : "bg-white border-[#5B9821]/30"}`}
      style={{
        backgroundColor: isAdmin ? COLORS.GREEN_PRIMARY : undefined,
        color: isAdmin ? "white" : COLORS.GREEN_PRIMARY,
        borderColor: isAdmin ? "transparent" : undefined
      }}
    >
      {isAdmin ? <LuShieldCheck size={16} /> : <LuEye size={16} />}
      {isAdmin ? "Admin" : "Viewer"}
    </span>
  );
};

const IconGhostButton = ({ title, className = "", children, ...rest }) => (
  <button
    title={title}
    className={`p-2 rounded-md hover:bg-gray-100 ${className}`}
    style={{ color: COLORS.GRAY_600 }}
    {...rest}
  >
    {children}
  </button>
);

export default function TeamManagement() {
  const [invite, setInvite] = useState({ email: "brightorial@company.com", role: "viewer" });
  const [members, setMembers] = useState([
    { id: 1, name: "Aaruu", email: "aaruu@tech.com", role: "admin" },
    { id: 2, name: "Pooja", email: "pooja@tech.com", role: "viewer" },
    { id: 3, name: "Aaruu", email: "aaruu@tech.com", role: "admin" }
  ]);

  const isValidEmail = useMemo(
    () => /\S+@\S+\.\S+/.test(invite.email),
    [invite.email]
  );

  const addMember = () => {
    if (!isValidEmail) return;
    const name = invite.email.split("@")[0].replace(/\./g, " ");
    setMembers((prev) => [
      ...prev,
      { id: Date.now(), name: name.charAt(0).toUpperCase() + name.slice(1), email: invite.email, role: invite.role }
    ]);
    setInvite({ email: "", role: "viewer" });
  };

  const toggleRole = (id) => {
    setMembers((prev) =>
      prev.map((m) => (m.id === id ? { ...m, role: m.role === "admin" ? "viewer" : "admin" } : m))
    );
  };

  const removeMember = (id) => setMembers((prev) => prev.filter((m) => m.id !== id));

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-14">
      {/* Invite Teammate */}
      <section 
        className="bg-white rounded-2xl shadow-sm p-6"
        style={{ border: `1px solid ${COLORS.GRAY_200}` }}
      >
        <div className="flex items-center gap-2 mb-1">
          <LuUsers style={{ color: COLORS.GREEN_PRIMARY }} />
          <h3 className="font-semibold" style={{ color: COLORS.PRIMARY }}>Invite Teammate</h3>
        </div>
        <p className="text-sm mb-5" style={{ color: COLORS.GRAY_600 }}>
          Add new team members to your account
        </p>

        {/* Email */}
        <label className="text-sm mb-1 block" style={{ color: COLORS.GRAY_600 }}>Email Address</label>
        <input
          type="email"
          value={invite.email}
          onChange={(e) => setInvite((s) => ({ ...s, email: e.target.value }))}
          className="w-full h-10 rounded-lg border px-3 mb-4 focus:outline-none focus:ring-2"
          style={{ 
            borderColor: COLORS.GRAY_200,
            focusRingColor: COLORS.GREEN_PRIMARY
          }}
          placeholder="name@company.com"
        />

        {/* Role */}
        <label className="text-sm mb-1 block" style={{ color: COLORS.GRAY_600 }}>Role</label>
        <div className="relative">
          <select
            value={invite.role}
            onChange={(e) => setInvite((s) => ({ ...s, role: e.target.value }))}
            className="w-full h-10 rounded-lg border pl-10 pr-9 appearance-none focus:outline-none focus:ring-2"
            style={{ 
              borderColor: COLORS.GRAY_200,
              focusRingColor: COLORS.GREEN_PRIMARY
            }}
          >
            <option value="viewer">Viewer</option>
            <option value="admin">Admin</option>
          </select>
          {/* left icon */}
          <LuEye 
            className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" 
            style={{ color: COLORS.GRAY_600 }}
          />
          {/* chevron */}
          <LuChevronDown 
            className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" 
            style={{ color: COLORS.GRAY_600 }}
          />
        </div>

        {/* Send invitation */}
        <div className="mt-5">
          <PrimaryButton
            fullWidth
            onClick={addMember}
            disabled={!isValidEmail}
            className="gap-2"
            icon={<LuMail />}
          >
            Send invitation
          </PrimaryButton>
        </div>
      </section>

      {/* Team Members */}
      <section 
        className="md:col-span-2 bg-white rounded-2xl shadow-sm p-6"
        style={{ 
          border: `1px solid ${COLORS.GRAY_200}`
        }}
      >
        <div className="flex items-center gap-2 mb-1">
          <LuUsers style={{ color: COLORS.GREEN_PRIMARY }} />
          <h3 className="font-semibold" style={{ color: COLORS.PRIMARY }}>Team Members</h3>
        </div>
        <p className="text-sm mb-5" style={{ color: COLORS.GRAY_600 }}>
          Manage your current team members and their roles
        </p>

        <div className="space-y-3">
          {members.map((m) => (
            <div
              key={m.id}
              className="flex items-center justify-between gap-4 rounded-xl bg-white px-4 py-3"
              style={{ border: `1px solid ${COLORS.GRAY_200}` }}
            >
              <div className="flex items-center gap-3 min-w-0">
                <div 
                  className="h-10 w-10 rounded-full" 
                  style={{ backgroundColor: COLORS.GRAY_200 }}
                />
                <div className="min-w-0">
                  <div className="font-medium truncate" style={{ color: COLORS.PRIMARY }}>{m.name}</div>
                  <div className="text-sm truncate" style={{ color: COLORS.GRAY_600 }}>{m.email}</div>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <RolePill role={m.role} />

                <IconGhostButton
                  title="Edit role"
                  onClick={() => toggleRole(m.id)}
                  aria-label="Edit role"
                >
                  <LuPencil />
                </IconGhostButton>

                <IconGhostButton
                  title="Remove member"
                  onClick={() => removeMember(m.id)}
                  className="hover:bg-red-50"
                  style={{ color: COLORS.ERROR }}
                  aria-label="Delete member"
                >
                  <LuTrash2 />
                </IconGhostButton>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
