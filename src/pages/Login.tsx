import {
    Grid,
    GridContainer,
    MediaBlockBody,
    Header,
    Title,
    Button,
} from "@trussworks/react-uswds";
import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext, backendUrl } from "../App";

const Login = () => {
    const [globalInfo, setGlobalInfo] = useContext(AppContext);
    const navigate = useNavigate();

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
                    Express Tax
                    </a>
                </Title>
                </div>
            </Header>
            <main id="main-content">
                <div className="bg-base-lightest">
                <GridContainer className="usa-section">
                    <Grid row={true} className="margin-x-neg-205 margin-bottom-7 flex-justify-center">
                    <Grid col={12} mobileLg={{
                    col: 10
                    }} tablet={{
                    col: 8
                    }} desktop={{
                    col: 6
                    }} className="padding-x-205 margin-bottom-7">
                        <h1 className="desktop:display-none font-sans-lg margin-bottom-4 tablet:margin-top-neg-3">
                        A tagline that explains the benefit of creating an account.
                        </h1>

                        <div className="bg-white padding-y-3 padding-x-5 border border-base-lighter">
                        <h1 className="margin-bottom-1">Sign in to your account</h1>

                        <div className="usa-prose">
                            <p className="margin-top-1">
                            You can access your account by signing in with one of the
                            options below.
                            </p>
                        </div>

                        <p>
                            <Button onClick={handleLogin} type="button" outline={true} className="width-full">Sign in with Google</Button>
                        </p>

                        <p>
                            <Button type="button" outline={true} className="width-full">
                            Sign in with Microsoft (coming soon)
                            </Button>
                        </p>
                        <div className="border-top border-base-lighter margin-top-6 padding-top-1">
                            <p>
                            <strong>{"Don't have an account?"}</strong>
                            </p>

                            <p>
                            {"If you don't have an account already, sign up here:"}
                            </p>

                            <p>
                            <Button type="button" className="width-full">
                                Create account (coming soon)
                            </Button>
                            </p>
                        </div>
                        </div>
                    </Grid>

                    <Grid col={12} mobileLg={{
                    col: 10
                    }} tablet={{
                    col: 8
                    }} desktop={{
                    col: 6
                    }} className="padding-x-205">
                        <div className="border-top border-base-lighter padding-top-4 desktop:border-0 desktop:padding-top-0">
                            <h2 className="display-none desktop:display-block">
                                Log in to Express Tax today to see your estimated tax return!
                            </h2>

                            <div className="usa-prose">
                                <p>
                                Welcome to Express Tax, where precision meets convenience. Log in now to access our powerful tax estimation platform, delivering lightning-fast calculations for your potential return or liability. 
                                </p>
                                <section className="usa-graphic-list">
                                <div className="usa-graphic-list__row">
                                    <MediaBlockBody>
                                        <p>
                                            <strong>Quick Estimation:  </strong>
                                            With Express Tax users can get an instant estimate of their tax return without having to wait for the tax season or consulting a professional.
                                        </p>
                                        <p>
                                            <strong>Accuracy: </strong>
                                            With our state-of-the-art algorithms, rest assured that your estimates are not just quick but incredibly accurate. 
                                        </p>
                                        <p>
                                            <strong>Secure and Private: </strong>
                                            Your privacy is paramount — our secure login ensures that your financial data remains strictly confidential.
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
