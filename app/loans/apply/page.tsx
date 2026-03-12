"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, ArrowLeft, CheckCircle2, Wallet, Coins, Calendar, ShieldCheck } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { toast } from "sonner";

export default function LoanApplyPage() {
    const supabase = createClient();
    const router = useRouter();
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [step, setStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Form State
    const [amount, setAmount] = useState([1000]);
    const [term, setTerm] = useState([1]); // Months

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

    const handleFinalSubmit = async () => {
        setIsSubmitting(true);
        // Simulate processing for visual impact
        await new Promise(resolve => setTimeout(resolve, 2000));

        // In a real app, we would save to Supabase here
        setIsSubmitting(false);
        setStep(4); // Success step
    };

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
            <div className="absolute top-0 -left-10 w-96 h-96 bg-primary/10 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
            <div className="absolute -bottom-10 -right-10 w-96 h-96 bg-accent/10 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>

            <div className="max-w-2xl mx-auto relative z-10">
                {step < 4 && (
                    <Button
                        variant="ghost"
                        className="mb-8 hover:bg-primary/5 text-primary font-bold group"
                        onClick={() => step === 1 ? router.push("/loans") : setStep(step - 1)}
                    >
                        <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                        {step === 1 ? "Back" : "Previous Step"}
                    </Button>
                )}

                {/* Progress Bar */}
                {step < 4 && (
                    <div className="flex gap-2 mb-12">
                        {[1, 2, 3].map((s) => (
                            <div
                                key={s}
                                className={`h-2 flex-1 rounded-full transition-all duration-500 ${s <= step ? "bg-primary shadow-lg shadow-primary/20" : "bg-slate-200"
                                    }`}
                            />
                        ))}
                    </div>
                )}

                <Card className="border-none shadow-2xl glass rounded-3xl overflow-hidden animate-fade-in-up">
                    <CardContent className="p-8 md:p-12">
                        {step === 1 && (
                            <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                                <div className="text-center space-y-2">
                                    <h2 className="text-3xl font-black text-slate-800 italic flex items-center justify-center gap-2">
                                        <Coins className="text-amber-500 h-8 w-8" />
                                        Choose Your Amount
                                    </h2>
                                    <p className="text-slate-500">How much would you like to grow your dreams with?</p>
                                </div>

                                <div className="p-8 bg-slate-50/50 rounded-3xl border border-white/50 space-y-12">
                                    <div className="space-y-6">
                                        <div className="flex justify-between items-end">
                                            <label className="text-sm font-bold text-slate-500 uppercase tracking-widest">Loan Amount</label>
                                            <span className="text-4xl font-black text-primary italic">R{(amount?.[0] ?? 1000).toLocaleString()}</span>
                                        </div>
                                        <Slider
                                            defaultValue={[1000]}
                                            max={5000}
                                            min={500}
                                            step={100}
                                            onValueChange={(vals) => setAmount(Array.isArray(vals) ? vals : [vals])}
                                            className="cursor-pointer"
                                        />
                                        <div className="flex justify-between text-xs font-bold text-slate-400">
                                            <span>R500</span>
                                            <span>R5,000</span>
                                        </div>
                                    </div>

                                    <div className="space-y-6">
                                        <div className="flex justify-between items-end">
                                            <label className="text-sm font-bold text-slate-500 uppercase tracking-widest">Repayment Term</label>
                                            <span className="text-2xl font-black text-slate-700">{(term?.[0] ?? 1)} {(term?.[0] === 1 ? "Month" : "Months")}</span>
                                        </div>
                                        <Slider
                                            defaultValue={[1]}
                                            max={6}
                                            min={1}
                                            step={1}
                                            onValueChange={(vals) => setTerm(Array.isArray(vals) ? vals : [vals])}
                                            className="cursor-pointer"
                                        />
                                        <div className="flex justify-between text-xs font-bold text-slate-400">
                                            <span>1 Month</span>
                                            <span>6 Months</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-primary/5 p-4 rounded-2xl flex justify-between items-center px-6">
                                    <span className="text-slate-600 font-medium">Estimated monthly payment:</span>
                                    <span className="text-xl font-bold text-primary italic">R{((amount?.[0] ?? 0) / (term?.[0] ?? 1) * 1.15).toFixed(2)}</span>
                                </div>

                                <Button
                                    className="w-full h-14 bg-primary hover:bg-primary/90 text-white rounded-2xl text-xl font-black shadow-xl shadow-primary/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
                                    onClick={() => setStep(2)}
                                >
                                    Next Step
                                </Button>
                            </div>
                        )}

                        {step === 2 && (
                            <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                                <div className="text-center space-y-2">
                                    <h2 className="text-3xl font-black text-slate-800 italic flex items-center justify-center gap-2">
                                        <ShieldCheck className="text-green-500 h-8 w-8" />
                                        Verify Income
                                    </h2>
                                    <p className="text-slate-500">Safety first! We need to confirm your ability to repay.</p>
                                </div>

                                <div className="space-y-4">
                                    <Card className="border-2 border-primary/10 bg-white/50 rounded-2xl overflow-hidden shadow-none">
                                        <CardContent className="p-6 flex items-center gap-4">
                                            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                                <Calendar className="h-6 w-6" />
                                            </div>
                                            <div className="flex-1">
                                                <p className="font-bold text-slate-800">Employment confirmed</p>
                                                <p className="text-sm text-slate-500">Status: Part-time / Full-time</p>
                                            </div>
                                            <CheckCircle2 className="text-green-500 h-6 w-6" />
                                        </CardContent>
                                    </Card>

                                    <div className="p-6 bg-slate-50 rounded-2xl space-y-4">
                                        <label className="text-sm font-bold text-slate-700">Bank Statement Upload</label>
                                        <div className="border-2 border-dashed border-slate-200 rounded-xl p-8 text-center bg-white space-y-3">
                                            <p className="text-slate-400 text-sm">Drag and drop your last 3 months PDF banks statements here</p>
                                            <Button variant="outline" className="rounded-lg h-9">Browse Files</Button>
                                        </div>
                                        <p className="text-[10px] text-slate-400 text-center uppercase tracking-widest font-bold">Encrypted & Secure 🔐</p>
                                    </div>
                                </div>

                                <Button
                                    className="w-full h-14 bg-primary hover:bg-primary/90 text-white rounded-2xl text-xl font-black shadow-xl shadow-primary/20"
                                    onClick={() => setStep(3)}
                                >
                                    Ready to Review
                                </Button>
                            </div>
                        )}

                        {step === 3 && (
                            <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                                <div className="text-center space-y-2">
                                    <h2 className="text-3xl font-black text-slate-800 italic">Final Review</h2>
                                    <p className="text-slate-500">Double check everything looks right.</p>
                                </div>

                                <div className="p-8 bg-primary/5 rounded-3xl space-y-6">
                                    <div className="flex justify-between border-b border-primary/10 pb-4">
                                        <span className="text-slate-500 font-bold uppercase text-xs tracking-widest">Loan amount</span>
                                        <span className="text-xl font-black text-primary">R{(amount?.[0] ?? 0).toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between border-b border-primary/10 pb-4">
                                        <span className="text-slate-500 font-bold uppercase text-xs tracking-widest">Duration</span>
                                        <span className="text-xl font-black text-slate-800">{(term?.[0] ?? 0)} Months</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-slate-500 font-bold uppercase text-xs tracking-widest">Total repayment</span>
                                        <span className="text-xl font-black text-slate-800">R{((amount?.[0] ?? 0) * 1.15).toFixed(2)}</span>
                                    </div>
                                </div>

                                <Button
                                    className="w-full h-14 bg-accent hover:bg-accent/90 text-white rounded-2xl text-xl font-black shadow-xl shadow-accent/20"
                                    onClick={handleFinalSubmit}
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? <Loader2 className="animate-spin h-6 w-6" /> : "Submit Application"}
                                </Button>
                            </div>
                        )}

                        {step === 4 && (
                            <div className="text-center space-y-8 animate-in zoom-in duration-500">
                                <div className="flex justify-center">
                                    <div className="h-24 w-24 rounded-full bg-green-100 flex items-center justify-center text-green-600 scale-125">
                                        <CheckCircle2 className="h-16 w-16" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <h2 className="text-4xl font-black text-slate-800 italic">Success!</h2>
                                    <p className="text-slate-500 text-lg">Your application has been received and is being processed by our team.</p>
                                </div>
                                <p className="bg-slate-50 p-6 rounded-2xl text-slate-600 italic">
                                    "Thank you for choosing Chelete! We'll notify you via email and phone the moment your application is approved—usually within an hour."
                                </p>
                                <Button
                                    className="w-full h-14 bg-primary hover:bg-primary/90 text-white rounded-2xl text-xl font-black shadow-xl"
                                    onClick={() => router.push("/dashboard")}
                                >
                                    Go to Dashboard
                                </Button>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
