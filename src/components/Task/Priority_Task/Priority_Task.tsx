import { useState } from 'react';
import './prioritytask.css'
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


function PriorityTask(props: any) {

    const [completeTask, { data, loading }] = useMutation(COMPLETE_TASK, {
        update(_, result) {
            console.log(result)
            toast.success("You completed a task!")
        },
        variables: { id: props.task.id }
    })
    function CompleteTask() {
        completeTask();
    }

    const [view, setView] = useState<boolean>(false)

    if (!view) {
        return (
            <div className="priority_task_item flex pb-4 pt-2 relative">
                <button className='priority_task_checkbox_btn mr-2 flex items-start mt-1' onClick={() => { CompleteTask(); props.handleTaskComplete(props.task.id) }}>
                    <div className='priority_task_checkbox_circle'>
                        <div className='priority_task_checkbox_icon'>
                            <svg width="24" height="24"><path fill="currentColor" d="M11.23 13.7l-2.15-2a.55.55 0 0 0-.74-.01l.03-.03a.46.46 0 0 0 0 .68L11.24 15l5.4-5.01a.45.45 0 0 0 0-.68l.02.03a.55.55 0 0 0-.73 0l-4.7 4.35z"></path></svg>
                        </div>
                    </div>
                </button>
                <div className='priority_task flex-1'>
                    <div className="priority_task_title text-sm leading-6">
                        {props.task.task_name}
                    </div>
                    <div className="priority_task_desc text-xs text-slate-500 mt-2">
                        <button id="due_date_btn" className="task_editor_due_date_btn flex  items-center px-1.5 border border-gray-300 rounded text-xs text-gray-500 leading-7">
                            <span className="task_editor_icon mr-1">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" className="no_due_date text-green-500"><path fill="currentColor" d="M12 2a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8zm0 1H4a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1zm-1.25 7a.75.75 0 1 1 0 1.5.75.75 0 0 1 0-1.5zm.75-5a.5.5 0 1 1 0 1h-7a.5.5 0 0 1 0-1h7z"></path></svg>
                            </span>
                            {props.task.due_date ? props.task.due_date : 'Due date'}
                            {props.task.due_time && ' ' + props.task.due_time.slice(0, -3)}
                        </button>
                    </div>
                </div>
                <div className='priority_task_priority flex items-center text-xs'>
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
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" className="g1pQExb text-blue-600" data-icon-name="priority-icon" data-priority="3"><path fill="currentColor" fillRule="evenodd" d="M4.223 4.584A.5.5 0 0 0 4 5v14.5a.5.5 0 0 0 1 0v-5.723C5.886 13.262 7.05 13 8.5 13c.97 0 1.704.178 3.342.724 1.737.58 2.545.776 3.658.776 1.759 0 3.187-.357 4.277-1.084A.5.5 0 0 0 20 13V4.5a.5.5 0 0 0-.777-.416C18.313 4.69 17.075 5 15.5 5c-.97 0-1.704-.178-3.342-.724C10.421 3.696 9.613 3.5 8.5 3.5c-1.758 0-3.187.357-4.277 1.084Z" clipRule="evenodd"></path></svg>
                            </span>
                            Priority 3
                        </div>
                    }
                    {props.task.priority_id === 2 &&
                        <div className="flex items-center">
                            <span className="task_editor_icon mr-1">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" className="g1pQExb text-yellow-500" data-icon-name="priority-icon" data-priority="2"><path fill="currentColor" fillRule="evenodd" d="M4.223 4.584A.5.5 0 0 0 4 5v14.5a.5.5 0 0 0 1 0v-5.723C5.886 13.262 7.05 13 8.5 13c.97 0 1.704.178 3.342.724 1.737.58 2.545.776 3.658.776 1.759 0 3.187-.357 4.277-1.084A.5.5 0 0 0 20 13V4.5a.5.5 0 0 0-.777-.416C18.313 4.69 17.075 5 15.5 5c-.97 0-1.704-.178-3.342-.724C10.421 3.696 9.613 3.5 8.5 3.5c-1.758 0-3.187.357-4.277 1.084Z" clipRule="evenodd"></path></svg>
                            </span>
                            Priority 2
                        </div>
                    }
                    {props.task.priority_id === 1 &&
                        <div className="flex items-center">
                            <span className="task_editor_icon mr-1">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" className="g1pQExb text-red-500" data-icon-name="priority-icon" data-priority="1"><path fill="currentColor" fillRule="evenodd" d="M4.223 4.584A.5.5 0 0 0 4 5v14.5a.5.5 0 0 0 1 0v-5.723C5.886 13.262 7.05 13 8.5 13c.97 0 1.704.178 3.342.724 1.737.58 2.545.776 3.658.776 1.759 0 3.187-.357 4.277-1.084A.5.5 0 0 0 20 13V4.5a.5.5 0 0 0-.777-.416C18.313 4.69 17.075 5 15.5 5c-.97 0-1.704-.178-3.342-.724C10.421 3.696 9.613 3.5 8.5 3.5c-1.758 0-3.187.357-4.277 1.084Z" clipRule="evenodd"></path></svg>
                            </span>
                            Priority 1
                        </div>
                    }
                </div>


                <div className="priority_task_edit_btn absolute h-7 w-7 right-3 top-0 hover:bg-gray-100 rounded-md">
                    <button onClick={() => { setView(true) }}>
                        <svg width="24" height="24"><g fill="none" fillRule="evenodd"><path fill="currentColor" d="M9.5 19h10a.5.5 0 1 1 0 1h-10a.5.5 0 1 1 0-1z"></path><path stroke="currentColor" d="M4.42 16.03a1.5 1.5 0 0 0-.43.9l-.22 2.02a.5.5 0 0 0 .55.55l2.02-.21a1.5 1.5 0 0 0 .9-.44L18.7 7.4a1.5 1.5 0 0 0 0-2.12l-.7-.7a1.5 1.5 0 0 0-2.13 0L4.42 16.02z"></path></g></svg>
                    </button>
                </div>
            </div>
        )
    }
    else {
        return (
            <TaskEditor
                SubmitString='Save'
                handleCancelClick={() => { setView(false) }}
                handleSubmitClick={props.handleEditTask}
                task={props.task}
            />
        )
    }
}
export default PriorityTask;
