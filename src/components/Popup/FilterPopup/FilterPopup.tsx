import { useState } from "react"
import Popup from "../Popup"
import FilterForm from "./FilterForm";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus} from '@fortawesome/free-solid-svg-icons';
function FilterPopup(props:any) {
    const [display,setDisplay] = useState<boolean>(false)  
    return(
        <div className="filter_popup ">
            {
                props.type === 'add' ?
                <button onClick={()=>{setDisplay(!display)}} className='filter_popup_btn h-6 w-6 flex items-center justify-center rounded-lg hover:bg-gray-100'>
                    <FontAwesomeIcon icon={faPlus} />
                    {display &&        
                        <Popup>
                            <div className="add_task_popup_body rounded-lg shadow-2xl" onClick={(e)=>{e.stopPropagation()}} style={{width:'450px'}}>
                                <FilterForm 
                                    closePopup = {()=>{setDisplay(false)}}
                                    handleSubmit = {props.handleSubmit} 
                                    type = {props.type}
                                    filter = {{}}
                                />
                            </div>
                        </Popup>   
                    }
                </button>
                :
                <button onClick={()=>{setDisplay(!display)}} className='filter_item_edit_btn h-7 w-7 flex items-center justify-center rounded-lg hover:bg-gray-100'>
                    <svg width="24" height="24"><g fill="none" fillRule="evenodd"><path fill="currentColor" d="M9.5 19h10a.5.5 0 1 1 0 1h-10a.5.5 0 1 1 0-1z"></path><path stroke="currentColor" d="M4.42 16.03a1.5 1.5 0 0 0-.43.9l-.22 2.02a.5.5 0 0 0 .55.55l2.02-.21a1.5 1.5 0 0 0 .9-.44L18.7 7.4a1.5 1.5 0 0 0 0-2.12l-.7-.7a1.5 1.5 0 0 0-2.13 0L4.42 16.02z"></path></g></svg>
                    {display &&        
                        <Popup>
                            <div className="filter_item_edit_popup_body rounded-lg shadow-2xl" onClick={(e)=>{e.stopPropagation()}} style={{width:'450px'}}>
                                <FilterForm 
                                    closePopup = {()=>{setDisplay(false)}}
                                    handleSubmit = {props.handleSubmit} 
                                    type = {props.type}
                                    filter = {props.filter}
                                />
                            </div>
                        </Popup>   
                    }
                </button>
               
            }
            
        </div>
    )
}

export default FilterPopup;
