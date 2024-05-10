import { useContext, useState, useEffect } from "react";
import ProgressBar from "../components/ProgressBar";
import {
    Fieldset,
    RequiredMarker,
    Label,
    TextInput,
    Form,
    Button,
    Radio,
    Checkbox,
    Grid,
    InputGroup,
    InputPrefix,
    ButtonGroup,
    Link,
    IconListItem,
    IconList,
    Icon,
    IconListIcon,
} from "@trussworks/react-uswds";

import SpouseInfromation from "../components/SpouseInformation";
import { AppContext, backendUrl } from "../App";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const FinanceInfo = () => {
    const { t } = useTranslation();
    const [globalInfo, setGlobalInfo] = useContext(AppContext);
    const navigate = useNavigate();
    const [otherIncome, setOtherIncome] = useState(false);
    const [taxWithheld1099, setTaxWithheld1099] = useState(false);
    const [taxWithheldOther, setTaxWithheldOther] = useState(false);
    const [prevTaxesPaid, setPrevTaxesPaid] = useState(false);
    const [jointFiling, setJointFiling] = useState(false);
    const [update, setUpdate] = useState(false);
    const [financeInfo, setFinanceInfo] = useState({
        filingStatus: "",
        spouseFirstName: "",
        spouseMiddleInitial: "",
        spouseLastName: "",
        spouseDateOfBirth: "",
        spouseSsn: "",
        w2Income: "",
        otherIncome: "",
        taxWithheldW2: "",
        taxWithheld1099: "",
        taxWithheldOther: "",
        prevTaxesPaid: "",
    });

    useEffect(() => {
        if (!globalInfo.isLoggedIn || globalInfo.stepNumber < 2) {
            navigate("/");
        }
    }, [globalInfo]);

    const handleChange = (
        evt:
            | React.ChangeEvent<HTMLInputElement>
            | React.ChangeEvent<HTMLSelectElement>,
    ) => {
        evt.preventDefault();
        const { name, value } = evt.target;
        setFinanceInfo({ ...financeInfo, [name]: value });
    };

    const handleChangeRadioBtn = (evt: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = evt.target;
        if (value === "Married Filing Jointly") {
            setJointFiling(true);
            setFinanceInfo({ ...financeInfo, [name]: value });
        } else {
            setJointFiling(false);
            setFinanceInfo({
                ...financeInfo,
                [name]: value,
                spouseFirstName: "",
                spouseMiddleInitial: "",
                spouseLastName: "",
                spouseDateOfBirth: "",
                spouseSsn: "",
            });
        }
    };

    const handleOtherIncome = () => {
        setOtherIncome(!otherIncome);
        setFinanceInfo({ ...financeInfo, otherIncome: "0" });
    };
    const handleTaxWithheld1099 = () => {
        setTaxWithheld1099(!taxWithheld1099);
        setFinanceInfo({ ...financeInfo, taxWithheld1099: "0" });
    };
    const handleTaxWithheldOther = () => {
        setTaxWithheldOther(!taxWithheldOther);
        setFinanceInfo({ ...financeInfo, taxWithheldOther: "0" });
    };
    const handlePrevTaxesPaid = () => {
        setPrevTaxesPaid(!prevTaxesPaid);
        setFinanceInfo({ ...financeInfo, prevTaxesPaid: "0" });
    };

    const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
        evt.preventDefault();
        let formattedSpouseSsn;
        let formattedSpouseDateOfBirth;
        if (financeInfo.filingStatus === "Married Filing Jointly") {
            (formattedSpouseSsn = Number(
                financeInfo.spouseSsn.replace("-", "").replace("-", ""),
            )),
                (formattedSpouseDateOfBirth = Number(
                    financeInfo.spouseDateOfBirth
                        .replace("-", "")
                        .replace("-", ""),
                ));
        } else {
            formattedSpouseSsn = Number(financeInfo.spouseSsn);
            formattedSpouseDateOfBirth = Number(financeInfo.spouseDateOfBirth);
        }
        const body = JSON.stringify({
            ...financeInfo,
            spouseSsn: formattedSpouseSsn,
            spouseDateOfBirth: formattedSpouseDateOfBirth,
            w2Income: Number(financeInfo.w2Income) * 100,
            otherIncome: Number(financeInfo.otherIncome) * 100,
            taxWithheldW2: Number(financeInfo.taxWithheldW2) * 100,
            taxWithheld1099: Number(financeInfo.taxWithheld1099) * 100,
            taxWithheldOther: Number(financeInfo.taxWithheldOther) * 100,
            prevTaxesPaid: Number(financeInfo.prevTaxesPaid) * 100,
        });
        fetch(backendUrl + "/finances", {
            credentials: "include",
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: body,
        })
            .then((data: Response) => {
                if (data.ok) {
                    console.log("Post successful!");
                    if (globalInfo.stepNumber < 3) {
                        setGlobalInfo((globalInfo) => ({
                            ...globalInfo,
                            stepNumber: 3,
                        }));
                    }
                    navigate("/review");
                } else {
                    console.log("Post failed.");
                }
            })
            .catch((error: Error) => console.error(error));
    };
    const handleUpdate = (evt: React.FormEvent<HTMLFormElement>) => {
        evt.preventDefault();
        let formattedSpouseSsn;
        let formattedSpouseDateOfBirth;
        if (financeInfo.filingStatus === "Married Filing Jointly") {
            (formattedSpouseSsn = Number(
                financeInfo.spouseSsn.replace("-", "").replace("-", ""),
            )),
                (formattedSpouseDateOfBirth = Number(
                    financeInfo.spouseDateOfBirth
                        .replace("-", "")
                        .replace("-", ""),
                ));
        } else {
            formattedSpouseSsn = Number(financeInfo.spouseSsn);
            formattedSpouseDateOfBirth = Number(financeInfo.spouseDateOfBirth);
        }
        const body = JSON.stringify({
            ...financeInfo,
            spouseSsn: formattedSpouseSsn,
            spouseDateOfBirth: formattedSpouseDateOfBirth,
            w2Income: Number(financeInfo.w2Income) * 100,
            otherIncome: Number(financeInfo.otherIncome) * 100,
            taxWithheldW2: Number(financeInfo.taxWithheldW2) * 100,
            taxWithheld1099: Number(financeInfo.taxWithheld1099) * 100,
            taxWithheldOther: Number(financeInfo.taxWithheldOther) * 100,
            prevTaxesPaid: Number(financeInfo.prevTaxesPaid) * 100,
        });
        fetch(backendUrl + "/finances", {
            credentials: "include",
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: body,
        })
            .then((data: Response) => {
                if (data.ok) {
                    console.log("Update successful!");
                    if (globalInfo.stepNumber < 3) {
                        setGlobalInfo((globalInfo) => ({
                            ...globalInfo,
                            stepNumber: 3,
                        }));
                    }
                    navigate("/review");
                } else {
                    console.log("Update failed.");
                }
            })
            .catch((error: Error) => console.error(error));
    };
    const handleBack = () => {
        setGlobalInfo((globalInfo) => ({ ...globalInfo, stepNumber: 1 }));
        navigate("/personalInformation");
    };

    useEffect(() => {
        fetch(backendUrl + "/finances", {
            credentials: "include",
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((data) => {
                if (data.ok) {
                    return data.json();
                }
            })
            .then((returnedData) => {
                let newSpouseSsn;
                let formattedDOB;
                if (returnedData.spouseDateOfBirth) {
                    const year = returnedData.spouseDateOfBirth
                        .toString()
                        .slice(0, 4);
                    const month = returnedData.spouseDateOfBirth
                        .toString()
                        .slice(4, 6);
                    const day = returnedData.spouseDateOfBirth
                        .toString()
                        .slice(6, 8);
                    formattedDOB = `${year}-${month}-${day}`;
                }
                if (returnedData.filingStatus === "Married Filing Jointly") {
                    setJointFiling(true);
                }
                if (returnedData.otherIncome === 0) {
                    setOtherIncome(!otherIncome);
                }
                if (returnedData.taxWithheld1099 === 0) {
                    setTaxWithheld1099(!taxWithheld1099);
                }
                if (returnedData.taxWithheldOther === 0) {
                    setTaxWithheldOther(!taxWithheldOther);
                }
                if (returnedData.prevTaxesPaid === 0) {
                    setPrevTaxesPaid(!prevTaxesPaid);
                }
                if (returnedData.spouseSsn === 0) {
                    newSpouseSsn = "";
                }
                if (returnedData.spouseDateOfBirth === 0) {
                    formattedDOB = "";
                }
                if (returnedData.spouseSsn) {
                    newSpouseSsn = returnedData.spouseSsn.toString();
                }
                console.log(returnedData);
                setFinanceInfo({
                    ...returnedData,
                    spouseDateOfBirth: formattedDOB,
                    spouseSsn: newSpouseSsn,
                    w2Income: returnedData.w2Income / 100,
                    otherIncome: returnedData.otherIncome / 100,
                    taxWithheldW2: returnedData.taxWithheldW2 / 100,
                    taxWithheld1099: returnedData.taxWithheld1099 / 100,
                    taxWithheldOther: returnedData.taxWithheldOther / 100,
                    prevTaxesPaid: returnedData.prevTaxesPaid / 100,
                });
                setUpdate(true);
            })
            .catch(() => console.log("No existing financial information"));
    }, []);

    return (
        <>
            <main id="main-content">
                <ProgressBar stepNumber={2} />
                <Form onSubmit={update ? handleUpdate : handleSubmit} large>
                    <Fieldset legend={t("finance.title")} legendStyle="large">
                        <p>
                            {t("finance.description")} (
                            <RequiredMarker />
                            ).
                        </p>
                        <Label
                            htmlFor="filingStatus"
                            requiredMarker
                            aria-required
                        >
                            {t("finance.status")}
                        </Label>
                        <Grid row>
                            <Grid col={3} offset={1}>
                                <Radio
                                    id="single"
                                    name="filingStatus"
                                    label={t("finance.single")}
                                    value="single"
                                    required
                                    checked={
                                        financeInfo.filingStatus === "single"
                                    }
                                    onChange={handleChangeRadioBtn}
                                />
                            </Grid>
                            <Grid col={4}>
                                <Radio
                                    id="married-jointly"
                                    name="filingStatus"
                                    label={t("finance.married-joint")}
                                    value="Married Filing Jointly"
                                    checked={
                                        financeInfo.filingStatus ===
                                        "Married Filing Jointly"
                                    }
                                    onChange={handleChangeRadioBtn}
                                />
                            </Grid>
                            <Grid col={4}>
                                <Radio
                                    id="married-separately"
                                    name="filingStatus"
                                    label={t("finance.married-separate")}
                                    value="Married Filing Separately"
                                    checked={
                                        financeInfo.filingStatus ===
                                        "Married Filing Separately"
                                    }
                                    onChange={handleChangeRadioBtn}
                                />
                            </Grid>
                        </Grid>
                        {jointFiling && (
                            <SpouseInfromation
                                handleChange={handleChange}
                                financeInfo={financeInfo}
                            />
                        )}
                        <Label htmlFor="w2Income" requiredMarker>
                            {t("finance.w2-total")}
                        </Label>
                        <InputGroup>
                            <InputPrefix>$</InputPrefix>
                            <TextInput
                                id="w2Income"
                                name="w2Income"
                                type="number"
                                min={0}
                                required
                                value={financeInfo.w2Income}
                                onChange={handleChange}
                            />
                        </InputGroup>
                        <Label htmlFor="otherIncome">
                            {t("finance.other-income")}
                        </Label>
                        <Grid row>
                            <Grid col={6}>
                                <InputGroup>
                                    <InputPrefix>$</InputPrefix>
                                    <TextInput
                                        id="otherIncome"
                                        name="otherIncome"
                                        type="number"
                                        min={0}
                                        disabled={otherIncome}
                                        value={financeInfo.otherIncome}
                                        onChange={handleChange}
                                    />
                                </InputGroup>
                            </Grid>
                            <Grid col={4} offset={2}>
                                <Checkbox
                                    id="na otherIncome"
                                    name="otherIncome"
                                    label={t("finance.na")}
                                    checked={otherIncome}
                                    onChange={handleOtherIncome}
                                />
                            </Grid>
                        </Grid>
                        <Label htmlFor="taxWithheldW2" requiredMarker>
                            {t("finance.w2-withheld")}
                        </Label>
                        <InputGroup>
                            <InputPrefix>$</InputPrefix>
                            <TextInput
                                id="taxWithheldW2"
                                name="taxWithheldW2"
                                type="number"
                                min={0}
                                required
                                value={financeInfo.taxWithheldW2}
                                onChange={handleChange}
                            />
                        </InputGroup>
                        <Label htmlFor="taxWithheld1099">
                            {t("finance.1099-withheld")}
                        </Label>
                        <Grid row>
                            <Grid col={6}>
                                <InputGroup>
                                    <InputPrefix>$</InputPrefix>
                                    <TextInput
                                        id="taxWithheld1099"
                                        name="taxWithheld1099"
                                        type="number"
                                        min={0}
                                        disabled={taxWithheld1099}
                                        value={financeInfo.taxWithheld1099}
                                        onChange={handleChange}
                                    />
                                </InputGroup>
                            </Grid>
                            <Grid col={4} offset={2}>
                                <Checkbox
                                    id="na taxWithheld1099"
                                    name="taxWithheld1099"
                                    label={t("finance.na")}
                                    checked={taxWithheld1099}
                                    onChange={handleTaxWithheld1099}
                                />
                            </Grid>
                        </Grid>
                        <Label htmlFor="taxWithheldOther">
                            {t("finance.other-withheld")}
                        </Label>
                        <Grid row>
                            <Grid col={6}>
                                <InputGroup>
                                    <InputPrefix>$</InputPrefix>
                                    <TextInput
                                        id="taxWithheldOther"
                                        name="taxWithheldOther"
                                        type="number"
                                        min={0}
                                        disabled={taxWithheldOther}
                                        value={financeInfo.taxWithheldOther}
                                        onChange={handleChange}
                                    />
                                </InputGroup>
                            </Grid>
                            <Grid col={4} offset={2}>
                                <Checkbox
                                    id="na taxWithheldOther"
                                    name="taxWithheldOther"
                                    label={t("finance.na")}
                                    checked={taxWithheldOther}
                                    onChange={handleTaxWithheldOther}
                                />
                            </Grid>
                        </Grid>

                        <Label htmlFor="prevTaxesPaid">
                            {t("finance.paid-taxes")}{" "}
                            {Number(new Date().getFullYear()) - 2}
                        </Label>
                        <Grid row>
                            <Grid col={6}>
                                <InputGroup>
                                    <InputPrefix>$</InputPrefix>
                                    <TextInput
                                        id="prevTaxesPaid"
                                        name="prevTaxesPaid"
                                        type="number"
                                        min={0}
                                        disabled={prevTaxesPaid}
                                        value={financeInfo.prevTaxesPaid}
                                        onChange={handleChange}
                                    />
                                </InputGroup>
                            </Grid>
                            <Grid col={4} offset={2}>
                                <Checkbox
                                    id="na prevTaxesPaid"
                                    name="prevTaxesPaid"
                                    label={t("finance.na")}
                                    checked={prevTaxesPaid}
                                    onChange={handlePrevTaxesPaid}
                                />
                            </Grid>
                        </Grid>
                        <ButtonGroup>
                            <Link
                                href="#"
                                className="usa-button usa-button--outline"
                                onClick={handleBack}
                            >
                                <IconList>
                                    <IconListItem>
                                        <IconListIcon>
                                            <Icon.NavigateFarBefore />
                                        </IconListIcon>
                                    </IconListItem>
                                </IconList>
                                {t("results.back")}
                            </Link>
                            <Button type="submit">
                                {t("finance.button")}
                                <IconList>
                                    <IconListItem>
                                        <IconListIcon>
                                            <Icon.NavigateFarNext />
                                        </IconListIcon>
                                    </IconListItem>
                                </IconList>
                            </Button>
                        </ButtonGroup>
                    </Fieldset>
                </Form>
            </main>
        </>
    );
};

export default FinanceInfo;
