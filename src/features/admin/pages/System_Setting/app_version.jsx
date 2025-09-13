import React, { useState } from 'react';
import {
  LuArrowUpRight,
  LuUpload,
  LuMonitor,
} from 'react-icons/lu';
import { TAILWIND_COLORS, COLORS } from '../../../../shared/WebConstant';
import Button, { BackToOverviewButton } from '../../../../shared/components/Button';

export default function AppVersionMonitor() {
  const [autoUpdates, setAutoUpdates] = useState(false);
  const [maintenance, setMaintenance] = useState(false);
  const [fileUsage] = useState(78); // percent

  const stats = [
    {
      id: "logo",
      title: "Main Logo",
      value: "200 x 60px",
      actionIcon: <LuUpload className="h-5 w-5" style={{ color: COLORS?.GREEN_PRIMARY || '#059669' }} />,
    },
    {
      id: "version",
      title: "Current Version",
      value: "V2.1.4",
      actionIcon: <LuArrowUpRight className="h-5 w-5" style={{ color: COLORS?.GREEN_PRIMARY || '#059669' }} />,
    },
    {
      id: "users",
      title: "Active Users",
      value: "1,234",
      actionIcon: <LuArrowUpRight className="h-5 w-5" style={{ color: COLORS?.GREEN_PRIMARY || '#059669' }} />,
    },
    {
      id: "uptime",
      title: "Uptime",
      value: "99.9%",
      actionIcon: <LuArrowUpRight className="h-5 w-5" style={{ color: COLORS?.GREEN_PRIMARY || '#059669' }} />,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header Section */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 mb-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <div
              className="h-8 w-8 rounded-full flex items-center justify-center mt-0.5"
              style={{ backgroundColor: COLORS?.GREEN_PRIMARY || '#059669' }}
            >
              <LuMonitor className="h-4 w-4 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-slate-900">App Version Monitor</h2>
              <p className="text-sm text-slate-600">System health & updates</p>
            </div>
          </div>

          {/* Back to overview (pill) */}
          <BackToOverviewButton
            onClick={() => window.history.back()}
          />
        </div>

        {/* Stat cards */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {stats.map((s) => (
            <div
              key={s.id}
              className="bg-white border border-slate-200 rounded-xl p-5 flex items-start justify-between"
            >
              <div>
                <p className="text-sm text-slate-600">{s.title}</p>
                <p className="text-xl font-semibold text-slate-900 mt-1">
                  {s.value}
                </p>
              </div>
              <div 
                className="h-9 w-9 rounded-lg grid place-items-center"
                style={{ backgroundColor: 'rgba(92,154,36,0.1)' }}
              >
                {s.actionIcon}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lower cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* System Health */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-6">
          <h3 className="text-slate-900 font-semibold">System Health</h3>
          <p className="text-sm text-slate-600 mb-4">
            Real-time system monitoring
          </p>

          <div className="space-y-3">
            <HealthRow label="Database" status="Healthy" tone="emerald" />
            <HealthRow label="API Services" status="Operational" tone="emerald" />
            <HealthRow label="Cache layer" status="Optimal" tone="emerald" />

            {/* File storage with progress */}
            <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
              <div className="flex items-center justify-between px-4 py-2.5">
                <span className="text-sm text-slate-700">File Storage</span>
                <span className="inline-flex items-center rounded-full bg-amber-100 text-amber-800 text-xs font-semibold px-2.5 py-1">
                  {fileUsage}% Used
                </span>
              </div>
              <div className="h-2 bg-slate-100">
                <div
                  className="h-2 bg-amber-400"
                  style={{ width: `${fileUsage}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Update Management */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-6">
          <h3 className="text-slate-900 font-semibold">Update Management</h3>
          <p className="text-sm text-slate-600 mb-4">
            System updates and maintenance
          </p>

          <div className="space-y-3">
            <SettingTile
              title="Automatic Updates"
              subtitle="Enable automatic system updates"
              active={autoUpdates}
              onClick={() => setAutoUpdates((v) => !v)}
            />
            <SettingTile
              title="Maintenance Mode"
              subtitle="Enable maintenance mode for updates"
              active={maintenance}
              onClick={() => setMaintenance((v) => !v)}
            />
          </div>

          <Button
            variant="primary"
            size="lg"
            fullWidth
            className="mt-5"
            style={{
              backgroundColor: COLORS?.GREEN_PRIMARY || '#059669',
              borderColor: COLORS?.GREEN_PRIMARY || '#059669'
            }}
          >
            Check for Updates
          </Button>
        </div>
      </div>
    </div>
  );
}

/* ---------- Small components ---------- */

function HealthRow({ label, status, tone = "emerald" }) {
  const tones = {
    emerald: {
      pillBg: "bg-emerald-100",
      pillText: "text-emerald-800",
      border: "border-slate-200",
    },
  };

  const t = tones[tone];

  return (
    <div
      className={`rounded-xl border ${t.border} bg-white px-4 py-2.5 flex items-center justify-between`}
    >
      <span className="text-sm text-slate-700">{label}</span>
      <span
        className={`inline-flex items-center rounded-full ${t.pillBg} ${t.pillText} text-xs font-semibold px-2.5 py-1`}
      >
        {status}
      </span>
    </div>
  );
}

function SettingTile({ title, subtitle, active, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full text-left rounded-lg border px-4 py-3 transition
        ${active ? "bg-emerald-50 border-emerald-300" : "bg-white border-slate-200 hover:bg-slate-50"}`}
    >
      <p className={`font-medium ${active ? "text-emerald-700" : "text-slate-800"}`}>
        {title}
      </p>
      <p className="text-sm text-slate-500">{subtitle}</p>
    </button>
  );
}
