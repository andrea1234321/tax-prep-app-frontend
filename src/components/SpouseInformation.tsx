import {
    Grid,
    Label,
    TextInput,
    DatePicker,
    TextInputMask,
} from "@trussworks/react-uswds";
import { useTranslation } from "react-i18next";

const SpouseInformation = (props: {
    handleChange: (evt: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => void,
    handleChangeDate: (newDate: string | undefined) => void
}) => {
    const {handleChange, handleChangeDate} = props
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
                onChange={handleChange}
            />
            <Label
                htmlFor="spouseDateOfBirth"
                id="spouseDateOfBirth"
                requiredMarker
            >
                {t('personal.dob')}
            </Label>
            <DatePicker
                id="spouseDateOfBirth"
                name="spouseDateOfBirth"
                required
                onChange={handleChangeDate}
            />
            <Label htmlFor="spouseSsn" requiredMarker>
                {t('personal.ssn')}
            </Label>
            <TextInputMask
                id="spouseSsn"
                name="spouseSsn"
                type="text"
                mask="___-__-____"
                pattern="^(?!(000|666|9))\d{3}-(?!00)\d{2}-(?!0000)\d{4}$"
                onChange={handleChange}
            />
            <br />
            <h3>{t('spouse.joint-info')}</h3>
        </>
    );
};

export default SpouseInformation;
