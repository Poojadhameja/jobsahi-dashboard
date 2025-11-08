// ✅ Add this constant at the very top
const instituteBase = "/institute";

const apiService = {
  // Dashboard
  dashboardStats: '/institute/dashboard_stats.php',

  // Courses
  createCourse: '/courses/create_course.php',
  getCourses: '/courses/courses.php',
  updateCourse: '/courses/update_course.php',
  deleteCourse: '/courses/delete_course.php',
  getCourseModules: '/courses/get_course_modules.php',
  getCourseModule: '/courses/get_course_module.php',
  updateCourseModule: '/courses/update_course_module.php',
  deleteCourseModule: '/courses/delete_course_module.php',

  // Batches
  createBatch: '/batches/create_batch.php',
  getBatches: '/batches/get_batch.php',
  updateBatch: '/batches/update_batch.php',
  // deleteBatch: '/batches/delete_batch.php',

  // Faculty/Instructors
  createFaculty: '/faculty/create_faculty_user.php',
  getFaculty: '/faculty/get_faculty_users.php',
  updateFaculty: '/faculty/update_faculty_user.php',
  getCourseCategories: '/courses/get_course_category.php',

  // Course & Batch Relations
  courseByBatch: '/institute/course_by_batch.php',

  // Certificates
  CourseBatchStudents: "/courses/course_batch_students.php",
  generateCertificate: "/certificates/certificates.php",
  getCertificateById: "/certificates/get_certificate.php",

  // Certificate Templates
  createCertificateTemplate: "/certificate_templates/create_certificate_template.php",
  certificateTemplatesList: "/certificate_templates/certificate_templates.php",

  // ✅ FIXED ENDPOINT — now works correctly
  institute_view_students: `/institute/get_institute_students.php`,
  list_students: "/admin/list_students.php",
  assign_course_batch: "/institute/assign_course_batch.php",
};

export default apiService;
