
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

export const classicTemplate = (data: any) => {
  return `
<!DOCTYPE html>
<html>
<head>
  <style>
    /* Puppeteer print optimization */
    @media print { @page { margin: 0; } body { padding: 1cm; } }
    body { font-family: 'Times New Roman', serif; padding: 40px; color: black; line-height: 1.3; }
    .header { text-align: center; margin-bottom: 15px; }
    .section-head { background: #f3f4f6; font-weight: bold; padding: 5px 10px; margin-top: 18px; border-top: 1.5px solid #000; font-size: 14px; text-transform: uppercase; }
    .item-box { margin-bottom: 12px; margin-top: 6px; }
    .bold { font-weight: bold; }
    .right { float: right; }
    .clear { clear: both; }
    .desc { font-size: 13px; margin: 4px 0; text-align: justify; }
  </style>
</head>
<body>
  <div class="header">
    <h2 style="margin:0; font-size: 24px;">${data.personalInfo.name || data.personalInfo.fullName}</h2>
    <p style="font-size: 12px; margin-top: 5px;">
      ${data.personalInfo.address} | ${data.personalInfo.phone} | ${data.personalInfo.email} <br>
      ${data.personalInfo.linkedin ? `LinkedIn: ${data.personalInfo.linkedin} ` : ''} 
      ${data.personalInfo.github ? `| GitHub: ${data.personalInfo.github} ` : ''}
      ${data.personalInfo.portfolio ? `| Portfolio: ${data.personalInfo.portfolio}` : ''}
    </p>
  </div>

  ${data.summary ? `
    <div class="section-head">Professional Summary</div>
    <div class="desc" style="margin-top:8px;">${data.summary}</div>
  ` : ''}

  ${data.experience?.length > 0 ? `
    <div class="section-head">Work Experience</div>
    ${data.experience.map((exp: any) => `
      <div class="item-box">
        <span class="bold">${exp.company}</span> 
        <span class="right">${formatDate(exp.startDate)} - ${exp.endDate ? formatDate(exp.endDate) : 'Present'}</span>
        <div class="clear"></div>
        <div class="bold" style="font-style: italic;">${exp.jobTitle || exp.role}</div>
        <div class="desc">${renderDesc(exp.description)}</div>
      </div>
    `).join("")}
  ` : ''}

  ${data.projects?.length > 0 ? `
    <div class="section-head">Key Projects</div>
    ${data.projects.map((p: any) => `
      <div class="item-box">
        <span class="bold">${p.name}</span> 
        ${p.link ? `<span class="right" style="font-size:11px;">${p.link}</span>` : ''}
        <div class="clear"></div>
        <div class="desc">${renderDesc(p.description)}</div>
      </div>
    `).join("")}
  ` : ''}

  ${data.education?.length > 0 ? `
    <div class="section-head">Education</div>
    ${data.education.map((edu: any) => `
      <div class="item-box">
        <span class="bold">${edu.school}</span> 
        <span class="right">${formatDate(edu.startDate)} - ${formatDate(edu.endDate)}</span>
        <div class="clear"></div>
        <div style="font-size: 13px;">${edu.degree}</div>
      </div>
    `).join("")}
  ` : ''}

  ${data.skills?.length > 0 ? `
    <div class="section-head">Technical Skills</div>
    <p class="desc" style="padding: 5px 0;">${data.skills.join(" • ")}</p>
  ` : ''}
</body>
</html>`;
};