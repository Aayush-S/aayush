import { useEffect, useState } from "react";
import "./About.css";
import { SectionSprites, aboutSprites } from "./AmbientSprites";

export default function About() {
  const [isRetro, setIsRetro] = useState(false);

  useEffect(() => {
    const checkTheme = () =>
      setIsRetro(
        document.documentElement.getAttribute("data-theme") === "retro"
      );
    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    return () => observer.disconnect();
  }, []);

  const skills = [
    "Python",
    "TypeScript",
    "AI Agents",
    "Machine Learning",
    "React",
    "Node.js",
  ];

  const stats = [
    { label: "CLASS", value: "Developer" },
    { label: "LOCATION", value: "SF Bay Area" },
    { label: "SPECIALTY", value: "AI Engineering" },
  ];

  return (
    <section id="about" className="about">
      {isRetro && <SectionSprites sprites={aboutSprites} />}
      <div className="container">
        <div className="section-header">
          <span className="section-tag">01 / About</span>
          <h2 className="section-title">Character Bio</h2>
        </div>

        <div className="about-content">
          <div className="about-text">
            {/* Stat block for RPG mode */}
            <div className="stat-block">
              {stats.map((stat) => (
                <div key={stat.label} className="stat-item">
                  <span className="stat-label">{stat.label}</span>
                  <span className="stat-value">{stat.value}</span>
                </div>
              ))}
            </div>

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
              <h3 className="skills-title">Abilities</h3>
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
