import { type User, type InsertUser, type Project, type InsertProject } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getProjects(): Promise<Project[]>;
  createProject(project: InsertProject): Promise<Project>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private projects: Map<string, Project>;

  constructor() {
    this.users = new Map();
    this.projects = new Map();
    this.seedProjects();
  }

  private seedProjects() {
    const sampleProjects: InsertProject[] = [
      {
        title: "Smart Home Automation System",
        description: "IoT-based home automation system using ESP32 microcontroller with real-time sensor monitoring, mobile app control, and voice assistant integration for seamless smart home experience.",
        techStack: ["ESP32", "Arduino", "MQTT", "Firebase", "React Native"],
        demoLink: "https://github.com/anvaymayekar/smart-home",
        liveLink: "https://github.com/anvaymayekar/smart-home",
      },
      {
        title: "Autonomous Line Following Robot",
        description: "Competition-ready line following robot with PID control algorithm, infrared sensors array, and high-speed precision motor control achieving optimal path tracking performance.",
        techStack: ["Arduino", "C++", "PID Control", "Motor Drivers", "IR Sensors"],
        demoLink: "https://github.com/anvaymayekar/line-robot",
        liveLink: "https://github.com/anvaymayekar/line-robot",
      },
      {
        title: "Environmental Monitoring Station",
        description: "Real-time environmental data collection system measuring temperature, humidity, air quality, and noise levels with cloud-based data analytics and visualization dashboard.",
        techStack: ["Raspberry Pi", "Python", "InfluxDB", "Grafana", "MQTT"],
        demoLink: "https://github.com/anvaymayekar/env-monitor",
        liveLink: "https://github.com/anvaymayekar/env-monitor",
      },
      {
        title: "Gesture Controlled Robotic Arm",
        description: "6-DOF robotic arm controlled via hand gestures using computer vision and machine learning for intuitive human-robot interaction in industrial applications.",
        techStack: ["OpenCV", "TensorFlow", "Arduino", "Python", "MediaPipe"],
        demoLink: "https://github.com/anvaymayekar/gesture-arm",
        liveLink: "https://github.com/anvaymayekar/gesture-arm",
      },
      {
        title: "Solar Panel Tracking System",
        description: "Automated dual-axis solar panel tracking system using LDR sensors and servo motors to maximize energy efficiency by following the sun's position throughout the day.",
        techStack: ["Arduino", "Servo Motors", "LDR Sensors", "C++", "Energy Systems"],
        demoLink: "https://github.com/anvaymayekar/solar-tracker",
        liveLink: "https://github.com/anvaymayekar/solar-tracker",
      },
      {
        title: "Wireless Sensor Network",
        description: "Mesh network of wireless sensor nodes for distributed data collection with low-power communication protocols and edge computing capabilities for industrial monitoring.",
        techStack: ["ESP8266", "LoRa", "MQTT", "Node-RED", "TimescaleDB"],
        demoLink: "https://github.com/anvaymayekar/wsn-mesh",
        liveLink: "https://github.com/anvaymayekar/wsn-mesh",
      },
    ];

    sampleProjects.forEach((projectData) => {
      const id = randomUUID();
      const project: Project = { ...projectData, id };
      this.projects.set(id, project);
    });
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getProjects(): Promise<Project[]> {
    return Array.from(this.projects.values());
  }

  async createProject(insertProject: InsertProject): Promise<Project> {
    const id = randomUUID();
    const project: Project = { ...insertProject, id };
    this.projects.set(id, project);
    return project;
  }
}

export const storage = new MemStorage();
