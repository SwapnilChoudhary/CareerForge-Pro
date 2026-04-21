"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useResume } from "@/context/ResumeContext";
import { getUserResumes, deleteResume } from "@/lib/firestore";
import { ResumeData } from "@/types/resume";
import ProtectedRoute from "@/components/ProtectedRoute";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  FilePlus,
  FileText,
  Pencil,
  Trash2,
  Loader2,
  Clock,
} from "lucide-react";

function DashboardContent() {
  const { user } = useAuth();
  const { loadResume, resetResume } = useResume();
  const router = useRouter();
  const [resumes, setResumes] = useState<ResumeData[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;
    getUserResumes(user.uid)
      .then(setResumes)
      .finally(() => setLoading(false));
  }, [user]);

  const handleEdit = (resume: ResumeData) => {
    loadResume(resume);
    router.push("/editor");
  };

  const handleNew = () => {
    resetResume();
    router.push("/editor");
  };

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try {
      await deleteResume(id);
      setResumes((prev) => prev.filter((r) => r.id !== id));
    } finally {
      setDeletingId(null);
    }
  };

  const formatRelative = (date?: Date) => {
    if (!date) return "";
    const diff = Date.now() - date.getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return "just now";
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    const days = Math.floor(hrs / 24);
    return `${days}d ago`;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-5xl mx-auto w-full px-6 py-10">
        {/* Header row */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">My Resumes</h1>
            <p className="text-sm text-muted-foreground mt-1">
              {resumes.length === 0
                ? "No resumes yet"
                : `${resumes.length} resume${resumes.length > 1 ? "s" : ""} saved`}
            </p>
          </div>
          <Button onClick={handleNew}>
            <FilePlus className="h-4 w-4 mr-2" />
            New Resume
          </Button>
        </div>

        {/* Loading state */}
        {loading && (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        )}

        {/* Empty state */}
        {!loading && resumes.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 gap-4 border border-dashed rounded-xl text-center">
            <FileText className="h-10 w-10 text-muted-foreground/50" />
            <div>
              <p className="font-medium">No resumes yet</p>
              <p className="text-sm text-muted-foreground mt-1">
                Create your first resume to get started
              </p>
            </div>
            <Button onClick={handleNew} variant="outline">
              <FilePlus className="h-4 w-4 mr-2" />
              Create Resume
            </Button>
          </div>
        )}

        {/* Resume grid */}
        {!loading && resumes.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {resumes.map((resume) => (
              <Card
                key={resume.id}
                className="group hover:shadow-md transition-shadow"
              >
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-start gap-2">
                    <FileText className="h-4 w-4 mt-0.5 text-muted-foreground shrink-0" />
                    <span className="truncate">
                      {resume.title || "Untitled Resume"}
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pb-3">
                  <p className="text-sm text-muted-foreground truncate">
                    {resume.fullName || "No name"}
                  </p>
                  <div className="flex gap-3 mt-2 text-xs text-muted-foreground">
                    <span>{resume.experience.length} experience</span>
                    <span>{resume.skills.length} skills</span>
                  </div>
                </CardContent>
                <CardFooter className="flex items-center justify-between pt-0">
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {formatRelative(resume.updatedAt)}
                  </div>
                  <div className="flex items-center gap-1">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleEdit(resume)}
                    >
                      <Pencil className="h-3.5 w-3.5 mr-1" />
                      Edit
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-muted-foreground hover:text-destructive"
                          disabled={deletingId === resume.id}
                        >
                          {deletingId === resume.id ? (
                            <Loader2 className="h-3.5 w-3.5 animate-spin" />
                          ) : (
                            <Trash2 className="h-3.5 w-3.5" />
                          )}
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete resume?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This will permanently delete &quot;
                            {resume.title || "Untitled Resume"}&quot;. This
                            action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            onClick={() =>
                              resume.id && handleDelete(resume.id)
                            }
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  );
}