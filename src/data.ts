export interface SiteData {
  name: string;
  initials: string;
  title: string;
  tagline: string;
  email: string;
  phone: string;
  whatsapp: string;
  whatsappMessage: string;
  location: string;
  linkedin: string;
  github: string;
  resumeATS: string;
  resumeVisual: string;
}

export interface SectionHighlight {
  label: string;
  value: string;
}

export interface ChallengePair {
  challenge: string;
  solution: string;
}

export interface TeamMember {
  name: string;
  role: string;
}

export interface GalleryGroup {
  label: string;
  image: string | null;
}

export interface ArchitectureGroup {
  label: string;
  image: string | null;
}

export interface ProjectSection {
  type: 'narrative' | 'highlights' | 'features' | 'architecture' | 'hardware' | 'timeline' | 'challenges' | 'contributions' | 'team' | 'applications' | 'impact' | 'roadmap' | 'gallery' | 'lessons' | 'quote';
  title?: string;
  subtitle?: string;
  body?: string[];
  chips?: string[];
  items?: any[];
  note?: string;
  groups?: any[];
  steps?: string[];
  pairs?: ChallengePair[];
  members?: TeamMember[];
  social?: string;
  industrial?: string;
  text?: string;
}

export interface ProjectData {
  id: string;
  name: string;
  tagline: string;
  category: string;
  shortDescription: string;
  techTags: string[];
  status: string;
  competition: string;
  heroImage: string | null;
  heroNote?: string;
  sections: ProjectSection[];
}

export interface SkillItem {
  name: string;
  learnedThrough?: string[];
  appliedIn?: string[];
  experience?: string[];
  relatedTech?: string[];
}

export interface SkillCategory {
  category: string;
  skills: SkillItem[];
}

export interface CertificationData {
  name: string;
  organization: string;
  date: string;
  image: string | null;
  description: string;
  skills: string[];
  verify: string | null;
  certCode?: string;
  validationCode?: string;
}

export interface HackathonData {
  name: string;
  level: string;
  achievement: string;
  project: string;
  projectId: string;
  image: string | null;
  overview: string;
  flagged?: boolean;
}

export interface TrainingData {
  name: string;
  organization: string;
  association?: string;
  duration: string;
  type: string;
  certificateNo: string;
  certificateImage: string | null;
  images?: string[];
  overview: string;
  keyLearnings: string[];
  skillsDeveloped: string[];
  outcome: string;
}

export const SITE: SiteData = {
  name: "Karan Mendhe",
  initials: "KM",
  title: "Electrical Engineering Student",
  tagline: "Electrical Engineering Student • Power Electronics • Embedded Systems • Renewable Energy",
  email: "karanmendhe2025@gmail.com",
  phone: "+91 7218096714",
  whatsapp: "917218096714",
  whatsappMessage: "Hi Karan! I just visited your portfolio website and wanted to connect with you.",
  location: "Wardha, Maharashtra, India",
  linkedin: "https://www.linkedin.com/in/karan-mendhe-46051a2a7",
  github: "",
  resumeATS: "assets/karan-mendhe-resume-ats.pdf",
  resumeVisual: "assets/karan-mendhe-resume-visual.pdf",
};

