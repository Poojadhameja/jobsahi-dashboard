import React, { useState } from 'react';
import { LuKey, LuRefreshCw } from 'react-icons/lu';
import { TAILWIND_COLORS, COLORS } from '../../../../shared/WebConstant';
import Button, { BackToOverviewButton } from '../../../../shared/components/Button';

/* Small reusable toggle */
const ToggleSwitch = ({ checked, onChange }) => (
  <button
    onClick={() => onChange(!checked)}
    className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
      checked ? "" : "bg-slate-300"
    }`}
    style={{
      backgroundColor: checked ? COLORS?.GREEN_PRIMARY || '#059669' : undefined
    }}
    aria-pressed={checked}
    type="button"
  >
    <span
      className={`inline-block h-[14px] w-[14px] transform rounded-full bg-white shadow transition-transform ${
        checked ? "translate-x-4" : "translate-x-1"
      }`}
    />
  </button>
);

/* Status pill that can toggle active state */
const StatusPill = ({ active, onClick }) => (
  <button
    onClick={onClick}
    className={`px-3 py-1 rounded-full text-xs font-semibold border ${
      active
        ? "text-white border-emerald-600"
        : "bg-slate-100 text-slate-700 border-slate-200"
    }`}
    style={{
      backgroundColor: active ? COLORS?.GREEN_PRIMARY || '#059669' : undefined
    }}
    type="button"
  >
    {active ? "Active" : "Inactive"}
  </button>
);

export default function ApiKeyWebhookControl() {
  const [apiKey, setApiKey] = useState("************************");
  const [apiKeyActive, setApiKeyActive] = useState(true);
  const [lastUsed, setLastUsed] = useState("2 hours ago");

  const [webhookSecret, setWebhookSecret] = useState("********************");
  const [secretActive, setSecretActive] = useState(true);
  const [createdAt] = useState("Jan 15, 25");

  const [webhookUrl, setWebhookUrl] = useState(
    "https://jobsahiapp.com/webhooks"
  );

  const [events, setEvents] = useState({
    jobCreated: true,
    applicationReceived: true,
    userRegistered: false,
    paymentProcessed: true,
  });

  const [rateLimitEnabled, setRateLimitEnabled] = useState(true);
  const [ipWhitelistEnabled, setIpWhitelistEnabled] = useState(false);

  const regenerate = (len = 20) =>
    Array.from(crypto.getRandomValues(new Uint8Array(len)))
      .map((b) => "abcdefghijklmnopqrstuvwxyz0123456789"[b % 36])
      .join("");

  const handleRegenerateApi = () => {
    setApiKey("*".repeat(24));
    setLastUsed("just now");
  };

  const handleRegenerateSecret = () => {
    setWebhookSecret("*".repeat(20));
  };

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
              <LuKey className="h-4 w-4 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-slate-900">API Key & Webhook Control</h2>
              <p className="text-sm text-slate-600">Integration controls</p>
            </div>
          </div>

          {/* Back to overview (pill) */}
          <BackToOverviewButton
            onClick={() => window.history.back()}
          />
        </div>

        {/* Two columns */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* API Key Management */}
          <div className="bg-white border border-slate-200 rounded-xl p-5">
            <h3 className="text-slate-900 font-semibold">API Key Management</h3>
            <p className="text-sm text-slate-600 mb-4">
              Manage API keys for third-party integrations
            </p>

            {/* Application Name (masked key) */}
            <div className="rounded-xl border border-slate-200 bg-white p-3 mb-4">
              <div className="flex items-center gap-3">
                <div className="flex-1">
                  <label className="block text-sm text-gray-700 mb-1">
                    Application Name
                  </label>
                  <input
                    value={apiKey}
                    disabled
                    className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-gray-700"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Last used : {lastUsed}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <StatusPill
                    active={apiKeyActive}
                    onClick={() => setApiKeyActive((v) => !v)}
                  />
                  <Button
                    onClick={handleRegenerateApi}
                    variant="outline"
                    size="sm"
                    className="px-3 py-1.5"
                    style={{
                      borderColor: COLORS?.GREEN_PRIMARY || '#059669',
                      color: COLORS?.GREEN_PRIMARY || '#059669'
                    }}
                    icon={<LuRefreshCw className="h-4 w-4" />}
                    title="Regenerate"
                  >
                    Regenerate
                  </Button>
                </div>
              </div>
            </div>

            {/* Webhook Secret */}
            <div className="rounded-xl border border-slate-200 bg-white p-3">
              <div className="flex items-center gap-3">
                <div className="flex-1">
                  <label className="block text-sm text-gray-700 mb-1">
                    Webhook Secret
                  </label>
                  <input
                    value={webhookSecret}
                    disabled
                    className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-gray-700"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Created: {createdAt}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <StatusPill
                    active={secretActive}
                    onClick={() => setSecretActive((v) => !v)}
                  />
                  <Button
                    onClick={handleRegenerateSecret}
                    variant="outline"
                    size="sm"
                    className="px-3 py-1.5"
                    style={{
                      borderColor: COLORS?.GREEN_PRIMARY || '#059669',
                      color: COLORS?.GREEN_PRIMARY || '#059669'
                    }}
                    icon={<LuRefreshCw className="h-4 w-4" />}
                    title="Regenerate"
                  >
                    Regenerate
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Webhook Configuration */}
          <div className="bg-white border border-slate-200 rounded-xl p-5">
            <h3 className="text-slate-900 font-semibold">
              Webhook Configuration
            </h3>
            <p className="text-sm text-slate-600 mb-4">
              Configure webhook endpoints
            </p>

            <div className="mb-4">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Webhook URL
              </label>
              <input
                value={webhookUrl}
                onChange={(e) => setWebhookUrl(e.target.value)}
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-200"
                placeholder="https://example.com/webhooks"
              />
            </div>

            <p className="text-sm font-medium text-slate-700 mb-2">Events to Subscribe</p>
            <div className="space-y-2">
              {[
                ["Job created", "jobCreated"],
                ["Application Received", "applicationReceived"],
                ["User Registered", "userRegistered"],
                ["Payment Processed", "paymentProcessed"],
              ].map(([label, key]) => (
                <div
                  key={key}
                  className="flex items-center justify-between rounded-lg border border-slate-200 bg-white px-3 py-2"
                >
                  <span className="text-sm text-gray-700">{label}</span>
                  <ToggleSwitch
                    checked={events[key]}
                    onChange={(v) =>
                      setEvents((prev) => ({ ...prev, [key]: v }))
                    }
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Security Settings */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-6">
        <h3 className="text-slate-900 font-semibold">Security Settings</h3>
        <p className="text-sm text-slate-600 mb-4">
          Configure API security and access controls
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Rate Limiting tile */}
          <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-700">Rate Limiting</p>
              <p className="text-xs text-slate-500">1000 requests/hour</p>
            </div>
            <ToggleSwitch
              checked={rateLimitEnabled}
              onChange={setRateLimitEnabled}
            />
          </div>

          {/* IP Whitelisting tile */}
          <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-700">IP Whitelisting</p>
              <p className="text-xs text-slate-500">Restrict by IP address</p>
            </div>
            <ToggleSwitch
              checked={ipWhitelistEnabled}
              onChange={setIpWhitelistEnabled}
            />
          </div>
        </div>

        {/* Allowed origins list */}
        <div className="mt-5">
          <p className="text-sm font-medium text-slate-700 mb-2">Allowed origins</p>
          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <p className="text-sm text-slate-600">https://yourdomain.com</p>
            <p className="text-sm text-slate-600">https://app.yourdomain.com</p>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <BackToOverviewButton
            onClick={() => window.history.back()}
          />
        </div>
      </div>
    </div>
  );
}
