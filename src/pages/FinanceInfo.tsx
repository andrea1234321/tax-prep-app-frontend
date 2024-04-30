import { useState } from "react";
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

const FinanceInfo = () => {
    const [otherIncome, setOtherIncome] = useState(false);
    const [businessWithheld, setBusinessWithheld] = useState(false);
    const [otherWithheld, setOtherWithheld] = useState(false);
    const [paidWithheld, setPaidWithheld] = useState(false);

    const [jointFilling, setJointFilling] = useState(false);

    return (
        <>
            <main id="main-content">
                <ProgressBar stepNumber={2} />
                <Form onSubmit={() => {}} large>
                    <Fieldset
                        legend="Financial Information"
                        legendStyle="large"
                    >
                        <p>
                            Required fields are marked with an asterisk (
                            <RequiredMarker />
                            ).
                        </p>
                        <Label htmlFor="filling-status" requiredMarker>
                            Filling Status:{" "}
                        </Label>
                        <Grid row>
                            <Grid col={3} offset={1}>
                                <Radio
                                    id="single"
                                    name="filing-status"
                                    label="Single"
                                    onChange={() => setJointFilling(false)}
                                />
                            </Grid>
                            <Grid col={4}>
                                <Radio
                                    id="married-jointly"
                                    name="filing-status"
                                    label="Married Filling Jointly"
                                    checked={jointFilling}
                                    onChange={() =>
                                        setJointFilling(!jointFilling)
                                    }
                                />
                            </Grid>
                            <Grid col={4}>
                                <Radio
                                    id="married-separately"
                                    name="filing-status"
                                    label="Married Filling Separately"
                                    onChange={() => setJointFilling(false)}
                                />
                            </Grid>
                        </Grid>
                        {jointFilling && <SpouseInfromation />}
                        <Label htmlFor="w2-income" requiredMarker>
                            W2 Form(s) total income
                        </Label>
                        <TextInput
                            id="w2-income"
                            name="w2-income"
                            type="text"
                            required
                        />
                        <Label htmlFor="other-income">Other income</Label>
                        <Grid row>
                            <Grid col={6}>
                                <InputGroup>
                                    <InputPrefix>$</InputPrefix>
                                    <TextInput
                                        id="other-income"
                                        name="other-income"
                                        type="number"
                                        disabled={otherIncome}
                                    />
                                </InputGroup>
                            </Grid>
                            <Grid col={4} offset={2}>
                                <Checkbox
                                    id="na other-income"
                                    name="other-income"
                                    label="N/a"
                                    checked={otherIncome}
                                    onChange={() =>
                                        setOtherIncome(!otherIncome)
                                    }
                                />
                            </Grid>
                        </Grid>
                        <Label htmlFor="w2-tax-withheld" requiredMarker>
                            W2 Form(s) total income tax withheld
                        </Label>
                        <InputGroup>
                            <InputPrefix>$</InputPrefix>
                            <TextInput
                                id="w2-tax-withheld"
                                name="w2-tax-withheld"
                                type="number"
                                required
                            />
                        </InputGroup>
                        <Label htmlFor="tax-withheld-1099">
                            1099 Form(s) total income tax withheld
                        </Label>
                        <Grid row>
                            <Grid col={6}>
                                <InputGroup>
                                    <InputPrefix>$</InputPrefix>
                                    <TextInput
                                        id="tax-withheld-1099"
                                        name="tax-withheld-1099"
                                        type="number"
                                        disabled={businessWithheld}
                                    />
                                </InputGroup>
                            </Grid>
                            <Grid col={4} offset={2}>
                                <Checkbox
                                    id="na tax-withheld-1099"
                                    name="tax-withheld-1099"
                                    label="N/a"
                                    checked={businessWithheld}
                                    onChange={() =>
                                        setBusinessWithheld(!businessWithheld)
                                    }
                                />
                            </Grid>
                        </Grid>
                        <Label htmlFor="other-tax-withheld">
                            Other tax withheld
                        </Label>
                        <Grid row>
                            <Grid col={6}>
                                <InputGroup>
                                    <InputPrefix>$</InputPrefix>
                                    <TextInput
                                        id="other-tax-withheld"
                                        name="other-tax-withheld"
                                        type="number"
                                        disabled={otherWithheld}
                                    />
                                </InputGroup>
                            </Grid>
                            <Grid col={4} offset={2}>
                                <Checkbox
                                    id="na other-tax-withheld"
                                    name="other-tax-withheld"
                                    label="N/a"
                                    checked={otherWithheld}
                                    onChange={() =>
                                        setOtherWithheld(!otherWithheld)
                                    }
                                />
                            </Grid>
                        </Grid>
                        <Label htmlFor="paid-taxes-withheld">
                            Paid taxes from 2022
                        </Label>
                        <Grid row>
                            <Grid col={6}>
                                <InputGroup>
                                    <InputPrefix>$</InputPrefix>
                                    <TextInput
                                        id="paid-taxes-withheld"
                                        name="paid-taxes-withheld"
                                        type="number"
                                        disabled={paidWithheld}
                                    />
                                </InputGroup>
                            </Grid>
                            <Grid col={4} offset={2}>
                                <Checkbox
                                    id="na paid-taxes-withheld"
                                    name="paid-taxes-withheld"
                                    label="N/a"
                                    checked={paidWithheld}
                                    onChange={() =>
                                        setPaidWithheld(!paidWithheld)
                                    }
                                />
                            </Grid>
                        </Grid>
                        <Button type="submit">Review</Button>
                    </Fieldset>
                </Form>
            </main>
        </>
    );
};

export default FinanceInfo;
