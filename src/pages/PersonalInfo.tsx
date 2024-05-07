import { useContext, useEffect, useState } from "react";
import ProgressBar from "../components/ProgressBar";
import {
    Fieldset,
    RequiredMarker,
    Label,
    TextInput,
    Select,
    Form,
    Button,
    Grid,
    DatePicker,
    TextInputMask,
    ButtonGroup,
    Link,
} from "@trussworks/react-uswds";
import { AppContext, backendUrl } from "../App";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const PersonalInfo = () => {
    const [globalInfo, setGlobalInfo] = useContext(AppContext);
    const navigate = useNavigate();
    const {t} = useTranslation();
    const [profile, setProfile] = useState({
        firstName: '',
        middleInitial: '',
        lastName: '',
        dateOfBirth: '',
        address: '',
        city: '',
        state: '',
        aptNumber: '',
        zipCode: '',
        ssn: '',
    });
    const [update, setUpdate] = useState(false)

    const handleChange = (evt: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement> ) => {
        evt.preventDefault()
        const { name, value } = evt.target
        setProfile({ ...profile, [name]: value })
    }

    const handleChangeDate = (newDate: string | undefined) => {
        newDate && setProfile({ ...profile, dateOfBirth: newDate })
    }

    useEffect(() => {
        if (!globalInfo.isLoggedIn) {
            navigate("/");
        }
    }, [globalInfo]);

    const handleSubmit = (evt: React.FormEvent<HTMLFormElement> ) => {
        evt.preventDefault();
        const body = JSON.stringify({...profile, 
            dateOfBirth: Number(profile.dateOfBirth.replace('/', '').replace('/', '')),
            zipCode: Number(profile.zipCode),
            ssn: Number(profile.ssn),
        });
        fetch(backendUrl + "/profile", {
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
                    if (globalInfo.stepNumber < 2) {
                        setGlobalInfo(globalInfo => ({...globalInfo, stepNumber: 2}));
                    }
                    navigate("/financialInformation");
                } else {
                    console.log("Post failed.");
                }
            })
            .catch((error: Error) => console.error(error));
    };
    
    const handleUpdate = (evt: React.FormEvent<HTMLFormElement> ) => {
        evt.preventDefault();
        const body = JSON.stringify({...profile, 
            dateOfBirth: Number(profile.dateOfBirth.replace('/', '').replace('/', '')),
            zipCode: Number(profile.zipCode),
            ssn: Number(profile.ssn),
        });
        fetch(backendUrl + "/profile", {
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
                    if (globalInfo.stepNumber < 2) {
                        setGlobalInfo(globalInfo => ({...globalInfo, stepNumber: 2}));
                    }
                    navigate("/financialInformation");
                } else {
                    console.log("Update failed.");
                }
            })
            .catch((error: Error) => console.error(error));
    };
    
    useEffect(() => {
        fetch(backendUrl + "/profile", {
            credentials: "include",
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then(data => {
            if (data.ok) {
                return data.json();
            } 
        }).then((returnedData) => {
            //if returned value is null change to empty string
            let formattedDOB
            if(returnedData.dateOfBirth.toString().length === 7){
                const month= returnedData.dateOfBirth.toString().slice(4,5)
                const day= returnedData.dateOfBirth.toString().slice(5,7)
                const year= returnedData.dateOfBirth.toString().slice(0,4)
                formattedDOB = `0${month}/${day}/${year}`
            }else{
                const month= returnedData.dateOfBirth.toString().slice(4,6)
                const day= returnedData.dateOfBirth.toString().slice(6,8)
                const year= returnedData.dateOfBirth.toString().slice(0,4)
                formattedDOB = `${month}/${day}/${year}`
            }
            setProfile({...returnedData, dateOfBirth: formattedDOB});
            setUpdate(true)
        })
        .catch(() => console.log("No existing personal information"));
    }, []);

    return (
        <>
            <main id="main-content">
                <ProgressBar stepNumber={1} />
                <Form onSubmit={update ? handleUpdate : handleSubmit} large>
                    <Fieldset legend={t('personal.title')} legendStyle="large">
                        <p>{t('personal.description')}(
                            <RequiredMarker />
                            )
                        </p>
                        <Grid row>
                            <Grid col={6}>
                                <Label htmlFor="firstName" requiredMarker>
                                    {t('personal.first-name')}
                                </Label>
                                <TextInput
                                    id="firstName"
                                    name="firstName"
                                    type="text"
                                    required
                                    value={profile && profile?.firstName}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid col={4} offset={2}>
                                <Label htmlFor="middleInitial">
                                    {t('personal.middle-initial')}
                                </Label>
                                <TextInput
                                    id="middleInitial"
                                    name="middleInitial"
                                    type="text"
                                    value={profile && profile?.middleInitial}
                                    onChange={handleChange}
                                />
                            </Grid>
                        </Grid>
                        <Label htmlFor="lastName" requiredMarker>
                            {t('personal.last-name')}
                        </Label>
                        <TextInput
                            id="lastName"
                            name="lastName"
                            type="text"
                            required
                            value={profile && profile?.lastName}
                            onChange={handleChange}
                        />
                        <Label
                            htmlFor="dateOfBirth"
                            id="dateOfBirth"
                            requiredMarker
                        >
                            {t('personal.dob')}
                        </Label>
                        <DatePicker id="dateOfBirth" name="dateOfBirth" required onChange={handleChangeDate} value={profile && profile?.dateOfBirth}/>
                        <Label htmlFor="address" requiredMarker>
                            {t('personal.address')}
                        </Label>
                        <TextInput
                            id="address"
                            name="address"
                            type="text"
                            required
                            value={profile && profile?.address}
                            onChange={handleChange}
                        />

                        <Label htmlFor="aptNumber">
                            {t('personal.apt')}
                        </Label>
                        <TextInput
                            id="aptNumber"
                            name="aptNumber"
                            type="text"
                            value={profile && profile?.aptNumber}
                            onChange={handleChange}
                        />
                        <Grid row>
                            <Grid col={6}>
                                <Label htmlFor="city" requiredMarker>
                                    {t('personal.city')}
                                </Label>
                                <TextInput
                                    id="city"
                                    name="city"
                                    type="text"
                                    required
                                    value={profile && profile?.city}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid col={4} offset={2}>
                                <Label htmlFor="state" requiredMarker>
                                    {t('personal.state')}
                                </Label>
                                <Select id="state" name="state" required value={profile && profile?.state} onChange={handleChange}>
                                    <option>- {t('personal.select')} -</option>
                                    <option value="AL">Alabama</option>
                                    <option value="AK">Alaska</option>
                                    <option value="AZ">Arizona</option>
                                    <option value="AR">Arkansas</option>
                                    <option value="CA">California</option>
                                    <option value="CO">Colorado</option>
                                    <option value="CT">Connecticut</option>
                                    <option value="DE">Delaware</option>
                                    <option value="DC">
                                        District of Columbia
                                    </option>
                                    <option value="FL">Florida</option>
                                    <option value="GA">Georgia</option>
                                    <option value="HI">Hawaii</option>
                                    <option value="ID">Idaho</option>
                                    <option value="IL">Illinois</option>
                                    <option value="IN">Indiana</option>
                                    <option value="IA">Iowa</option>
                                    <option value="KS">Kansas</option>
                                    <option value="KY">Kentucky</option>
                                    <option value="LA">Louisiana</option>
                                    <option value="ME">Maine</option>
                                    <option value="MD">Maryland</option>
                                    <option value="MA">Massachusetts</option>
                                    <option value="MI">Michigan</option>
                                    <option value="MN">Minnesota</option>
                                    <option value="MS">Mississippi</option>
                                    <option value="MO">Missouri</option>
                                    <option value="MT">Montana</option>
                                    <option value="NE">Nebraska</option>
                                    <option value="NV">Nevada</option>
                                    <option value="NH">New Hampshire</option>
                                    <option value="NJ">New Jersey</option>
                                    <option value="NM">New Mexico</option>
                                    <option value="NY">New York</option>
                                    <option value="NC">North Carolina</option>
                                    <option value="ND">North Dakota</option>
                                    <option value="OH">Ohio</option>
                                    <option value="OK">Oklahoma</option>
                                    <option value="OR">Oregon</option>
                                    <option value="PA">Pennsylvania</option>
                                    <option value="RI">Rhode Island</option>
                                    <option value="SC">South Carolina</option>
                                    <option value="SD">South Dakota</option>
                                    <option value="TN">Tennessee</option>
                                    <option value="TX">Texas</option>
                                    <option value="UT">Utah</option>
                                    <option value="VT">Vermont</option>
                                    <option value="VA">Virginia</option>
                                    <option value="WA">Washington</option>
                                    <option value="WV">West Virginia</option>
                                    <option value="WI">Wisconsin</option>
                                    <option value="WY">Wyoming</option>
                                </Select>
                            </Grid>
                        </Grid>
                        <Label htmlFor="zipCode" requiredMarker>
                            {t('personal.zip')}
                        </Label>
                        <TextInput
                            id="zipCode"
                            name="zipCode"
                            type="text"
                            inputSize="medium"
                            pattern="[\d]{5}(-[\d]{4})?"
                            required
                            value={profile && profile?.zipCode}
                            onChange={handleChange}
                        />

                        <Label htmlFor="ssn" requiredMarker>
                            {t('personal.ssn')}
                        </Label>
                        <TextInput
                            id="ssn"
                            name="ssn"
                            type="number"
                            onChange={handleChange}
                            value={profile && profile?.ssn}
                        />
                        {/* <TextInputMask
                            id="ssn"
                            name="ssn"
                            type="text"
                            mask="___-__-____"
                            pattern="^(?!(000|666|9))\d{3}-(?!00)\d{2}-(?!0000)\d{4}$"
                            onChange={handleChange}
                            value={profile && profile?.ssn}
                        /> */}
                        <ButtonGroup>
                            <Link href="#" className="usa-button usa-button--outline" onClick={() => navigate("/home")}>
                                Back
                            </Link>
                            <Button type="submit">{t('personal.button')}</Button>
                        </ButtonGroup>
                    </Fieldset>
                </Form>
            </main>
        </>
    );
};

export default PersonalInfo;
