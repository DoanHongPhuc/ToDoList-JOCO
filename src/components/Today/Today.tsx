import './today.css'
import AddTask from '../Task/Add_Task/Add_Task';
import TodayTask from '../Task/Today_Task/TodayTask';
import { useEffect, useState } from 'react';
function Today(){
    const [taskList,setTaskList] = useState<any>([])
    function handleTaskComplete(task_id:number){
        //API
        const newTaskList = taskList.filter((task:any)=>{
            return task.task_id !== task_id
        })
        setTaskList(newTaskList);

    }
    function handleAddTask(task_id:number,task_name:string, task_desc:string, due_date:any, prority_id:number,labels:any){
        //API
        const id =Math.floor(Math.random() * (100 - 3 + 1)) + 3
        const newtask = {
            task_id :  id,// id trả về từ API
            task_name: task_name,
            task_desc: task_desc,
            due_date: due_date,
            prority_id: prority_id,
            labels_id: labels
        }
        const newTaskList = [...taskList,newtask]
        setTaskList(newTaskList)
    }
    function handleEditTask(task_id:number,task_name:string, task_desc:string, due_date:any, prority_id:number,labels:any){
        //API
        const newtask = {
            task_id : task_id,
            task_name: task_name,
            task_desc: task_desc,
            due_date: due_date,
            prority_id: prority_id,
            labels_id: labels
        }
        const newTaskList = taskList.map((task:any)=>{
            return newtask.task_id === task.task_id ? newtask : task
        })
        setTaskList(newTaskList)
    }
    function fetchData(){
        //API
        const tasks = [
            {
                task_id : 1,
                task_name: 'Do my homework 1',
                task_desc: "Homework serves as an opportunity for students to reinforce their learning, practice new skills, and demonstrate their understanding",
                due_date: '',
                prority_id: 4,
                labels_id: []

            },
            {
                task_id : 2,
                task_name: 'Do my homework 2',
                task_desc: "Homework serves as an opportunity for students to reinforce their learning, practice new skills, and demonstrate their understanding",
                due_date: '',
                prority_id: 1,
                labels_id: []
            }
        ]
        setTaskList(tasks)
    }
    useEffect(() => {
        fetchData();
    }, []);
    

    return(
        <div className="today_container px-14 w-full flex flex-col items-center">
            <div className="today_header pt-12  pb-3">
                <div className='today_header_title text-xl font-bold leading-9'>
                    Today
                </div>
                <div className='task_counter flex items-center text-slate-500 text-xs'>
                    <div className='task_counter_icon mr-0.5 '>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16" aria-hidden="true" className="siIBvPn"><path fill="currentColor" fill-rule="evenodd" d="M8 14.001a6 6 0 1 1 0-12 6 6 0 0 1 0 12Zm0-1a5 5 0 1 0 0-10 5 5 0 0 0 0 10ZM5.146 8.147a.5.5 0 0 1 .708 0L7 9.294l3.146-3.147a.5.5 0 0 1 .708.708l-3.5 3.5a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 0-.708Z" clip-rule="evenodd"></path></svg>
                    </div>
                    <p>1 task</p>
                </div>
            </div>
            <div className="today_body">
                <div className='today_tasklist space-y-2'>
                    {
                        taskList.map((task:any,index:any)=>{
                            return(
                                <TodayTask 
                                    key = {index}
                                    task ={task}
                                    handleTaskComplete ={handleTaskComplete}
                                    handleEditTask = {handleEditTask}
                                />
                            )
                        })
                    }
                </div>
                <AddTask
                    handleAddTask= {handleAddTask}
                />
            </div>
        </div>
    )
}
export default Today;