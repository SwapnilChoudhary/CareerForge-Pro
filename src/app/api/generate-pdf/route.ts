import { NextRequest, NextResponse } from "next/server";
import { generateResumeHtml } from "@/lib/resumeHtml";
import { ResumeData } from "@/types/resume";

export const maxDuration = 30;

export async function POST(req: NextRequest) {
  try {
    const resume: ResumeData = await req.json();

    if (!resume.fullName) {
      return NextResponse.json(
        { error: "Resume must have a name before exporting." },
        { status: 400 }
      );
    }

    const html = generateResumeHtml(resume);

    const isVercel = process.env.VERCEL === "1";

    let browser;

    if (isVercel) {
      const chromium = (await import("@sparticuz/chromium")).default;
      const puppeteer = (await import("puppeteer-core")).default;
      browser = await puppeteer.launch({
        args: chromium.args,
        defaultViewport: chromium.defaultViewport,
        executablePath: await chromium.executablePath(),
        headless: true,
      });
    } else {
      // Local: use full puppeteer with bundled Chromium
      const puppeteer = (await import("puppeteer")).default;
      browser = await puppeteer.launch({
        headless: true,
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
      });
    }

    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: "networkidle0" });

    const pdf = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: { top: "0", right: "0", bottom: "0", left: "0" },
    });

    await browser.close();

    return new NextResponse(pdf, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${resume.fullName.replace(/\s+/g, "_")}_Resume.pdf"`,
      },
    });
  } catch (err) {
    console.error("[generate-pdf]", err);
    return NextResponse.json(
      { error: "Failed to generate PDF." },
      { status: 500 }
    );
  }
}