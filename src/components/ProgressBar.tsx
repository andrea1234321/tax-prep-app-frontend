import { StepIndicator, StepIndicatorStep } from "@trussworks/react-uswds";
import { useContext } from "react";
import { AppContext } from "../App";
import { useTranslation } from "react-i18next";

type ProgressBarProps = {
    stepNumber: number;
};

const ProgressBar = ({ stepNumber }: ProgressBarProps) => {
    const { t } = useTranslation();
    const [globalInfo, _] = useContext(AppContext);

    const getStatus = (currentStep: number, indicatorStep: number) => {
        if (currentStep === indicatorStep) {
            return "current";
        }
        if (indicatorStep <= globalInfo.stepNumber) {
            return "complete";
        }
        return "incomplete";
    };

    return (
        <>
            <StepIndicator
                centered
                counters="default"
                headingLevel="h4"
                ofText={t("progress.of")}
                stepText="Step"
            >
                <StepIndicatorStep
                    label={t("progress.personal")}
                    status={getStatus(stepNumber, 1)}
                />
                <StepIndicatorStep
                    label={t("progress.financial")}
                    status={getStatus(stepNumber, 2)}
                />
                <StepIndicatorStep
                    label={t("progress.review")}
                    status={getStatus(stepNumber, 3)}
                />
                <StepIndicatorStep
                    label={t("progress.results")}
                    status={getStatus(stepNumber, 4)}
                />
            </StepIndicator>
        </>
    );
};

export default ProgressBar;
