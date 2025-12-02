import {useMemo, useState} from "react";
import {useOrder} from "@/features/user/account/hooks/useOrder.js";

const mockOrders = [
    {
        id: 'DH78901',
        date: '2023-10-25T14:30:00Z',
        status: 'completed',
        items: [
            { id: 1, name: 'Khóa học React Nâng Cao', price: 599000, imageUrl: 'https://www.skillfinder.com.au/media/wysiwyg/udemylogo.png' },
            { id: 2, name: 'Khóa học Thiết kế UI/UX', price: 499000, imageUrl: 'https://www.skillfinder.com.au/media/wysiwyg/udemylogo.png' }
        ],
        total: 1098000
    },
    {
        id: 'DH78902',
        date: '2023-10-28T09:15:00Z',
        status: 'processing',
        items: [
            { id: 3, name: 'Khóa học Lập trình Node.js', price: 799000, imageUrl: 'https://www.skillfinder.com.au/media/wysiwyg/udemylogo.png' }
        ],
        total: 799000
    },
    {
        id: 'DH78903',
        date: '2023-10-22T18:00:00Z',
        status: 'cancelled',
        items: [
            { id: 4, name: 'Khóa học Python cho Người mới', price: 399000, imageUrl: 'https://www.skillfinder.com.au/media/wysiwyg/udemylogo.png' }
        ],
        total: 399000
    }
]


const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
};

const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString('vi-VN', options);
};

const getStatusChip = (status) => {
    switch (status) {
        case 'completed':
            return <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">Hoàn thành</span>;
        case 'processing':
            return <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">Đang xử lý</span>;
        case 'cancelled':
            return <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">Đã hủy</span>;
        default:
            return <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">Không rõ</span>;
    }
};

const TABS = [
    { name: 'Tất cả', value: 'all' },
    { name: 'Chưa hoàn tất', value: "pending" },
    { name: 'Hoàn thành', value: 'paid' },
    { name: 'Thất bại', value: 'failed' },
]

const MyOrdersPage = () => {
    const [activeTab, setActiveTab] = useState(TABS[0].value);
    const {orders, loading, error} = useOrder()

    const filteredOrders = useMemo(() => {
        if (!orders) return [];
        if (activeTab === 'all') {
            return orders;
        }
        return orders.filter(order => order.status === activeTab);
    }, [orders, activeTab]);

    if (loading) {
        return <div>Đang tải danh sách đơn hàng...</div>;
    }

    if (error) {
        return <div className="text-red-600">Lỗi: {error}</div>;
    }

    return (
        <div className="my-orders-page">
            {/* Header */}
            <h2 className="text-2xl font-semibold text-gray-900">
                Đơn hàng của tôi
            </h2>
            <p className="mt-1 text-sm text-gray-500 border-b border-gray-200 pb-6">
                Theo dõi tất cả các đơn hàng đã đặt của bạn.
            </p>

            <nav className="mt-6 flex flex-wrap gap-2 border-b border-gray-200 pb-4">
                {TABS.map((tab) => (
                    <button
                        key={tab.value}
                        onClick={() => setActiveTab(tab.value)}
                        className={`
                            px-4 py-2 rounded-md font-medium text-sm transition-colors duration-200
                            ${activeTab === tab.value
                            ? 'bg-blue-600 text-white'
                            : 'text-gray-600 hover:bg-gray-100'
                        }
                        `}
                    >
                        {tab.name}
                    </button>
                ))}
            </nav>

            <div className="mt-6 space-y-4">
                {filteredOrders.length > 0 ? (
                    filteredOrders.map((order) => (
                        <div key={order.id} className="border border-gray-200 rounded-lg shadow-sm overflow-hidden bg-white">
                            <div className="flex flex-col md:flex-row justify-between md:items-center gap-2 p-4 bg-gray-50 border-b border-gray-200">
                                <div>
                                    <h3 className="font-semibold text-gray-800">
                                        Mã đơn: <span className="text-blue-600">{order.id}</span>
                                    </h3>
                                    <p className="text-sm text-gray-500">
                                        Ngày đặt: {formatDate(order.createdAt)}
                                    </p>
                                </div>
                                <div className="flex-shrink-0">
                                    {getStatusChip(order.status)}
                                </div>
                            </div>

                            <div className="p-4 space-y-3">
                                {order.orderItems.map((item) => (
                                    <div key={item.id} className="flex items-center gap-4">
                                        <img
                                            src={item.courseThumbnail || "https://www.skillfinder.com.au/media/wysiwyg/udemylogo.png"}
                                            alt={item.courseName}
                                            className="w-20 h-12 object-cover rounded-md flex-shrink-0"
                                        />
                                        <div className="flex-grow">
                                            <p className="font-medium text-gray-900">{item.courseName}</p>
                                        </div>
                                        <div className="text-right flex-shrink-0">
                                            <p className="font-medium text-gray-800">{formatCurrency(item.price)}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Card Footer - Tổng tiền */}
                            <div className="p-4 bg-gray-50 border-t border-gray-200 text-right">
                                <span className="text-sm text-gray-600">Tổng cộng: </span>
                                <span className="text-lg font-semibold text-gray-900">{formatCurrency(order.totalPrice)}</span>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-10 px-6 bg-gray-50 rounded-lg">
                        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        <h3 className="mt-2 text-sm font-medium text-gray-900">Không tìm thấy đơn hàng</h3>
                        <p className="mt-1 text-sm text-gray-500">
                            Bạn chưa có đơn hàng nào thuộc trạng thái này.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyOrdersPage;