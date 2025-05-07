"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuth } from "@/providers/AuthProvider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { Loader2, Check, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

const promoCodeSchema = z.object({
  code: z.string().min(1, "Promo code is required"),
});

type PromoCodeFormValues = z.infer<typeof promoCodeSchema>;

export default function PromoCodeVerification() {
  const { checkPromoCode } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [verificationResult, setVerificationResult] = useState<
    "idle" | "success" | "error"
  >("idle");
  const router = useRouter();

  const form = useForm<PromoCodeFormValues>({
    resolver: zodResolver(promoCodeSchema),
    defaultValues: {
      code: "",
    },
  });

  async function onSubmit(values: PromoCodeFormValues) {
    setIsLoading(true);
    try {
      const isValid = await checkPromoCode(values.code);
      
      if (isValid) {
        setVerificationResult("success");
        toast.success("Promo code verified successfully!");
        
        // After a delay, redirect to courses
        setTimeout(() => {
          router.push("/courses");
        }, 2000);
      } else {
        setVerificationResult("error");
        toast.error("Invalid promo code. Please try again.");
      }
    } catch (error) {
      setVerificationResult("error");
      toast.error("Failed to verify promo code");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md mx-auto space-y-6 p-6 bg-card rounded-lg shadow-lg border border-border"
    >
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-bold">Enter Promo Code</h1>
        <p className="text-sm text-muted-foreground">
          Access to courses requires a valid promo code
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Promo Code</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      placeholder="Enter your promo code"
                      {...field}
                      disabled={isLoading || verificationResult === "success"}
                      className={`bg-background pr-10 ${
                        verificationResult === "success"
                          ? "border-green-500"
                          : verificationResult === "error"
                          ? "border-red-500"
                          : ""
                      }`}
                      autoComplete="off"
                    />
                    <AnimatePresence>
                      {verificationResult !== "idle" && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          className="absolute right-2 top-2"
                        >
                          {verificationResult === "success" ? (
                            <Check className="h-5 w-5 text-green-500" />
                          ) : (
                            <X className="h-5 w-5 text-red-500" />
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full"
            disabled={isLoading || verificationResult === "success"}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Verifying...
              </>
            ) : verificationResult === "success" ? (
              <>
                <Check className="mr-2 h-4 w-4" /> Verified
              </>
            ) : (
              "Verify Code"
            )}
          </Button>
        </form>
      </Form>

      {verificationResult === "success" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-sm text-muted-foreground"
        >
          Redirecting you to courses...
        </motion.div>
      )}
    </motion.div>
  );
} 