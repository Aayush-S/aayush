import { useEffect, useState } from "react";
import "./Hero.css";

export default function Hero() {
  const [displayText, setDisplayText] = useState("");
  const fullText = "Aayush Seth";

  useEffect(() => {
    let index = 0;
    const typeSpeed = 100;

    const typeInterval = setInterval(() => {
      if (index < fullText.length) {
        setDisplayText(fullText.substring(0, index + 1));
        index++;
      } else {
        clearInterval(typeInterval);
      }
    }, typeSpeed);

    return () => clearInterval(typeInterval);
  }, []);

  const scrollToNext = () => {
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="hero">
      <div className="hero-content">
        <h1 className="hero-title">
          <span className="greeting">Hi, I'm</span>
          <span className="name">
            {displayText}
            <span className="cursor">|</span>
          </span>
        </h1>
        <p className="hero-subtitle">Developer</p>
        <div className="hero-cta">
          <button onClick={scrollToNext} className="btn btn-primary">
            View my work
          </button>
          <button
            onClick={() =>
              document
                .getElementById("contact")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="btn btn-secondary"
          >
            Get in touch
          </button>
        </div>
      </div>
    </section>
  );
}
