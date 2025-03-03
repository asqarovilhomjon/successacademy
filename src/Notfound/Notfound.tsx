import SidebarLayout from "../layouts/SidebarLayout"

export default function Notfound() {
    return (
        <div className="fullContainer">
            <SidebarLayout>
            <div className="flex flex-col items-center h-screen">
                <span className="text-[80px] font-bold">404</span>
                <p className="text-[50px] text-gray-600">Not Found</p>
            </div>

            </SidebarLayout>
        </div>
    )
}
