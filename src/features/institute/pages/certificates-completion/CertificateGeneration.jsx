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
          apiUrl: apiService.certificateTemplatesList,
        });
  
        if (resp?.status && Array.isArray(resp.data)) {
          setTemplates(resp.data);
  
          if (resp.data.length > 0) {
            const t = resp.data[0];
  
            setSelectedTemplateId(t.id);
            setTemplateName(t.template_name);
            setDescription(t.description);
  
            // preview set for popup
            setLogoPreview(t.logo || "");
            setSealPreview(t.seal || "");
            setSignaturePreview(t.signature || "");
          }
        }
      } catch (error) {
        console.error("❌ Error fetching template defaults:", error);
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
    const templateId = e.target.value;
    setSelectedTemplateId(templateId);

    if (templateId) {
      const selectedTemplate = templates.find(
        (t) => String(t.template_id || t.id) === String(templateId)
      );
      if (selectedTemplate) {
        setTemplateName(selectedTemplate.template_name || "");
        setDescription(selectedTemplate.footer_text || "");
      }
    } else {
      setTemplateName("");
      setDescription("");
    }
  };


  const handleAssetSelect = (setFile, setPreview) => (event) => {
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

    setFile(file);
    setPreview((prevUrl) => {
      if (prevUrl) URL.revokeObjectURL(prevUrl);
      return URL.createObjectURL(file);
    });
  };

  const handleAssetRemove = (setFile, setPreview) => () => {
    setFile(null);
    setPreview((prevUrl) => {
      if (prevUrl) URL.revokeObjectURL(prevUrl);
      return "";
    });
  };

  // ✅ Generate certificates
  const handleGenerateCertificate = async () => {
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

    if (!templateName.trim()) {
      Swal.fire({
        icon: 'warning',
        title: 'Validation Error',
        text: 'Please provide a template name.',
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
        formData.append("template_name", templateName.trim());
        formData.append("description", description || "");

        if (logoFile) formData.append("logo", logoFile);
        if (sealFile) formData.append("seal", sealFile);
        if (signatureFile) formData.append("signature", signatureFile);

        console.log("📤 Sending FormData keys:", Array.from(formData.keys()));

        const res = await postMultipart({
          apiUrl: apiService.generateCertificate,
          formData,
        });

        console.log("📩 Response:", res);

        if (res?.status) {
          results.push(res.data);
        } else {
          console.warn(
            `⚠️ Certificate not generated for ${studentId}: ${res?.message}`
          );
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
    if (!templateName.trim()) return Swal.fire("Template name required");
    if (!description.trim()) return Swal.fire("Description required");
    if (!logoFile || !sealFile || !signatureFile)
      return Swal.fire("Upload all assets");
  
    setIsCreatingTemplate(true);
  
    try {
      const formData = new FormData();
  
      formData.append("template_name", templateName.trim());
      formData.append("description", description.trim());
      formData.append("is_active", "1");
      formData.append("admin_action", "approved");
  
      formData.append("logo", logoFile);
      formData.append("seal", sealFile);
      formData.append("signature", signatureFile);
  
      const res = await postMultipart({
        apiUrl: apiService.createCertificateTemplate,
        formData,
      });
  
      if (res?.status) {
        Swal.fire("Success", "Template created successfully", "success");
  
        // 🔥 Refresh template list
        const resp = await getMethod({
          apiUrl: apiService.certificateTemplatesList,
        });
  
        if (resp?.status) {
          setTemplates(resp.data);
        }
  
        setIsTemplateModalOpen(false);
        setTemplateName("");
        setDescription("");
        setLogoFile(null);
        setSealFile(null);
        setSignatureFile(null);
        setLogoPreview("");
        setSealPreview("");
        setSignaturePreview("");
      } else {
        Swal.fire("Failed", res?.message, "error");
      }
    } catch (err) {
      Swal.fire("Error", "Something went wrong", "error");
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
                    value={templateName}
                    onChange={(e) => setTemplateName(e.target.value)}
                    placeholder="Enter template name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
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
                  ({ key, label, helper, file, preview, setFile, setPreview, inputId }) => (
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
                          onChange={handleAssetSelect(setFile, setPreview)}
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
                            <p className={`text-sm ${TAILWIND_COLORS.TEXT_PRIMARY} truncate`}>{file?.name}</p>
                            <div className="flex items-center justify-center gap-4 text-sm">
                              <label
                                htmlFor={inputId}
                                className={`${TAILWIND_COLORS.TEXT_SUCCESS} hover:underline cursor-pointer`}
                              >
                                Change
                              </label>
                              <button
                                type="button"
                                onClick={handleAssetRemove(setFile, setPreview)}
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
                  disabled={isCreatingTemplate || !templateName.trim() || !description.trim() || !logoFile || !sealFile || !signatureFile}
                  className={`px-6 py-3 rounded-lg flex items-center space-x-2 ${TAILWIND_COLORS.TEXT_INVERSE} ${
                    isCreatingTemplate || !templateName.trim() || !description.trim() || !logoFile || !sealFile || !signatureFile
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
          onClick={() => setIsTemplateModalOpen(true)}
          className={`absolute top-6 right-6 px-4 py-2 bg-green-600 ${TAILWIND_COLORS.TEXT_INVERSE} rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 whitespace-nowrap flex items-center space-x-2 shadow-md`}
        >
          <LuFileText className="h-4 w-4" />
          <span>Create Template</span>
        </button>

        {renderCertificateFormSections({ includeCreateButton: true })}
      </div>

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
                  setIsTemplateModalOpen(false);
                  setShowPreview(false);
                }}
                className={`${TAILWIND_COLORS.TEXT_MUTED} hover:text-text-primary text-sm font-medium`}
              >
                Close
              </button>
            </div>
            <div className="space-y-6">
              {renderCertificateFormSections()}
              {showPreview && renderCertificatePreview()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CertificateGeneration;
