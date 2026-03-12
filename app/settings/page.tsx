"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, ArrowLeft, Settings, User, Bell, Shield } from "lucide-react";

export default function SettingsPage() {
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
            <div className="absolute top-0 -left-10 w-72 h-72 bg-primary/5 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
            <div className="absolute -bottom-10 -right-10 w-72 h-72 bg-accent/5 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>

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
                        <div className="h-12 w-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-600">
                            <Settings className="h-7 w-7" />
                        </div>
                        Settings & Account
                    </h1>
                    <p className="text-slate-500 mt-2 text-lg">Manage your account preferences and security.</p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-fade-in-up">
                    <aside className="md:col-span-1 space-y-2">
                        <Button variant="ghost" className="w-full justify-start text-primary bg-primary/10 font-bold rounded-xl h-12">
                            <User className="mr-3 h-5 w-5" /> Account Details
                        </Button>
                        <Button variant="ghost" className="w-full justify-start text-slate-500 hover:text-primary hover:bg-primary/5 rounded-xl h-12">
                            <Bell className="mr-3 h-5 w-5" /> Notifications
                        </Button>
                        <Button variant="ghost" className="w-full justify-start text-slate-500 hover:text-primary hover:bg-primary/5 rounded-xl h-12">
                            <Shield className="mr-3 h-5 w-5" /> Privacy & Security
                        </Button>
                    </aside>

                    <main className="md:col-span-2 space-y-6">
                        <Card className="border-none shadow-xl glass rounded-3xl overflow-hidden">
                            <CardHeader className="bg-slate-50 border-b border-slate-100">
                                <CardTitle className="text-sm font-bold text-slate-500 uppercase tracking-widest">Public Profile</CardTitle>
                            </CardHeader>
                            <CardContent className="p-6 space-y-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700">Display Email</label>
                                    <p className="p-3 bg-slate-50 rounded-xl text-slate-600 border border-slate-100">{user?.email}</p>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700">Language</label>
                                    <p className="p-3 bg-slate-50 rounded-xl text-slate-600 border border-slate-100 underline decoration-accent/30">English (South Africa)</p>
                                </div>
                                <Button className="bg-primary hover:bg-primary/90 text-white rounded-xl h-11 px-6 font-bold">
                                    Edit Profile
                                </Button>
                            </CardContent>
                        </Card>

                        <Card className="border-none shadow-xl glass rounded-3xl overflow-hidden opacity-50 grayscale pointer-events-none">
                            <CardHeader className="bg-amber-50 border-b border-amber-100">
                                <CardTitle className="text-sm font-bold text-amber-600 uppercase tracking-widest">Premium Features</CardTitle>
                            </CardHeader>
                            <CardContent className="p-6">
                                <p className="text-sm text-amber-700 italic">Advanced financial insights and priority support coming soon.</p>
                            </CardContent>
                        </Card>
                    </main>
                </div>
            </div>
        </div>
    );
}
