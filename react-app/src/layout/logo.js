import { FaSearch } from "react-icons/fa";

const Logo = ({ message }) => {
    return (
        <div style={{ display: 'flex', flexDirection: 'row' }}>
            <section className='section'>
                <div className="header__logo">
                    <img
                        src="https://cdn11.dienmaycholon.vn/filewebdmclnew/DMCL21/FE/images/logo.png"
                        alt="Logo"
                        className="logo-image"
                    />
                </div>
            </section>

            {message ? <div className="logo-message">
                <h4>{message}</h4>
            </div> :
                <section className='section2'>
                    <div class="find">
                        <a><FaSearch /></a>
                        <input id="foodname" type="text" placeholder="Search in app ... " />
                        <select id="country" name="country">
                            <option value="vietnam">VietNam</option>
                            <option value="english">English</option>
                        </select>
                    </div>
                </section>
            }



        </div>
    )
}

export default Logo;