import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ShieldCheck, Zap, Smartphone, ArrowRight } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white text-slate-900">
      {/* Navigation */}
      <header className="px-4 lg:px-6 h-16 flex items-center border-b border-slate-100 sticky top-0 bg-white/80 backdrop-blur-md z-50">
        <Link className="flex items-center gap-3 group transition-all duration-300 hover:scale-105" href="/">
          <div className="relative h-12 w-12 overflow-hidden rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 p-0.5 shadow-lg group-hover:shadow-amber-500/50 transition-all">
            <img 
              src="/images/chelete_gold_logo.png" 
              alt="Chelete Gold Logo" 
              className="h-full w-full object-contain rounded-xl bg-white"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-black tracking-tighter text-primary italic leading-none">
              Chelete
            </span>
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-400 group-hover:text-accent transition-colors">
              Empowering Your Dreams
            </span>
          </div>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6 items-center">
          <Link className="text-sm font-medium hover:text-blue-600 transition-colors" href="#how-it-works">
            How it Works
          </Link>
          <Link className="text-sm font-medium hover:text-blue-600 transition-colors" href="#benefits">
            Benefits
          </Link>
          <Link href="/login">
            <Button variant="ghost" size="sm">Log In</Button>
          </Link>
          <Link href="/register">
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700">Get Started</Button>
          </Link>
        </nav>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative w-full py-24 md:py-32 lg:py-48 overflow-hidden">
          {/* Background Image with Overlay */}
          <div className="absolute inset-0 z-0">
            <img 
              src="/images/hero_handshake.png" 
              alt="Warm Handshake" 
              className="w-full h-full object-cover scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-transparent"></div>
          </div>

          <div className="container px-4 md:px-6 mx-auto relative z-10">
            <div className="flex flex-col items-start space-y-6 max-w-3xl animate-fade-in-up">
              <div className="inline-block rounded-full bg-accent/10 border border-accent/20 px-4 py-1.5 text-sm font-semibold text-accent mb-4">
                South Africa's Most Welcoming Microlender
              </div>
              <h1 className="text-5xl font-extrabold tracking-tighter sm:text-6xl md:text-7xl lg:text-8xl">
                Your Dreams, <br />
                <span className="text-primary italic">Powered by Chelete.</span>
              </h1>
              <p className="max-w-[600px] text-slate-700 md:text-xl/relaxed lg:text-2xl/relaxed font-medium">
                The South African way to grow. Fast loans, big smiles, and a brighter future for your family.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 pt-4">
                <Link href="/register">
                  <Button size="lg" className="h-14 px-10 text-xl bg-primary hover:bg-primary/90 shadow-2xl shadow-primary/20 rounded-2xl">
                    Apply Now <ArrowRight className="ml-3 h-6 w-6" />
                  </Button>
                </Link>
                <Link href="#how-it-works">
                  <Button size="lg" variant="outline" className="h-14 px-10 text-xl border-slate-200 glass rounded-2xl">
                    Our Story
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Floating Live Elements */}
          <div className="absolute top-1/4 right-1/4 animate-float opacity-20 pointer-events-none hidden lg:block">
            <Zap className="h-24 w-24 text-accent fill-accent" />
          </div>
          <div className="absolute bottom-1/4 right-1/3 animate-float opacity-10 pointer-events-none hidden lg:block" style={{ animationDelay: '2s' }}>
            <ShieldCheck className="h-32 w-32 text-primary fill-primary" />
          </div>
        </section>

        {/* Success Stories / Exciting Features */}
        <section className="w-full py-24 bg-white relative overflow-hidden">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="relative group rounded-3xl overflow-hidden shadow-2xl">
                <img 
                  src="/images/success_merchant.png" 
                  alt="Business Success" 
                  className="w-full h-[500px] object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-8">
                  <div className="text-white">
                    <h3 className="text-3xl font-bold mb-2">Thabo's Shop Grew 2x</h3>
                    <p className="text-slate-200">"Chelete believed in my dream. The loan was in my account before I even finished my coffee!"</p>
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">Real People. <br /><span className="text-accent underline decoration-primary/20">Real Success.</span></h2>
                <p className="text-lg text-slate-600">
                  We don't just lend money; we invest in South African potential. Whether it's expanding your business or securing your family's home, Chelete is here to say "Yes."
                </p>
                
                <div className="grid grid-cols-1 gap-6">
                  <div className="flex gap-4 p-6 glass rounded-2xl border-l-4 border-l-primary hover:translate-x-2 transition-transform">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">01</div>
                    <div>
                      <h4 className="font-bold text-xl">Fast Loans</h4>
                      <p className="text-slate-500">In your account in minutes, not days.</p>
                    </div>
                  </div>
                  <div className="flex gap-4 p-6 glass rounded-2xl border-l-4 border-l-accent hover:translate-x-2 transition-transform">
                    <div className="h-10 w-10 rounded-full bg-accent/10 flex items-center justify-center text-accent font-bold">02</div>
                    <div>
                      <h4 className="font-bold text-xl">Big Smiles</h4>
                      <p className="text-slate-500">Fair rates and transparent terms always.</p>
                    </div>
                  </div>
                  <div className="flex gap-4 p-6 glass rounded-2xl border-l-4 border-l-primary hover:translate-x-2 transition-transform">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">03</div>
                    <div>
                      <h4 className="font-bold text-xl">Bright Future</h4>
                      <p className="text-slate-500">Helping you build your credit for the long term.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-24 grid grid-cols-1 md:grid-cols-2 gap-12 items-center reverse">
              <div className="order-2 md:order-1 space-y-8">
                <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">Security for <br /><span className="text-primary italic">What Matters Most.</span></h2>
                <p className="text-lg text-slate-600">
                  Protect your family's future with quick emergency funds or home improvement support. We're more than a lender; we're your partner in progress.
                </p>
                <Link href="/register">
                  <Button size="lg" className="bg-accent hover:bg-accent/90 text-white rounded-xl px-12 h-14 text-xl shadow-xl shadow-accent/20">
                    Get Started Today
                  </Button>
                </Link>
              </div>
              <div className="order-1 md:order-2 relative group rounded-3xl overflow-hidden shadow-2xl">
                <img 
                  src="/images/family_future.png" 
                  alt="Family Success" 
                  className="w-full h-[500px] object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent flex items-end p-8">
                  <div className="text-white">
                    <h3 className="text-3xl font-bold mb-2">Safe & Happy Homes</h3>
                    <p className="text-slate-200">Secure the funds you need to maintain a warm environment for your loved ones.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features/Benefits */}
        <section id="benefits" className="w-full py-20 bg-slate-900 text-white">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-6">Why Choose Chelete?</h2>
                <p className="text-slate-400 text-lg mb-10">
                  We built Chelete to provide honest, transparent, and fast financial assistance to South Africans.
                </p>
                <div className="space-y-6">
                  {[
                    { icon: ShieldCheck, title: "Secure & Compliant", desc: "Your data is encrypted and we strictly follow National Credit Act regulations." },
                    { icon: Zap, title: "Lightning Fast", desc: "Automated engine provides decisions in real-time. No more waiting days." },
                    { icon: Smartphone, title: "Mobile First", desc: "Apply from your phone anywhere, anytime. No physical documents needed." }
                  ].map((benefit, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="h-12 w-12 rounded-lg bg-blue-600/20 flex items-center justify-center shrink-0">
                        <benefit.icon className="h-6 w-6 text-blue-400" />
                      </div>
                      <div>
                        <h4 className="font-bold text-xl mb-1">{benefit.title}</h4>
                        <p className="text-slate-400">{benefit.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative">
                <div className="absolute -inset-4 bg-blue-600/20 blur-3xl rounded-full"></div>
                <Card className="relative bg-slate-800 border-slate-700 text-white overflow-hidden">
                  <CardContent className="p-8">
                    <div className="flex justify-between items-center mb-8">
                      <div className="h-8 w-24 bg-slate-700 rounded animate-pulse"></div>
                      <div className="h-8 w-8 bg-slate-700 rounded-full animate-pulse"></div>
                    </div>
                    <div className="space-y-4 mb-8">
                      <div className="h-4 w-full bg-slate-700 rounded animate-pulse"></div>
                      <div className="h-4 w-3/4 bg-slate-700 rounded animate-pulse"></div>
                    </div>
                    <div className="h-32 w-full bg-blue-600 rounded-xl flex items-center justify-center text-4xl font-extrabold tracking-tighter italic">
                      Chelete
                    </div>
                    <div className="mt-8 pt-8 border-t border-slate-700 flex justify-between items-center text-sm text-slate-400">
                      <span>Loan Approved</span>
                      <span className="text-green-400 font-bold">R5,000.00</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="w-full py-12 border-t border-slate-100 bg-white">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex flex-col gap-2">
              <span className="text-xl font-bold text-blue-600">Chelete</span>
              <p className="text-sm text-slate-500 max-w-sm">
                Chelete is a licensed credit provider. Registered NCR no: NCRCPXXXX.
                Terms and conditions apply.
              </p>
            </div>
            <div className="flex gap-8 text-sm text-slate-500">
              <Link href="#" className="hover:text-blue-600 transition-colors">Privacy Policy</Link>
              <Link href="#" className="hover:text-blue-600 transition-colors">Terms of Service</Link>
              <Link href="#" className="hover:text-blue-600 transition-colors">Contact</Link>
            </div>
          </div>
          <div className="mt-12 text-center text-sm text-slate-400">
            © {new Date().getFullYear()} Chelete Microlending. All rights reserved. Built with ❤️ in RSA.
          </div>
        </div>
      </footer>
    </div>
  );
}
