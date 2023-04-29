import styles from './Footer.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter, faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";


const Footer = () => {
  return (
    <>
      <hr />
      <div className={styles.footercontainer}>
        <p>
          © {new Date().getFullYear()} Esteban Gonzalez
        </p>
        <img src="https://api.visitorbadge.io/api/visitors?path=https%3A%2F%2Fgithub.com%2FEstebanjgg%2Fgenerador-citas-naruto&label=VISITORS&labelColor=%2337d67a&countColor=%23555555&style=flat&labelStyle=upper" />
        <div className={styles.socialicons}>
          <a
            href="https://twitter.com/estebanjosegon5"
            aria-label="Twitter"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faTwitter} />
          </a>
          <a
            href="https://github.com/Estebanjgg"
            aria-label="GitHub"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faGithub} />
          </a>
          <a
            href="https://www.linkedin.com/in/esteban-jose-gonzalez-gomez-297771173/"
            aria-label="LinkedIn"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faLinkedin} />
          </a>
        </div>
      </div>
    </>
  )
}

export default Footer;
