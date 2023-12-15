import { useState } from "react";
import Popup from "../Popup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import TaskEditor from "../../Task/Edit_Task/EditTask";

function AddTaskPopup(props: any) {
    const [display,setDisplay] = useState<boolean>(false)
    const defaultValue = {
        task_id: 0,
        task_name: '',
        description: '',
        due_date: null,
        priority_id: 4,
        labels_id: null,
        due_time: null
    }
    return(
        <div className="add_task_popup ">
            <button onClick={()=>{setDisplay(!display)}} className='add_task_pop_btn flex justify-center items-center p-1 w-full mt-3 mb-5 leading-9 rounded-md h-10' style={{backgroundColor: '#dc4c3e', cursor: 'pointer'}}>
                <FontAwesomeIcon className='mr-3 font-light text-white' icon={faPlus} />
                <p className='font-medium text-white'>
                    Add Task
                </p>
                {display &&        
                    <Popup>
                        <div className="add_task_popup_body w-3/5 shadow-2xl" onClick={(e)=>{e.stopPropagation()}}>
                            <TaskEditor
                                SubmitString='Add Task'
                                handleCancelClick={() => { setDisplay(false)}}
                                handleSubmitClick={props.handleAddTask}
                                task={defaultValue}
                            />
                        </div>
                    </Popup>   
                }
            </button>
        </div>
    )
}

export default AddTaskPopup;