export const PROJECTS: ProjectData[] = [
  {
    id: "dextra",
    name: "Dextra",
    tagline: "Smart Wrist-Hand Orthosis for Functional Independence",
    category: "Healthcare Technology",
    shortDescription: "A smart IoT-based hand rehabilitation device designed to assist stroke and paralysis patients through controlled hand movement and rehabilitation exercises.",
    techTags: ["ESP32", "Embedded Systems", "IoT", "Servo Motors", "Healthcare", "Electronics"],
    status: "Completed",
    competition: "Smart India Hackathon 2025 — Grand Finalist",
    heroImage: "assets/projects/dextra/1.jpg",
    heroNote: "Wearable, IoT-enabled rehabilitation device for stroke, wrist drop, spinal cord injury, and neuromuscular disorders.",
    sections: [
      { type: "narrative", title: "The Challenge",
        body: [
          "Millions of people worldwide lose hand function to stroke, spinal cord injuries, and neuromuscular disorders.",
          "Existing rehabilitation devices are often expensive, bulky, and inaccessible to the people who need them most.",
          "Simple daily tasks — holding an object, writing, eating — become out of reach without assistance."
        ] },
      { type: "narrative", title: "The Solution",
        body: [
          "Dextra is a wearable wrist-hand orthosis built around an ESP32, using two servo motors and a tendon-driven finger mechanism alongside wrist assistance.",
          "Lightweight, portable, and low-cost by design, with multiple control methods so it fits different patients and settings."
        ] },
      { type: "highlights", title: "Project Highlights", items: [
          { label: "Weight", value: "460 g" },
          { label: "Battery", value: "4000 mAh Li-ion" },
          { label: "Battery Backup", value: "Up to 4 hrs" },
          { label: "Grip Force", value: "≈56 N" },
          { label: "Prototype Cost", value: "₹2200" },
          { label: "Est. Manufacturing Cost", value: "Below ₹1500" },
        ] },
      { type: "features", title: "Key Features", items: [
          "Lightweight wearable design", "Three-jaw chuck grip", "ESP32-based control",
          "Finger and wrist movement assistance", "Multiple control methods",
          "Affordable manufacturing", "Future-ready architecture"
        ] },
      { type: "narrative", title: "Control Methods", subtitle: "Evolved from switch-only to multiple control modes during development.",
        body: [], chips: ["Three-way Switch", "Mobile Application", "Voice Commands"] },
      { type: "hardware", title: "Hardware Components", items: [
          "ESP32", "MG996R Servo Motor (Finger)", "MG996R Servo Motor (Wrist)", "3-Way Switch",
          "4000 mAh Li-ion Battery", "Fishing Thread Tendon Mechanism", "Nylon-Nitrile Glove", "Custom Lightweight Mounts"
        ], note: "An early relay module was removed during optimization to cut weight and simplify the system." },
      { type: "narrative", title: "Software & Development Tools", body: [],
        chips: ["Arduino IDE", "C++", "ESP32 Libraries", "Mobile Application (\"Dexterist\")"] },
      { type: "timeline", title: "Development Journey", steps: [
          "Research", "Problem Analysis", "Mechanism Design", "Prototype Development", "Testing", "Optimization", "Final Prototype"
        ] },
      { type: "challenges", title: "Challenges & Solutions", pairs: [
          { challenge: "Prototype weight was high.", solution: "Optimized structure, reduced weight to 460 g." },
          { challenge: "Relay module increased complexity.", solution: "Removed the relay module after optimization." },
          { challenge: "Limited control.", solution: "Added a mobile application and voice control." },
        ] },
      { type: "contributions", title: "My Contributions", items: [
          "Conceived the project idea", "Led research and requirement analysis", "Designed the complete hardware concept",
          "Selected components", "Developed multiple prototype iterations", "Designed and refined the mechanical structure",
          "Led hardware prototyping and integration", "Coordinated embedded system implementation",
          "Participated in testing and optimization", "Led technical documentation and project development"
        ] },
      { type: "team", title: "Team", members: [
          { name: "Karan Mendhe", role: "Project Concept, Research, Hardware Prototyping, System Design" },
          { name: "Yuvraj Giridhar Kuhikar", role: "Research Support and Team Lead" },
          { name: "Aditya Sunilrao Dhage", role: "Hardware Assembly and Integration" },
          { name: "Sanchita Kishor Kurwale", role: "Presentation and Documentation" },
          { name: "Om Naresh Kukutkar", role: "Mobile Application Development" },
          { name: "Aniket Krushnaji Wadafale", role: "Market Research and Analysis" },
        ] },
      { type: "impact", title: "Social & Industrial Impact",
          social: "Helps restore independence and quality of life for people recovering hand function after stroke or injury.",
          industrial: "Affordable, India-manufacturable design with real potential under Make in India and rehabilitation technology programs." },
      { type: "roadmap", title: "Future Roadmap", items: [
          "EMG Control", "IMU Integration", "AI-assisted Rehabilitation", "Cloud Monitoring", "Mobile Analytics", "Hospital Integration"
        ] },
      { type: "gallery", title: "Gallery", groups: [
          { label: "Prototype", image: "assets/projects/dextra/1.jpg" },
          { label: "Worn / Testing", image: "assets/projects/dextra/2.jpg" },
          { label: "Mechanism Detail", image: "assets/projects/dextra/3.jpg" },
          { label: "Companion App — Exercises", image: "assets/projects/dextra/app-1.jpg" },
          { label: "Companion App — Manual Control", image: "assets/projects/dextra/app-2.jpg" },
          { label: "Competition Photos", image: "assets/projects/dextra/minimodel-1st-prize.jpg" },
          { label: "PhysTech 2026 Certificate", image: "assets/PhysTech.png" },
          { label: "SIH 2025 Grand Finale", image: "assets/Moments Along the Way/Solo Grand Finale Showcase.jpeg" },
          { label: "Institute Send-off", image: "assets/Moments Along the Way/College Appreciation & Send-off.jpeg" },
          { label: "Team Photos", image: "assets/projects/dextra/team-with-prototype.jpg" },
          { label: "Team", image: "assets/projects/dextra/team.jpg" },
        ] },
      { type: "lessons", title: "Lessons Learned", body: [
          "Iterating on a physical mechanism taught me how much rehabilitation hardware has to be designed around the patient's comfort first, features second.",
          "Removing the relay module was a good reminder that the simplest working solution usually beats the more 'complete' one.",
          "Coordinating six people across research, hardware, app development, and documentation was its own engineering problem."
        ] },
    ],
  },

  {
    id: "reynex",
    name: "REYNEX",
    tagline: "Intelligent Renewable Energy Monitoring System for Hybrid Microgrids",
    category: "Renewable Energy & Smart Grids",
    shortDescription: "A renewable energy monitoring and automation system capable of measuring electrical parameters, monitoring battery health, and improving solar panel maintenance.",
    techTags: ["ESP32", "Renewable Energy", "Microgrid", "IoT", "Sensors", "Automation"],
    status: "Completed",
    competition: "Smartathon 2.0 — IEEE, 17–18 March 2026",
    heroImage: "assets/projects/reynex/3.jpg",
    heroNote: "An intelligent IoT-enabled monitoring platform for efficient, reliable, and sustainable microgrid management.",
    sections: [
      { type: "narrative", title: "The Challenge", body: [
          "Renewable energy systems often lack affordable, real-time monitoring.",
          "Operators struggle to track generation, battery health, load consumption, and overall system performance.",
          "Existing solutions are expensive and mostly depend on internet connectivity — a poor fit for rural or small-scale installations."
        ] },
      { type: "narrative", title: "The Solution", body: [
          "REYNEX is an ESP32-based hybrid renewable energy monitoring system with a companion mobile app, cloud connectivity, and an offline-first architecture.",
          "It handles intelligent alerts, battery monitoring, and energy optimization even when the internet drops."
        ] },
      { type: "highlights", title: "Project Highlights", items: [
          { label: "Controller", value: "ESP32" },
          { label: "Application", value: "Hybrid Microgrids" },
          { label: "Connectivity", value: "Wi-Fi + Cloud" },
          { label: "Platform", value: "Mobile Application" },
          { label: "Prototype Cost", value: "₹2041" },
          { label: "Architecture", value: "Offline-First" },
        ] },
      { type: "features", title: "Key Features", items: [
          "Real-time Energy Monitoring", "Battery Health Monitoring", "Mobile Application", "Cloud Connectivity",
          "Intelligent Alerts", "Offline Data Processing", "Renewable Energy Analytics", "Scalable Architecture"
        ] },
      { type: "architecture", title: "System Architecture", groups: [
          { label: "Block Diagram", image: "assets/projects/reynex/block-diagram.jpg" },
          { label: "Data Flow", image: "assets/projects/reynex/data-flow.jpg" },
          { label: "Mobile Monitoring Interface", image: "assets/projects/reynex/app-1.jpg" },
          { label: "Real-time Metrics Dashboard", image: "assets/projects/reynex/app-2.jpg" },
        ] },
      { type: "hardware", title: "Hardware Components", items: [
          "ESP32 Microcontroller", "ACS712 Current Sensor", "DC Voltage Sensor", "INA219 Voltage/Current Sensor", "PZEM-004T Energy Meter",
          "Temperature Sensor", "Relay Module", "Solar Panel Interface", "Battery Monitoring Circuit",
          "Hybrid Inverter Interface", "Wi-Fi Communication"
        ] },
      { type: "narrative", title: "Software & Technologies", body: [],
        chips: ["Arduino IDE", "C++", "ESP32 Framework", "Firebase", "NoSQL Database", "MQTT", "Cloud Computing", "Mobile Application", "Weather API"] },
      { type: "narrative", title: "Mobile Application", body: [
          "A dedicated app surfaces live monitoring, battery status, power consumption, alerts, reports, and weather integration."
        ] },
      { type: "timeline", title: "Development Journey", steps: [
          "Research", "Problem Analysis", "System Design", "Hardware Development", "ESP32 Programming",
          "App Development", "Testing", "Optimization", "Final Prototype"
        ] },
      { type: "challenges", title: "Challenges & Solutions", pairs: [
          { challenge: "Sensor calibration.", solution: "Validated readings with a multimeter and repeated calibration passes." },
          { challenge: "Battery overcharging.", solution: "Implemented charge protection techniques." },
          { challenge: "Offline operation.", solution: "Designed an offline-first architecture." },
          { challenge: "Scalability.", solution: "Designed a modular architecture suitable for larger microgrids." },
        ] },
      { type: "contributions", title: "My Contributions", items: [
          "Designed and developed the ESP32 hardware system", "Programmed the ESP32 firmware",
          "Integrated voltage, current, and temperature sensors", "Developed the complete hardware prototype",
          "Performed testing, calibration, and debugging", "Assisted in prototype optimization",
          "Designed and prepared the technical presentation"
        ] },
      { type: "team", title: "Team", members: [
          { name: "Karan Mendhe", role: "ESP32 Programming, Hardware Development, Presentation" },
          { name: "Omkar Kale", role: "Team Lead & Project Coordination" },
          { name: "Madhur Chandak", role: "Mobile Application Development" },
          { name: "Sarthak Nagose", role: "Hardware Assembly & Soldering" },
          { name: "Sanchita Kurwale", role: "Presentation & Documentation" },
        ] },
      { type: "applications", title: "Real-World Applications", items: [
          "Rural Solar Microgrids", "Smart Villages", "Agricultural Solar Pump Systems", "Educational Institutions",
          "Healthcare Facilities", "Community Energy Projects", "Small Industries", "Local Businesses"
        ] },
      { type: "impact", title: "Benefits & Impact",
          social: "Promotes renewable energy adoption, improves reliability, reduces maintenance costs, and supports rural electrification.",
          industrial: "Improves monitoring efficiency, predictive maintenance, and operational performance for renewable installations." },
      { type: "roadmap", title: "Future Roadmap", items: [
          "AI-based Predictive Maintenance", "Machine Learning Load Forecasting", "Raspberry Pi Edge Controller",
          "PLC Integration", "Government Smart Grid Integration", "Multi-source Renewable Energy Support", "Advanced Analytics Dashboard"
        ] },
      { type: "gallery", title: "Gallery", groups: [
          { label: "Competition — Smartathon 2.0", image: "assets/projects/reynex/1.jpg" },
          { label: "Team at Work", image: "assets/projects/reynex/2.jpg" },
          { label: "Team", image: "assets/projects/reynex/team-2.jpg" },
          { label: "Hardware Setup", image: "assets/projects/reynex/3.jpg" },
          { label: "Application Screenshots", image: "assets/projects/reynex/app-1.jpg" },
          { label: "App — Monitoring Dashboard", image: "assets/projects/reynex/app-2.jpg" },
        ] },
      { type: "lessons", title: "Lessons Learned", body: [
          "Designing for 'no internet' as the default case, not the edge case, changed how I thought about the whole system.",
          "Calibration is never a one-time step — it's the difference between a working sensor and a convincing-looking one.",
          "Presenting REYNEX at Smartathon 2.0 alongside five other domains sharpened how I explain technical work to non-specialists fast."
        ] },
    ],
  },

  {
    id: "dc-dc-converter",
    name: "High Gain DC–DC Boost Converter",
    tagline: "Design & Simulation of a High Gain DC–DC Converter for EV Application",
    category: "Power Electronics",
    shortDescription: "A high-gain DC–DC converter designed to achieve efficient voltage boosting for renewable energy and electric vehicle applications.",
    techTags: ["Power Electronics", "DC–DC Converter", "Simulation", "Electrical Design"],
    status: "Completed",
    competition: "Academic Hardware Project — 2024",
    heroImage: "assets/projects/dc-dc/2.jpg",
    heroNote: "Transforming low-voltage DC sources into stable high-voltage outputs for EVs and renewable energy systems.",
    sections: [
      { type: "highlights", title: "Quick Info", items: [
          { label: "Project Type", value: "Academic Hardware Project" },
          { label: "Domain", value: "Power Electronics" },
          { label: "Duration", value: "2024" },
          { label: "Development", value: "Simulation + Hardware Prototype" },
        ] },
      { type: "highlights", title: "Project Stats", items: [
          { label: "Output Voltage", value: "≈360V" },
          { label: "PWM Switching", value: "20kHz" },
          { label: "Validation", value: "Simulation + Hardware" },
          { label: "Prototype", value: "Two-input PCB build" },
        ] },
      { type: "narrative", title: "The Challenge", body: [
          "EVs, battery-powered systems, and renewable sources run on relatively low DC voltages, while many applications need much higher, stable DC output.",
          "Conventional boost converters struggle to hit high voltage gain without added switching losses and voltage stress.",
          "The goal: higher output voltage without sacrificing efficient, practical hardware implementation."
        ] },
      { type: "narrative", title: "Engineering Solution", body: [
          "The topology was designed and analyzed in MATLAB/Simulink before any hardware was built.",
          "An Arduino UNO generates the PWM signal, which drives the MOSFET through an isolated TLP250 gate driver.",
          "Simulation results were then validated against practical lab testing across the full design-to-prototype workflow."
        ] },
      { type: "features", title: "Project Highlights", items: [
          "High-gain topology designed", "Full MATLAB/Simulink simulation built", "Arduino-based PWM control",
          "Isolated TLP250 driver design", "PCB fabricated", "Experimental validation performed",
          "Simulation-vs-hardware comparison completed", "EV/renewable suitability demonstrated"
        ] },
      { type: "features", title: "Key Features", items: [
          "High voltage gain", "Efficient power conversion", "PWM-based switching control", "MATLAB simulation",
          "Arduino-based controller", "MOSFET driver circuit", "PCB hardware prototype", "Laboratory validation",
          "Low-cost design", "Scalable architecture", "Reliable converter operation", "Suitable for EV applications"
        ] },
      { type: "architecture", title: "Converter Architecture", groups: [
          { label: "Converter Architecture", image: "assets/projects/dc-dc/converter architecture.jpeg" },
          { label: "Converter Architecture Circuit", image: "assets/projects/dc-dc/simulation.jpeg" },
          "Input DC Supply (two-input configuration)", "Inductor Network", "MOSFET Switching Circuit", "PWM Generator",
          "TLP250 Driver Circuit", "Capacitor Voltage Multiplication Network", "Output Filter", "High Voltage DC Output"
        ] },
      { type: "hardware", title: "Hardware Components", items: [
          "Arduino UNO", "MOSFET", "TLP250 Gate Driver", "Inductors", "Capacitors", "Fast Recovery Diodes",
          "Resistors", "PCB", "DC Power Supply", "Connecting Wires", "Prototype Board"
        ] },
      { type: "narrative", title: "Simulation Environment", body: [
          "MATLAB/Simulink was used to model the converter, analyze switching behaviour, validate voltage gain, observe waveforms, study transient response, and verify performance before any hardware was built."
        ] },
      { type: "narrative", title: "Working Principle", body: [
          "DC input is supplied → Arduino generates PWM → signal passes through the TLP250 driver → MOSFET switches on and off → energy stores in the inductors → stored energy transfers through the diode-capacitor network → output voltage boosts significantly → the output capacitor filters ripple → stable high-voltage DC output."
        ] },
      { type: "timeline", title: "Development Journey", steps: [
          "Research on Converter Topologies", "Literature Review", "Component Selection", "Circuit Design",
          "MATLAB Simulation", "PWM Generation", "Driver Circuit Development", "PCB Fabrication",
          "Hardware Assembly", "Prototype Testing", "Performance Analysis", "Documentation"
        ] },
      { type: "challenges", title: "Engineering Challenges & Solutions", pairs: [
          { challenge: "Achieving high voltage gain.", solution: "Designed a high-gain converter topology." },
          { challenge: "Reliable MOSFET switching.", solution: "Implemented an isolated TLP250 driver." },
          { challenge: "Simulation accuracy.", solution: "Validated through hardware testing." },
          { challenge: "Stable PWM generation.", solution: "Arduino-based PWM Implementation." },
          { challenge: "PCB implementation.", solution: "Careful component placement and soldering." },
          { challenge: "Testing hardware safely.", solution: "Step-by-step laboratory validation." },
        ] },
      { type: "contributions", title: "My Contributions", items: [
          "I researched high-gain DC–DC converter topologies", "I designed the converter circuit",
          "I developed the MATLAB simulation model", "I generated PWM control using Arduino",
          "I designed and assembled the hardware prototype", "I performed PCB soldering and testing",
          "I analysed converter performance", "I documented the project and prepared technical presentations"
        ] },
      { type: "team", title: "Team", members: [
          { name: "Karan Mendhe", role: "Hardware Development, ESP32 Programming & System Integration" },
          { name: "Pruthvi Palsapure", role: "Team Lead & Project Coordination" },
          { name: "Kartik Admane", role: "Hardware Development & Assembly" },
          { name: "Komal Kadam", role: "Software Development" },
          { name: "Shravni Katore", role: "Presentation" },
          { name: "Sakshi Chafle", role: "Documentation & Project Coordination" },
        ] },
      { type: "applications", title: "Applications", items: [
          "Electric Vehicles", "Renewable Energy Systems", "Solar Energy", "Battery Energy Storage",
          "Industrial DC Power Supplies", "Microgrids", "Charging Infrastructure", "Portable Power Systems", "Smart Energy Solutions"
        ] },
      { type: "impact", title: "Project Impact",
          social: "Strengthened practical understanding of efficient energy conversion and modern EV power systems.",
          industrial: "Demonstrates power electronics, embedded systems, simulation-driven engineering, PCB development, and hardware validation working together — bridging theory and real-world implementation." },
      { type: "roadmap", title: "Future Scope", items: [
          "Higher-efficiency converter topologies", "Wide Bandgap Semiconductor Devices", "Digital Closed-Loop Control",
          "MPPT Integration", "IoT-based Converter Monitoring", "Higher-Power EV Applications",
          "AI-based Converter Optimisation", "Renewable Energy Integration", "Bidirectional Power Flow", "Industrial-Scale Converter Development"
        ] },
      { type: "gallery", title: "Gallery", groups: [
          { label: "Presentation Day", image: "assets/projects/dc-dc/1.jpg" },
          { label: "Labeled Prototype Board", image: "assets/projects/dc-dc/2.jpg" },
          { label: "Team", image: "assets/projects/dc-dc/team.jpg" },
          { label: "Oscilloscope & Bench Setup", image: "assets/projects/dc-dc/oscilloscope-bench.jpg" },
          { label: "TLP250 Driver Circuit", image: "assets/projects/dc-dc/driver-circuit-detail.jpg" },
          { label: "DC Sources Board", image: "assets/projects/dc-dc/dc-sources-board.jpg" },
          { label: "Transformer & Diode Board", image: "assets/projects/dc-dc/transformer-diode-board.jpg" },
          { label: "Bench Testing", image: "assets/projects/dc-dc/bench-testing.jpg" },
          { label: "Simulation Circuit", image: "assets/projects/dc-dc/simulation.jpeg" },
          { label: "Simulation Output", image: "assets/projects/dc-dc/simulation output.jpeg" },
          { label: "Output Waveforms", image: "assets/projects/dc-dc/output waveforms.jpeg" },
        ] },
      { type: "lessons", title: "Lessons Learned", body: [
          "Converter topology design only becomes real once you've soldered it — simulation gets you close, the bench tells the truth.",
          "An isolated gate driver isn't optional at this voltage; TLP250 solved switching reliability problems no amount of code could.",
          "Debugging hardware is a different discipline from debugging software: patience with a multimeter matters as much as the math."
        ] },
      { type: "quote", text: "Engineering transforms ideas into impact through precision, innovation, and continuous experimentation." },
    ],
  },
];

