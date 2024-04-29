import { StepIndicator, StepIndicatorStep } from "@trussworks/react-uswds";
import { useContext } from "react";
import { AppContext } from "../App";

type ProgressBarProps = {
    stepNumber: number
}

const ProgressBar = ({stepNumber}: ProgressBarProps) => {
    const [globalInfo, _] = useContext(AppContext);

    const getStatus = (currentStep: number, indicatorStep: number) => {
        if (currentStep === indicatorStep) {
            return 'current';
        }
        if (indicatorStep <= globalInfo.stepNumber) {
            return 'complete';
        }
        return 'incomplete';
    }

    return ( 
        <>
            <StepIndicator
                centered
                counters="default"
                headingLevel="h4"
                ofText="of"
                stepText="Step"
            >
                <StepIndicatorStep
                    label="Personal information"
                    status={getStatus(stepNumber, 1)}
                />
                <StepIndicatorStep
                    label="Financial information"
                    status={getStatus(stepNumber, 2)}
                />
                <StepIndicatorStep
                    label="Review"
                    status={getStatus(stepNumber, 3)}
                />
                <StepIndicatorStep 
                    label="Results" 
                    status={getStatus(stepNumber, 4)}
                />
            </StepIndicator>
        </>
    );
}
 
export default ProgressBar;
