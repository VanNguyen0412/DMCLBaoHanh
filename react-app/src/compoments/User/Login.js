import { useEffect, useState } from 'react';
import './Login.css'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { FaUser, FaLock } from 'react-icons/fa'; // Importing icons
import APIs, { authAPI, basicAuth, endpoints } from '../../configs/APIs';
import axios from 'axios';


const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [site, setSite] = useState([]);
    const [selectedSite, setSelectedSite] = useState(null);
    const [errorMessage, setErrorMessage] = useState(false);
    // console.info(basicAuth)
    const nav = useNavigate()

    const handleSelectChange = (e) => {
        const selectedBranchName = e.target.value;
        const selectedBranch = site.find(s => s.TenChiNhanh === selectedBranchName);
        setSelectedSite(selectedBranch); // Lưu toàn bộ đối tượng chi nhánh vào state
    };


    const login = async (e) => {
        e.preventDefault();

        if (!username || !password) {
            setErrorMessage(true);
            return;
        }
        const response = await axios.post('http://112.78.12.245:8999/sysLogin', {
            "siteid": selectedSite.SiteID,
            "username": username,
            "pass": "4Cw/x5MYCVo=",
            "flag": 11
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.data.success === true) {
            nav("/home");
            localStorage.setItem('user', JSON.stringify(response.data.data));
            localStorage.setItem('siteID', selectedSite.SiteID);
            localStorage.setItem('siteName', selectedSite.TenChiNhanh);
            
        } else {
            Swal.fire("Lỗi", "Nhập sai thông tin. Vui lòng nhập lại.", "error").then(
                () => {
                    nav("/login");
                }
            );
        }
        console.info(response.data)
    }

    const loadSites = async () => {
        if (username) {
            console.log('Loading sites for:', username);
            try {
                const response = await axios.post('http://112.78.12.245:8999/sysLogin', {
                    "siteid": "",            // Dữ liệu gửi đi dạng JSON
                    "username": username,
                    "pass": "",
                    "flag": 9
                }, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                setSite(response.data.data); // Assuming response data is an array of sites
                console.info(site)
            } catch (error) {
                console.error("Error loading sites:", error);
            }
        }
    };


    const handleBlur = () => {
        loadSites();
    };

    return (
        <div className="home">
            <div className="login-container">
                <h1 className="title">ĐĂNG NHẬP</h1>
                <form className="login-form" onSubmit={login}>
                    
                    <div className="input-group">
                        <input
                            type="text"
                            placeholder="Tên đăng nhập"
                            value={username}
                            onBlur={handleBlur}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <span className="input-icon"><FaUser /></span>
                    </div>

                    <div className="input-group">
                        <input
                            type="password"
                            placeholder="Mật khẩu"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <span className="input-icon"><FaLock /></span>
                    </div>
                    <div className="input-group">
                        <select className='site'
                            value={selectedSite ? selectedSite.TenChiNhanh : ''}
                            onChange={handleSelectChange}
                            >
                                <option value="">Chọn Chi Nhánh</option>
                            {site.map((s, index) => (
                                <option key={index} value={s.TenChiNhanh}>{s.TenChiNhanh}</option>
                            ))}
                        </select>
                    </div>

                    <a className="forgot-password1" href="/forgot-password">
                        Quên mật khẩu?
                    </a>
                    
                    <button
                        type="submit"
                        className="login-button"
                        // disabled={loading}
                        onClick={login}
                    >
                        Đăng nhập

                    </button>

                    {errorMessage && (
                        <p className="error-message" style={{ color: "red" }}>
                            Đăng nhập thất bại. Vui lòng thử lại.
                        </p>
                    )}

                </form>
            </div>
        </div>
    )
}
export default Login;