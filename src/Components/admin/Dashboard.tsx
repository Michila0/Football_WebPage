import React from "react";
import {AdminLayout} from "../../hoc/AdminLayout.tsx";

interface DashboardProps {}
export const Dashboard: React.FC<DashboardProps> = () => {

    return(
        <AdminLayout title={"Dashboard"}>
            <div className="user_dashboard">
                <div>
                    This is your dashboard
                </div>
            </div>
        </AdminLayout>
    )
}