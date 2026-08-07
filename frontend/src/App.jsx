import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { Loader } from "lucide-react";

import Navbar from "./components/Navbar";

import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import SettingsPage from "./pages/SettingsPage";
import ProfilePage from "./pages/ProfilePage";

import useAuthStore from "./store/useAuthStore";

function App() {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  console.log("authUser:", authUser);

  if (isCheckingAuth && !authUser) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <Navbar />

      <Routes>
        <Route
          path="/"
          element={authUser ? <HomePage /> : <LoginPage />}
        />

        <Route
          path="/signup"
          element={!authUser ? <SignUpPage /> : <HomePage />}
        />

        <Route
          path="/login"
          element={!authUser ? <LoginPage /> : <HomePage />}
        />

        <Route
          path="/settings"
          element={authUser ? <SettingsPage /> : <LoginPage />}
        />

        <Route
          path="/profile"
          element={authUser ? <ProfilePage /> : <LoginPage />}
        />
      </Routes>
    </div>
  );
}

export default App;