// --- આ ફંક્શન બેકએન્ડમાં templates ફાઈલની ઉપર હોવા જરૂરી છે ---
const formatDate = (d: string) => d ? new Date(d).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : "";

const renderDesc = (text: string) => {
  if (!text) return "";
  return text.split('\n').map((line: string) => 
    `<div style="display: flex; gap: 8px; margin-bottom: 3px;">
      <span style="color: #666;">•</span>
      <span>${line.trim()}</span>
    </div>`
  ).join('');
};

export const minimalTemplate = (data: any) => {
  return `
<!DOCTYPE html>
<html>
<head>
  <style>
    /* Puppeteer print optimization */
    @media print { @page { margin: 0; } body { padding: 1.5cm; } }
    body { font-family: 'Charter', 'Georgia', serif; line-height: 1.6; color: #1a1a1a; padding: 40px; }
    .name { font-size: 32px; font-weight: bold; text-align: center; letter-spacing: -0.5px; margin-bottom: 5px; }
    .contact { text-align: center; font-size: 12px; border-bottom: 1px solid #eee; padding-bottom: 15px; margin-bottom: 20px; color: #555; }
    h3 { text-transform: uppercase; font-size: 13px; letter-spacing: 1.5px; margin-top: 25px; border-bottom: 1px solid #1a1a1a; padding-bottom: 2px; }
    .row { display: flex; justify-content: space-between; font-weight: bold; font-size: 14px; }
    .link { color: #000; text-decoration: underline; font-size: 11px; font-weight: normal; }
    .desc { font-size: 13px; margin: 5px 0; color: #222; }
  </style>
</head>
<body>
  <div class="name">${data.personalInfo.name || data.personalInfo.fullName}</div>
  <div class="contact">
    ${data.personalInfo.email} &bull; ${data.personalInfo.phone} <br>
    ${data.personalInfo.address} <br>
    ${data.personalInfo.linkedin ? `<span style="color:#555;">LinkedIn</span> &bull; ` : ''} 
    ${data.personalInfo.github ? `<span style="color:#555;">GitHub</span> &bull; ` : ''}
    ${data.personalInfo.portfolio ? `<span style="color:#555;">Portfolio</span>` : ''}
  </div>

  ${data.summary ? `<h3>Summary</h3><div class="desc">${data.summary}</div>` : ''}

  ${data.experience?.length > 0 ? `
    <h3>Professional Experience</h3>
    ${data.experience.map((exp: any) => `
      <div style="margin-bottom:15px;">
        <div class="row">
            <span>${exp.jobTitle || exp.role}</span>
            <span>${formatDate(exp.startDate)} - ${exp.endDate ? formatDate(exp.endDate) : 'Present'}</span>
        </div>
        <div style="font-style: italic; font-size: 13px; color: #444;">${exp.company}</div>
        <div class="desc">${renderDesc(exp.description)}</div>
      </div>
    `).join("")}
  ` : ''}

  ${data.projects?.length > 0 ? `
    <h3>Projects</h3>
    ${data.projects.map((p: any) => `
      <div style="margin-bottom:12px;">
        <div class="row">
            <span>${p.name}</span> 
            ${p.link ? `<span class="link">Project Link</span>` : ''}
        </div>
        <div class="desc">${renderDesc(p.description)}</div>
      </div>
    `).join("")}
  ` : ''}

  ${data.education?.length > 0 ? `
    <h3>Education</h3>
    ${data.education.map((edu: any) => `
      <div style="margin-bottom:10px;">
        <div class="row">
            <span>${edu.degree}</span>
            <span>${formatDate(edu.startDate)} - ${formatDate(edu.endDate)}</span>
        </div>
        <div style="font-size: 13px;">${edu.school}</div>
      </div>
    `).join("")}
  ` : ''}

  ${data.skills?.length > 0 ? `<h3>Skills</h3><p class="desc">${data.skills.join(", ")}</p>` : ''}
</body>
</html>`;
};