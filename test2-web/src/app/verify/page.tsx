import { Metadata } from "next";
import PromoCodeVerification from "@/components/auth/PromoCodeVerification";
import { constructMetadata } from "@/lib/utils";
import MainLayout from "@/components/layout/MainLayout";

export const metadata: Metadata = constructMetadata({
  title: "Verify Access - TrueSpace",
  description: "Verify your access to TrueSpace courses",
});

export default function VerifyPage() {
  return (
    <MainLayout>
      <div className="min-h-screen flex items-center justify-center px-4 py-20">
        <PromoCodeVerification />
      </div>
    </MainLayout>
  );
} 