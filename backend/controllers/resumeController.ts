
import express from "express";
import { createResumeService, getResumeByIdService, updateResumeService, deleteResumeService, getUserResumesService, duplicateResumeService ,uploadResumeService, extractTextService,autoFillFromTextService, analyzeResumeService, jobMatchService, generatePDFService} from "../services/resumeService.js";
import Resume from "../models/Resume.js";
import mongoose from "mongoose";
import { resumeSchema } from "../validations/resumeValidation.js";

interface CustomRequest extends express.Request {
    user?: { userId: string };
}

export const createResumeController = async (req: CustomRequest, res: express.Response) => {
    try{
        const resume = await createResumeService(req.user?.userId as string);
        if(!resume){
            return res.status(404).json({
                success: false,
                message: "Resume not created",
            })
        }
        res.status(201).json({
            success: true,
            message: "Resume created successfully",
            resume
        }); 
    }catch(error: any){
        res.status(500).json({
            success: false,
            message: error.message,
        }); 
    }
};

export const getResumesController = async (req: CustomRequest, res: express.Response) => {
    try{
        const resumes = await getUserResumesService(req.user?.userId as string);
        if(resumes === null) {
            return res.status(404).json({
                success: false,
                message: "No resumes found",
            });
        }
        res.status(200).json({
            success: true,
            resumes
        }); 
    }catch(error: any){
        res.status(500).json({
            success: false,
            message: error.message,
        }); 
    }
};

export const getResumeByIdController = async (req: CustomRequest, res: express.Response) => {
    try{
        const resume = await getResumeByIdService(req.params.id as string, req.user?.userId as string);
        if(!resume) {
            return res.status(404).json({
                success: false,
                message: "Resume not found",
            });
        }
        res.status(200).json({
            success: true,
            resume
        }); 
    }catch(error: any){
        res.status(500).json({
            success: false,
            message: error.message,
        }); 
    }
};

export const updateResumeController = async (req: CustomRequest, res: express.Response) => {
    try{
        const parseData = resumeSchema.parse(req.body);
        const resume = await updateResumeService(req.params.id as string, req.user?.userId as string, parseData);
        if(!resume) {
            return res.status(404).json({
                success: false,
                message: "Resume not found",
            });
        }
        res.status(200).json({
            success: true,
            message: "Resume updated successfully",
            resume
        }); 
    }catch(error: any){
        res.status(500).json({
            success: false,
            message: error.message,
        }); 
    }
};

export const deleteResumeController = async (req: CustomRequest, res: express.Response) => {
    try{
        const resume = await deleteResumeService(req.params.id as string, req.user?.userId as string);
        if(!resume) {
            return res.status(404).json({
                success: false,
                message: "Resume not found",
            });
        }
        res.status(200).json({
            success: true,
            message: "Resume deleted successfully",
            resume
        }); 
    }catch(error: any){
        res.status(500).json({
            success: false,
            message: error.message,
        }); 
    }
};



export const duplicateResumeController = async (req: CustomRequest, res: express.Response) => {
    try{
        const newResume = await duplicateResumeService(req.params.id as string, req.user?.userId as string);
        if(!newResume) {
            return res.status(404).json({
                success: false,
                message: "Resume not found",
            });
        }
        res.status(201).json({
            success: true,
            resume:newResume    
        }); 
    }catch(error: any){
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
};


export const uploadResumeController = async (req: CustomRequest, res: express.Response) => {
    try{
        if(!req.file) {
            return res.status(400).json({
                success: false,
                message: "No file uploaded",
            });
        }
        const fileUrl = await uploadResumeService(req.file as Express.Multer.File);
        res.status(200).json({
            success: true,
            fileUrl
        }); 
    }catch(error: any){
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

export const extractTextController = async (req: CustomRequest, res: express.Response) => {
        try{
            if(!req.file) {
                return res.status(400).json({
                    success: false,
                    message: "No file uploaded",
                });
            }
            const text = await extractTextService(req.file);
        
        const { resumeId } = req.body;
const userId = req.user?.userId;

if (!userId) {
  return res.status(401).json({ message: "Unauthorized" });
}

if (resumeId) {

  if (!mongoose.Types.ObjectId.isValid(resumeId)) {
    return res.status(400).json({ message: "Invalid resumeId" });
  }

  const resume = await Resume.findOne({
    _id: new mongoose.Types.ObjectId(resumeId),
    userId: new mongoose.Types.ObjectId(userId),
  });

  if (!resume) {
    return res.status(404).json({ message: "Resume not found" });
  }

  resume.rawtext = text;
  await resume.save();
}
            res.status(200).json({
                success: true,
                text
            }); 
        }catch(error: any){
            console.log("Error:", error);
            res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }



export const autoFillFormController = async (req: CustomRequest, res: express.Response) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ 
        success: false, 
        message: "Text is required in request body" 
      });
    }

    const data = await autoFillFromTextService(text);
    

    return res.status(200).json({
      success: true,
      data,
    });
  } catch (error: any) {
   
    
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};




