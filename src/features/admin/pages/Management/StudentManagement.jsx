import React, { useMemo, useState, useEffect } from 'react'
import { TAILWIND_COLORS, COLORS } from '../../../shared/WebConstant'
import { MatrixCard, MetricPillRow } from '../../components/metricCard'
import { 
  LuUsers, 
  LuCheckCircle, 
  LuFolderOpen, 
  LuTarget,
  LuSearch,
  LuMoreVertical,
  LuFilter
} from 'react-icons/lu'
// KPI Card Component
function KPICard({ title, value, icon, color = COLORS.PRIMARY }) {
  return (
    <div className={`${TAILWIND_COLORS.CARD} p-6`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600 mb-1">{title}</p>
          <p className="text-2xl font-bold" style={{ color }}>{value}</p>
        </div>
        <div 
          className="w-12 h-12 rounded-full flex items-center justify-center"
          style={{ backgroundColor: `${color}15` }}
        >
          {icon}
        </div>
      </div>
    </div>
  )
}

// Advanced Filters Component
function AdvancedFilters({ filters, onFilterChange, onClearAll, onApplyFilter }) {
  return (
    <div className={`${TAILWIND_COLORS.CARD} p-6`}>
      <div className="flex items-center gap-2 mb-4">
        <LuFilter className="text-gray-600" size={20} />
        <h3 className="font-medium text-gray-800">Advanced Filters</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
        <select 
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm"
          value={filters.course || 'all'}
          onChange={(e) => onFilterChange({ ...filters, course: e.target.value })}
        >
          <option value="all">All Courses</option>
          <option value="electrician">Electrician</option>
          <option value="plumber">Plumber</option>
          <option value="carpenter">Carpenter</option>
          <option value="welder">Welder</option>
        </select>
        
        <select 
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm"
          value={filters.placementStatus || 'all'}
          onChange={(e) => onFilterChange({ ...filters, placementStatus: e.target.value })}
        >
          <option value="all">All Status</option>
          <option value="placed">Placed</option>
          <option value="placement-ready">Placement Ready</option>
          <option value="in-progress">In Progress</option>
          <option value="not-ready">Not Ready</option>
        </select>
        
        <select 
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm"
          value={filters.skills || 'all'}
          onChange={(e) => onFilterChange({ ...filters, skills: e.target.value })}
        >
          <option value="all">All Skills</option>
          <option value="react">React</option>
          <option value="java">Java</option>
          <option value="python">Python</option>
          <option value="javascript">JavaScript</option>
        </select>
        
        <select 
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm"
          value={filters.experience || 'all'}
          onChange={(e) => onFilterChange({ ...filters, experience: e.target.value })}
        >
          <option value="all">All Experience</option>
          <option value="0-1">0-1 years</option>
          <option value="1-3">1-3 years</option>
          <option value="3-5">3-5 years</option>
          <option value="5+">5+ years</option>
        </select>
      </div>
      
      <div className="flex justify-end gap-3">
        <button 
          onClick={onClearAll}
          className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
        >
          Clear All
        </button>
        <button 
          onClick={onApplyFilter}
          className={`px-4 py-2 text-sm rounded-lg ${TAILWIND_COLORS.BTN_PRIMARY}`}
        >
          Apply Filter
        </button>
      </div>
    </div>
  )
}

// Skills Tags Component
function SkillsTags({ skills }) {
  const displaySkills = skills.slice(0, 3)
  const remainingCount = skills.length - 3
  
  return (
    <div className="flex flex-wrap gap-1">
      {displaySkills.map((skill, index) => (
        <span 
          key={index}
          className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800"
        >
          {skill}
        </span>
      ))}
      {remainingCount > 0 && (
        <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-600">
          +{remainingCount}
        </span>
      )}
    </div>
  )
}

// Progress Bar Component
function ProgressBar({ progress }) {
  return (
    <div className="w-full bg-gray-200 rounded-full h-2">
      <div 
        className="bg-green-500 h-2 rounded-full transition-all duration-300"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  )
}

// Student Table Component
function StudentTable({ students, onSelectAll, selectedStudents, onSelectStudent }) {
  const allSelected = selectedStudents.length === students.length && students.length > 0
  
  return (
    <div className={`${TAILWIND_COLORS.CARD} p-6`}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <LuUsers className="text-gray-600" size={20} />
          <h3 className="font-medium text-gray-800">All Student Profiles</h3>
        </div>
        <div className="relative">
          <LuSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
          <input 
            type="text"
            placeholder="Search by name, email, or student ID..."
            className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm w-80"
          />
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="text-left text-gray-500 border-b">
              <th className="py-3 px-4">
                <input 
                  type="checkbox" 
                  checked={allSelected}
                  onChange={onSelectAll}
                  className="rounded border-gray-300"
                />
              </th>
              <th className="py-3 px-4 font-medium">Name</th>
              <th className="py-3 px-4 font-medium">Course</th>
              <th className="py-3 px-4 font-medium">CGPA</th>
              <th className="py-3 px-4 font-medium">Region</th>
              <th className="py-3 px-4 font-medium">Skills</th>
              <th className="py-3 px-4 font-medium">Progress</th>
              <th className="py-3 px-4 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id} className="border-b hover:bg-gray-50">
                <td className="py-4 px-4">
                  <input 
                    type="checkbox" 
                    checked={selectedStudents.includes(student.id)}
                    onChange={() => onSelectStudent(student.id)}
                    className="rounded border-gray-300"
                  />
                </td>
                <td className="py-4 px-4">
                  <div>
                    <div className="font-medium text-gray-900">{student.name}</div>
                    <div className="text-gray-500 text-xs">{student.email}</div>
                  </div>
                </td>
                <td className="py-4 px-4 text-gray-700">{student.course}</td>
                <td className="py-4 px-4 text-gray-700">{student.cgpa}</td>
                <td className="py-4 px-4 text-gray-700">{student.region}</td>
                <td className="py-4 px-4">
                  <SkillsTags skills={student.skills} />
                </td>
                <td className="py-4 px-4">
                  <div className="w-20">
                    <ProgressBar progress={student.progress} />
                    <div className="text-xs text-gray-500 mt-1">{student.progress}%</div>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <button className="p-1 hover:bg-gray-100 rounded">
                    <LuMoreVertical className="text-gray-400" size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default function StudentManagement() {
  const [filters, setFilters] = useState({})
  const [students, setStudents] = useState([])
  const [selectedStudents, setSelectedStudents] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    // TODO: replace with ApiService
    setStudents([
      { 
        id: 1, 
        name: 'Arjun Sharma', 
        email: 'arjun.sharma@gmail.com', 
        course: 'Electrician',
        cgpa: '8.7/10',
        region: 'India',
        skills: ['React', 'Java', 'Python', 'JavaScript', 'Node.js'],
        progress: 90
      },
      { 
        id: 2, 
        name: 'Priya Patel', 
        email: 'priya.patel@gmail.com', 
        course: 'Plumber',
        cgpa: '9.2/10',
        region: 'India',
        skills: ['Python', 'Django', 'SQL'],
        progress: 85
      },
      { 
        id: 3, 
        name: 'Rahul Kumar', 
        email: 'rahul.kumar@gmail.com', 
        course: 'Carpenter',
        cgpa: '8.1/10',
        region: 'India',
        skills: ['JavaScript', 'React', 'MongoDB', 'Express'],
        progress: 75
      },
      { 
        id: 4, 
        name: 'Sneha Singh', 
        email: 'sneha.singh@gmail.com', 
        course: 'Welder',
        cgpa: '9.5/10',
        region: 'India',
        skills: ['Java', 'Spring Boot', 'MySQL'],
        progress: 95
      },
      { 
        id: 5, 
        name: 'Vikram Joshi', 
        email: 'vikram.joshi@gmail.com', 
        course: 'Electrician',
        cgpa: '8.9/10',
        region: 'India',
        skills: ['React', 'TypeScript', 'GraphQL'],
        progress: 88
      }
    ])
  }, [])

  const filteredStudents = useMemo(() => {
    return students.filter(student => {
      const matchesSearch = !searchTerm || 
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.id.toString().includes(searchTerm)
      
      const matchesCourse = !filters.course || filters.course === 'all' || student.course.toLowerCase() === filters.course
      const matchesSkills = !filters.skills || filters.skills === 'all' || student.skills.some(skill => skill.toLowerCase() === filters.skills)
      
      return matchesSearch && matchesCourse && matchesSkills
    })
  }, [students, filters, searchTerm])

  const handleSelectAll = () => {
    if (selectedStudents.length === filteredStudents.length) {
      setSelectedStudents([])
    } else {
      setSelectedStudents(filteredStudents.map(student => student.id))
    }
  }

  const handleSelectStudent = (studentId) => {
    setSelectedStudents(prev => 
      prev.includes(studentId) 
        ? prev.filter(id => id !== studentId)
        : [...prev, studentId]
    )
  }

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters)
  }

  const handleClearAll = () => {
    setFilters({})
  }

  const handleApplyFilter = () => {
    // Filter logic is already handled in useMemo
    console.log('Applied filters:', filters)
  }

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="space-y-4">
        <div>
          <h1 className={`text-3xl font-bold ${TAILWIND_COLORS.TEXT_PRIMARY}`}>Student Management</h1>
          <p className="text-gray-600 mt-1">Manage student profiles, track progress, and monitor placements.</p>
        </div>
        
        <div className="flex items-center justify-end gap-3">
          <MetricPillRow items={[
            { key: 'export', label: 'Export Data', icon: <LuBarChart3 size={16} />, onClick: () => console.log('Export Data') },
            { key: 'notification', label: 'Send Bulk Notification', icon: <LuMessageSquare size={16} />, onClick: () => console.log('Send Notification') },
            { key: 'add', label: 'Add Student', icon: <LuPlus size={16} />, onClick: () => console.log('Add Student') }
          ]} />
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard 
          title="Total Students" 
          value="15,847" 
          icon={<LuUsers size={24} color={COLORS.PRIMARY} />}
          color={COLORS.PRIMARY}
        />
        <KPICard 
          title="Verified Profiles" 
          value="2,456" 
          icon={<LuCheckCircle size={24} color={COLORS.GREEN_PRIMARY} />}
          color={COLORS.GREEN_PRIMARY}
        />
        <KPICard 
          title="Placement Ready" 
          value="342" 
          icon={<LuFolderOpen size={24} color={COLORS.PRIMARY} />}
          color={COLORS.PRIMARY}
        />
        <KPICard 
          title="Successfully Placed" 
          value="23,891" 
          icon={<LuTarget size={24} color="#8B5CF6" />}
          color="#8B5CF6"
        />
      </div>

      {/* Advanced Filters */}
      <AdvancedFilters 
        filters={filters}
        onFilterChange={handleFilterChange}
        onClearAll={handleClearAll}
        onApplyFilter={handleApplyFilter}
      />

      {/* Student Table */}
      <StudentTable 
        students={filteredStudents}
        onSelectAll={handleSelectAll}
        selectedStudents={selectedStudents}
        onSelectStudent={handleSelectStudent}
      />
    </div>
  )
}
