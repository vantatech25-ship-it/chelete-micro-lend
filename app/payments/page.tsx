"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, ArrowLeft, History, CreditCard } from "lucide-react";

export default function PaymentsPage() {
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
            <div className="absolute -bottom-8 -left-4 w-72 h-72 bg-blue-300/10 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
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
                        <div className="h-12 w-12 rounded-2xl bg-accent/10 flex items-center justify-center text-accent">
                            <History className="h-7 w-7" />
                        </div>
                        Payments & History
                    </h1>
                    <p className="text-slate-500 mt-2 text-lg">Manage your repayments and track your financial growth.</p>
                </header>

                <div className="space-y-8 animate-fade-in-up">
                    <Card className="border-none shadow-2xl glass p-8 rounded-3xl text-center">
                        <div className="h-20 w-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 text-primary">
                            <CreditCard className="h-10 w-10" />
                        </div>
                        <h2 className="text-2xl font-bold text-slate-800">No Active Payments</h2>
                        <p className="text-slate-500 mt-2 max-w-sm mx-auto">
                            You don't have any pending payments at the moment. Your payment history will appear here once you take your first loan.
                        </p>
                        <Button 
                            className="mt-8 bg-primary hover:bg-primary/90 text-white rounded-xl h-12 px-8 font-bold"
                            onClick={() => router.push("/loans")}
                        >
                            View Loan Offers
                        </Button>
                    </Card>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-6 bg-white/50 backdrop-blur-sm rounded-2xl border border-slate-100 italic text-slate-400 text-center">
                            Upcoming Installments will show here
                        </div>
                        <div className="p-6 bg-white/50 backdrop-blur-sm rounded-2xl border border-slate-100 italic text-slate-400 text-center">
                            Completed Payments will show here
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
