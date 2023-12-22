import { useState } from 'react';
import './add_task.css'
import TaskEditor from '../Edit_Task/EditTask';


function AddTask(props: any) {
    const [view, setView] = useState<boolean>(false)

    const defaultValue = {
        task_id: 0,
        task_name: '',
        description: '',
        due_date: null,
        priority_id: 4,
        labels_id: null,
        due_time: null
    }
    if (!view) {
        return (
            <button className='add_task_btn flex items-center w-full h-9' onClick={() => { setView(true) }}>
                <div className='add_task_btn_icon mr-2 flex justify-center items-center'>
                    <svg width="13" height="13"><path fill="currentColor" fillRule="evenodd" d="M6 6V.5a.5.5 0 0 1 1 0V6h5.5a.5.5 0 1 1 0 1H7v5.5a.5.5 0 1 1-1 0V7H.5a.5.5 0 0 1 0-1H6z"></path></svg>
                </div>
                <p className='add_task_btn_text text-sm font-normal text-slate-400'>
                    Add task
                </p>
            </button>
        )
    }
    else {
        return (
            <TaskEditor
                SubmitString='Add Task'
                handleCancelClick={() => { setView(false) }}
                handleSubmitClick={props.handleAddTask}
                task={defaultValue}
            />
        )
    }

}

export default AddTask;
