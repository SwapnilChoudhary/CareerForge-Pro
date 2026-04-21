import { ResumeData } from "@/types/resume";
import { formatDate } from "@/lib/utils";

export function generateResumeHtml(resume: ResumeData): string {
  const skills = resume.skills.filter((s) => s.name).map((s) => s.name).join(" · ");

  const experienceHtml = resume.experience
    .map(
      (exp) => `
      <div class="section-item">
        <div class="item-header">
          <div>
            <span class="item-title">${exp.title || ""}</span>
            ${exp.company ? `<span class="item-sub"> · ${exp.company}</span>` : ""}
          </div>
          <span class="item-date">
            ${formatDate(exp.startDate)} – ${exp.current ? "Present" : formatDate(exp.endDate)}
          </span>
        </div>
        ${
          exp.bullets.filter(Boolean).length > 0
            ? `<ul class="bullets">
                ${exp.bullets
                  .filter(Boolean)
                  .map((b) => `<li>${b}</li>`)
                  .join("")}
               </ul>`
            : ""
        }
      </div>`
    )
    .join("");

  const educationHtml = resume.education
    .map(
      (edu) => `
      <div class="section-item">
        <div class="item-header">
          <div>
            <span class="item-title">${edu.degree}${edu.field ? ` in ${edu.field}` : ""}</span>
            ${edu.institution ? `<span class="item-sub"> · ${edu.institution}</span>` : ""}
          </div>
          <span class="item-date">
            ${formatDate(edu.startDate)} – ${formatDate(edu.endDate)}
          </span>
        </div>
        ${edu.gpa ? `<p class="gpa">GPA: ${edu.gpa}</p>` : ""}
      </div>`
    )
    .join("");

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${resume.fullName} — Resume</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: Georgia, 'Times New Roman', serif;
      font-size: 11pt;
      line-height: 1.5;
      color: #1a1a1a;
      background: white;
      padding: 48px 52px;
    }
    .header { text-align: center; border-bottom: 1.5px solid #d1d5db; padding-bottom: 14px; margin-bottom: 18px; }
    .header h1 { font-size: 20pt; font-weight: 700; letter-spacing: -0.3px; color: #111; }
    .contact { display: flex; flex-wrap: wrap; justify-content: center; gap: 4px 16px; margin-top: 6px; font-size: 9pt; color: #555; }
    .section { margin-bottom: 18px; }
    .section-title {
      font-size: 8pt;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1.2px;
      color: #666;
      border-bottom: 1px solid #e5e7eb;
      padding-bottom: 3px;
      margin-bottom: 10px;
    }
    .section-item { margin-bottom: 10px; }
    .item-header { display: flex; justify-content: space-between; align-items: baseline; gap: 8px; }
    .item-title { font-weight: 600; font-size: 10.5pt; color: #111; }
    .item-sub { color: #555; font-size: 10pt; }
    .item-date { font-size: 8.5pt; color: #777; white-space: nowrap; flex-shrink: 0; }
    .bullets { margin-top: 5px; padding-left: 14px; }
    .bullets li { margin-bottom: 2px; font-size: 10pt; color: #333; }
    .summary p { font-size: 10pt; color: #444; }
    .skills-text { font-size: 10pt; color: #333; }
    .gpa { font-size: 9pt; color: #777; margin-top: 2px; }
  </style>
</head>
<body>
  <div class="header">
    <h1>${resume.fullName || "Your Name"}</h1>
    <div class="contact">
      ${resume.email ? `<span>${resume.email}</span>` : ""}
      ${resume.phone ? `<span>${resume.phone}</span>` : ""}
      ${resume.location ? `<span>${resume.location}</span>` : ""}
      ${resume.linkedin ? `<span>${resume.linkedin}</span>` : ""}
      ${resume.github ? `<span>${resume.github}</span>` : ""}
    </div>
  </div>

  ${
    resume.summary
      ? `<div class="section summary">
          <div class="section-title">Summary</div>
          <p>${resume.summary}</p>
        </div>`
      : ""
  }

  ${
    resume.experience.length > 0
      ? `<div class="section">
          <div class="section-title">Experience</div>
          ${experienceHtml}
        </div>`
      : ""
  }

  ${
    resume.education.length > 0
      ? `<div class="section">
          <div class="section-title">Education</div>
          ${educationHtml}
        </div>`
      : ""
  }

  ${
    skills
      ? `<div class="section">
          <div class="section-title">Skills</div>
          <p class="skills-text">${skills}</p>
        </div>`
      : ""
  }
</body>
</html>`;
}