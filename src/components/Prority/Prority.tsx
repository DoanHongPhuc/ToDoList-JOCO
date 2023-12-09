import './prority.css'
import AddTask from '../Task/Add_Task/Add_Task';
import ProrityTask from '../Task/Prority_Task/Prority_Task';
import { useEffect, useState } from 'react';
import { Select} from 'antd';
function Prority(){
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
                prority_id: 1,
                labels_id: []

            },
            {
                task_id : 2,
                task_name: 'Do my homework 2',
                task_desc: "Homework serves as an opportunity for students to reinforce their learning, practice new skills, and demonstrate their understanding",
                due_date: '',
                prority_id: 4,
                labels_id: []
            }
        ]
        setTaskList(tasks)
    }
    useEffect(() => {
        fetchData();
    }, []);

    const handleChangeSelect = (value: string) => {
        const reversedArray = [...taskList].reverse();
        setTaskList(reversedArray)
    };
    

    return(
        <div className="prority_container px-14 w-full flex flex-col items-center">
            <div className="prority_header flex items-center justify-between pt-12  pb-3">
                <div className='prority_header_title text-xl font-bold leading-9'>
                    Prority
                </div>
                <Select
                defaultValue="1"
                style={{ width: 120 }}
                onChange={handleChangeSelect}
                options={[
                    { value: '1', label: 'P1 -> P4' },
                    { value: '2', label: 'P4 -> P1' },
                ]}
                />
            </div>
            <div className="prority_body">
                <div className='prority_tasklist space-y-2'>
                    {
                        taskList.map((task:any,index:any)=>{
                            return(
                                <ProrityTask 
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
export default Prority;