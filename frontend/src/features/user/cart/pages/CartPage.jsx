import React from 'react';
import { useCart } from '../context/CartContext'; // Import hook
import { Link } from 'react-router-dom';

export default function CartPage() {
    // Lấy data trực tiếp từ Context
    const { cart, loading, removeItemFromCart } = useCart();

    if (loading) {
        return <div className="p-8 text-center">Đang tải giỏ hàng...</div>;
    }

    if (!cart || cart.items.length === 0) {
        return (
            <div className="p-8 text-center">
                <h1 className="text-2xl font-bold mb-4">Giỏ hàng của bạn đang trống</h1>
                <Link to="/courses" className="text-indigo-600 hover:underline">
                    Tiếp tục mua sắm
                </Link>
            </div>
        );
    }
    const handleDeleteItem = (itemId) => {
        if (loading) return;
        removeItemFromCart(itemId)
    }

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">Giỏ hàng</h1>
            <div className="bg-white shadow-lg rounded-lg">
                {/* Danh sách items */}
                <div className="divide-y divide-gray-200">
                    {cart.items.map((item) => (
                        <div key={item.courseId} className="flex gap-4 p-4">
                            <img
                                src={item.courseThumbnailUrl || 'https://www.skillfinder.com.au/media/wysiwyg/udemylogo.png'}
                                alt={item.courseName}
                                className="w-32 h-20 object-cover rounded"
                            />
                            <div className="flex-grow">
                                <h2 className="font-semibold">{item.courseName}</h2>
                                <p className="text-sm text-gray-500">{item.courseInstructor}</p>
                            </div>
                            <div className="text-right">
                                <p className="font-bold text-indigo-600">
                                    {item.price.toLocaleString()} đ
                                </p>
                                <button
                                    onClick={() => handleDeleteItem(item.id)}
                                    disabled={loading}
                                    className="text-red-500 hover:underline text-sm"
                                >
                                    Xóa
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="border-t border-gray-200 p-4">
                    <div className="flex justify-between text-xl font-bold mb-4">
                        <span>Tổng cộng:</span>
                        <span>{cart.totalPrice.toLocaleString()} đ</span>
                    </div>
                    <button
                        disabled={loading}
                        className="w-full rounded-lg bg-indigo-600 px-4 py-3 text-lg font-semibold text-white hover:bg-indigo-700"
                    >
                        Tiến hành thanh toán
                    </button>
                </div>
            </div>
        </div>
    );
}