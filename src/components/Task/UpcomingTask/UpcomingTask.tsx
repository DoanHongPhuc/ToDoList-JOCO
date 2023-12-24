import { useState } from 'react';
import './upcomingtask.css'
import TaskEditor from '../Edit_Task/EditTask';
import { gql, useMutation } from '@apollo/client';
import { toast } from 'react-toastify';

const COMPLETE_TASK = gql`
mutation MyMutation($id: Int!) {
    update_task_by_pk(pk_columns: {id: $id}, _set: {finished: true}) {
      id
    }
  }
`

function UpcomingTask(props: any) {
    const [completeTask, { data, loading }] = useMutation(COMPLETE_TASK, {
        update(_, result) {
            console.log(result)
            toast.success("You completed the task!")
        },
        variables: {id: props.task.id}
    })
    function CompleteTask() {
        completeTask();
    }

    const [view,setView] = useState<boolean>(false)

    if(!view){
        return(
            <div className="Upcoming_task_item flex pb-4 pt-2 relative">
                <button className='Upcoming_task_checkbox_btn mr-2 flex items-start mt-1' onClick={()=>{CompleteTask(); props.handleTaskComplete(props.task.id)}}>
                    <div className='Upcoming_task_checkbox_circle'>
                        <div className='Upcoming_task_checkbox_icon'>
                            <svg width="24" height="24"><path fill="currentColor" d="M11.23 13.7l-2.15-2a.55.55 0 0 0-.74-.01l.03-.03a.46.46 0 0 0 0 .68L11.24 15l5.4-5.01a.45.45 0 0 0 0-.68l.02.03a.55.55 0 0 0-.73 0l-4.7 4.35z"></path></svg>
                        </div>
                    </div>
                </button>
                <div className='Upcoming_task'>
                    <div className="Upcoming_task_title text-sm leading-6">
                        {props.task.task_name}
                    </div>
                    <div className="Upcoming_task_desc text-xs text-slate-500">
                        {props.task.description}
                    </div>
                </div>
    
                <div className="Upcoming_task_edit_btn absolute h-7 w-7 right-3 top-0 hover:bg-gray-100 rounded-md">
                    <button onClick={()=>{setView(true)}}>
                        <svg width="24" height="24"><g fill="none" fillRule="evenodd"><path fill="currentColor" d="M9.5 19h10a.5.5 0 1 1 0 1h-10a.5.5 0 1 1 0-1z"></path><path stroke="currentColor" d="M4.42 16.03a1.5 1.5 0 0 0-.43.9l-.22 2.02a.5.5 0 0 0 .55.55l2.02-.21a1.5 1.5 0 0 0 .9-.44L18.7 7.4a1.5 1.5 0 0 0 0-2.12l-.7-.7a1.5 1.5 0 0 0-2.13 0L4.42 16.02z"></path></g></svg>
                    </button>
                </div>
            </div>
        )
    }
    else{
        return(
            <TaskEditor 
                SubmitString = 'Save'
                handleCancelClick = {()=>{setView(false)}} 
                handleSubmitClick = {props.handleEditTask}
                task = {props.task}
            />
        )
    }
}
export default UpcomingTask;
