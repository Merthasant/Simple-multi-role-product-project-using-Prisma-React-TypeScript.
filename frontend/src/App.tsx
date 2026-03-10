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

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth" element={<AuthPage />}>
          <Route path="sign-in" element={<SignInView />} />
          <Route path="sign-up" element={<SignUpView />} />
        </Route>
        <Route path="/dashboard" element={<DashboardPage />}>
          <Route index element={<DashboardView />} />
          <Route path="search" element={<SearchView />} />
          <Route path="user" element={<UserView />} />
          <Route path="product" element={<ProductView />} />
          <Route path="order" element={<OrderView />} />
        </Route>
      </Routes>
    </Router>
  );
}
