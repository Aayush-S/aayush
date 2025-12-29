import { useEffect, useState } from "react";
import "./Contact.css";
import { SectionSprites, contactSprites } from "./AmbientSprites";

export default function Contact() {
  const [isRetro, setIsRetro] = useState(false);

  useEffect(() => {
    const checkTheme = () => setIsRetro(document.documentElement.getAttribute('data-theme') === 'retro');
    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => observer.disconnect();
  }, []);

  const contactLinks = [
    {
      label: "Email",
      value: "your.email@example.com",
      href: "mailto:your.email@example.com",
    },
    {
      label: "LinkedIn",
      value: "Connect",
      href: "https://linkedin.com/in/yourprofile",
    },
    {
      label: "GitHub",
      value: "Follow",
      href: "https://github.com/yourprofile",
    },
  ];

  return (
    <section id="contact" className="contact">
      {isRetro && <SectionSprites sprites={contactSprites} />}
      <div className="container">
        <div className="section-header">
          <span className="section-tag">03 / Contact</span>
          <h2 className="section-title">Send Message</h2>
        </div>

        <div className="contact-content">
          <div className="dialog-box">
            <p className="contact-text">
              Whether you want to discuss the latest models in AI, share hiking
              trail recommendations, or debate Elden Ring builds — I'd love to
              hear from you.
            </p>
            <p className="dialog-prompt">Choose an option:</p>
          </div>

          <div className="contact-links">
            {contactLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className="contact-link"
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={
                  link.href.startsWith("http")
                    ? "noopener noreferrer"
                    : undefined
                }
              >
                <span className="link-arrow">▶</span>
                <span className="link-label">{link.label}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
