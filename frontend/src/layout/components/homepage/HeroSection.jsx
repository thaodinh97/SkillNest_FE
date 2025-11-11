import React from 'react';
import { Link } from 'react-router-dom';

export default function HeroSection() {
    return (
        <div className="bg-gray-800 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 text-center">

                <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
                    Phát triển kỹ năng, <span className="text-indigo-400">Nâng tầm sự nghiệp</span>
                </h1>

                <p className="mt-6 max-w-md mx-auto text-lg text-gray-300 sm:text-xl md:mt-8">
                    Học hỏi từ các chuyên gia hàng đầu trong ngành. Bắt đầu hành trình của bạn ngay hôm nay.
                </p>

                <div className="mt-8">
                    <Link
                        to="/courses"
                        className="inline-block px-8 py-3 bg-indigo-600 border border-transparent rounded-md
                       text-base font-medium text-white hover:bg-indigo-700
                       md:text-lg"
                    >
                        Xem các khóa học
                    </Link>
                </div>
            </div>
        </div>
    );
}