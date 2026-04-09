

import puppeteer from "puppeteer";
import cloudinary from "../config/cloudinary.js";
import genAI from "../config/gemini.js";
import Resume from "../models/Resume.js";

import fs from "fs";
import { modernTemplate } from "../template/modernTemplate.js";
import { classicTemplate } from "../template/classicTemplate.js";
import { minimalTemplate } from "../template/minimalTemplate.js";

const safeJSONParse = (text: string) => {
  try {
    return JSON.parse(text);
  } catch (error) {
    return null;
  }
};

export const createResumeService = async (userId: string) => {
   return await Resume.create({ userId, title: "Untitled Resume" });
};

export const getUserResumesService = async (userId: string) => {
    const resumes = await Resume.find({ userId }).sort({ createdAt: -1 });
    return resumes;
};

export const getResumeByIdService = async (id: string, userId: string) => {
    return await Resume.findOne({ _id: id, userId });
};  

export const updateResumeService = async (id: string, userId: string, data: any) => {
    return await Resume.findOneAndUpdate({ _id: id, userId }, data, { new: true });
};

export const deleteResumeService = async (id: string,userId: string) => {
    return await Resume.findOneAndDelete({ _id: id, userId });
};


export const duplicateResumeService = async (id: string,userId: string) => {
    const existingResume = await Resume.findOne({ _id: id, userId });

    if(!existingResume) throw new Error("Resume not found");

    const newResume = await Resume.create({
        userId:existingResume.userId,
        title:existingResume.title + " Copy",
        resumeData:existingResume.resumeData,
        rawtext:existingResume.rawtext,
        templateId:existingResume.templateId
    });
    return newResume;
}


export const uploadResumeService = async (file: Express.Multer.File) => {
   try{
    const result = await cloudinary.uploader.upload(file.path, { folder: "resumes",resource_type: "auto" });
    
    return result.secure_url;
   }
   finally{
    if (file?.path && fs.existsSync(file.path)) {
  fs.unlinkSync(file.path);
}
   }

    
};




export const extractTextService = async (file: Express.Multer.File) => {
 try{
   const dataBuffer = fs.readFileSync(file.path);

  const pdf = (await import("pdf-parse")).default; 

  const data = await pdf(dataBuffer);


  return data.text;

 }finally{
   if (file?.path && fs.existsSync(file.path)) {
  fs.unlinkSync(file.path);
}
 }
};


export const autoFillFromTextService = async (text: string) => {
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

 const prompt = `
You are a strict resume parsing engine for an autofill form system.

Return ONLY a valid JSON object. No markdown, no backticks, no explanation.

CRITICAL RULES:
- Missing fields → use null (NOT "", NOT undefined)
- Missing arrays → return []
- Do NOT guess or fabricate information
- Extract only explicitly available data
- If multiple values exist for a field, return the most recent or most relevant one
- Do not return empty strings or whitespace-only values; use null instead
- Do not add fields outside the defined schema
- Normalize dates → "MMM YYYY - MMM YYYY" or "MMM YYYY - Present"
- Remove duplicate entries
- Clean bullet points (•, -, *) from descriptions
- Keep descriptions concise (max 2 lines)
- Skills must be a flat array of strings (no nesting)
- Ensure JSON is always valid and parsable
- Escape special characters properly

OUTPUT SCHEMA:
{
  "personalInfo": {
    "name": string | null,
    "email": string | null,
    "phone": string | null,
    "location": string | null,
    "linkedin": string | null,
    "portfolio": string | null
  },
  "summary": string | null,
  "skills": string[],
  "experience": [
    {
      "title": string | null,
      "company": string | null,
      "location": string | null,
      "duration": string | null,
      "description": string | null
    }
  ],
  "education": [
    {
      "degree": string | null,
      "institution": string | null,
      "location": string | null,
      "duration": string | null,
      "score": string | null
    }
  ],
  "projects": [
    {
      "name": string | null,
      "description": string | null,
      "technologies": string[]
    }
  ]
}

Resume Text:
${text}
`;

  try {
    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: {
        responseMimeType: "application/json",
      },
    });

    const rawText = result.response.text();

const parsed = safeJSONParse(rawText);

if (!parsed) {
  console.error("Invalid AI response:", rawText);
  throw new Error("AI parsing failed");
}

return parsed;
  } catch (error: any) {
    console.error("SERVICE ERROR:", error);
    throw error;
  }
};

export const analyzeResumeService = async (resumeData: any) => {
  
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
  const prompt = `You are an ATS (Applicant Tracking System) expert.

Analyze the given resume data carefully.

IMPORTANT RULES:
- DO NOT mark a section as missing if it exists in the data
- Evaluate realistically like a recruiter
- Give score based on quality, not just presence

Return ONLY JSON in this format:

{
  "score": number (0-100),
  "missingSkills": [],
  "suggestions": []
}

Evaluation criteria:
- Summary quality
- Skills relevance
- Project quality
- Education
- Overall clarity

Resume Data:
${JSON.stringify(resumeData, null, 2)}
`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const output = response.text();

  const cleanText = output
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

 const parsed = safeJSONParse(cleanText);

if (!parsed) {
  return {
    score: 0,
    missingSkills: [],
    suggestions: ["AI response parsing failed"],
  };
}

return parsed;  
};

export const jobMatchService = async (resumeData: any,jobDescription: string) => {

  // 'gemini-1.5-flash' ને બદલે 'gemini-2.5-flash' લખો
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
 const prompt = `
Compare this resume with the job description.

Return ONLY JSON:

{
  "matchScore": number,
  "missingSkills": [],
  "suggestions": []
}

Resume:
${JSON.stringify(resumeData, null, 2)}

Job Description:
${jobDescription}
`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const output = response.text();

  const cleanText = output
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  const parsed = safeJSONParse(cleanText);

if (!parsed) {
  return {
    matchScore: 0,
    missingSkills: [],
    suggestions: ["AI response parsing failed"],
  };
}

return parsed;
};


export const generatePDFService = async (resumeData: any, templateId: string = "modern") => {
  // Puppeteer launch configuration
  const browser = await puppeteer.launch({ 
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"] 
  });

  try {
    const page = await browser.newPage();
    let html = "";

    // Template selection based on templateId
    switch (templateId) {
      case "classic":
        html = classicTemplate(resumeData);
        break;
      case "minimal":
        html = minimalTemplate(resumeData);
        break;
      case "modern":
      default:
        html = modernTemplate(resumeData);
        break;
    }

    
    await page.setContent(html, { waitUntil: "networkidle0" });

    // Generate PDF Buffer
    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: {
        top: "10mm",
        bottom: "10mm",
        left: "10mm",
        right: "10mm"
      }
    });

    return pdfBuffer;
  } catch (error: any) {
    throw new Error(`PDF Generation failed: ${error.message}`);
  } finally {
    await browser.close(); 
  }
};