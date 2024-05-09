import { Footer, Address } from "@trussworks/react-uswds";
import { useTranslation } from "react-i18next";

const FooterComp = () => {
  const {t} = useTranslation();
    return ( 
        <>
        <div className="footer-container">
            <Footer 
            className="footer"
              size="medium"
              primary={''} 
              secondary={
                <div className="grid-row grid-gap">
                  <h1>{t('nav.title')}</h1>
                  <div className="usa-footer__contact-links mobile-lg:grid-col-6">
                    <h3 className="usa-footer__contact-heading">{t('footer.contact')}</h3>
                    <Address size="medium" items={[
                      <a key="telephone" href="tel:1-800-555-5555">(800)-XPRSTAX</a>, 
                      <a key="email" href="mailto:info@expresstax.gov">info@expresstax.gov</a>
                      ]} 
                    />
                  </div>
                </div>} 
            />
          </div>
        </>
    );
}
 
export default FooterComp;
