import { Button, Header, Title } from "@trussworks/react-uswds";
import { UserInfo } from "../App";
import { useTranslation, Trans } from "react-i18next";
type NavBarProps = {
    userInfo: UserInfo | null;
};
const lngs: Record<string, { nativeName: string }> = {
    en: { nativeName: 'English' },
    sp: { nativeName: 'Spanish' }
  };
  
const NavBar = (props: NavBarProps) => {
    const {i18n} = useTranslation();
    const { userInfo } = props;
    return (
        <>
            <Header basic={true}>
                <div className="usa-navbar">

                <Title className="text-left">
                    {/* <Link to="/home">Tax Return</Link> */}
                    Tax Return</Title>
                <div>
                {userInfo && (
                    <img
                        src={userInfo.picture}
                        alt="profile-photo"
                    />
                )}

                </div>
                  <div>
                    {Object.keys(lngs).map((lng) => (
                        <Button key={lng} style={{ fontWeight: i18n.resolvedLanguage === lng ? 'bold' : 'normal' }} type="submit" onClick={() => i18n.changeLanguage(lng)}>
                        {lngs[lng].nativeName}
                        </Button>
                    ))}
                    </div>
                </div>
            </Header>
        </>
    );
};

export default NavBar;
