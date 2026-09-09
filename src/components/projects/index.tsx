import { useState } from "react";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import styles from "./projects.module.css";
import useBaseUrl from "@docusaurus/useBaseUrl";

interface Tag {
  label: string;
  icon: string;
}

interface Project {
  title: string;
  description: string;
  tags: Tag[];
  docPath: string;
  githubLink: string;
  image: string;
}

const projects: Project[] = [
  {
    title: "Juice Shop Master",
    description:
      "OWASP Juice Shop vulnerability writeups covering SQL injection, password hash exposure, and more coming soon.",
    tags: [
      {
        label: "Security",
        icon: "img/logo/security-logo.svg",
      },
      {
        label: "Python",
        icon: "img/logo/python-logo.svg",
      },
      {
        label: "Linux",
        icon: "img/logo/linux-logo.svg",
      },
    ],
    docPath: "docs/projects/juice-shop-master",
    githubLink: "https://github.com/vbortnyk/juice-shop",
    image: "img/projects/juice-shop/juice-shop-logo.webp",
  },
  {
    title: 'WordPress',
    description:
      'A containerized WordPress deployment using Docker Compose and MariaDB, with secrets management, persistent storage and automated container initialization',
    tags: [
      {
        label: 'Docker',
        icon: "img/logo/docker-logo.svg",
      },
      {
        label: 'php',
        icon: "img/logo/php-logo.svg",
      },
      {
        label: 'mariadb',
        icon: 'img/logo/mariadb-logo.svg',
      },
      {
        label: 'Shell',
        icon: 'img/logo/wp.svg',
      },
    ],
    docPath: 'docs/projects/wordpress-docs',
    githubLink: 'https://github.com/vbortnyk/wordpress',
    image: 'img/projects/wordpress/wordpress-logo-copy.png',
  },
  {
    title: 'Minecraft Server',
    description:
      'A reproducible Minecraft server deployment built with Docker and Docker Compose, with automated setup and persistent application data.',
    tags: [
      {
        label: 'Docker',
        icon: 'img/logo/docker-logo.svg',
      },
      {
        label: 'Java',
        icon: 'img/logo/java-logo.svg',
      },
      {
        label: 'Shell',
        icon: 'img/logo/shell-logo.svg',
      },
      {
        label: 'Python',
        icon: 'img/logo/python-logo.svg',
      },
    ],
    docPath: 'docs/projects/minecraft-server',
    githubLink: 'https://github.com/vbortnyk/minecraft-server-docs',
    image: 'img/projects/minecraft/minecraft-logo.webp',
  },
  {
    title: 'Truck Signs API',
    description:
      'A containerized Django REST API for managing truck sign products, customizations and orders, using PostgreSQL, Gunicorn and Docker Compose with automated migrations, health checks and production-ready deployment configuration.',
    tags: [
      {
        label: 'Python',
        icon: 'img/logo/python-logo.svg',
      },
      {
        label: 'Django',
        icon: 'img/logo/django-logo.svg',
      },
      {
        label: 'Docker',
        icon: 'img/logo/docker-logo.svg',
      },
      {
        label: 'PostgreSQL',
        icon: 'img/logo/postgresql-logo.svg',
      },
      {
        label: 'Nginx',
        icon: 'img/logo/nginx-logo.svg',
      },
    ],
    docPath: 'docs/projects/truck-signs-api',
    githubLink: 'https://github.com/vbortnyk/truck-signs-api',
    image: 'img/projects/truck-signs-api/tuch-signs-logo.png',
  },
  {
    title: 'Conduit Deployment',
    description:
      'A centralized CI/CD deployment system using GitHub Actions and GitHub Container Registry to orchestrate Docker Compose deployments to a remote Linux VPS via SSH, with support for full-stack and individual service updates.',
    tags: [
      {
        label: 'GitHub Actions',
        icon: 'img/logo/githubactions-logo.svg',
      },
      {
        label: 'Linux',
        icon: 'img/logo/linux-logo.svg',
      },
      {
        label: 'Dnango',
        icon: 'img/logo/django-logo.svg',
      },
      {
        label: 'Angujlar',
        icon: 'img/logo/angular-logo.svg',
      },
    ],
    docPath: 'docs/projects/conduit-deployment/conduit',
    githubLink: 'https://github.com/vbortnyk/conduit-deployment',
    image: 'img/projects/conduit-deployment/pipeline.png',
  },
  {
    title: 'Docusaurus',
    description:
      'A personal portfolio website built with Docusaurus, React and TypeScript. Hosted on GitHub Pages with a fully automated CI/CD pipeline using GitHub Actions and environment variables managed via GitHub Secrets.',
    tags: [
      {
        label: 'React',
        icon: 'img/logo/react-logo.svg',
      },
      {
        label: 'TypeScript',
        icon: 'img/logo/typescript-logo.svg',
      },
      {
        label: 'GitHub Actions',
        icon: 'img/logo/githubactions-logo.svg',
      },
    ],
    docPath: 'docs/docusaurus',
    githubLink: 'https://github.com/vbortnyk/docusaurus',
    image: 'img/docusaurus.png',
  },
];

