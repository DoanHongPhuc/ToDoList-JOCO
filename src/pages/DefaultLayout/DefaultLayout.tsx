
import SideBar from "../../components/SideBar/SideBar";
import './default.css';
function DefaultLayout(props:any){
    return(
        <div className="default_container flex">
            <div className="side_bar_default">
                <SideBar path = {props.path}></SideBar>
            </div>
            <div className="Main_default h-screen overflow-y-scroll flex-1 ">{props.children}</div>
        </div>
    )
}

export default DefaultLayout;