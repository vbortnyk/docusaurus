import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import styles from "./contact.module.css";
import useBaseUrl from "@docusaurus/useBaseUrl";

export default function Contact() {
  const { siteConfig } = useDocusaurusContext();
  const linkedinIcon = useBaseUrl("/img/logo/linkedin-icon.svg");

  const contactEmail = siteConfig.customFields?.contactEmail as string;
  const linkedinUrl = siteConfig.customFields?.linkedinUrl as string;

  return (<section className={styles.contact} id="contact"> <div className={styles.inner}> <div className={styles.left}> <p className={styles.eyebrow}>GET IN TOUCH</p>

    <h2 className={styles.heading}>Let's talk.</h2>

    <ul className={styles.list}>
      <li>Open to DevSecOps and DevOps opportunities.</li>

      <li>
        Background in Java backend development.
      </li>

      <li>
        Hands-on experience in infrastructure, automation, CI/CD and
        security gained through professional training.
      </li>

      <li>
        Open to discussing technical projects and engineering
        opportunities.
      </li>
    </ul>
  </div>

    <div className={styles.right}>
      <p className={styles.tagline}>
        Have an opportunity or technical question?
      </p>

      <div className={styles.links}>
        <a
          href={`mailto:${contactEmail}`}
          className={styles.link}
        >
          <span
            className={`${styles.iconCell} ${styles.mailIcon}`}
            aria-hidden="true"
          >
            @
          </span>

          <span>{contactEmail}</span>
        </a>

        <a
          href={linkedinUrl}
          target="_blank"
          rel="noreferrer"
          className={styles.link}
        >
          <span className={styles.iconCell}>
            <img
              src={linkedinIcon}
              alt=""
              aria-hidden="true"
              className={styles.linkedinIcon}
            />
          </span>

          <span>LinkedIn</span>
        </a>
      </div>
    </div>
  </div>
  </section>
  );
}
