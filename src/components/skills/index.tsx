import { useState } from "react";
import styles from "./skills.module.css";

interface Skill {
  name: string;
  icon?: string;
  description: string[];
}

const skills: Skill[] = [
  {
    name: "Linux",
    icon: "img/logo/linux-logo.svg",
    description: [
      "Ubuntu / Debian",
      "System administration",
      "SSH and server hardening",
      "Kali Linux",
    ],
  },
  {
    name: "Docker",
    icon: "img/logo/docker-logo.svg",
    description: [
      "Dockerfiles",
      "Multi-container applications",
      "Docker Compose",
      "Volumes and networking",
    ],
  },
  {
    name: "CI/CD",
    icon: "img/logo/githubactions-logo.svg",
    description: [
      "GitHub Actions",
      "Automated builds",
      "Testing workflows",
      "Automated deployment",
    ],
  },
  {
    name: "Security",
    icon: 'img/logo/security-logo.svg',
    description: [
      "OWASP Top 10",
      "Vulnerability analysis",
      "Burp Suite",
      "Hashcat",
      "Secure configuration",
    ],
  },
  {
    name: "Git",
    icon: "img/logo/git-logo.svg",
    description: [
      "Version control",
      "Branching and merging",
      "GitHub",
      "CI/CD integration",
    ],
  },
  {
    name: "Shell Scripting",
    icon: "img/logo/shell-logo.svg",
    description: [
      "Automation",
      "System administration",
      "CLI tooling",
      "Deployment scripts",
    ],
  },
  {
    name: "Python",
    icon: "img/logo/python-logo.svg",
    description: [
      "Automation",
      "Flask / Django",
      "REST APIs",
      "Security tooling",
    ],
  },
  {
    name: "Java",
    icon: "img/logo/java-logo.svg",
    description: [
      "OOP concepts",
      "Spring / Spring Boot",
      "Hibernate / JPA",
      "REST API development",
      "Axon Framework & CQRS",
    ],
  },
  {
    name: "Software Architecture",
    icon: "img/logo/architecture-logo.svg",
    description: [
      "Microservices",
      "Event-driven architecture",
      "CQRS",
      "Domain-driven design",
      "Distributed systems",
    ],
  },
  {
    name: "Virtualization",
    icon: "img/logo/virtualization-logo.svg",
    description: [
      "KVM",
      "Hyper-V",
      "VirtualBox",
      "VM management",
      "VM provisioning and configuration",
    ],
  },
  {
    name: "TypeScript",
    icon: "img/logo/typescript-logo.svg",
    description: [
      "React",
      "Type-safe components",
      "Interfaces",
      "Docusaurus development",
    ],
  },
  {
    name: "Database & SQL",
    icon: "img/logo/sql-logo.svg",
    description: [
      "Relational database concepts",
      "SQL queries and data manipulation",
      "Database design and normalization",
      "SQL injection",
      "Database security"
    ],
  },
  {
    name: "AWS",
    icon: "img/logo/aws-logo.svg",
    description: [
      "EC2",
      "IAM",
      "VPC",
      "S3",
      "Cloud infrastructure",
    ],
  },
  {
    name: "Web Servers",
    icon: "img/logo/web-server.svg",
    description: [
      "Nginx",
      "Reverse proxy",
      "TLS / HTTPS",
      "Virtual hosts",
      "Web server configuration",
    ],
  },
  {
    name: "Documentation",
    icon: "img/logo/documentation-logo.svg",
    description: [
      "Markdown",
      "Technical documentation",
      "Docusaurus",
      "API documentation",
      "Knowledge sharing",
    ],
  },

];

function chunk<T>(arr: T[], size: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    out.push(arr.slice(i, i + size));
  }
  return out;
}

const SKILLS_PER_SLIDE = 3;
const skillGroups = chunk(skills, SKILLS_PER_SLIDE);

export default function Skills() {
  const [activeIndex, setActiveIndex] = useState(0);

  // activeIndex now refers to a GROUP of skills, not a single skill
  const activeGroup = skillGroups[activeIndex];

  const previousGroup = () => {
    setActiveIndex((current: number) =>
      current === 0 ? skillGroups.length - 1 : current - 1,
    );
  };

  const nextGroup = () => {
    setActiveIndex((current: number) =>
      current === skillGroups.length - 1 ? 0 : current + 1,
    );
  };

  return (
    <section className={styles.skills}>
      <div className={styles.inner}>
        <h2 className={styles.heading}>My Skills</h2>

        {/* Desktop */}
        <div className={styles.grid}>
          {skills.map((skill) => (
            <div className={styles.flipCard} key={skill.name}>
              <div className={styles.flipCardInner}>
                <div className={styles.flipCardFront}>
                  {skill.icon && (
                    <img
                      className={styles.icon}
                      src={skill.icon}
                      alt=""
                    />
                  )}

                  <span className={styles.label}>
                    {skill.name}
                  </span>
                </div>

                <div className={styles.flipCardBack}>
                  <h3 className={styles.hoverTitle}>
                    {skill.name}
                  </h3>

                  <ul className={styles.hoverList}>
                    {skill.description.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile */}
        <div className={styles.mobileSlider}>
          <div className={styles.mobileCard}>
            {activeGroup.map((skill) => (
              <div className={styles.mobileSkill} key={skill.name}>
                <span className={styles.mobileLabel}>
                  {skill.name}
                </span>

                <div className={styles.mobileSkillRow}>
                  {skill.icon && (
                    <img
                      className={styles.mobileIcon}
                      src={skill.icon}
                      alt=""
                    />
                  )}

                  <ul className={styles.mobileDescription}>
                    {skill.description.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.sliderControls}>
            <button
              type="button"
              className={styles.sliderArrow}
              onClick={previousGroup}
              aria-label="Previous skills"
            >
              ‹
            </button>

            <div className={styles.dots}>
              {skillGroups.map((group, index) => (
                <button
                  type="button"
                  key={group.map((s) => s.name).join("-")}
                  className={`${styles.dot} ${index === activeIndex
                    ? styles.activeDot
                    : ""
                    }`}
                  onClick={() => setActiveIndex(index)}
                  aria-label={`Show skills group ${index + 1}`}
                  aria-current={
                    index === activeIndex
                      ? "true"
                      : undefined
                  }
                />
              ))}
            </div>

            <button
              type="button"
              className={styles.sliderArrow}
              onClick={nextGroup}
              aria-label="Next skills"
            >
              ›
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}