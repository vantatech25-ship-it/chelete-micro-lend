"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, LayoutDashboard, User, Wallet, History, LogOut, Zap, ArrowRight, Home } from "lucide-react";
import { toast } from "sonner";

export default function DashboardPage() {
    const supabase = createClient();
    const router = useRouter();
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    const [showWelcome, setShowWelcome] = useState(false);

    useEffect(() => {
        async function getUser() {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                router.push("/login");
                return;
            }
            setUser(user);
            setLoading(false);

            // Show welcome intro only once per session
            const hasSeenWelcome = sessionStorage.getItem("hasSeenWelcome");
            if (!hasSeenWelcome) {
                setShowWelcome(true);
                sessionStorage.setItem("hasSeenWelcome", "true");
            }
        }
        getUser();
    }, [supabase, router]);

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        router.push("/");
        router.refresh();
        toast.success("Logged out successfully");
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <Loader2 className="h-10 w-10 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background relative overflow-hidden">
            {/* Background Flair Blobs */}
            <div className="absolute top-0 -left-4 w-72 h-72 bg-primary/20 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
            <div className="absolute top-0 -right-4 w-72 h-72 bg-accent/20 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-8 left-20 w-72 h-72 bg-blue-300/20 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>

            {/* Welcome Overlay */}
            {showWelcome && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-500">
                    <Card className="w-full max-w-lg mx-4 overflow-hidden border-none shadow-2xl animate-fade-in-up">
                        <div className="relative h-64 bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
                            <img 
                                src="/images/welcome_avatar.png" 
                                alt="Welcome Avatar" 
                                className="h-full object-contain animate-float"
                            />
                        </div>
                        <CardContent className="p-8 text-center space-y-4">
                            <h2 className="text-3xl font-bold text-primary italic">Welcome to Chelete!</h2>
                            <p className="text-slate-600 text-lg">
                                "Hi there! I'm your Chelete guide. I'm so excited to help you grow your dreams today. Let's get started on your application!"
                            </p>
                            <Button 
                                className="w-full h-12 text-lg bg-accent hover:bg-accent/90 rounded-xl mt-4"
                                onClick={() => setShowWelcome(false)}
                            >
                                Let's Go!
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            )}

            {/* Sidebar/Nav */}
            <div className="flex relative z-10">
                <aside className="w-64 bg-white/80 backdrop-blur-md h-screen border-r border-slate-100 hidden md:block sticky top-0">
                    <div className="p-8 flex items-center gap-3">
                        <div className="relative h-12 w-12 overflow-hidden rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 p-0.5 shadow-lg">
                            <img 
                                src="/images/chelete_gold_logo.png" 
                                alt="Chelete Gold Logo" 
                                className="h-full w-full object-contain rounded-xl bg-white"
                            />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-2xl font-black text-primary italic leading-none tracking-tighter">Chelete</span>
                            <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-400">
                                Empowering Your Dreams
                            </span>
                        </div>
                    </div>
                    <nav className="mt-6 px-4 space-y-2">
                        <Button variant="ghost" className="w-full justify-start text-slate-500 hover:text-primary hover:bg-primary/5 rounded-xl h-12" onClick={() => router.push("/")}>
                            <Home className="mr-3 h-5 w-5" /> Home
                        </Button>
                        <Button variant="ghost" className="w-full justify-start text-primary bg-primary/10 font-bold rounded-xl h-12">
                            <LayoutDashboard className="mr-3 h-5 w-5" /> Dashboard
                        </Button>
                        <Button variant="ghost" className="w-full justify-start text-slate-500 hover:text-primary hover:bg-primary/5 rounded-xl h-12" onClick={() => router.push("/profile")}>
                            <User className="mr-3 h-5 w-5" /> Profile
                        </Button>
                        <Button variant="ghost" className="w-full justify-start text-slate-500 hover:text-primary hover:bg-primary/5 rounded-xl h-12" onClick={() => router.push("/loans")}>
                            <Wallet className="mr-3 h-5 w-5" /> Active Loans
                        </Button>
                        <Button variant="ghost" className="w-full justify-start text-slate-500 hover:text-primary hover:bg-primary/5 rounded-xl h-12" onClick={() => router.push("/payments")}>
                            <History className="mr-3 h-5 w-5" /> History
                        </Button>
                        <div className="pt-8 mt-8 border-t border-slate-50">
                            <Button variant="ghost" className="w-full justify-start text-red-500 hover:bg-red-50 rounded-xl h-12" onClick={handleSignOut}>
                                <LogOut className="mr-3 h-5 w-5" /> Sign Out
                            </Button>
                        </div>
                    </nav>
                </aside>

                <main className="flex-1 p-8 md:p-12">
                    <header className="flex justify-between items-center mb-12 animate-fade-in-up">
                        <div>
                            <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
                                Sawubona, <span className="text-primary">{user?.email?.split('@')[0]}!</span> 👋
                            </h1>
                            <p className="text-slate-500 mt-2 text-lg">Your financial journey is looking bright today.</p>
                        </div>
                        <div className="flex gap-2">
                            <Button variant="outline" size="icon" className="md:hidden rounded-full h-12 w-12 border-slate-200" onClick={() => router.push("/")}>
                                <Home className="h-5 w-5 text-slate-600" />
                            </Button>
                            <Button variant="outline" size="icon" className="rounded-full h-12 w-12 border-slate-200" onClick={handleSignOut}>
                                <LogOut className="h-5 w-5 text-red-500" />
                            </Button>
                        </div>
                    </header>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                        <Card className="border-none shadow-2xl bg-primary text-white p-2 rounded-3xl overflow-hidden group cursor-pointer" onClick={() => router.push("/loans")}>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-bold opacity-70 uppercase tracking-widest text-white">Available Credit</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-4xl font-black text-white group-hover:scale-105 transition-transform origin-left">R5,000.00</div>
                                <div className="mt-4 inline-flex items-center px-3 py-1 bg-white/20 rounded-full text-xs font-medium">
                                    <Zap className="h-3 w-3 mr-1 fill-white" /> Ready to use
                                </div>
                            </CardContent>
                        </Card>
                        <Card className="border-none shadow-xl glass p-2 rounded-3xl group cursor-pointer" onClick={() => router.push("/payments")}>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-bold text-slate-400 uppercase tracking-widest">Active Loan</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-4xl font-black text-slate-900 group-hover:scale-105 transition-transform origin-left">R0.00</div>
                                <p className="text-sm mt-4 text-slate-500">No active balance</p>
                            </CardContent>
                        </Card>
                        <Card className="border-none shadow-xl glass p-2 rounded-3xl group cursor-pointer" onClick={() => router.push("/profile")}>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-bold text-slate-400 uppercase tracking-widest">KYC Status</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-black text-accent flex items-center group-hover:scale-105 transition-transform origin-left">
                                    <span className="h-3 w-3 rounded-full bg-accent mr-3 animate-pulse"></span>
                                    Action Required
                                </div>
                                <Button variant="link" className="p-0 h-auto text-sm text-primary font-bold mt-4 hover:no-underline group">
                                    Complete profile <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                </Button>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="space-y-6">
                        <h3 className="text-2xl font-bold text-slate-800">Quick Actions</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            <Button className="h-24 flex flex-col items-center justify-center gap-2 bg-white shadow-sm border border-slate-100 text-slate-700 hover:bg-primary/5 hover:text-primary hover:border-primary/20 transition-all font-bold px-4 rounded-2xl group" onClick={() => router.push("/profile")}>
                                <div className="h-10 w-10 rounded-xl bg-slate-50 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                                    <User className="h-6 w-6" />
                                </div>
                                <span className="text-sm">Verify ID</span>
                            </Button>
                            <Button className="h-24 flex flex-col items-center justify-center gap-2 bg-white shadow-sm border border-slate-100 text-slate-700 hover:bg-primary/5 hover:text-primary hover:border-primary/20 transition-all font-bold px-4 rounded-2xl group" onClick={() => router.push("/loans")}>
                                <div className="h-10 w-10 rounded-xl bg-slate-50 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                                    <Wallet className="h-6 w-6" />
                                </div>
                                <span className="text-sm">New Loan</span>
                            </Button>
                            <Button className="h-24 flex flex-col items-center justify-center gap-2 bg-white shadow-sm border border-slate-100 text-slate-700 hover:bg-primary/5 hover:text-primary hover:border-primary/20 transition-all font-bold px-4 rounded-2xl group" onClick={() => router.push("/payments")}>
                                <div className="h-10 w-10 rounded-xl bg-slate-50 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                                    <History className="h-6 w-6" />
                                </div>
                                <span className="text-sm">Payments</span>
                            </Button>
                            <Button className="h-24 flex flex-col items-center justify-center gap-2 bg-white shadow-sm border border-slate-100 text-slate-700 hover:bg-primary/5 hover:text-primary hover:border-primary/20 transition-all font-bold px-4 rounded-2xl group" onClick={() => router.push("/settings")}>
                                <div className="h-10 w-10 rounded-xl bg-slate-50 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                                    <LayoutDashboard className="h-6 w-6" />
                                </div>
                                <span className="text-sm">Settings</span>
                            </Button>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
