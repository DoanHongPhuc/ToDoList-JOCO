import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TodayTask from "../../components/Task/Today_Task/TodayTask";
import './labelscreen.css'
function LabelScreen(){
    const {id,label_name} = useParams()
    const navigate = useNavigate()
    const testList = [{
        id: 1,
        task_name: 'Do my homework',
        description: '...',
        due_date: '2023-12-16',
        priority_id: 1,
        labels_id: [],
        due_time: '13:40'
    
    }] 
    const [taskList,setTaskList] = useState(testList)
    const due = new Date().toISOString().split("T")[0]
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
        <div className="labelscreen_container px-14 w-full flex flex-col items-center">
        <div className="labelscreen_header pt-12 pb-3 flex items-center">
            <div onClick={ ()=>{navigate('/filters&lables')}} className="labelscreen_back_btn h-7 w-7 flex items-center justify-center mr-1 rounded-lg hover:bg-gray-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" d="M11.145 6.148a.5.5 0 1 1 .71.704L6.738 12H17.5a.5.5 0 0 1 0 1H6.738l5.117 5.148a.5.5 0 0 1-.71.704l-5.964-6a.472.472 0 0 1-.025-.027A.437.437 0 0 1 5 12.5c0-.124.059-.238.156-.325a.533.533 0 0 1 .025-.027l5.964-6Z" clip-rule="evenodd"></path></svg>
            </div>
            <div className='labelscreen_header_title text-xl font-bold leading-9'>
                {label_name}
            </div>
        </div>
        <div className="labelscreen_body">
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
        </div>
    </div>
    )
}
export default LabelScreen;