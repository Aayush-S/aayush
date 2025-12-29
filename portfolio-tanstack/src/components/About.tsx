import './About.css'

export default function About() {
  const skills = [
    'JavaScript',
    'Python',
    'React',
    'Node.js',
    'TypeScript',
    'TanStack'
  ]

  return (
    <section id="about" className="about">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">01 / About</span>
          <h2 className="section-title">Who I Am</h2>
        </div>
        
        <div className="about-content">
          <div className="about-text">
            <p className="about-intro">
              I'm a passionate developer who loves creating elegant solutions to
              complex problems. With a keen eye for design and a deep
              understanding of technology, I bridge the gap between beautiful
              user experiences and robust functionality.
            </p>
            <p>
              When I'm not coding, you can find me exploring new technologies,
              contributing to open-source projects, or sharing knowledge with
              the developer community.
            </p>
            
            <div className="skills-grid">
              {skills.map((skill, index) => (
                <div 
                  key={skill} 
                  className="skill-item"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {skill}
                </div>
              ))}
            </div>
          </div>
          
          <div className="about-visual">
            <div className="profile-placeholder">
              <div className="profile-inner">
                <span className="profile-text">Your Photo</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

