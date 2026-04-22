import { FC } from "react";
import { useTranslations } from 'next-intl';
import { Logo } from "@/components/Logo";
import { quickLinks, socialLinks } from "@/static/footer";
import { getRandomLinkForRedirection } from "@/utils/getRandomLinkForRedirection";
import { getUniqueId } from "@/utils/getUniqueId";
import Button from "@/components/Button";
import { BuyMeCoffee } from "@/components/BuyMeCoffee";

const Footer: FC = () => {
  const t = useTranslations('footer');
  const translateMenuItems = useTranslations('menuItems');

  return (
    <footer className="z-[90] bg-primary text-white py-12 w-full mx-auto overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-start md:justify-between gap-8 w-full">
            <div className="space-y-4 max-w-[30rem] lg:max-w-[40rem] w-full">
              <div className="flex items-center gap-2">
                <Logo imageClassName="w-[12rem]" />
              </div>
              <p className="text-gray-300 max-w-md">
                {t.rich('description', {
                  a: (chunks) => <a href={getRandomLinkForRedirection()} className="text-gray-300 hover:text-white transition-colors">{chunks}</a>,
                })}
              </p>
            </div>

            <div className="flex flex-col gap-4 w-full max-w-[25rem] md:ml-auto">
              <div className="md:mx-auto">
                <h3 className="text-xl font-semibold mb-4">
                  {t('quickLinks.title')}
                </h3>
                <nav>
                  <ul className="space-y-2">
                    {quickLinks.map((link, index) => (
                      <li
                        key={`${
                          link.id
                        }-${index}-footer-quick-link-${getUniqueId()}`}
                      >
                        <a
                          href={getRandomLinkForRedirection()}
                          className="text-gray-300 hover:text-white transition-colors"
                          rel="noopener noreferrer"
                          target="_blank"
                        >
                          {translateMenuItems(link.translationKey)}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </div>

            <div className="flex flex-col gap-4 md:max-w-[25rem] md:ml-auto">
              <h3 className="text-xl font-semibold mb-4">{t('newsletter.title')}</h3>
              <p className="text-gray-300 mb-4">
                {t('newsletter.description')}
              </p>

              <BuyMeCoffee username={process.env.BUY_ME_A_COFFEE_USERNAME || ''} />

              <form className="flex gap-2 flex-wrap md:flex-nowrap truncate">
                <input
                  type="email"
                  placeholder={t('newsletter.emailPlaceholder')}
                  className="bg-transparent border border-gray-600 rounded px-4 py-2 w-full md:w-auto"
                  aria-label={t('newsletter.emailAriaLabel')}
                />
                <Button
                  type="submit"
                  label={t('newsletter.subscribeButton')}
                  className="px-6 py-2 border border-white !text-black hover:!text-white bg-white rounded-lg hover:bg-white/10 transition-all duration-300 text-center font-semibold w-full md:w-auto"
                />
              </form>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center gap-4 max-w-6xl mx-auto px-4">
          <div className="flex gap-4">
            {socialLinks.map((social) => (
              <a
                key={`${social.id}-${getUniqueId()}`}
                href={getRandomLinkForRedirection()}
                className="text-gray-300 hover:text-white transition-colors"
                aria-label={`${t(social.translationKey)} (${social.icon})`}
                rel="noopener noreferrer"
              >
                {social.icon}
              </a>
            ))}
          </div>
          <p className="text-gray-300 text-center md:text-end w-full">
            {t('copyright', { year: new Date().getFullYear() })}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
