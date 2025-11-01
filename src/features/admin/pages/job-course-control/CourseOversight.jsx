import React, { useState } from 'react';
import { COLORS, TAILWIND_COLORS } from '../../../../shared/WebConstant.js';
import Button from '../../../../shared/components/Button.jsx';

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
  const [categories, setCategories] = useState(['Electrician', 'Fitter', 'COPA']);
  const [newCategory, setNewCategory] = useState('');
  const [minTopRated, setMinTopRated] = useState(4.5);

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

  // Category management handlers
  const handleAddCategory = () => {
    const name = newCategory.trim();
    if (!name || categories.includes(name)) return;
    setCategories(prev => [...prev, name]);
    setNewCategory('');
  };
  const handleDeleteCategory = (name) => setCategories(prev => prev.filter(c => c !== name));
  const handleRenameCategory = (oldName) => {
    const next = window.prompt('Rename category', oldName);
    const name = (next || '').trim();
    if (!name) return;
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
            <Button 
              onClick={handleBulkCourseFeature} 
              variant="outline" 
              size="md"
            >
              Feature Selected
            </Button>
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
        
        <div className="flex flex-wrap gap-2 mb-4">
          {categories.map((category) => (
            <div key={category} className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full">
              <span className="text-sm text-gray-700">{category}</span>
              <button
                onClick={() => handleRenameCategory(category)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✏️
              </button>
              <button
                onClick={() => handleDeleteCategory(category)}
                className="text-red-500 hover:text-red-700"
              >
                ✕
              </button>
            </div>
          ))}
        </div>

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

      {/* Top-Rated Courses */}
      <div className={`${TAILWIND_COLORS.CARD} p-6`}>
        <h3 className={`text-lg font-semibold ${TAILWIND_COLORS.TEXT_PRIMARY} mb-4`}>Top-Rated Courses</h3>
        
        <div className="flex items-center gap-4 mb-4">
          <label className="text-sm font-medium text-gray-700">Minimum Rating:</label>
          <input
            type="number"
            min="0"
            max="5"
            step="0.1"
            value={minTopRated}
            onChange={(e) => setMinTopRated(Number(e.target.value))}
            className="w-20 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent"
          />
          <Button onClick={handleTagTopRated} variant="primary" size="md">
            Tag as Featured
          </Button>
        </div>

        <p className="text-sm text-gray-600">
          Courses with rating ≥ {minTopRated} will be tagged as featured
        </p>
      </div>
    </div>
  );
};

export default CourseOversight;
