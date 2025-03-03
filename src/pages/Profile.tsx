import SidebarLayout from "../layouts/SidebarLayout";
import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { message, Spin } from "antd";
import { useGetUserQuery, useUpdateUserMutation } from "../services/Service";

interface ProfileData {
    first_name: string;
    last_name: string;
    avatar: string;
    phone: string;
}

export default function ProfilePage() {
    const { data, isLoading, refetch } = useGetUserQuery({});
    const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [formData, setFormData] = useState<ProfileData>({
        first_name: "",
        last_name: "",
        avatar: "",
        phone: "+998",
    });

    useEffect(() => {
        if (data) {
            setFormData({
                first_name: data.first_name || "",
                last_name: data.last_name || "",
                avatar: data.profile_photo || "",
                phone: data.phone || "+998",
            });
        }
    }, [data]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            setSelectedFile(file);
            setFormData(prev => ({ ...prev, avatar: URL.createObjectURL(file) }));
        }
    };

    const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.replace(/\D/g, "");
        if (value.length > 12) value = value.slice(0, 12);
        if (!value.startsWith("998")) {
            value = "998" + value;
        }
        setFormData(prev => ({ ...prev, phone: "+" + value }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const formDataToSend = new FormData();
        formDataToSend.append("first_name", formData.first_name);
        formDataToSend.append("last_name", formData.last_name);
        formDataToSend.append("phone", formData.phone);
        
        if (selectedFile) {
            formDataToSend.append("avatar", selectedFile);
        }
        
        try {
            const response = await updateUser(formDataToSend).unwrap();
            message.success("Muvaffaqiyatli saqlandi!");
            setFormData(prev => ({ ...prev, avatar: response.profile_photo }));
            refetch();
        } catch (error) {
            message.error("Saqlashda xatolik yuz berdi.");
        }
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Spin size="large" />
            </div>
        );
    }

    return (
        <div className="fullContainer">
            <SidebarLayout>
                <div className="p-6 bg-white min-w-[1200px] min-h-[510px] rounded-lg shadow-md w-full max-w-lg mx-auto">
                    <h2 className="text-[12px] text-[#192A3E] font-semibold mb-5">Profile</h2>
                    {formData.avatar && (
                        <img src={formData.avatar} alt="Profile" className="w-24 h-24 rounded-[40px] mb-3 object-cover ml-[120px]" />
                    )}
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-[10px] font-medium text-[#334D6E]">File Upload</label>
                            <input type="file" name="avatar" accept="image/*" onChange={handleFileChange} className="mt-1 block w-[330px] p-2 border rounded-md" />
                        </div>
                        <div className="mb-4">
                            <label className="block text-[10px] font-medium text-[#334D6E]">First Name</label>
                            <input type="text" name="first_name" value={formData.first_name} onChange={handleChange} className="mt-1 block w-[330px] p-2 border rounded-md" required />
                        </div>
                        <div className="mb-4">
                            <label className="block text-[10px] font-medium text-[#334D6E]">Last Name</label>
                            <input type="text" name="last_name" value={formData.last_name} onChange={handleChange} className="mt-1 block w-[330px] p-2 border rounded-md" required />
                        </div>
                        <div className="mb-4">
                            <label className="block text-[10px] font-medium text-[#334D6E]">Phone Number</label>
                            <input type="text" inputMode="numeric" value={formData.phone} onChange={handlePhoneChange} className="mt-1 block w-[330px] p-2 border rounded-md"/>
                        </div>
                        <div className="mb-4">
                            <label className="block text-[10px] font-medium text-[#334D6E]">Who is the employee?</label>
                            <input type="text" name="first_name" value={data.user?.user_role} readOnly className="mt-1 block w-[330px] p-2 border rounded-md" required />
                        </div>
                        <div className="flex justify-end space-x-2">
                            <button type="button" className="px-4 py-2 bg-gray-300 rounded-md">Cancel</button>
                            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md" disabled={isUpdating}>{isUpdating ? "Saving..." : "Save"}</button>
                        </div>
                    </form>
                </div>
            </SidebarLayout>
        </div>
    );
}
