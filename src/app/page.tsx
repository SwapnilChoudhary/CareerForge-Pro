import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FileText, Zap, Target, Download } from "lucide-react";
import Navbar from "@/components/Navbar";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center px-6 text-center gap-8 py-20">
        <div className="space-y-4 max-w-2xl">
          <div className="inline-flex items-center gap-2 text-sm text-muted-foreground border rounded-full px-3 py-1">
            <Zap className="h-3.5 w-3.5" />
            ATS-optimized resumes powered by AI
          </div>
          <h1 className="text-5xl font-bold tracking-tight">
            Land more interviews with{" "}
            <span className="text-primary">CareerForge Pro</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Build ATS-proof resumes, analyze job descriptions, and rewrite your
            bullets with AI — all in one place.
          </p>
          <div className="flex gap-3 justify-center pt-2">
            <Button size="lg" asChild>
              <Link href="/editor">Start Building Free</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/dashboard">View Dashboard</Link>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 max-w-2xl w-full mt-8">
          {[
            { icon: FileText, title: "Resume Builder", desc: "Live split-screen editor" },
            { icon: Target, title: "ATS Scorer", desc: "Keyword match analysis" },
            { icon: Download, title: "PDF Export", desc: "One-click download" },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="border rounded-lg p-4 text-left space-y-1.5 bg-background">
              <Icon className="h-5 w-5 text-muted-foreground" />
              <p className="font-medium text-sm">{title}</p>
              <p className="text-xs text-muted-foreground">{desc}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}