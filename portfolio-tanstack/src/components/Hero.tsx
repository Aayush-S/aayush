import { useEffect, useState } from "react";
import "./Hero.css";
import { HeroSprites } from "./AmbientSprites";

export default function Hero() {
  const [displayText, setDisplayText] = useState("");
  const [isRetro, setIsRetro] = useState(false);
  const fullText = "Aayush Seth";

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
      {isRetro && <HeroSprites />}
      <div className="hero-content">
        <div className="hero-panel">
          <h1 className="hero-title">
            <span className="greeting">Hi, I'm</span>
            <span className="name">
              {displayText}
              <span className="cursor">|</span>
            </span>
          </h1>
          <p className="hero-subtitle">
            Developer, musician, and mountain wanderer.
          </p>
          <div className="hero-cta">
            <button onClick={scrollToNext} className="btn btn-primary">
              <span className="btn-arrow">▶</span> View Work
            </button>
            <button
              onClick={() =>
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="btn btn-secondary"
            >
              <span className="btn-arrow">▶</span> Contact
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