const VISIBLE_COUNT = 5;
const MOBILE_VISIBLE_COUNT = 3;

export default function Projects() {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const { siteConfig } = useDocusaurusContext();
  const baseUrl = siteConfig.baseUrl;

  const activeProject = projects[activeIndex];

  return (
    <section className={styles.projects} id="projects">
      <div className={styles.inner}>
        <h2 className={styles.heading}>My project highlights</h2>

        {/* Desktop */}
        <div className={styles.desktopLayout}>
          <div className={styles.projectListWrapper}>
            <ol className={styles.projectList}>
              {projects
                .slice(0, VISIBLE_COUNT)
                .map((project, index) => (
                  <li
                    key={project.title}
                    className={
                      index === activeIndex
                        ? styles.activeItem
                        : styles.listItem
                    }
                  >
                    <button
                      type="button"
                      className={styles.projectButton}
                      onClick={() =>
                        setActiveIndex(index)
                      }
                    >
                      {project.title}
                    </button>
                  </li>
                ))}
            </ol>

            <Link
              to={`${baseUrl}docs/projects/overview`}
              className={styles.seeMore}
            >
              ↳ see more projects
            </Link>
          </div>

          <article className={styles.card}>
            <h3 className={styles.cardTitle}>
              {activeProject.title}
            </h3>

            <div className={styles.tags}>
              {activeProject.tags.map((tag) => (
                <span key={tag.label} className={styles.tag}>
                  <img
                    src={tag.icon}
                    alt="tag.label"
                    aria-hidden="true"
                    className={styles.tagIcon}
                  />
                  {tag.label}
                </span>
              ))}
            </div>

            <div className={styles.cardImageWrapper}>
              <img
                src={activeProject.image}
                alt={activeProject.title}
                className={styles.cardImage}
              />
            </div>

            <div className={styles.cardBody}>
              <p className={styles.cardDesc}>
                {activeProject.description}
              </p>

              <div className={styles.buttons}>
                <Link
                  to={`${baseUrl}${activeProject.docPath}`}
                  className={styles.btnPrimary}
                >
                  Documentation
                </Link>

                <a
                  href={activeProject.githubLink}
                  target="_blank"
                  rel="noreferrer"
                  className={styles.btnSecondary}
                >
                  GitHub
                </a>
              </div>
            </div>
          </article>
        </div>

        {/* Mobile */}
        <div className={styles.mobileProjects}>
          {projects
            .slice(0, MOBILE_VISIBLE_COUNT)
            .map((project, index) => (
              <article
                key={project.title}
                className={styles.mobileCard}
              >
                <h3 className={styles.mobileCardTitle}>
                  {index + 1}. {project.title}
                </h3>

                <div className={styles.mobileTags}>
                  {project.tags.map((tag) => (
                    <span
                      key={tag.label}
                      className={styles.mobileTag}
                    >
                      <img
                        src={tag.icon}
                        alt={tag.label}
                        aria-hidden="true"
                        className={styles.mobileTagIcon}
                      />
                      {tag.label}
                    </span>
                  ))}
                </div>

                <img
                  src={project.image}
                  alt={project.title}
                  className={styles.mobileImage}
                />

                <p className={styles.mobileDescription}>
                  {project.description}
                </p>

                <div className={styles.mobileButtons}>
                  <Link
                    to={`${baseUrl}${project.docPath}`}
                    className={styles.btnPrimary}
                  >
                    Documentation
                  </Link>

                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noreferrer"
                    className={styles.btnSecondary}
                  >
                    GitHub
                  </a>
                </div>
              </article>
            ))}
        </div>
      </div>
    </section>
  );
}
