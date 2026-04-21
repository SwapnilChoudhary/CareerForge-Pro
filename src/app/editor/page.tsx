"use client";

import ResumeForm from "@/components/ResumeForm";
import ResumePreview from "@/components/ResumePreview";
import JDAnalyzer from "@/components/JDAnalyzer";
import Navbar from "@/components/Navbar";
import ProtectedRoute from "@/components/ProtectedRoute";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function EditorPage() {
  return (
    <ProtectedRoute>
      <div className="flex flex-col h-screen overflow-hidden">
        <Navbar />
        <div className="flex flex-1 overflow-hidden">
          {/* Left panel */}
          <div className="w-[480px] shrink-0 border-r flex flex-col overflow-hidden bg-background">
            <Tabs
              defaultValue="editor"
              className="flex flex-col flex-1 overflow-hidden"
            >
              <div className="border-b px-4 pt-3 shrink-0">
                <TabsList className="w-full">
                  <TabsTrigger value="editor" className="flex-1">
                    Resume Editor
                  </TabsTrigger>
                  <TabsTrigger value="jd" className="flex-1">
                    JD Analyzer
                  </TabsTrigger>
                </TabsList>
              </div>
              <TabsContent
                value="editor"
                className="flex-1 overflow-y-auto m-0 data-[state=inactive]:hidden"
              >
                <ResumeForm />
              </TabsContent>
              <TabsContent
                value="jd"
                className="flex-1 overflow-y-auto m-0 data-[state=inactive]:hidden"
              >
                <JDAnalyzer />
              </TabsContent>
            </Tabs>
          </div>

          {/* Right: Preview */}
          <div className="flex-1 bg-muted/30 overflow-y-auto">
            <div className="p-8">
              <div className="max-w-[794px] mx-auto shadow-lg ring-1 ring-black/5">
                <ResumePreview />
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}