export const analyzeResumeController = async (req: CustomRequest, res: express.Response) => {
    try{
        const id = req.params.id;
const userId = req.user?.userId;

if (!id || Array.isArray(id)) {
  return res.status(400).json({ message: "Invalid ID" });
}

if (!userId) {
  return res.status(401).json({ message: "Unauthorized" });
}

const resume = await Resume.findOne({
  _id: id,
  userId: userId,
});

       if(!resume){
        return res.status(404).json({
            success:false,
            message:"Resume not found"
        })
       }
       const analysis = await analyzeResumeService(resume.resumeData);
       resume.atsScore = analysis.score;
       await resume.save();
       res.status(200).json({
        success: true,
        analysis
       });
    }
    catch(error: any){
        console.log("Analyze Resume Error:", error);
        
        res.status(500).json({
            success: false,
            message: error.message
        }); 
    }
};



export const jobMatchController = async (req: CustomRequest, res: express.Response) => {
    try{
       const { jobDescription } = req.body;
       const id = req.params.id;
const userId = req.user?.userId;

if (!id || Array.isArray(id)) {
  return res.status(400).json({ message: "Invalid ID" });
}

if (!userId) {
  return res.status(401).json({ message: "Unauthorized" });
}

const resume = await Resume.findOne({
  _id: id,
  userId: userId,
})

       if(!resume){
        return res.status(404).json({
            success:false,
            message:"Resume not found"
        })
       }
       const result = await jobMatchService(resume.resumeData,jobDescription);
       res.status(200).json({
        success: true,
        result
       });
    }
    catch(error: any){
        console.log("Job Match Error:", error);
        
        res.status(500).json({

            success: false,
            message: error.message
        }); 
    }
};


export const updateTemplateController = async (req: CustomRequest, res: express.Response) => {
  try {
    const { templateId } = req.body;

    if (!templateId) {
      return res.status(400).json({
        success: false,
        message: "templateId is required",
      });
    }

    const id = req.params.id;
    if (!id || Array.isArray(id)) {
      return res.status(400).json({ message: "Invalid ID" });
    }

    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const resume = await Resume.findOneAndUpdate(
      { _id: id, userId:userId },
      { templateId },
      { returnDocument: "after" }
    );

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "Resume not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Template updated successfully",
      resume,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



export const downloadResumeController = async (req: CustomRequest, res: express.Response) => {
    try{
        const id = req.params.id;
        if (!id || Array.isArray(id)) {
            return res.status(400).json({ message: "Invalid ID" });
        }
        const userId = req.user?.userId;
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const resume = await Resume.findOne({ _id: id,userId: userId });
        if(!resume) {
            return res.status(404).json({
                success:false,
                message:"Resume not found"
            })
        }
        const pdf = await generatePDFService(resume.resumeData,resume.templateId || "modern");

    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename=${resume.title || "resume"}.pdf`,
      "Content-Length": pdf.length
    });

    res.send(pdf);
  } catch (error: any) {
    res.status(500).json({ 
        success: false,
        message: error.message
     });
  }
};