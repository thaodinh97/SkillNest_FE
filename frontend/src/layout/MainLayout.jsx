import Header from "@/layout/components/Header.jsx";
import {Outlet} from "react-router-dom";

export default function MainLayout() {
    return (
        <div className="flex flex-col min-h-screen">
            <Header/>
            <main className="flex-grow">
                <Outlet />
            </main>
        </div>
    )
}