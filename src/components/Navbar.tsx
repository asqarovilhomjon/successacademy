import { Layout, Avatar, Dropdown, MenuProps, message } from "antd";
import { FaBell, FaSearch, FaRegUser, FaCoins } from "react-icons/fa";
import { TbMessage2Exclamation } from "react-icons/tb";
import { LuSettings2 } from "react-icons/lu";
import { IoIosLogOut } from "react-icons/io";
import { LiaSpinnerSolid } from "react-icons/lia";
import img from "../assets/MyDay.svg";
import { useNavigate, useLocation } from "react-router-dom";
import { useGetUserQuery } from "../services/Service";
import { AiOutlinePlusSquare } from "react-icons/ai";
import { TbSquareAsterisk } from "react-icons/tb";
import { FaRegClock } from "react-icons/fa";

const { Header } = Layout;

const pageTitles: Record<string, string> = {
    "/dashboard": "Dashboard",
    "/leads": "Board of leads",
    "/clients": "Clients",
    "/groups": "Groups",
    "/courses": "Courses",
    "/personnel": "Personnel",
    "/finance": "Finance",
    "/reports": "Reports",
    "/settings": "Settings"
};

export default function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();
    const { data, isLoading } = useGetUserQuery({});

    const handleLogout = async () => {
        try {
            localStorage.removeItem("token");
            message.success("You have logged out successfully!");
            navigate("/");
        } catch (error) {
            message.error("Logout failed. Please try again later.");
        }
    };

    const menuItems: MenuProps["items"] = [
        { key: "1", icon: <FaRegUser />, label: "Profil", onClick: () => navigate("/profile") },
        { key: "2", icon: <FaCoins />, label: "Billing", onClick: () => console.log("Billing clicked") },
        { key: "3", icon: <TbMessage2Exclamation />, label: "Technique support", onClick: () => console.log("Support clicked") },
        { key: "4", icon: <LuSettings2 />, label: "Settings", onClick: () => console.log("Settings clicked") },
        { key: "5", icon: <IoIosLogOut />, label: "Log out", danger: true, onClick: handleLogout },
    ];

    return (
        <Header className="sticky top-0 left-0 z-10 !bg-white shadow-md px-6 py-2">
            <div className="flex justify-between items-center">
                <div className="flex items-center">
                    <div className="left-0 hover:cursor-pointer" onClick={() => navigate("/dashboard")}> 
                        <img src={img} alt="Logo" />
                    </div>
                    {pageTitles[location.pathname] && (
                        <span className="ml-20 text-lg font-semibold text-gray-700">{pageTitles[location.pathname]}</span>
                    )}
                </div>

                <div className="relative w-[345px] ml-[200px]">
                    <FaSearch className="absolute left-5 top-7 text-gray-500 text-xs" />
                    <input
                        type="text"
                        placeholder="Global search"
                        className="w-full h-10 pl-10 pr-4 border text-xs rounded-lg focus:outline-none border-none p-2 bg-[#F3F4F7] focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="flex items-center ml-[100px] gap-[12px] opacity-55">
                    <AiOutlinePlusSquare className="text-xl cursor-pointer text-gray-600 hover:text-blue-500" />
                    <TbSquareAsterisk className="text-xl cursor-pointer text-gray-600 hover:text-blue-500" />
                    <FaRegClock className="text-xl cursor-pointer text-gray-600 hover:text-blue-500" />
                    <FaBell className="text-xl cursor-pointer text-gray-600 hover:text-blue-500" />
                </div>

                <div className="flex items-center gap-4">
                    {isLoading ? (
                        <span className="loading-icon">
                            <LiaSpinnerSolid size={24} color="#4e31cc" />
                        </span>
                    ) : (
                        data && (
                            <Dropdown menu={{ items: menuItems }} trigger={["click"]}>
                                <div className="flex items-end mt-[-20px] cursor-pointer">
                                    <Avatar src={data.profile_photo} size="large">
                                        {data.first_name ? data.first_name[0].toUpperCase() : "N"}
                                    </Avatar>
                                    <div className="ml-2 items-center flex flex-col">
                                        <div className="font-medium text-blue-600">
                                            {data.last_name}.{data.first_name?.charAt(0).toUpperCase()}
                                        </div>
                                        <p className="text-sm mt-[-23px] text-gray-500">
                                            {data.user?.user_role}
                                        </p>
                                    </div>
                                </div>
                            </Dropdown>
                        )
                    )}
                </div>
            </div>

            <style>
                {`
                    .loading-icon {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        animation: spin 1s linear infinite;
                    }

                    @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                `}
            </style>
        </Header>
    );
}
