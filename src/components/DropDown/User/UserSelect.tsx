import { useEffect, useState } from "react";
import UserDropDown from "./DropDown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";


function  UserSelect(props:any) {
    const [isVisible,setIsVisible] = useState<boolean>(false)
    const handleOutsideClick = (event:any) => {
        if (!event.target.closest('#user_btn') && !event.target.closest('#user_dropdown')) {
          setIsVisible(false);
        }
    };
    useEffect(() => {
        document.addEventListener('click', handleOutsideClick);
        return () => {
          document.removeEventListener('click', handleOutsideClick);
        };
    }, []);
    
    return (
        <div className="user_area relative">
            <button onClick={(e)=>{e.preventDefault(); setIsVisible(!isVisible)}} id="user_btn" className="user_btn px-1.5 rounded text-xs text-gray-500 leading-7 hover:bg-gray-100 h-8 hover:cursor-pointer">
                <FontAwesomeIcon className='text-sm' icon={faChevronDown}/>
            </button>
            {isVisible && <UserDropDown handleLogout = {props.handleLogout} />}
        </div>
    )
}
export default UserSelect;
