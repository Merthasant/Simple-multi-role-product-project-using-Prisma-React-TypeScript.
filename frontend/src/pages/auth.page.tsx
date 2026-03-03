import { Outlet } from "react-router-dom";
import { Card } from "../components";

export default function AuthPage() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-md">
        <Card>
          <Outlet />
        </Card>
      </div>
    </div>
  );
}
