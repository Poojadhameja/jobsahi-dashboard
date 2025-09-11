import React, { useMemo, useState } from "react";
import { LuBell, LuChevronDown, LuSearch } from "react-icons/lu";
import { TAILWIND_COLORS, COLORS } from "../../../../shared/WebConstant.js";
import { 
  LaunchCampaignButton, 
  SaveDraftButton, 
  PreviewButton, 
  FilterButton, 
  NewCampaignButton, 
  ViewCampaignButton 
} from "../../../../shared/components/Button.jsx";

// Constants
const TABS = {
  CREATE: "create",
  MANAGE: "manage"
};

const CHANNELS = [
  { value: "", label: "Select Channel" },
  { value: "Email", label: "Email" },
  { value: "SMS", label: "SMS" },
  { value: "WhatsApp", label: "WhatsApp" }
];

const CAMPAIGN_STATUS = {
  ACTIVE: "Active",
  DRAFT: "Draft", 
  PAUSED: "Paused"
};

export default function EmailSmsCampaignsManager() {
  const [activeTab, setActiveTab] = useState(TABS.CREATE);
  const [isLaunching, setIsLaunching] = useState(false);
  const [form, setForm] = useState({
    name: "",
    channel: "",
    subject: "",
    content: "",
  });
  const [campaigns, setCampaigns] = useState([
    {
      id: 1,
      title: "Welcome Email Series",
      channel: "Email",
      recipients: "1,234",
      status: CAMPAIGN_STATUS.ACTIVE,
      iconColor: "text-blue-600",
      bgColor: "bg-blue-100"
    },
    {
      id: 2,
      title: "SMS Reminder Campaign",
      channel: "SMS",
      recipients: "856",
      status: CAMPAIGN_STATUS.DRAFT,
      iconColor: "text-green-600",
      bgColor: "bg-green-100"
    },
    {
      id: 3,
      title: "WhatsApp Promotion",
      channel: "WhatsApp",
      recipients: "2,100",
      status: CAMPAIGN_STATUS.PAUSED,
      iconColor: "text-purple-600",
      bgColor: "bg-purple-100"
    }
  ]);

  const canLaunch = useMemo(() => {
    return form.name.trim() && form.channel && form.subject.trim() && form.content.trim();
  }, [form]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  const handleLaunch = async () => {
    if (!canLaunch) {
      alert("Please fill all fields to launch the campaign.");
      return;
    }

    setIsLaunching(true);

    try {
      // Simulate API call (replace with actual API call)
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // TODO: Replace with actual API call
      // const response = await fetch('/api/campaigns', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(form)
      // });
      // const result = await response.json();

      // Create new campaign object
      const newCampaign = {
        id: Date.now(), // Simple ID generation
        title: form.name,
        channel: form.channel,
        recipients: Math.floor(Math.random() * 5000) + 100, // Random recipient count
        status: CAMPAIGN_STATUS.ACTIVE,
        iconColor: form.channel === 'Email' ? 'text-blue-600' : 
                   form.channel === 'SMS' ? 'text-green-600' : 'text-purple-600',
        bgColor: form.channel === 'Email' ? 'bg-blue-100' : 
                 form.channel === 'SMS' ? 'bg-green-100' : 'bg-purple-100'
      };

      // Add new campaign to the list
      setCampaigns(prev => [newCampaign, ...prev]);

      // Reset form after successful launch
      setForm({
        name: "",
        channel: "",
        subject: "",
        content: "",
      });

      // Show success message
      alert(`Campaign "${form.name}" launched successfully! 🚀`);
      
      // Switch to manage tab to see the new campaign
      setActiveTab(TABS.MANAGE);

    } catch (error) {
      console.error('Error launching campaign:', error);
      alert('Failed to launch campaign. Please try again.');
    } finally {
      setIsLaunching(false);
    }
  };

  const handleSaveDraft = () => {
    // TODO: save draft API
    alert("Draft saved 💾");
  };

  const handlePreview = () => {
    const preview = `
---- Preview -------------------------------------------------
Name: ${form.name}
Channel: ${form.channel}
Subject: ${form.subject}

${form.content}
-------------------------------------------------------------
`;
    alert(preview);
  };

  // Component: Header Section
  const HeaderSection = () => (
    <div className="mb-6 flex items-center gap-3">
      <span className={`grid h-9 w-9 place-items-center rounded-full ${TAILWIND_COLORS.BG_PRIMARY} ${TAILWIND_COLORS.TEXT_PRIMARY} ring-1 ring-[${COLORS.PRIMARY_50}]`}>
        <LuBell className="h-5 w-5" />
      </span>
      <div>
        <h1 className={`text-xl font-semibold ${TAILWIND_COLORS.TEXT_PRIMARY}`}>
          Email & SMS Campaign Manager
        </h1>
        <p className={`text-sm ${TAILWIND_COLORS.TEXT_MUTED}`}>
          Create and manage multi-channel marketing campaigns
        </p>
      </div>
    </div>
  );

  // Component: Tab Navigation
  const TabNavigation = () => (
    <div className="mb-6 grid grid-cols-2 gap-4 md:max-w-xl">
      <button
        type="button"
        onClick={() => setActiveTab(TABS.CREATE)}
        className={`h-10 rounded-lg border px-4 text-sm font-medium transition
        ${activeTab === TABS.CREATE
            ? `border-[${COLORS.PRIMARY}] bg-[${COLORS.PRIMARY_30}] ${TAILWIND_COLORS.TEXT_PRIMARY}`
            : `${TAILWIND_COLORS.BORDER} bg-white ${TAILWIND_COLORS.TEXT_MUTED} hover:bg-gray-50`
          }`}
      >
        Create Campaign
      </button>
      <button
        type="button"
        onClick={() => setActiveTab(TABS.MANAGE)}
        className={`h-10 rounded-lg border px-4 text-sm font-medium transition
        ${activeTab === TABS.MANAGE
            ? `border-[${COLORS.PRIMARY}] bg-[${COLORS.PRIMARY_30}] ${TAILWIND_COLORS.TEXT_PRIMARY}`
            : `${TAILWIND_COLORS.BORDER} bg-white ${TAILWIND_COLORS.TEXT_MUTED} hover:bg-gray-50`
          }`}
      >
        Manage Campaign
      </button>
    </div>
  );

  // Component: Search and Filter Bar
  const SearchFilterBar = () => (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div className="flex flex-1 items-center gap-3">
        <div className="relative flex-1 max-w-md">
          <LuSearch className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search campaigns..."
            className={`w-full rounded-lg ${TAILWIND_COLORS.BORDER} bg-white pl-10 pr-4 py-2 text-sm focus:border-[${COLORS.PRIMARY}] focus:outline-none focus:ring-2 focus:ring-[${COLORS.PRIMARY_30}]`}
          />
        </div>
        <FilterButton />
      </div>
      <NewCampaignButton onClick={() => setActiveTab(TABS.CREATE)} />
    </div>
  );

  // Component: Campaign Card
  const CampaignCard = ({ title, channel, recipients, status, iconColor, bgColor }) => (
    <div className={`${TAILWIND_COLORS.CARD} p-4`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`h-10 w-10 rounded-full ${bgColor} flex items-center justify-center`}>
            <LuBell className={`h-5 w-5 ${iconColor}`} />
          </div>
          <div>
            <h3 className="font-medium text-gray-900">{title}</h3>
            <p className="text-sm text-gray-500">{channel} • {recipients} recipients</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className={`rounded-full px-2 py-1 text-xs font-medium ${
            status === CAMPAIGN_STATUS.ACTIVE ? TAILWIND_COLORS.BADGE_SUCCESS :
            status === CAMPAIGN_STATUS.DRAFT ? TAILWIND_COLORS.BADGE_WARN :
            TAILWIND_COLORS.BADGE_ERROR
          }`}>
            {status}
          </span>
          <ViewCampaignButton />
        </div>
      </div>
    </div>
  );

  // Component: Campaign Management Section
  const CampaignManagementSection = () => (
    <div className="space-y-6">
      <SearchFilterBar />
      <div className="space-y-4">
        {campaigns.map((campaign) => (
          <CampaignCard 
            key={campaign.id}
            title={campaign.title}
            channel={campaign.channel}
            recipients={campaign.recipients.toLocaleString()}
            status={campaign.status}
            iconColor={campaign.iconColor}
            bgColor={campaign.bgColor}
          />
        ))}
      </div>
    </div>
  );

  // Component: Campaign Create Form
  const CampaignCreateForm = ({ form, onChange, canLaunch, onLaunch, onSaveDraft, onPreview }) => (
    <form
      className="space-y-6"
      onSubmit={(e) => {
        e.preventDefault();
        onLaunch();
      }}
    >
      {/* Row: Campaign Name + Channel */}
      <div className="grid gap-4 md:grid-cols-[1fr,280px]">
        <div>
          <label className={`mb-1 block text-sm font-medium ${TAILWIND_COLORS.TEXT_MUTED}`}>
            Campaign Name
          </label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={onChange}
            placeholder="Enter campaign name"
            className={`h-11 w-full rounded-lg ${TAILWIND_COLORS.BORDER} bg-white px-3 text-gray-900 placeholder:text-gray-400 focus:border-[${COLORS.PRIMARY}] focus:outline-none focus:ring-2 focus:ring-[${COLORS.PRIMARY_30}]`}
          />
        </div>

        <div>
          <label className={`mb-1 block text-sm font-medium ${TAILWIND_COLORS.TEXT_MUTED}`}>
            Channel
          </label>
          <div className="relative">
            <select
              name="channel"
              value={form.channel}
              onChange={onChange}
              className={`h-11 w-full appearance-none rounded-lg ${TAILWIND_COLORS.BORDER} bg-white px-3 pr-9 text-gray-900 focus:border-[${COLORS.PRIMARY}] focus:outline-none focus:ring-2 focus:ring-[${COLORS.PRIMARY_30}]`}
            >
              {CHANNELS.map((channel) => (
                <option key={channel.value} value={channel.value}>
                  {channel.label}
                </option>
              ))}
            </select>
            <LuChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
          </div>
        </div>
      </div>

      {/* Subject Line */}
      <div>
        <label className={`mb-1 block text-sm font-medium ${TAILWIND_COLORS.TEXT_MUTED}`}>
          Subject Line
        </label>
        <input
          type="text"
          name="subject"
          value={form.subject}
          onChange={onChange}
          placeholder="Enter email subject or SMS preview"
          className={`h-11 w-full rounded-lg ${TAILWIND_COLORS.BORDER} bg-[${COLORS.lightblue}] px-3 text-gray-900 placeholder:text-gray-400 focus:border-[${COLORS.PRIMARY}] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[${COLORS.PRIMARY_30}]`}
        />
      </div>

      {/* Campaign Content */}
      <div>
        <label className={`mb-1 block text-sm font-medium ${TAILWIND_COLORS.TEXT_MUTED}`}>
          Campaign Content
        </label>
        <textarea
          name="content"
          value={form.content}
          onChange={onChange}
          rows={4}
          placeholder="Enter your campaign message"
          className={`w-full rounded-lg ${TAILWIND_COLORS.BORDER} bg-[${COLORS.lightblue}] px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:border-[${COLORS.PRIMARY}] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[${COLORS.PRIMARY_30}]`}
        />
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-3 pt-2">
        <LaunchCampaignButton
          type="submit"
          disabled={!canLaunch}
          loading={isLaunching}
          onClick={onLaunch}
        />

        <SaveDraftButton
          type="button"
          onClick={onSaveDraft}
        />

        <PreviewButton
          type="button"
          onClick={onPreview}
        />
      </div>
    </form>
  );

  return (
    <div className={`min-h-screen ${TAILWIND_COLORS.BG_PRIMARY} p-6`}>
      <div className={`mx-auto w-full max-w-6xl ${TAILWIND_COLORS.CARD} p-6`}>
        <HeaderSection />
        <TabNavigation />

        {activeTab === TABS.MANAGE ? (
          <CampaignManagementSection />
        ) : (
          <CampaignCreateForm 
            form={form}
            onChange={onChange}
            canLaunch={canLaunch}
            onLaunch={handleLaunch}
            onSaveDraft={handleSaveDraft}
            onPreview={handlePreview}
          />
        )}
      </div>
    </div>
  );
}
