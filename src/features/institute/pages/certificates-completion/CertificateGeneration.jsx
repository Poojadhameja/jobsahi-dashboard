import React, { useState, useEffect } from "react";
import {
  LuFileText,
  LuUser,
  LuPhone,
  LuMail,
  LuDownload,
  LuGraduationCap,
  LuAward,
  LuUpload,
} from "react-icons/lu";
import Swal from "sweetalert2";
import { TAILWIND_COLORS } from "../../../../shared/WebConstant";
import { getMethod, postMultipart } from "../../../../service/api";
import apiService from "../../services/serviceUrl.js";

// Default values for template form
const DEFAULT_TEMPLATE_NAME = "";
const DEFAULT_CERTIFICATE_DESCRIPTION = "";

function CertificateGeneration() {
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [batches, setBatches] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedBatch, setSelectedBatch] = useState("");
  const [completionDate, setCompletionDate] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedCertificates, setGeneratedCertificates] = useState([]);
  const [templateName, setTemplateName] = useState("");
  const [templates, setTemplates] = useState([]);
  const [selectedTemplateId, setSelectedTemplateId] = useState("");
  const [logoFile, setLogoFile] = useState(null);
  const [sealFile, setSealFile] = useState(null);
  const [signatureFile, setSignatureFile] = useState(null);
  const [logoPreview, setLogoPreview] = useState("");
  const [sealPreview, setSealPreview] = useState("");
  const [signaturePreview, setSignaturePreview] = useState("");
  // Store last template URLs for reuse
  const [lastTemplateLogoUrl, setLastTemplateLogoUrl] = useState("");
  const [lastTemplateSealUrl, setLastTemplateSealUrl] = useState("");
  const [lastTemplateSignatureUrl, setLastTemplateSignatureUrl] = useState("");
  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);
  const [isCreatingTemplate, setIsCreatingTemplate] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    return () => {
      [logoPreview, sealPreview, signaturePreview].forEach((url) => {
        if (url) URL.revokeObjectURL(url);
      });
    };
  }, [logoPreview, sealPreview, signaturePreview]);
  const [description, setDescription] = useState("");

  // ✅ Fetch all nested data once
  useEffect(() => {
    const fetchData = async () => {
      try {
        const nestedRes = await getMethod({
          apiUrl: apiService.CourseBatchStudents, // ✅ fixed key name
        });
        console.log("📘 Nested data:", nestedRes);

        if (nestedRes?.status && Array.isArray(nestedRes.data)) {
          const formattedCourses = nestedRes.data.map((course) => ({
            id: course.course_id,
            title: course.course_name,
            batches: course.batches || [],
          }));
          setCourses(formattedCourses);
        } else {
          console.warn("⚠️ Invalid nested response:", nestedRes);
          setCourses([]);
        }
      } catch (err) {
        console.error("❌ Error fetching nested data:", err);
        setCourses([]);
      }
    };
    fetchData();
  }, []);

 useEffect(() => {
  const fetchTemplateDefaults = async () => {
    try {
      const resp = await getMethod({
        apiUrl: apiService.certificateTemplatesList, // Fixed: use correct endpoint
      });
  
      console.log("📋 Templates fetch response:", resp);
  
      if (resp?.status && Array.isArray(resp.data)) {
        setTemplates(resp.data);
        console.log("✅ Templates loaded:", resp.data.length);
  
        // Don't auto-select first template - let user choose
        // Reset to default "Choose a template"
        setSelectedTemplateId("");
        setTemplateName("");
        setDescription("");
        setLogoPreview("");
        setSealPreview("");
        setSignaturePreview("");
      } else {
        console.warn("⚠️ Templates response format issue:", resp);
        setTemplates([]);
        setSelectedTemplateId("");
      }
    } catch (error) {
      console.error("❌ Error fetching templates:", error);
      setTemplates([]);
    }
  };
  
  fetchTemplateDefaults();
}, []);
   // ✅ Select course
  const onCourseChange = (e) => {
    const cid = e.target.value;
    setSelectedCourse(cid);
    setSelectedBatch("");
    setStudents([]);
    setSelectedStudents([]);

    const selected = courses.find((c) => String(c.id) === cid);
    setBatches(selected?.batches || []);
  };

  // ✅ Select batch
  const onBatchChange = (e) => {
    const bid = e.target.value;
    setSelectedBatch(bid);

    const course = courses.find(
      (c) => String(c.id) === String(selectedCourse)
    );
    const batchObj = course?.batches?.find(
      (b) => String(b.batch_id) === String(bid)
    );

    let mappedStudents = (batchObj?.students || []).map((s) => ({
      id: s.student_id,
      name: s.name,
      email: s.email,
      phone: s.phone_number,
      enrollmentId: s.student_id,
    }));

    // ✅ Remove duplicates (sometimes API sends same student twice)
    mappedStudents = mappedStudents.filter(
      (v, i, a) => a.findIndex((t) => t.id === v.id) === i
    );

    setStudents(mappedStudents);
    // Auto-select all students when batch is selected
    setSelectedStudents(mappedStudents.map(s => s.id));
  };

  // ✅ Select template
 const onTemplateChange = (e) => {
  const id = e.target.value;
  setSelectedTemplateId(id);

  const t = templates.find(x => String(x.id) === String(id));
  if (!t) return;

  setTemplateName(t.template_name);
  setDescription(t.description);

  setLogoPreview(t.logo || "");
  setSealPreview(t.seal || "");
  setSignaturePreview(t.signature || "");
};



  const handleAssetSelect = (setFile, setPreview, setLastTemplateUrl = null) => (event) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      Swal.fire({
        icon: 'warning',
        title: 'Invalid File Type',
        text: 'Please select a valid image file (PNG, JPG, SVG, or WebP).',
        confirmButtonColor: '#5C9A24'
      })
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      Swal.fire({
        icon: 'warning',
        title: 'File Too Large',
        text: 'File size must be less than 5MB.',
        confirmButtonColor: '#5C9A24'
      })
      return;
    }

    // Clear last template URL when user selects new file
    if (setLastTemplateUrl) {
      setLastTemplateUrl("");
    }

    setFile(file);
    setPreview((prevUrl) => {
      // Only revoke if it's a blob URL (from previous file upload)
      if (prevUrl && prevUrl.startsWith('blob:')) {
        URL.revokeObjectURL(prevUrl);
      }
      return URL.createObjectURL(file);
    });
  };

  const handleAssetRemove = (setFile, setPreview, setLastTemplateUrl = null) => () => {
    setFile(null);
    setPreview((prevUrl) => {
      // Only revoke if it's a blob URL (from file upload)
      if (prevUrl && prevUrl.startsWith('blob:')) {
        URL.revokeObjectURL(prevUrl);
      }
      return "";
    });
    // Clear last template URL when user removes
    if (setLastTemplateUrl) {
      setLastTemplateUrl("");
    }
  };

  // ✅ Generate certificates
  const handleGenerateCertificate = async () => {
    console.log("🚀 Starting certificate generation...");
    console.log("📋 Current state:", {
      selectedCourse,
      selectedBatch,
      completionDate,
      selectedStudents,
      templateName,
      selectedTemplateId
    });

    if (!selectedCourse || !selectedBatch || !completionDate) {
      Swal.fire({
        icon: 'warning',
        title: 'Validation Error',
        text: 'Please fill in all required fields (Course, Batch, Date)',
        confirmButtonColor: '#5C9A24'
      })
      return;
    }

    if (selectedStudents.length === 0) {
      Swal.fire({
        icon: 'warning',
        title: 'No Students Selected',
        text: 'Please select at least one student!',
        confirmButtonColor: '#5C9A24'
      })
      return;
    }

    // Check if templateName is set, if not try to get it from selected template
    let finalTemplateName = templateName.trim();
    if (!finalTemplateName && selectedTemplateId) {
      const selectedTemplate = templates.find(t => String(t.id) === String(selectedTemplateId) || String(t.template_id) === String(selectedTemplateId));
      if (selectedTemplate) {
        finalTemplateName = selectedTemplate.template_name || "";
        console.log("📝 Template name not set, using from selected template:", finalTemplateName);
        setTemplateName(finalTemplateName);
      }
    }

    if (!finalTemplateName) {
      console.error("❌ Template name is missing!");
      Swal.fire({
        icon: 'warning',
        title: 'Validation Error',
        text: 'Please select a template or provide a template name.',
        confirmButtonColor: '#5C9A24'
      })
      return;
    }

    setIsGenerating(true);
    try {
      const results = [];

      for (const studentId of selectedStudents) {
        const formData = new FormData();

        formData.append("student_id", parseInt(studentId, 10));
        formData.append("course_id", parseInt(selectedCourse, 10));
        formData.append("batch_id", parseInt(selectedBatch, 10));
        formData.append("issue_date", completionDate);
        formData.append("template_name", finalTemplateName);
        formData.append("description", description || "");

        if (logoFile) formData.append("logo", logoFile);
        if (sealFile) formData.append("seal", sealFile);
        if (signatureFile) formData.append("signature", signatureFile);

        console.log("📤 Generating certificate for student:", studentId);
        console.log("📤 Template name:", finalTemplateName);
        console.log("📤 FormData keys:", Array.from(formData.keys()));
        console.log("📤 FormData values:", {
          student_id: parseInt(studentId, 10),
          course_id: parseInt(selectedCourse, 10),
          batch_id: parseInt(selectedBatch, 10),
          issue_date: completionDate,
          template_name: finalTemplateName,
          description: description || "",
          hasLogo: !!logoFile,
          hasSeal: !!sealFile,
          hasSignature: !!signatureFile
        });

        try {
          const res = await postMultipart({
            apiUrl: apiService.generateCertificate,
            data: formData, // ✅ Correct parameter name
          });

          console.log("📩 Full API Response:", JSON.stringify(res, null, 2));
          console.log("📩 Response status:", res?.status);
          console.log("📩 Response message:", res?.message);
          console.log("📩 Response data:", res?.data);

          if (res?.status === true || res?.status === "success" || res?.success === true) {
            console.log("✅ Certificate generated successfully for student:", studentId);
            results.push(res.data || res);
          } else {
            console.error(`❌ Certificate generation failed for student ${studentId}:`, {
              status: res?.status,
              message: res?.message,
              data: res?.data,
              fullResponse: res
            });
            // Still show the error message to user
            Swal.fire({
              icon: 'error',
              title: 'Generation Failed',
              text: res?.message || `Failed to generate certificate for student ID: ${studentId}`,
              confirmButtonColor: '#5C9A24'
            });
          }
        } catch (apiError) {
          console.error(`❌ API Error for student ${studentId}:`, apiError);
          Swal.fire({
            icon: 'error',
            title: 'API Error',
            text: apiError?.message || `Error generating certificate for student ID: ${studentId}`,
            confirmButtonColor: '#5C9A24'
          });
        }
      }

      if (results.length > 0) {
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: `${results.length} certificates generated successfully!`,
          confirmButtonColor: '#5C9A24'
        })
        setGeneratedCertificates(results);
      } else {
        Swal.fire({
          icon: 'info',
          title: 'No Certificates Generated',
          text: 'No new certificates were generated.',
          confirmButtonColor: '#5C9A24'
        })
      }
    } catch (err) {
      console.error("❌ Certificate generation failed:", err);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'An unexpected error occurred. Check console logs.',
        confirmButtonColor: '#5C9A24'
      })
    } finally {
      setIsGenerating(false);
    }
  };

  // ✅ Download certificate
  const handleDownloadCertificate = async (certificateId) => {
    try {
      const res = await getMethod({
        apiUrl: `${apiService.getCertificateById}?id=${certificateId}`,
      });

      if (res?.status && res?.data?.certificate_info?.file_url) {
        window.open(res.data.certificate_info.file_url, "_blank");
      } else {
        Swal.fire({
          icon: 'error',
          title: 'File Not Found',
          text: 'Certificate file not found or not available!',
          confirmButtonColor: '#5C9A24'
        })
      }
    } catch (err) {
      console.error("❌ Error fetching certificate details:", err);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to download certificate',
        confirmButtonColor: '#5C9A24'
      })
    }
  };

  // ✅ Create template
  const handleCreateTemplate = async () => {
  console.log("🔍 Template name value:", templateName);
  console.log("🔍 Template name trimmed:", templateName.trim());
  console.log("🔍 Template name length:", templateName.trim().length);
  
  if (!templateName.trim()) {
    console.log("❌ Template name validation failed - empty or whitespace");
    Swal.fire({
      icon: 'warning',
      title: 'Validation Error',
      text: 'Please provide a template name.',
      confirmButtonColor: '#5C9A24'
    });
    return;
  }
  if (!description.trim()) {
    Swal.fire({
      icon: 'warning',
      title: 'Validation Error',
      text: 'Please provide a description.',
      confirmButtonColor: '#5C9A24'
    });
    return;
  }
  
  // Check if files are uploaded OR last template URLs are available
  const hasLogo = logoFile || lastTemplateLogoUrl;
  const hasSeal = sealFile || lastTemplateSealUrl;
  const hasSignature = signatureFile || lastTemplateSignatureUrl;
  
  if (!hasLogo || !hasSeal || !hasSignature) {
    return Swal.fire({
      icon: 'warning',
      title: 'Assets Required',
      text: 'Please upload logo, seal, and signature, or they will be reused from last template.',
      confirmButtonColor: '#5C9A24'
    });
  }

  setIsCreatingTemplate(true);

  try {
    // First, refresh templates list to get latest data
    console.log("📋 Current templates before create:", templates);
    console.log("📝 Template name to create:", templateName.trim());
    
    const refreshResp = await getMethod({
      apiUrl: apiService.certificateTemplatesList,
    });

    let latestTemplates = templates;
    if (refreshResp?.status && Array.isArray(refreshResp.data)) {
      latestTemplates = refreshResp.data;
      setTemplates(latestTemplates);
      console.log("✅ Refreshed templates:", latestTemplates.length);
    }

    // Check if template name already exists in latest templates list
    const existingTemplate = latestTemplates.find(
      (t) => {
        const existingName = (t.template_name || "").toLowerCase().trim();
        const newName = templateName.toLowerCase().trim();
        return existingName === newName && existingName !== "";
      }
    );

    if (existingTemplate) {
      setIsCreatingTemplate(false);
      console.log("⚠️ Template already exists:", existingTemplate);
      return Swal.fire({
        title: "Template Exists",
        text: `Template "${templateName}" already exists. Please use a different name.`,
        icon: "warning"
      });
    }

    console.log("✅ No duplicate found, proceeding with create...");

    const formData = new FormData();

    formData.append("template_name", templateName.trim());
    formData.append("description", description.trim());
    formData.append("is_active", "1");
    formData.append("admin_action", "approved");

    // Append files if user uploaded new ones, otherwise use last template URLs
    if (logoFile) {
      formData.append("logo", logoFile);
    } else if (lastTemplateLogoUrl) {
      formData.append("logo_url", lastTemplateLogoUrl);
    }

    if (sealFile) {
      formData.append("seal", sealFile);
    } else if (lastTemplateSealUrl) {
      formData.append("seal_url", lastTemplateSealUrl);
    }

    if (signatureFile) {
      formData.append("signature", signatureFile);
    } else if (lastTemplateSignatureUrl) {
      formData.append("signature_url", lastTemplateSignatureUrl);
    }

    console.log("📤 Creating template with name:", templateName.trim());
    console.log("📤 FormData keys:", Array.from(formData.keys()));
    
    const res = await postMultipart({
      apiUrl: apiService.createCertificateTemplate,
      data: formData, // Fixed: use 'data' instead of 'formData'
    });

    console.log("📥 Create template response:", res);
    console.log("📥 Response status:", res?.status);
    console.log("📥 Response message:", res?.message);
    console.log("📥 Full response:", JSON.stringify(res, null, 2));

    if (res?.status) {
      Swal.fire("Success", "Template created successfully", "success");

      // 🔥 Refresh template list
      const resp = await getMethod({
        apiUrl: apiService.certificateTemplatesList,
      });

      if (resp?.status) {
        setTemplates(resp.data);
        // Select the newly created template
        const newTemplate = resp.data.find(
          (t) => t.template_name?.toLowerCase().trim() === templateName.toLowerCase().trim()
        );
        if (newTemplate) {
          setSelectedTemplateId(newTemplate.id || newTemplate.template_id);
        }
      }

      // Don't close modal, show preview instead
      setShowPreview(true);
      // Keep template data for preview (don't reset)
    } else {
      // If backend says "already exists" but template not in our list, refresh and check
      const errorMessage = res?.message || res?.data?.message || "";
      console.log("❌ Error message:", errorMessage);
      
      if (errorMessage.toLowerCase().includes("already exists") || 
          // errorMessage.toLowerCase().includes("already exist") ||
          errorMessage.toLowerCase().includes("duplicate")) {
        
        console.log("🔄 Refreshing templates list to verify...");
        
        // Refresh templates list to verify
        const resp = await getMethod({
          apiUrl: apiService.certificateTemplatesList,
        });

        console.log("📋 Refreshed templates response:", resp);

        if (resp?.status && Array.isArray(resp.data)) {
          setTemplates(resp.data);
          
          // Check again after refresh - check all possible name fields
          const existsAfterRefresh = resp.data.find(
            (t) => {
              const existingName = (t.template_name || t.name || "").toLowerCase().trim();
              const newName = templateName.toLowerCase().trim();
              return existingName === newName && existingName !== "";
            }
          );

          console.log("🔍 Template exists after refresh?", !!existsAfterRefresh);
          if (existsAfterRefresh) {
            console.log("✅ Found existing template:", existsAfterRefresh);
            Swal.fire({
              title: "Template Exists",
              text: `Template "${templateName}" already exists in the system.`,
              icon: "warning"
            });
          } else {
            // Template doesn't exist, might be backend issue - show detailed error
            console.error("⚠️ Backend says exists but not found in list. Backend might have case-sensitive check or other validation.");
            Swal.fire({
              title: "Validation Error",
              text: `Backend validation failed: ${errorMessage}. Please check if a similar template name exists (case-sensitive) or try a different name.`,
              icon: "error"
            });
          }
        } else {
          console.error("❌ Failed to refresh templates:", resp);
          Swal.fire("Failed", errorMessage || "Could not verify template existence", "error");
        }
      } else {
        Swal.fire("Failed", errorMessage || "Template creation failed", "error");
      }
    }
  } catch (err) {
    console.error("Create template error:", err);
    Swal.fire("Error", err?.message || "Something went wrong", "error");
  } finally {
    setIsCreatingTemplate(false);
  }
};

  

  const assetInputs = [
    {
      key: "logo",
      label: "Institute Logo",
      helper: "PNG / JPG / WebP up to 5MB",
      file: logoFile,
      preview: logoPreview,
      setFile: setLogoFile,
      setPreview: setLogoPreview,
      setLastTemplateUrl: setLastTemplateLogoUrl,
      inputId: "template-logo-upload",
    },
    {
      key: "seal",
      label: "Official Seal",
      helper: "PNG / JPG / WebP up to 5MB",
      file: sealFile,
      preview: sealPreview,
      setFile: setSealFile,
      setPreview: setSealPreview,
      setLastTemplateUrl: setLastTemplateSealUrl,
      inputId: "template-seal-upload",
    },
    {
      key: "signature",
      label: "Authorized Signature",
      helper: "PNG / JPG / WebP up to 5MB",
      file: signatureFile,
      preview: signaturePreview,
      setFile: setSignatureFile,
      setPreview: setSignaturePreview,
      setLastTemplateUrl: setLastTemplateSignatureUrl,
      inputId: "template-signature-upload",
    },
  ];

  const renderCertificateFormSections = ({
    actionLabel = "Generate Certificate",
    includeCreateButton = false,
  } = {}) => {
    const buttonText = isGenerating ? "Generating..." : actionLabel;

    return (
      <>
        <div className="mb-10">
          <div className="mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {includeCreateButton ? (
                <div>
                  <label className="block text-sm font-medium mb-2">SELECT TEMPLATE</label>
                  <select
                    value={selectedTemplateId}
                    onChange={onTemplateChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="">Choose a template</option>
                    {templates.map((template) => (
                      <option 
                        key={template.template_id || template.id} 
                        value={template.template_id || template.id}
                      >
                        {template.template_name || ""}
                      </option>
                    ))}
                  </select>
                </div>
              ) : (
                <div>
                  <label className="block text-sm font-medium mb-2">TEMPLATE NAME</label>
                  <input
                    type="text"
                    value={templateName || ""}
                    onChange={(e) => {
                      console.log("📝 Template name input changed:", e.target.value);
                      setTemplateName(e.target.value);
                    }}
                    placeholder="Enter template name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  {templateName && (
                    <p className="text-xs text-gray-500 mt-1">Current value: "{templateName}"</p>
                  )}
                </div>
              )}
            </div>

            {!includeCreateButton && (
              <div>
                <label className="block text-sm font-medium mb-2">DESCRIPTION</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={5}
                  placeholder="Enter description"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 resize-y min-h-[120px]"
                />
                <p className={`text-xs ${TAILWIND_COLORS.TEXT_MUTED} mt-1`}>
                  {description.length} characters
                </p>
              </div>
            )}
          </div>

          {!includeCreateButton && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {assetInputs.map(
                  ({ key, label, helper, file, preview, setFile, setPreview, setLastTemplateUrl, inputId }) => (
                    <div key={key} className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium mb-2 uppercase">
                          {label}
                        </label>
                      </div>
                      <div className="rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-6 text-center">
                        <input
                          type="file"
                          id={inputId}
                          accept="image/png,image/jpeg,image/webp,image/svg+xml"
                          onChange={handleAssetSelect(setFile, setPreview, setLastTemplateUrl)}
                          className="hidden"
                        />
                        {preview ? (
                          <div className="space-y-3">
                            <div className="h-32 w-full bg-white border border-gray-200 rounded-lg flex items-center justify-center overflow-hidden">
                              <img
                                src={preview}
                                alt={`${label} preview`}
                                className="object-contain h-full w-full"
                              />
                            </div>
                            <p className={`text-sm ${TAILWIND_COLORS.TEXT_PRIMARY} truncate`}>
                              {file?.name || (preview.includes('http') || preview.includes('/uploads') ? 'From last template' : 'Preview')}
                            </p>
                            <div className="flex items-center justify-center gap-4 text-sm">
                              <label
                                htmlFor={inputId}
                                className={`${TAILWIND_COLORS.TEXT_SUCCESS} hover:underline cursor-pointer`}
                              >
                                {file ? 'Change' : 'Upload New'}
                              </label>
                              <button
                                type="button"
                                onClick={handleAssetRemove(setFile, setPreview, setLastTemplateUrl)}
                                className="text-red-500 hover:underline"
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="space-y-3">
                            <LuUpload className={`h-8 w-8 ${TAILWIND_COLORS.TEXT_MUTED} mx-auto`} />
                            <p className={`text-sm ${TAILWIND_COLORS.TEXT_MUTED}`}>
                              Click browse to upload an image
                            </p>
                            <label
                              htmlFor={inputId}
                              className={`inline-block bg-gray-100 hover:bg-gray-200 ${TAILWIND_COLORS.TEXT_PRIMARY} px-3 py-1 rounded text-sm cursor-pointer`}
                            >
                              Browse Files
                            </label>
                            <p className={`text-xs ${TAILWIND_COLORS.TEXT_MUTED}`}>{helper}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  )
                )}
              </div>
              
              <div className="flex justify-center mt-6">
                <button
                  onClick={handleCreateTemplate}
                  disabled={
                    isCreatingTemplate || 
                    !templateName.trim() || 
                    !description.trim() || 
                    (!logoFile && !lastTemplateLogoUrl) || 
                    (!sealFile && !lastTemplateSealUrl) || 
                    (!signatureFile && !lastTemplateSignatureUrl)
                  }
                  className={`px-6 py-3 rounded-lg flex items-center space-x-2 ${TAILWIND_COLORS.TEXT_INVERSE} ${
                    isCreatingTemplate || 
                    !templateName.trim() || 
                    !description.trim() || 
                    (!logoFile && !lastTemplateLogoUrl) || 
                    (!sealFile && !lastTemplateSealUrl) || 
                    (!signatureFile && !lastTemplateSignatureUrl)
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-green-600 hover:bg-green-700"
                  }`}
                >
                  <LuFileText className="h-5 w-5" />
                  <span>{isCreatingTemplate ? "Creating..." : "Create "}</span>
                </button>
              </div>
            </>
          )}
        </div>

        {includeCreateButton && (
          <>
            <div className="mb-8">
              <h4 className={`text-md font-medium ${TAILWIND_COLORS.TEXT_PRIMARY} mb-4`}>
                Basic Information
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">SELECT COURSE</label>
                  <select
                    value={selectedCourse}
                    onChange={onCourseChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="">Choose a course</option>
                    {courses.map((course) => (
                      <option key={course.id} value={course.id}>
                        {course.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">SELECT BATCH</label>
                  <select
                    value={selectedBatch}
                    onChange={onBatchChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="">Choose a batch</option>
                    {batches.map((batch) => (
                      <option key={batch.batch_id} value={batch.batch_id}>
                        {batch.batch_name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">COMPLETION DATE</label>
                  <input
                    type="date"
                    value={completionDate}
                    onChange={(e) => setCompletionDate(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h4 className="text-md font-medium mb-4">Student in Batch</h4>
              <div className="space-y-3">
                {students.map((student) => {
                  const isSelected = selectedStudents.includes(student.id);
                  return (
                    <div
                      key={`${student.id}-${student.email || student.phone}`}
                      className="flex items-center p-4 bg-gray-50 rounded-lg border border-gray-200"
                    >
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedStudents([...selectedStudents, student.id]);
                          } else {
                            setSelectedStudents(selectedStudents.filter(id => id !== student.id));
                          }
                        }}
                        className="w-5 h-5 text-green-600 border-gray-300 rounded focus:ring-green-500 mr-4 cursor-pointer"
                      />
                      <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center mr-4">
                        <LuUser className={`h-6 w-6 ${TAILWIND_COLORS.TEXT_PRIMARY}`} />
                      </div>
                      <div className="flex-1">
                        <h5 className={`font-medium ${TAILWIND_COLORS.TEXT_PRIMARY}`}>{student.name}</h5>
                        <p className={`text-sm ${TAILWIND_COLORS.TEXT_MUTED}`}>
                          Enrollment ID: {student.enrollmentId}
                        </p>
                      </div>
                      <div className={`flex items-center space-x-4 text-sm ${TAILWIND_COLORS.TEXT_PRIMARY}`}>
                        <div className="flex items-center">
                          <LuPhone className="h-4 w-4 mr-1" />
                          {student.phone || "-"}
                        </div>
                        <div className="flex items-center">
                          <LuMail className="h-4 w-4 mr-1" />
                          {student.email || "-"}
                        </div>
                      </div>
                    </div>
                  );
                })}
                {!students.length && (
                  <div className={`text-sm ${TAILWIND_COLORS.TEXT_MUTED}`}>
                    No students to show. Select a course & batch.
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-center">
              <button
                onClick={handleGenerateCertificate}
                disabled={isGenerating || !students.length}
                className={`px-6 py-3 rounded-lg flex items-center space-x-2 ${TAILWIND_COLORS.TEXT_INVERSE} ${
                  isGenerating
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-green-600 hover:bg-green-700"
                }`}
              >
                <LuFileText className="h-5 w-5" />
                <span>{buttonText}</span>
              </button>
            </div>
          </>
        )}
      </>
    );
  };

  // Template Preview (for after template creation)
  const renderTemplatePreview = () => (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className={`text-lg font-semibold mb-1 ${TAILWIND_COLORS.TEXT_PRIMARY}`}>
        Template Preview
      </h3>
      <p className={`text-sm ${TAILWIND_COLORS.TEXT_MUTED} mb-6`}>
        Preview of your certificate template
      </p>

      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 mb-6 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="flex justify-between items-start mb-6">
          {logoPreview ? (
            <div className="h-16 w-16 flex items-center justify-center overflow-hidden">
              <img
                src={logoPreview}
                alt="Institute Logo"
                className="object-contain h-full w-full"
              />
            </div>
          ) : (
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
              <LuAward className={`h-6 w-6 ${TAILWIND_COLORS.TEXT_INVERSE}`} />
            </div>
          )}
          {sealPreview ? (
            <div className="h-16 w-16 flex items-center justify-center overflow-hidden">
              <img
                src={sealPreview}
                alt="Official Seal"
                className="object-contain h-full w-full"
              />
            </div>
          ) : (
            <div className="w-12 h-12 bg-gray-400 rounded-lg flex items-center justify-center">
              <LuGraduationCap className={`h-6 w-6 ${TAILWIND_COLORS.TEXT_INVERSE}`} />
            </div>
          )}
        </div>

        <div className="text-center mb-8">
          <h1 className={`text-3xl font-bold italic mb-4 ${TAILWIND_COLORS.TEXT_PRIMARY}`}>
            {templateName?.trim() || "Template Name"}
          </h1>
          <p
            className={`text-sm ${TAILWIND_COLORS.TEXT_PRIMARY} max-w-2xl mx-auto leading-relaxed`}
            style={{ whiteSpace: "pre-line" }}
          >
            {description?.trim() || "Template description will appear here"}
          </p>
        </div>

        <div className="flex justify-between items-end">
          <div className={`text-sm ${TAILWIND_COLORS.TEXT_MUTED}`}>
            Date: —
          </div>
          {signaturePreview ? (
            <div className="h-16 w-32 flex items-center justify-center overflow-hidden">
              <img
                src={signaturePreview}
                alt="Authorized Signature"
                className="object-contain h-full w-full"
              />
            </div>
          ) : (
            <div className="h-16 w-32 bg-gray-200 rounded flex items-center justify-center">
              <span className={`text-xs ${TAILWIND_COLORS.TEXT_MUTED}`}>Signature</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderCertificatePreview = () => (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className={`text-lg font-semibold mb-1 ${TAILWIND_COLORS.TEXT_PRIMARY}`}>
        Certificate Preview
      </h3>
      <p className={`text-sm ${TAILWIND_COLORS.TEXT_MUTED} mb-6`}>
        Preview of the generated certificate
      </p>

      {selectedStudents.length > 0 ? (
        selectedStudents.map((studentId) => {
          const student = students.find((s) => s.id === studentId);
          const course = courses.find((c) => String(c.id) === String(selectedCourse));
          if (!student) return null;

          return (
            <div
              key={studentId}
              className="border-2 border-dashed border-gray-300 rounded-lg p-8 mb-6 bg-gradient-to-br from-blue-50 to-indigo-50"
            >
              <div className="flex justify-between items-start mb-6">
                {logoPreview ? (
                  <div className="h-16 w-16 flex items-center justify-center overflow-hidden">
                    <img
                      src={logoPreview}
                      alt="Institute Logo"
                      className="object-contain h-full w-full"
                    />
                  </div>
                ) : (
                  <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                    <LuAward className={`h-6 w-6 ${TAILWIND_COLORS.TEXT_INVERSE}`} />
                  </div>
                )}
                {sealPreview ? (
                  <div className="h-16 w-16 flex items-center justify-center overflow-hidden">
                    <img
                      src={sealPreview}
                      alt="Official Seal"
                      className="object-contain h-full w-full"
                    />
                  </div>
                ) : (
                  <div className="w-12 h-12 bg-gray-400 rounded-lg flex items-center justify-center">
                    <LuGraduationCap className={`h-6 w-6 ${TAILWIND_COLORS.TEXT_INVERSE}`} />
                  </div>
                )}
              </div>

              <div className="text-center mb-8">
                <h1 className={`text-3xl font-bold italic mb-4 ${TAILWIND_COLORS.TEXT_PRIMARY}`}>
                  {templateName?.trim() || ""}
                </h1>
                <p
                  className={`text-sm ${TAILWIND_COLORS.TEXT_PRIMARY} max-w-2xl mx-auto leading-relaxed`}
                  style={{ whiteSpace: "pre-line" }}
                >
                  {description?.trim() || ""}
                </p>
              </div>

              <div className="text-center mb-8">
                <h2 className={`text-2xl font-bold ${TAILWIND_COLORS.TEXT_PRIMARY} mb-2`}>
                  {student.name}
                </h2>
                <p className={`text-lg ${TAILWIND_COLORS.TEXT_PRIMARY} uppercase tracking-wide`}>
                  {course?.title || ""}
                </p>
              </div>

              <div className="flex justify-between items-end">
                <div className={`text-sm ${TAILWIND_COLORS.TEXT_MUTED}`}>
                  Date: {completionDate || "—"}
                </div>
                {signaturePreview && (
                  <div className="h-16 w-32 flex items-center justify-center overflow-hidden">
                    <img
                      src={signaturePreview}
                      alt="Authorized Signature"
                      className="object-contain h-full w-full"
                    />
                  </div>
                )}
              </div>
            </div>
          );
        })
      ) : (
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 mb-6 bg-gradient-to-br from-blue-50 to-indigo-50">
          <div className="flex justify-between items-start mb-6">
            {logoPreview ? (
              <div className="h-16 w-16 flex items-center justify-center overflow-hidden">
                <img
                  src={logoPreview}
                  alt="Institute Logo"
                  className="object-contain h-full w-full"
                />
              </div>
            ) : (
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                <LuAward className={`h-6 w-6 ${TAILWIND_COLORS.TEXT_INVERSE}`} />
              </div>
            )}
            {sealPreview ? (
              <div className="h-16 w-16 flex items-center justify-center overflow-hidden">
                <img
                  src={sealPreview}
                  alt="Official Seal"
                  className="object-contain h-full w-full"
                />
              </div>
            ) : (
              <div className="w-12 h-12 bg-gray-400 rounded-lg flex items-center justify-center">
                <LuGraduationCap className={`h-6 w-6 ${TAILWIND_COLORS.TEXT_INVERSE}`} />
              </div>
            )}
          </div>

          <div className="text-center mb-8">
            <h1 className={`text-3xl font-bold italic mb-4 ${TAILWIND_COLORS.TEXT_PRIMARY}`}>
              {templateName?.trim() || ""}
            </h1>
            <p
              className={`text-sm ${TAILWIND_COLORS.TEXT_PRIMARY} max-w-2xl mx-auto leading-relaxed`}
              style={{ whiteSpace: "pre-line" }}
            >
              {description?.trim() || ""}
            </p>
          </div>

          <div className="text-center mb-8">
            <h2 className={`text-2xl font-bold ${TAILWIND_COLORS.TEXT_PRIMARY} mb-2`}>
              {""}
            </h2>
            <p className={`text-lg ${TAILWIND_COLORS.TEXT_PRIMARY} uppercase tracking-wide`}>
              {""}
            </p>
          </div>

          <div className="flex justify-between items-end">
            <div className={`text-sm ${TAILWIND_COLORS.TEXT_MUTED}`}>
              Date: {completionDate || "—"}
            </div>
            {signaturePreview && (
              <div className="h-16 w-32 flex items-center justify-center overflow-hidden">
                <img
                  src={signaturePreview}
                  alt="Authorized Signature"
                  className="object-contain h-full w-full"
                />
              </div>
            )}
          </div>
        </div>
      )}

      <div className="flex justify-center mt-6">
        <button
          onClick={() => handleDownloadCertificate("preview-certificate")}
          className={`bg-green-600 hover:bg-green-700 ${TAILWIND_COLORS.TEXT_INVERSE} px-6 py-3 rounded-lg flex items-center space-x-2`}
        >
          <LuDownload className="h-5 w-5" />
          <span>Direct Download</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Certificate Generation */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 relative">
        <button
          type="button"
          onClick={() => {
            // Pre-populate with last template's assets if available
            if (templates.length > 0) {
              const lastTemplate = templates[templates.length - 1];
              if (lastTemplate) {
                // Set previews from last template
                if (lastTemplate.logo) {
                  setLogoPreview(lastTemplate.logo);
                  setLastTemplateLogoUrl(lastTemplate.logo);
                }
                if (lastTemplate.seal) {
                  setSealPreview(lastTemplate.seal);
                  setLastTemplateSealUrl(lastTemplate.seal);
                }
                if (lastTemplate.signature) {
                  setSignaturePreview(lastTemplate.signature);
                  setLastTemplateSignatureUrl(lastTemplate.signature);
                }
                console.log("📋 Pre-populated with last template:", lastTemplate);
              }
            }
            setIsTemplateModalOpen(true);
          }}
          className={`absolute top-6 right-6 px-4 py-2 bg-green-600 ${TAILWIND_COLORS.TEXT_INVERSE} rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 whitespace-nowrap flex items-center space-x-2 shadow-md`}
        >
          <LuFileText className="h-4 w-4" />
          <span>Create Template</span>
        </button>

        {renderCertificateFormSections({ includeCreateButton: true })}
      </div>

      {/* Generated Certificates List */}
      {generatedCertificates.length > 0 && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className={`text-xl font-semibold ${TAILWIND_COLORS.TEXT_PRIMARY} mb-4`}>
            Generated Certificates ({generatedCertificates.length})
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {generatedCertificates.map((cert, index) => {
              const certId = cert?.certificate_id || cert?.id || cert?.data?.certificate_id || index;
              const studentName = cert?.student_name || cert?.data?.student_name || `Student ${index + 1}`;
              const fileUrl = cert?.file_url || cert?.data?.file_url || cert?.certificate_url;
              
              return (
                <div key={certId} className={`border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow`}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <LuAward className={`w-5 h-5 ${TAILWIND_COLORS.TEXT_PRIMARY}`} />
                      <span className={`font-medium ${TAILWIND_COLORS.TEXT_PRIMARY}`}>
                        {studentName}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        if (fileUrl) {
                          window.open(fileUrl, '_blank');
                        } else if (certId) {
                          handleDownloadCertificate(certId);
                        }
                      }}
                      className={`flex items-center gap-2 px-3 py-2 bg-green-600 hover:bg-green-700 ${TAILWIND_COLORS.TEXT_INVERSE} rounded-md text-sm transition-colors`}
                    >
                      <LuDownload className="w-4 h-4" />
                      <span>Download</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Certificate Preview */}
      {/* {renderCertificatePreview()} */}

      {isTemplateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="bg-white rounded-lg shadow-xl max-w-5xl w-full max-h-[90vh] overflow-y-auto p-6 relative">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className={`text-xl font-semibold ${TAILWIND_COLORS.TEXT_PRIMARY}`}>
                  Create Certificate Template
                </h3>
               
              </div>
              <button
                type="button"
                onClick={() => {
                  // Reset form when closing modal
                  setTemplateName(DEFAULT_TEMPLATE_NAME);
                  setDescription(DEFAULT_CERTIFICATE_DESCRIPTION);
                  setLogoFile(null);
                  setSealFile(null);
                  setSignatureFile(null);
                  setLogoPreview("");
                  setSealPreview("");
                  setSignaturePreview("");
                  setLastTemplateLogoUrl("");
                  setLastTemplateSealUrl("");
                  setLastTemplateSignatureUrl("");
                  setShowPreview(false);
                  setIsTemplateModalOpen(false);
                }}
                className={`${TAILWIND_COLORS.TEXT_MUTED} hover:text-text-primary text-sm font-medium`}
              >
                Close
              </button>
            </div>
            <div className="space-y-6">
              {!showPreview && renderCertificateFormSections()}
              {showPreview && (
                <>
                  {renderTemplatePreview()}
                  {/* Confirm Button - Show after template preview */}
                  <div className="flex justify-center gap-4 pt-4 border-t border-gray-200">
                    <button
                      type="button"
                      onClick={() => {
                        setShowPreview(false);
                        setIsTemplateModalOpen(false);
                        // Reset form after closing
                        setTemplateName(DEFAULT_TEMPLATE_NAME);
                        setDescription(DEFAULT_CERTIFICATE_DESCRIPTION);
                        setLogoFile(null);
                        setSealFile(null);
                        setSignatureFile(null);
                        setLogoPreview("");
                        setSealPreview("");
                        setSignaturePreview("");
                        setLastTemplateLogoUrl("");
                        setLastTemplateSealUrl("");
                        setLastTemplateSignatureUrl("");
                      }}
                      className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={async () => {
                        // Close modal first
                        setIsTemplateModalOpen(false);
                        setShowPreview(false);
                        
                        // Reset last template URLs for next time
                        setLastTemplateLogoUrl("");
                        setLastTemplateSealUrl("");
                        setLastTemplateSignatureUrl("");
                        
                        // Check if course, batch, students are selected for certificate generation
                        if (selectedCourse && selectedBatch && selectedStudents.length > 0 && completionDate) {
                          // Generate certificate immediately
                          await handleGenerateCertificate();
                        } else {
                          // Template is ready, user needs to select course, batch, students first
                          Swal.fire({
                            icon: 'info',
                            title: 'Template Created',
                            text: 'Template created successfully! Please select course, batch, and students to generate certificates.',
                            confirmButtonColor: '#5C9A24'
                          });
                        }
                      }}
                      className={`px-6 py-2 rounded-lg flex items-center space-x-2 bg-green-600 hover:bg-green-700 ${TAILWIND_COLORS.TEXT_INVERSE}`}
                    >
                      <LuAward className="h-5 w-5" />
                      <span>Confirm & Generate Certificate</span>
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CertificateGeneration;
