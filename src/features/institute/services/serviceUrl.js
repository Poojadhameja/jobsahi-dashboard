
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
//   deleteBatch: '/batches/delete_batch.php',
  
  // Faculty/Instructors
  createFaculty: '/faculty/create_faculty_user.php',
  getFaculty: '/faculty/get_faculty_users.php',
  updateFaculty: '/faculty/update_faculty_user.php',
//   getInstructors: '/faculty/get_faculty_users.php'

getFaculty: '/faculty/get_faculty_users.php',
}

export default apiService
