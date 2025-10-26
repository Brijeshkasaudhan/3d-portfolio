import React, { useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Text, Plane, useCursor } from '@react-three/drei';
import './App.css';

// --- YOUR RESUME DATA ---
// All your resume info is structured here
const resumeData = {
  header: {
    name: 'BRIJESH KASAUDHAN',
    location: 'Ghaziabad, India',
    email: 'brijeshkasaudhan8715@gmail.com',
    phone: '(+91) 7518295593',
    linkedin: '/brijesh-kasaudhan-4b2668257',
  },
  summary:
    'I am Brijesh Kasaudhan, a fresher in the IT/ITES industry with a strong foundation in Computer Science from IMS Engineering College. I have hands-on experience as a Developer intern at Salesforce and skills in Java, HTML, CSS, JavaScript, Python, and SQL.',
  skills: {
    hard: [
      'JAVA, C, C++',
      'HTML, CSS, JavaScript, NodeJS, React',
      'Python, Django, Flask',
      'SQL, Mongodb',
    ],
    soft: ['Teamwork', 'Positive Thinker', 'Leadership', 'Quick Learner'],
  },
  education: [
    {
      degree: 'Computer Science | B.Tech',
      institution: 'IMS Engineering College Ghaziabad',
      details: 'CGPA: 8.09 | (2022-2026)',
    },
    {
      degree: 'XII (CBSE)',
      institution: 'Air Force School A F S Gorakhpur U.P.',
      details: '90.16% | 2021',
    },
    {
      degree: 'X (CBSE)',
      institution: 'Sacred Heart Sch Mauza Nichlaul Maharajganj U.P.',
      details: '90.67% | 2019',
    },
  ],
  training: [
    {
      role: 'Django Developer Trainee',
      company: 'Hire3x - Online',
      date: '(May 2025)',
      description: [],
    },
    {
      role: 'AI & Data Analytics Intern',
      company: 'AICTE, Shell India, Edunet Foundation - Virtual',
      date: '(April 28-May 28, 2025)',
      description: [
        'Completed a 4-week internship focused on applying AI and data analytics in sustainable development.',
        'Worked on case studies related to environmental data, predictive modeling, and decision-making in green tech.',
        'Learned tools and techniques for data collection, visualization and machine learning.',
      ],
    },
    {
      role: 'AI Foundations Intern',
      company: 'Microsoft Initiative | AICTE | Edunet Foundation - Virtual',
      date: '(April 10 - May 10, 2025)',
      description: [
        'Interned in a virtual program on the foundations of Artificial Intelligence.',
        'Studied supervised/unsupervised learning, neural networks, and ethical use of Al.',
        'Completed mini-projects on Python-based Al models and real-world Al use cases.',
      ],
    },
    {
      role: 'Developer Intern',
      company: 'Salesforce',
      date: '(October - November 2023)',
      description: [
        'Completed Salesforce Developer Virtual Internship and earned the Developer Super Set Badge.',
        'Covered key Trailhead modules including: Salesforce Fundamentals, Organizational Setup, Process Automation, Apex, Testing & Debugging.',
      ],
    },
  ],
  projects: [
    {
      name: 'Smart Parking Management',
      domain: 'Web Application',
      description:
        'A web application that uses real-time data to show available parking slots nearby, helping reduce traffic congestion and carbon emissions.',
      responsibilities: ['Designed UI/UX.', 'Razorpay integration.'],
      skills: ['Html', 'Css', 'JavaScript', 'Bootstrap'],
    },
  ],
  achievements: [
    'Al odyssey | Live Al at IIT Kharagpur | Internship trip Winner (March 2025)',
    'Nptel certificate on Data Science for Engineers (October 2024)',
    'Nptel certificate on Introduction To IOT (May 2024)',
    'Nptel certificate on Developing Soft skills and Personality (October 2023)',
    'Certification Al India 2.0 | Guvi (August 2023)',
    'Python certificate | Guvi (August 2023)',
  ],
  hobbies: ['Cycling', 'Reading'],
};


// --- 3D COMPONENTS ---

/**
 * This component is a single "wall" or "panel" in the 3D gallery.
 * It takes a title, content (as an array of strings), position, rotation, and size.
 */
function SectionPanel({ title, content, position, rotation, panelSize = [5, 5] }) {
  const [hovered, setHovered] = useState(false);
  useCursor(hovered); // Show a pointer cursor on hover

  // Basic properties for all text
  const textProps = {
    anchorX: 'left',
    anchorY: 'top',
    fontSize: 0.16,
    color: '#fff',
    maxWidth: panelSize[0] - 0.5,
    lineHeight: 1.4,
  };

  return (
    <group position={position} rotation={rotation}>
      {/* The background panel */}
      <Plane
        args={panelSize}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <meshStandardMaterial
          color={hovered ? '#4a148c' : '#311b92'} // Dark purple, brightens on hover
          transparent
          opacity={0.8}
        />
      </Plane>

      {/* Title Text */}
      <Text
        {...textProps}
        fontSize={0.35}
        color="#bb86fc" // Light purple
        anchorX="center"
        position={[0, panelSize[1] / 2 - 0.3, 0.01]} // Position at the top center
      >
        {title}
      </Text>

      {/* Content Text - We map over the array of strings */}
      <group position={[-panelSize[0] / 2 + 0.25, panelSize[1] / 2 - 0.8, 0.01]}>
        {content.map((line, index) => (
          <Text
            key={index}
            {...textProps}
            text={line}
            position={[0, -index * 0.22, 0]} // Stagger each line down
          />
        ))}
      </group>
    </group>
  );
}

