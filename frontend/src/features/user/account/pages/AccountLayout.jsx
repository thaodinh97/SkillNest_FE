import {NavLink, Outlet} from "react-router-dom";

const accountNavLinks = [
    { name: 'Thông tin cá nhân', path: 'profile' },
    { name: 'Khóa học của tôi', path: 'my-courses' },
    { name: 'Đơn hàng của tôi', path: 'my-orders'},
    { name: 'Lịch sử giao dịch', path: 'payment-history' },
    { name: 'Cài đặt (Đổi mật khẩu)', path: 'settings' },
]

const AccountLayout = () => {
    const getNavLinkClass = ({isActive}) => {
        return `
            block py-2.5 px-4 rounded-md font-medium text-gray-700 transition-colors duration-200
            ${
            isActive
                ? 'bg-blue-600 text-white' : 'hover:bg-gray-100'
        }
            `
    }
    return (
        <div className="max-w-6xl mx-auto my-8 md:my-12">
            <div className="flex flex-col md:flex-row border border-gray-200 rounded-lg overflow-hidden min-h-[70vh] bg-white shadow-sm">
                <aside className="w-full md:w-64 flex-shrink-0 bg-white md:border-r border-b md:border-b-0 border-gray-200">
                    <nav className="p-4 md:p-6">
                        <ul className="flex flex-row md:flex-col gap-2">
                            {accountNavLinks.map((link) => (
                                <li key={link.path} className="flex-1 md:flex-none">
                                    <NavLink to={link.path} className={getNavLinkClass}>
                                        {link.name}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </aside>

                <main className="flex-grow p-6 md:p-8 lg:p-10">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}

export default AccountLayout;