// --- BACKEND HELPERS ---
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

// --- BACKEND MODERN TEMPLATE ---
export const modernTemplate = (data: any) => {
  return `
<!DOCTYPE html>
<html>
<head>
  <style>
    @media print { @page { margin: 0; } body { padding: 1cm; } }
    body { font-family: 'Helvetica', sans-serif; margin: 0; padding: 0; color: #334155; line-height: 1.5; }
    .header { background: #1e293b; color: white; padding: 30px; text-align: center; }
    .header h1 { margin: 0; text-transform: uppercase; letter-spacing: 2px; font-size: 26px; font-weight: 800; }
    .contact-info { font-size: 11px; margin-top: 12px; display: flex; justify-content: center; gap: 10px; opacity: 0.9; }
    .container { padding: 30px; }
    .section-title { border-bottom: 2px solid #e2e8f0; color: #0f172a; font-weight: 800; margin-top: 20px; padding-bottom: 5px; text-transform: uppercase; font-size: 14px; letter-spacing: 1px; }
    .item { margin-bottom: 15px; margin-top: 10px; }
    .item-header { display: flex; justify-content: space-between; font-weight: 700; color: #1e293b; font-size: 14px; }
    .item-sub { color: #64748b; font-style: italic; font-size: 13px; margin-bottom: 4px; font-weight: 500; }
    .link { color: #3b82f6; text-decoration: none; font-size: 11px; font-weight: 600; }
    .skill-tag { background: #f1f5f9; border: 1px solid #e2e8f0; padding: 4px 10px; border-radius: 6px; font-size: 11px; display: inline-block; margin: 2px; color: #475569; font-weight: 600; }
    .content { margin: 5px 0; font-size: 12.5px; text-align: justify; color: #334155; }
  </style>
</head>
<body>
  <div class="header">
    <h1>${data.personalInfo.name || 'Your Name'}</h1>
    <div class="contact-info">
      <span>${data.personalInfo.email}</span> | <span>${data.personalInfo.phone}</span> | <span>${data.personalInfo.address}</span>
      ${data.personalInfo.linkedin ? ` | LinkedIn` : ''}
      ${data.personalInfo.github ? ` | GitHub` : ''}
    </div>
  </div>
  <div class="container">
    ${data.summary ? `<div class="section-title">Summary</div><div class="content" style="margin-top:8px;">${data.summary}</div>` : ''}

    <div class="section-title">Experience</div>
    ${(data.experience || []).map((exp: any) => `
      <div class="item">
        <div class="item-header">
          <span>${exp.jobTitle || exp.role}</span>
          <span>${formatDate(exp.startDate)} - ${exp.endDate ? formatDate(exp.endDate) : 'Present'}</span>
        </div>
        <div class="item-sub">${exp.company}</div>
        <div class="content">${renderDesc(exp.description)}</div>
      </div>
    `).join("")}

    <div class="section-title">Projects</div>
    ${(data.projects || []).map((p: any) => `
      <div class="item">
        <div class="item-header">
          <span>${p.name}</span>
          ${p.link ? `<span class="link">View Project</span>` : ''}
        </div>
        <div class="content">${renderDesc(p.description)}</div>
      </div>
    `).join("")}

    <div class="section-title">Education</div>
    ${(data.education || []).map((edu: any) => `
      <div class="item">
        <div class="item-header">
          <span>${edu.degree}</span>
          <span>${formatDate(edu.startDate)} - ${formatDate(edu.endDate)}</span>
        </div>
        <div class="item-sub">${edu.school}</div>
      </div>
    `).join("")}

    <div class="section-title">Skills</div>
    <div style="margin-top:12px;">
      ${(data.skills || []).map((skill: string) => `<span class="skill-tag">${skill}</span>`).join("")}
    </div>
  </div>
</body>
</html>`;
};