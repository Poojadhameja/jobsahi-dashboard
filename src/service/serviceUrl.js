const service = {
    //auth url
    signin: '/auth/login.php',
    phoneLogin: '/auth/phone_login.php',
    forgotPassword: '/auth/forgot-password.php',
    verifyOtp: '/auth/verify-otp.php',
    resendOtp: '/auth/resend-otp.php',
    changePassword: '/auth/change_password.php',
    signup: '/user/create_user.php',
    logout: '/auth/logout.php',
    updateUser: '/user/update_user.php',

    //admin url
    studentsList: '/admin/list_students.php',
    employersList: '/admin/list_employers.php',
    institutesList: '/admin/list_institutes.php',

    //recruiter url
    getRecruiterJobs: '/employer/get_recruiter_jobs.php',
    recruiterProfile: '/employer/profile.php',
    recruiterReports: '/employer/recruiter_reports.php',
    fetchEmployerJobs: '/employer/fetch_employer_jobs.php',

}

export default service;