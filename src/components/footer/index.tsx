import styles from "./footer.module.css";
import useBaseUrl from "@docusaurus/useBaseUrl";

export default function Footer() {
  const arrIcon = useBaseUrl("img/logo/arr.png");

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className={styles.portfolioFooter}>
      <div className={styles.inner}>
        <button
          type="button"
          className={styles.scrollBtn}
          onClick={scrollToTop}
          aria-label="Scroll to top"
        >
          <img
            src={useBaseUrl("/img/logo/arr.png")}
            alt=""
            className={styles.arrow}
          />
        </button>
        <div className={styles.bottom}>
          <p className={styles.copy}>
            © Viacheslav Bortnyk {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
}
