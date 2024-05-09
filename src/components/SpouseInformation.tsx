import {
    Grid,
    Label,
    TextInput,
    TextInputMask,
} from "@trussworks/react-uswds";
import { useTranslation } from "react-i18next";
type FinanceInfoType = {
    "filingStatus": string;
    "spouseFirstName": string | undefined;
    "spouseMiddleInitial": string | undefined;
    "spouseLastName": string | undefined;
    "spouseDateOfBirth": string | undefined;
    "spouseSsn": string | undefined;
    "w2Income": string | Number;
    "otherIncome": string | Number;
    "taxWithheldW2": string | Number;
    "taxWithheld1099": string | Number;
    "taxWithheldOther": string | Number;
    "prevTaxesPaid": string| Number
};



const SpouseInformation = (props: {
    handleChange: (evt: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => void,
    financeInfo: FinanceInfoType
}) => {
    const {handleChange, financeInfo} = props
    const {t}= useTranslation();
    return (
        <>
            <h3>{t('spouse.info')}</h3>
            <Grid row>
                <Grid col={6}>
                    <Label
                        htmlFor="spouseFirstName"
                        requiredMarker
                        id="spouse"
                    >
                        {t('personal.first-name')}
                    </Label>
                    <TextInput
                        id="spouseFirstName"
                        name="spouseFirstName"
                        type="text"
                        required
                        value={financeInfo.spouseFirstName}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid col={4} offset={2}>
                    <Label htmlFor="spouseMiddleInitial" id="spouse">
                        {t('personal.middle-initial')}
                    </Label>
                    <TextInput
                        id="spouseMiddleInitial"
                        name="spouseMiddleInitial"
                        type="text"
                        value={financeInfo.spouseMiddleInitial}
                        onChange={handleChange}
                    />
                </Grid>
            </Grid>
            <Label htmlFor="spouseLastName" requiredMarker>
                {t('personal.last-name')}
            </Label>
            <TextInput
                id="spouseLastName"
                name="spouseLastName"
                type="text"
                required
                value={financeInfo.spouseLastName}
                onChange={handleChange}
            />
            <Label
                htmlFor="spouseDateOfBirth"
                id="spouseDateOfBirth"
                requiredMarker
            >
                {t('personal.dob')}
            </Label>
            <input id="spouseDateOfBirth" name="spouseDateOfBirth" type="date" required value={financeInfo.spouseDateOfBirth} className="usa-input usa-date-picker_external-input" onChange={handleChange}/>
            <Label htmlFor="spouseSsn" requiredMarker>
                {t('personal.ssn')}
            </Label>
            <TextInputMask
                id="spouseSsn"
                name="spouseSsn"
                type="text"
                mask="___-__-____"
                // pattern="^(?!(000|666|9))\d{3}-(?!00)\d{2}-(?!0000)\d{4}$"
                value={financeInfo.spouseSsn}
                onChange={handleChange}
            />
            <br />
            <h3>{t('spouse.joint-info')}</h3>
        </>
    );
};

export default SpouseInformation;
