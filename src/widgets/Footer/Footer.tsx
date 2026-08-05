import {
  FaGithub,
  FaGitlab,
  FaLinkedinIn,
  FaTelegram,
  FaWhatsapp,
} from 'react-icons/fa6';
import { FOOTER_SECTIONS } from './model/content';
import type { Translate } from '@/i18n';

import './Footer.css';

const SOCIAL_LINKS = [
  { label: 'GitHub', icon: FaGithub },
  { label: 'GitLab', icon: FaGitlab },
  { label: 'LinkedIn', icon: FaLinkedinIn },
  { label: 'Telegram', icon: FaTelegram },
  { label: 'WhatsApp', icon: FaWhatsapp },
];

interface FooterProps {
  t: Translate;
}

export function Footer({ t }: FooterProps) {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-brand">
          <div className="footer-title">UDS Manager</div>
          <p className="footer-subtitle">{t('footer.description')}</p>
          <div className="footer-icons">
            {SOCIAL_LINKS.map(({ label, icon: SocialIcon }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                title={label}
                className="footer-social-link"
              >
                <SocialIcon size={20} aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>

        <nav className="footer-navigation" aria-label={t('footer.navigation')}>
          {FOOTER_SECTIONS.map((section) => (
            <div className="footer-section" key={section.titleKey}>
              <h2 className="footer-section-title">{t(section.titleKey)}</h2>
              <ul className="footer-links">
                {section.linkKeys.map((linkKey) => (
                  <li key={linkKey}>
                    <a href="#">{t(linkKey)}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>
      <div className="footer-bottom">{t('footer.copyright')}</div>
    </footer>
  );
}
