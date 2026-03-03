import { Outlet } from "react-router-dom";
import { Navbar, NavCard, Card, Button } from "../components";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar
        title="Dashboard"
        rightContent={
          <a href="/">
            <Button variant="primary" size="md">
              Logout
            </Button>
          </a>
        }
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <NavCard to="/dashboard" title="Dashboard" description="Overview" />
          <NavCard
            to="/dashboard/user"
            title="Users"
            description="Manage users"
          />
          <NavCard
            to="/dashboard/product"
            title="Products"
            description="Manage products"
          />
          <NavCard
            to="/dashboard/order"
            title="Orders"
            description="Manage orders"
          />
        </div>

        <Card>
          <Outlet />
        </Card>
      </div>
    </div>
  );
}
