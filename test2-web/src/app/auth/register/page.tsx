import { Metadata } from "next";
import RegisterForm from "@/components/auth/RegisterForm";
import { constructMetadata } from "@/lib/utils";
import MainLayout from "@/components/layout/MainLayout";

export const metadata: Metadata = constructMetadata({
  title: "Register - TrueSpace",
  description: "Create a new TrueSpace account",
});

export default function RegisterPage() {
  return (
    <MainLayout>
      <div className="min-h-screen flex items-center justify-center px-4 py-20">
        <RegisterForm />
      </div>
    </MainLayout>
  );
} 