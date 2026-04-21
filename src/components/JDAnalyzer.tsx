"use client";

import { useState } from "react";
import { useResume } from "@/context/ResumeContext";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import ATSScore from "@/components/ATSScore";
import { Loader2, Sparkles, Wand2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface Keyword {
  term: string;
  importance: "high" | "medium" | "low";
  category: string;
}

export default function JDAnalyzer() {
  const { resume, updateResume } = useResume();
  const [jd, setJd] = useState("");
  const [keywords, setKeywords] = useState<Keyword[]>([]);
  const [jdSummary, setJdSummary] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [rewriting, setRewriting] = useState<string | null>(null);
  const [error, setError] = useState("");

  const analyzeJD = async () => {
    if (!jd.trim()) return;
    setAnalyzing(true);
    setError("");
    try {
      const res = await fetch("/api/analyze-jd", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobDescription: jd }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setKeywords(data.keywords ?? []);
      setJdSummary(data.summary ?? "");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Analysis failed.");
    } finally {
      setAnalyzing(false);
    }
  };

  const rewriteExperience = async (expId: string) => {
    const exp = resume.experience.find((e) => e.id === expId);
    if (!exp) return;

    const validBullets = exp.bullets.filter((b) => b.trim());
    if (validBullets.length === 0) {
      setError("Add at least one bullet point before rewriting.");
      return;
    }

    setRewriting(expId);
    setError("");
    try {
      const res = await fetch("/api/rewrite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          bullets: validBullets,
          keywords: keywords.map((k) => k.term),
          jobTitle: exp.title,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      updateResume({
        experience: resume.experience.map((e) =>
          e.id === expId ? { ...e, bullets: data.bullets } : e
        ),
      });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Rewrite failed.");
    } finally {
      setRewriting(null);
    }
  };

  return (
    <div className="space-y-6 p-6">
      {/* JD Input */}
      <section className="space-y-3">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
          Job Description Analyzer
        </h2>
        <div className="space-y-1.5">
          <Label htmlFor="jd">Paste Job Description</Label>
          <Textarea
            id="jd"
            placeholder="Paste the full job description here..."
            value={jd}
            onChange={(e) => setJd(e.target.value)}
            rows={8}
            className="resize-none text-sm"
          />
        </div>
        <Button
          onClick={analyzeJD}
          disabled={analyzing || jd.trim().length < 50}
          className="w-full"
        >
          {analyzing ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" /> Analyzing...
            </>
          ) : (
            <>
              <Sparkles className="h-4 w-4 mr-2" /> Analyze Job Description
            </>
          )}
        </Button>

        {error && (
          <p className="text-sm text-destructive bg-destructive/10 px-3 py-2 rounded-md">
            {error}
          </p>
        )}
      </section>

      {/* JD Summary */}
      {jdSummary && (
        <div className="bg-muted/50 border rounded-lg px-4 py-3 text-sm text-muted-foreground">
          <span className="font-medium text-foreground">Role: </span>
          {jdSummary}
        </div>
      )}

      {/* ATS Score */}
      {keywords.length > 0 && (
        <>
          <Separator />
          <ATSScore keywords={keywords} />
        </>
      )}

      {/* AI Rewriter */}
      {keywords.length > 0 && resume.experience.length > 0 && (
        <>
          <Separator />
          <section className="space-y-3">
            <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
              AI Bullet Rewriter
            </h2>
            <p className="text-xs text-muted-foreground">
              Select an experience entry to rewrite its bullets using the extracted keywords.
            </p>
            <div className="space-y-2">
              {resume.experience.map((exp) => (
                <div
                  key={exp.id}
                  className="flex items-center justify-between border rounded-lg px-4 py-3"
                >
                  <div>
                    <p className="text-sm font-medium">{exp.title || "Untitled Role"}</p>
                    <p className="text-xs text-muted-foreground">{exp.company}</p>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    disabled={rewriting === exp.id}
                    onClick={() => rewriteExperience(exp.id)}
                    className={cn(rewriting === exp.id && "opacity-70")}
                  >
                    {rewriting === exp.id ? (
                      <>
                        <Loader2 className="h-3.5 w-3.5 mr-1.5 animate-spin" />
                        Rewriting...
                      </>
                    ) : (
                      <>
                        <Wand2 className="h-3.5 w-3.5 mr-1.5" />
                        Rewrite
                      </>
                    )}
                  </Button>
                </div>
              ))}
            </div>
          </section>
        </>
      )}

      {keywords.length > 0 && resume.experience.length === 0 && (
        <p className="text-sm text-muted-foreground text-center py-3 border border-dashed rounded-lg">
          Add experience entries in the Editor tab to use the AI rewriter.
        </p>
      )}
    </div>
  );
}