import PasswordForm from "../components/account/PasswordForm";
import { Routes, Route } from "react-router-dom";
import ProfileForm from "../components/account/ProfileForm";

const AccountPage = () => {
  return (
    <Routes path="account/*" element={<ProfileForm />}>
      {/* <Route path="email" element={<EmailForm />} /> */}
      <Route path="password" element={<PasswordForm />} />
    </Routes>
  );
};

export default AccountPage;
