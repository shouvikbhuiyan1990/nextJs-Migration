import React from 'react'
import { Bar } from 'react-chartjs-2';
const LineChart = ({
    labels,
    label,
    datasets,
}) => {


    const dataset = {
        labels,
        datasets,
    }

    const options = {
        scales: {
            yAxes: [
                {
                    ticks: {
                        beginAtZero: true,
                    },
                },
            ],
            xAxes: [
                {
                    stacked: true,
                },
            ],
        },
    }


    return (
        <>
            <Bar data={dataset} options={options} />
        </>)
};

export default LineChart