import { NextRequest, NextResponse } from "next/server";
import { openai } from "@/lib/openai";

export async function POST(req: NextRequest) {
  try {
    const { bullets, keywords, jobTitle } = await req.json();

    if (!bullets || bullets.length === 0) {
      return NextResponse.json({ error: "No bullets provided." }, { status: 400 });
    }

    const keywordList = (keywords as string[]).slice(0, 20).join(", ");

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: 0.4,
      messages: [
        {
          role: "system",
          content: `You are a professional resume writer who specializes in ATS-optimized resumes. You rewrite resume bullet points to be impactful, concise, and rich in relevant keywords. Always start bullets with a strong action verb. Return ONLY a valid JSON array — no markdown, no explanation.`,
        },
        {
          role: "user",
          content: `Rewrite these resume bullet points for a "${jobTitle || "Software Engineer"}" role. 
Naturally incorporate these keywords where relevant: ${keywordList}

Rules:
- Start each bullet with a strong action verb
- Keep each bullet under 20 words
- Quantify impact where possible (use placeholders like [X%] if unknown)
- Sound professional but not robotic
- Return ONLY a JSON array of strings, same count as input

Input bullets:
${JSON.stringify(bullets)}`,
        },
      ],
    });

    const raw = completion.choices[0].message.content ?? "";

    let rewritten: string[];
    try {
      rewritten = JSON.parse(raw);
    } catch {
      const jsonMatch = raw.match(/\[[\s\S]*\]/);
      if (!jsonMatch) throw new Error("No valid JSON array in response");
      rewritten = JSON.parse(jsonMatch[0]);
    }

    return NextResponse.json({ bullets: rewritten });
  } catch (err) {
    console.error("[rewrite]", err);
    return NextResponse.json(
      { error: "Failed to rewrite bullets." },
      { status: 500 }
    );
  }
}