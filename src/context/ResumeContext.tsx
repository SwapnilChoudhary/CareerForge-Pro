"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";
import { ResumeData, defaultResumeData } from "@/types/resume";
import { saveResume } from "@/lib/firestore";
import { useAuth } from "@/context/AuthContext";

interface ResumeContextType {
  resume: ResumeData;
  updateResume: (data: Partial<ResumeData>) => void;
  resetResume: () => void;
  loadResume: (data: ResumeData) => void;
  saving: boolean;
  saved: boolean;
  handleSave: () => Promise<void>;
}

const ResumeContext = createContext<ResumeContextType | null>(null);

export function ResumeProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [resume, setResume] = useState<ResumeData>(defaultResumeData);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const updateResume = (data: Partial<ResumeData>) => {
    setSaved(false);
    setResume((prev) => ({ ...prev, ...data }));
  };

  const resetResume = () => {
    setResume(defaultResumeData);
    setSaved(false);
  };

  const loadResume = (data: ResumeData) => {
    setResume(data);
    setSaved(true);
  };

  const handleSave = async () => {
    if (!user) return;
    setSaving(true);
    try {
      const id = await saveResume(user.uid, resume);
      setResume((prev) => ({ ...prev, id }));
      setSaved(true);
    } finally {
      setSaving(false);
    }
  };

  return (
    <ResumeContext.Provider
      value={{ resume, updateResume, resetResume, loadResume, saving, saved, handleSave }}
    >
      {children}
    </ResumeContext.Provider>
  );
}

export function useResume() {
  const ctx = useContext(ResumeContext);
  if (!ctx) throw new Error("useResume must be used within ResumeProvider");
  return ctx;
}