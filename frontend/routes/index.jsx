import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom"
import LoginPage from "../src/features/auth/pages/LoginPage";
import RegisterPage from "../src/features/auth/pages/RegisterPage";
import Dashboard from "../src/features/admin/dashboard/pages/DashboardPage";
import AdminCoursePage from "../src/features/admin/course/pages/CoursePage";
import AdminUserPage from "../src/features/admin/user/pages/UserPage";
import ProtectedRoute from "../src/components/ProtectedRoute";
import CoursePage from "@/features/user/course/pages/CourePage.jsx";
import AccountLayout from "@/features/user/account/pages/AccountLayout.jsx";
import ProfilePage from "@/features/user/account/pages/ProfilePage.jsx";
import CourseDetailPage from "@/features/user/course/pages/CourseDetailPage.jsx";
import MainLayout from "@/layout/MainLayout.jsx";
import HomePage from "@/pages/HomePage.jsx";
import CartPage from "@/features/user/cart/pages/CartPage.jsx";
import MyOrdersPage from "@/features/user/account/pages/MyOrdersPage.jsx";
import MyCoursePage from "@/features/user/account/pages/MyCoursePage.jsx";
import LearningPage from "../src/features/user/account/pages/LearningPage";
import InstructorProfilePage from "@/features/instructor/account/page/InstructorProfilePage.jsx";
import InstructorLayout from "@/features/instructor/account/layout/InstructorLayout.jsx";
import InstructorDashboardPage from "@/features/instructor/account/page/InstructorDashboardPage.jsx";
import InstructorCoursePage from "@/features/instructor/course/pages/InstructorCoursePage.jsx";
import EditCoursePage from "@/features/instructor/course-editor/pages/EditCoursePage.jsx";
export default function AppRoutes() {
  return (
        <Routes>
            {/*Auth */}
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/register" element={<RegisterPage/>}/>

            {/*Admin */}
            <Route path="/admin/dashboard" 
                  element={
                    <ProtectedRoute allowedRole="ROLE_admin">
                      <Dashboard/>
                    </ProtectedRoute>
                  }/>
            <Route path="/admin/courses" 
                  element={
                    <ProtectedRoute allowedRole="ROLE_admin">
                      <AdminCoursePage/>
                    </ProtectedRoute>
                  } />
            <Route path="/admin/users" 
                  element={
                    <ProtectedRoute allowedRole="ROLE_admin">
                      <AdminUserPage/>
                    </ProtectedRoute>
                  }/>

            {/*Instructor */}
            <Route path="/instructor" element={
                <ProtectedRoute allowedRole="ROLE_instructor">
                    <InstructorLayout />
                </ProtectedRoute>
            }>
                <Route index element={<Navigate to="dashboard" replace />} />

                <Route path="dashboard" element={<InstructorDashboardPage />} />

                <Route path="courses" element={<InstructorCoursePage />} />

                <Route path="courses/:courseId/manage" element={<EditCoursePage />} />

                <Route path="profile" element={<InstructorProfilePage />} />
            </Route>

            {/*Student */}
            <Route element={<MainLayout/>}>
                <Route path="/" element={<HomePage />} />
                <Route path="/cart" element={<CartPage/>}/>
                <Route path="/courses"
                       element={
                           <ProtectedRoute allowedRole="ROLE_user">
                               <CoursePage/>
                           </ProtectedRoute>
                       }/>
                <Route
                    path="/courses/:courseId" element={<CourseDetailPage/>}

                />
                <Route
                    path="/learning/:courseId/lesson/:lessonId"
                    element={
                        <ProtectedRoute allowedRole="ROLE_user">
                            <LearningPage />
                        </ProtectedRoute>
                    }
                />
                <Route path="/account" element={<AccountLayout/>}>
                    <Route index element={<Navigate to="profile" replace />} />

                    <Route path="profile" element={<ProfilePage />} />
                    <Route path="my-orders" element={<MyOrdersPage/>}/>
                    <Route path="my-courses" element={<MyCoursePage/>}/>
                </Route>
            </Route>
        </Routes>
  );
}