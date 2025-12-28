import { useState } from "react";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import authApi from "@/apis/auth.js";
import {toast} from "react-toastify";

export default function RegisterPage() {
    const [form, setForm] = useState({
        fullName: "",
        email: "",
        phoneNumber: "",
        dob: "",
        password: "",
        confirmPassword: ""
    })
    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value})
    }

    const handleRegister = (e) => {
        e.preventDefault()
        try {
            const res = authApi.register(form)
            if (res.code === 1000)
            {
                window.location.href = "/login"
            }
            toast.success("Register successfully!")
        }
        catch (error) {
            toast.error(`Error occurs ${error}`)
        }
    }
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
                <h2 className="text-2xl font-bold text-center mb-6">Register</h2>
                <form onSubmit={handleRegister} className="w-full flex flex-col gap-4">
                    <Input
                        label="Full name"
                        name="fullName"
                        value={form.fullName}
                        onChange={handleChange}
                        placeholder="Enter your full name"
                    />
                    <Input
                        label="Email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                    />
                    <Input
                        label="Phone number"
                        name="phoneNumber"
                        value={form.phoneNumber}
                        onChange={handleChange}
                        placeholder="Enter your phone number"
                    />
                    <Input
                        type="date"
                        name="dob"
                        value={form.dob}
                        onChange={handleChange}
                    />
                    <Input
                        label="Mật khẩu"
                        type="password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        placeholder="Nhập mật khẩu"
                    />
                    <Input
                        label="Xác nhận mật khẩu"
                        type="password"
                        name="confirmPassword"
                        value={form.confirmPassword}
                        onChange={handleChange}
                        placeholder="Nhập lại mật khẩu"
                    />
                    <Button 
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition"
                    >
                        Sign up
                    </Button>
                </form>
                <p className="text-sm text-center mt-4">
                    Đã có tài khoản?{" "}
                    <a href="/login" className="text-blue-600 hover:underline">
                        Đăng nhập
                    </a>
                </p>
            </div>
        </div>
    )
}