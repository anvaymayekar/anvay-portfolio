import {
  type User,
  type InsertUser,
  type Project,
  type InsertProject,
  type Education,
  type InsertEducation,
  type Certification,
  type InsertCertification,
  type Achievement,
  type InsertAchievement,
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getProjects(): Promise<Project[]>;
  createProject(project: InsertProject): Promise<Project>;
  getEducation(): Promise<Education[]>;
  getCertifications(): Promise<Certification[]>;
  getAchievements(): Promise<Achievement[]>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private projects: Map<string, Project>;
  private education: Map<string, Education>;
  private certifications: Map<string, Certification>;
  private achievements: Map<string, Achievement>;

  constructor() {
    this.users = new Map();
    this.projects = new Map();
    this.education = new Map();
    this.certifications = new Map();
    this.achievements = new Map();
    this.seedData();
  }

  private seedData() {
    // Seed Projects with rich data
    const sampleProjects: Array<Omit<Project, 'id'>> = [
      {
        title: "Smart Home Automation System",
        description: "IoT-based home automation with ESP32, real-time monitoring, and voice control",
        fullDescription: "Comprehensive IoT-based home automation system using ESP32 microcontroller with real-time sensor monitoring, mobile app control, and voice assistant integration. Features include automated lighting, temperature control, security monitoring, and energy usage analytics. The system integrates with Alexa and Google Assistant for voice commands and provides real-time notifications through a custom React Native mobile application.",
        techStack: ["ESP32", "Arduino", "MQTT", "Firebase", "React Native", "Alexa API"],
        role: "Lead Developer & Hardware Engineer",
        duration: "June 2024 - September 2024",
        highlights: [
          "Reduced energy consumption by 30% through automated scheduling",
          "Integrated 15+ IoT sensors for comprehensive home monitoring",
          "Achieved 99.5% uptime with redundant communication protocols",
          "Won Best Innovation Award at SAKEC Tech Fest 2024"
        ],
        images: [
          "@assets/generated_images/Smart_Home_Dashboard_Preview_f254f8c6.png"
        ],
        coverImage: "@assets/generated_images/Smart_Home_Dashboard_Preview_f254f8c6.png",
        demoLink: "https://github.com/anvaymayekar/smart-home",
        liveLink: "https://github.com/anvaymayekar/smart-home",
        size: "large"
      },
      {
        title: "Autonomous Line Following Robot",
        description: "Competition-ready robot with PID control and precision tracking",
        fullDescription: "Competition-ready line following robot with PID control algorithm, infrared sensors array, and high-speed precision motor control achieving optimal path tracking performance. The robot features advanced path prediction algorithms, obstacle detection, and can navigate complex tracks at speeds up to 2 meters per second. Implemented custom PID tuning system for adaptive performance in varying track conditions.",
        techStack: ["Arduino", "C++", "PID Control", "Motor Drivers", "IR Sensors"],
        role: "Robotics Engineer",
        duration: "March 2024 - May 2024",
        highlights: [
          "Secured 2nd place in National Robotics Championship 2024",
          "Achieved track completion time of under 15 seconds",
          "Developed custom PID auto-tuning algorithm",
          "Published research paper on optimization techniques"
        ],
        images: [
          "@assets/generated_images/Line_Following_Robot_0dcf337a.png"
        ],
        coverImage: "@assets/generated_images/Line_Following_Robot_0dcf337a.png",
        demoLink: "https://github.com/anvaymayekar/line-robot",
        liveLink: "https://github.com/anvaymayekar/line-robot",
        size: "medium"
      },
      {
        title: "Environmental Monitoring Station",
        description: "Real-time environmental data collection with cloud analytics",
        fullDescription: "Real-time environmental data collection system measuring temperature, humidity, air quality (PM2.5, PM10), noise levels, and atmospheric pressure with cloud-based data analytics and visualization dashboard. The system uses multiple calibrated sensors, stores data in InfluxDB time-series database, and provides real-time alerts for abnormal environmental conditions. Features predictive analytics for air quality forecasting.",
        techStack: ["Raspberry Pi", "Python", "InfluxDB", "Grafana", "MQTT", "TensorFlow"],
        role: "IoT Developer & Data Analyst",
        duration: "January 2024 - April 2024",
        highlights: [
          "Deployed across 5 campus locations for air quality monitoring",
          "Processed over 1 million data points with 99.9% accuracy",
          "Created predictive models with 85% accuracy for air quality forecasting",
          "Implemented automated alert system reducing response time by 60%"
        ],
        images: [
          "@assets/generated_images/Environmental_Monitoring_Station_3fcd420a.png"
        ],
        coverImage: "@assets/generated_images/Environmental_Monitoring_Station_3fcd420a.png",
        demoLink: "https://github.com/anvaymayekar/env-monitor",
        liveLink: "https://github.com/anvaymayekar/env-monitor",
        size: "small"
      },
      {
        title: "Gesture Controlled Robotic Arm",
        description: "6-DOF arm with computer vision control for intuitive interaction",
        fullDescription: "6-DOF robotic arm controlled via hand gestures using computer vision and machine learning for intuitive human-robot interaction in industrial applications. Utilizes MediaPipe for hand tracking, TensorFlow for gesture recognition, and custom inverse kinematics algorithms for precise arm movement. Capable of performing pick-and-place operations with millimeter accuracy based on simple hand gestures.",
        techStack: ["OpenCV", "TensorFlow", "Arduino", "Python", "MediaPipe", "ROS"],
        role: "Computer Vision Engineer",
        duration: "October 2023 - February 2024",
        highlights: [
          "Achieved 95% gesture recognition accuracy in real-time",
          "Reduced operator training time by 70% compared to traditional controls",
          "Implemented 12 distinct gesture commands for complex operations",
          "Featured in IEEE Conference on Robotics and Automation"
        ],
        images: [],
        coverImage: null,
        demoLink: "https://github.com/anvaymayekar/gesture-arm",
        liveLink: "https://github.com/anvaymayekar/gesture-arm",
        size: "medium"
      },
      {
        title: "Solar Panel Tracking System",
        description: "Dual-axis sun tracker maximizing energy efficiency",
        fullDescription: "Automated dual-axis solar panel tracking system using LDR sensors and servo motors to maximize energy efficiency by following the sun's position throughout the day. The system continuously adjusts panel orientation to maintain perpendicular alignment with sunlight, improving energy capture by up to 40% compared to fixed installations. Features weather-resistant design and automatic park mode during adverse conditions.",
        techStack: ["Arduino", "Servo Motors", "LDR Sensors", "C++", "Energy Systems"],
        role: "Embedded Systems Developer",
        duration: "August 2023 - November 2023",
        highlights: [
          "Increased solar energy capture by 38% compared to fixed panels",
          "Designed weatherproof enclosure surviving monsoon conditions",
          "Implemented energy-efficient tracking algorithm using minimal power",
          "Reduced payback period from 8 years to 5.2 years"
        ],
        images: [],
        coverImage: null,
        demoLink: "https://github.com/anvaymayekar/solar-tracker",
        liveLink: "https://github.com/anvaymayekar/solar-tracker",
        size: "small"
      },
      {
        title: "Wireless Sensor Network",
        description: "Mesh network with LoRa for industrial monitoring",
        fullDescription: "Mesh network of wireless sensor nodes for distributed data collection with low-power communication protocols and edge computing capabilities for industrial monitoring. Implements LoRa technology for long-range communication (up to 5km), ESP8266 microcontrollers for processing, and MQTT protocol for reliable data transmission. Supports up to 50 sensor nodes with automatic mesh network formation and self-healing capabilities.",
        techStack: ["ESP8266", "LoRa", "MQTT", "Node-RED", "TimescaleDB"],
        role: "Network Engineer",
        duration: "May 2023 - September 2023",
        highlights: [
          "Deployed 30-node network covering 2km² industrial area",
          "Achieved 6-month battery life with optimized sleep cycles",
          "Maintained 99.2% network uptime with self-healing mesh",
          "Processed real-time data from 30+ sensors simultaneously"
        ],
        images: [],
        coverImage: null,
        demoLink: "https://github.com/anvaymayekar/wsn-mesh",
        liveLink: "https://github.com/anvaymayekar/wsn-mesh",
        size: "large"
      },
    ];

    sampleProjects.forEach((projectData) => {
      const id = randomUUID();
      const project: Project = { ...projectData, id };
      this.projects.set(id, project);
    });

    // Seed Education
    const educationData: Array<Omit<Education, 'id'>> = [
      {
        institution: "Shah & Anchor Kutchhi Engineering College (SAKEC)",
        degree: "Bachelor of Technology",
        field: "Electronics & Computer Science",
        duration: "2023 - 2027 (Expected)",
        grade: "8.9 CGPA",
        description: "Currently pursuing B.Tech with focus on Embedded Systems, IoT, and Robotics. Active member of the Robotics Club and Electronics Society. Consistently ranked in top 10% of the class.",
        logo: null
      },
      {
        institution: "Pace Junior Science College",
        degree: "Higher Secondary Certificate (HSC)",
        field: "Science (PCM with Computer Science)",
        duration: "2021 - 2023",
        grade: "92.5%",
        description: "Specialized in Physics, Chemistry, Mathematics, and Computer Science. Developed strong foundation in programming and mathematical concepts. School topper in Computer Science.",
        logo: null
      }
    ];

    educationData.forEach((data) => {
      const id = randomUUID();
      this.education.set(id, { ...data, id });
    });

    // Seed Certifications
    const certificationsData: Array<Omit<Certification, 'id'>> = [
      {
        title: "AWS Certified Cloud Practitioner",
        issuer: "Amazon Web Services",
        date: "September 2024",
        credentialId: "AWS-CCP-2024-AM-001",
        credentialUrl: "https://aws.amazon.com/certification",
        description: "Demonstrated fundamental understanding of AWS Cloud, services, and terminology. Covered cloud concepts, security, technology, and billing & pricing.",
        logo: null
      },
      {
        title: "Arduino Advanced Certification",
        issuer: "Arduino Official",
        date: "July 2024",
        credentialId: "ARD-ADV-2024-7892",
        credentialUrl: "https://www.arduino.cc/certification",
        description: "Advanced proficiency in Arduino programming, circuit design, and IoT integration. Covered sensors, actuators, communication protocols, and embedded systems design.",
        logo: null
      },
      {
        title: "Introduction to TensorFlow for AI, ML and DL",
        issuer: "DeepLearning.AI (Coursera)",
        date: "May 2024",
        credentialId: "COURSERA-TF-5634",
        credentialUrl: "https://coursera.org/verify/TF5634",
        description: "Comprehensive introduction to TensorFlow for building neural networks, understanding computer vision, and implementing machine learning models.",
        logo: null
      },
      {
        title: "Embedded Systems Design",
        issuer: "NPTEL (IIT Kharagpur)",
        date: "March 2024",
        credentialId: "NPTEL24ES0156",
        credentialUrl: null,
        description: "12-week intensive course on embedded systems design covering microcontroller architecture, real-time operating systems, and hardware-software co-design.",
        logo: null
      }
    ];

    certificationsData.forEach((data) => {
      const id = randomUUID();
      this.certifications.set(id, { ...data, id });
    });

    // Seed Achievements
    const achievementsData: Array<Omit<Achievement, 'id'>> = [
      {
        title: "Best Innovation Award - SAKEC Tech Fest 2024",
        category: "Competition",
        date: "October 2024",
        description: "Won first place for Smart Home Automation System among 50+ competing projects. Project was recognized for its practical implementation and innovative use of IoT technologies.",
        organization: "SAKEC",
        icon: "trophy"
      },
      {
        title: "National Robotics Championship - 2nd Place",
        category: "Competition",
        date: "May 2024",
        description: "Secured second position in the Line Following Robot category at National Robotics Championship with autonomous navigation and precision control.",
        organization: "Robotics Society of India",
        icon: "award"
      },
      {
        title: "Research Paper Published - IEEE Conference",
        category: "Research",
        date: "August 2024",
        description: "Published paper on 'Optimization Techniques for PID Control in Autonomous Robots' at IEEE International Conference on Robotics and Automation.",
        organization: "IEEE",
        icon: "book"
      },
      {
        title: "Smart India Hackathon - Finalist",
        category: "Hackathon",
        date: "March 2024",
        description: "Selected as one of the finalists among 10,000+ teams for developing an innovative environmental monitoring solution using IoT.",
        organization: "Government of India",
        icon: "code"
      },
      {
        title: "Dean's List - Academic Excellence",
        category: "Academic",
        date: "December 2023",
        description: "Recognized for outstanding academic performance with CGPA above 8.5 for consecutive semesters. Maintained top 5% ranking in the department.",
        organization: "SAKEC",
        icon: "star"
      }
    ];

    achievementsData.forEach((data) => {
      const id = randomUUID();
      const achievement: Achievement = {
        ...data,
        id,
        organization: data.organization ?? null,
        icon: data.icon ?? null,
      };
      this.achievements.set(id, achievement);
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
    const project: Project = { 
      ...insertProject, 
      id,
      demoLink: insertProject.demoLink ?? null,
      liveLink: insertProject.liveLink ?? null,
      role: insertProject.role ?? null,
      duration: insertProject.duration ?? null,
      highlights: insertProject.highlights ?? null,
      images: insertProject.images ?? null,
      coverImage: insertProject.coverImage ?? null,
      size: insertProject.size ?? "medium",
    };
    this.projects.set(id, project);
    return project;
  }

  async getEducation(): Promise<Education[]> {
    return Array.from(this.education.values());
  }

  async getCertifications(): Promise<Certification[]> {
    return Array.from(this.certifications.values());
  }

  async getAchievements(): Promise<Achievement[]> {
    return Array.from(this.achievements.values());
  }
}

export const storage = new MemStorage();
