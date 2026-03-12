"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, ArrowLeft, Wallet, Info } from "lucide-react";

export default function LoansPage() {
    const supabase = createClient();
    const router = useRouter();
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function getUser() {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                router.push("/login");
                return;
            }
            setUser(user);
            setLoading(false);
        }
        getUser();
    }, [supabase, router]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <Loader2 className="h-10 w-10 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background relative overflow-hidden p-8 md:p-12">
            {/* Background Flair Blobs */}
            <div className="absolute top-0 -left-4 w-72 h-72 bg-primary/10 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
            <div className="absolute top-0 -right-4 w-72 h-72 bg-accent/10 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>

            <div className="max-w-4xl mx-auto relative z-10">
                <Button 
                    variant="ghost" 
                    className="mb-8 hover:bg-primary/5 text-primary font-bold group"
                    onClick={() => router.push("/dashboard")}
                >
                    <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" /> Back to Dashboard
                </Button>

                <header className="mb-12 animate-fade-in-up">
                    <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight flex items-center gap-3">
                        <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                            <Wallet className="h-7 w-7" />
                        </div>
                        New Loan Application
                    </h1>
                    <p className="text-slate-500 mt-2 text-lg">Fast, fair, and friendly finance for your future.</p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6 animate-fade-in-up">
                        <Card className="border-none shadow-2xl glass p-6 rounded-3xl">
                            <CardHeader>
                                <CardTitle className="text-xl font-bold text-primary italic">Apply in Minutes</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-start gap-4">
                                    <div className="h-8 w-8 rounded-full bg-accent/20 flex items-center justify-center text-accent shrink-0 font-bold">1</div>
                                    <p className="text-slate-600">Select your loan amount and flexible period.</p>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="h-8 w-8 rounded-full bg-accent/20 flex items-center justify-center text-accent shrink-0 font-bold">2</div>
                                    <p className="text-slate-600">Confirm your details and submit documents.</p>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="h-8 w-8 rounded-full bg-accent/20 flex items-center justify-center text-accent shrink-0 font-bold">3</div>
                                    <p className="text-slate-600">Receive funds instantly once approved.</p>
                                </div>
                                <Button 
                                    className="w-full h-12 bg-primary hover:bg-primary/90 text-white rounded-xl mt-4 font-bold"
                                    onClick={() => router.push("/loans/apply")}
                                >
                                    Start Application
                                </Button>
                            </CardContent>
                        </Card>
                        
                        <div className="bg-blue-50/50 p-4 rounded-2xl border border-blue-100 flex gap-3 text-slate-600 text-sm">
                            <Info className="h-5 w-5 text-primary shrink-0" />
                            <p>You currently qualify for up to <span className="font-bold text-primary">R5,000.00</span> based on your profile.</p>
                        </div>
                    </div>

                    <div className="hidden md:block animate-float">
                        <img 
                            src="/images/loan_app.png" 
                            alt="Loan Application" 
                            className="w-full h-auto drop-shadow-2xl rounded-3xl"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
