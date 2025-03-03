import api from "./api";

// Login va foydalanuvchi interfeyslari

interface LoginData {
    username: string;
    password: string;
}

interface UserProfile {
    firstName: string;
    lastName: string;
    avatar: string;
}

interface LoginResponse {
    token: string;
    user: UserProfile;
    access: string;
    refresh: string;
    user_id: string;
    user_role: string;
}


export const login = async (data: LoginData): Promise<LoginResponse> => {
    try {
        const response = await api.post<LoginResponse>("/api/v1/auth/login/", data);
        const { token, user } = response.data;

        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));

        return response.data;
    } catch (error: any) {
        console.error("Login error:", error.response?.data || error.message);
        throw new Error(error.response?.data?.message || "Login failed");
    }
};

export const updateUser = async (data: UserProfile): Promise<UserProfile> => {
    try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No token found");

        const response = await api.put<UserProfile>("/api/v1/user/me/", data, {
            headers: { Authorization: `Bearer ${token}` },
        });

        const updatedUser = response.data;
        localStorage.setItem("user", JSON.stringify(updatedUser));

        return updatedUser;
    } catch (error: any) {
        console.error("Error updating user:", error.response?.data || error.message);
        throw new Error("Failed to update user profile");
    }
};