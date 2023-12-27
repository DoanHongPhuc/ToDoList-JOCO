import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faRightFromBracket,faUser } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from "react-router-dom"
import './userdropdown.css'
function UserDropDown(props:any){
    const nagative = useNavigate()
    return(
        <div id="user_dropdown" className="user_dropdown text-sm  absolute right-0 top-8 border rounded-lg border-gray-300/[0.6] bg-white overflow-hidden z-10">
            <div onClick={()=>{nagative('/profile')}} className="user_option flex items-center pl-2 pr-3.5 py-1 leading-8 hover:cursor-pointer hover:bg-gray-100 ">
                <div className="user_option_container flex-1 flex items-center">
                    <div className="user_option_icon mr-2.5">
                        <FontAwesomeIcon icon={faUser} />
                    </div>
                    <p className='text-sm mr-3'>
                        Profile
                    </p>
                </div>
            </div>
            <div onClick={(e)=>{props.handleLogout(e)}} className="user_option flex items-center pl-2 pr-3.5 py-1 leading-8 hover:cursor-pointer hover:bg-gray-100 ">
                <div className="user_option_container flex-1 flex items-center">
                    <div className="user_option_icon mr-2.5">
                        <FontAwesomeIcon icon={faRightFromBracket} />
                    </div>
                    <p className='text-sm mr-3'>
                        Logout
                    </p>
                </div>
            </div>
        </div>
    )
}
export default UserDropDown