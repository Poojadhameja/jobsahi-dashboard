import React, { useState, useEffect, useCallback } from 'react';
import { COLORS, TAILWIND_COLORS } from '../../../../shared/WebConstant.js';
import Button from '../../../../shared/components/Button.jsx';
import { getMethod, postMethod, deleteMethod } from '../../../../service/api';
import apiService from '../../services/serviceUrl';
import Swal from 'sweetalert2';

const CourseOversight = () => {
  // ====== STATE MANAGEMENT ======
  // Courses state
  const [courses, setCourses] = useState([
    { id: 1, title: 'Electrician', category: 'ITI', instructor: 'M.Kapoor', rating: 4.5, status: 'Pending' },
    { id: 2, title: 'Fitter', category: 'ITI', instructor: 'M.Kapoor', rating: 4.5, status: 'Approved' },
    { id: 3, title: 'COPA', category: 'ITI', instructor: 'M.Kapoor', rating: 4.5, status: 'Featured' },
    { id: 4, title: 'Fitter', category: 'ITI', instructor: 'M.Kapoor', rating: 4.5, status: 'Pending' },
    { id: 5, title: 'Electrician', category: 'ITI', instructor: 'M.Kapoor', rating: 4.5, status: 'Featured' }
  ]);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [courseSearchTerm, setCourseSearchTerm] = useState('');
  const [courseStatusFilter, setCourseStatusFilter] = useState('All Status');
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');
  const [minTopRated, setMinTopRated] = useState(4.5);
  const [loadingCategories, setLoadingCategories] = useState(true);

  // ====== COMPUTED VALUES ======
  const filteredCourses = courses.filter(course => {
    const q = courseSearchTerm.toLowerCase();
    const matchesSearch = course.title.toLowerCase().includes(q) || course.category.toLowerCase().includes(q) || course.instructor.toLowerCase().includes(q);
    const matchesStatus = courseStatusFilter === 'All Status' || course.status === courseStatusFilter;
    return matchesSearch && matchesStatus;
  });

  // ====== EVENT HANDLERS ======
  // Course selection handlers
  const handleCourseSelectAll = (checked) => setSelectedCourses(checked ? filteredCourses.map(c => c.id) : []);
  const handleCourseSelect = (courseId, checked) => setSelectedCourses(prev => checked ? [...new Set([...prev, courseId])] : prev.filter(id => id !== courseId));
  
  // Course action handlers
  const updateCourseStatus = (ids, nextStatus) => setCourses(prev => prev.map(c => (ids.includes(c.id) ? { ...c, status: nextStatus } : c)));
  const handleApproveCourse = (courseId) => updateCourseStatus([courseId], 'Approved');
  const handleFeatureCourse = (courseId) => updateCourseStatus([courseId], 'Featured');
  const handleBulkCourseApprove = () => selectedCourses.length && updateCourseStatus(selectedCourses, 'Approved');
  const handleBulkCourseFeature = () => selectedCourses.length && updateCourseStatus(selectedCourses, 'Featured');

  // ====== API CALLS ======
  const fetchCategories = useCallback(async () => {
    try {
      setLoadingCategories(true);
      const response = await getMethod({
        apiUrl: apiService.getCourseCategory
      });

      console.log('📊 Categories API Response:', response);

      const isSuccess = response?.status === true || response?.status === 'success' || response?.success === true;

      if (isSuccess) {
        // Extract category names from response
        // API returns categories in response.categories or response.data
        let categoryList = [];
        
        if (response.categories && Array.isArray(response.categories)) {
          categoryList = response.categories.map(cat => ({
            id: cat.id,
            name: cat.category_name || cat.name || cat.title || cat
          }));
        } else if (response.data && Array.isArray(response.data)) {
          categoryList = response.data.map(cat => ({
            id: cat.id,
            name: cat.category_name || cat.name || cat.title || cat
          }));
        } else if (Array.isArray(response)) {
          categoryList = response.map(cat => ({
            id: cat.id,
            name: cat.category_name || cat.name || cat.title || cat
          }));
        }
        
        console.log('✅ Categories:', categoryList);
        setCategories(categoryList);
      } else {
        console.error('❌ Failed to fetch categories:', response?.message);
        setCategories([]);
      }
    } catch (error) {
      console.error('❌ Error fetching categories:', error);
      setCategories([]);
    } finally {
      setLoadingCategories(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  // Category management handlers
  const handleAddCategory = async () => {
    const name = newCategory.trim();
    if (!name) {
      Swal.fire('Error!', 'Please enter a category name', 'error');
      return;
    }

    if (categories.includes(name)) {
      Swal.fire('Error!', 'Category already exists', 'error');
      return;
    }

    try {
      const response = await postMethod({
        apiUrl: apiService.createCourseCategory,
        payload: {
          name: name
        }
      });

      console.log('📊 Create Category API Response:', response);

      if (response?.status === true || response?.success === true) {
        Swal.fire('Success!', 'Category added successfully', 'success');
        setNewCategory('');
        // Auto-refresh will handle the UI update, but refresh immediately for instant feedback
        fetchCategories();
      } else {
        Swal.fire('Error!', response?.message || 'Failed to add category', 'error');
      }
    } catch (error) {
      console.error('❌ Error adding category:', error);
      Swal.fire('Error!', 'Failed to add category', 'error');
    }
  };

  const handleDeleteCategory = async (category) => {
    const categoryName = typeof category === 'object' ? category.name : category;
    const categoryId = typeof category === 'object' ? category.id : null;

    const result = await Swal.fire({
      title: 'Delete Category?',
      text: `Are you sure you want to delete "${categoryName}"?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Yes, Delete',
      cancelButtonText: 'Cancel'
    });

    if (result.isConfirmed) {
      try {
        // Call API to delete from database
        if (categoryId) {
          const response = await deleteMethod({
            apiUrl: `${apiService.deleteCourseCategory}?id=${categoryId}`
          });

          console.log('📊 Delete Category API Response:', response);

          if (response?.status === true || response?.success === true) {
            Swal.fire('Deleted!', 'Category has been deleted successfully', 'success');
            // Auto-refresh will handle the UI update, but refresh immediately for instant feedback
            fetchCategories();
          } else {
            Swal.fire('Error!', response?.message || 'Failed to delete category', 'error');
            fetchCategories(); // Refresh to get correct state
          }
        } else {
          Swal.fire('Error!', 'Category ID not found', 'error');
        }
      } catch (error) {
        console.error('❌ Error deleting category:', error);
        Swal.fire('Error!', 'Failed to delete category', 'error');
        fetchCategories(); // Refresh to get correct state
      }
    }
  };

  const handleRenameCategory = (oldName) => {
    const next = window.prompt('Rename category', oldName);
    const name = (next || '').trim();
    if (!name || name === oldName) return;
    setCategories(prev => prev.map(c => (c === oldName ? name : c)));
  };

  // Top-rated tagging handler
  const handleTagTopRated = () => {
    const ids = courses.filter(c => c.rating >= Number(minTopRated)).map(c => c.id);
    if (ids.length) updateCourseStatus(ids, 'Featured');
  };

  return (
    <div className="space-y-6">
      {/* Course Management */}
      <div className={`${TAILWIND_COLORS.CARD} p-6`}>
        <div className="flex items-center space-x-3 mb-6">
          <div className="h-8 w-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: COLORS.GREEN_PRIMARY }}>
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <h2 className={`text-xl font-bold ${TAILWIND_COLORS.TEXT_PRIMARY}`}>Course Oversight</h2>
            <p className="text-gray-600 text-sm">Manage course approvals, categories, and quality control</p>
          </div>
        </div>

        {/* Course Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search courses, categories, or instructors"
                value={courseSearchTerm}
                onChange={(e) => setCourseSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent"
              />
            </div>
          </div>

          <div className="sm:w-48">
            <select
              value={courseStatusFilter}
              onChange={(e) => setCourseStatusFilter(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent"
            >
              <option value="All Status">All Status</option>
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Featured">Featured</option>
            </select>
          </div>

          <div className="flex gap-3">
            <Button 
              onClick={handleBulkCourseApprove} 
              variant="primary" 
              size="md"
            >
              Approve Selected
            </Button>
            {/* <Button 
              onClick={handleBulkCourseFeature} 
              variant="outline" 
              size="md"
            >
              Feature Selected
            </Button> */}
          </div>
        </div>

        {/* Course Table */}
        <div className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left">
                    <input
                      type="checkbox"
                      checked={filteredCourses.length > 0 && selectedCourses.length === filteredCourses.length}
                      onChange={(e) => handleCourseSelectAll(e.target.checked)}
                      className="rounded border-gray-300"
                      style={{ accentColor: COLORS.GREEN_PRIMARY }}
                    />
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-900">Title</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-900">Category</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-900">Instructor</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-900">Rating</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-900">Status</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredCourses.map((course) => (
                  <tr key={course.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        checked={selectedCourses.includes(course.id)}
                        onChange={(e) => handleCourseSelect(course.id, e.target.checked)}
                        className="rounded border-gray-300"
                        style={{ accentColor: COLORS.GREEN_PRIMARY }}
                      />
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{course.title}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{course.category}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{course.instructor}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{course.rating} ⭐</td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                          course.status === 'Approved'
                            ? TAILWIND_COLORS.BADGE_SUCCESS
                            : course.status === 'Featured'
                            ? TAILWIND_COLORS.BADGE_INFO
                            : 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        {course.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-2">
                        <Button 
                          onClick={() => handleApproveCourse(course.id)} 
                          variant="primary" 
                          size="sm"
                        >
                          Approve
                        </Button>
                        <Button 
                          onClick={() => handleFeatureCourse(course.id)} 
                          variant="outline" 
                          size="sm"
                        >
                          Feature
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Category Management */}
      <div className={`${TAILWIND_COLORS.CARD} p-6`}>
        <h3 className={`text-lg font-semibold ${TAILWIND_COLORS.TEXT_PRIMARY} mb-4`}>Category Management</h3>
        
        {loadingCategories ? (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            <p className={`mt-4 text-sm ${TAILWIND_COLORS.TEXT_MUTED}`}>Loading categories...</p>
          </div>
        ) : categories.length === 0 ? (
          <div className="text-center py-8">
            <p className={`text-sm ${TAILWIND_COLORS.TEXT_MUTED}`}>No categories found</p>
          </div>
        ) : (
          <div className="flex flex-wrap gap-2 mb-4">
            {categories.map((category) => {
              const categoryName = typeof category === 'object' ? category.name : category;
              const categoryKey = typeof category === 'object' ? category.id || category.name : category;
              
              return (
                <div key={categoryKey} className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full">
                  <span className="text-sm text-gray-700">{categoryName}</span>
                  <button
                    onClick={() => handleDeleteCategory(category)}
                    className="text-red-500 hover:text-red-700 text-sm font-bold"
                    title="Delete category"
                  >
                    ✕
                  </button>
                </div>
              );
            })}
          </div>
        )}

        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Add new category"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent"
          />
          <Button onClick={handleAddCategory} variant="primary" size="md">
            Add Category
          </Button>
        </div>
      </div>

     
    </div>
  );
};

export default CourseOversight;
