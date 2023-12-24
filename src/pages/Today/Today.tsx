import './today.css'
import AddTask from '../../components/Task/Add_Task/Add_Task';
import TodayTask from '../../components/Task/Today_Task/TodayTask';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown,faChevronRight } from '@fortawesome/free-solid-svg-icons';
import dayjs from 'dayjs';
import { useMutation, gql } from '@apollo/client'
import { toast } from 'react-toastify';

const EDIT_TASK_BY_ID = gql`mutation MyMutation($id: Int!, $desc: String, $due_date: date, $due_time: time, $priority_id: Int, $task_name: String!,  $labels_id: _int4) {
    update_task_by_pk(pk_columns: {id: $id}, _set: {description: $desc, due_date: $due_date, due_time: $due_time, priority_id: $priority_id, task_name: $task_name, labels_id: $labels_id}) {
      task_name
    }
  }
  `


function Today(props: any) {
    const [editTask] = useMutation(EDIT_TASK_BY_ID, {})
      function parseArrayToInt4(arr: Array<number>):string {
          return "{" + arr.join(',') + "}";
      }
    const due = dayjs().format("YYYY-MM-DD")
    const todayList = props.tasks?.filter((task:any) => task.due_date === due)
    const overdueList = props.tasks?.filter((task:any) => {
        const date1 = new Date(task.due_date)
        const date2 = new Date(due)
        if (date1<date2) return task
    })
    const [show,setShow] = useState<boolean>(true)
    const defaultTask = {
        task_id: 0,
        task_name: '',
        description: '',
        due_date: due,
        priority_id: 4,
        labels_id: null,
        due_time: null
    }


    function handleReschedule(){
        overdueList.forEach((task:any)=>{
            editTask({
                update(_, result) {
                    toast.info("You edited task " + task.task_name )
                }, 
                variables: {
                  id: task.id,
                  task_name: task.task_name,
                  desc: task.description,
                  due_date: due,
                  due_time: task.due_time,
                  priority_id: task.priority_id,
                  labels_id: task.labels_id ? parseArrayToInt4(task.labels_id) : null
                }
              })
            props.handleEditTask(task.id,task.task_name,task.description,due,task.priority_id,task.labels_id,task.due_time)
        })
    }
    
    function handleAddTask(task_id: number, task_name: string, task_desc: string, due_date: any, priority_id: number, labels: any, due_time: any) {
        props.handleAddTask(task_id, task_name, task_desc, due_date, priority_id, labels, due_time)
    }

    function handleEditTask(task_id: number, task_name: string, task_desc: string, due_date: any, priority_id: number, labels: any, due_time: any) {
        props.handleEditTask(task_id, task_name, task_desc, due_date, priority_id, labels, due_time)
    }

    function handleTaskComplete(task_id: number) {
        props.handleTaskComplete(task_id)
    }


    return (
        <div className="today_container px-14 w-full flex flex-col items-center">
            <div className="today_header pt-12  pb-3">
                <div className='today_header_title text-xl font-bold leading-9'>
                    Today
                </div>
                <div className='task_counter flex items-center text-slate-500 text-xs'>
                    <div className='task_counter_icon mr-0.5 '>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16" aria-hidden="true" className="siIBvPn"><path fill="currentColor" fillRule="evenodd" d="M8 14.001a6 6 0 1 1 0-12 6 6 0 0 1 0 12Zm0-1a5 5 0 1 0 0-10 5 5 0 0 0 0 10ZM5.146 8.147a.5.5 0 0 1 .708 0L7 9.294l3.146-3.147a.5.5 0 0 1 .708.708l-3.5 3.5a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 0-.708Z" clipRule="evenodd"></path></svg>
                    </div>
                    <p>{todayList ? todayList.length : 0} task</p>
                </div>
            </div>
            <div className="today_body">
                <div className='today_tasklist space-y-2'>
                    {
                        todayList && todayList.map((task: any, index: any) => {
                            return (
                                <TodayTask
                                    key={index}
                                    task={task}
                                    handleEditTask={handleEditTask}
                                    handleTaskComplete={handleTaskComplete}
                                />
                            )
                        })
                    }
                </div>
                <AddTask
                    handleAddTask={handleAddTask}
                    defaultTask = {defaultTask}
                />
                {
                    overdueList.length !==0 &&
                    <div className="overdue_tasklist_area">
                        <div className="overdue_tasklist_header flex items-center justify-between pt-8 pb-2 border-b border-gray-300">
                            <div className="overdue_tasklist_title pl-2 relative">
                            <div onClick={()=>{setShow(!show)}} className="show_btn absolute h-6 w-6 -left-5 top-0 flex items-center justify-center rounded-lg hover:bg-gray-200">
                                {
                                    show ?
                                    <FontAwesomeIcon icon={faChevronDown} className='text-xs text-gray-400' />
                                    :
                                    <FontAwesomeIcon icon={faChevronRight} className='text-xs text-gray-400' />
                                }
                            </div>
                                <p className=' text-base font-semibold '>Overdue</p>
                            </div>
                            <button onClick={handleReschedule} className='overdue_reschedule_btn text-sm underline text-orange-600 hover:text-orange-600/[0.8] focus:outline-none'>
                                Reschedule
                            </button>
                        </div>
                        {
                            show &&
                            <div className='overdue_tasklist space-y-2'>
                                {
                                    overdueList && overdueList.map((task: any, index: any) => {
                                        return (
                                            <TodayTask
                                                key={index}
                                                task={task}
                                                handleEditTask={handleEditTask}
                                                handleTaskComplete={handleTaskComplete}
                                            />
                                        )
                                    })
                                }
                            </div>
                        }
                    </div>
                }
            </div>
            <div style={{height: "300px"}}></div>
        </div>
    )
}
export default Today;
