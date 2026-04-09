import mongoose, { Schema } from "mongoose";

export interface Resume extends mongoose.Document {
    userId: mongoose.Types.ObjectId;
    title: string;
    resumeData: any;
    rawtext: string;
    atsScore: number;
    templateId: string;
}


const resumeSchema = new mongoose.Schema<Resume>({
    userId: {
       type: Schema.Types.ObjectId,
       ref: "User",
       required: true
    },
    title: {
        type: String,
        default: "Untitled Resume"
    },
    resumeData:{
       type: Schema.Types.Mixed,
      default: {
        personalInfo: { 
            name: "", 
            email: "", 
            phone: "", 
            address: "",
            linkedin: "",
            github: "",    
            portfolio: ""    
        },
        summary: "",
        skills: [],         
        experience: [],      
        education: [],       
        projects: []         
    }
    },
    rawtext:{
        type: String,
        default: ""
    },
    atsScore:{
        type: Number,
        default: 0
    },
    templateId: {
        type: String,
        default: "modern"
    }

}, {
    timestamps: true
});

export default mongoose.model<Resume>("Resume", resumeSchema);