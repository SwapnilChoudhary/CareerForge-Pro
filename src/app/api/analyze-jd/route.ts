import { NextRequest, NextResponse } from "next/server";
import { openai } from "@/lib/openai";

export async function POST(req: NextRequest) {
  try {
    const { jobDescription } = await req.json();

    if (!jobDescription || jobDescription.trim().length < 50) {
      return NextResponse.json(
        { error: "Job description is too short." },
        { status: 400 }
      );
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: 0.2,
      messages: [
        {
          role: "system",
          content: `You are an ATS (Applicant Tracking System) expert. Extract the most important keywords and skills from job descriptions. Return ONLY a valid JSON object — no markdown, no explanation.`,
        },
        {
          role: "user",
          content: `Extract keywords from this job description. Return a JSON object with this exact shape:
{
  "keywords": [
    { "term": "string", "importance": "high" | "medium" | "low", "category": "skill" | "tool" | "soft-skill" | "qualification" }
  ],
  "summary": "one sentence summary of the role"
}

Job Description:
${jobDescription}`,
        },
      ],
    });

    const raw = completion.choices[0].message.content ?? "";

    let parsed;
    try {
      parsed = JSON.parse(raw);
    } catch {
      const jsonMatch = raw.match(/\{[\s\S]*\}/);
      if (!jsonMatch) throw new Error("No valid JSON in response");
      parsed = JSON.parse(jsonMatch[0]);
    }

    return NextResponse.json(parsed);
  } catch (err) {
    console.error("[analyze-jd]", err);
    return NextResponse.json(
      { error: "Failed to analyze job description." },
      { status: 500 }
    );
  }
}