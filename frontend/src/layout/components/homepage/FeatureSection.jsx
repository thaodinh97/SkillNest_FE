import React from 'react';

const IconPlaceholder = () => (
    <svg className="h-10 w-10 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const features = [
    {
        name: 'Học mọi lúc, mọi nơi',
        description: 'Truy cập các khóa học trên mọi thiết bị, học theo tốc độ của riêng bạn.',
    },
    {
        name: 'Giảng viên chuyên gia',
        description: 'Học hỏi từ những người giỏi nhất trong ngành với kinh nghiệm thực tế.',
    },
    {
        name: 'Hỗ trợ trọn đời',
        description: 'Mua một lần và sở hữu khóa học mãi mãi, nhận hỗ trợ bất cứ khi nào bạn cần.',
    },
];

export default function FeatureSection() {
    return (
        <div className="bg-gray-50 py-16 sm:py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 text-center">
                    Tại sao chọn chúng tôi?
                </h2>
                <div className="mt-12 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
                    {features.map((feature) => (
                        <div key={feature.name} className="text-center p-6 bg-white rounded-lg shadow-sm">
                            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-100 mx-auto">
                                <IconPlaceholder />
                            </div>
                            <h3 className="mt-6 text-lg font-medium text-gray-900">{feature.name}</h3>
                            <p className="mt-2 text-base text-gray-500">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}