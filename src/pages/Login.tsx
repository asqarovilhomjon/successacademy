import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/auth";
import bgImg from "../assets/bg.svg";
import logo from "../assets/logo 1.svg";
import { Form, Input, Button, Card, message } from "antd";
import { UserOutlined } from "@ant-design/icons";

interface LoginData {
    username: string;
    password: string;
}

interface ErrorResponse {
    response?: {
        status: number;
    };
}

const Login = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate(); 

    const handleLogin = async (values: LoginData) => {
        setLoading(true);
        try {
            const loginResponse = await login(values);
            console.log("Login successful:", loginResponse);

            localStorage.setItem("token", loginResponse.access);
            localStorage.setItem("refresh_token", loginResponse.refresh);
            localStorage.setItem("user_id", loginResponse.user_id);
            localStorage.setItem("user_role", loginResponse.user_role);

            message.success("Login successful!");
            navigate("/dashboard");
        } catch (err: any) {
            const error = err as ErrorResponse; 
            if (error.response && error.response.status === 401) {
                message.error("Incorrect username or password.");
            } else {
                message.error("An error occurred. Please try again later.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-cover bg-center" style={{ backgroundImage: `url(${bgImg})` }}>
            <Card className="w-full max-w-[490px] rounded-3xl shadow-2xs flex flex-col items-center">
                <img src={logo} alt="Logo" className="mx-auto w-[70%] mt-10" />
                <h2 className="text-2xl text-[#334D6E] mt-10 font-medium text-center">Welcome !</h2>
                
                <Form className="w-full min-w-[320px]" layout="vertical" requiredMark={false} onFinish={handleLogin}>
                    <Form.Item
                        name={"username"}
                        label={<span className="text-[#334D6E] font-medium text-[16px]">Login</span>}
                        rules={[
                            { required: true, message: "Please enter your username!" },
                            { min: 6, message: "Username must be at least 6 characters long!" }
                        ]}
                    >
                        <Input 
                            className="min-h-[40px] rounded-[30px]" 
                            placeholder="Input Login" 
                            suffix={<UserOutlined className="opacity-55" />} 
                        />
                    </Form.Item>

                    <div className="flex mb-2 justify-between items-center">
                        <label className="text-[#334D6E] font-medium text-[16px]">Password</label>
                        <a href="#" className="text-sm text-blue-500 opacity-60 hover:underline">Forgot Password?</a>
                    </div>

                    <Form.Item
                        name="password"
                        rules={[
                            { required: true, message: "Please enter your password!" },
                            { min: 8, message: "Password must be at least 8 characters long!" }
                        ]}
                    >
                        <Input.Password className="min-h-[40px] rounded-[40px]" placeholder="Input Password" />
                    </Form.Item>

                    <Form.Item className="flex justify-center">
                        <Button className="min-w-[192px] mb-10 min-h-[48px] rounded-[50px]" type="primary" htmlType="submit" loading={loading}>
                            {loading ? "Loading..." : "Confirm"}
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
};

export default Login;
