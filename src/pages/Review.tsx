import { useContext, useEffect } from "react";
import ProgressBar from "../components/ProgressBar";
import {
    Fieldset,
    RequiredMarker,
    Form,
    Button,
} from "@trussworks/react-uswds";
import { AppContext } from "../App";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Review = () => {
    const [globalInfo, setGlobalInfo] = useContext(AppContext);
    const navigate = useNavigate();
    const {t} = useTranslation();

    useEffect(() => {
        if (!globalInfo.isLoggedIn || globalInfo.stepNumber < 3) {
            navigate("/");
        }
    }, [globalInfo]);

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
                    <Fieldset legend={t('review.title')} legendStyle="large">
                        <p>
                            {t('review.description')} (
                            <RequiredMarker />
                            )
                        </p>
                        <Button type="submit">{t('review.button')}</Button>
                    </Fieldset>
                </Form>
            </main>
        </>
    );
};

export default Review;
