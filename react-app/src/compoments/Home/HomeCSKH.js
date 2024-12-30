import { useLocation } from 'react-router-dom';
import './Home.css'
import { useEffect, useState } from 'react';
import { FaArrowRight, FaBell, FaRegCircleUser } from 'react-icons/fa6';
import Logo from '../../layout/logo';
import Menu from '../../layout/menu';
import { FaQuestionCircle, FaSearch } from 'react-icons/fa';
import BaoHanhOnline from '../Customer/BaoHanhOnline';
import axios from 'axios';
import { IoIosArrowForward } from 'react-icons/io';
import Swal from 'sweetalert2';

const HomeCSKH = () => {
    const user = JSON.parse(localStorage.getItem('user'));;
    const [loading, setLoading] = useState(false)
    const siteId = localStorage.getItem('siteID');
    const [isReloadNeeded, setIsReloadNeeded] = useState(false);

    const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
    const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
    const [showMenu, setShowMenu] = useState(false);

    const [selectOption, setSelOpt] = useState("");

    const [select, setSelect] = useState("option1");
    const options = [
        { label: "Mới tiếp nhận", value: "option1", number: "1" },
        { label: "Chuyển chi nhánh xử lý", value: "option2", number: "2" },
        { label: "Nhận phiếu từ chi nhánh", value: "option3", number: "3" },
        { label: "Chuyển kỹ thuật", value: "option4", number: "4" },
        { label: "Chuyển hãng", value: "option5", number: "5" },
        { label: "Xử lý thành công", value: "option6", number: "6" },
        { label: "Tất cả", value: "option7", number: "7" },
    ]

    const [date1, setDate1] = useState("");
    const [date2, setDate2] = useState("");
    const [maNV, setMaNV] = useState("");
    const [hang, setHang] = useState("");
    const [branch, setBranch] = useState([]);
    const [selectedBranch, setSelectedBranch] = useState("");

    const handleChange = (setter) => (event) => {
        setter(event.target.value);
    };

    const functionActions = [
        { label: "Send app Kỹ Thuật Viên", value: "Send", number: 1 },
        { label: "Gửi email hãng", value: "Email", number: 2 },
        { label: "Lưu ý theo dõi", value: "Note", number: 3 },
        { label: "Kết thúc bảo hành", value: "End", number: 4 },
        { label: "Chuyển chi nhánh", value: "Brand", number: 5 },
    ]

    // const getStatus = (status) => {
    //     switch (status) {
    //         case 0:
    //             return 'Mới Nhập';
    //         case 1:
    //             return 'Đã Đi';
    //         case 2:
    //             return 'Đã Về Công Tác';
    //         case 3:
    //             return 'Xác Nhận Kết Quả';
    //         case 4:
    //             return 'Chuyển Chi Nhánh';
    //         case 5:
    //             return 'Đã Chuyển Hãng Xử Lý API';
    //         default:
    //             return status;
    //     }
    // };

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpen2, setIsModalOpen2] = useState(false);
    const [title, setTitle] = useState("");

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setIsReloadNeeded(true);
    };

    const [table, setTable] = useState([]);
    const [tag2, setTag2] = useState([]);
    const [tag3, setTag3] = useState([]);
    const [tag4, setTag4] = useState([]);

    const handleClick = (value) => {
        setSelect(value);
    };

    const loadTable = async () => { // hiển thị cho tag 1
        setLoading(true)
        const payload = JSON.stringify({
            "flag": 5,
            "detail": [],
            "SiteId": "S038"
        })
        try {
            const res = await axios.post("http://112.78.12.245:8999/I_BHONL", payload, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            setTable(res.data.data)
            console.info(table)
        } catch (error) {
            console.info(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        loadTable();
    }, []);

    useEffect(() => {
        if (isReloadNeeded) {
            loadTable();
            setIsReloadNeeded(false);
        }
    }, [isReloadNeeded]);

    const handleTag2 = async () => { // hiển thị cho tag 2
        setLoading(true)
        const payload = JSON.stringify({
            "SiteId": "S038",
            "flag": 8,
            "detail": []
        })
        try {
            let res = await axios.post("http://112.78.12.245:8999/I_BHONL", payload, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            setTag2(res.data.data)


        } catch (error) {
            console.info(error)
        } finally {
            setLoading(false)
        }
    }

    const handleTag4 = async () => { // hiển thị cho tag 4
        setLoading(true)
        const payload = JSON.stringify({
            "SiteId": "S038",
            "TrangThaiXuLy": 5,
            "flag": 9,
            "detail": []
        })
        try {
            let res = await axios.post("http://112.78.12.245:8999/I_BHONL", payload, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            setTag4(res.data.data)
        } catch (error) {
            console.info(error)
        } finally {
            setLoading(false)
        }
    }

    const handleTag3 = async () => {  // hiển thị cho tag 3
        setLoading(true)
        const payload = JSON.stringify({
            "SiteId": siteId,
            "TrangThaiXuLy": 1,
            "flag": 9,
            "detail": []
        })
        try {
            let res = await axios.post("http://112.78.12.245:8999/I_BHONL", payload, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            setTag3(res.data.data)
            console.info(res.data)
        } catch (error) {
            console.info(error)
        } finally {
            setLoading(false)
        }
    }

    const handleSubmit = async (row) => { // chấp nhận chuyển chi nhánh
        setLoading(true)
        const payload = JSON.stringify({
            "SoPhieu": row.SoPhieu,
            "SiteId": siteId,
            "TrangThaiXuLy": 2,
            "flag": 7,
            "detail": []
        })
        try {
            let res = await axios.post("http://112.78.12.245:8999/I_BHONL", payload, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (res.data.success === true) {
                Swal.fire("Thành công", "Đã cập nhập thành công", "success").then(
                    () => {
                        handleTag3();
                    }
                );

            }
        } catch (error) {
            console.info(error)
        } finally {
            setLoading(false)
        }
    }

    const handleCheckboxChange = (event, rowData) => {  // chọn checkbox cho bảng tag 1
        const { checked } = event.target;
        if (checked) {
            setSelectedCheckboxes((prev) => [...prev, rowData.SoPhieu]);
        } else {
            setSelectedCheckboxes((prev) => prev.filter((soca) => soca !== rowData.SoPhieu));
        }
    };


    const handleContextMenu = (event) => {  // sự kiện nhấn chuột phải
        event.preventDefault();
        if (selectedCheckboxes.length > 0) {
            setMenuPosition({ x: event.pageX, y: event.pageY });
            setShowMenu(true);
        }
    };

    const handleMenuClick = (action, number) => {  // sự kiện chọn menu
        setSelOpt(number)
        setShowMenu(false);
        setIsModalOpen2(true);
        setTitle(action);
    };

    const handleOutsideClick = () => {  // tắt modal menu của nhấn chuột phải
        setShowMenu(false);
        setSelOpt("");
    };


    const closeModal2 = () => {
        setIsModalOpen2(false);
        setSelOpt("");
    };

    const loadBranch = async () => {  // load chi nhánh để chuyển đổi cho tag 1
        try {
            const response = await axios.post('http://112.78.12.245:8999/sysLogin', {
                "siteid": "",            // Dữ liệu gửi đi dạng JSON
                "username": "admin",
                "pass": "",
                "flag": 9
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            setBranch(response.data.data);
            // console.info(branch)
        } catch (error) {
            console.error(`Error fetching data for flag:`, error);
            throw error; // Ném lỗi ra để xử lý bên ngoài nếu cần
        }
    };



    useEffect(() => {
        loadBranch();
    }, [user])

    const getBranchName = (maChiNhanh) => {
        const bra = branch.find((b) => b.SiteID === maChiNhanh);
        return bra ? bra.TenChiNhanh : "Không tìm thấy";
    };

    const handleSaveBranch = async () => { // lưu chuyển đổi chi nhánh xử lý
        setLoading(true)
        const payload = JSON.stringify({
            "SoPhieu": selectedCheckboxes[0],
            "SiteId": selectedBranch,
            "TrangThaiXuLy": 1,
            "flag": 7,
            "detail": []
        })
        try {
            let res = await axios.post('http://112.78.12.245:8999/I_BHONL', payload,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            if (res.data.success === true) {
                Swal.fire("Thành công", "Đã chuyển chi nhánh thành công.", "success").then(
                    () => {
                        setSelect("option2");
                        closeModal2();
                    }
                );
            }
            console.info(payload)
            console.info(res.data)
        } catch (error) {
            console.info(error)
        } finally {
            setLoading(false)
        }
    }

    const handleSendTech = async () => {
        setLoading(true)
        const payload = JSON.stringify({
            "SoPhieu": selectedCheckboxes[0],
            "TrangThaiXuLy": 2,
            "MaNhanVien": maNV,
            "flag": 7,
            "detail": []
        })
        try {
            let res = await axios.post('http://112.78.12.245:8999/I_BHONL', payload,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            if (res.data.success === true) {
                Swal.fire("Thành công", "Đã gửi cho kỹ thuật viên.", "success").then(
                    () => {
                        closeModal2();
                    }
                );
            }
            console.info(payload)
            console.info(res.data)

        } catch (error) {
            console.info(error)
        } finally {
            setLoading(false)
        }
    }


    // if (loading) {
    //     return (
    //         < div className="spinner-container" >
    //             <div className="spinner"></div>
    //         </div >
    //     )
    // }

    return (
        <div className='main'>
            <Logo message={"Thông Tin Tiếp Nhận"} />
            <div style={{ display: 'flex' }}>
                <section className='section_body'>
                    <div className='info-user'>
                        <div className='content'>
                            <div className="userAvatar">
                                <FaRegCircleUser color='white' />
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
                    {isModalOpen && (
                        <div className="modal">
                            <div className="modal-content">
                                <span className="close" onClick={closeModal}>&times;</span>
                                <BaoHanhOnline onBack={closeModal} />
                            </div>
                        </div>
                    )}
                    {selectOption === 1 && (
                        <div className="modal">
                            <div className="modal-content" style={{ justifyContent: 'center', width: '30%', padding: 0 }}>
                                <div className='opt2' style={{ margin: 0 }}>
                                    <div className="title-card">
                                        <span className="close1" onClick={closeModal2}>&times;</span>
                                        <div className="logo-message1" style={{ color: 'white' }}>
                                            {title}
                                        </div>
                                    </div>
                                    <div style={{ padding: '0 20px', marginBottom: '5px' }}>
                                        <label>Mã Nhân Viên:</label>
                                        <input type="text" className="mnv" value={maNV}
                                            onChange={handleChange(setMaNV)}
                                        />
                                        <button style={{ width: '100%' }}
                                            onClick={handleSendTech}>Gửi</button>
                                    </div>

                                </div>
                            </div>
                        </div>
                    )}
                    {selectOption === 2 && (
                        <div className="modal">
                            <div className="modal-content" style={{ justifyContent: 'center', width: '30%', padding: 0 }}>
                                <div className='opt2' style={{ margin: 0 }}>
                                    <div className="title-card">
                                        <span className="close1" onClick={closeModal2}>&times;</span>
                                        <div className="logo-message1" style={{ color: 'white' }}>
                                            {title}
                                        </div>
                                    </div>
                                    <div style={{ padding: '0 20px', marginBottom: '5px' }}>
                                        <label>Chọn Hãng:</label>
                                        <input type="text" className="mnv" value={hang}
                                            onChange={handleChange(setHang)}
                                        />
                                        <button
                                            style={{ width: '100%' }}>Gửi</button>
                                    </div>

                                </div>
                            </div>
                        </div>
                    )}
                    {selectOption === 3 && (
                        <div className="modal">
                            <div className="modal-content" style={{ justifyContent: 'center', width: '30%', padding: 0 }}>
                                <div className='opt2' style={{ margin: 0 }}>
                                    <div className="title-card">
                                        <span className="close1" onClick={closeModal2}>&times;</span>
                                        <div className="logo-message1" style={{ color: 'white' }}>
                                            {title}
                                        </div>
                                    </div>
                                    <div style={{ padding: '0 20px', marginBottom: '5px' }}>
                                        <div>
                                            <label>Chọn Hãng:</label>
                                            <input type="text" className="mnv" value={hang}
                                                onChange={handleChange(setHang)}
                                            />
                                        </div>
                                        <div>
                                            <label>Danh sách:</label>
                                            <select className="opt3" value=""
                                            // onChange={handleChange(setSelectedProvince)}
                                            >
                                                <option value="">-- Danh sách --</option>
                                                <option value="">option1</option>
                                                <option value="">option2</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {selectOption === 5 && (
                        <div className="modal">
                            <div className="modal-content" style={{ justifyContent: 'center', width: '30%', padding: 0 }}>
                                <div className='opt2' style={{ margin: 0 }}>
                                    <div className="title-card">
                                        <span className="close1" onClick={closeModal2}>&times;</span>
                                        <div className="logo-message1" style={{ color: 'white' }}>
                                            {title}
                                        </div>
                                    </div>
                                    <div style={{ padding: '0 20px', marginBottom: '5px' }}>
                                        <label>Chọn chi nhánh:</label>
                                        <select className="opt3" value={selectedBranch}
                                            onChange={handleChange(setSelectedBranch)}
                                        >
                                            <div>
                                                {branch && branch.map((b) => (
                                                    <option key={b.SiteID} value={b.SiteID}>
                                                        {b.TenChiNhanh}</option>
                                                ))}
                                            </div>
                                        </select>
                                        <button onClick={handleSaveBranch}
                                            style={{ width: '100%' }}>Lưu</button>
                                    </div>

                                </div>
                            </div>
                        </div>
                    )}
                    <div className="main-content">
                        <div className='content-center'>
                            <div style={{ marginTop: '2px' }}>
                                <div className="segmented-card">

                                    {options.map((option) => (
                                        <div style={{ display: "flex", position: "relative" }}>
                                            <button
                                                key={option.value}
                                                className={`segmented-button ${select === option.value ? "active" : ""}`}
                                                onClick={() => handleClick(option.value)}
                                            >
                                                {option.label}
                                            </button>
                                            <div className={`tag-button ${select === option.value ? "active" : ""}`}>
                                                <p>{option.number}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            {select === "option1" && (
                                <div style={{ display: 'flex' }}>
                                    <div className="customer-card">
                                        {showMenu && (
                                            <ul
                                                className="context-menu"
                                                style={{
                                                    position: "absolute",
                                                    top: menuPosition.y,
                                                    left: menuPosition.x,
                                                    backgroundColor: "white",
                                                    border: "1px solid #ccc",
                                                    listStyle: "none",
                                                    padding: "10px",
                                                    zIndex: 1000,
                                                }}
                                            >
                                                {functionActions.map((f) => (
                                                    <li
                                                        onClick={() => handleMenuClick(`${f.label}`, f.number)}
                                                        style={{ padding: "2px", cursor: "pointer" }}
                                                    >
                                                        {f.label}
                                                        <hr></hr>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                        {loading ? (
                                            < div className="spinner-container" >
                                                <div className="spinner"></div>
                                            </div >
                                        ) :
                                            <div>
                                                <div className="seg-card" onClick={handleOutsideClick}>
                                                    <div>
                                                        <label>Ngày Nhận:</label>
                                                        <input type="date" name="ngayNhan" value={date1}
                                                            onChange={handleChange(setDate1)}
                                                        />
                                                    </div>
                                                    <div className='arrow'><IoIosArrowForward /><IoIosArrowForward /><IoIosArrowForward /></div>
                                                    <div>
                                                        <label>Ngày Xử Lý:</label>
                                                        <input type="date" name="ngayXuLy" value={date2}
                                                            onChange={handleChange(setDate2)}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="account-header">
                                                    <h4 style={{ marginRight: '20px' }}></h4>
                                                    <div className="wallet-link">
                                                        <button onClick={openModal}>+ Thêm</button>
                                                    </div>
                                                </div>
                                                <div className="accounts-table-container">
                                                    <div className="table-scroll">
                                                        <table className="customer-table" onContextMenu={handleContextMenu}>
                                                            <thead>
                                                                <tr>
                                                                    <th>STT</th>
                                                                    <th style={{ width: '55px' }}>Chọn Send App</th>
                                                                    <th style={{ width: '55px' }}>Check Ưu tiên App</th>
                                                                    <th>Số Ca</th>
                                                                    <th>Số Biên Nhận</th>
                                                                    <th>Chi Nhánh Ra BN</th>
                                                                    <th>Ngày Giờ Xử Lý</th>
                                                                    <th>Lý Do Điều Chuyển</th>
                                                                    <th>Kết Quả</th>
                                                                    <th>Tên Khách Hàng</th>
                                                                    <th>Địa Chỉ</th>
                                                                    <th>Điện Thoại</th>
                                                                    <th>Ngày Nhận</th>
                                                                    <th>Trạng Thái Đơn</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {/* <tr>
                                                            <td><input type="checkbox" name='sendApp'
                                                                onChange={(event) => handleCheckboxChange(event, "abc")}
                                                            /></td>
                                                            <td><input type="checkbox" name='checkApp'
                                                                onChange={(event) => handleCheckboxChange(event, "abc")}
                                                            /></td>
                                                        </tr> */}
                                                                {table && table.map((t, index) => (
                                                                    <tr key={index}>
                                                                        <td>{t.STT}</td>
                                                                        <td><input type="checkbox" name='sendApp'
                                                                            onChange={(event) => handleCheckboxChange(event, t)}
                                                                        /></td>
                                                                        <td><input type="checkbox" name='checkApp'
                                                                            onChange={(event) => handleCheckboxChange(event, t)}
                                                                        /></td>
                                                                        <td>{t.SOCA}</td>
                                                                        <td>{t.SoBienNhan}</td>
                                                                        <td>{t.ChiNhanhTiepNhan} - {getBranchName(t.ChiNhanhTiepNhan)}</td>
                                                                        <td>{t.NgayGioXuLy}</td>
                                                                        <td>{ }</td>
                                                                        <td>{t.KetQua}</td>
                                                                        <td>{t.TenKhachHang}</td>
                                                                        <td>{t.DiaChi}</td>
                                                                        <td>{t.DienThoai}</td>
                                                                        <td>{t.NgayNhan}</td>
                                                                        <td>{t.TrangThaiXuLy}</td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>}
                                    </div>

                                </div>
                            )}

                            {select === "option2" && (
                                <div>
                                    <div className="customer-card">
                                        <div className="account-header">
                                            <h4 style={{ marginRight: '20px' }}></h4>
                                            <div className="wallet-link">
                                                <button onClick={handleTag2}>Lấy dữ liệu</button>
                                            </div>
                                        </div>
                                        {loading ? (
                                            < div className="spinner-container" >
                                                <div className="spinner"></div>
                                            </div >
                                        ) :
                                            <div className="accounts-table-container" >
                                                <div className="table-scroll">
                                                    <table className="customer-table" >
                                                        <thead>
                                                            <tr>
                                                                <th>STT</th>
                                                                <th>Số Ca</th>
                                                                <th>Số Biên Nhận</th>
                                                                <th>Chi Nhánh Ra BN</th>
                                                                <th>Ngày Giờ Xử Lý</th>
                                                                <th>Lý Do Điều Chuyển</th>
                                                                <th>Kết Quả</th>
                                                                <th>Tên Khách Hàng</th>
                                                                <th>Địa Chỉ</th>
                                                                <th>Điện Thoại</th>
                                                                <th>Ngày Nhận</th>
                                                                <th>Trạng Thái Đơn</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {tag2 && tag2.map((t, index) => (
                                                                <tr key={index}>
                                                                    <td>{t.STT}</td>
                                                                    <td>{t.SOCA}</td>
                                                                    <td>{t.SoBienNhan}</td>
                                                                    <td>{t.ChiNhanhTiepNhan}  - {getBranchName(t.ChiNhanhTiepNhan)}</td>
                                                                    <td>{t.NgayGioXuLy}</td>
                                                                    <td>{ }</td>
                                                                    <td>{t.KetQua}</td>
                                                                    <td>{t.TenKhachHang}</td>
                                                                    <td>{t.DiaChi}</td>
                                                                    <td>{t.DienThoai}</td>
                                                                    <td>{t.NgayNhan}</td>
                                                                    <td>{t.TrangThaiXuLy}</td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        }
                                    </div>
                                </div>
                            )}
                            {select === "option3" && (
                                <div>
                                    <div className="customer-card">
                                        <div className="account-header">
                                            <h4 style={{ marginRight: '20px' }}></h4>
                                            <div className="wallet-link">
                                                <button onClick={handleTag3}>Lấy dữ liệu</button>
                                            </div>
                                        </div>
                                        {loading ? (
                                            < div className="spinner-container" >
                                                <div className="spinner"></div>
                                            </div >
                                        ) :
                                            <div className="accounts-table-container">
                                                <div className="table-scroll">
                                                    <table className="customer-table" >
                                                        <thead>
                                                            <tr>
                                                                <th></th>
                                                                <th>STT</th>
                                                                <th>Số Ca</th>
                                                                <th>Số Biên Nhận</th>
                                                                <th>Chi Nhánh Ra BN</th>
                                                                <th>Ngày Giờ Xử Lý</th>
                                                                <th>Lý Do Điều Chuyển</th>
                                                                <th>Kết Quả</th>
                                                                <th>Tên Khách Hàng</th>
                                                                <th>Địa Chỉ</th>
                                                                <th>Điện Thoại</th>
                                                                <th>Ngày Nhận</th>
                                                                <th>Trạng Thái Đơn</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {tag3 &&
                                                                tag3.map((t, index) => (
                                                                    <tr key={index}>
                                                                        <td>
                                                                            <div className="account-header">
                                                                                <button onClick={() => handleSubmit(t)}
                                                                                >Chấp nhận</button>
                                                                            </div>
                                                                        </td>
                                                                        <td>{t.STT}</td>
                                                                        <td>{t.SOCA}</td>
                                                                        <td>{t.SoBienNhan}</td>
                                                                        <td>{t.ChiNhanhTiepNhan}  - {getBranchName(t.ChiNhanhTiepNhan)}</td>
                                                                        <td>{t.NgayGioXuLy}</td>
                                                                        <td>{ }</td>
                                                                        <td>{t.KetQua}</td>
                                                                        <td>{t.TenKhachHang}</td>
                                                                        <td>{t.DiaChi}</td>
                                                                        <td>{t.DienThoai}</td>
                                                                        <td>{t.NgayNhan}</td>
                                                                        <td>{t.TrangThaiXuLy}</td>

                                                                    </tr>
                                                                ))
                                                                // 
                                                                // <tr>
                                                                //     <td>
                                                                //         <div className="account-header1">
                                                                //             <button>Chấp nhận</button>
                                                                //         </div>
                                                                //     </td>
                                                                //     <td></td><td></td><td></td><td></td><td></td><td></td>
                                                                //     <td></td> <td></td><td></td><td></td><td></td><td></td>
                                                                // </tr>
                                                            }
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        }
                                    </div>
                                </div>
                            )}
                            {select === "option4" && (
                                <div>
                                    <div className="customer-card">
                                        <div className="account-header">
                                            <h4 style={{ marginRight: '20px' }}></h4>
                                            <div className="wallet-link">
                                                <button onClick={handleTag4}>Lấy dữ liệu</button>
                                            </div>
                                        </div>
                                        {loading ? (
                                            < div className="spinner-container" >
                                                <div className="spinner"></div>
                                            </div >
                                        ) :
                                            <div className="accounts-table-container" >
                                                <div className="table-scroll">
                                                    <table className="customer-table" >
                                                        <thead>
                                                            <tr>
                                                                <th>STT</th>
                                                                <th>Số Ca</th>
                                                                <th>Số Biên Nhận</th>
                                                                <th>Chi Nhánh Ra BN</th>
                                                                <th>Ngày Giờ Xử Lý</th>
                                                                <th>Lý Do Điều Chuyển</th>
                                                                <th>Kết Quả</th>
                                                                <th>Tên Khách Hàng</th>
                                                                <th>Địa Chỉ</th>
                                                                <th>Điện Thoại</th>
                                                                <th>Ngày Nhận</th>
                                                                <th>Trạng Thái Đơn</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {tag4 && tag4.map((t, index) => (
                                                                <tr key={index}>
                                                                    <td>{t.STT}</td>
                                                                    <td>{t.SOCA}</td>
                                                                    <td>{t.SoBienNhan}</td>
                                                                    <td>{t.ChiNhanhTiepNhan}  - {getBranchName(t.ChiNhanhTiepNhan)}</td>
                                                                    <td>{t.NgayGioXuLy}</td>
                                                                    <td>{ }</td>
                                                                    <td>{t.KetQua}</td>
                                                                    <td>{t.TenKhachHang}</td>
                                                                    <td>{t.DiaChi}</td>
                                                                    <td>{t.DienThoai}</td>
                                                                    <td>{t.NgayNhan}</td>
                                                                    <td>{t.TrangThaiXuLy}</td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        }
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            </div >
        </div >
    )
}
export default HomeCSKH;
