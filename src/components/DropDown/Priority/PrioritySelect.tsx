import { useEffect, useState } from "react";
import PriorityDropDown from "./DropDown";
function  PrioritySelect(props:any) {
    const [isVisible,setIsVisible] = useState<boolean>(false)
    const handleOutsideClick = (event:any) => {
        if (!event.target.closest('#task_editor_priority_btn') && !event.target.closest('#task_editor_priority_dropdown')) {
          setIsVisible(false);
        }
    };
    useEffect(() => {
        document.addEventListener('click', handleOutsideClick);
        return () => {
          document.removeEventListener('click', handleOutsideClick);
        };
    }, []);
    function handlePrioritySelect(priority_id :number){
        props.onChangePriority(priority_id)
        setIsVisible(false)
    }
    return (
        <div className="task_editor_priority relative">
            <button onClick={(e)=>{e.preventDefault(); setIsVisible(!isVisible)}} id="task_editor_priority_btn" className="task_editor_priority_btn px-1.5 border border-gray-300 rounded text-xs text-gray-500 leading-7 hover:bg-gray-100 h-8">
                {props.priority_id === 4 &&
                    <div className="flex items-center">
                        <span className="task_editor_icon mr-1">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16" className="g1pQExb" data-icon-name="priority-icon" data-priority="4"><path fill="currentColor" fillRule="evenodd" d="M2 3a.5.5 0 0 1 .276-.447C3.025 2.179 4.096 2 5.5 2c.901 0 1.485.135 2.658.526C9.235 2.885 9.735 3 10.5 3c1.263 0 2.192-.155 2.776-.447A.5.5 0 0 1 14 3v6.5a.5.5 0 0 1-.276.447c-.749.375-1.82.553-3.224.553-.901 0-1.485-.135-2.658-.526C6.765 9.615 6.265 9.5 5.5 9.5c-1.08 0-1.915.113-2.5.329V13.5a.5.5 0 0 1-1 0V3Zm1 5.779v-5.45C3.585 3.113 4.42 3 5.5 3c.765 0 1.265.115 2.342.474C9.015 3.865 9.599 4 10.5 4c1.002 0 1.834-.09 2.5-.279v5.45c-.585.216-1.42.329-2.5.329-.765 0-1.265-.115-2.342-.474C6.985 8.635 6.401 8.5 5.5 8.5c-1.001 0-1.834.09-2.5.279Z" clipRule="evenodd"></path></svg>
                        </span>
                        Priority
                    </div>
                }
                {props.priority_id === 3 &&
                    <div className="flex items-center">
                        <span className="task_editor_icon mr-1">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" className="g1pQExb text-blue-600" data-icon-name="priority-icon" data-priority="3"><path fill="currentColor" fillRule="evenodd" d="M4.223 4.584A.5.5 0 0 0 4 5v14.5a.5.5 0 0 0 1 0v-5.723C5.886 13.262 7.05 13 8.5 13c.97 0 1.704.178 3.342.724 1.737.58 2.545.776 3.658.776 1.759 0 3.187-.357 4.277-1.084A.5.5 0 0 0 20 13V4.5a.5.5 0 0 0-.777-.416C18.313 4.69 17.075 5 15.5 5c-.97 0-1.704-.178-3.342-.724C10.421 3.696 9.613 3.5 8.5 3.5c-1.758 0-3.187.357-4.277 1.084Z" clipRule="evenodd"></path></svg>
                        </span>
                        P3
                    </div>
                }
                {props.priority_id === 2 &&
                    <div className="flex items-center">
                        <span className="task_editor_icon mr-1">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" className="g1pQExb text-yellow-500" data-icon-name="priority-icon" data-priority="2"><path fill="currentColor" fillRule="evenodd" d="M4.223 4.584A.5.5 0 0 0 4 5v14.5a.5.5 0 0 0 1 0v-5.723C5.886 13.262 7.05 13 8.5 13c.97 0 1.704.178 3.342.724 1.737.58 2.545.776 3.658.776 1.759 0 3.187-.357 4.277-1.084A.5.5 0 0 0 20 13V4.5a.5.5 0 0 0-.777-.416C18.313 4.69 17.075 5 15.5 5c-.97 0-1.704-.178-3.342-.724C10.421 3.696 9.613 3.5 8.5 3.5c-1.758 0-3.187.357-4.277 1.084Z" clipRule="evenodd"></path></svg>
                        </span>
                        P2
                    </div>
                }
                {props.priority_id === 1 &&
                    <div className="flex items-center">
                        <span className="task_editor_icon mr-1">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" className="g1pQExb text-red-500" data-icon-name="priority-icon" data-priority="1"><path fill="currentColor" fillRule="evenodd" d="M4.223 4.584A.5.5 0 0 0 4 5v14.5a.5.5 0 0 0 1 0v-5.723C5.886 13.262 7.05 13 8.5 13c.97 0 1.704.178 3.342.724 1.737.58 2.545.776 3.658.776 1.759 0 3.187-.357 4.277-1.084A.5.5 0 0 0 20 13V4.5a.5.5 0 0 0-.777-.416C18.313 4.69 17.075 5 15.5 5c-.97 0-1.704-.178-3.342-.724C10.421 3.696 9.613 3.5 8.5 3.5c-1.758 0-3.187.357-4.277 1.084Z" clipRule="evenodd"></path></svg>
                        </span>
                        P1
                    </div>
                }
                
            </button>
            {isVisible && <PriorityDropDown priority_id = {props.priority_id} handlePrioritySelect = {handlePrioritySelect}/>}
        </div>
    )
}
export default PrioritySelect;
