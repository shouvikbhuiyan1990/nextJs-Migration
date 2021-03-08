import React from 'react'
import { Line } from 'react-chartjs-2';
const LineChart = ({
    labels,
    label,
    data,
    backgroundColor,
    borderColor
}) => {


    const dataset = {
        labels,
        datasets: [
            {
                label,
                data,
                fill: false,
                backgroundColor,
                borderColor,
            },
        ],
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
        },
    }


    return (
        <>
            <Line data={dataset} options={options} />
        </>)
};

export default LineChart