import { useContext, useEffect, useState } from "react";
import ProgressBar from "../components/ProgressBar";
import {
    Fieldset,
    RequiredMarker,
    Form,
    Button,
} from "@trussworks/react-uswds";
import { AppContext } from "../App";
import { useNavigate } from "react-router-dom";

type Profile = {
    "id": null;
    "firstName": string;
    "middleInitial": string | null;
    "lastName": string;
    "dateOfBirth": number;
    "address": string;
    "city": string;
    "state": string;
    "aptNumber": string | null,
    "zipCode": null;
    "ssn": number;
    "oauthId": null;
}

type Finances = {
    "id": null;
    "filingStatus": string;
    "spouseFirstName": string | null;
    "spouseMiddleInitial": string | null;
    "spouseLastName": string | null;
    "spouseSsn": number | null;
    "spouseDateOfBirth": number | null;
    "w2Income": number;
    "otherIncome": number;
    "taxWithheldW2": number;
    "taxWithheld1099": number;
    "taxWithheldOther": number;
    "prevTaxesPaid": number;
    "oauthId": null;
}

const Review = () => {
    const backendUrl = "http://localhost:8080";

    const [globalInfo, setGlobalInfo] = useContext(AppContext);
    const navigate = useNavigate();

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
            .then(data => data.json())
            .then(dataJson => {
                setProfile(dataJson);
                fetch(backendUrl + "/finances", {
                    credentials: "include",
                    method: "GET",
                })
                    .then(data => data.json())
                    .then(dataJson => {
                        setFinances(dataJson);
                    })
                    .catch(err => console.error(err));
            })
            .catch(err => console.error(err));
    }, [])

    const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
        evt.preventDefault();
        if (globalInfo.stepNumber < 4) {
            setGlobalInfo({...globalInfo, stepNumber: 4});
        }
        navigate("/results");
    };

    return (
        <>
            <main id="main-content">
                <ProgressBar stepNumber={3} />
                <Form onSubmit={handleSubmit} large>
                    <Fieldset legend="Review" legendStyle="large">
                        <h1>Profile</h1>
                        <ul>
                            <li>First Name: {profile?.firstName}</li>
                            <li>Middle Initial: {profile?.middleInitial}</li>
                            <li>Last Name: {profile?.lastName}</li>
                            <li>Date of Birth: {profile?.dateOfBirth}</li>
                            <li>Address: {profile?.address}</li>
                            <li>City: {profile?.city}</li>
                            <li>State: {profile?.state}</li>
                            <li>Apartment number: {profile?.aptNumber}</li>
                            <li>Zip code: {profile?.zipCode}</li>
                            <li>SSN: {profile?.ssn}</li>
                        </ul>
                        <h1>Finances</h1>
                        <ul>
                            <li>Filing Status: {finances?.filingStatus}</li>
                            <li>Spouse First Name: {finances?.spouseFirstName}</li>
                            <li>Spouse Middle Initial: {finances?.spouseMiddleInitial}</li>
                            <li>Spouse Last Name: {finances?.spouseLastName}</li>
                            <li>Spouse SSN: {finances?.spouseSsn}</li>
                            <li>Spouse Date of Birth: {finances?.spouseDateOfBirth}</li>
                            <li>W2 Income: {finances?.w2Income as number / 100}</li>
                            <li>Other Income: {finances?.otherIncome as number / 100}</li>
                            <li>Tax withheld by W2: {finances?.taxWithheldW2 as number / 100}</li>
                            <li>Tax withheld by 1099: {finances?.taxWithheld1099 as number / 100}</li>
                            <li>Tax withheld by other: {finances?.taxWithheldOther as number / 100}</li>
                            <li>Previous taxes paid: {finances?.prevTaxesPaid as number / 100}</li>
                        </ul>
                        <Button type="submit">Results</Button>
                    </Fieldset>
                </Form>
            </main>
        </>
    );
};

export default Review;
