import { useEffect } from "react";
import { useUser } from "../../../hooks/useUser";

export default function ProfilePage() {
  const purchasedCourses = [
    { id: 1, title: "ReactJS Cơ bản" },
    { id: 2, title: "NodeJS Nâng cao" },
  ];

  const {user,getMyInfo} = useUser();
    const fetchMyInfo = async () => {
        const res = await getMyInfo();
        console.log(res);
    }

    useEffect(() => {
        console.log(`User info updated:`, user);
    }, [user]);

    useEffect(() => {
        fetchMyInfo();
    }, []);
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-4xl space-y-6">
        <div className="rounded-2xl bg-white p-6 shadow">
          <h2 className="text-xl font-bold">Thông tin cá nhân</h2>
          <p className="mt-2">Tên: {user.fullName}</p>
          <p>Email: {user.email}</p>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow">
          <h2 className="text-xl font-bold">Khóa học đã mua</h2>
          <ul className="mt-2 list-disc pl-6">
            {purchasedCourses.map(course => (
              <li key={course.id}>{course.title}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
