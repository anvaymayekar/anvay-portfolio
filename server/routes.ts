import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertProjectSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
    app.get("/api/projects", async (_req, res) => {
        try {
            const projects = await storage.getProjects();
            res.json(projects);
        } catch (error) {
            res.status(500).json({ error: "Failed to fetch projects" });
        }
    });

    app.post("/api/projects", async (req, res) => {
        try {
            const validatedData = insertProjectSchema.parse(req.body);
            const project = await storage.createProject(validatedData);
            res.status(201).json(project);
        } catch (error) {
            res.status(400).json({ error: "Invalid project data" });
        }
    });

    app.get("/api/education", async (_req, res) => {
        try {
            const education = await storage.getEducation();
            res.json(education);
        } catch (error) {
            res.status(500).json({ error: "Failed to fetch education" });
        }
    });
    app.get("/api/experience", async (_req, res) => {
        try {
            const experience = await storage.getExperience();
            res.json(experience);
        } catch (error) {
            res.status(500).json({ error: "Failed to fetch experience" });
        }
    });
    app.get("/api/certifications", async (_req, res) => {
        try {
            const certifications = await storage.getCertifications();
            res.json(certifications);
        } catch (error) {
            res.status(500).json({ error: "Failed to fetch certifications" });
        }
    });

    app.get("/api/achievements", async (_req, res) => {
        try {
            const achievements = await storage.getAchievements();
            res.json(achievements);
        } catch (error) {
            res.status(500).json({ error: "Failed to fetch achievements" });
        }
    });

    const httpServer = createServer(app);

    return httpServer;
}
