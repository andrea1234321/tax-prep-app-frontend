import { useContext, useEffect, useState } from "react";
import ProgressBar from "../components/ProgressBar";
import { AppContext, backendUrl } from "../App";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { CardGroup, Card, CardHeader, CardBody, Button, ButtonGroup, Link, CardFooter } from "@trussworks/react-uswds";

const Results = () => {
    const [globalInfo, setGlobalInfo] = useContext(AppContext);
    const navigate = useNavigate();
    const {t} = useTranslation();

    const [tax, setTax] = useState(0);

    useEffect(() => {
        if (!globalInfo.isLoggedIn || globalInfo.stepNumber < 4) {
            navigate("/");
        }
    }, [globalInfo]);

    useEffect(() => {
        fetch(backendUrl + "/calculate_taxes", {
            credentials: "include",
            method: "GET",
        })
            .then(data => data.json())
            .then(dataJson => setTax(Number(dataJson) / 100))
            .catch(err => console.error(err));
    }, []);

    const handleBack = (): void => {
        setGlobalInfo(globalInfo => ({...globalInfo, stepNumber: 3}));
        navigate("/review")
    }

    return (
        <>
            <main id="main-content " >
                <ProgressBar stepNumber={4} />
                <CardGroup>
                    <Card>
                        <CardBody>
                            <p>{t('results.description')}</p>
                        </CardBody>
                        <CardHeader>
                            {tax > 0 ? <h1>{t('results.taxOwed', {tax})}</h1> : <h1>{t('results.taxReturn', {tax})}</h1>}
                        </CardHeader>
                        <CardFooter>
                            <ButtonGroup>
                                <Link href="#" className="usa-button usa-button--outline" onClick={handleBack}>
                                {t('results.back')}
                                </Link>
                                <Button type="submit" onClick={() => navigate('/home')}>{t('results.done')}</Button>
                            </ButtonGroup>
                        </CardFooter>
                    </Card>
                </CardGroup>
            </main>
        </>
    );
};

export default Results;
