import { BarChart2, BookOpen, Boxes, Brain, Code, Compass, Cpu, Gauge, Globe2Icon, Layers, Lightbulb, LucideIcon, Monitor, Network, RotateCcw, Settings2, Smartphone, Wifi, Wrench } from "lucide-react"
import {
  Github, Instagram, Linkedin, Twitter, Globe, Mail,
 
} from 'lucide-react'

import { MoleculeSkillDetailCardProps, SkillIcon, SkillSource } from "@/components/molecules/MoleculeSkillCard"
import { CardAccent } from "@/components/molecules/MoleculeBentoCard"


const si = (slug: string, hex: string, alt?: string): SkillIcon => ({
  type: 'img',
  src:  `https://cdn.simpleicons.org/${slug}/${hex}`,
  alt:  alt ?? slug,
})

const cdn = (slug: string,  alt?: string): SkillIcon => ({
  type: 'img',
  src:  `${slug}`,
  alt:  alt ?? slug,
})
const lucide = (component: LucideIcon): SkillIcon => ({ type: 'lucide', component })

type SocialAccent  = 'blue' | 'purple' | 'pink' | 'amber' | 'green' | 'white'

interface social{
    logo:React.ReactNode
    label:string
    accent:SocialAccent
    href:string
}

interface education{
    logo:String
    institution:string
    major:string
    year:string
}


interface MainData{
    nama:string
    image:string
    deskripsi:string
    location:string
    taglines:string[]
    education:education
    socials:social[]


}

type SkillEntry = Omit<MoleculeSkillDetailCardProps, 'accent' | 'iconColorClass'>

export interface SkillCategory {
  id:             string
  icon:           LucideIcon
  title:          string
  subtitle:       string
  accent:         CardAccent
  iconColorClass: string
  headerGradient: string
  skills:         SkillEntry[]
}



export const DATA: MainData = {
    nama:"Bayu Aji Nugroho",
    image:"/main.ico",
    deskripsi:"I am an Elementary Education student at Sebelas Maret University with a passion for integrating technology into the classroom. As an active member of a robotics organization, I specialize in programming and technological innovation. I am dedicated to exploring how robotics and digital tools can transform the learning experience and am always open to collaborating on educational technology projects.",
    location:"Surakarta, Central Java",
    taglines:[
        'Front-End Developer',
        'UI/UX Enthusiast',
        'Open Source Contributor',
    ],
    education:{
            institution:"Sebelas Maret University",
            major:"Elementary School Teacher Education",
            year:"2024-Present",
            logo:""
        }
    ,
    socials:[
            { href: 'https://github.com/bayu-aji-nugroho',     logo: <Github    size={16} />, label: 'GitHub',    accent: 'white'},
            { href: 'https://www.instagram.com/ba_ngr._',  logo: <Instagram size={16} />, label: 'Instagram', accent: 'pink'  },
            { href: 'https://www.linkedin.com/in/bayu-aji-nugroho-43b63b267/',logo: <Linkedin  size={16} />, label: 'LinkedIn',  accent: 'blue'  },
            { href: 'https://x.com/bay8a',    logo: <Twitter   size={16} />, label: 'Twitter',   accent: 'blue'  },
            { href: 'bayuanugroho81406@gmail.com',            logo: <Mail      size={16} />, label: 'Email',     accent: 'amber'  },
            
            
        ]
}




