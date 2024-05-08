import { Footer, Logo, Address } from "@trussworks/react-uswds";
const FooterComp = () => {
    return ( 
        <>
        <div className="footer-container">


            <Footer 
            className="footer"
              size="medium"
              primary={''} 
              secondary={
                <div className="grid-row grid-gap">
                  <h1>Express Tax</h1>
                  <div className="usa-footer__contact-links mobile-lg:grid-col-6">
                    <h3 className="usa-footer__contact-heading">Agency Contact Center</h3>
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
