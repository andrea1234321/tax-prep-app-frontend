import { useContext, useState } from "react";
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
} from "@trussworks/react-uswds";

import SpouseInfromation from "../components/SpouseInformation";
import { AppContext } from "../App";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

type FinanceInfoType = {
    "filing-status": string;
    "tax-year": string;
    "spouse-first-name": string | undefined;
    "spouse-middle-initial": string | undefined;
    "spouse-last-name": string | undefined;
    "spouse-date-of-birth": string | undefined;
    "input-type-ssn": string | undefined;
    "w2-income": string;
    "other-income": string;
    "w2-tax-withheld": string;
    "tax-withheld-1099": string;
    "other-tax-withheld": string;
    "paid-taxes-withheld": string;
};

const FinanceInfo = () => {
    const backendUrl = "http://localhost:8080";

    const [globalInfo, setGlobalInfo] = useContext(AppContext);
    const [otherIncome, setOtherIncome] = useState(false);
    const [businessWithheld, setBusinessWithheld] = useState(false);
    const [otherWithheld, setOtherWithheld] = useState(false);
    const [paidWithheld, setPaidWithheld] = useState(false);
    const {t} = useTranslation();

    const [jointFiling, setJointFiling] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
        evt.preventDefault();
        const form = evt.target;
        const formData = new FormData(form as HTMLFormElement);
        const formJson = Object.fromEntries(formData.entries()) as FinanceInfoType;

        const body = JSON.stringify({
            filingStatus: formJson["filing-status"],
            taxYear: formJson["tax-year"],
            spouseFirstName: formJson["spouse-first-name"],
            spouseMiddleInitial: formJson["spouse-middle-initial"],
            spouseLastName: formJson["spouse-last-name"],
            spouseSsn: Number(formJson["input-type-ssn"]?.replace("-", "").replace("-", "")),
            spouseDateOfBirth:  Number(formJson["spouse-date-of-birth"]?.replace('-', '').replace('-', '')),
            w2Income: Number(formJson["w2-income"]) * 100,
            otherIncome: Number(formJson["other-income"]) * 100,
            taxWithheldW2: Number(formJson["w2-tax-withheld"]) * 100,
            taxWithheld1099: Number(formJson["tax-withheld-1099"]) * 100,
            taxWithheldOther: Number(formJson["other-tax-withheld"]) * 100,
            prevTaxesPaid: Number(formJson["paid-taxes-withheld"]) * 100,
        });

        console.log(body);
        
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
                        setGlobalInfo({...globalInfo, stepNumber: 3});
                    }
                    navigate("/review");
                } else {
                    console.log("Post failed.");
                }
            })
            .catch((error: Error) => console.error(error));
    };
   

    return (
        <>
            <main id="main-content">
                <ProgressBar stepNumber={2} />
                <Form onSubmit={handleSubmit} large>
                    <Fieldset
                        legend={t('finance.title')}
                        legendStyle="large"
                    >
                        <p>
                            {t('finance.description')} (
                            <RequiredMarker />
                            ).
                        </p>
                        <Label htmlFor="filing-status" requiredMarker>
                            {t('finance.status')}{" "}
                        </Label>
                        <Grid row>
                            <Grid col={3} offset={1}>
                                <Radio
                                    id="single"
                                    name="filing-status"
                                    label={t('finance.single')}
                                    value="single"
                                    onChange={() => setJointFiling(false)}
                                />
                            </Grid>
                            <Grid col={4}>
                                <Radio
                                    id="married-jointly"
                                    name="filing-status"
                                    label={t('finance.married-joint')}
                                    value="Married Filing Jointly"
                                    checked={jointFiling}
                                    onChange={() =>
                                        setJointFiling(!jointFiling)
                                    }
                                />
                            </Grid>
                            <Grid col={4}>
                                <Radio
                                    id="married-separately"
                                    name="filing-status"
                                    label={t('finance.married-separate')}
                                    value="Married Filing Separately"
                                    onChange={() => setJointFiling(false)}
                                />
                            </Grid>
                        </Grid>
                        {jointFiling && <SpouseInfromation />}
                        <Label htmlFor="tax-year" requiredMarker>
                            {t('personal.tax-year')}
                        </Label>
                        <TextInput
                            id="tax-year"
                            name="tax-year"
                            type="number"
                            min={2000}
                            required
                        />
                        <Label htmlFor="w2-income" requiredMarker>
                            {t('finance.w2-total')}
                        </Label>
                        <TextInput
                            id="w2-income"
                            name="w2-income"
                            type="text"
                            required
                        />
                        <Label htmlFor="other-income">{t('finance.other-income')}</Label>
                        <Grid row>
                            <Grid col={6}>
                                <InputGroup>
                                    <InputPrefix>$</InputPrefix>
                                    <TextInput
                                        id="other-income"
                                        name="other-income"
                                        type="number"
                                        min={0}
                                        disabled={otherIncome}
                                    />
                                </InputGroup>
                            </Grid>
                            <Grid col={4} offset={2}>
                                <Checkbox
                                    id="na other-income"
                                    name="other-income"
                                    label={t('finance.na')}
                                    checked={otherIncome}
                                    onChange={() =>
                                        setOtherIncome(!otherIncome)
                                    }
                                />
                            </Grid>
                        </Grid>
                        <Label htmlFor="w2-tax-withheld" requiredMarker>
                            {t('finance.w2-withheld')}
                        </Label>
                        <InputGroup>
                            <InputPrefix>$</InputPrefix>
                            <TextInput
                                id="w2-tax-withheld"
                                name="w2-tax-withheld"
                                type="number"
                                min={0}
                                required
                            />
                        </InputGroup>
                        <Label htmlFor="tax-withheld-1099">
                            {t('finance.1099-withheld')}
                        </Label>
                        <Grid row>
                            <Grid col={6}>
                                <InputGroup>
                                    <InputPrefix>$</InputPrefix>
                                    <TextInput
                                        id="tax-withheld-1099"
                                        name="tax-withheld-1099"
                                        type="number"
                                        min={0}
                                        disabled={businessWithheld}
                                    />
                                </InputGroup>
                            </Grid>
                            <Grid col={4} offset={2}>
                                <Checkbox
                                    id="na tax-withheld-1099"
                                    name="tax-withheld-1099"
                                    label={t('finance.na')}
                                    checked={businessWithheld}
                                    onChange={() =>
                                        setBusinessWithheld(!businessWithheld)
                                    }
                                />
                            </Grid>
                        </Grid>
                        <Label htmlFor="other-tax-withheld">
                            {t('finance.other-withheld')}
                        </Label>
                        <Grid row>
                            <Grid col={6}>
                                <InputGroup>
                                    <InputPrefix>$</InputPrefix>
                                    <TextInput
                                        id="other-tax-withheld"
                                        name="other-tax-withheld"
                                        type="number"
                                        min={0}
                                        disabled={otherWithheld}
                                    />
                                </InputGroup>
                            </Grid>
                            <Grid col={4} offset={2}>
                                <Checkbox
                                    id="na other-tax-withheld"
                                    name="other-tax-withheld"
                                    label={t('finance.na')}
                                    checked={otherWithheld}
                                    onChange={() =>
                                        setOtherWithheld(!otherWithheld)
                                    }
                                />
                            </Grid>
                        </Grid>
                        <Label htmlFor="paid-taxes-withheld">
                            {t('finance.paid-taxes')}
                        </Label>
                        <Grid row>
                            <Grid col={6}>
                                <InputGroup>
                                    <InputPrefix>$</InputPrefix>
                                    <TextInput
                                        id="paid-taxes-withheld"
                                        name="paid-taxes-withheld"
                                        type="number"
                                        min={0}
                                        disabled={paidWithheld}
                                    />
                                </InputGroup>
                            </Grid>
                            <Grid col={4} offset={2}>
                                <Checkbox
                                    id="na paid-taxes-withheld"
                                    name="paid-taxes-withheld"
                                    label={t('finance.na')}
                                    checked={paidWithheld}
                                    onChange={() =>
                                        setPaidWithheld(!paidWithheld)
                                    }
                                />
                            </Grid>
                        </Grid>
                        <Button type="submit">{t('finance.button')}</Button>
                    </Fieldset>
                </Form>
            </main>
        </>
    );
};

export default FinanceInfo;
