'use client'
import { OrganismSideNav } from '@/components/organisms/OrganismSideNav'
import { OrganismHeroSection } from '@/components/organisms/OrganismHeroSection'
import OrganismMainSection from '@/components/organisms/OrganismMainSection'
import { useEffect, useState } from 'react';
import './globals.css'
import OrganismSkillSection from '@/components/organisms/Organismskillsection';
import DATA from './src/data';
import OrganismMyJourney from '@/components/organisms/Organismmyjourney';
import { OrganismProjectSection } from '@/components/organisms/Organismprojectsection';
import { projectsData } from './src/Projects.data';
import {contactData} from "./src/contact"
import OrganismSectionContact from '@/components/organisms/OrganismContactSection';


export  function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-tema text-text font-sans">
        {/* Side nav — fixed, di luar flow dokumen */}
        <OrganismSideNav
          wordmark={DATA.nama}
          githubHref={DATA.socials[0].href}
          linkedinHref={DATA.socials[2].href}
          twitterHref={DATA.socials[3].href}
        />

        {/* Main content — offset lg:ml-[240px] untuk memberi ruang sidebar */}
        <div className="lg:ml-[240px]">
          {children}
        </div>
      </body>
    </html>
  )
}

 function AutoHideComponent({ 
  children, 
  duration = 5000 // Default: 5 seconds
}: { 
  children: React.ReactNode, 
  duration?: number 
}) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, duration);

    // Clean up timer to prevent memory leaks
    return () => clearTimeout(timer);
  }, [duration]);

  if (!isVisible) return null; // Component is removed from the DOM

  return <div className="transition-opacity duration-500">{children}</div>;
}


function DelayedComponent({ children }: { children: React.ReactNode }) {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);
  if (!isVisible) return null; 

  return <>{children}</>;
}

// ── app/page.tsx ─────────────────────────────────────────────────────────────


export default function HomePage() {
  
  return (
    <main>
    
      <RootLayout>
        <section id="home" className="min-h-screen bg-tema">
          <DelayedComponent>
            <OrganismMainSection />
          </DelayedComponent>
        </section>
        <section id="skills"   className="min-h-screen bg-tema"><OrganismSkillSection /> </section>
        <section id="myjourney" className="min-h-screen bg-tema"> 
            <OrganismMyJourney />
        </section>
        <section id="project"   className="min-h-screen bg-tema">
          <OrganismProjectSection  projects={projectsData}/>
        </section>
        <section id="contact"  className="min-h-screen bg-tema">
         <OrganismSectionContact/> </section> 
      </RootLayout>
      <AutoHideComponent duration={5000}>
         <OrganismHeroSection/>
      </AutoHideComponent>
       
      
    </main>
  )
}