export const SKILLS: SkillCategory[] = [
  { category: "Electrical Engineering", skills: [
      { name: "Electrical Engineering", learnedThrough: ["B.Tech in Electrical Engineering", "Bajaj Institute of Technology, Wardha"] },
      { name: "Circuit Analysis", appliedIn: ["High Gain DC–DC Boost Converter"], experience: ["Converter Design", "Component Selection", "Electrical Calculations"] },
      { name: "Electronic Control Systems", learnedThrough: ["Introduction to Power Electronics"] },
      { name: "Electrical Machine Fundamentals", learnedThrough: ["B.Tech Coursework"] },
      { name: "Power Electronics", learnedThrough: ["Introduction to Power Electronics (Coursera)"], appliedIn: ["High Gain DC–DC Boost Converter"], relatedTech: ["MOSFET Drivers", "PWM Control", "High Gain Converter", "DC–DC Converter Design"] },
    ] },
  { category: "Embedded Systems & IoT", skills: [
      { name: "Embedded Systems", appliedIn: ["Dextra", "REYNEX", "High Gain DC–DC Boost Converter"] },
      { name: "ESP32 Development", appliedIn: ["Dextra", "REYNEX"], experience: ["Embedded Programming", "Sensor Integration", "Wireless Communication"] },
      { name: "Arduino Programming", appliedIn: ["High Gain DC–DC Boost Converter"], experience: ["PWM Generation", "Timer Programming", "MOSFET Control"] },
      { name: "Internet of Things (IoT)", appliedIn: ["Dextra", "REYNEX"] },
      { name: "Sensor Integration", appliedIn: ["REYNEX"] },
      { name: "PWM Generation", appliedIn: ["High Gain DC–DC Boost Converter"] },
      { name: "Motor Control", appliedIn: ["Dextra"] },
    ] },
  { category: "Power Electronics", skills: [
      { name: "DC–DC Boost Converters", appliedIn: ["High Gain DC–DC Boost Converter"] },
      { name: "High Gain Converter Design", appliedIn: ["High Gain DC–DC Boost Converter"] },
      { name: "MOSFET Gate Drivers", appliedIn: ["High Gain DC–DC Boost Converter"] },
      { name: "PWM Switching", appliedIn: ["High Gain DC–DC Boost Converter"] },
      { name: "Voltage Regulation", appliedIn: ["High Gain DC–DC Boost Converter"] },
    ] },
  { category: "Simulation & Design Tools", skills: [
      { name: "MATLAB", learnedThrough: ["MATLAB Onramp"], appliedIn: ["Academic Simulations", "Engineering Coursework"] },
      { name: "Simulink", appliedIn: ["Control Systems", "Power Electronics"] },
      { name: "LTspice", appliedIn: ["High Gain DC–DC Boost Converter"], experience: ["Circuit Simulation", "Waveform Analysis"] },
      { name: "GNU Octave", experience: ["Mathematical Computing", "Simulation"] },
    ] },
  { category: "Hardware Development", skills: [
      { name: "Prototype Development", appliedIn: ["Dextra", "REYNEX", "High Gain DC–DC Boost Converter"] },
      { name: "Circuit Assembly", appliedIn: ["All Hardware Projects"] },
      { name: "PCB Prototyping", appliedIn: ["Engineering Projects"] },
      { name: "Component Selection", appliedIn: ["All Engineering Projects"] },
      { name: "Soldering", appliedIn: ["Hardware Prototype Development"] },
      { name: "Hardware Testing", appliedIn: ["Converter Testing", "Embedded Systems"] },
      { name: "Oscilloscope Testing", appliedIn: ["PWM Verification", "Converter Testing"] },
    ] },
  { category: "Programming", skills: [
      { name: "C Programming", appliedIn: ["Arduino Programming"] },
      { name: "Embedded C", appliedIn: ["ESP32", "Arduino"] },
      { name: "Firebase Integration", appliedIn: ["REYNEX"] },
      { name: "MQTT Communication", appliedIn: ["REYNEX"] },
      { name: "Cloud IoT Integration", appliedIn: ["REYNEX"] },
    ] },
  { category: "Renewable Energy", skills: [
      { name: "Renewable Energy Monitoring", appliedIn: ["REYNEX"] },
      { name: "Energy Management Systems", appliedIn: ["REYNEX"] },
      { name: "Smart Grid Concepts", learnedThrough: ["Smart Grid Technology Coursework"], appliedIn: ["REYNEX"] },
      { name: "Hybrid Energy Systems", appliedIn: ["REYNEX"] },
    ] },
  { category: "Engineering Design", skills: [
      { name: "Product Design", appliedIn: ["Dextra"] },
      { name: "Project Engineering", appliedIn: ["Engineering Projects"] },
      { name: "Design Research", appliedIn: ["Academic Projects"] },
      { name: "Creative Concept Design", appliedIn: ["Dextra", "REYNEX"] },
      { name: "System Integration", appliedIn: ["Dextra", "REYNEX"] },
    ] },
  { category: "Technical Software", skills: [
      { name: "AutoCAD Electrical", appliedIn: ["Electrical Design & Drafting"] },
      { name: "Microsoft PowerPoint", experience: ["Technical Presentations"] },
      { name: "Canva", experience: ["Posters", "Technical Presentations"] },
      { name: "Graphic Design", appliedIn: ["Posters", "Project Presentations"] },
    ] },
  { category: "Professional Skills", skills: [
      { name: "Problem Solving", learnedThrough: ["Engineering Projects", "Hardware Debugging", "National Competitions"] },
      { name: "Critical Thinking", learnedThrough: ["Behavior Architecture (Coursera)"] },
      { name: "Technical Documentation", learnedThrough: ["Project Reports", "Technical Documentation", "Engineering Presentations"] },
      { name: "Research & Development", appliedIn: ["Dextra", "REYNEX", "High Gain DC–DC Boost Converter"] },
      { name: "Presentation Design", appliedIn: ["Technical Seminars", "Competitions", "Project Demonstrations"] },
      { name: "Team Collaboration", appliedIn: ["Multi-member Engineering Projects"] },
      { name: "Project Management", learnedThrough: ["Academic Engineering Projects"] },
      { name: "Engineering Communication", learnedThrough: ["Presentations", "Technical Reports", "Project Demonstrations"] },
    ] },
  { category: "Industrial Exposure", skills: [
      { name: "Railway Systems", learnedThrough: ["Industrial Training — S.S.E Electrical Loco Shed, Ajni"] },
      { name: "Rail Operations", learnedThrough: ["Industrial Training — S.S.E Electrical Loco Shed, Ajni"] },
      { name: "Electric Locomotive Systems", learnedThrough: ["Industrial Training — S.S.E Electrical Loco Shed, Ajni"] },
    ] },
];

