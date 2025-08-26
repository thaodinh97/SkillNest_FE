import {BrowserRouter, Route, Routes} from "react-router-dom"
import LoginPage from "../src/features/auth/pages/LoginPage";
import RegisterPage from "../src/features/auth/pages/RegisterPage";
import Dashboard from "../src/features/admin/dashboard/pages/DashboardPage";
import AdminCoursePage from "../src/features/admin/course/pages/CoursePages";
export default function AppRoutes() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/register" element={<RegisterPage/>}/>
            <Route path="/dashboard" element={<Dashboard/>}/>
            <Route path="/courses" element={<AdminCoursePage/>} />
        </Routes>
    </BrowserRouter>
  );
}