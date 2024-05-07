import { BarChart, PieChart } from "@mui/x-charts";
import { useContext, useEffect } from "react";
import { AdminAnalytics, AppContext } from "../App";
import { useNavigate } from "react-router-dom";

const Admin = ({analytics}: {analytics: AdminAnalytics}) => {
    const [globalInfo, _] = useContext(AppContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!globalInfo.isAdmin) {
            navigate("/home");
        }
    }, [globalInfo]);

    const stateData = Object.keys(analytics.stateFrequencies)
                            .map((key, i) => ({
                                id: i,
                                value: analytics.stateFrequencies[key],
                                label: key,
                            }));

    const filingData = Object.keys(analytics.filingStatusFrequencies)
                             .map((key, i) => ({
                                 id: i,
                                 value: analytics.filingStatusFrequencies[key],
                                 label: key,
                             }));

    const incomeKeys = Object.keys(analytics.incomeFrequencies).sort((range1, range2) => {
        const minimum1 = Number(range1.split('-')[0]);
        const minimum2 = Number(range2.split('-')[0]);
        if (minimum1 < minimum2) {
            return -1;
        } else if (minimum1 > minimum2) {
            return 1;
        } else {
            return 0;
        }
    });

    const incomeData = incomeKeys.map(key => analytics.incomeFrequencies[key]);

    return (
        <>
            {/* State Frequencies chart */}
            State Frequencies
            <PieChart series={[{data: stateData}]} width={1000} height={500}/>
            {/* Filing Status Frequencies chart */}
            Filing Status Frequencies
            <PieChart series={[{data: filingData}]} width={1000} height={500}/>
            {/* Income Data chart */}
            W2 Income Distribution
            <BarChart
                xAxis={[{ scaleType: 'band', data: incomeKeys }]}
                series={[{ data: incomeData }]}
                width={1000}
                height={500}
            />
        </>
    );
};

export default Admin;
