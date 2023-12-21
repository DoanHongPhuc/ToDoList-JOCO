import { useState } from "react";
import Popup from "../Popup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import TaskEditor from "../../Task/Edit_Task/EditTask";
import { useNavigate } from "react-router-dom";

function AddTaskPopup(props: any) {
    const navigate = useNavigate()
    const [display, setDisplay] = useState<boolean>(false)
    const defaultValue = {
        task_id: 0,
        task_name: '',
        description: '',
        due_date: null,
        priority_id: 4,
        labels_id: [],
        due_time: null
    }
    function handleAddTask(task_id: number, task_name: string, task_desc: string, due_date: any, priority_id: number, labels: any, due_time: any) {
        props.handleAddTask(task_id, task_name, task_desc, due_date, priority_id, labels, due_time)
        navigate("/")
    }
    return (
        <div className="add_task_popup ">
            <button onClick={() => { setDisplay(true) }} className='add_task_pop_btn flex justify-center items-center p-1 w-full mt-3 mb-5 leading-9 rounded-md h-10' style={{ backgroundColor: '#dc4c3e', cursor: 'pointer' }}>
                <FontAwesomeIcon className='mr-3 font-light text-white' icon={faPlus} />
                <p className='font-medium text-white'>
                    Add Task
                </p>
                {display &&
                    <div onClick={() => { setDisplay(false) }}>
                        <Popup>
                            <div className="add_task_popup_body w-3/5 shadow-2xl" onClick={(e) => { e.stopPropagation() }}>
                                <TaskEditor
                                    SubmitString='Add Task'
                                    handleCancelClick={() => { setDisplay(false) }}
                                    handleSubmitClick={handleAddTask}
                                    task={defaultValue}
                                />
                            </div>
                        </Popup>
                    </div>
                }
            </button>
        </div>
    )
}

export default AddTaskPopup;