// Helper functions to format your resume data into simple string arrays
const formatData = {
  summary: (data) => [data],
  skills: (data) => [
    '--- HARD SKILLS ---',
    ...data.hard,
    '',
    '--- SOFT SKILLS ---',
    ...data.soft,
  ],
  education: (data) => data.map(edu => 
    `${edu.degree} | ${edu.institution} (${edu.details})`
  ),
  training: (data) => data.flatMap(job => [
    `ROLE: ${job.role} | ${job.company} (${job.date})`,
    ...job.description.map(d => `  - ${d}`),
    '' // Add a space
  ]),
  projects: (data) => data.flatMap(proj => [
    `PROJECT: ${proj.name} (${proj.domain})`,
    `  "${proj.description}"`,
    `  Role: ${proj.responsibilities.join(', ')}`,
    `  Skills: ${proj.skills.join(', ')}`,
    ''
  ]),
  achievements: (data) => [
    ...data.map(item => `- ${item}`),
    '',
    '--- HOBBIES ---',
    ...resumeData.hobbies
  ]
};

// --- MAIN APP COMPONENT ---
export default function App() {
  const radius = 6; // Radius of the circular gallery

  // Define all the sections of your resume gallery
  const sections = [
    {
      title: 'SUMMARY',
      content: formatData.summary(resumeData.summary),
      position: [0, 0, -radius], // Front
      rotation: [0, 0, 0],
      panelSize: [5, 2.5]
    },
    {
      title: 'SKILLS',
      content: formatData.skills(resumeData.skills),
      position: [-radius, 0, 0], // Left
      rotation: [0, Math.PI / 2, 0],
    },
    {
      title: 'TRAINING & EXPERIENCE',
      content: formatData.training(resumeData.training),
      position: [0, 0, radius], // Back
      rotation: [0, Math.PI, 0],
      panelSize: [7, 8] // This one is taller to fit more text
    },
    {
      title: 'PROJECTS',
      content: formatData.projects(resumeData.projects),
      position: [radius, 0, 0], // Right
      rotation: [0, -Math.PI / 2, 0],
      panelSize: [6, 4]
    },
    {
      title: 'EDUCATION & ACHIEVEMENTS',
      content: [
        ...formatData.education(resumeData.education),
        '',
        '--- ACHIEVEMENTS ---',
        ...formatData.achievements(resumeData.achievements)
      ],
      position: [-4.24, 0, -4.24], // Front-Left
      rotation: [0, Math.PI / 4, 0],
      panelSize: [6, 7]
    },
  ];

  return (
    // Set up the 3D scene
    <Canvas camera={{ position: [0, 0.5, 0.1], fov: 75 }}>
      {/* Lighting */}
      <ambientLight intensity={0.7} />
      <pointLight position={[0, 3, 0]} intensity={1} />
      <pointLight position={[0, -5, -5]} intensity={0.5} color="#bb86fc" />

      {/* Background Color */}
      <color attach="background" args={['#121212']} /> 

      {/* Header Info - Floats in the middle */}
      <Text
        position={[0, 2, 0]}
        fontSize={0.6}
        color="#fff"
        anchorX="center"
      >
        {resumeData.header.name}
      </Text>
      <Text
        position={[0, 1.6, 0]}
        fontSize={0.2}
        color="#ccc"
        anchorX="center"
      >
        {`${resumeData.header.location} | ${resumeData.header.email}`}
      </Text>
      <Text
        position={[0, 1.3, 0]}
        fontSize={0.2}
        color="#ccc"
        anchorX="center"
      >
        {`${resumeData.header.phone} | LinkedIn: ${resumeData.header.linkedin}`}
      </Text>
      
      {/* Render all our resume sections */}
      {sections.map((sec, index) => (
        <SectionPanel
          key={index}
          title={sec.title}
          content={sec.content}
          position={sec.position}
          rotation={sec.rotation}
          panelSize={sec.panelSize}
        />
      ))}

      {/* Camera Controls */}
      <OrbitControls
        enablePan={false} // Prevents moving side-to-side
        enableZoom={true}
        minDistance={1}   // How close you can zoom in
        maxDistance={8}   // How far you can zoom out
        maxPolarAngle={Math.PI / 1.8} // Don't let user go under the "floor"
        minPolarAngle={Math.PI / 3}   // Don't let user go too high
      />
    </Canvas>
  );
}