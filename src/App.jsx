import React from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Navbar from "./components/ui/Navbar";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import DashboardPage from "./pages/DashboardPage";
import NoticePage from "./pages/NoticePage";
import Layout from "./components/Layout";
import SettingPage from "./pages/SettingPage";
import AccountPage from "./pages/AccountPage";
import BillingPage from "./pages/BillingPage";

const NavbarLayout = () => (
  <>
    <Navbar />
    <Outlet />
  </>
);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<NavbarLayout />}>
          <Route path="/" element={<LandingPage />} />
        </Route>
        <Route>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Route>
        <Route path="/dashboard" element={<Layout />}>
          <Route index element={<DashboardPage />} />
          <Route path="notice" element={<NoticePage />} />
          <Route path="setting" element={<SettingPage />} />
          <Route path="account" element={<AccountPage />} />
          <Route path="billing" element={<BillingPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
