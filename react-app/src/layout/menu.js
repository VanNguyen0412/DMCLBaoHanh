import { FaBell, FaChartLine, FaQuestionCircle, FaSearch } from "react-icons/fa";
import { TfiDashboard } from 'react-icons/tfi';
import { MdOutlineWidgets } from 'react-icons/md';
import { BiSolidDashboard } from 'react-icons/bi';
import { BsLayoutTextWindow } from 'react-icons/bs';
import { PiGraph } from 'react-icons/pi';
import { TbClipboardList } from 'react-icons/tb';
import { CiPickerEmpty, CiShuffle } from 'react-icons/ci';
import { RiDragDropLine } from 'react-icons/ri';
import { IoAnalyticsOutline } from 'react-icons/io5';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { FaList, FaGripLines, FaInfo } from 'react-icons/fa'; // Importing icons
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { FaRegCircleUser } from "react-icons/fa6";

const Menu = () => {
    const location = useLocation();
    const { user } = location.state || {};
    const [activeItem, setActiveItem] = useState(false);

    const handleItemClick = () => {
        setActiveItem(!activeItem);
    };
    return (

        <div className='mainMenu'>

            <div className='side-menu'>
                <p>Main</p>
                <nav>
                    <ul>
                        <li
                            className={activeItem === true ? 'active' : ''}
                            onClick={handleItemClick}
                        >
                            {activeItem === true ? <IoIosArrowUp /> : <IoIosArrowDown />}<TfiDashboard className='icon-mini' />Dashboard
                        </li>
                        {activeItem === true && (
                            <div className='list-item-mini'>
                                <li>
                                    <FaChartLine className='icon-mini' /> Crypto
                                </li>
                                <li>
                                    <PiGraph className='icon-mini' /> Crm
                                </li>
                                <li>
                                    <FaList className='icon-mini' />Listing
                                </li>
                            </div>
                        )}
                        <li>
                            <MdOutlineWidgets className='icon-mini' /> Widgets
                        </li>
                        <li>
                            <BiSolidDashboard className='icon-mini' />Metrics
                        </li>
                        <li>
                            <BsLayoutTextWindow className='icon-mini' />Layouts
                        </li>
                    </ul>
                </nav>
                <p>Extra Components</p>
                <nav>
                    <ul>
                        <li>
                            <TbClipboardList className='icon-mini' />Editors
                        </li>

                        <li>
                            <CiPickerEmpty className='icon-mini' />Color Pickers
                        </li>
                        <li>
                            <RiDragDropLine className='icon-mini' />Drag & Drop
                        </li>
                        <li>
                            <FaInfo className='icon-mini' />Sweel Alert
                        </li>
                        <li>
                            <FaBell className='icon-mini' />Notification
                        </li>
                        <li>
                            <IoAnalyticsOutline className='icon-mini' />Time Line
                        </li>
                        <li>
                            <CiShuffle className='icon-mini' />Shuffle
                        </li>
                    </ul>
                </nav>
            </div>
        </div>

    )
}
export default Menu;