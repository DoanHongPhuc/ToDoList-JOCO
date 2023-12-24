import './priority.css'
import AddTask from '../../components/Task/Add_Task/Add_Task';
import PriorityTask from '../../components/Task/Priority_Task/Priority_Task';
import { useState } from 'react';
import { Select} from 'antd';
//import { useQuery, gql } from '@apollo/client'

// const GET_ALL_TASKS = gql`query AllTasks($userId: Int!) {
//     task(where: {user_id: {_eq: $userId },finished: {_eq: false}}, order_by: {priority_id: asc}) {
//       due_date
//       id
//       description
//       task_name
//       due_time
//       priority_id
//     }
//   }
// `

function Priority(props: any){

    // const { data, loading, refetch } = useQuery(GET_ALL_TASKS, {
    //     onCompleted(data) {
    //         setTaskList(data.task)
    //         refetch()
    //     },
    //     onError(err) {
    //         console.log(err)
    //     }
    // });
    const priorityList = props.tasks.map((task: any) => ({ ...task })).sort((a: any, b: any) => a.priority_id - b.priority_id);

    const [taskList,setTaskList] = useState<any>(priorityList)
    const defaultTask = {
        task_id: 0,
        task_name: '',
        description: '',
        due_date: null,
        priority_id: 4,
        labels_id: null,
        due_time: null
    }

    function handleTaskComplete(task_id:number){
        //API
        const newTaskList = taskList.filter((task:any)=>{
            return task.id !== task_id
        })
        setTaskList(newTaskList);
        props.handleTaskComplete(task_id)

    }
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
        let newTaskList = [...taskList, newtask]
        newTaskList.sort(function(a, b) {
            return a.priority_id - b.priority_id
        })
        setTaskList(newTaskList)
        props.handleAddTask(task_id, task_name, task_desc, due_date, priority_id, labels, due_time)
    }
    function handleEditTask(task_id:number,task_name:string, task_desc:string, due_date:any, priority_id:number,labels:any, due_time: any){
        //API
        const newtask = {
            id : task_id,
            task_name: task_name,
            description: task_desc,
            due_date: due_date,
            priority_id: priority_id,
            labels_id: labels,
            due_time: due_time
        }
        const newTaskList: Array<any> = taskList.map((task:any)=>{
            return newtask.id === task.id ? newtask : task
        })
        newTaskList.sort(function(a, b) {
            return a.priority_id - b.priority_id
        })
        setTaskList(newTaskList)
        props.handleEditTask(task_id, task_name, task_desc, due_date, priority_id, labels, due_time)
    }

    const handleChangeSelect = (value: string) => {
        const reversedArray = [...taskList].reverse();
        setTaskList(reversedArray)
    };
    

    return(
        <div className="priority_container px-14 w-full flex flex-col items-center">
            <div className="priority_header flex items-center justify-between pt-12  pb-3">
                <div className='priority_header_title text-xl font-bold leading-9'>
                    Priority
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
            <div className="priority_body">
                <div className='priority_tasklist space-y-2'>
                    {
                        taskList.map((task:any,index:any)=>{
                            return(
                                <PriorityTask 
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
                    defaultTask = {defaultTask}
                />
            </div>
            <div style={{height: "1000px"}}></div>
        </div>
    )
}
export default Priority;
