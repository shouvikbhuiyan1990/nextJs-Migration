import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import Tab from './tabs';
import BarGraph from './barChart';
import Table from './table';


const Styles = styled.div`
    .accounts-landing .account-tabs {
        display: flex;
        position: sticky;
        top: 80px;
        background: #fff;
        z-index: 9;
    }

    .accounts-landing hr {
        width: 98%;
        margin: 0 auto;
        margin-top: 20px;
    }

    .accounts-landing .t-history {
        margin: 20px 0 18px;
    }

    .accounts-landing .account-tabs li {
        padding: 1.2rem 0.9rem 0.7rem;
        border-bottom: 3px solid #ccc;
        width: 100%;
        text-align: center;
        cursor: pointer;
    }

    .accounts-landing .account-tabs li.active {
        color: #1dbf73;
        font-family: 'lato-bold';
        border-bottom: 3px solid #37AD1C;
    }

    .accounts-landing .account-tabs li:first-child {
        padding-left: 0;
    }

    .accounts-landing .account-tabs li.active .monthly-sales-report {
        color: #5A5858;
    }

    .accounts-landing .monthly-sales-report {
        display: flex;
        align-items: center;
        flex-direction: column;
    }
`;

// import './index.css';
const TABS_DATA = [{
    id: '1',
    text: 'Current Month'
}, {
    id: '2',
    text: 'Till Date'
}];

const arr = [];
const arr2 = [];

for (let i = 0; i < 31; i++) {
    arr.push(Math.floor(Math.random() * 10));
    arr2.push(Math.floor(Math.random() * 20));
}

const Accounts = () => {
    const currentMonthsData = {
        labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'],
        datasets: [
            {
                label: 'sales in INR',
                data: arr,
                backgroundColor: 'rgb(29, 191, 115)',
            },
            {
                label: 'sales USD',
                data: arr2,
                backgroundColor: 'rgb(54, 162, 235)',
            },
        ],
    };

    const yearData2 = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
            {
                label: 'sales this year in INR',
                data: arr,
                backgroundColor: 'rgb(29, 191, 115)',
            },
            {
                label: 'sales this year in USD',
                data: arr2,
                backgroundColor: 'rgb(54, 162, 235)',
            },
        ],
    };
    const [activeClass, setActiveClass] = useState('1');
    const checkIfActive = useCallback((id) => {
        setActiveClass(id);
    }, []);
    return (
        <Styles>
            <div className='accounts-landing'>
                <Tab
                    data={TABS_DATA}
                    activeClass={activeClass}
                    tabChange={checkIfActive}
                />
                {activeClass === '1' &&
                    <>
                        <BarGraph {...currentMonthsData} />
                        <hr />
                        <h4 className='t-history'>Transaction History</h4>
                        <Table />
                    </>
                }
                {activeClass === '2' &&
                    <>
                        <BarGraph {...yearData2} />
                        <hr />
                        <h4 className='t-history'>Transaction History</h4>
                        <Table />
                    </>
                }
            </div>
        </Styles>
    )
}

export default Accounts;