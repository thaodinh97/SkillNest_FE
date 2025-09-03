import {BrowserRouter, Route, Routes} from "react-router-dom"
import LoginPage from "../src/features/auth/pages/LoginPage";
import RegisterPage from "../src/features/auth/pages/RegisterPage";
import Dashboard from "../src/features/admin/dashboard/pages/DashboardPage";
import AdminCoursePage from "../src/features/admin/course/pages/CoursePage";
import AdminUserPage from "../src/features/admin/user/pages/UserPage";
import ProtectedRoute from "../src/components/ProtectedRoute";
import CoursePage from "../src/features/user/course/CourePage";
export default function AppRoutes() {
  return (
    <BrowserRouter>
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

            {/*Student */}
            <Route path="/courses"
                  element={
                    <ProtectedRoute allowedRole="ROLE_user">
                      <CoursePage/>
                    </ProtectedRoute>
            }/>
        </Routes>
    </BrowserRouter>
  );
}