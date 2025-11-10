import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useCourseForm } from "../../../../hooks/course/useCourseForm.js";

export default function CourseForm({formData, handleChange, handleSubmit, course}) {
    const {instructors, fetchInstructors} = useCourseForm()
    useEffect(() => {
        console.log("Instructors state updated:", instructors);
    }, [instructors]);

    useEffect(() => {
        fetchInstructors();
    }, []);
    
    return (
        <form className="space-y-4" onSubmit={(e) => handleSubmit(e, course?.id)}>
            <div>
                <label className="block">Tên khóa học</label>
                <Input
                    type="text"
                    className="border p-2 w-full rounded"
                    value={formData.title}
                    onChange={(e) => handleChange("title", e.target.value)}
                />
            </div>
            <div>
                <label className="block">Giá</label>
                <Input
                    type="number"
                    className="border p-2 w-full rounded"
                    value={formData.price}
                    onChange={(e) => handleChange("price", e.target.value)}
                />
            </div>
            <div>
                <label className="block">Mô tả</label>
                <Input
                    type="text"
                    className="border p-2 w-full rounded"
                    value={formData.description}
                    onChange={(e) => handleChange("description", e.target.value)}
                />
            </div>
            <div>
                <label className="block">Giảng viên</label>
                <Select
                    value={formData.instructorId}
                    onValueChange={(value) => handleChange("instructorId", value)}
                >
                    <SelectTrigger className="w-[240px]">
                        <SelectValue placeholder="Chọn giảng viên"/>
                    </SelectTrigger>
                    <SelectContent>
                        {instructors.map((inst) => (
                            <SelectItem key={inst.id} value={inst.id}>
                                {inst.fullName}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <div>
                <label className="block">Mở bán</label>
                <RadioGroup defaultValue={formData.isPublished ? "true": "false"}
                    onValueChange={value => handleChange("isPublished", value === "true")}
                >
                    <div className="flex items-center gap-3"> 
                        <RadioGroupItem value="true" id="r1"/>
                        <label htmlFor="r1">Mở bán</label>
                    </div>
                    <div className="flex items-center gap-3">
                        <RadioGroupItem value="false" id="r2" />
                        <label htmlFor="r2">Không mở bán</label>
                    </div>
                </RadioGroup>
            </div>
            
            <Button type="submit" className="w-full">
                {course ? "Cập nhật" : "Thêm mới"}
            </Button>
        </form>
    )
}