'use client';

import { useAuth } from "@/context/AuthContext";
import Dashboard from "@/components/Dashboard";
import LandingPage from "@/components/LandingPage";

export default function Home() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return user ? <Dashboard /> : <LandingPage />;
}
