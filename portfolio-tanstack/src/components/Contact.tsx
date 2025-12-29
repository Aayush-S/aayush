import "./Contact.css";

export default function Contact() {
  const contactLinks = [
    {
      label: "your.email@example.com",
      href: "mailto:your.email@example.com",
    },
    {
      label: "LinkedIn",
      href: "https://linkedin.com/in/yourprofile",
    },
    {
      label: "GitHub",
      href: "https://github.com/yourprofile",
    },
  ];

  return (
    <section id="contact" className="contact">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">03 / Contact</span>
          <h2 className="section-title">Let's Connect</h2>
        </div>

        <div className="contact-content">
          <p className="contact-text">
            Whether you want to discuss the latest models in AI, share hiking
            trail recommendations, or debate Elden Ring builds — I'd love to
            hear from you.
          </p>

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
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
