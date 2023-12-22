import React, { useState } from 'react'
import "./searchScreen.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import TodayTask from '../../components/Task/Today_Task/TodayTask';


function SearchScreen(props: any) {

    const [taskList, setTaskList] = useState<any>(props.tasks);
    const [input, setInput] = useState<string>("")

    function showResult(e: any) {
        e.preventDefault();
        setTaskList(props.tasks?.filter((task:any) => task.task_name.toLowerCase().includes(input.toLowerCase())))
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
        const newTaskList = taskList.map((task: any) => {
            return newtask.id === task.id ? newtask : task
        })
        setTaskList(newTaskList)
        props.handleEditTask(task_id, task_name, task_desc, due_date, priority_id, labels, due_time)
    }
    function handleTaskComplete(task_id: number) {
        //API
        const newTaskList = taskList.filter((task: any) => {
            return task.id !== task_id
        })
        setTaskList(newTaskList);
        props.handleTaskComplete(task_id)
    }
    return (
        <div className='w-full flex flex-col items-center mt-10'>
            <div className="search__screen__bar pt-12  pb-3 w-full">
                <div className='text-xl font-bold leading-9'>
                    Search
                </div>
                <div className='task_counter flex items-center text-slate-500 text-xs'>
                    <div className='task_counter_icon mr-0.5 '>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16" aria-hidden="true" className="siIBvPn"><path fill="currentColor" fillRule="evenodd" d="M8 14.001a6 6 0 1 1 0-12 6 6 0 0 1 0 12Zm0-1a5 5 0 1 0 0-10 5 5 0 0 0 0 10ZM5.146 8.147a.5.5 0 0 1 .708 0L7 9.294l3.146-3.147a.5.5 0 0 1 .708.708l-3.5 3.5a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 0-.708Z" clipRule="evenodd"></path></svg>
                    </div>
                    <p>{taskList && taskList.length} task</p>
                </div>
            </div>
            <form className='search__screen__bar w-full'>
                <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                <div className="relative">
                    <div className="flex items-center bg-white rounded-md p-2 shadow-md">
                        <input type="text" placeholder="Search..." className="w-full p-2 border-none focus:outline-none"
                        onChange={(e) => setInput(e.target.value)}/>
                        <button
                            className="bg-blue-500 text-white p-2 rounded-md ml-2 focus:outline-none"
                            onClick={showResult}
                        >
                        <FontAwesomeIcon icon={faSearch} />
                        </button>
                    </div>
                </div>
            </form >
            <div className='search__result__tasklist space-y-2 w-full'>
                    {
                        taskList && taskList.map((task: any, index: any) => {
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
    )
}

export default SearchScreen