export const CERTIFICATIONS: CertificationData[] = [
  { name: "MATLAB Onramp", organization: "MathWorks Training Services", date: "24 April 2026",
    image: "assets/certifications/matlab.jpg",
    description: "Completed 100% of the self-paced MATLAB Onramp course — a strong foundation in MATLAB programming, matrix operations, data visualization, numerical computing, and engineering problem solving.",
    skills: ["MATLAB", "Matrix Operations", "Programming Fundamentals", "Data Visualization", "Numerical Computing", "Engineering Calculations"],
    verify: null },
  { name: "Introduction to Power Electronics", organization: "University of Colorado Boulder (Coursera)", date: "19 December 2025",
    image: "assets/certifications/power-electronics.jpg",
    description: "An introductory Power Electronics course covering semiconductor devices, DC–DC converters, switching techniques, PWM, and practical energy conversion systems.",
    skills: ["Power Electronics", "DC-DC Converters", "MOSFET Switching", "PWM", "Converter Topologies", "Energy Conversion"],
    verify: "https://coursera.org/verify/EZ7N614H77D2" },
  { name: "Canva for Beginners", organization: "Simplilearn SkillUp", date: "8 April 2026",
    image: "assets/certifications/canva.jpg",
    description: "Practical design skills for presentations, engineering posters, social media graphics, and visual communication.",
    skills: ["Canva", "Presentation Design", "Graphic Design", "Layout Design", "Typography", "Visual Communication"],
    verify: null, certCode: "10071160" },
  { name: "Behavior Architecture — Understanding Human Behavior", organization: "Fractal Analytics (via Coursera)", date: "7 April 2026",
    image: "assets/certifications/behavior-architecture.jpg",
    description: "Behavioral psychology, decision-making, heuristics, emotions, cognitive biases, and human behavior.",
    skills: ["Critical Thinking", "Decision Making", "Psychology", "Human Behaviour", "Behavioural Analysis", "Problem Solving"],
    verify: "https://coursera.org/verify/5TEZO0IT2CH8" },
  { name: "Excel Basic to Advanced", organization: "Cursa", date: "18–26 June 2026",
    image: "assets/certifications/excel.jpg",
    description: "Spreadsheets, formulas, functions, data management, calculations, charts, and productivity techniques for engineering documentation and analysis.",
    skills: ["Microsoft Excel", "Data Analysis", "Spreadsheets", "Formulas", "Charts", "Data Organization"],
    verify: null, validationCode: "b5a83ca96635646bc01fffc2ce249308" },
  { name: "PCB Design Course", organization: "Simplilearn SkillUp", date: "25 July 2026",
    image: "assets/certifications/pcb-design.jpg",
    description: "PCB layout and design fundamentals, complementing hands-on hardware prototyping work across the Dextra, REYNEX, and DC–DC converter projects.",
    skills: ["PCB Design", "PCB Layout", "Circuit Design", "Hardware Design", "Electronics"],
    verify: null, certCode: "10510735" },
];

