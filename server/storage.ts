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
    type Experience,
    type InsertExperience,
} from "@shared/schema";
import { randomUUID } from "crypto";

function urls(title: string, ...imgs: string[]): string[] {
    return imgs.map(
        (img) =>
            `https://raw.githubusercontent.com/anvaymayekar/${title}/master/${img}`,
    );
}

function gitUrl(repo: string, author: string = "anvaymayekar"): string {
    return `https://github.com/${author}/${repo}.git`;
}

export interface IStorage {
    getUser(id: string): Promise<User | undefined>;
    getUserByUsername(username: string): Promise<User | undefined>;
    createUser(user: InsertUser): Promise<User>;
    getProjects(): Promise<Project[]>;
    createProject(project: InsertProject): Promise<Project>;
    getEducation(): Promise<Education[]>;
    getCertifications(): Promise<Certification[]>;
    getAchievements(): Promise<Achievement[]>;
    getExperience(): Promise<Experience[]>;
}

export class MemStorage implements IStorage {
    private users: Map<string, User>;
    private projects: Map<string, Project>;
    private education: Map<string, Education>;
    private certifications: Map<string, Certification>;
    private achievements: Map<string, Achievement>;
    private experiences: Map<string, Experience>;

    constructor() {
        this.users = new Map();
        this.projects = new Map();
        this.education = new Map();
        this.certifications = new Map();
        this.achievements = new Map();
        this.experiences = new Map();
        this.seedData();
    }

