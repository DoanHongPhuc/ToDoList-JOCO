import './sidebar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useState } from 'react';

function SideBar(props: any) {

    const [open, setOpen] = useState(true)
    let todayClassname = 'nav-item flex items-center w-full p-1.5 p-1 text-base font-medium py-2 rounded-md'
    let prorityClassname = 'nav-item flex items-center w-full p-1.5 p-1 text-base font-medium py-2 rounded-md'
    let upcomingClassname = 'nav-item flex items-center w-full p-1.5 p-1 text-base font-medium py-2 rounded-md'
    let filtersClassname = 'nav-item flex items-center w-full p-1.5 p-1 text-base font-medium py-2 rounded-md'
    if (props.path === '/') {
        todayClassname = 'nav-item-select flex items-center w-full p-1.5 p-1 text-base font-medium py-2 rounded-md'
    }
    if (props.path === '/prority') {
        prorityClassname = 'nav-item-select flex items-center w-full p-1.5 p-1 text-base font-medium py-2 rounded-md'
    }
    if (props.path === '/upcoming') {
        upcomingClassname = 'nav-item-select flex items-center w-full p-1.5 p-1 text-base font-medium py-2 rounded-md'
    }
    if (props.path === '/filters&lables') {
        filtersClassname = 'nav-item-select flex items-center w-full p-1.5 p-1 text-base font-medium py-2 rounded-md'
    }

    if (!open) {
        return (
            <div className="Close text-base text-slate-500 w-8 m-3" onClick={() => setOpen(true)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path fill="currentColor" fillRule="evenodd" d="M19 4.001H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-12a2 2 0 0 0-2-2Zm-15 2a1 1 0 0 1 1-1h4v14H5a1 1 0 0 1-1-1v-12Zm6 13h9a1 1 0 0 0 1-1v-12a1 1 0 0 0-1-1h-9v14Z" clipRule="evenodd"></path></svg>
            </div>
        )
    }

    return (
        <div className="side_bar_container">
            <div className="header_container">
                <div className="header flex p-3 justify-between">
                    <div className="User flex justify-center items-center border border-transparent pl-1.5 pr-3">
                        <div className="Avatar mr-3">
                            <p className="side_bar_avatar flex justify-center items-center ">P</p>
                        </div>
                        <div className="Username flex justify-center items-center">
                            <p className='flex-1 font-bold leading-6 mr-2'>Phuc Doan</p>
                            <FontAwesomeIcon className='text-sm' icon={faChevronDown} />
                        </div>
                    </div>
                    <div className="Icon flex justify-center items-center">
                        <div className="Bell text-base text-slate-500 w-8">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path fill="currentColor" fillRule="evenodd" d="m6.585 14.888-.101.113c-.286.322-.484.584-.484 1h12c0-.416-.198-.678-.484-1l-.101-.113c-.21-.233-.455-.505-.7-.887-.213-.33-.355-.552-.458-.79-.209-.483-.256-1.036-.4-2.71-.214-3.5-1.357-5.5-3.857-5.5s-3.643 2-3.857 5.5c-.144 1.674-.191 2.227-.4 2.71-.103.238-.245.46-.457.79a6.583 6.583 0 0 1-.701.887Zm10.511-2.313c-.083-.34-.131-.861-.241-2.147-.113-1.811-.469-3.392-1.237-4.544C14.8 4.657 13.57 4 12 4c-1.571 0-2.8.656-3.618 1.883-.768 1.152-1.124 2.733-1.237 4.544-.11 1.286-.158 1.807-.241 2.147-.062.254-.13.373-.46.885a5.182 5.182 0 0 1-.57.722c-.074.082-.15.167-.232.262C5.35 14.786 5 15.266 5 16a1 1 0 0 0 1 1h3a3 3 0 0 0 6 0h3a1 1 0 0 0 1-1c0-.735-.35-1.215-.642-1.557-.082-.095-.158-.18-.232-.262a5.176 5.176 0 0 1-.57-.722c-.33-.512-.398-.631-.46-.885ZM14 17.001h-4a2 2 0 1 0 4 0Z" clipRule="evenodd"></path></svg>
                        </div>
                        <div className="Close text-base text-slate-500 w-8" onClick={() => setOpen(false)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path fill="currentColor" fillRule="evenodd" d="M19 4.001H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-12a2 2 0 0 0-2-2Zm-15 2a1 1 0 0 1 1-1h4v14H5a1 1 0 0 1-1-1v-12Zm6 13h9a1 1 0 0 0 1-1v-12a1 1 0 0 0-1-1h-9v14Z" clipRule="evenodd"></path></svg>
                        </div>
                    </div>
                </div>
            </div>
            <div className="side_bar_body py-1 px-3">
                <button className='side_bar_btn flex justify-center items-center p-1 w-full mt-3 mb-5 leading-9 rounded-md h-10'>
                    <FontAwesomeIcon className='mr-3 font-light' icon={faPlus} />
                    <p className='font-medium'>
                        Add Task
                    </p>
                </button>
                <div className="Nav">
                    <ul>
                        <li>
                            <div className='nav-item flex items-center w-full p-1.5 p-1 text-base font-medium py-2 rounded-md'>
                                <div className='nav-icon text-slate-500'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path fill="currentColor" fillRule="evenodd" d="M16.29 15.584a7 7 0 1 0-.707.707l3.563 3.563a.5.5 0 0 0 .708-.707l-3.563-3.563ZM11 17a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z" clipRule="evenodd"></path></svg>
                                </div>
                                <p className='h-6 ml-1.5'> Search</p>
                            </div>
                        </li>
                        <li>
                            <Link to={'/prority'}>
                                <div className={prorityClassname}>
                                    <div className='nav-icon text-blue-500'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" className="D0nCgYmq4STarYo9rnCpwQAAO8riDGKd"><path fill="currentColor" fillRule="evenodd" d="M8.062 4h7.876a2 2 0 0 1 1.94 1.515l2.062 8.246c.04.159.06.322.06.486V18a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-3.754a2 2 0 0 1 .06-.485L6.12 5.515A2 2 0 0 1 8.061 4Zm0 1a1 1 0 0 0-.97.758L5.03 14.004a1 1 0 0 0-.03.242V18a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-3.754a.997.997 0 0 0-.03-.242L16.91 5.758a1 1 0 0 0-.97-.758H8.061Zm6.643 10a2.75 2.75 0 0 1-5.41 0H7a.5.5 0 1 1 0-1h2.75a.5.5 0 0 1 .5.5 1.75 1.75 0 1 0 3.5 0 .5.5 0 0 1 .5-.5H17a.5.5 0 0 1 0 1h-2.295Z" clipRule="evenodd"></path></svg>
                                    </div>
                                    <p className='h-6 ml-1.5'> Prority</p>
                                </div>
                            </Link>
                        </li>
                        <li>
                            <Link to={'/'}>
                                <div className={todayClassname}>
                                    <div className='nav-icon text-emerald-500'>
                                        <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M20 6.00049C20 4.89592 19.1046 4.00049 18 4.00049H6C4.89543 4.00049 4 4.89592 4 6.00049V18.0005C4 19.1051 4.89543 20.0005 6 20.0005H18C19.1046 20.0005 20 19.1051 20 18.0005V6.00049ZM17 8.00049C17.2761 8.00049 17.5 8.22435 17.5 8.50049C17.5 8.77663 17.2761 9.00049 17 9.00049H7C6.72386 9.00049 6.5 8.77663 6.5 8.50049C6.5 8.22435 6.72386 8.00049 7 8.00049H17Z" fill="currentColor" /><text fontFamily="-apple-system, system-ui, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'" fontSize={9} transform="translate(4 2)" fontWeight={500} style={{ fill: 'var(--product-library-navbar-selected-fill)' }}><tspan x={8} y={15} textAnchor="middle">08</tspan></text></svg>
                                    </div>
                                    <p className='h-6 ml-1.5'>Today</p>
                                </div>
                            </Link>
                        </li>
                        <li>
                            <Link to={'/upcoming'}>
                                <div className={upcomingClassname}>
                                    <div className='nav-icon text-gray-700'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" className="R7GJRAgqX85M4uldYGrsUgwgfQYp8IrP"><path fill="currentColor" fillRule="evenodd" d="M6 4h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Zm0 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H6Zm10 12a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm-3-1a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm-5 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm9-5a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm-5 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm-3-1a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM7 8a.5.5 0 0 0 0 1h10a.5.5 0 0 0 0-1H7Z" clipRule="evenodd"></path></svg>
                                    </div>
                                    <p className='h-6 ml-1.5'>Upcoming</p>
                                </div>
                            </Link>
                        </li>
                        <li>
                            <Link to={'/filters&lables'}>
                                <div className={filtersClassname}>
                                    <div className='nav-icon text-amber-700'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" className="NAFqZpweVv2qW6PZaB6UegeDrhQeAToS"><path fill="currentColor" fillRule="evenodd" d="M17.5 6.001h-3a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5Zm-3-1a1.5 1.5 0 0 0-1.5 1.5v3a1.5 1.5 0 0 0 1.5 1.5h3a1.5 1.5 0 0 0 1.5-1.5v-3a1.5 1.5 0 0 0-1.5-1.5h-3Zm-8 9h3a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-3a.5.5 0 0 1 .5-.5Zm-1.5.5a1.5 1.5 0 0 1 1.5-1.5h3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3a1.5 1.5 0 0 1-1.5-1.5v-3Zm9.5-.5h3a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-3a.5.5 0 0 1 .5-.5Zm-1.5.5a1.5 1.5 0 0 1 1.5-1.5h3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3a1.5 1.5 0 0 1-1.5-1.5v-3Zm-6.5-8.5h3a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-3a.5.5 0 0 1 .5-.5Zm-1.5.5a1.5 1.5 0 0 1 1.5-1.5h3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3a1.5 1.5 0 0 1-1.5-1.5v-3Z" clipRule="evenodd"></path></svg>
                                    </div>
                                    <p className='h-6 ml-1.5'>Filters & Labels</p>
                                </div>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
export default SideBar
