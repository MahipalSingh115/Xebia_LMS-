import { Routes, Route, Navigate } from "react-router-dom";
import Landing from "@/features/landing/pages/Landing";
import Login from "@/features/auth/pages/Login";

// Manager features
import ManagerLayout from "@/app/layouts/ManagerLayout";
import ManagerDashboard from "@/features/manager/pages/ManagerDashboard";
import LearningDashboard from "@/features/manager/pages/LearningDashboard";

import CoursesManagement from "@/features/manager/pages/CoursesManagement";
import ReportsAnalytics from "@/features/manager/pages/ReportsAnalytics";
import CategoriesManagement from "@/features/manager/pages/CategoriesManagement";
import TrainersManagement from "@/features/manager/pages/TrainersManagement";
import LearnersManagement from "@/features/manager/pages/LearnersManagement";
import Assessments from "@/features/manager/pages/Assessments";
import ManagerSettings from "@/features/manager/pages/Settings";
import BatchManagement from "@/features/manager/pages/BatchManagement";
import ApprovalCenter from "@/features/manager/pages/ApprovalCenter";

// Admin features
import Dashboard from "@/features/admin/pages/Dashboard";
import Learners from "@/features/admin/pages/Learners";
import Settings from "@/features/admin/pages/Settings";

// Categories Feature
import Categories from "@/features/categories/pages/Categories";
import CategoryDetail from "@/features/categories/pages/CategoryDetail";
import CreateCategory from "@/features/categories/pages/CreateCategory";

// Courses Feature
import Courses from "@/features/courses/pages/Courses";
import CreateCourse from "@/features/courses/pages/CreateCourse";
import CurriculumBuilder from "@/features/courses/pages/CurriculumBuilder";

// Modules Feature
import ModuleManagement from "@/features/modules/pages/Modules";

// Content Feature
import ContentLibrary from "@/features/content/pages/ContentLibrary";

// Assignments Feature
import ManagerAssignmentDashboard from "@/features/assignments/pages/ManagerAssignmentDashboard";
import CreateAssignment from "@/features/assignments/pages/CreateAssignment";
import SubmissionReview from "@/features/assignments/pages/SubmissionReview";
import Gradebook from "@/features/assignments/pages/Gradebook";
import StudentAssignmentDashboard from "@/features/assignments/pages/StudentAssignmentDashboard";
import StudentAssignmentDetails from "@/features/assignments/pages/StudentAssignmentDetails";
import StudentMySubmissions from "@/features/assignments/pages/StudentMySubmissions";
import StudentAssignmentResult from "@/features/assignments/pages/StudentAssignmentResult";

// Quizzes Feature
import QuizDashboard from "@/features/quizzes/pages/QuizDashboard";
import ImportQuiz from "@/features/quizzes/pages/ImportQuiz";
import StudentQuizDashboard from "@/features/quizzes/pages/StudentQuizDashboard";
import StudentQuizPlayer from "@/features/quizzes/pages/StudentQuizPlayer";
import StudentQuizResult from "@/features/quizzes/pages/StudentQuizResult";

// Batches Feature
import BatchDashboard from "@/features/batches/pages/BatchDashboard";
import CreateBatch from "@/features/batches/pages/CreateBatch";

// Trainer Feature
import TrainerDashboard from "@/features/trainer/pages/TrainerDashboard";

// Events Feature
import EventsManagement from "@/features/events/pages/EventsManagement";
import CreateEvent from "@/features/events/pages/CreateEvent";
import EventRegistrations from "@/features/events/pages/EventRegistrations";
import EventsCatalog from "@/features/events/pages/EventsCatalog";
import EventDetail from "@/features/events/pages/EventDetail";

// Analytics Feature
import {
  ExecutiveSummary,
  TrainingEffectiveness,
  ProjectLearningInvestment,
  FresherJourney,
  SkillGap,
  PredictiveAnalytics,
  LearningCoverage,
  LearningHours,
  LearningCategories,
  LearningTrends,
  AITransformation,
  Certifications,
  FlagshipPrograms,
  LearningChampions
} from "@/features/analytics/pages";

import StudentLayout from "@/app/layouts/StudentLayout";
import AnalyticsExplorerLayout from "@/features/analytics/components/layout/AnalyticsExplorerLayout";

// Student Feature Pages
import {
  StudentDashboard,
  StudentCourses,
  StudentCalendar,
  StudentAssessments,
  StudentGrades,
  StudentAnalytics,
  StudentProfile,
  StudentSettings,
  StudentDownloads,
  StudentAssistant,
  StudentNotifications
} from "@/features/student/pages";

