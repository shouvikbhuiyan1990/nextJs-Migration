import React from 'react';

const Tabs = ({
    tabChange,
    activeClass,
    data
}) => {
    return (
        <ul className='account-tabs'>
            {
                data.map(({ id, text }, index) => <li onClick={() => tabChange(id)} className={`${id === activeClass ? 'active' : ''}`}>
                    <span>{text}</span>
                    <div className='monthly-sales-report'>
                        <p>Total Earning</p>
                        <h5>
                            INR {Intl.NumberFormat('en-IN').format(`${index===0 ? '34000': '120000'}`)}
                        </h5>
                        <h5>
                            USD {Intl.NumberFormat('en-US').format(`${index===0 ? '1450': '14323'}`)}
                        </h5>
                    </div>
                </li>)
            }
        </ul>
    )
}

export default Tabs;