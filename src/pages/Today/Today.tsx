import './today.css'
import AddTask from '../../components/Task/Add_Task/Add_Task';
import TodayTask from '../../components/Task/Today_Task/TodayTask';
import { useState } from 'react';
import { useQuery, gql } from '@apollo/client'


const GET_ALL_TASKS_TODAY = gql`query AllTasks($due: date) {
    task(where: {finished: {_eq: false}, due_date: {_eq: $due}}) {
      due_date
      id
      description
      task_name
      due_time
      priority_id
    }
  }
  `


function Today() {
    const [taskList, setTaskList] = useState<any>([]);

    const due = new Date().toISOString().split("T")[0]

    const { data: data, loading: loading,refetch } = useQuery(GET_ALL_TASKS_TODAY, {
        onCompleted(data) {
            setTaskList(data.task)
            refetch();
        },
        onError(err) {
            console.log(err)
        },
        variables: { due: due },
    });
    console.log(taskList)
    
    function handleAddTask(task_id: number, task_name: string, task_desc: string, due_date: any, priority_id: number, labels: any, due_time: any) {
        //API
        const newtask = {
            id: task_id,
            task_name: task_name,
            description: task_desc,
            due_date: due_date,
            priority_id: priority_id,
            labels_id: labels,
            due_time: due_time
        }
        if (newtask.due_date === due) {
            const newTaskList = [...taskList, newtask]
            setTaskList(newTaskList)
        }
    }
    function handleEditTask(task_id: number, task_name: string, task_desc: string, due_date: any, priority_id: number, labels: any, due_time: any) {
        //API
        const newtask = {
            id: task_id,
            task_name: task_name,
            description: task_desc,
            due_date: due_date,
            priority_id: priority_id,
            labels_id: labels,
            due_time: due_time
        }
        let newTaskList = taskList;
        if (newtask.due_date !== due) {
            newTaskList = newTaskList.filter((task: any) => task.id !== newtask.id)
        } else {
            newTaskList = taskList.map((task: any) => {
                return newtask.id === task.id ? newtask : task
            })
        }
        setTaskList(newTaskList)
    }
    function handleTaskComplete(task_id: number) {
        //API
        const newTaskList = taskList.filter((task: any) => {
            return task.id !== task_id
        })
        setTaskList(newTaskList);
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
                    <p>{taskList.length} task</p>
                </div>
            </div>
            <div className="today_body">
                <div className='today_tasklist space-y-2'>
                    {
                        taskList.map((task: any, index: any) => {
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
                />
            </div>
            <div style={{height: "300px"}}></div>
        </div>
    )
}
export default Today;