// Student Course Detail Pages
import StudentCourseOverview from "@/features/student/pages/StudentCourseOverview";
import StudentModuleDetail from "@/features/student/pages/StudentModuleDetail";
import StudentLessonDetail from "@/features/student/pages/StudentLessonDetail";
import StudentCourseCompletion from "@/features/student/pages/StudentCourseCompletion";

// Additional Portal Notifications Pages
import AdminNotifications from "@/features/admin/pages/AdminNotifications";
import ManagerNotifications from "@/features/manager/pages/ManagerNotifications";
import TrainerNotifications from "@/features/trainer/pages/TrainerNotifications";
 
function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      
      {/* Manager Console routes */}
      <Route path="/manager" element={<ManagerLayout />}>
        <Route index element={<ManagerDashboard />} />
        <Route path="learning" element={<LearningDashboard />} />

        <Route path="courses" element={<CoursesManagement />} />
        <Route path="analytics" element={<ReportsAnalytics />} />
        <Route path="categories" element={<CategoriesManagement />} />
        <Route path="trainers" element={<TrainersManagement />} />
        <Route path="learners" element={<LearnersManagement />} />
        <Route path="assessments" element={<Assessments />} />
        <Route path="settings" element={<ManagerSettings />} />
        <Route path="batches" element={<BatchManagement />} />
        <Route path="approvals" element={<ApprovalCenter />} />
        <Route path="profile" element={<StudentProfile />} />
        <Route path="notifications" element={<ManagerNotifications />} />
      </Route>

      <Route path="/admin" element={<Dashboard />} />
      <Route path="/admin/profile" element={<StudentProfile />} />
      <Route path="/admin/notifications" element={<AdminNotifications />} />

      {/* Admin pages */}
      <Route path="/learners" element={<Learners />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/admin/events" element={<EventsManagement />} />
      <Route path="/admin/events/create" element={<CreateEvent />} />
      <Route path="/admin/events/edit/:id" element={<CreateEvent />} />
      <Route path="/admin/events/:id/registrations" element={<EventRegistrations />} />

      {/* Categories */}
      <Route path="/categories" element={<Categories />} />
      <Route path="/categories/create" element={<CreateCategory />} />
      <Route path="/categories/:id" element={<CategoryDetail />} />

      {/* Courses */}
      <Route path="/courses" element={<Courses />} />
      <Route path="/courses/create" element={<CreateCourse />} />
      <Route path="/courses/:id/edit" element={<CreateCourse />} />
      <Route
        path="/courses/:id/curriculum"
        element={<CurriculumBuilder />}
      />

      {/* Module Management */}
      <Route path="/module-management" element={<ModuleManagement />} />
      <Route path="/content-library" element={<ContentLibrary />} />

      {/* Trainer/Manager Routes */}
      <Route path="/trainer" element={<TrainerDashboard />} />
      <Route path="/trainer/assignments" element={<ManagerAssignmentDashboard />} />
      <Route path="/trainer/assignments/create" element={<CreateAssignment />} />
      <Route path="/trainer/assignments/edit/:id" element={<CreateAssignment />} />
      <Route path="/trainer/assignments/review/:submissionId" element={<SubmissionReview />} />
      <Route path="/trainer/gradebook" element={<Gradebook />} />
      <Route path="/trainer/quizzes" element={<QuizDashboard />} />
      <Route path="/trainer/quizzes/import" element={<ImportQuiz />} />
      <Route path="/trainer/batches" element={<BatchDashboard />} />
      <Route path="/trainer/batches/create" element={<CreateBatch />} />
      <Route path="/trainer/batches/edit/:id" element={<CreateBatch />} />
      <Route path="/trainer/profile" element={<StudentProfile />} />
      <Route path="/trainer/events" element={<EventsCatalog />} />
      <Route path="/trainer/events/:id" element={<EventDetail />} />
      <Route path="/trainer/notifications" element={<TrainerNotifications />} />

      {/* ── Student Portal (sidebar layout) ── */}
      <Route path="/student" element={<StudentLayout />}>
        <Route index element={<StudentDashboard />} />
        <Route path="courses" element={<StudentCourses />} />
        <Route path="courses/:courseId" element={<StudentCourseOverview />} />
        <Route path="courses/:courseId/completed" element={<StudentCourseCompletion />} />
        <Route path="courses/:courseId/modules/:moduleId" element={<StudentModuleDetail />} />
        <Route path="courses/:courseId/modules/:moduleId/lessons/:lessonId" element={<StudentLessonDetail />} />
        <Route path="calendar" element={<StudentCalendar />} />
        <Route path="assessments" element={<StudentAssessments />} />
        <Route path="assignments" element={<StudentAssessments />} />
        <Route path="assignments/:id" element={<StudentAssignmentDetails />} />
        <Route path="assignments/:id/submissions" element={<StudentMySubmissions />} />
        <Route path="assignments/:id/result" element={<StudentAssignmentResult />} />
        <Route path="quizzes" element={<StudentAssessments />} />
        <Route path="quizzes/:id/result" element={<StudentQuizResult />} />
        <Route path="grades" element={<StudentGrades />} />
        <Route path="analytics" element={<StudentAnalytics />} />
        <Route path="downloads" element={<StudentDownloads />} />
        <Route path="assistant" element={<StudentAssistant />} />
        <Route path="notifications" element={<StudentNotifications />} />
        <Route path="profile" element={<StudentProfile />} />
        <Route path="settings" element={<StudentSettings />} />
        <Route path="events" element={<EventsCatalog />} />
        <Route path="events/:id" element={<EventDetail />} />
      </Route>

      {/* Quiz Player */}
      <Route path="/student/quizzes/:id/play" element={<StudentQuizPlayer />} />

      {/* Backward Compatibility */}

      <Route path="/modules" element={<ModuleManagement />} />
      <Route path="/curriculum" element={<CurriculumBuilder />} />
      <Route path="/content-builder" element={<ContentLibrary />} />

      {/* ── Analytics Explorer Wrapper ── */}
      <Route path="/analytics" element={<AnalyticsExplorerLayout />}>
        <Route index element={<Navigate to="executive-summary" replace />} />
        <Route path="executive-summary" element={<ExecutiveSummary />} />
        <Route path="training-effectiveness" element={<TrainingEffectiveness />} />
        <Route path="project-learning-investment" element={<ProjectLearningInvestment />} />
        <Route path="fresher-journey" element={<FresherJourney />} />
        <Route path="skill-gap" element={<SkillGap />} />
        <Route path="predictive-analytics" element={<PredictiveAnalytics />} />
        <Route path="learning/coverage" element={<LearningCoverage />} />
        <Route path="learning/hours" element={<LearningHours />} />
        <Route path="learning/categories" element={<LearningCategories />} />
        <Route path="learning/trends" element={<LearningTrends />} />
        <Route path="ai-transformation" element={<AITransformation />} />
        <Route path="certifications" element={<Certifications />} />
        <Route path="flagship-programs" element={<FlagshipPrograms />} />
        <Route path="learning-champions" element={<LearningChampions />} />
      </Route>

      {/* Legacy Redirects for Backwards Compatibility */}
      <Route path="/executive-summary" element={<Navigate to="/analytics/executive-summary" replace />} />
      <Route path="/training-effectiveness" element={<Navigate to="/analytics/training-effectiveness" replace />} />
      <Route path="/project-learning-investment" element={<Navigate to="/analytics/project-learning-investment" replace />} />
      <Route path="/fresher-journey" element={<Navigate to="/analytics/fresher-journey" replace />} />
      <Route path="/skill-gap" element={<Navigate to="/analytics/skill-gap" replace />} />
      <Route path="/predictive-analytics" element={<Navigate to="/analytics/predictive-analytics" replace />} />
      <Route path="/learning/coverage" element={<Navigate to="/analytics/learning/coverage" replace />} />
      <Route path="/learning/hours" element={<Navigate to="/analytics/learning/hours" replace />} />
      <Route path="/learning/categories" element={<Navigate to="/analytics/learning/categories" replace />} />
      <Route path="/learning/trends" element={<Navigate to="/analytics/learning/trends" replace />} />
      <Route path="/ai-transformation" element={<Navigate to="/analytics/ai-transformation" replace />} />
      <Route path="/certifications" element={<Navigate to="/analytics/certifications" replace />} />
      <Route path="/flagship-programs" element={<Navigate to="/analytics/flagship-programs" replace />} />
      <Route path="/learning-champions" element={<Navigate to="/analytics/learning-champions" replace />} />

    </Routes>
  );
}

/* ─── Placeholder for sub-pages that don't exist yet ─── */
function PlaceholderPage({ title, description }) {
  return (
    <div className="flex items-center justify-center min-h-[70vh]">
      <div className="text-center max-w-[400px] mx-auto px-6">
        <div className="w-14 h-14 rounded-2xl bg-[#6C1D5F]/5 border border-[#6C1D5F]/10 flex items-center justify-center mx-auto mb-5">
          <span className="text-2xl">🚧</span>
        </div>
        <h2 className="text-[18px] font-bold text-slate-800 mb-1.5">{title}</h2>
        <p className="text-[13px] text-slate-400 leading-relaxed">{description}</p>
        <p className="text-[11px] text-slate-300 mt-4 font-medium">Coming soon</p>
      </div>
    </div>
  );
}

export default App;