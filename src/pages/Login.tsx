import {
    Grid,
    GridContainer,
    MediaBlockBody,
    Header,
    Title,
    Button,
    LanguageSelector,
} from "@trussworks/react-uswds";
import { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext, backendUrl } from "../App";
import { useTranslation } from "react-i18next";

const Login = () => {
    const [globalInfo, _] = useContext(AppContext);
    const navigate = useNavigate();
    const { t } = useTranslation();
    const { i18n } = useTranslation();
    const nextLanguage = i18n.languages[(i18n.languages.indexOf(i18n.language) + 1)]
    const [language, setLanguage] = useState(nextLanguage);

    useEffect(() => {
        if (!globalInfo.isChanging) {
            if (globalInfo.isAdmin) {
                navigate("/admin");
            } else if (globalInfo.isLoggedIn) {
                navigate("/home");
            }
        }
    }, [globalInfo]);

    function handleLogin() {
        window.location.replace(backendUrl + "/signin");
    }

    return (
        <>
            <Header extended>
                <div className="usa-navbar">
                    <Title id="extended-logo">
                        <a href="/" title="Home" aria-label="Home">
                            {t("nav.title")}
                        </a>
                    </Title>
                    <LanguageSelector
                        displayLang={language}
                        langs={[
                            {
                                attr: "sp",
                                label: "Español",
                                label_local: "Spanish",
                                on_click: () => {
                                    i18n.changeLanguage("sp");
                                    setLanguage("en");
                                },
                            },
                            {
                                attr: "en",
                                label: "English",
                                on_click: () => {
                                    i18n.changeLanguage("en");
                                    setLanguage("sp");
                                },
                            },
                        ]}
                    />
                </div>
            </Header>
            <main id="main">
                <div className="bg-base-lightest">
                    <GridContainer className="usa-section">
                        <Grid
                            row={true}
                            className="margin-x-neg-205 margin-bottom-7 flex-justify-center"
                        >
                            <Grid
                                col={12}
                                mobileLg={{
                                    col: 10,
                                }}
                                tablet={{
                                    col: 8,
                                }}
                                desktop={{
                                    col: 6,
                                }}
                                className="padding-x-205 margin-bottom-7"
                            >
                                <div className="bg-white padding-y-3 padding-x-5 border border-base-lighter">
                                    <h1 className="margin-bottom-1">
                                        {t("login.signin")}
                                    </h1>

                                    <div className="usa-prose">
                                        <p className="margin-top-1">
                                            {t("login.signinDescription")}
                                        </p>
                                    </div>

                                    <p>
                                        <Button
                                            onClick={handleLogin}
                                            type="button"
                                            outline={true}
                                            className="width-full"
                                        >
                                            {t("login.signinGoogle")}
                                        </Button>
                                    </p>

                                    <p>
                                        <Button
                                            type="button"
                                            outline={true}
                                            className="width-full"
                                        >
                                            {t("login.signinMicrosoft")}
                                        </Button>
                                    </p>
                                    <div className="border-top border-base-lighter margin-top-6 padding-top-1">
                                        <p>
                                            <strong>
                                                {t("login.noAccount")}
                                            </strong>
                                        </p>
                                        <p>{t("login.noAccountDescription")}</p>
                                        <p>
                                            <Button
                                                type="button"
                                                className="width-full"
                                            >
                                                {t("login.createAccountBtn")}
                                            </Button>
                                        </p>
                                    </div>
                                </div>
                            </Grid>

                            <Grid
                                col={12}
                                mobileLg={{
                                    col: 10,
                                }}
                                tablet={{
                                    col: 8,
                                }}
                                desktop={{
                                    col: 6,
                                }}
                                className="padding-x-205"
                            >
                                <div className="border-top border-base-lighter padding-top-4 desktop:border-0 desktop:padding-top-0">
                                    <h2 className="display-none desktop:display-block">
                                        {t("login.appDescription")}
                                    </h2>

                                    <div className="usa-prose">
                                        <p>{t("login.appDescriptionTwo")}</p>
                                        <section className="usa-graphic-list">
                                            <div className="usa-graphic-list__row">
                                                <MediaBlockBody>
                                                    <p>
                                                        <strong>
                                                            {t(
                                                                "login.quickEstimation",
                                                            )}{" "}
                                                        </strong>
                                                        {t(
                                                            "login.quickEstimationDescription",
                                                        )}
                                                    </p>
                                                    <p>
                                                        <strong>
                                                            {t(
                                                                "login.accuracy",
                                                            )}{" "}
                                                        </strong>
                                                        {t(
                                                            "login.accuracyDescription",
                                                        )}
                                                    </p>
                                                    <p>
                                                        <strong>
                                                            {t("login.private")}{" "}
                                                        </strong>
                                                        {t(
                                                            "login.privateDescription",
                                                        )}
                                                    </p>
                                                </MediaBlockBody>
                                            </div>
                                        </section>
                                    </div>
                                </div>
                            </Grid>
                        </Grid>
                    </GridContainer>
                </div>
            </main>
        </>
    );
};

export default Login;
