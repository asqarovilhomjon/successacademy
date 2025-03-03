import { Layout, Menu } from "antd";
import { ReactNode, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaCog, FaBars } from "react-icons/fa";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { AiOutlineAppstore } from "react-icons/ai";
import { MdOutlineEventNote } from "react-icons/md";
import { IoPersonOutline } from "react-icons/io5";
import { MdGroups } from "react-icons/md";
import { IoMdBook } from "react-icons/io";
import { IoPeopleOutline } from "react-icons/io5";
import { CiBank } from "react-icons/ci";
import { FiPieChart } from "react-icons/fi";

const { Sider, Content } = Layout;

interface SidebarProps {
    children: ReactNode;
}

const iconStyle = { width: 20, height: 20 };
const menuItems = [
    { key: "/dashboard", icon: <AiOutlineAppstore style={iconStyle} />, label: "Dashboard" },
    { key: "/leads", icon: <MdOutlineEventNote style={iconStyle} />, label: "Leads" },
    { key: "/clients", icon: <IoPersonOutline style={iconStyle} />, label: "Clients" },
    { key: "/groups", icon: <MdGroups style={iconStyle} />, label: "Groups" },
    { key: "/courses", icon: <IoMdBook style={iconStyle} />, label: "Courses" },
    { key: "/personnel", icon: <IoPeopleOutline style={iconStyle} />, label: "Personnel" },
    { key: "/finance", icon: <CiBank style={iconStyle} />, label: "Finance" },
    { key: "/reports", icon: <FiPieChart style={iconStyle} />, label: "Reports" },
    { key: "/profile", icon: <FaCog style={iconStyle} />, label: "Settings" },
];

export default function SidebarLayout({ children }: SidebarProps) {
    const [collapsed, setCollapsed] = useState(false);
    const location = useLocation();

    return (
        <Layout className="h-screen flex !bg-white">
            <Sider
                collapsible
                collapsed={collapsed}
                width={250}
                className="h-screen !bg-white flex flex-col justify-between"
            >
                <div className="h-[60px] flex items-center justify-between px-4">
                    {!collapsed && <HiOutlineBuildingOffice2 className="text-gray-600 text-xl ml-5" />}
                    {!collapsed && <h2 className="text-base ml-[-50px] font-semibold text-black">Main branch</h2>}
                    <FaBars 
                        className="text-gray-600 cursor-pointer text-xl" 
                        onClick={() => setCollapsed(!collapsed)} 
                    />
                </div>

                <Menu
                    mode="inline"
                    selectedKeys={[location.pathname]}
                    className="custom-menu"
                    items={menuItems.map((item) => ({
                        key: item.key,
                        icon: item.icon,
                        label: <Link to={item.key} className="py-1 block">{item.label}</Link>,
                    }))}
                />

                <div className="h-[40px] bg-white" />
            </Sider>

            <Layout className="flex-1 overflow-y-auto">
                <Content className="p-6 bg-gray-100 min-h-screen">{children}</Content>
            </Layout>

            <style>
                {`
                    .custom-menu .ant-menu-item {
                        border-radius: 6px;
                        transition: all 0.3s;
                    }

                    .custom-menu .ant-menu-item:hover {
                        background-color: #33A9FF !important;
                        color: white !important;
                    }

                    .custom-menu .ant-menu-item-selected {
                        background-color: #005EEB !important;
                        color: white !important;
                    }
                `}
            </style>
        </Layout>
    );
}
