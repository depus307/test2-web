import { Metadata } from "next";
import LoginForm from "@/components/auth/LoginForm";
import { constructMetadata } from "@/lib/utils";
import MainLayout from "@/components/layout/MainLayout";

export const metadata: Metadata = constructMetadata({
  title: "Login - TrueSpace",
  description: "Login to your TrueSpace account",
});

export default function LoginPage() {
  return (
    <MainLayout>
      <div className="min-h-screen flex items-center justify-center px-4 py-20">
        <LoginForm />
      </div>
    </MainLayout>
  );
} 