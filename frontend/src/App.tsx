import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/home.page";
import AuthPage from "./pages/auth.page";
import SignInView from "./views/auth/sign-in.view";
import SignUpView from "./views/auth/sign-up.view";
import DashboardPage from "./pages/dashboard.page";
import DashboardView from "./views/dashboard/dashboard.view";
import UserView from "./views/dashboard/user.view";
import ProductView from "./views/dashboard/product.view";
import OrderView from "./views/dashboard/order.view";
import SearchView from "./views/dashboard/search.view";
import AdminRoute from "./route/admin.route";
import AuthProvider from "./provider/auth.provider";
import ProtectedRoute from "./route/protected.route";
import GuestRoute from "./route/guest.route";

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route element={<GuestRoute />}>
            <Route path="/" element={<HomePage />} />
            <Route element={<AuthPage />}>
              <Route path="sign-in" element={<SignInView />} />
              <Route path="sign-up" element={<SignUpView />} />
            </Route>
          </Route>
          {/* protected route for main page */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<DashboardPage />}>
              <Route index element={<DashboardView />} />
              <Route path="search" element={<SearchView />} />
              <Route element={<AdminRoute />}>
                <Route path="user" element={<UserView />} />
              </Route>
              <Route path="product" element={<ProductView />} />
              <Route path="order" element={<OrderView />} />
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}
