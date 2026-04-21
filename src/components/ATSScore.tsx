"use client";

import { useMemo } from "react";
import { useResume } from "@/context/ResumeContext";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface Keyword {
  term: string;
  importance: "high" | "medium" | "low";
  category: string;
}

interface ATSScoreProps {
  keywords: Keyword[];
}

export default function ATSScore({ keywords }: ATSScoreProps) {
  const { resume } = useResume();

  const resumeText = useMemo(() => {
    const parts = [
      resume.fullName,
      resume.summary,
      ...resume.experience.flatMap((e) => [e.title, e.company, ...e.bullets]),
      ...resume.education.map((e) => `${e.degree} ${e.field}`),
      ...resume.skills.map((s) => s.name),
    ];
    return parts.join(" ").toLowerCase();
  }, [resume]);

  const scored = useMemo(() => {
    return keywords.map((kw) => ({
      ...kw,
      found: resumeText.includes(kw.term.toLowerCase()),
    }));
  }, [keywords, resumeText]);

  const score = useMemo(() => {
    if (scored.length === 0) return 0;
    const weights = { high: 3, medium: 2, low: 1 };
    const total = scored.reduce((acc, k) => acc + weights[k.importance], 0);
    const matched = scored
      .filter((k) => k.found)
      .reduce((acc, k) => acc + weights[k.importance], 0);
    return Math.round((matched / total) * 100);
  }, [scored]);

  const scoreColor =
    score >= 75 ? "text-green-600" : score >= 50 ? "text-yellow-600" : "text-red-500";

  const progressColor =
    score >= 75 ? "bg-green-500" : score >= 50 ? "bg-yellow-500" : "bg-red-500";

  if (keywords.length === 0) return null;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">ATS Match Score</span>
        <span className={cn("text-2xl font-bold", scoreColor)}>{score}%</span>
      </div>

      <div className="relative h-2 rounded-full bg-muted overflow-hidden">
        <div
          className={cn("h-full rounded-full transition-all duration-700", progressColor)}
          style={{ width: `${score}%` }}
        />
      </div>

      <p className="text-xs text-muted-foreground">
        {score >= 75
          ? "Great match! Your resume is well-optimized."
          : score >= 50
          ? "Decent match. Add more keywords to improve."
          : "Low match. Consider rewriting bullets with AI."}
      </p>

      <div className="space-y-2">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
          Keywords
        </p>
        <div className="flex flex-wrap gap-1.5">
          {scored.map((kw) => (
            <Badge
              key={kw.term}
              variant={kw.found ? "default" : "outline"}
              className={cn(
                "text-xs transition-colors",
                kw.found
                  ? "bg-green-100 text-green-800 border-green-200 hover:bg-green-100"
                  : "text-muted-foreground",
                kw.importance === "high" && !kw.found && "border-red-200 text-red-500"
              )}
            >
              {kw.found ? "✓ " : ""}{kw.term}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}