export const TECHNICAL: SkillCategory[] = [
  /* 1. IoT & Robotics */
  {
    id:             'iot',
    icon:           Cpu,
    title:          'IoT & Robotics',
    subtitle:       'Hardware · Control Systems · Simulation',
    accent:         'green',
    iconColorClass: 'text-emerald-400',
    headerGradient: 'from-emerald-500/20 via-transparent',
    skills: [
      {
        name:    'Arduino',
        year:    '2024 – present',
        source:  'Robotika UNS' as SkillSource,
        
        icon:    lucide(Cpu),
        tags:    ['C/C++', 'Sensors', 'Actuators'],
        tagColor:'green',
      },
      {
        name:    'ESP32',
        year:    '2024 – present',
        source:  'Robotika UNS' as SkillSource,
        icon:    lucide(Wifi),
        tags:    ['WiFi', 'BLE', 'FreeRTOS'],
        tagColor:'green',
      },
      {
        name:    'raspberry pi',
        year:    '2024 – present',
        source:  'Robotika UNS' as SkillSource,
        icon:    lucide(Cpu),
        tags:    ['WiFi', 'BLE', 'FreeRTOS'],
        tagColor:'green',
      },
      {
        name:    'Object Detection',
        year:    '2024 – present',
        source:  'Robotika UNS' as SkillSource,
        icon:    lucide(Cpu),
        tags:    ['Computer Vision', 'Object Detection', 'AI Model'],
        tagColor:'green',
      },
      {
        name:    'PID & Closed-Loop Control',
        year:    '2025 – present',
        source:  'Robotika UNS' as SkillSource,
        icon:    lucide(Gauge),
        tags:    ['PID Tuning', 'Feedback Loop'],
        tagColor:'green',
      },
      {
        name:    'Omnidirectional Movement',
        year:    '2025 – present',
        source:  'Robotika UNS' as SkillSource,
        icon:    lucide(RotateCcw),
        tags:    ['Kinematics', 'X-drive', 'Omni'],
        tagColor:'green',
      },
      {
        name:    'IMU System',
        year:    '2025 – present',
        source:  'Robotika UNS' as SkillSource,
        icon:    lucide(Compass),
        tags:    ['Gyro', 'Accel', 'Compass', 'Kalman'],
        tagColor:'green',
      },
      {
        name:    'Encoder & DC Motor',
        year:    '2025 – present',
        source:  'Robotika UNS' as SkillSource,
        icon:    lucide(Settings2),
        tags:    ['Quadrature', 'H-Bridge', 'RPM'],
        tagColor:'green',
      },
      {
        name:    'Basic ROS',
        year:    '2025 - present',
        source:  'Self-Taught' as SkillSource,
        icon:    lucide(Network),
        tags:    ['ROS Noetic', 'Topic/Node', 'Ubuntu'],
        tagColor:'green',
      },
      {
        name:    'Webots Simulator',
        year:    '2025 - present',
        source:  'Self-Taught' as SkillSource,
        icon:    lucide(Monitor),
        tags:    ['3D Simulation', 'Python Controller'],
        tagColor:'green',
      },
      {
        name:    'Serial Studio',
        year:    '2025  - present',
        source:  'Self-Taught' as SkillSource,
        icon:    lucide(BarChart2),
        tags:    ['UART', 'Real-Time', 'Debug'],
        tagColor:'green',
      },
    ],
  },

  /* 2. Programming Languages */
  {
    id:             'lang',
    icon:           Code,
    title:          'Programming Languages',
    subtitle:       'Languages & Markup',
    accent:         'purple',
    iconColorClass: 'text-violet-400',
    headerGradient: 'from-violet-500/20 via-transparent',
    skills: [
      {
        name: 'C++', year: '2020 – present', source: 'Self-Taught' as SkillSource,
         primary: true, icon: si('cplusplus', '00599C'),
        tags: ['OOP', 'STL', 'Embedded'], tagColor: 'purple',
      },
      {
        name: 'Python', year: '2020 – present', source: 'Self-Taught' as SkillSource,
         primary: true, icon: si('python', '3776AB'),
        tags: ['Scripting', 'ROS', 'OpenCV'], tagColor: 'purple',
      },
      {
        name: 'TypeScript', year: '2023 – present', source: 'Self-Taught' as SkillSource,
         primary: true, icon: si('typescript', '3178C6'),
        tags: ['Type-Safe', 'ES2023'], tagColor: 'purple',
      },
      {
        name: 'JavaScript', year: '2021 – present', source: 'Self-Taught' as SkillSource,
         primary: true, icon: si('javascript', 'F7DF1E'),
        tags: ['ES2023', 'DOM', 'Async'], tagColor: 'purple',
      },
      {
        name: 'HTML', year: '2020 – present', source: 'Self-Taught' as SkillSource,
         primary: true, icon: si('html5', 'E34F26'),
        tags: ['Semantic', 'Accessibility'], tagColor: 'purple',
      },
      {
        name: 'CSS', year: '2020 – present', source: 'Self-Taught' as SkillSource,
         primary: true, icon: si('css', '1572B6'),
        tags: ['Grid', 'Flexbox', 'Animation'], tagColor: 'purple',
      },
      {
        name: 'C#', year: '2023 – present', source: 'Self-Taught' as SkillSource,
         icon: si('sharp', '239120'),
        tags: ['Unity', 'OOP'], tagColor: 'purple',
      },
      {
        name: 'Java', year: '2021 – present', source: 'Self-Taught' as SkillSource,
         icon: si('openjdk', 'ED8B00'),
        tags: ['OOP', 'Collections', 'Swing'], tagColor: 'purple',
      },
      {
        name: 'Dart', year: '2021 – present', source: 'Self-Taught' as SkillSource,
         icon: si('dart', '0175C2'),
        tags: ['Flutter', 'Mobile'], tagColor: 'purple',
      },
      {
        name: 'Kotlin', year: '2021 – present', source: 'Self-Taught' as SkillSource,
         icon: si('kotlin', '7F52FF'),
        tags: ['Android', 'Coroutines', 'Compose'], tagColor: 'purple',
      },
      {
        name: 'LaTeX', year: '2020 – present', source: 'Self-Taught' as SkillSource,
         icon: si('latex', '008080'),
        tags: ['Overleaf', 'BibTeX', 'Reports'], tagColor: 'purple',
      },
    ],
  },


  /* 3. Technologies & Frameworks */
  {
    id:             'tech',
    icon:           Boxes,
    title:          'Technologies & Frameworks',
    subtitle:       'Libraries and ecosystems',
    accent:         'pink',
    iconColorClass: 'text-pink-400',
    headerGradient: 'from-pink-500/20 via-transparent',
    skills: [
      {
        name: 'Next.js', year: '2023 – present', source: 'Self-Taught' as SkillSource,
         primary: true, icon: si('nextdotjs', 'FFFFFF'),
        tags: ['App Router', 'SSR', 'API Routes'], tagColor: 'pink',
      },
      {
        name: 'React', year: '2023 – present', source: 'Self-Taught' as SkillSource,
         primary: true, icon: si('react', '61DAFB'),
        tags: ['Hooks', 'Context', 'SPA'], tagColor: 'pink',
      },
      {
        name: 'Tailwind CSS', year: '2023 – present', source: 'Self-Taught' as SkillSource,
         primary: true, icon: si('tailwindcss', '06B6D4'),
        tags: ['Utility-First', 'Responsive', 'v4'], tagColor: 'pink',
      },
      {
        name: 'Django', year: '2023', source: 'Self-Taught' as SkillSource,
         icon: si('django', '44B78B'),
        tags: ['Django REST', 'ORM', 'PostgreSQL'], tagColor: 'pink',
      },{
        name: 'Flutter', year: '2023', source: 'Self-Taught' as SkillSource,
         icon: si('flutter', '44B78B'),
        tags: ['Mobile App', 'Backend API', 'Database'], tagColor: 'pink',
      },
    ],
  },

  /* 5. Tools & Software */
  {
    id:             'tools',
    icon:           Wrench,
    title:          'Tools & Software',
    subtitle:       'Dev tools · Productivity · Game Engines · CAD',
    accent:         'amber',
    iconColorClass: 'text-amber-400',
    headerGradient: 'from-amber-500/20 via-transparent',
    skills: [
      {
        name: 'Git', year: '2020 – present', source: 'Self-Taught' as SkillSource,
         primary: true, icon: si('git', 'F05032'),
        tags: ['Branching', 'Merge', 'Rebase'], tagColor: 'amber',
      },
      {
        name: 'GitHub', year: '2021 – present', source: 'Self-Taught' as SkillSource,
         primary: true, icon: si('github', 'FFFFFF'),
        tags: ['PR/Review', 'CI/CD', 'Actions'], tagColor: 'amber',
      },
      {
        name: 'Platform.io', year: '2024 – present', source: 'Project' as SkillSource,
         icon: si('platformio', 'FF7F00'),
        tags: ['Embedded IDE', 'Multi-Board'], tagColor: 'amber',
      },
      {
        name: 'Linux & WSL', year: '2024 – present', source: 'Self-Taught' as SkillSource,
         icon: si('linux', 'FCC624'),
        tags: ['Ubuntu', 'CLI', 'WSL2', 'Bash'], tagColor: 'amber',
      },
      {
        name: 'Microsoft Word', year: '2017 – present', source: 'Self-Taught' as SkillSource,
         icon: cdn("https://img.icons8.com/?size=100&id=117563&format=png&color=000000"),
        tags: ['Documents', 'Reports', 'Formatting'], tagColor: 'amber',
      },
      {
        name: 'Microsoft Excel', year: '2020 – present', source: 'Self-Taught' as SkillSource,
         icon: cdn("https://img.icons8.com/?size=100&id=117561&format=png&color=000000"),
        tags: ['Spreadsheet', 'Formulas', 'Charts'], tagColor: 'amber',
      },
      {
        name: 'Google Docs', year: '2020 – present', source: 'Self-Taught' as SkillSource,
         icon: si('googledocs', '4285F4'),
        tags: ['Collaboration', 'Cloud', 'Writing'], tagColor: 'amber',
      },
      {
        name: 'Google Sheets', year: '2020 – present', source: 'Self-Taught' as SkillSource,
         icon: si('googlesheets', '34A853'),
        tags: ['Spreadsheet', 'Cloud', 'Formulas'], tagColor: 'amber',
      },
      {
        name: 'Canva', year: '2024 – present', source: 'University' as SkillSource,
         icon: cdn("https://img.icons8.com/?size=100&id=iWw83PVcBpLw&format=png&color=000000"),
        tags: ['Design', 'Presentation', 'Social Media'], tagColor: 'amber',
      },
      {
        name: 'Godot Engine', year: '2024', source: 'Self-Taught' as SkillSource,
         icon: si('godotengine', '478CBF'),
        tags: ['GDScript', '2D Game', 'Scene Tree'], tagColor: 'amber',
      },
      {
        name: 'Unity', year: '2024', source: 'Self-Taught' as SkillSource,
         icon: si('unity', 'FFFFFF'),
        tags: ['C#', '3D Game', 'Physics'], tagColor: 'amber',
      },
      {
        name: 'Fusion 360', year: '2025', source: 'Robotika UNS' as SkillSource,
         icon: lucide(Boxes),
        tags: ['3D CAD', 'Mechanical', '3D Print'], tagColor: 'amber',
      },
    ],
  },
]

