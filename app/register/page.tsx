"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Loader2, ArrowLeft } from "lucide-react";

// SA Phone validation: starts with 0 or +27, followed by 9 digits
const phoneRegex = /^(\+27|0)[6-8][0-9]{8}$/;

const signUpSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    phone: z.string().refine((val) => phoneRegex.test(val), {
        message: "Invalid South African phone number",
    }),
});

type SignUpValues = z.infer<typeof signUpSchema>;

export default function RegisterPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const supabase = createClient();

    const form = useForm<SignUpValues>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            email: "",
            password: "",
            phone: "",
        },
    });

    async function onSubmit(values: SignUpValues) {
        setIsLoading(true);
        try {
            const { data, error } = await supabase.auth.signUp({
                email: values.email,
                password: values.password,
                options: {
                    data: {
                        phone_number: values.phone,
                    },
                    emailRedirectTo: `${window.location.origin}/auth/callback`,
                },
            });

            if (error) {
                toast.error(error.message);
                return;
            }

            toast.success("Registration successful! Please check your email for verification.");
            router.push("/login?message=Check your email to verify your account");
        } catch (error) {
            toast.error("An unexpected error occurred. Please try again.");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-background p-4 relative overflow-hidden">
            {/* Background Flair Blobs */}
            <div className="absolute top-0 -left-4 w-72 h-72 bg-primary/10 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
            <div className="absolute bottom-0 -right-4 w-72 h-72 bg-accent/10 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>

            <Link href="/" className="absolute top-8 left-8 flex items-center text-sm font-medium text-slate-500 hover:text-primary transition-colors z-20">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
            </Link>

            <Card className="w-full max-w-md shadow-2xl border-none glass rounded-3xl relative z-10 animate-fade-in-up">
                <CardHeader className="space-y-1 text-center pb-8">
                    <div className="flex justify-center mb-4">
                        <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 p-0.5 shadow-lg">
                            <img 
                                src="/images/chelete_gold_logo.png" 
                                alt="Chelete Gold Logo" 
                                className="h-full w-full object-contain rounded-xl bg-white"
                            />
                        </div>
                    </div>
                    <CardTitle className="text-3xl font-black tracking-tight text-primary italic">Create account</CardTitle>
                    <CardDescription className="text-slate-500 text-base">
                        Enter your details to start your application
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="name@example.com"
                                {...form.register("email")}
                                className={form.formState.errors.email ? "border-red-500" : ""}
                            />
                            {form.formState.errors.email && (
                                <p className="text-xs text-red-500">{form.formState.errors.email.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="phone">SA Phone Number</Label>
                            <Input
                                id="phone"
                                type="tel"
                                placeholder="082 123 4567"
                                {...form.register("phone")}
                                className={form.formState.errors.phone ? "border-red-500" : ""}
                            />
                            {form.formState.errors.phone && (
                                <p className="text-xs text-red-500">{form.formState.errors.phone.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                {...form.register("password")}
                                className={`rounded-xl h-11 border-slate-200 focus:border-primary focus:ring-primary/20 transition-all ${form.formState.errors.password ? "border-red-500" : ""}`}
                            />
                            {form.formState.errors.password && (
                                <p className="text-xs text-red-500">{form.formState.errors.password.message}</p>
                            )}
                        </div>

                        <Button type="submit" className="w-full bg-primary hover:bg-primary/90 rounded-xl h-12 text-lg font-bold shadow-lg shadow-primary/20" disabled={isLoading}>
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                    Creating account...
                                </>
                            ) : (
                                "Register"
                            )}
                        </Button>
                    </form>
                </CardContent>
                <CardFooter className="flex flex-col space-y-4 pb-8">
                    <div className="text-sm text-center text-slate-500">
                        Already have an account?{" "}
                        <Link href="/login" className="text-primary font-black hover:underline tracking-tight">
                            Log in
                        </Link>
                    </div>
                    <p className="text-xs text-center text-slate-400 px-4">
                        By clicking register, you agree to our Terms of Service and Privacy Policy.
                    </p>
                </CardFooter>
            </Card>
        </div>
    );
}
