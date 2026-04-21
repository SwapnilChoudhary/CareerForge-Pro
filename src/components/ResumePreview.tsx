"use client";

import { useState } from "react";
import { useResume } from "@/context/ResumeContext";
import { formatDate } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Download, Loader2, Save, Check } from "lucide-react";

export default function ResumePreview() {
  const { resume, saving, saved, handleSave } = useResume();
  const [downloading, setDownloading] = useState(false);
  const [dlError, setDlError] = useState("");

  const handleDownload = async () => {
    setDownloading(true);
    setDlError("");
    try {
      const res = await fetch("/api/generate-pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(resume),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "PDF generation failed.");
      }
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${resume.fullName.replace(/\s+/g, "_") || "Resume"}_Resume.pdf`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (e) {
      setDlError(e instanceof Error ? e.message : "Download failed.");
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="flex flex-col">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-4 py-2 border-b bg-background sticky top-0 z-10">
        <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
          Preview
        </span>
        <div className="flex items-center gap-2">
          {dlError && (
            <span className="text-xs text-destructive">{dlError}</span>
          )}
          <Button
            size="sm"
            variant="outline"
            onClick={handleSave}
            disabled={saving || saved}
          >
            {saving ? (
              <>
                <Loader2 className="h-3.5 w-3.5 mr-1.5 animate-spin" />
                Saving...
              </>
            ) : saved ? (
              <>
                <Check className="h-3.5 w-3.5 mr-1.5 text-green-600" />
                Saved
              </>
            ) : (
              <>
                <Save className="h-3.5 w-3.5 mr-1.5" />
                Save
              </>
            )}
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={handleDownload}
            disabled={downloading || !resume.fullName}
          >
            {downloading ? (
              <>
                <Loader2 className="h-3.5 w-3.5 mr-1.5 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Download className="h-3.5 w-3.5 mr-1.5" />
                Download PDF
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Resume content */}
      <div
        id="resume-preview"
        className="bg-white text-gray-900 text-sm leading-relaxed p-10 min-h-[1056px] w-full"
        style={{ fontFamily: "Georgia, serif" }}
      >
        {/* Header */}
        <div className="text-center border-b border-gray-300 pb-4 mb-5">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            {resume.fullName || "Your Name"}
          </h1>
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 mt-2 text-xs text-gray-600">
            {resume.email && <span>{resume.email}</span>}
            {resume.phone && <span>{resume.phone}</span>}
            {resume.location && <span>{resume.location}</span>}
            {resume.linkedin && <span>{resume.linkedin}</span>}
            {resume.github && <span>{resume.github}</span>}
          </div>
        </div>

        {/* Summary */}
        {resume.summary && (
          <section className="mb-5">
            <h2 className="text-xs font-bold uppercase tracking-widest text-gray-500 border-b border-gray-200 pb-1 mb-2">
              Summary
            </h2>
            <p className="text-sm text-gray-700">{resume.summary}</p>
          </section>
        )}

        {/* Experience */}
        {resume.experience.length > 0 && (
          <section className="mb-5">
            <h2 className="text-xs font-bold uppercase tracking-widest text-gray-500 border-b border-gray-200 pb-1 mb-3">
              Experience
            </h2>
            <div className="space-y-4">
              {resume.experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline">
                    <div>
                      <span className="font-semibold text-gray-900">
                        {exp.title || "Job Title"}
                      </span>
                      {exp.company && (
                        <span className="text-gray-600"> · {exp.company}</span>
                      )}
                    </div>
                    <span className="text-xs text-gray-500 shrink-0 ml-4">
                      {formatDate(exp.startDate)} –{" "}
                      {exp.current ? "Present" : formatDate(exp.endDate)}
                    </span>
                  </div>
                  {exp.bullets.filter(Boolean).length > 0 && (
                    <ul className="mt-1.5 space-y-1">
                      {exp.bullets.filter(Boolean).map((b, i) => (
                        <li key={i} className="flex gap-2 text-gray-700">
                          <span className="shrink-0 mt-0.5">•</span>
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {resume.education.length > 0 && (
          <section className="mb-5">
            <h2 className="text-xs font-bold uppercase tracking-widest text-gray-500 border-b border-gray-200 pb-1 mb-3">
              Education
            </h2>
            <div className="space-y-3">
              {resume.education.map((edu) => (
                <div key={edu.id}>
                  <div className="flex justify-between items-baseline">
                    <div>
                      <span className="font-semibold text-gray-900">
                        {edu.degree} {edu.field ? `in ${edu.field}` : ""}
                      </span>
                      {edu.institution && (
                        <span className="text-gray-600">
                          {" "}· {edu.institution}
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-gray-500 shrink-0 ml-4">
                      {formatDate(edu.startDate)} – {formatDate(edu.endDate)}
                    </span>
                  </div>
                  {edu.gpa && (
                    <p className="text-xs text-gray-500 mt-0.5">
                      GPA: {edu.gpa}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {resume.skills.filter((s) => s.name).length > 0 && (
          <section className="mb-5">
            <h2 className="text-xs font-bold uppercase tracking-widest text-gray-500 border-b border-gray-200 pb-1 mb-2">
              Skills
            </h2>
            <p className="text-sm text-gray-700">
              {resume.skills
                .filter((s) => s.name)
                .map((s) => s.name)
                .join(" · ")}
            </p>
          </section>
        )}
      </div>
    </div>
  );
}