    private seedData() {
        // Seed Projects with rich data - REMOVED techStack
        const sampleProjects: Array<Omit<Project, "id">> = [
            {
                title: "Project SIRA",
                description:
                    "Spider-Inspired Robotic Architecture - The Hexapod",
                fullDescription:
                    "Project SIRA is an ongoing bio-inspired hexapod robotics project developed from scratch at the college IDEA Lab, pioneered by me along with my team under the guidance of Prof. Santosh Kamble. Inspired by arachnid locomotion, it features a fully articulated six-legged architecture with 18 degrees of freedom for stable and adaptive movement across unstructured terrain. The platform uses a modular 3D-printed mechanical design and is being developed as a research-focused system for multi-legged locomotion, gait planning, and autonomous robotics.",
                role: "AICTE Idealab, SAKEC & ECS dept.",
                duration: "Aug `25 - Aug '26",
                highlights: [
                    "Hexapod robotic platform with 6 legs and 18 degrees of freedom.",
                    "Fully 3D-printed mechanical structure designed and fabricated in-house.",
                    "Bio-inspired locomotion supporting multiple gait patterns and terrain adaptability.",
                    "Modular design for easy upgrades and scalability.",
                ],
                images: urls(
                    "project-sira",
                    "sample/001.JPG",
                    "sample/002.JPG",
                    "sample/003.JPG",
                ),
                coverImage: null,
                demoLink: null,
                liveLink: gitUrl("project-sira"),
                paperLink: null,
                size: "medium",
            },
            {
                title: ".mr: Marathi, Understood by Machines",
                description:
                    "A Marathi Programming Language Compiled to Native Machine Code",
                fullDescription:
                    "A Marathi programming language built from scratch in C++20. The compiler takes Marathi-inspired source code through lexing, parsing, AST construction, semantic analysis, and native x86-64 assembly generation. The language features Marathi syntax for variables, types, control flow, functions, operators, and program flow, with support for both scalar and collection-oriented declarations.",
                role: "Language & Compiler Project",
                duration: "July '26 - Aug '26",
                highlights: [
                    "Custom lexer, parser, AST, semantic analysis, and native code generation pipeline.",
                    "Marathi-inspired syntax covering types, variables, control flow, functions, operators, and program termination.",
                    "Generates native x86-64 assembly without an interpreter or bytecode virtual machine.",
                    "Built from scratch in modern C++20 with a growing test suite for lexing, parsing, semantics, and code generation.",
                ],
                images: urls(
                    "custom-compiler",
                    "docs/1.png",
                    "docs/2.png",
                    "docs/3.png",
                ),
                coverImage: null,
                demoLink: null,
                liveLink: gitUrl("custom-compiler"),
                paperLink: null,
                size: "medium",
            },
            {
                title: "ASCII Cam",
                description:
                    "Real-Time ASCII Art Renderer from Live Camera Feed",
                fullDescription:
                    "A real-time webcam renderer that converts live camera output into colored ASCII art directly in the terminal, built in C++17 with OpenCV. Features true 24-bit ANSI color per character, auto terminal size detection, and a Matrix rain mode where falling drops are brightness-mapped to the live camera feed. Built from scratch on Windows with MSYS2/MinGW and OpenCV compiled from source.",
                role: "Curiosity Project",
                duration: "Mar '26",
                highlights: [
                    "Live webcam feed rendered as true-color ASCII art using 24-bit ANSI escape sequences.",
                    "Matrix rain mode with per-column drop state, trail aging, and camera brightness shaping rain intensity.",
                    "Auto terminal sizing — frame adapts instantly on window resize.",
                    "FPS-capped render loop using std::chrono::steady_clock to prevent CPU burn.",
                ],
                images: urls("ascii-cam", "assets/demo.gif"),
                coverImage: null,
                demoLink: null,
                liveLink: gitUrl("ascii-cam"),
                paperLink: null,
                size: "medium",
            },
            {
                title: "AVL Tree Visualizer",
                description:
                    "A Realtime AVL Tree Visualizer developed using Win32 API",
                fullDescription:
                    "This AVL Tree Visualizer is a native Windows desktop application built entirely in C using the Win32 API and GDI+, designed to demonstrate the inner workings of self-balancing binary search trees. It provides real-time visualization of insert, search, and delete operations, clearly illustrating balance factors and rotation types (LL, RR, LR, RL) as they occur. The application features smooth, double-buffered rendering, microsecond-precision performance measurement, and an interactive UI, making it an effective educational and analytical tool for understanding AVL tree behavior and time complexity guarantees.",
                role: "DSA",
                duration: "Dec `25",
                highlights: [
                    "Real-time visualization of AVL tree insert, search, and delete operations.",
                    "Automatic detection and animation of LL, RR, LR, and RL rotations.",
                    "Balance factor and height display for every node with live updates.",
                    "High-performance native Windows GUI with precise execution time metrics.",
                ],
                images: urls("avl-tree-visualizer", "sample/demo.gif"),
                coverImage: null,
                demoLink: null,
                liveLink: gitUrl("avl-tree-visualizer"),
                paperLink: null,
                size: "medium",
            },
            {
                title: "UR5 Simulation",
                description: "Robotic Arm Pick-and-Place Simulation in MATLAB",
                fullDescription:
                    "A comprehensive UR5 robotic arm simulation implementing multi-object pick-and-place tasks with real-time control capabilities. The project leverages MATLAB's Robotics System Toolbox to simulate the robot, its kinematics, and object manipulation. Users can interactively configure objects, dynamically adjust animation speed during execution, and run the simulation with a user-friendly GUI.",
                role: "MDM I - Robotics",
                duration: "Nov `25",
                highlights: [
                    "Multi-object UR5 pick-and-place simulation with configurable positions and sequential task execution.",
                    "Smooth trajectory planning using inverse kinematics and trapezoidal velocity profiles.",
                    "Interactive MATLAB GUI with real-time speed control, presets, and live status feedback.",
                    "Rich 3D visualization with path trails, end-effector tracking, and full workspace interaction.",
                ],
                images: urls("ur5-simulation", "sample/demo.gif"),
                coverImage: null,
                demoLink: null,
                liveLink: gitUrl("ur5-simulation"),
                paperLink: null,
                size: "medium",
            },
            {
                title: "Cancer Survival Analysis",
                description:
                    "Statistical Python tool for modeling cancer patient survival",
                fullDescription:
                    "Cancer Survival Analysis is an educational and academically rigorous Python project for modeling cancer patient survival times using the exponential distribution. It integrates Monte Carlo simulation, hypothesis testing, bootstrap inference, and publication-quality visualizations, providing a reproducible, mathematically grounded, and type-safe platform for survival analysis and healthcare analytics.",
                role: "Mathematical Techniques",
                duration: "Oct - Nov `25",
                highlights: [
                    "Simulates patient survival times with exponential distributions and Monte Carlo methods.",
                    "Validates model fit using Kolmogorov–Smirnov and Anderson–Darling tests.",
                    "Generates bootstrap confidence intervals for robust statistical inference.",
                    "Produces publication-quality survival curves, Q–Q plots, and probability heatmaps.",
                ],
                images: urls(
                    "cancer-survival-analysis",
                    "images/001.jpg",
                    "images/002.jpg",
                    "images/003.jpg",
                ),
                coverImage: null,
                demoLink: null,
                liveLink: gitUrl("cancer-survival-analysis"),
                paperLink: null,
                size: "medium",
            },

            {
                title: "Ultrasonic Radar",
                description:
                    "Real-Time Object Detection & Visualization System",
                fullDescription:
                    "A Java Swing–based ultrasonic radar system that interfaces with an Arduino-controlled HC-SR04 sensor and MG995 servo via HC-05 Bluetooth to provide real-time object detection and visualization. The project combines embedded hardware control with a responsive desktop GUI featuring a classic radar sweep animation, robust serial communication, and fault-tolerant data handling.",
                role: "Electronics Devices & Circuits",
                duration: "Oct `25",
                highlights: [
                    "Real-time radar visualization with smooth sweep animation and object detection overlay.",
                    "Wireless Bluetooth communication between Arduino and Java GUI with auto-detection and reconnection.",
                    "Integrated servo-driven ultrasonic scanning over a 180° arc with live distance and angle tracking.",
                    "Thread-safe, robust design featuring data validation, timeout handling, and graceful fallback to serial communication.",
                ],
                images: urls("ultrasonic-radar", "sample/demo.gif"),
                coverImage: null,
                demoLink: null,
                liveLink: gitUrl("ultrasonic-radar"),
                paperLink: null,
                size: "medium",
            },
            {
                title: "Currency Converter Pro",
                description:
                    "A simple Currency Converter application built in Java using Swing",
                fullDescription:
                    "A desktop currency converter developed in Java using Swing and AWT, backed by a NoSQL database for data storage. This project serves as a hands-on exercise in Java OOP, GUI development, database interaction, and robust exception handling within a simple yet functional application.",
                role: "OOPM in Java",
                duration: "Oct `25",
                highlights: [
                    "Interactive desktop GUI built with Java Swing and AWT.",
                    "NoSQL database integration for storing and retrieving currency data.",
                    "Clean object-oriented design with proper exception handling.",
                    "Built and managed using Maven for easy setup and execution.",
                ],
                images: urls(
                    "currency-converter",
                    "images/001.png",
                    "images/002.png",
                    "images/003.png",
                ),
                coverImage: null,
                demoLink: null,
                liveLink: gitUrl("currency-converter"),
                paperLink: null,
                size: "medium",
            },
            {
                title: "Text Flow",
                description:
                    "Python-Based Probabilistic Text Generator using 2nd-Order Markov Chains",
                fullDescription:
                    "TextFlow is an educational and lightweight text generation engine implemented from scratch using 2nd-order Markov Chains in pure Python. It supports incremental training, sparse state transition matrices, Laplace smoothing, and context-aware anti-repetition mechanisms, allowing for efficient, reproducible, and mathematically grounded probabilistic text generation across diverse corpora.",
                role: "Curiosity Project",
                duration: "Sept `25",
                highlights: [
                    "Generates text using 2nd-order Markov Chains with context-aware predictions.",
                    "Sparse transition matrices with Laplace smoothing for memory-efficient probability storage.",
                    "Incremental training with YAML and Pickle ensures resumable, crash-safe state persistence.",
                    "Supports deterministic, stochastic, and anti-repetition sampling modes.",
                ],
                images: urls(
                    "text-flow",
                    "sample/001.jpg",
                    "sample/002.jpg",
                    "sample/003.jpg",
                ),
                coverImage: null,
                demoLink: null,
                liveLink: gitUrl("text-flow"),
                paperLink: null,
                size: "medium",
            },
            {
                title: "IoT Pager - ByteBridge",
                description: "ESP32 & Python-Based Secure MQTT Pager",
                fullDescription:
                    "A rudimentary & secure MQTT-based pager system developed under 2 months summer internship program using ESP32 and Python. Messages sent from a Python CLI are received by ESP32 with OLED display, buzzer alert, and persistent flash storage. Powered by HiveMQ Cloud with TLS encryption and real-time status monitoring.",
                role: "AICTE Idealab, SAKEC",
                duration: "Jul `25",
                highlights: [
                    "Secure ESP32–Python MQTT pager using HiveMQ Cloud with TLS-encrypted communication.",
                    "Real-time message delivery with OLED display, buzzer alert, and onboard LED feedback.",
                    "Persistent message storage using ESP32 flash (NVS) with state restoration after reboot.",
                    "Built-in reliability features including WiFi/MQTT auto-reconnect, heartbeat monitoring, and message validation.",
                ],
                images: urls(
                    "iot-pager",
                    "images/002.PNG",
                    "images/004.PNG",
                    "images/005.PNG",
                ),
                coverImage: null,
                demoLink: null,
                liveLink: gitUrl("iot-pager"),
                paperLink: null,
                size: "medium",
            },
            // {
            //     title: "Project Twin",
            //     description:
            //         "ESP32 TX/RX IoT System with OLED and ThingSpeak Integration",
            //     fullDescription:
            //         "ProjectTwin developed under 2 months summer intersnhip workshop is a dual-node ESP32-based IoT system that utilizes ThingSpeak for cloud-mediated data exchange. The transmitter node generates and uploads five formatted float values at fixed intervals, while the receiver node polls the channel, parses the data, and displays it on a 128x64 I²C OLED along with buzzer and serial feedback.",
            //     role: "AICTE Idealab, SAKEC",
            //     duration: "Jun `25",
            //     highlights: [
            //         "Dual-node ESP32 IoT system with cloud-based data exchange using ThingSpeak.",
            //         "Periodic transmission and retrieval of five formatted values with rate-limit compliance.",
            //         "Real-time data display on Serial Monitor and 128×64 OLED with status indicators.",
            //         "Integrated WiFi status LED and buzzer feedback for successful data reception.",
            //     ],
            //     images: urls(
            //         "project-twin",
            //         "project-images/001.JPG",
            //         "project-images/005.JPG",
            //         "project-images/006.JPG",
            //     ),
            //     coverImage: null,
            //     demoLink: null,
            //     liveLink: gitUrl("project-twin"),
            //     paperLink: null,
            //     size: "medium",
            // },
            {
                title: "Space Invaders",
                description: "Pygame based Object-Oriented Game",
                fullDescription:
                    "A modern Pygame-based remake of the classic Space Invaders, built with a fully object-oriented and maintainable Python design. Inspired by the “Coding With Russ” project, the original concept has been adapted, refactored, and expanded with additional features, including smooth movement, enemy formations, and shooting mechanics, and is structured for easy packaging into a standalone Windows executable using PyInstaller.",
                role: "Curiosity Project",
                duration: "May `25",
                highlights: [
                    "Classic Space Invaders gameplay with smooth movement, shooting, and enemy formations.",
                    "Fully object-oriented Python design for clean, modular, and maintainable code.",
                    "Keyboard-controlled player with collision handling, lifelines, and win/lose logic.",
                    "Ready for PyInstaller packaging into a standalone Windows executable.",
                ],
                images: urls("space-invaders", "sample/demo.gif"),
                coverImage: null,
                demoLink: null,
                liveLink: gitUrl("space-invaders"),
                paperLink: gitUrl("space_invaders", "russs123"),
                size: "medium",
            },
            {
                title: "Mega Matrix Mania",
                description: "Advanced Terminal Matrix Calculator in C",
                fullDescription:
                    "A robust matrix manipulation program written in pure C, designed to perform essential and advanced linear algebra operations including determinant, inverse, rank, row echelon form, scalar multiplication, and more right from your terminal interface with safety-first input mechanisms and vibrant ANSI-styled output.",
                role: "PSPC",
                duration: "Apr `25",
                highlights: [
                    "Supports advanced matrix operations including determinant, inverse, rank, adjoint, and row echelon form.",
                    "Safety-first input handling with strict validation, truncation warnings, and crash prevention.",
                    "Modular C architecture with cross-platform support and ANSI color–styled terminal UI.",
                    "Iterative, efficient algorithms with configurable matrix size limits and zero external libraries.",
                ],
                images: urls(
                    "mega-matrix-mania",
                    "images/001.png",
                    "images/002.png",
                    "images/003.png",
                ),
                coverImage: null,
                demoLink: null,
                liveLink: gitUrl("mega-matrix-mania"),
                paperLink: null,
                size: "medium",
            },
            {
                title: "Project Robo",
                description:
                    "Obstacle-Avoiding Robot with Dedicated Android App",
                fullDescription:
                    "Bluetooth-controlled obstacle-avoiding robot built on an Arduino Uno, integrating HC-SR04 ultrasonic and IR sensors with an HC-05 Bluetooth interface. A custom React Native Android app enables seamless Bluetooth communication, allowing manual driving, real-time control, and overriding or switching between autonomous and user-controlled movement based on sensor input.",
                role: "Fabrication Lab of F.Y. B.Tech",
                duration: "Nov `25",
                highlights: [
                    "Dual-mode operation with autonomous obstacle avoidance and manual Bluetooth control.",
                    "Real-time robot control via a custom React Native Android app using HC-05.",
                    "Sensor-driven navigation using ultrasonic and IR sensors for reliable obstacle detection.",
                    "Integrated embedded system combining motor control, sensors, and mobile interface seamlessly.",
                ],
                images: urls(
                    "project-robo",
                    "images/imageRobot.JPG",
                    "images/imageUI.JPG",
                    "images/imageUIFeatures.JPG",
                ),
                coverImage: null,
                demoLink: null,
                liveLink: gitUrl("project-robo"),
                paperLink: null,
                size: "medium",
            },
            {
                title: "Binary Biscuit",
                description:
                    "A 4-bit Adder–Subtractor and Binary Arithmetic Unit built using IC 7483 and 7486",
                fullDescription:
                    "Binary Biscuit is a digital logic hardware project implementing a 4-bit adder–subtractor using standard TTL ICs (7483 and 7486). Beyond basic addition and subtraction, the circuit supports binary arithmetic concepts such as 1’s complement, 2’s complement, signed and unsigned number representation, and Excess-3 code. The project demonstrates practical understanding of combinational logic design, binary number systems, and arithmetic operations at the gate and IC level.",
                role: "Digital Electronics",
                duration: "Feb `25",
                highlights: [
                    "4-bit adder–subtractor implemented using IC 7483 and XOR logic (7486).",
                    "Supports 1’s complement, 2’s complement, signed and unsigned arithmetic.",
                    "Implements Excess-3 code representation using combinational logic.",
                    "Designed and tested at the hardware level using standard TTL ICs.",
                ],
                images: urls(
                    "binary-biscuit",
                    "sample/001.JPG",
                    "sample/002.JPG",
                    "sample/003.JPG",
                ),
                coverImage: null,
                demoLink: null,
                liveLink: null,
                paperLink: null,
                size: "medium",
            },
            {
                title: "Matrix Mania Python",
                description: "Python-based Object-oriented Matrix Toolkit",
                fullDescription:
                    "Matrix Mania is a Python-based matrix computation toolkit developed as my first programming project to explore object-oriented design and core language features. It implements fundamental linear algebra operations such as transpose, determinant, cofactor, adjoint, inverse, scalar multiplication, and matrix exponentiation. The project adopts a class-based architecture with extensive type hinting, deep copying for data safety, and custom decorators to manage preprocessing and output formatting, reflecting an early application of advanced Python concepts.",
                role: "First Project",
                duration: "Dec `23",
                highlights: [
                    "Object-oriented design with a centralized matrix operations class.",
                    "Extensive use of Python type hinting for clarity and correctness.",
                    "Custom decorators for preprocessing and output handling.",
                    "Core matrix operations implemented from first principles.",
                ],
                images: urls(
                    "matrix-mania",
                    "sample/001.png",
                    "sample/002.png",
                    "sample/003.png",
                ),
                coverImage: null,
                demoLink: null,
                liveLink: gitUrl("matrix-mania"),
                paperLink: null,
                size: "medium",
            },
        ];

        sampleProjects.forEach((projectData) => {
            const id = randomUUID();
            const project: Project = { ...projectData, id };
            this.projects.set(id, project);
        });

        // Seed Education
        const educationData: Array<Omit<Education, "id">> = [
            {
                institution: "Shah & Anchor Kutchhi Engineering College",
                degree: "Bachelor of Technology",
                field: "Electronics & Computer Science",
                duration: "2024 - 2028",
                grade: "9.0 CGPA",
                description:
                    "Currently pursuing a B.Tech, complemented by a minor in Robotics and Drone Technology, developing hands-on expertise in autonomous systems, embedded technologies & engineering",
                logo: null,
            },
            {
                institution: "Ramnivas Ruia Jr. College",
                degree: "Higher Secondary School Certificate (HSC)",
                field: "Science (PCM with Electronics)",
                duration: "2021 - 2023",
                grade: "73.17%",
                description:
                    "Specialized in Physics, Chemistry, Mathematics, and Electronics. Developed strong foundation in analog & digital electronics.",
                logo: null,
            },
            {
                institution: "Dr. Antonio da' Silva High School",
                degree: "Secondary School Certificate (SSC)",
                field: "Pre-Primary & Grade 1st - 10th",
                duration: "2009 - 2021",
                grade: "86.60%",
                description: "Pre-Primary, Secondary, Higher Secondary",
                logo: null,
            },
        ];

        educationData.forEach((data) => {
            const id = randomUUID();
            this.education.set(id, { ...data, id });
        });

        // Seed Experience
        const experiencesData: Array<Omit<Experience, "id">> = [
            {
                role: "Team Member",
                company: "ISRO Robotic Challenge - URSC 2026",
                location: "Mumbai, India",
                duration: "Jan '26 – June '26",
                current: "true",
                icon: "rocket",
            },
            {
                role: "Team Lead & Engineer on Project SIRA",
                company: "ECS Dept. & AICTE IDEALab, SAKEC",
                location: "Mumbai, India",
                duration: "Aug '25 – Aug '26",
                current: "true",
                icon: "flame",
            },
            {
                role: "Summer Internship",
                company: "AICTE IDEALab under Prof. Santosh Kamble",
                location: "Mumbai, India",
                duration: "16 Jun – 16 Aug '25",
                current: "false",
                icon: "code",
            },
            {
                role: "Projects Team Member",
                company: "AICTE IDEALab, SAKEC",
                location: "Mumbai, India",
                duration: "Aug '25 – Jan `26",
                current: "false",
                icon: "zap",
            },
            {
                role: "Video Editor",
                company: "AICTE IDEALab, SAKEC",
                location: "Mumbai, India",
                duration: "Feb '25 – Jul '25",
                current: "false",
                icon: "star",
            },
            {
                role: "Student Ambassador",
                company: "AICTE IDEALab, SAKEC",
                location: "Mumbai, India",
                duration: "Jan '25 – Jan '26",
                current: "false",
                icon: "crown",
            },
        ];

        experiencesData.forEach((data) => {
            const id = randomUUID();
            this.experiences.set(id, { ...data, id });
        });

        // Seed Certifications
        const certificationsData: Array<Omit<Certification, "id">> = [
            {
                title: "Apply AI: Analyze Customer Reviews",
                issuer: "Cisco Networking Academy",
                date: "Jan 2026",
                credentialId: "008",
                credentialUrl:
                    "https://drive.google.com/file/d/1qp4cw9zuXfHDI4XzNbDB1cxBDmkGBHme/view?usp=drive_link",
                description:
                    "Grasped the core concepts of thematic analysis and sentiment analysis to transform raw customer feedback into actionable insights and generate summary reports using AI and spreadsheet applications.",
                logo: null,
            },
            {
                title: "JavaScript Essentials 1",
                issuer: "Cisco Networking Academy",
                date: "Oct 2025",
                credentialId: "007",
                credentialUrl:
                    "https://drive.google.com/file/d/1j2a6QslNTfoar36poM0SHuJYYXwr1tVU/view?usp=drive_link",
                description:
                    "Grasped the very fundamental details of JavaScript and its vast application in the modern scape of web technology.",
                logo: null,
            },
            {
                title: "Java Training",
                issuer: "NPTEL (IIT-B)",
                date: "Sept 2025",
                credentialId: "006",
                credentialUrl:
                    "https://drive.google.com/file/d/112q7r8OwfUYZVVhYQ7L7xac9dTiAQ6Fm/view?usp=drive_link",
                description:
                    "Acquired a strong foundational and application based understanding of the Java programming language.",
                logo: null,
            },
            {
                title: "2 Months Internship Program",
                issuer: "AICTE Idealab, SAKEC",
                date: "Aug 2025",
                credentialId: "005",
                credentialUrl:
                    "https://drive.google.com/file/d/1EzZD0Lbyl0kc0BoRHdKY0zuwWBxQXtCE/view?usp=drive_link",
                description:
                    "Gained high-level proficiency in Internet of Things (IOT) technologies, specifically applying expertise in Arduino, ESP32, and Raspberry Pi platforms.",
                logo: null,
            },
            {
                title: "C++ Fundamentals",
                issuer: "Infosys Springboard",
                date: "July 2025",
                credentialId: "004",
                credentialUrl:
                    "https://drive.google.com/file/d/1jitiYFf-IYC3Ung-NaGIi6QymVGwLLH1/view?usp=drive_link",
                description:
                    "Gained a strong foundational understanding of the C++ programming language through the comprehensive C++ Fundamentals course.",
                logo: null,
            },
            {
                title: "Financial Literacy",
                issuer: "Infosys Springboard",
                date: "June 2025",
                credentialId: "003",
                credentialUrl:
                    "https://drive.google.com/file/d/1OiEkFYXt5I936sO0koTFMMLa8RQjxxBM/view?usp=drive_link",
                description:
                    "Successfully completed the comprehensive Financial Literacy course, providing a strong foundational understanding of key concepts in the subject.",
                logo: null,
            },
            {
                title: "HTML training",
                issuer: "Spoken Tutorial, IIT-B",
                date: "March 2025",
                credentialId: "002",
                credentialUrl:
                    "https://drive.google.com/file/d/1KmorGzva0_VDh5L55Sss8jfAihSciwhD/view?usp=drive_link",
                description:
                    "Successfully completed comprehensive training and an online examination in HTML, demonstrating a foundational understanding of web structure and markup language concepts.",
                logo: null,
            },
            {
                title: "Hands On Mobile App Development using Flutter",
                issuer: "SAKEC Robo Club",
                date: "January 2025",
                credentialId: "001",
                credentialUrl:
                    "https://drive.google.com/file/d/1aStXNLBPJ2FgAFOIVIVHIDx0kX5cUMu8/view?usp=drive_link",
                description:
                    "Demonstrated hands-on proficiency in dart programming language & Mobile App Development using Flutter.",
                logo: null,
            },
        ];

        certificationsData.forEach((data) => {
            const id = randomUUID();
            this.certifications.set(id, { ...data, id });
        });

        // Seed Achievements
        const achievementsData: Array<Omit<Achievement, "id">> = [
            {
                title: "Best Innovation Award - SAKEC Tech Fest 2024",
                category: "Competition",
                date: "October 2024",
                description:
                    "Won first place for Smart Home Automation System among 50+ competing projects. Project was recognized for its practical implementation and innovative use of IoT technologies.",
                organization: "SAKEC",
                icon: "trophy",
            },
            {
                title: "National Robotics Championship - 2nd Place",
                category: "Competition",
                date: "May 2024",
                description:
                    "Secured second position in the Line Following Robot category at National Robotics Championship with autonomous navigation and precision control.",
                organization: "Robotics Society of India",
                icon: "award",
            },
            {
                title: "Research Paper Published - IEEE Conference",
                category: "Research",
                date: "August 2024",
                description:
                    "Published paper on 'Optimization Techniques for PID Control in Autonomous Robots' at IEEE International Conference on Robotics and Automation.",
                organization: "IEEE",
                icon: "book",
            },
            {
                title: "Smart India Hackathon - Finalist",
                category: "Hackathon",
                date: "March 2024",
                description:
                    "Selected as one of the finalists among 10,000+ teams for developing an innovative environmental monitoring solution using IoT.",
                organization: "Government of India",
                icon: "code",
            },
            {
                title: "Dean's List - Academic Excellence",
                category: "Academic",
                date: "December 2023",
                description:
                    "Recognized for outstanding academic performance with CGPA above 8.5 for consecutive semesters. Maintained top 5% ranking in the department.",
                organization: "SAKEC",
                icon: "star",
            },
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
            fullDescription: insertProject.fullDescription ?? null,
            demoLink: insertProject.demoLink ?? null,
            liveLink: insertProject.liveLink ?? null,
            paperLink: insertProject.paperLink ?? null,
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

    async getExperience(): Promise<Experience[]> {
        return Array.from(this.experiences.values());
    }

    async getCertifications(): Promise<Certification[]> {
        return Array.from(this.certifications.values());
    }

    async getAchievements(): Promise<Achievement[]> {
        return Array.from(this.achievements.values());
    }
}

export const storage = new MemStorage();
