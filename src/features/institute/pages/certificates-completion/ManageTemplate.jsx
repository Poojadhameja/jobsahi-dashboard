import React, { useEffect, useState } from "react";
import {
  LuUpload,
  LuFileText,
  LuDownload,
  LuFileImage,
  LuX,
} from "react-icons/lu";
import RichTextEditor from "../../../../shared/components/RichTextEditor";
import { TAILWIND_COLORS } from "../../../../shared/WebConstant";
import { getMethod, postMultipart } from "../../../../service/api";
import apiService from "../../services/serviceUrl";

function ManageTemplate() {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [creating, setCreating] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const [certificateInfo, setCertificateInfo] = useState({
    completionDate: "",
    description: "",
    instituteLogo: null,
    officialSeal: null,
  });

  const [dragActiveLogo, setDragActiveLogo] = useState(false);
  const [dragActiveSeal, setDragActiveSeal] = useState(false);

  // ✅ your backend API base (adjust if hosted differently)
  const BASE_URL =
    import.meta.env.VITE_API_URL ||
    "http://localhost/jobsahi/api"; // <- adjust if using /api only

  // 🧠 helper to fix relative URLs
  const getFullUrl = (path) => {
    if (!path) return null;
    if (path.startsWith("http")) return path; // already full
    if (path.startsWith("/")) return `${BASE_URL}${path}`; // attach base
    return `${BASE_URL}/${path}`;
  };

  // ---------------- FETCH EXISTING ----------------
  useEffect(() => {
    const loadTemplates = async () => {
      try {
        setLoading(true);
        const resp = await getMethod({
          apiUrl: apiService.certificateTemplatesList,
        });
        if (resp?.status && resp.data?.length) {
          // fix URLs for each template
          const fixed = resp.data.map((tpl) => ({
            ...tpl,
            logo_url: getFullUrl(tpl.logo_url),
            seal_url: getFullUrl(tpl.seal_url),
            background_image_url: getFullUrl(tpl.background_image_url),
          }));
          setTemplates(fixed);
        }
      } catch (err) {
        console.error("Error loading templates:", err);
      } finally {
        setLoading(false);
      }
    };
    loadTemplates();
  }, []);

  // ---------------- INPUT HANDLERS ----------------
  const handleInputChange = (field, value) => {
    setCertificateInfo((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (field, e) => {
    const file = e.target.files?.[0];
    if (file) setCertificateInfo((prev) => ({ ...prev, [field]: file }));
  };

  const handleDrag = (e, field) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      field === "instituteLogo" ? setDragActiveLogo(true) : setDragActiveSeal(true);
    } else if (e.type === "dragleave") {
      field === "instituteLogo" ? setDragActiveLogo(false) : setDragActiveSeal(false);
    }
  };

  const handleDrop = (e, field) => {
    e.preventDefault();
    e.stopPropagation();
    field === "instituteLogo" ? setDragActiveLogo(false) : setDragActiveSeal(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setCertificateInfo((prev) => ({
        ...prev,
        [field]: e.dataTransfer.files[0],
      }));
    }
  };

  const removeFile = (field) => {
    setCertificateInfo((prev) => ({ ...prev, [field]: null }));
  };

  // ---------------- CREATE TEMPLATE ----------------
  const handleUpdateTemplate = async () => {
    if (!certificateInfo.description || !certificateInfo.instituteLogo || !certificateInfo.officialSeal) {
      alert("Please fill all fields and upload both logo and seal before saving.");
      return;
    }

    try {
      setCreating(true);

      const form = new FormData();
      form.append("template_name", "Standard Certificate Template");
      form.append("header_text", "Certificate of Completion");

      const footer = (certificateInfo.description || "")
        .replace(/<[^>]+>/g, " ")
        .replace(/\s+/g, " ")
        .trim();

      form.append("footer_text", footer || "Powered by JobSahi");
      form.append("is_active", "1");
      form.append("admin_action", "approved");

      if (certificateInfo.instituteLogo)
        form.append("logo_url", certificateInfo.instituteLogo);
      if (certificateInfo.officialSeal)
        form.append("seal_url", certificateInfo.officialSeal);

      const resp = await postMultipart({
        apiUrl: apiService.createCertificateTemplate,
        formData: form,
      });

      if (resp?.status) {
        const newTemplate = {
          id: resp.template_id,
          template_name: "Standard Certificate Template",
          header_text: "Certificate of Completion",
          footer_text: footer || "Powered by JobSahi",
          logo_url: getFullUrl(resp.logo_url),
          seal_url: getFullUrl(resp.seal_url),
          created_at: new Date().toISOString(),
        };
        setTemplates([newTemplate, ...templates]);
        setShowPreview(true);
      } else {
        alert(resp?.message || "Failed to create template");
      }
    } catch (err) {
      console.error("Create template error", err);
      alert("Error creating template. Check console for details.");
    } finally {
      setCreating(false);
    }
  };

  // ---------------- UI ----------------
  return (
    <div className="space-y-6 p-6">
      {/* Certificate Info Section */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className={`text-xl font-semibold ${TAILWIND_COLORS.TEXT_PRIMARY} mb-1`}>
          Certificate Information
        </h2>

        {/* inputs (same UI) */}
        <div className="space-y-6 mt-6">
          {/* Date */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            <div className="lg:col-span-1">
              <label className={`block text-sm font-medium ${TAILWIND_COLORS.TEXT_PRIMARY}`}>
                DATE OF COMPLETION <span className="text-red-500">*</span>
              </label>
            </div>
            <div className="lg:col-span-3">
              <input
                type="date"
                value={certificateInfo.completionDate}
                onChange={(e) => handleInputChange("completionDate", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>

          {/* Description */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            <div className="lg:col-span-1">
              <label className={`block text-sm font-medium ${TAILWIND_COLORS.TEXT_PRIMARY}`}>
                DESCRIPTION <span className="text-red-500">*</span>
              </label>
            </div>
            <div className="lg:col-span-3">
              <RichTextEditor
                value={certificateInfo.description}
                onChange={(v) => handleInputChange("description", v)}
                placeholder="Enter course description"
                height="150px"
                className="border border-gray-300 rounded-md"
              />
            </div>
          </div>

          {/* Upload sections */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Logo */}
            <div>
              <label className={`block text-sm font-medium ${TAILWIND_COLORS.TEXT_PRIMARY}`}>
                INSTITUTE LOGO <span className="text-red-500">*</span>
              </label>
              <div
                className={`border-2 border-dashed rounded-lg p-6 text-center ${
                  dragActiveLogo ? "border-green-500 bg-green-50" : "border-gray-300 hover:border-green-400"
                }`}
                onDragEnter={(e) => handleDrag(e, "instituteLogo")}
                onDragLeave={(e) => handleDrag(e, "instituteLogo")}
                onDragOver={(e) => handleDrag(e, "instituteLogo")}
                onDrop={(e) => handleDrop(e, "instituteLogo")}
              >
                {certificateInfo.instituteLogo ? (
                  <div>
                    <LuFileImage className="w-10 h-10 text-green-600 mx-auto" />
                    <p className="text-sm">{certificateInfo.instituteLogo.name}</p>
                    <button onClick={() => removeFile("instituteLogo")} className="text-red-500">
                      <LuX className="w-5 h-5 mx-auto" />
                    </button>
                  </div>
                ) : (
                  <>
                    <LuUpload className="h-8 w-8 text-gray-400 mx-auto" />
                    <input
                      type="file"
                      id="logo-upload"
                      accept="image/png,image/jpeg"
                      onChange={(e) => handleFileUpload("instituteLogo", e)}
                      className="hidden"
                    />
                    <label
                      htmlFor="logo-upload"
                      className="inline-block bg-gray-100 hover:bg-gray-200 text-gray-600 px-3 py-1 rounded text-sm cursor-pointer"
                    >
                      Choose file
                    </label>
                  </>
                )}
              </div>
            </div>

            {/* Seal */}
            <div>
              <label className={`block text-sm font-medium ${TAILWIND_COLORS.TEXT_PRIMARY}`}>
                OFFICIAL SEAL <span className="text-red-500">*</span>
              </label>
              <div
                className={`border-2 border-dashed rounded-lg p-6 text-center ${
                  dragActiveSeal ? "border-green-500 bg-green-50" : "border-gray-300 hover:border-green-400"
                }`}
                onDragEnter={(e) => handleDrag(e, "officialSeal")}
                onDragLeave={(e) => handleDrag(e, "officialSeal")}
                onDragOver={(e) => handleDrag(e, "officialSeal")}
                onDrop={(e) => handleDrop(e, "officialSeal")}
              >
                {certificateInfo.officialSeal ? (
                  <div>
                    <LuFileImage className="w-10 h-10 text-green-600 mx-auto" />
                    <p className="text-sm">{certificateInfo.officialSeal.name}</p>
                    <button onClick={() => removeFile("officialSeal")} className="text-red-500">
                      <LuX className="w-5 h-5 mx-auto" />
                    </button>
                  </div>
                ) : (
                  <>
                    <LuUpload className="h-8 w-8 text-gray-400 mx-auto" />
                    <input
                      type="file"
                      id="seal-upload"
                      accept="image/png,image/jpeg"
                      onChange={(e) => handleFileUpload("officialSeal", e)}
                      className="hidden"
                    />
                    <label
                      htmlFor="seal-upload"
                      className="inline-block bg-gray-100 hover:bg-gray-200 text-gray-600 px-3 py-1 rounded text-sm cursor-pointer"
                    >
                      Choose file
                    </label>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Save */}
          <div className="flex justify-end">
            <button
              onClick={handleUpdateTemplate}
              disabled={creating}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
            >
              <LuFileText className="h-4 w-4" />
              <span>{creating ? "Saving..." : "Update Template"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* ✅ Show only after upload */}
      {showPreview && templates.length > 0 && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className={`text-xl font-semibold ${TAILWIND_COLORS.TEXT_PRIMARY} mb-1`}>
            Existing Template
          </h2>

          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 bg-gray-50 mt-6">
            <div className="max-w-3xl mx-auto bg-white border border-gray-200 rounded-lg p-8 shadow-sm">
              <div className="flex justify-between items-start mb-8">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <LuFileText className="h-6 w-6 text-blue-600" />
                </div>
                {templates[0]?.logo_url ? (
                  <img
                    src={templates[0].logo_url}
                    alt="logo"
                    className="w-16 h-12 object-contain rounded"
                  />
                ) : (
                  <div className="w-16 h-12 bg-gray-200 rounded" />
                )}
              </div>

              <div className="text-center mb-8">
                <h1
                  className={`text-2xl font-bold ${TAILWIND_COLORS.TEXT_PRIMARY} mb-4`}
                  style={{ fontFamily: "serif" }}
                >
                  {templates[0]?.header_text}
                </h1>
                <p className={`${TAILWIND_COLORS.TEXT_PRIMARY} leading-relaxed text-sm`}>
                  {templates[0]?.footer_text}
                </p>
              </div>

              <div className="border-b-2 border-dotted border-gray-300 mb-6" />

              <div className="flex justify-between items-end">
                <div className={`text-xs ${TAILWIND_COLORS.TEXT_MUTED}`}>
                  Date: {certificateInfo.completionDate || "—"}
                </div>
                <div className="text-center">
                  <div className={`text-sm font-bold ${TAILWIND_COLORS.TEXT_PRIMARY} mb-2`}>
                    {templates[0]?.template_name?.toUpperCase()}
                  </div>
                </div>
                {templates[0]?.seal_url ? (
                  <img
                    src={templates[0].seal_url}
                    alt="seal"
                    className="w-16 h-12 object-contain rounded"
                  />
                ) : (
                  <div className="w-16 h-12 bg-gray-200 rounded" />
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-6">
            <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
              <LuDownload className="h-4 w-4" />
              <span>Direct Download</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ManageTemplate;
