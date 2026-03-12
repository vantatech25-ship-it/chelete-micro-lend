"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

// SA ID Checksum (Luhn-like)
function validateSAID(id: string) {
    if (!/^\d{13}$/.test(id)) return false;

    let total = 0;
    for (let i = 0; i < 12; i++) {
        let digit = parseInt(id[i]);
        if (i % 2 === 0) {
            total += digit;
        } else {
            let double = digit * 2;
            total += double > 9 ? double - 9 : double;
        }
    }

    const checkDigit = (10 - (total % 10)) % 10;
    return checkDigit === parseInt(id[12]);
}

const profileSchema = z.object({
    fullName: z.string().min(3, "Full name is required"),
    idNumber: z.string().length(13, "SA ID must be 13 digits").refine(validateSAID, {
        message: "Invalid South African ID number",
    }),
    address: z.string().min(10, "Full residential address is required"),
    incomeRange: z.string().min(1, "Please select your income range"),
    employmentStatus: z.string().min(1, "Please select your employment status"),
});

type ProfileValues = z.infer<typeof profileSchema>;

export default function ProfilePage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const supabase = createClient();

    const form = useForm<ProfileValues>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            fullName: "",
            idNumber: "",
            address: "",
            incomeRange: "",
            employmentStatus: "",
        },
    });

    useEffect(() => {
        async function checkUser() {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                router.push("/login");
                return;
            }
            setIsLoading(false);
        }
        checkUser();
    }, [supabase, router]);

    async function onSubmit(values: ProfileValues) {
        setIsSubmitting(true);
        try {
            const { data: { user } } = await supabase.auth.getUser();

            // Extract DOB from ID (YYMMDD)
            const year = parseInt(values.idNumber.substring(0, 2));
            const month = values.idNumber.substring(2, 4);
            const day = values.idNumber.substring(4, 6);
            const fullYear = year > 25 ? `19${year}` : `20${year}`;
            const dob = `${fullYear}-${month}-${day}`;

            const { error } = await supabase
                .from("profiles")
                .upsert({
                    id: user?.id,
                    full_name: values.fullName,
                    id_number: values.idNumber,
                    date_of_birth: dob,
                    residential_address: values.address,
                    monthly_income_range: values.incomeRange,
                    employment_status: values.employmentStatus,
                });

            if (error) {
                toast.error(error.message);
                return;
            }

            toast.success("Profile updated successfully!");
            router.push("/dashboard");
        } catch (error) {
            toast.error("An unexpected error occurred.");
        } finally {
            setIsSubmitting(false);
        }
    }

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 py-12 px-4">
            <Card className="max-w-2xl mx-auto shadow-xl">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold">Complete Your Profile</CardTitle>
                    <CardDescription>
                        We need a few more details to verify your identity and check loan eligibility.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="fullName">Full Name (as on ID)</Label>
                            <Input
                                id="fullName"
                                placeholder="John Doe"
                                {...form.register("fullName")}
                            />
                            {form.formState.errors.fullName && (
                                <p className="text-xs text-red-500">{form.formState.errors.fullName.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="idNumber">South African ID Number</Label>
                            <Input
                                id="idNumber"
                                placeholder="XXXXXX XXXXX XX X"
                                maxLength={13}
                                {...form.register("idNumber")}
                            />
                            {form.formState.errors.idNumber && (
                                <p className="text-xs text-red-500">{form.formState.errors.idNumber.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="address">Residential Address</Label>
                            <Input
                                id="address"
                                placeholder="123 Street Name, Suburb, City, Code"
                                {...form.register("address")}
                            />
                            {form.formState.errors.address && (
                                <p className="text-xs text-red-500">{form.formState.errors.address.message}</p>
                            )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label>Monthly Income Range</Label>
                                <Select onValueChange={(val: string | null) => { if (val) form.setValue("incomeRange", val); }}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select income" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="0-3000">R0 - R3,000</SelectItem>
                                        <SelectItem value="3001-5000">R3,001 - R5,000</SelectItem>
                                        <SelectItem value="5001-10000">R5,001 - R10,000</SelectItem>
                                        <SelectItem value="10001-20000">R10,001 - R20,000</SelectItem>
                                        <SelectItem value="20000+">R20,000+</SelectItem>
                                    </SelectContent>
                                </Select>
                                {form.formState.errors.incomeRange && (
                                    <p className="text-xs text-red-500">{form.formState.errors.incomeRange.message}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label>Employment Status</Label>
                                <Select onValueChange={(val: string | null) => { if (val) form.setValue("employmentStatus", val); }}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="full-time">Full-time Employed</SelectItem>
                                        <SelectItem value="part-time">Part-time Employed</SelectItem>
                                        <SelectItem value="self-employed">Self-employed</SelectItem>
                                        <SelectItem value="unemployed">Unemployed</SelectItem>
                                        <SelectItem value="student">Student</SelectItem>
                                    </SelectContent>
                                </Select>
                                {form.formState.errors.employmentStatus && (
                                    <p className="text-xs text-red-500">{form.formState.errors.employmentStatus.message}</p>
                                )}
                            </div>
                        </div>

                        <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 h-12" disabled={isSubmitting}>
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Saving Profile...
                                </>
                            ) : (
                                "Save & Continue to KYC"
                            )}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
