import { StatCard } from "../../components";

export default function DashboardView() {
  return (
    <div>
      <h3 className="text-2xl font-bold mb-6">Dashboard Overview</h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard label="Total Users" value="0" color="blue" />
        <StatCard label="Total Products" value="0" color="green" />
        <StatCard label="Total Orders" value="0" color="purple" />
      </div>

      <div className="mt-8">
        <h4 className="text-xl font-bold mb-4">Recent Activity</h4>
        <div className="text-gray-600">
          <p>No recent activity</p>
        </div>
      </div>
    </div>
  );
}