/* ─── NON-TECHNICAL ─────────────────────────────────────── */

export const NON_TECHNICAL: SkillCategory[] = [
  /* 6. Languages */
  {
    id:             'spoken-lang',
    icon:           Globe,
    title:          'Languages',
    subtitle:       'Spoken & written communication',
    accent:         'purple',
    iconColorClass: 'text-cyan-400',
    headerGradient: 'from-cyan-500/20 via-transparent',
    skills: [
      {
        name:    'Indonesian',
        year:    'Since birth',
        source:  'Native' as SkillSource,
        primary: true,
        icon:    lucide(Globe),
        tags:    ['Native Speaker', 'Written', 'Spoken'],
        tagColor:'cyan',
      },
      {
        name:    'English',
        year:    '-',
        source:  'Self-Taught' as SkillSource,
        primary: true,
        icon:    lucide(BookOpen),
        tags:    ['Reading', 'Writing', 'Technical'],
        tagColor:'cyan',
      },
      {
        name: 'javanese',
        year: 'Since birth',
        tags: ['Native Speaker', 'Written', 'Spoken'],
        tagColor: 'cyan',
        icon: lucide(BookOpen),
        source:"Native",
             }
    ],
  },

  /* 7. Soft Skills */
  {
    id:             'soft',
    icon:           Brain,
    title:          'Soft Skills',
    subtitle:       'Personal & cognitive capabilities',
    accent:         'purple',
    iconColorClass: 'text-violet-400',
    headerGradient: 'from-violet-500/20 via-transparent',
    skills: [
      {
        name:    'Critical Thinking',
        year:    '2020 – present',
        source:  'Native' as SkillSource,
        primary: true,
        icon:    lucide(Brain),
        tags:    ['Analysis', 'Decision Making', 'Logic'],
        tagColor:'purple',
      },
      {
        name:    'Problem Solving',
        year:    '2020 – present',
        source:  'Native' as SkillSource,
        primary: true,
        icon:    lucide(Settings2),
        tags:    ['Debugging', 'Root Cause', 'Systems'],
        tagColor:'purple',
      },
      {
        name:    'Curiosity',
        year:    'Since birth',
        source:  'Native' as SkillSource,
        primary: true,
        icon:    lucide(Lightbulb),
        tags:    ['Self-Learning', 'Exploration', 'Research'],
        tagColor:'purple',
      },
    ],
  },
]
export default DATA