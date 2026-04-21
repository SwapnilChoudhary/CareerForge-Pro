"use client";

import { useResume } from "@/context/ResumeContext";
import { generateId } from "@/lib/utils";
import { Education, Experience, Skill } from "@/types/resume";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Plus, Trash2 } from "lucide-react";

export default function ResumeForm() {
  const { resume, updateResume } = useResume();

  // ── Education helpers ──────────────────────────────────────────
  const addEducation = () => {
    const blank: Education = {
      id: generateId(),
      institution: "",
      degree: "",
      field: "",
      startDate: "",
      endDate: "",
    };
    updateResume({ education: [...resume.education, blank] });
  };

  const updateEducation = (id: string, field: keyof Education, value: string) => {
    updateResume({
      education: resume.education.map((e) =>
        e.id === id ? { ...e, [field]: value } : e
      ),
    });
  };

  const removeEducation = (id: string) => {
    updateResume({ education: resume.education.filter((e) => e.id !== id) });
  };

  // ── Experience helpers ─────────────────────────────────────────
  const addExperience = () => {
    const blank: Experience = {
      id: generateId(),
      company: "",
      title: "",
      startDate: "",
      endDate: "",
      current: false,
      bullets: [""],
    };
    updateResume({ experience: [...resume.experience, blank] });
  };

  const updateExperience = (id: string, field: keyof Experience, value: unknown) => {
    updateResume({
      experience: resume.experience.map((e) =>
        e.id === id ? { ...e, [field]: value } : e
      ),
    });
  };

  const removeExperience = (id: string) => {
    updateResume({ experience: resume.experience.filter((e) => e.id !== id) });
  };

  const addBullet = (expId: string) => {
    updateResume({
      experience: resume.experience.map((e) =>
        e.id === expId ? { ...e, bullets: [...e.bullets, ""] } : e
      ),
    });
  };

  const updateBullet = (expId: string, idx: number, value: string) => {
    updateResume({
      experience: resume.experience.map((e) =>
        e.id === expId
          ? { ...e, bullets: e.bullets.map((b, i) => (i === idx ? value : b)) }
          : e
      ),
    });
  };

  const removeBullet = (expId: string, idx: number) => {
    updateResume({
      experience: resume.experience.map((e) =>
        e.id === expId
          ? { ...e, bullets: e.bullets.filter((_, i) => i !== idx) }
          : e
      ),
    });
  };

  // ── Skills helpers ─────────────────────────────────────────────
  const addSkill = () => {
    const blank: Skill = { id: generateId(), name: "" };
    updateResume({ skills: [...resume.skills, blank] });
  };

  const updateSkill = (id: string, value: string) => {
    updateResume({
      skills: resume.skills.map((s) => (s.id === id ? { ...s, name: value } : s)),
    });
  };

  const removeSkill = (id: string) => {
    updateResume({ skills: resume.skills.filter((s) => s.id !== id) });
  };

  return (
    <div className="space-y-8 p-6">
      {/* ── Personal Info ── */}
      <section className="space-y-4">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
          Personal Info
        </h2>
        <div className="grid grid-cols-2 gap-3">
          <div className="col-span-2 space-y-1">
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              id="fullName"
              placeholder="Jane Doe"
              value={resume.fullName}
              onChange={(e) => updateResume({ fullName: e.target.value })}
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="jane@example.com"
              value={resume.email}
              onChange={(e) => updateResume({ email: e.target.value })}
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              placeholder="+91 98765 43210"
              value={resume.phone}
              onChange={(e) => updateResume({ phone: e.target.value })}
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              placeholder="Pune, India"
              value={resume.location}
              onChange={(e) => updateResume({ location: e.target.value })}
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="linkedin">LinkedIn</Label>
            <Input
              id="linkedin"
              placeholder="linkedin.com/in/janedoe"
              value={resume.linkedin}
              onChange={(e) => updateResume({ linkedin: e.target.value })}
            />
          </div>
          <div className="col-span-2 space-y-1">
            <Label htmlFor="github">GitHub</Label>
            <Input
              id="github"
              placeholder="github.com/janedoe"
              value={resume.github}
              onChange={(e) => updateResume({ github: e.target.value })}
            />
          </div>
        </div>
        <div className="space-y-1">
          <Label htmlFor="summary">Professional Summary</Label>
          <Textarea
            id="summary"
            placeholder="Brief summary of your background and goals..."
            value={resume.summary}
            onChange={(e) => updateResume({ summary: e.target.value })}
            rows={3}
          />
        </div>
      </section>

      <Separator />

      {/* ── Education ── */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
            Education
          </h2>
          <Button variant="ghost" size="sm" onClick={addEducation}>
            <Plus className="h-4 w-4 mr-1" /> Add
          </Button>
        </div>
        {resume.education.map((edu) => (
          <div key={edu.id} className="border rounded-lg p-4 space-y-3 relative">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 h-7 w-7 text-muted-foreground hover:text-destructive"
              onClick={() => removeEducation(edu.id)}
            >
              <Trash2 className="h-3.5 w-3.5" />
            </Button>
            <div className="grid grid-cols-2 gap-3">
              <div className="col-span-2 space-y-1">
                <Label>Institution</Label>
                <Input
                  placeholder="MIT"
                  value={edu.institution}
                  onChange={(e) => updateEducation(edu.id, "institution", e.target.value)}
                />
              </div>
              <div className="space-y-1">
                <Label>Degree</Label>
                <Input
                  placeholder="B.Tech"
                  value={edu.degree}
                  onChange={(e) => updateEducation(edu.id, "degree", e.target.value)}
                />
              </div>
              <div className="space-y-1">
                <Label>Field</Label>
                <Input
                  placeholder="Computer Science"
                  value={edu.field}
                  onChange={(e) => updateEducation(edu.id, "field", e.target.value)}
                />
              </div>
              <div className="space-y-1">
                <Label>Start Date</Label>
                <Input
                  type="month"
                  value={edu.startDate}
                  onChange={(e) => updateEducation(edu.id, "startDate", e.target.value)}
                />
              </div>
              <div className="space-y-1">
                <Label>End Date</Label>
                <Input
                  type="month"
                  value={edu.endDate}
                  onChange={(e) => updateEducation(edu.id, "endDate", e.target.value)}
                />
              </div>
              <div className="space-y-1">
                <Label>GPA (optional)</Label>
                <Input
                  placeholder="8.5 / 10"
                  value={edu.gpa ?? ""}
                  onChange={(e) => updateEducation(edu.id, "gpa", e.target.value)}
                />
              </div>
            </div>
          </div>
        ))}
        {resume.education.length === 0 && (
          <p className="text-sm text-muted-foreground text-center py-4 border border-dashed rounded-lg">
            No education added yet
          </p>
        )}
      </section>

      <Separator />

      {/* ── Experience ── */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
            Experience
          </h2>
          <Button variant="ghost" size="sm" onClick={addExperience}>
            <Plus className="h-4 w-4 mr-1" /> Add
          </Button>
        </div>
        {resume.experience.map((exp) => (
          <div key={exp.id} className="border rounded-lg p-4 space-y-3 relative">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 h-7 w-7 text-muted-foreground hover:text-destructive"
              onClick={() => removeExperience(exp.id)}
            >
              <Trash2 className="h-3.5 w-3.5" />
            </Button>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label>Company</Label>
                <Input
                  placeholder="Acme Corp"
                  value={exp.company}
                  onChange={(e) => updateExperience(exp.id, "company", e.target.value)}
                />
              </div>
              <div className="space-y-1">
                <Label>Job Title</Label>
                <Input
                  placeholder="Software Engineer"
                  value={exp.title}
                  onChange={(e) => updateExperience(exp.id, "title", e.target.value)}
                />
              </div>
              <div className="space-y-1">
                <Label>Start Date</Label>
                <Input
                  type="month"
                  value={exp.startDate}
                  onChange={(e) => updateExperience(exp.id, "startDate", e.target.value)}
                />
              </div>
              <div className="space-y-1">
                <Label>End Date</Label>
                <Input
                  type="month"
                  value={exp.endDate}
                  disabled={exp.current}
                  onChange={(e) => updateExperience(exp.id, "endDate", e.target.value)}
                />
              </div>
              <div className="col-span-2 flex items-center gap-2">
                <input
                  type="checkbox"
                  id={`current-${exp.id}`}
                  checked={exp.current}
                  onChange={(e) => updateExperience(exp.id, "current", e.target.checked)}
                  className="h-4 w-4 accent-primary"
                />
                <Label htmlFor={`current-${exp.id}`} className="font-normal cursor-pointer">
                  I currently work here
                </Label>
              </div>
            </div>

            {/* Bullets */}
            <div className="space-y-2">
              <Label>Responsibilities / Achievements</Label>
              {exp.bullets.map((bullet, idx) => (
                <div key={idx} className="flex gap-2 items-start">
                  <span className="mt-2.5 text-muted-foreground text-xs">•</span>
                  <Input
                    placeholder="Describe what you did and the impact..."
                    value={bullet}
                    onChange={(e) => updateBullet(exp.id, idx, e.target.value)}
                    className="flex-1"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9 text-muted-foreground hover:text-destructive shrink-0"
                    onClick={() => removeBullet(exp.id, idx)}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              ))}
              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground"
                onClick={() => addBullet(exp.id)}
              >
                <Plus className="h-3.5 w-3.5 mr-1" /> Add bullet
              </Button>
            </div>
          </div>
        ))}
        {resume.experience.length === 0 && (
          <p className="text-sm text-muted-foreground text-center py-4 border border-dashed rounded-lg">
            No experience added yet
          </p>
        )}
      </section>

      <Separator />

      {/* ── Skills ── */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
            Skills
          </h2>
          <Button variant="ghost" size="sm" onClick={addSkill}>
            <Plus className="h-4 w-4 mr-1" /> Add
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {resume.skills.map((skill) => (
            <div key={skill.id} className="flex items-center gap-1 border rounded-full px-3 py-1">
              <Input
                value={skill.name}
                onChange={(e) => updateSkill(skill.id, e.target.value)}
                placeholder="e.g. Salesforce"
                className="border-0 p-0 h-auto text-sm w-28 focus-visible:ring-0 bg-transparent"
              />
              <button
                onClick={() => removeSkill(skill.id)}
                className="text-muted-foreground hover:text-destructive transition-colors"
              >
                <Trash2 className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>
        {resume.skills.length === 0 && (
          <p className="text-sm text-muted-foreground text-center py-4 border border-dashed rounded-lg">
            No skills added yet
          </p>
        )}
      </section>
    </div>
  );
}