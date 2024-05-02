import {
    Grid,
    Label,
    TextInput,
    DatePicker,
    TextInputMask,
} from "@trussworks/react-uswds";
import { useTranslation } from "react-i18next";

const SpouseInformation = () => {
    const {t}= useTranslation();
    return (
        <>
            <h3>{t('spouse.info')}</h3>
            <Grid row>
                <Grid col={6}>
                    <Label
                        htmlFor="spouse-first-name"
                        requiredMarker
                        id="spouse"
                    >
                        {t('personal.first-name')}
                    </Label>
                    <TextInput
                        id="spouse-first-name"
                        name="spouse-first-name"
                        type="text"
                        required
                    />
                </Grid>
                <Grid col={4} offset={2}>
                    <Label htmlFor="spouse-middle-initial" id="spouse">
                        {t('personal.middle-initial')}
                    </Label>
                    <TextInput
                        id="spouse-middle-initial"
                        name="spouse-middle-initial"
                        type="text"
                    />
                </Grid>
            </Grid>
            <Label htmlFor="spouse-last-name" requiredMarker>
                {t('personal.last-name')}
            </Label>
            <TextInput
                id="spouse-last-name"
                name="spouse-last-name"
                type="text"
                required
            />
            <Label
                htmlFor="spouse-date-of-birth"
                id="spouse-date-of-birth"
                requiredMarker
            >
                {t('personal.dob')}
            </Label>
            <DatePicker
                id="spouse-date-of-birth"
                name="spouse-date-of-birth"
                required
            />
            <Label htmlFor="ssn" requiredMarker>
                {t('personal.ssn')}
            </Label>
            <TextInputMask
                id="input-type-ssn"
                name="input-type-ssn"
                type="text"
                mask="___-__-____"
                pattern="^(?!(000|666|9))\d{3}-(?!00)\d{2}-(?!0000)\d{4}$"
            />
            <br />
            <h3>{t('spouse.joint-info')}</h3>
        </>
    );
};

export default SpouseInformation;
