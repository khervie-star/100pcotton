import * as React from "react";
import { Login } from "../../../../Components/auth";
import DashboardLayout from "../../../../Layouts/DashboardLayout";

export default function Auth() {
  return (
    <DashboardLayout>
      <div className="flex w-full h-full items-center justify-center ">
        <Login />
      </div>
    </DashboardLayout>
  );
}
