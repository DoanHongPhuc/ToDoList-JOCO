import { useEffect, useState } from "react";
import './duedate.css'
import DueDateDropDown from "./DropDown";

function DueDate(props:any){

    const [dueDateStr,setDueDateStr] = useState<string>(props.due_date)
    const [dueTimeStr, setDueTimeStr] = useState<string | null>(props.due_time)
    const [isVisible,setIsVisible] = useState<boolean>(false)

    const handleOutsideClick = (event:any) => {
        if (!event.target.closest('#due_date_btn') && !event.target.closest('#due_date_dropdown')) {
          setIsVisible(false);
        }
    };

    const handleSaveClick = (dateStr: string, timeStr: string)=>{
        if(dateStr !== '') props.onChangeDueDate(dateStr)
        if(timeStr !== '') props.onChangeDueTime(timeStr)
        setDueDateStr(dateStr)
        setDueTimeStr(timeStr)
        setIsVisible(false)
    }
    
    useEffect(() => {
        document.addEventListener('click', handleOutsideClick);
        return () => {
          document.removeEventListener('click', handleOutsideClick);
        };
    }, []);



    return (
        <div className="task_editor_due_date relative max-w-max w-1/3 h-8">
            <button id="due_date_btn" onClick={(e)=>{e.preventDefault(); setIsVisible(!isVisible)}} className=" w-full h-full task_editor_due_date_btn inline-flex  items-center px-1.5 border border-gray-300 rounded text-xs text-gray-500 leading-7 hover:bg-gray-100">
                <span className="task_editor_icon mr-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" className="no_due_date"><path fill="currentColor" d="M12 2a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8zm0 1H4a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1zm-1.25 7a.75.75 0 1 1 0 1.5.75.75 0 0 1 0-1.5zm.75-5a.5.5 0 1 1 0 1h-7a.5.5 0 0 1 0-1h7z"></path></svg>
                </span>
                <p className="inline-block flex-1 h-full truncate">
                    {!dueDateStr? 'Due date' : dueDateStr} {dueTimeStr && ' ' + dueTimeStr}
                </p>
            </button>
            {isVisible && <DueDateDropDown date={props.due_date} time={props.due_time} handleSaveClick={handleSaveClick}/>}
        </div>
    )
}
export default DueDate;