export const LEARNING_JOURNEY_ORDER = [
  "GATE 2027 Preparation (Electrical Engineering)",
  "PCB Design (KiCad)",
  "PCB Design (Altium Designer)",
  "AutoCAD Electrical"
];

export const HACKATHONS: HackathonData[] = [
  { name: "PhysTech 2026", level: "International", achievement: "Excellence in Creativity Award",
    project: "Dextra", projectId: "dextra",
    image: "assets/PhysTech.png",
    overview: "PhysTech 2026 – International Online Hackathon hosted by Binnovative (Massachusetts, USA). Awarded the Excellence in Creativity Award for Dextra, a smart hand rehabilitation orthosis focused on assistive healthcare innovation.",
  },
  { name: "Smart India Hackathon 2025", level: "National", achievement: "Grand Finalist",
    project: "Dextra", projectId: "dextra",
    image: "assets/Moments Along the Way/SIH Team at National Finale.jpeg",
    overview: "Reached the Grand Finale of one of India's largest national hackathons with Dextra, a wearable hand-rehabilitation device — competing as Team Dexterist (PS ID: SIH25148, Ministry of Social Justice & Empowerment) representing Bajaj Institute of Technology, Wardha.",
  },
  { name: "Wardha Startup Idea Challenge", level: "Regional", achievement: "Runner-up",
    project: "Dextra", projectId: "dextra",
    image: "assets/Moments Along the Way/Wardha Startup Challenge Runner-Up.jpeg",
    overview: "Pitched Dextra at the Wardha Startup Idea Challenge (26 February 2026), organized by InFED IIM Nagpur, IBFC Wardha, and the District Skill Development, Employment, Entrepreneurship & Guidance Centre, Wardha, under the Government of Maharashtra.",
  },
  { name: "Minimodel Competition", level: "Institute Level", achievement: "1st Prize",
    project: "Dextra", projectId: "dextra",
    image: "assets/projects/dextra/minimodel-1st-prize.jpg",
    overview: "Won 1st Prize presenting the Dextra prototype at the Minimodel competition.",
  },
  { name: "Smartathon 2.0", level: "National Level", achievement: "Finalist",
    project: "REYNEX", projectId: "reynex",
    image: "assets/hackathons/smartathon-1.jpg",
    overview: "A 24-hour flagship hackathon (\"Strive Smart to Sustain Success\"), 17–18 March 2026, hosted at St. Joseph's College of Engineering by IEEE Industry Applications Society Madras Chapter, Larsen & Toubro Ltd., and IEEE Dielectrics & Electrical Insulation Society (Women in Engineering), presenting REYNEX." },
];

