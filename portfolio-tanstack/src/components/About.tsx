import "./About.css";

export default function About() {
  const skills = [
    "Python",
    "TypeScript",
    "AI Agents",
    "Machine Learning",
    "React",
    "Node.js",
  ];

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
              I'm a developer who finds joy in crafting elegant solutions and
              building things that feel right. I care deeply about the
              intersection of design and engineering — making software that's
              not just functional, but genuinely delightful to use.
            </p>
            <p>
              Outside of code, I love to play tennis, explore San Francisco,
              play the guitar, and play video games. I'm also a Bay Area transit
              nerd and love to learn about new lines and quirks of the system.
            </p>

            <div className="skills-section">
              <h3 className="skills-title">Tech I work with</h3>
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
  );
}
