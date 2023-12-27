import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight,faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import './upcoming.css'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import TaskColumn from "../../components/DragAndDrop/TaskColumn";
interface ColData{
    headerColTilte:string,
    due_date:string,
    taskList:any
}

function Upcoming(props:any){
    const now = dayjs()
    const [calendarTime,setCalendarTime] = useState<dayjs.Dayjs>(now)
    const numberCol = calendarTime.day() === 0 ? 1 : 8 - calendarTime.day() 
    const headerStr = calendarTime.format('MMMM YYYY')
    const [colData,setColData] = useState<ColData[]>([])
    useEffect(()=>{
        const data: ColData[] =[]
        for(let i = 0; i<numberCol;i++){
            const headerColTilte = calendarTime.add(i,'day').format('DD MMM . dddd')
            const due_date = calendarTime.add(i,'day').format('YYYY-MM-DD')
            const taskList = props.tasks?.filter((task:any) => task.due_date === due_date)
            const Col: ColData = {
                headerColTilte: headerColTilte,
                due_date:due_date,
                taskList: taskList
            }
            data.push(Col)
        }
        setColData(data)
    },[props,calendarTime,numberCol])

    function handlePreviousWeek(){
        if(calendarTime > now){
            if(calendarTime.diff(now,'day') <7){
                setCalendarTime(now)
            }
            else{
                setCalendarTime(calendarTime.subtract(7,'day'))
            }
        }
    }
    function handleNextWeek(){
        if (calendarTime.day()===0){
            setCalendarTime(calendarTime.add(1,'day'))
        }
        else{
            setCalendarTime(calendarTime.subtract(calendarTime.day()-1,'day').add(7,'day'))
        }

    }

    function handleAddTask(task_id: number, task_name: string, task_desc: string, due_date: any, priority_id: number, labels: any, due_time: any) {
        props.handleAddTask(task_id, task_name, task_desc, due_date, priority_id, labels, due_time)
    }
    function handleEditTask(task_id: number, task_name: string, task_desc: string, due_date: any, priority_id: number, labels: any, due_time: any) {
        props.handleEditTask(task_id, task_name, task_desc, due_date, priority_id, labels, due_time)
    }
    function handleTaskComplete(task_id: number) {
        //API
        
        props.handleTaskComplete(task_id)
    }

    

    return(
        <div className="upcoming_container w-full h-full overflow-x-hidden">
            
            <div className="upcoming_header w-full flex justify-between items-center px-12 pt-14 ">
                <div className="upcoming_header_month text-2xl font-bold pb-2">
                    {headerStr}
                </div>
                <div className="upcoming_header_time_control flex">
                    <div className="upcoming_header_week_control flex items-center border border-gray-300 rounded text-gray-400 overflow-hidden text-sm">
                        <button onClick={handlePreviousWeek} className="previousweek_btn h-full w-8 border-r border-gray-300 hover:bg-gray-100">
                            <FontAwesomeIcon icon={faChevronLeft} />
                        </button>
                        <button onClick={handleNextWeek} className="nextweek_btn h-full w-8 hover:bg-gray-100">
                            <FontAwesomeIcon icon={faChevronRight} />
                        </button>
                    </div>
                    <div onClick={()=>{setCalendarTime(now)}} className="upcoming_header_time_back_today border rounded border-gray-300 ml-3 text-gray-400 mr-10 hover:bg-gray-100">
                        <button className="px-3 text-sm leading-8">
                            Today
                        </button>
                    </div>
                </div>
            </div>
            
            <div className="upcoming_body w-full h-full px-12 pt-10 pb-2 overflow-x-auto">
                <div className="flex gap-6 w-max h-full">
                    <DndProvider backend={HTML5Backend}>
                    {
                        colData.map((col,index)=>{
                            return (
                                <TaskColumn
                                    colNumber = {index}
                                    colData = {col}
                                    handleEditTask = {handleEditTask}
                                    handleAddTask = {handleAddTask}
                                    handleTaskComplete = {handleTaskComplete}
                                />
                            )
                        })
                    }
                    </DndProvider>
                </div>
            </div>

        </div>
    )
}
export default Upcoming;