export const TRAININGS: TrainingData[] = [
  { name: "Industrial Training — Ajni Electric Loco Shed, Nagpur",
    organization: "Electric Loco Shed, Ajni, Central Railway (Ministry of Railways, Government of India)",
    duration: "16–22 January 2025", type: "One-Week Industrial Training",
    certificateNo: "Ref. 3670 · Letter No. वि.लो.शे/अजनी/बी.टी.सी/09",
    certificateImage: "assets/trainings/ajni-cert.jpg",
    images: ["assets/trainings/ajni-1.jpg", "assets/trainings/ajni-2.jpg", "assets/trainings/ajni-3.jpg"],
    overview: "Hands-on exposure to railway electrical engineering, electric locomotive maintenance, and real-world industrial practice — operation, testing, maintenance, and protection systems used across Indian Railways.",
    keyLearnings: ["Electric locomotive maintenance", "Battery banks and charging systems", "Relay testing and protection equipment",
      "Locomotive control cabins and simulators", "Railway electrical systems", "Preventive maintenance practices",
      "Industrial safety procedures", "Real-world railway operations"],
    skillsDeveloped: ["Railway Engineering", "Electrical Maintenance", "Industrial Safety", "Relay Testing", "Electrical Troubleshooting", "Battery Systems", "Railway Operations"],
    outcome: "Connected theoretical electrical engineering concepts to large-scale railway infrastructure, and sharpened practical knowledge of industrial electrical systems." },
  { name: "STTP — Smart Grid Control: Renewable Energy & Vehicle Integration",
    organization: "Dept. of Electrical Engineering, Bajaj Institute of Technology, Wardha",
    association: "The Institution of Engineers (India), Nagpur Local Section",
    duration: "26–30 May 2025", type: "One-Week Short Term Training Program (STTP)",
    certificateNo: "STTP/EE/BITW/SGCREVI/2024-25/P/033",
    certificateImage: "assets/trainings/smartgrid-cert.jpg",
    images: ["assets/trainings/smartgrid-1.jpg"],
    overview: "Modern power systems, renewable energy integration, EV technologies, and smart grid control — including a site visit to a substation.",
    keyLearnings: ["Smart Grid Architecture", "Renewable Energy Integration", "Electric Vehicle Integration", "Vehicle-to-Grid (V2G) Technology",
      "Modern Power System Control", "Grid Stability", "Distributed Energy Resources", "Sustainable Energy Systems"],
    skillsDeveloped: ["Smart Grid Technologies", "Renewable Energy Systems", "EV Integration", "Grid Control", "Modern Power Systems", "Sustainable Energy"],
    outcome: "Broadened understanding of future power systems, smart grids, renewable energy technologies, and intelligent energy management." },
];

export const TRAINING_IMPACT = "These training programs complemented academic study with practical exposure to industrial environments and emerging technologies — strengthening technical knowledge, problem-solving ability, and readiness for future engineering challenges.";
