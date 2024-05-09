import { useContext, useEffect, useState } from "react";
import ProgressBar from "../components/ProgressBar";
import {
    Card,
    CardHeader,
    CardBody,
    Button,
    CardGroup,
    CardFooter,
    Alert,
    Fieldset,
    ValidationItem,
    ValidationChecklist,
    ButtonGroup,
    Link,
} from "@trussworks/react-uswds";
import { AppContext, backendUrl } from "../App";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

type Profile = {
    id: null;
    firstName: string;
    middleInitial: string | null;
    lastName: string;
    dateOfBirth: number;
    address: string;
    city: string;
    state: string;
    aptNumber: string | null;
    zipCode: null;
    ssn: number;
    oauthId: null;
};

type Finances = {
    id: null;
    filingStatus: string;
    spouseFirstName: string | null;
    spouseMiddleInitial: string | null;
    spouseLastName: string | null;
    spouseSsn: number | null;
    spouseDateOfBirth: number | null;
    w2Income: number;
    otherIncome: number;
    taxWithheldW2: number;
    taxWithheld1099: number;
    taxWithheldOther: number;
    prevTaxesPaid: number;
    oauthId: null;
};

const Review = () => {
    const [globalInfo, setGlobalInfo] = useContext(AppContext);
    const navigate = useNavigate();
    const { t } = useTranslation();

    const [profile, setProfile] = useState<Profile | null>(null);
    const [finances, setFinances] = useState<Finances | null>(null);

    useEffect(() => {
        if (!globalInfo.isLoggedIn || globalInfo.stepNumber < 3) {
            navigate("/");
        }
    }, [globalInfo]);

    useEffect(() => {
        fetch(backendUrl + "/profile", {
            credentials: "include",
            method: "GET",
        })
            .then((data) => data.json())
            .then((dataJson) => {
                setProfile(dataJson);
                fetch(backendUrl + "/finances", {
                    credentials: "include",
                    method: "GET",
                })
                    .then((data) => data.json())
                    .then((dataJson) => {
                        setFinances(dataJson);
                    })
                    .catch((err) => console.error(err));
            })
            .catch((err) => console.error(err));
    }, []);

    const handleSubmit = (): void => {
        if (globalInfo.stepNumber < 4) {
            setGlobalInfo((globalInfo) => ({ ...globalInfo, stepNumber: 4 }));
        }
        navigate("/results");
    };
    const handleBack = (): void => {
        setGlobalInfo((globalInfo) => ({ ...globalInfo, stepNumber: 2 }));
        navigate("/financialInformation");
    };

    return (
        <>
            <main id="main-content">
                <ProgressBar stepNumber={3} />
                <CardGroup>
                    <Card headerFirst gridLayout={{ tablet: { col: 6 } }}>
                        <CardHeader>
                            <h1 className="usa-card__heading">
                                {t("review.title")}
                            </h1>
                        </CardHeader>
                        <CardBody>
                            <Fieldset>
                                <Alert type="info" headingLevel="h4">
                                    <ValidationChecklist id="review">
                                        <ValidationItem
                                            id="review"
                                            isValid={true}
                                        >
                                            {t("review.description")}
                                        </ValidationItem>
                                    </ValidationChecklist>
                                </Alert>
                            </Fieldset>
                        </CardBody>
                        <CardHeader>
                            <h1 className="usa-card__heading">
                                {t("personal.title")}:
                            </h1>
                        </CardHeader>
                        <CardBody>
                            <div className="grid-row flex-wrap flex-justify">
                                <p>{t("review.full-name")}: </p>
                                <p>
                                    {profile?.firstName}{" "}
                                    {profile?.middleInitial} {profile?.lastName}
                                </p>
                            </div>
                            <div className="grid-row flex-wrap flex-justify ">
                                <p>{t("personal.dob")}: </p>
                                <p>
                                    {profile?.dateOfBirth
                                        .toString()
                                        .slice(4, 6)}
                                    /
                                    {profile?.dateOfBirth
                                        .toString()
                                        .slice(6, 8)}
                                    /
                                    {profile?.dateOfBirth
                                        .toString()
                                        .slice(0, 4)}
                                </p>
                            </div>
                            <div className="grid-row flex-wrap flex-justify">
                                <p>{t("personal.ssn")}: </p>
                                <p>
                                    {profile?.ssn.toString().slice(0, 3)}-
                                    {profile?.ssn.toString().slice(3, 5)}-
                                    {profile?.ssn.toString().slice(5, 9)}
                                </p>
                            </div>
                            <div className="grid-row flex-wrap flex-justify">
                                <p>{t("review.address")}: </p>
                                <p>
                                    {profile?.address} {profile?.aptNumber}{" "}
                                    {profile?.city}, {profile?.state}{" "}
                                    {profile?.zipCode}
                                </p>
                            </div>
                        </CardBody>
                        {finances?.spouseFirstName && (
                            <>
                                <CardHeader>
                                    <h1 className="usa-card__heading">
                                        {t("spouse.info")}
                                    </h1>
                                </CardHeader>
                                <CardBody>
                                    <div className="grid-row flex-wrap flex-justify">
                                        <p>{t("review.spouse-name")}: </p>
                                        <p>
                                            {finances?.spouseFirstName}{" "}
                                            {finances?.spouseMiddleInitial}{" "}
                                            {finances?.spouseLastName}
                                        </p>
                                    </div>
                                    <div className="grid-row flex-wrap flex-justify">
                                        <p>{t("personal.dob")}: </p>
                                        {finances.spouseDateOfBirth && (
                                            <p>
                                                {finances?.spouseDateOfBirth
                                                    .toString()
                                                    .slice(4, 6)}
                                                /
                                                {finances?.spouseDateOfBirth
                                                    .toString()
                                                    .slice(6, 8)}
                                                /
                                                {finances?.spouseDateOfBirth
                                                    .toString()
                                                    .slice(0, 4)}
                                            </p>
                                        )}
                                    </div>
                                    <div className="grid-row flex-wrap flex-justify">
                                        <p>{t("personal.ssn")}: </p>
                                        {finances?.spouseSsn && (
                                            <p>
                                                {finances?.spouseSsn
                                                    .toString()
                                                    .slice(0, 3)}
                                                -
                                                {finances?.spouseSsn
                                                    .toString()
                                                    .slice(3, 5)}
                                                -
                                                {finances?.spouseSsn
                                                    .toString()
                                                    .slice(5, 9)}
                                            </p>
                                        )}
                                    </div>
                                </CardBody>
                            </>
                        )}
                        <CardHeader>
                            <h1 className="usa-card__heading">
                                {t("finance.title")}:
                            </h1>
                        </CardHeader>
                        <CardBody>
                            <div className="grid-row flex-wrap flex-justify">
                                <p>{t("finance.status")}: </p>
                                <p>{finances?.filingStatus}</p>
                            </div>
                            <div className="grid-row flex-wrap flex-justify">
                                <p>{t("finance.w2-total")}: </p>
                                <p>${(finances?.w2Income as number) / 100}</p>
                            </div>
                            <div className="grid-row flex-wrap flex-justify">
                                <p>{t("finance.other-income")}: </p>
                                <p>
                                    ${(finances?.otherIncome as number) / 100}
                                </p>
                            </div>
                            <div className="grid-row flex-wrap flex-justify">
                                <p>{t("finance.w2-withheld")}: </p>
                                <p>
                                    ${(finances?.taxWithheldW2 as number) / 100}
                                </p>
                            </div>
                            <div className="grid-row flex-wrap flex-justify">
                                <p>{t("finance.1099-withheld")}: </p>
                                <p>
                                    $
                                    {(finances?.taxWithheld1099 as number) /
                                        100}
                                </p>
                            </div>
                            <div className="grid-row flex-wrap flex-justify">
                                <p>{t("finance.other-withheld")}: </p>
                                <p>
                                    $
                                    {(finances?.taxWithheldOther as number) /
                                        100}
                                </p>
                            </div>
                            <div className="grid-row flex-wrap flex-justify">
                                <p>{t("finance.paid-taxes")}: </p>
                                <p>
                                    ${(finances?.prevTaxesPaid as number) / 100}
                                </p>
                            </div>
                        </CardBody>
                        <CardFooter>
                            <ButtonGroup>
                                <Link
                                    href="#"
                                    className="usa-button usa-button--outline"
                                    onClick={handleBack}
                                >
                                    {t("results.back")}
                                </Link>
                                <Button onClick={handleSubmit} type="submit">
                                    {t("review.button")}
                                </Button>
                            </ButtonGroup>
                        </CardFooter>
                    </Card>
                </CardGroup>
            </main>
        </>
    );
};

export default Review;
