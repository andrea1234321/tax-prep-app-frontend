import { Button, Header, Title, NavDropDownButton, Menu, PrimaryNav} from "@trussworks/react-uswds";
import { UserInfo, backendUrl } from "../App";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useState } from "react";

type NavBarProps = {
    userInfo: UserInfo | null;
};
const lngs: Record<string, { nativeName: string }> = {
    en: { nativeName: 'English' },
    sp: { nativeName: 'Español' }
  };
  
const NavBar = (props: NavBarProps) => {
    const {i18n} = useTranslation();
    const {t} = useTranslation();
    const { userInfo } = props;
    const [expanded, setExpanded] = useState(false);
    const [isOpen, setIsOpen] = useState(false);


    const profileMenu =
        [<Button id="navLangButton" style={{ fontWeight: i18n.resolvedLanguage === "en" ? 'bold' : 'normal' }} type="submit" onClick={() => i18n.changeLanguage("en")}>
        {lngs.en.nativeName}
        </Button>, 
        <Button id="navLangButton" style={{ fontWeight: i18n.resolvedLanguage === "sp" ? 'bold' : 'normal' }} type="submit" onClick={() => i18n.changeLanguage("sp")}>
        {lngs.sp.nativeName}
        </Button>,
        <button className="navLogoutButton" onClick={handleLogout}>LogOut</button>
        ]

    const profileItemsMenu = [
        <>
            <NavDropDownButton 
                menuId="profileDropDown" 
                onToggle={() => setIsOpen(!isOpen)} 
                isOpen= {isOpen}
                label={userInfo ? userInfo.name : "Settings"}
                isCurrent={true} 
            />
            <Menu key="english" items={profileMenu} isOpen={isOpen} id="english" />
            <Menu key="spanish" items={profileMenu} isOpen={isOpen} id="spanish" />
            <Menu key="logout" items={profileMenu} isOpen={isOpen} id="logout" />
        </>
        ];

    const handleExpand =() => {
        setExpanded(!expanded)
    }
    function handleLogout() {
        window.location.replace(backendUrl + "/logout");
    }
    return (
        <>
            <Header basic={true}>
                <div className="grid-row flex-wrap flex-justify flex-align-end">
                    <Title className="text-left"><Link to="/home">{t('nav.title')}</Link></Title>
                    <div className="grid-row">
                        <PrimaryNav items={profileItemsMenu} mobileExpanded={expanded}></PrimaryNav>
                        {userInfo && (
                            <img
                            src={userInfo.picture}
                            alt="profile-photo"
                            className="profile-picture"
                            onClick={handleExpand}
                            />
                        )}
                    </div>
                </div>
            </Header>
        </>
    );
};

export default NavBar;
