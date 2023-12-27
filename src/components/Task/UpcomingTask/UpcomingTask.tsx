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
function trimAndAddEllipsis(inputString:string) {
    if(inputString.length === 0 || !inputString){
        return '// Description of task'
    }
    else if (inputString.length <= 30) {
        return inputString;
    } else {
        return inputString.slice(0, 30) + "...";
    }
}

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
            <div className="Upcoming_task_item flex relative bg-white rounded-lg px-2 border border-gray-200 ">
                
                <div className='Upcoming_task flex-1 pb-6 pt-1'>
                    <div className='Upcoming_task_priority text-xs font-base rounded-lg  h-7 w-20 flex items-center justify-center mb-1 border border-gray-300 rounded'>
                        {props.task.priority_id === 4 &&
                            <div className="flex items-center">
                                <span className="task_editor_icon mr-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16" className="g1pQExb" data-icon-name="priority-icon" data-priority="4"><path fill="currentColor" fillRule="evenodd" d="M2 3a.5.5 0 0 1 .276-.447C3.025 2.179 4.096 2 5.5 2c.901 0 1.485.135 2.658.526C9.235 2.885 9.735 3 10.5 3c1.263 0 2.192-.155 2.776-.447A.5.5 0 0 1 14 3v6.5a.5.5 0 0 1-.276.447c-.749.375-1.82.553-3.224.553-.901 0-1.485-.135-2.658-.526C6.765 9.615 6.265 9.5 5.5 9.5c-1.08 0-1.915.113-2.5.329V13.5a.5.5 0 0 1-1 0V3Zm1 5.779v-5.45C3.585 3.113 4.42 3 5.5 3c.765 0 1.265.115 2.342.474C9.015 3.865 9.599 4 10.5 4c1.002 0 1.834-.09 2.5-.279v5.45c-.585.216-1.42.329-2.5.329-.765 0-1.265-.115-2.342-.474C6.985 8.635 6.401 8.5 5.5 8.5c-1.001 0-1.834.09-2.5.279Z" clipRule="evenodd"></path></svg>
                                </span>
                                Priority 4
                            </div>
                        }
                        {props.task.priority_id === 3 &&
                            <div className="flex items-center">
                                <span className="task_editor_icon mr-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16" className="g1pQExb text-blue-600" data-icon-name="priority-icon" data-priority="4"><path fill="currentColor" fillRule="evenodd" d="M2 3a.5.5 0 0 1 .276-.447C3.025 2.179 4.096 2 5.5 2c.901 0 1.485.135 2.658.526C9.235 2.885 9.735 3 10.5 3c1.263 0 2.192-.155 2.776-.447A.5.5 0 0 1 14 3v6.5a.5.5 0 0 1-.276.447c-.749.375-1.82.553-3.224.553-.901 0-1.485-.135-2.658-.526C6.765 9.615 6.265 9.5 5.5 9.5c-1.08 0-1.915.113-2.5.329V13.5a.5.5 0 0 1-1 0V3Zm1 5.779v-5.45C3.585 3.113 4.42 3 5.5 3c.765 0 1.265.115 2.342.474C9.015 3.865 9.599 4 10.5 4c1.002 0 1.834-.09 2.5-.279v5.45c-.585.216-1.42.329-2.5.329-.765 0-1.265-.115-2.342-.474C6.985 8.635 6.401 8.5 5.5 8.5c-1.001 0-1.834.09-2.5.279Z" clipRule="evenodd"></path></svg>
                                </span>
                                Priority 3
                            </div>
                        }
                        {props.task.priority_id === 2 &&
                            <div className="flex items-center">
                                <span className="task_editor_icon mr-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16" className="g1pQExb text-yellow-500" data-icon-name="priority-icon" data-priority="4"><path fill="currentColor" fillRule="evenodd" d="M2 3a.5.5 0 0 1 .276-.447C3.025 2.179 4.096 2 5.5 2c.901 0 1.485.135 2.658.526C9.235 2.885 9.735 3 10.5 3c1.263 0 2.192-.155 2.776-.447A.5.5 0 0 1 14 3v6.5a.5.5 0 0 1-.276.447c-.749.375-1.82.553-3.224.553-.901 0-1.485-.135-2.658-.526C6.765 9.615 6.265 9.5 5.5 9.5c-1.08 0-1.915.113-2.5.329V13.5a.5.5 0 0 1-1 0V3Zm1 5.779v-5.45C3.585 3.113 4.42 3 5.5 3c.765 0 1.265.115 2.342.474C9.015 3.865 9.599 4 10.5 4c1.002 0 1.834-.09 2.5-.279v5.45c-.585.216-1.42.329-2.5.329-.765 0-1.265-.115-2.342-.474C6.985 8.635 6.401 8.5 5.5 8.5c-1.001 0-1.834.09-2.5.279Z" clipRule="evenodd"></path></svg>
                                </span>
                                Priority 2
                            </div>
                        }
                        {props.task.priority_id === 1 &&
                            <div className="flex items-center">
                                <span className="task_editor_icon mr-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16" className="g1pQExb text-red-500" data-icon-name="priority-icon" data-priority="4"><path fill="currentColor" fillRule="evenodd" d="M2 3a.5.5 0 0 1 .276-.447C3.025 2.179 4.096 2 5.5 2c.901 0 1.485.135 2.658.526C9.235 2.885 9.735 3 10.5 3c1.263 0 2.192-.155 2.776-.447A.5.5 0 0 1 14 3v6.5a.5.5 0 0 1-.276.447c-.749.375-1.82.553-3.224.553-.901 0-1.485-.135-2.658-.526C6.765 9.615 6.265 9.5 5.5 9.5c-1.08 0-1.915.113-2.5.329V13.5a.5.5 0 0 1-1 0V3Zm1 5.779v-5.45C3.585 3.113 4.42 3 5.5 3c.765 0 1.265.115 2.342.474C9.015 3.865 9.599 4 10.5 4c1.002 0 1.834-.09 2.5-.279v5.45c-.585.216-1.42.329-2.5.329-.765 0-1.265-.115-2.342-.474C6.985 8.635 6.401 8.5 5.5 8.5c-1.001 0-1.834.09-2.5.279Z" clipRule="evenodd"></path></svg>
                                </span>
                                Priority 1
                            </div>
                        }
                    </div>
                    <div className="Upcoming_task_title text-sm leading-6">
                        {props.task.task_name}
                    </div>
                    <div className="Upcoming_task_desc text-xs text-slate-500 pl-0.5">
                        {trimAndAddEllipsis(props.task.description)}
                    </div>
                </div>
    
                <div className="Upcoming_task_edit_btn absolute h-7 w-7 right-0 top-1 hover:bg-gray-100 rounded-md flex items-center justify-center">
                    <button onClick={()=>{setView(true)}}>
                        <svg width="24" height="24"><g fill="none" fillRule="evenodd"><path fill="currentColor" d="M9.5 19h10a.5.5 0 1 1 0 1h-10a.5.5 0 1 1 0-1z"></path><path stroke="currentColor" d="M4.42 16.03a1.5 1.5 0 0 0-.43.9l-.22 2.02a.5.5 0 0 0 .55.55l2.02-.21a1.5 1.5 0 0 0 .9-.44L18.7 7.4a1.5 1.5 0 0 0 0-2.12l-.7-.7a1.5 1.5 0 0 0-2.13 0L4.42 16.02z"></path></g></svg>
                    </button>
                </div>
                <div className="Upcoming_task_edit_btn absolute h-7 w-7 right-6 top-1">
                    <button className='today_task_checkbox_btn mr-2 flex items-start mt-1' onClick={()=>{CompleteTask(); props.handleTaskComplete(props.task.id)}}>
                        <div className='today_task_checkbox_circle'>
                            <div className='today_task_checkbox_icon'>
                                <svg width="24" height="24"><path fill="currentColor" d="M11.23 13.7l-2.15-2a.55.55 0 0 0-.74-.01l.03-.03a.46.46 0 0 0 0 .68L11.24 15l5.4-5.01a.45.45 0 0 0 0-.68l.02.03a.55.55 0 0 0-.73 0l-4.7 4.35z"></path></svg>
                            </div>
                        </div>
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
