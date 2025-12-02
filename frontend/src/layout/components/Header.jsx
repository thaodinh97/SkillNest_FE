import {Link, NavLink, useNavigate} from "react-router-dom";
import {useAuth} from "@/features/auth/context/AuthContext.jsx";
import {FaShoppingCart} from "react-icons/fa";
import {useCart} from "@/features/user/cart/context/CartContext.jsx";

const NavItem = ({to, children}) => {
    return (
        <NavLink
            to={to}
            className={({ isActive }) =>
                `px-3 py-2 rounded-md text-sm font-medium
                ${isActive
                    ? 'bg-gray-900 text-white' // Active
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white' // Inactive
                }`
            }
        >
            {children}
        </NavLink>
    )
}

export default function Header() {
    const {user, setUser} = useAuth()
    const navigate = useNavigate()
    const {itemCount} = useCart()
    return (
        <nav className="bg-gray-800 shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">

                    <div className="flex items-center">
                        <Link to="/" className="flex-shrink-0">
                            <span className="text-white text-xl font-bold">Skill Nest</span>
                        </Link>
                        <div className="hidden md:block">
                            <div className="ml-10 flex items-baseline space-x-4">
                                <NavItem to="/">Trang chủ</NavItem>
                                <NavItem to="/courses">Khóa học</NavItem>
                                {user && user.roles.includes('ROLE_admin') && (
                                    <NavItem to="/admin/dashboard">Admin</NavItem>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Nút Đăng nhập / Profile (Hiển thị dựa trên state 'user') */}
                    <div className="hidden md:block">
                        <div className="ml-4 flex items-center md:ml-6">
                            {user ? (
                                // 3. Đã đăng nhập
                                <div className="flex items-center gap-4">
                                    <Link
                                        to="/account/profile"
                                        className="text-gray-300 hover:text-white font-medium"
                                    >
                                        Chào, {user.fullName}
                                    </Link>
                                    <Link
                                        to="/cart"
                                        className="relative p-2 text-gray-300 hover:text-white"
                                    >
                                        <FaShoppingCart className="h-6 w-6"/>
                                        {itemCount > 0 && (
                                            <span className="absolute top-0 right-0 flex h-5 w-5
                                                             items-center justify-center rounded-full
                                                             bg-indigo-500 text-xs text-white"
                                            >
                                                {itemCount}
                                            </span>
                                        )}
                                    </Link>
                                    <button
                                        className="px-3 py-2 rounded-md text-sm font-medium bg-indigo-600 text-white hover:bg-indigo-700"
                                    >
                                        Đăng xuất
                                    </button>
                                </div>
                            ) : (
                                // 4. Chưa đăng nhập
                                <div className="flex items-center gap-4">
                                    <Link
                                        to="/login"
                                        className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                                    >
                                        Đăng nhập
                                    </Link>
                                    <Link
                                        to="/register"
                                        className="px-3 py-2 rounded-md text-sm font-medium bg-indigo-600 text-white hover:bg-indigo-700"
                                    >
                                        Đăng ký
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="-mr-2 flex md:hidden">
                        <button className="text-gray-400 hover:text-white p-2">
                            {/* Icon Menu */}
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    )
}