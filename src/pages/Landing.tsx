import { Button, GridContainer } from "@trussworks/react-uswds";
import { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../App";
import { UserInfo } from "../App";
import { useTranslation } from "react-i18next";

type LandingProps = {
    userInfo: UserInfo | null;
};

const Landing = (props: LandingProps) => {
    const { userInfo } = props;
    const [globalInfo, _] = useContext(AppContext);
    const { t } = useTranslation();
    const navigate = useNavigate();

    useEffect(() => {
        if (!globalInfo.isLoggedIn) {
            navigate("/");
        }
    }, [globalInfo]);

    return (
        <>
            <main id="main-content">
                <GridContainer containerSize="mobile-lg">
                    {userInfo ? (
                        <h1>
                            {t("landing.header")} {userInfo.name}
                        </h1>
                    ) : (
                        <h1>{t("landing.header")}</h1>
                    )}
                    <h2>{t("landing.description")}</h2>
                    <Link to="/personalInformation">
                        <Button type="button">{t("landing.button")}</Button>
                    </Link>
                </GridContainer>
            </main>
        </>
    );
};

export default Landing;
