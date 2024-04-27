import { StepIndicator, StepIndicatorStep } from "@trussworks/react-uswds";

const ProgressBar = () => {

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
                    status="current"
                />
                <StepIndicatorStep
                    label="Financial information"
                    // status=conditionally add 
                />
                <StepIndicatorStep
                    label="Review"
                    // status=conditionally add 
                />
                <StepIndicatorStep 
                    label="Results" 
                    // status=conditionally add 
                />
            </StepIndicator>
        </>
    );
}
 
export default ProgressBar;
