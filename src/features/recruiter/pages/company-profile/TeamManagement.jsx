import React, { useState } from "react";
import { LuUsers, LuUpload, LuEye, LuShield, LuPencil, LuTrash2, LuMail } from "react-icons/lu";
import { COLORS } from "@shared/WebConstant";
import EditTeamMemberModal from "./EditTeamMemberModal";

const TeamManagement = () => {
  const [inviteData, setInviteData] = useState({
    email: "brightorial@company.com",
    role: "Viewer"
  });

  const [teamMembers, setTeamMembers] = useState([
    {
      id: 1,
      name: "Aaruu",
      email: "aaruu@tech.com",
      role: "Admin",
      avatar: "A"
    },
    {
      id: 2,
      name: "Pooja",
      email: "pooja@tech.com",
      role: "Viewer",
      avatar: "P"
    },
    {
      id: 3,
      name: "Aaruu",
      email: "aaruu@tech.com",
      role: "Admin",
      avatar: "A"
    }
  ]);

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState(null);

  const roleOptions = [
    { value: "Admin", label: "Admin", icon: LuShield },
    { value: "Viewer", label: "Viewer", icon: LuEye }
  ];

  const handleInputChange = (field, value) => {
    setInviteData(prev => ({ ...prev, [field]: value }));
  };

  const handleSendInvitation = () => {
    if (!inviteData.email || !inviteData.role) {
      alert("Please fill in all fields");
      return;
    }

    // Create new team member
    const newMember = {
      id: Date.now(), // Simple ID generation
      name: inviteData.email.split('@')[0], // Extract name from email
      email: inviteData.email,
      role: inviteData.role,
      avatar: inviteData.email.charAt(0).toUpperCase() // First letter of email
    };

    // Add to team members list
    setTeamMembers(prev => [...prev, newMember]);

    // Show success message
    setShowSuccessMessage(true);
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 3000);

    // Reset form
    setInviteData({
      email: "brightorial@company.com",
      role: "Viewer"
    });

    console.log("Team member added:", newMember);
  };

  const handleEditMember = (memberId) => {
    const member = teamMembers.find(m => m.id === memberId);
    if (member) {
      setEditingMember(member);
      setIsEditModalOpen(true);
    }
  };

  const handleSaveEdit = (memberId, updatedData) => {
    setTeamMembers(prev => 
      prev.map(member => 
        member.id === memberId 
          ? { 
              ...member, 
              ...updatedData,
              avatar: updatedData.name.charAt(0).toUpperCase() // Update avatar based on new name
            }
          : member
      )
    );
    
    console.log("Team member updated:", updatedData);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setEditingMember(null);
  };

  const handleDeleteMember = (memberId) => {
    setTeamMembers(prev => prev.filter(member => member.id !== memberId));
  };

  const getRoleIcon = (role) => {
    const roleOption = roleOptions.find(option => option.value === role);
    return roleOption ? roleOption.icon : LuEye;
  };

  const getRoleColor = (role) => {
    switch (role) {
      case "Admin":
        return "bg-[var(--color-secondary)] text-white border-[var(--color-secondary)]";
      case "Viewer":
        return "bg-secondary-10 text-[var(--color-secondary)] border-[var(--color-secondary)]";
      default:
        return "bg-secondary-10 text-[var(--color-secondary)] border-[var(--color-secondary)]";
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Left Section - Invite Teammate */}
      <div className="bg-white rounded-2xl p-6" style={{ border: `1px solid ${COLORS.GRAY_200}` }}>
        {/* Header */}
        <div className="flex items-center gap-3 mb-2">
          <LuUpload style={{ color: COLORS.GREEN_PRIMARY }} size={20} />
          <h3 className="font-semibold text-lg" style={{ color: COLORS.PRIMARY }}>
            Invite Teammate
          </h3>
        </div>
        <p className="text-sm mb-6" style={{ color: COLORS.GRAY_600 }}>
          Add new team members to your account
        </p>

        {/* Form */}
        <div className="space-y-4">
          {/* Email Address */}
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-2" style={{ color: COLORS.PRIMARY }}>
              Email Address
            </label>
            <input
              type="email"
              value={inviteData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
              placeholder="Enter email address"
            />
          </div>

          {/* Role */}
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-2" style={{ color: COLORS.PRIMARY }}>
              Role
            </label>
            <div className="relative">
              <select
                value={inviteData.role}
                onChange={(e) => handleInputChange("role", e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 appearance-none bg-white"
              >
                {roleOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                {React.createElement(getRoleIcon(inviteData.role), { 
                  size: 16, 
                  style: { color: COLORS.GREEN_PRIMARY } 
                })}
              </div>
            </div>
          </div>

          {/* Success Message */}
          {showSuccessMessage && (
            <div className="mb-4 p-3 bg-green-100 border border-green-300 rounded-lg text-green-700 text-sm">
              ✅ Team member added successfully!
            </div>
          )}

          {/* Send Invitation Button */}
          <button
            onClick={handleSendInvitation}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-white font-medium transition-colors"
            style={{ backgroundColor: COLORS.GREEN_PRIMARY }}
            onMouseEnter={(e) => e.target.style.backgroundColor = COLORS.GREEN_DARK}
            onMouseLeave={(e) => e.target.style.backgroundColor = COLORS.GREEN_PRIMARY}
          >
            <LuMail size={16} />
            Send invitation
          </button>
        </div>
      </div>

      {/* Right Section - Team Members */}
      <div className="bg-white rounded-2xl p-6 flex flex-col" style={{ border: `1px solid ${COLORS.GRAY_200}`, height: '500px' }}>
        {/* Header */}
        <div className="flex items-center gap-3 mb-2 flex-shrink-0">
          <LuUsers style={{ color: COLORS.GREEN_PRIMARY }} size={20} />
          <h3 className="font-semibold text-lg" style={{ color: COLORS.PRIMARY }}>
            Team Members
          </h3>
        </div>
        <p className="text-sm mb-6 flex-shrink-0" style={{ color: COLORS.GRAY_600 }}>
          Manage your current team members and their roles
        </p>

        {/* Team Members List - Scrollable */}
        <div className="flex-1 overflow-y-auto pr-2 space-y-3">
          {teamMembers.map((member) => {
            const RoleIcon = getRoleIcon(member.role);
            return (
              <div key={member.id} className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
                  {/* Left side - Avatar and Info */}
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                      <span className="text-sm font-semibold text-gray-600">{member.avatar}</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{member.name}</h4>
                      <p className="text-sm text-gray-500">{member.email}</p>
                    </div>
                  </div>

                  {/* Right side - Role and Actions */}
                  <div className="flex items-center gap-3">
                    {/* Role Badge */}
                    <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${getRoleColor(member.role)}`}>
                      <RoleIcon size={12} />
                      <span>{member.role}</span>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleEditMember(member.id)}
                        className="p-2 text-[var(--color-secondary)] hover:bg-gray-100 rounded-lg transition-colors"
                        title="Edit member"
                      >
                        <LuPencil size={16} />
                      </button>
                      <button
                        onClick={() => handleDeleteMember(member.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete member"
                      >
                        <LuTrash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Edit Team Member Modal */}
      <EditTeamMemberModal
        isOpen={isEditModalOpen}
        onClose={handleCloseEditModal}
        member={editingMember}
        onSave={handleSaveEdit}
      />
    </div>
  );
};

export default TeamManagement;