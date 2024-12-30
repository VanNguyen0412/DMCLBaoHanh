import { useLocation } from "react-router-dom";
import './BaoHanhOnline.css';
import { FaPlus } from "react-icons/fa6";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import moment from 'moment';

const BaoHanhOnline = ({onBack}) => {
    const user = JSON.parse(localStorage.getItem('user'));
    const siteId = localStorage.getItem('siteID');
    const siteName = localStorage.getItem('siteName');
    
    const [loading, setLoading] = useState(false);

    const [date1, setDate1] = useState("");
    const [money, setMoney] = useState("");
    const [serial, setSerial] = useState("");
    const [note, setNote] = useState("");
    const [status, setStatus] = useState("");
    const [date2, setDate2] = useState("");

    const [soBienNhan, setSoBienNhan] = useState("");
    const [info, setInfo] = useState([]);

    const [province, setProvince] = useState([]);

    const [receive, setReceive] = useState([]);
    const [service, setService] = useState([]);
    const [branch, setBranch] = useState([]);
    const [selectedReceive, setSelectedReceive] = useState("");
    const [selectedService, setSelectedService] = useState("");
    const [selectedBranch, setSelectedBranch] = useState("");

    const [goods, setGood] = useState([]);
    const [selectedGood, setSelectedGood] = useState("");

    const [supply, setSupply] = useState([]);
    const [selectedSupply, setSelectedSupply] = useState("");

    const [selectedProvince, setSelectedProvince] = useState("");

    const [ward, setWard] = useState([]);
    const [selectedWard, setSelectedWard] = useState("");

    const [district, setDistrict] = useState([]);
    const [selectedDistrict, setSelectedDistrict] = useState("");

    const [selectedSite, setSelectedSite] = useState("");

    const [checkboxState, setCheckboxState] = useState({
        baoHanh: 0,
        tinhPhi: 0,
        suaLai: 0,
        chuyenVeTTBH: 0,
        suaChuaTaiNha: 0,
    });

    const [soPhieu, setSoPhieu] = useState("");

    const generateRandomString = (length) => {
        const characters = "0123456789"; 
        let result = "";
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return result;
    };

    useEffect(() => {
        const randomString = generateRandomString(6); 
        const customString = `${siteId}BHOL${randomString}`; 
        setSoPhieu(customString);
    })


    const loadInfo = async () => {  // load thông tin khách hàng từ số biên nhận
        try {
            const response = await axios.post('http://112.78.12.245:8999/getSaleReceipt', {
                "sobiennhan": soBienNhan,
                "flag": 3
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const result = response.data.data[0]
            setInfo(result)
            console.info(info)
        } catch (error) {
            console.error("Error loading sites:", error);
        }
    };

    const fetchDataByFlag = async (flag) => {  // xử lý các thông tin cho selectbox với cờ tương ứng
        try {
            const response = await axios.post(
                'http://112.78.12.245:8999/MN_NHANTU',
                {
                    "KeyWord": "",
                    "flag": flag,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            return response.data.data;
        } catch (error) {
            console.error(`Error fetching data for flag ${flag}:`, error);
            throw error; // Ném lỗi ra để xử lý bên ngoài nếu cần
        }
    };

    const loadProvince = async () => { // load tỉnh thành
        try {
            const provinces = await fetchDataByFlag(5); // Gọi API với flag = 5
            setProvince(provinces);
        } catch (error) {
            console.error("Error loading province:", error);
        }
    };

    const loadReceive = async () => { // load cho select box nhận từ
        try {
            const receives = await fetchDataByFlag(4);
            setReceive(receives);
            // console.info(receive)
        } catch (error) {
            console.error("Error loading receives:", error);
        }
    };
 
    const loadService = async () => {  // load dịch vụ
        try {
            const services = await fetchDataByFlag(9);
            setService(services);
        } catch (error) {
            console.error("Error loading services type:", error);
        }
    };

    const loadBranch = async () => { // load chi nhánh
        try {
            const branchs = await fetchDataByFlag(8);
            setBranch(branchs);
        } catch (error) {
            console.error("Error loading branchs:", error);
        }
    };

    const loadGood = async () => {  // load ngành hàng
        try {
            const goods = await fetchDataByFlag(10);
            setGood(goods);
        } catch (error) {
            console.error("Error loading goods:", error);
        }
    };

    useEffect(() => {
        loadProvince();
        loadReceive();
        loadService();
        loadBranch();
        loadGood();
        setSelectedSite(siteId);
    }, [])

    const getBranchName = (maChiNhanh) => {
        const bra = branch.find((b) => b.MaChiNhanh === maChiNhanh);
        return bra ? bra.TenChiNhanh : "Không tìm thấy"; 
    };

    const loadDistrict = async () => {  // load quận huyện từ tỉnh thành
        if (selectedProvince) {
            try {
                const response = await axios.post('http://112.78.12.245:8999/MN_NHANTU', {
                    "KeyWord": selectedProvince,
                    "flag": 6
                }, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                const result = response.data.data
                setDistrict(result);
                console.info(selectedProvince)
            } catch (error) {
                console.error("Error loading sites:", error);
            }
        } else {
            console.info("Chưa chọn tỉnh thành.")
            Swal.fire("Lỗi", "Chưa chọn tỉnh thành. Vui lòng chọn tỉnh thành.", "error");
        }
    };

    useEffect(() => {
        if (selectedProvince) {
            loadDistrict();
        }
    }, [selectedProvince])

    const handleBlur = () => {
        if (soBienNhan) {
            loadInfo();
        }
    };

    const loadWard = async () => {  // load phường xã từ quận huyện
        if (selectedDistrict) {
            try {
                const response = await axios.post('http://112.78.12.245:8999/MN_NHANTU', {
                    "KeyWord": selectedDistrict,
                    "flag": 7
                }, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                const result = response.data.data
                setWard(result);
            } catch (error) {
                console.error("Error loading:", error);
            }
        } else {
            console.info("Chưa chọn quận huyện.")
            Swal.fire("Lỗi", "Chưa chọn quận huyện. Vui lòng chọn quận huyện.", "error");
        }
    };

    useEffect(() => {
        if (selectedDistrict) {
            loadWard();
        }
    }, [selectedDistrict])

    const handleChange = (setter) => (event) => {
        setter(event.target.value);
    };

    const loadSupply = async () => { // load nhà cung cấp từ ngành hàng
        if (selectedGood) {
            try {
                const response = await axios.post('http://112.78.12.245:8999/MN_NHANTU', {
                    "KeyWord": selectedGood,
                    "flag": 11
                }, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                const result = response.data.data
                setSupply(result);
            } catch (error) {
                console.error("Error loading supplier:", error);
            }
        } else {
            console.info("Chưa chọn ngành hàng.")
            Swal.fire("Lỗi", "Chưa chọn ngành hàng. Vui lòng chọn ngành hàng.", "error");
        }
    };

    useEffect(() => {
        if (selectedGood) {
            loadSupply();
        }
    }, [selectedGood])

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const handleCheckboxChange = (name) => {
        const newState = {
            ...Object.keys(checkboxState).reduce((acc, key) => {
                acc[key] = 0;
                return acc;
            }, {}),
            [name]: 1,
        };
        setCheckboxState(newState);
        console.log("Trạng thái cập nhật:", newState);
        const selectedCheckbox = Object.keys(newState).find(
            (key) => newState[key] === 1
        );
        console.log("Đã chọn:", selectedCheckbox);
    };


    const handleSaveInfo = async () => {
        setLoading(true)
        const payload = JSON.stringify({
            // "SoPhieu": "S016BHOL556536463",
            "SoPhieu": soPhieu,
            "SoBienNhan": soBienNhan,
            "TenKhachHang": info.TenKhachHang,
            "DiaChi": info.DiaChi,
            "DienThoai": info.DienThoai,
            "NgayNhan": date1,
            "NgayMuaHang": info.NgayMua,
            "LoaiHangID": info.MaLoaiHang,
            "TinhTrang": status,
            "GhiChu": note,
            "Status": 0,
            "SiteID": selectedBranch || siteId,
            "SiteCN": selectedBranch || siteId,
            "MaThongTin": selectedReceive,
            "Active": 1,
            "CreateBy": moment().format('YYYY-MM-DD HH:mm:ss'),
            "Computer": "em1000006983",
            "StatusBaoHanh": checkboxState.baoHanh,
            "StatusTinhPhi": checkboxState.tinhPhi,
            "StatusSuaLai": checkboxState.suaLai,
            "StatusChuyenVeTTBH": checkboxState.chuyenVeTTBH,
            "StatusSuaChuaTaiNha": checkboxState.suaChuaTaiNha,
            "MaNhanVien": "",
            "ThoiGianDi": moment().format('YYYY-MM-DD HH:mm:ss'),
            "ThoiGianVe": moment().format('YYYY-MM-DD HH:mm:ss'),
            "SoKM": 0,
            "SoLanIn": 0,
            "KetQuaId": "",
            "TienPhiCtac": money,
            "NgayGioXuLy": date2,
            "GhiChuChuyen": "",
            "SiteIdSbn": info.SiteId,
            "TrangThaiSend": 0,
            "ThoiGianChapNhanBaoHanh": moment().format('YYYY-MM-DD'),
            'Point': 0,
            "LoaiDichVuId": selectedService,
            "NoiDungXuLy": "",
            "UserKetThucPhieu": user[1].TenNguoiDung,
            "CityName": province.find(b => b.CityID === selectedProvince)?.CityName || "",
            "DistrictName": district.find(b => b.QuanHuyenID === selectedDistrict)?.QuanHuyenName || "",
            "WardsName": ward.find(b => b.WardID === selectedWard)?.WardName || "",
            "WardID": selectedWard,
            "StatusViewHHBH": 0,
            "GhiChuDuyetHetHanBH": "",
            "GhiChuDieuPhoi": "",
            "SOPHUTAITT": 0,
            "SOPHUTTXL": 0,
            "TrangThaiXuLy": 0,
            "flag": 1,
            "detail": [
                {
                    "SoPhieu": soPhieu,
                    "MaHang": info.MaHang,
                    "TenHang": info.TenHang,
                    "Serial": serial,
                    "SL": info.SL,
                    "NCCID": selectedSupply,
                    "Note": note,
                    "VendorId": selectedSupply,
                    "VendorName": supply.find(b => b.NCCID === selectedSupply)?.NCCName || "",
                    "MC": info.MaLoaiHang,
                    "MCName": info.TenLoaiHang,
                    "NganhHangId": selectedGood,
                    "NganhHangName": goods.find(b => b.NganhHangID === selectedGood)?.NganhHangName || "",
                    "flag": 2
                }
            ]
        })
        try {
            const response = await axios.post("http://112.78.12.245:8999/I_BHONL", payload, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.info(response.data.data)
            console.info(payload)
            if (response.data.success === true) {
                Swal.fire("Thành công", "Đã lưu thành công.", "success").then(
                    () => {
                        onBack();
                    }
                );
                
            }
        } catch (error) {
            console.error("Error for saving:", error);
        } finally {
            setLoading(false)
        }
    }

    const handleClick = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 3000);
        onBack();
    };

    // if (loading) {
    //     return (
    //         < div className="spinner-container" >
    //             <div className="spinner"></div>
    //         </div >
    //     )
    // }

    return (
        <div className="customer">
            <div className="repair-form">

                <div >
                    <div className="flex button">
                        <button onClick={handleSaveInfo}>Lưu</button>
                        <button onClick={handleClick}>Không Lưu</button>
                    </div>
                </div>
                <div className="flex">
                    <div className="form-section" >
                        {/* <span>Thông tin đơn hàng</span> */}
                        <div className="flex">
                            <div className="flexItem">
                                <label>Số PBN:</label>
                                <input type="text" name="soPBN" placeholder="Số PBN"
                                    value={soBienNhan}
                                    onBlur={handleBlur}
                                    onChange={(e) => setSoBienNhan(e.target.value)} />
                            </div>
                            <div className="flexItem" style={{ width: '150px' }} >
                                <label>Mã Loại Hàng:</label>
                                <input type="text" name="maLH" placeholder="Mã Loại Hàng"
                                    value={info?.MaLoaiHang || ''}
                                    readOnly />
                            </div>
                            <div className="flexItem" style={{ width: '150px' }}>
                                <label>Tên Loại Hàng:</label>
                                <input type="text" name="maLH" placeholder="Tên Loại Hàng" value={info?.TenLoaiHang || ''} readOnly />
                            </div>

                        </div>
                        <div className="flex">
                            <div className="flexItem">
                                <label>Nhận Từ:</label>
                                <select name="loaiHang" value={selectedReceive}
                                    onChange={handleChange(setSelectedReceive)}>
                                    <option value="">-- Tất cả --</option>
                                    {receive && receive.map((p) => (
                                        <option key={p.MaThongTin} value={p.MaThongTin}>{p.TenThongTin}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="flexItem">
                                <label>Ngày Mua Hàng:</label>
                                <input type="date" name="ngayMuaHang" value={formatDate(info?.NgayMua)} readOnly />
                            </div>
                        </div>
                        <div className="flex">
                            <div className="flexItem">
                                <label>Ngày Nhận:</label>
                                <input type="date" name="ngayMuaHang" value={date1}
                                    onChange={handleChange(setDate1)} />
                            </div>
                            <div className="flexItem">
                                <label>Ngày Giờ Hẹn Xử Lý:</label>
                                <input type="datetime-local" name="ngayHenXuLy" value={date2}
                                    onChange={handleChange(setDate2)} />
                            </div>
                        </div>
                    </div>

                    <div className="form-section">
                        {/* <span>Thông tin khách hàng</span> */}
                        <div className="flex">
                            <div className="flexItem">
                                <label>Tên khách hàng:</label>
                                <input type="text" name="tenKhachHang" value={info?.TenKhachHang || ''} placeholder="Tên khách hàng" readOnly />
                            </div>
                            <div className="flexItem small">
                                <label>Điện thoại:</label>
                                <input type="text" name="dienThoai" value={info?.DienThoai || ''} placeholder="Điện thoại" readOnly />
                            </div>

                        </div>
                        <div className="flexItem">
                            <label>Địa chỉ:</label>
                            <input type="text" name="diaChi" value={info?.DiaChi || ''} placeholder="Địa chỉ" readOnly />
                        </div>
                        <div>
                            <div className="flex">
                                <div className="flexrow">
                                    <label>Địa chỉ:</label>
                                    <select name="TinhThanh" value={selectedProvince}
                                        onChange={handleChange(setSelectedProvince)} >
                                        <option value="">-- Tỉnh Thành --</option>
                                        {province && province.map((p) => (
                                            <option key={p.CityID} value={p.CityID}>{p.CityName}</option>
                                        ))}

                                    </select>
                                </div>

                                <div className="flexrow">
                                    <select name="QuanHuyen"
                                        value={selectedDistrict}
                                        onChange={handleChange(setSelectedDistrict)}
                                    >
                                        <option value="">-- Quận Huyện --</option>
                                        {district && district.map((d) => (
                                            <option key={d.QuanHuyenID} value={d.QuanHuyenID}>{d.QuanHuyenName}</option>
                                        ))}

                                    </select>
                                </div>

                                <div className="flexrow">
                                    <select name="PhuongXa"
                                        value={selectedWard}
                                        onChange={handleChange(setSelectedWard)}
                                    >
                                        <option value="">-- Phường Xã --</option>
                                        {ward && ward.map((d) => (
                                            <option key={d.WardID} value={d.WardID}>{d.WardName}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="form-section">
                    {/* <span>Thông tin sửa chữa</span> */}
                    <div className="check">
                        <label>Chế độ sửa chữa:</label>
                        <div className="checkbox">
                            {Object.keys(checkboxState).map((key) => (
                                <div key={key}>
                                    <input
                                        type="checkbox"
                                        name={key}
                                        checked={checkboxState[key] === 1}
                                        onChange={() => handleCheckboxChange(key)}
                                    />
                                    <label className="cblabel" htmlFor={key}>
                                        {key === "baoHanh"
                                            ? "Bảo Hành"
                                            : key === "tinhPhi"
                                                ? "Tính Phí"
                                                : key === "suaLai"
                                                    ? "Sửa Lại"
                                                    : key === "chuyenVeTTBH"
                                                        ? "Chuyển về TTBH"
                                                        : "Sửa chữa tại nhà"}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="flex">
                        <div className="flexrow">
                            <label>Chi Nhánh Xử Lý:</label>
                            <select name="ChiNhanh"
                                value={selectedBranch || selectedSite}
                                onChange={handleChange(setSelectedBranch)}
                            >

                                {selectedSite && (
                                    <option value={selectedSite}>{getBranchName(selectedSite)}</option> // Hiển thị giá trị mặc định nếu tồn tại
                                )}
                                {branch && branch.map((b) => (
                                    <option key={b.MaChiNhanh} value={b.MaChiNhanh}>{b.TenChiNhanh}</option>
                                ))}
                            </select>
                        </div>
                        <div className="flexrow">
                            <label>Loại dịch vụ:</label>
                            <select name="LoaiDichVu"
                                value={selectedService}
                                onChange={handleChange(setSelectedService)}
                            >
                                <option value="">-- Loại dịch vụ --</option>
                                {service && service.map((b) => (
                                    <option key={b.LoaiDichVuId} value={b.LoaiDichVuId}>{b.TenLoaiDichVu}</option>
                                ))}
                            </select>
                        </div>
                        <div className="flexrow small">
                            <label>Số Tiền CTác:</label>
                            <input type="text" name="soTien" value={money}
                                onChange={handleChange(setMoney)}
                                placeholder="Số Tiền CTác" />
                        </div>
                    </div>
                </div>


                <div className="form-section">
                    {/* <span>Thông Tin Hàng Hóa</span> */}
                    <div className="flex">
                        <div className="flexItem small">
                            <label>Mã Hàng:</label>
                            <input type="text" name="maHang" placeholder="Mã hàng" value={info?.MaHang || ''} />
                        </div>
                        <div className="flexItem">
                            <label>Tên Hàng:</label>
                            <input type="text" name="tenHang" placeholder="Tên hàng" value={info?.TenHang || ''} />
                        </div>
                        <div className="flexItem small">
                            <label>Serial:</label>
                            <input type="text" name="serial" placeholder="Serial" value={serial} onChange={handleChange(setSerial)} />
                        </div>
                        <div className="flexItem small">
                            <label>Số Lượng:</label>
                            <input type="number" name="soLuong" placeholder="Số lượng" value={info?.SL || ''} />
                        </div>
                    </div>
                    <div className="flex">
                        <div className="flexItem">
                            <label>Ngành Hàng:</label>
                            <div className="plus">
                                <select name="NganhHang"
                                    value={selectedGood}
                                    onChange={handleChange(setSelectedGood)}
                                >
                                    <option value="">-- Ngành hàng --</option>
                                    {goods && goods.map((g) => (
                                        <option key={g.NganhHangID} value={g.NganhHangID}>{g.NganhHangName}</option>
                                    ))}
                                </select>
                                <button><FaPlus /></button>
                            </div>
                        </div>
                        <div className="flexItem">
                            <label>Tên NCC:</label>
                            <div className="plus">
                                <select name="NCC"
                                    value={selectedSupply}
                                    onChange={handleChange(setSelectedSupply)}
                                >
                                    <option value="">-- Nhà cung cấp --</option>
                                    {supply && supply.map((g) => (
                                        <option key={g.NCCID} value={g.NCCID}>{g.NCCName}</option>
                                    ))}
                                </select>
                                <button><FaPlus /></button>
                            </div>
                        </div>
                    </div>
                    <div className="flex">
                    <div className="flexItem">
                        <label>Tình trạng:</label>
                        <textarea name="status" value={status}
                            onChange={handleChange(setStatus)} rows="1" />
                    </div>
                    <div className="flexItem">
                        <label>Ghi chú:</label>
                        <textarea name="note" value={note}
                            onChange={handleChange(setNote)} rows="1" />
                    </div>
                    </div>
                    <div className="add">
                        <button>Thêm</button>
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th>Mã Hàng</th>
                                <th>Tên Hàng</th>
                                <th>Serial</th>
                                <th>Số Lượng</th>
                                <th>Ngành Hàng</th>
                                <th>Tên NCC</th>
                                <th>Ghi chú</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{info?.MaHang || ''}</td>
                                <td>{info?.TenHang || ''}</td>
                                <td>{info?.DonViTinh || ''}</td>
                                <td>{info?.SL || ''}</td>
                                <td>{selectedGood}</td>
                                <td>{selectedSupply}</td>
                                <td>{note}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    )
}

export default BaoHanhOnline;