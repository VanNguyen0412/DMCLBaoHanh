import { useLocation, useNavigate } from 'react-router-dom';
import './Home.css'
import { useState } from 'react';
import { XAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, BarChart, Bar } from 'recharts';
import { FaArrowTrendUp, FaBell, FaRegCircleUser, FaTablet } from 'react-icons/fa6';
import Logo from '../../layout/logo';
import Menu from '../../layout/menu';
import { FaQuestionCircle, FaSearch } from 'react-icons/fa';

const Home = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const navigate = useNavigate();

    const handleCardClick = (index) => {
        const selectedUser = user[index];
        navigate(`/${selectedUser.AppId}`, { state: { user: user } });
        console.info("aaa")
    };

    const data = [
        { name: 'Jan', uv: 3100 },
        { name: 'Feb', uv: 4500 },
        { name: 'Mar', uv: 3700 },
        { name: 'Apr', uv: 2350 },
        { name: 'May', uv: 4590 },
        { name: 'Jun', uv: 3200 },
    ];

    const data1 = [
        { name: 'Jan', uv: 3100 },
        { name: 'Feb', uv: 4500 },
        { name: 'Mar', uv: 3700 },
        { name: 'Apr', uv: 2350 },
        { name: 'May', uv: 4590 },
        { name: 'Jun', uv: 3200 },
        { name: 'Jul', uv: 2200 },
        { name: 'Aug', uv: 3200 },
        { name: 'Sem', uv: 4500 },
        { name: 'Oct', uv: 4100 },
        { name: 'Nov', uv: 3100 },
        { name: 'Dec', uv: 2500 },
    ];

    const dataAccount = [
        { name: 'Jennifer L.', transfer: '1 hours ago', image: 'https://cdn11.dienmaycholon.vn/filewebdmclnew/DMCL21/FE/images/logo.png' },
        { name: 'Joe Black', transfer: '2 hours ago', image: 'https://cdn11.dienmaycholon.vn/filewebdmclnew/DMCL21/FE/images/logo.png' },
        { name: 'Jim Green', transfer: '1 month ago', image: 'https://cdn11.dienmaycholon.vn/filewebdmclnew/DMCL21/FE/images/logo.png' },
        { name: 'Mila Alba', transfer: '2 month ago', image: 'https://cdn11.dienmaycholon.vn/filewebdmclnew/DMCL21/FE/images/logo.png' },
    ]



    function StatCard({ title, amount, pecentage, state }) {
        return (
            <div className="stat-card">
                <div className="stat-header">
                    <h3>{amount}</h3>
                    {state % 2 === 0 ?
                        <span className="percentage-change">
                            <span className="green">{pecentage}% &#9650;</span>
                        </span> :
                        <span className="percentage-change">
                            <span className="red">{pecentage}% &#9660;</span>
                        </span>
                    }
                </div>
                <p>{title}</p>
                <div className="chart-container">
                    <ResponsiveContainer width="100%" height={60}>
                        <BarChart width={150} height={60} data={data}>
                            <Bar dataKey="uv" fill="#003368" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        );
    }

    function BalanceHistory() {
        return (
            <div className="balance-history">
                <div className='balance-header'>
                    <h3>Balance History</h3>
                    <select id="option" className="option">
                        <option value="10">Last 10 days</option>
                        <option value="month">Month</option>
                    </select>
                </div>

                <ResponsiveContainer width="100%" height={200}>
                    <AreaChart data={data1}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <Tooltip />
                        <Area dataKey="uv" stroke="#003368" fill="#8884d8" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        );
    }

    return (
        <div className='main'>
            <Logo />
            <div style={{ display: 'flex' }}>
                <section className='section_body'>
                    <div className='info-user'>
                        <div className='content'>
                            <div className="userAvatar">
                                <FaRegCircleUser size="95%" color='white' />
                            </div>
                            <p>{user[1].TenNguoiDung}</p>
                        </div>
                        <div className='content listIcon'>
                            <FaSearch className="icon" />
                            <FaBell className="icon" />
                            <FaQuestionCircle className="icon" />
                        </div>
                        <hr></hr>
                    </div>
                    <Menu />
                </section>
                <section className='section2_body'>
                    <div className="main-content">

                        <div className="stats-section" >
                            {user.map((a, index) => (
                                <div onClick={() => handleCardClick(index)} >
                                    <StatCard key={index}
                                        title={a.AppId}
                                        amount={a.AppName}
                                        pecentage="23"
                                        state={index}
                                    />
                                </div>
                            ))}
                        </div>
                        <div style={{ display: 'flex' }}>
                            <div className="portfolio-card">
                                <div className="portfolio-header">
                                    <h4>Your Portfolio Balance</h4>
                                    <div className="balance-info">
                                        <h2>$179,626 <span className="green">64% &#9650;</span></h2>
                                    </div>
                                    <p className='bonus'>Overall balance</p>
                                    <div className="portfolio-buttons">
                                        <button className="btn-deposit">Deposit</button>
                                        <button className="btn-withdraw">Withdraw</button>
                                    </div>
                                    <div className="wallet-link">
                                        <a href="#add-wallet">+ Add New Wallet</a>
                                    </div>
                                </div>
                                <div className="portfolio-distribution">
                                    <p className="portfolio-distribution-title">Portfolio Distribution</p>
                                    <div className="distribution-item">
                                        <span>BTC | 8.74</span>
                                        <div className="progress-bar">
                                            <div className="progress-fill btc" style={{ width: "78%" }}></div>
                                            <span>78%</span>
                                        </div>

                                    </div>
                                    <div className="distribution-item">
                                        <span>RPL | 1.23</span>
                                        <div className="progress-bar">
                                            <div className="progress-fill rpl" style={{ width: "48%" }}></div>
                                            <span>48%</span>
                                        </div>

                                    </div>
                                    <div className="distribution-item">
                                        <span>LTE | 0.71</span>
                                        <div className="progress-bar">
                                            <div className="progress-fill lte" style={{ width: "34%" }}></div>
                                            <span>34%</span>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <BalanceHistory />
                        </div>

                        <div style={{ display: 'flex', marginTop: '20px' }}>
                            <div className="account-card">
                                <div className="account-header">
                                    <h4 style={{ marginRight: '20px' }}>Send Money To</h4>
                                    <div className="wallet-link">
                                        <a href='#'>+ Add New Account</a>
                                    </div>
                                </div>
                                <table className="accounts-table">
                                    <thead>
                                        <tr>
                                            <th>Account Holder Name</th>
                                            <th>Last Transfer</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {dataAccount.map(a => (
                                            <tr><td>
                                                <div className="account-holder">
                                                    <img src={a.image} alt={a.name} />
                                                    <span>{a.name}</span>
                                                </div>
                                            </td>
                                                <td>{a.transfer}</td>
                                                <td>
                                                    <a className="pay-button"><FaArrowTrendUp />Pay</a>
                                                </td></tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <div id="calculation-card">
                                <h2><FaTablet size={50} /></h2>
                                <p>Reffer and Get Reward</p>
                                <p>Reffer us to your friends and earn bonus when they join.</p>
                                <input type="submit" value="Invite Friends" className='calculation-submit' />
                            </div>

                            <div className="portfolio-card">
                                <div className='portfolio-header'>
                                    <h4>Currency Calculator</h4>
                                    <p>1.87 BTC equals</p>
                                    <p className='coin'>11466.78 USD</p>
                                    <p>1 BTC = 6718.72 USD</p>
                                    <form action="/action_page.php" className="form">
                                        <div className="form-item">
                                            <label for="fname">From:</label>
                                            <select className="from" name="from">
                                                <option value="BTC">BTC</option>
                                                <option value="ABC">ABC</option>
                                                <option value="usa">USA</option>
                                            </select>
                                        </div>
                                        <div className="form-item">
                                            <label for="lname">To:</label>
                                            <select className="to" name="to">
                                                <option value="australia">Australia</option>
                                                <option value="canada">Canada</option>
                                                <option value="usa">USA</option>
                                            </select>
                                        </div>
                                        <div className="form-item">
                                            <label for="country">Amount (BTC):</label>
                                            <input type="number" className="number" placeholder="0.0" />
                                        </div>

                                    </form>
                                    <input type="submit" value="Transfer Now" />
                                </div>
                            </div>
                        </div>

                    </div>

                </section>
            </div >

        </div >
    )
}
export default Home;