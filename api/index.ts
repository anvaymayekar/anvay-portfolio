import type { VercelRequest, VercelResponse } from "@vercel/node";
import { storage } from "../server/storage";
import { insertProjectSchema } from "../shared/schema";

export default async function handler(req: VercelRequest, res: VercelResponse) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === "OPTIONS") {
        return res.status(200).end();
    }

    const path = req.url || "";

    try {
        if (path === "/api/projects" && req.method === "GET") {
            const projects = await storage.getProjects();
            return res.status(200).json(projects);
        }

        if (path === "/api/projects" && req.method === "POST") {
            const validatedData = insertProjectSchema.parse(req.body);
            const project = await storage.createProject(validatedData);
            return res.status(201).json(project);
        }

        if (path === "/api/education" && req.method === "GET") {
            const education = await storage.getEducation();
            return res.status(200).json(education);
        }

        if (path === "/api/experience" && req.method === "GET") {
            const experience = await storage.getExperience();
            return res.status(200).json(experience);
        }

        if (path === "/api/certifications" && req.method === "GET") {
            const certifications = await storage.getCertifications();
            return res.status(200).json(certifications);
        }

        if (path === "/api/achievements" && req.method === "GET") {
            const achievements = await storage.getAchievements();
            return res.status(200).json(achievements);
        }

        return res.status(404).json({ error: "Not found" });
    } catch (error) {
        console.error("API Error:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}
