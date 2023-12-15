import { useState } from "react"
import Popup from "../Popup"
import LabelForm from "./LabelForm";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus} from '@fortawesome/free-solid-svg-icons';
function LabelPopup(props:any) {
    const [display,setDisplay] = useState<boolean>(false) 
    return (
        <div className="label_popup ">
            {
                props.type === 'add' ?
                <button onClick={()=>{setDisplay(!display)}} className='label_popup_btn h-6 w-6 flex items-center justify-center rounded-lg hover:bg-gray-100'>
                    <FontAwesomeIcon icon={faPlus} />
                    {display &&        
                        <Popup>
                            <div className="add_label_popup_body rounded-lg shadow-2xl" onClick={(e)=>{e.stopPropagation()}} style={{width:'450px'}}>
                                <LabelForm 
                                    closePopup = {()=>{setDisplay(false)}}
                                    handleSubmit = {props.handleSubmit} 
                                    type = {props.type}
                                    label = {{}}
                                />
                            </div>
                        </Popup>   
                    }
                </button>
                :
                <button onClick={()=>{setDisplay(!display)}} className='label_item_edit_btn h-7 w-7 flex items-center justify-center rounded-lg hover:bg-gray-100'>
                    <svg width="24" height="24"><g fill="none" fill-rule="evenodd"><path fill="currentColor" d="M9.5 19h10a.5.5 0 1 1 0 1h-10a.5.5 0 1 1 0-1z"></path><path stroke="currentColor" d="M4.42 16.03a1.5 1.5 0 0 0-.43.9l-.22 2.02a.5.5 0 0 0 .55.55l2.02-.21a1.5 1.5 0 0 0 .9-.44L18.7 7.4a1.5 1.5 0 0 0 0-2.12l-.7-.7a1.5 1.5 0 0 0-2.13 0L4.42 16.02z"></path></g></svg>
                    {display &&        
                        <Popup>
                            <div className="label_item_edit_popup_body rounded-lg shadow-2xl" onClick={(e)=>{e.stopPropagation()}} style={{width:'450px'}}>
                                <LabelForm 
                                    closePopup = {()=>{setDisplay(false)}}
                                    handleSubmit = {props.handleSubmit} 
                                    type = {props.type}
                                    label = {props.label}
                                />
                            </div>
                        </Popup>   
                    }
                </button>
               
            }
            
        </div>
    )
    
}
export default LabelPopup;