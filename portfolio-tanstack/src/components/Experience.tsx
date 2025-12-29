import { useEffect, useState } from 'react'
import './Experience.css'
import { SectionSprites, experienceSprites } from './AmbientSprites'

interface ExperienceItem {
  title: string
  company: string
  date: string
  description: string
  tags: string[]
  level: number
  current?: boolean
}

export default function Experience() {
  const [isRetro, setIsRetro] = useState(false)

  useEffect(() => {
    const checkTheme = () => setIsRetro(document.documentElement.getAttribute('data-theme') === 'retro')
    checkTheme()
    const observer = new MutationObserver(checkTheme)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
    return () => observer.disconnect()
  }, [])
  const experiences: ExperienceItem[] = [
    {
      level: 3,
      title: 'Senior Software Engineer',
      company: 'Your Company Name',
      date: '2022 - Present',
      description: 'Led the development of innovative solutions that improved system performance by 40%. Collaborated with cross-functional teams to deliver high-quality products on schedule.',
      tags: ['React', 'Node.js', 'TanStack', 'AWS'],
      current: true
    },
    {
      level: 2,
      title: 'Software Developer',
      company: 'Previous Company',
      date: '2020 - 2022',
      description: 'Built scalable web applications serving thousands of users. Implemented best practices for code quality and established automated testing procedures.',
      tags: ['Python', 'Django', 'PostgreSQL']
    },
    {
      level: 1,
      title: 'Junior Developer',
      company: 'First Company',
      date: '2018 - 2020',
      description: 'Started my professional journey building features for web applications. Quickly learned industry best practices and modern development workflows.',
      tags: ['JavaScript', 'HTML/CSS', 'Git']
    }
  ]

  return (
    <section id="experience" className="experience">
      {isRetro && <SectionSprites sprites={experienceSprites} />}
      <div className="container">
        <div className="section-header">
          <span className="section-tag">02 / Experience</span>
          <h2 className="section-title">Quest Log</h2>
        </div>
        
        <div className="timeline">
          {experiences.map((exp, index) => (
            <div 
              key={index} 
              className={`timeline-item ${exp.current ? 'timeline-item--current' : ''}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="timeline-marker">
                <span className="quest-check">✓</span>
              </div>
              <div className="timeline-content">
                <div className="timeline-header">
                  <h3 className="timeline-title">
                    <span className="quest-level">LV{exp.level.toString().padStart(2, '0')}</span>
                    {exp.title}
                  </h3>
                  <span className="timeline-date">{exp.date}</span>
                </div>
                <p className="timeline-company">{exp.company}</p>
                <p className="timeline-description">{exp.description}</p>
                <div className="timeline-tags">
                  {exp.tags.map(tag => (
                    <span key={tag} className="tag">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

