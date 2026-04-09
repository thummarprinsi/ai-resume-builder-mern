import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import { analyzeResumeController, autoFillFormController, createResumeController, deleteResumeController,  downloadResumeController , duplicateResumeController, extractTextController, getResumeByIdController, getResumesController, jobMatchController, updateResumeController, updateTemplateController, uploadResumeController } from "../controllers/resumeController.js";
import { upload } from "../middlewares/uploadMiddleware.js";
import { aiLimiter } from "../middlewares/rateLimitMiddleware.js";


const resumeRouter = express.Router();

resumeRouter.post("/create",protect,createResumeController)
resumeRouter.get("/",protect,getResumesController)

resumeRouter.put("/update/:id",protect,updateResumeController)
resumeRouter.delete("/delete/:id",protect,deleteResumeController)
resumeRouter.post("/:id/duplicate",protect,duplicateResumeController)
resumeRouter.post("/upload",protect, aiLimiter,upload.single("resume"),uploadResumeController)
resumeRouter.post ("/extract-text",protect,upload.single("resume"),extractTextController)
resumeRouter.post("/auto-fill",protect, aiLimiter,autoFillFormController)
resumeRouter.post("/:id/analyze",protect, aiLimiter,analyzeResumeController)
resumeRouter.post("/:id/job-match",protect, aiLimiter,jobMatchController)
resumeRouter.put("/:id/template", protect, updateTemplateController);
resumeRouter.get("/:id/download",protect,downloadResumeController)
resumeRouter.get("/:id",protect,getResumeByIdController)

export default resumeRouter;