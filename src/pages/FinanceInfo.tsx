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

const FinanceInfo = () => {
    const backendUrl = "http://localhost:8080";

    const {t} = useTranslation();
    const [globalInfo, setGlobalInfo] = useContext(AppContext);
    const navigate = useNavigate();
    const [otherIncome, setOtherIncome] = useState(false);
    const [businessWithheld, setBusinessWithheld] = useState(false);
    const [otherWithheld, setOtherWithheld] = useState(false);
    const [paidTaxes, setPaidTaxes] = useState(false);
    const [jointFiling, setJointFiling] = useState(false);
    const [financeInfo, setFinanaceInfo] = useState({
        filingStatus: '',
        spouseFirstName: '',
        spouseMiddleInitial: '',
        spouseLastName: '',
        spouseDateOfBirth: '',
        spouseSsn: '',
        w2Income: '',
        otherIncome: '',
        taxWithheldW2: '',
        taxWithheld1099: '',
        taxWithheldOther: '',
        prevTaxesPaid: ''
    })
console.log(financeInfo)
    const handleChange = (evt: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement> ) => {
        evt.preventDefault()
        const { name, value } = evt.target
        setFinanaceInfo({ ...financeInfo, [name]: value })
    }
    const handleChangeRadioBtn = (evt: React.ChangeEvent<HTMLInputElement> ) => {
        const { name, value } = evt.target
        if (value === "Married Filing Jointly"){
            setJointFiling(true)
            setFinanaceInfo({ ...financeInfo, [name]: value })
        }else{
            setJointFiling(false)
            setFinanaceInfo({...financeInfo,
                [name]: value,
                spouseFirstName: '',
                spouseMiddleInitial: '',
                spouseLastName: '',
                spouseDateOfBirth: '',
                spouseSsn: '',
            })
        }
    }

    const handleChangeDate = (newDate: string | undefined) => {
        newDate && setFinanaceInfo({ ...financeInfo, spouseDateOfBirth: newDate })
    }

    const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
        evt.preventDefault();
        const body = JSON.stringify({...financeInfo, 
            spouseSsn: Number(financeInfo.spouseSsn.replace("-", "").replace("-", "")),
            spouseDateOfBirth:  Number(financeInfo.spouseDateOfBirth.replace('/', '').replace('/', '')),
            w2Income: Number(financeInfo.w2Income) * 100,
            otherIncome: Number(financeInfo.otherIncome) * 100,
            taxWithheldW2: Number(financeInfo.taxWithheldW2) * 100,
            taxWithheld1099: Number(financeInfo.taxWithheld1099) * 100,
            taxWithheldOther: Number(financeInfo.taxWithheldOther) * 100,
            prevTaxesPaid: Number(financeInfo.prevTaxesPaid) * 100,
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
                        <Label htmlFor="filingStatus" requiredMarker>
                            {t('finance.status')}
                        </Label>
                        <Grid row>
                            <Grid col={3} offset={1}>
                                <Radio
                                    id="single"
                                    name="filingStatus"
                                    label={t('finance.single')}
                                    value="single"
                                    onChange={handleChangeRadioBtn}
                                />
                            </Grid>
                            <Grid col={4}>
                                <Radio
                                    id="married-jointly"
                                    name="filingStatus"
                                    label={t('finance.married-joint')}
                                    value="Married Filing Jointly"
                                    onChange={handleChangeRadioBtn}
                                />
                            </Grid>
                            <Grid col={4}>
                                <Radio
                                    id="married-separately"
                                    name="filingStatus"
                                    label={t('finance.married-separate')}
                                    value="Married Filing Separately"
                                    onChange={handleChangeRadioBtn}
                                />
                            </Grid>
                        </Grid>
                        {jointFiling && <SpouseInfromation handleChange={handleChange} handleChangeDate={handleChangeDate}/>}
                        <Label htmlFor="w2Income" requiredMarker>
                            {t('finance.w2-total')}
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
                        <Label htmlFor="otherIncome">{t('finance.other-income')}</Label>
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
                                    label={t('finance.na')}
                                    checked={otherIncome}
                                    onChange={() =>
                                        setOtherIncome(!otherIncome)
                                    }
                                />
                            </Grid>
                        </Grid>
                        <Label htmlFor="taxWithheldW2" requiredMarker>
                            {t('finance.w2-withheld')}
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
                            {t('finance.1099-withheld')}
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
                                        disabled={businessWithheld}
                                        value={financeInfo.taxWithheld1099}
                                        onChange={handleChange}
                                    />
                                </InputGroup>
                            </Grid>
                            <Grid col={4} offset={2}>
                                <Checkbox
                                    id="na taxWithheld1099"
                                    name="taxWithheld1099"
                                    label={t('finance.na')}
                                    checked={businessWithheld}
                                    onChange={() =>
                                        setBusinessWithheld(!businessWithheld)
                                    }
                                />
                            </Grid>
                        </Grid>
                        <Label htmlFor="taxWithheldOther">
                            {t('finance.other-withheld')}
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
                                        disabled={otherWithheld}
                                        value={financeInfo.taxWithheldOther}
                                        onChange={handleChange}
                                    />
                                </InputGroup>
                            </Grid>
                            <Grid col={4} offset={2}>
                                <Checkbox
                                    id="na taxWithheldOther"
                                    name="taxWithheldOther"
                                    label={t('finance.na')}
                                    checked={otherWithheld}
                                    onChange={() =>
                                        setOtherWithheld(!otherWithheld)
                                    }
                                />
                            </Grid>
                        </Grid>
                        <Label htmlFor="prevTaxesPaid">
                            {t('finance.paid-taxes')}
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
                                        disabled={paidTaxes}
                                        value={financeInfo.prevTaxesPaid}
                                        onChange={handleChange}
                                    />
                                </InputGroup>
                            </Grid>
                            <Grid col={4} offset={2}>
                                <Checkbox
                                    id="na prevTaxesPaid"
                                    name="prevTaxesPaid"
                                    label={t('finance.na')}
                                    checked={paidTaxes}
                                    onChange={() =>
                                        setPaidTaxes(!paidTaxes)
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
