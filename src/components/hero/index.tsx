import styles from './hero.module.css';
import useBaseUrl from "@docusaurus/useBaseUrl";

export default function Hero() {
  return (
    <section className={styles.hero} id="about">
      <div className={styles.content}>
        <div className={styles.text}>
          
          <p className={styles.eyebrow}>Hey there 👋 I am</p>
          <h1 className={styles.name}>Viacheslav Bortnyk</h1>
          <p className={styles.title}>DevSecOps Engineer</p>

          <div className={styles.mobilePhoto}>
            <img
              src={useBaseUrl("img/vb-photo.jpg")}
              alt="Picture of Viacheslav Bortnyk"
              className={styles.photo}
            />
          </div>

          <p className={styles.bio}>
            I work with Linux infrastructure, containerization, CI/CD, backend development,
            and application security, focusing on practical and reproducible solutions.
            My background includes Java, microservices, REST APIs, and database-driven applications.
            I’m now expanding this experience into DevOps and DevSecOps, working with Linux, Docker, Git, CI/CD pipelines, automation, and security.
            I enjoy understanding how systems are built, deployed, automated, and secured — and putting that knowledge into practice through hands-on projects.
          </p>

          <div className={styles.actions}>
            <a href="#contact" className={styles.cta}>
              Let's Talk
            </a>
          </div>
        </div>

        <div className={styles.desktopPhoto}>
          <img
            src={useBaseUrl("img/vb-photo.jpg")}
            alt="Picture of Viacheslav Bortnyk"
            className={styles.photo}
          />
        </div>
      </div>
    </section>
  );
}