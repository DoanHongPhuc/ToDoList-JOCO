import { useEffect, useState } from "react";
import LabelsDropDown from "./DropDown";
interface propsType{
    labelIdSelectList: number[],
    onChangeLabel: (l_id:number) =>void
}

function  LabelSelect(props:propsType) {
    const [isVisible,setIsVisible] = useState<boolean>(false)
    const handleOutsideClick = (event:any) => {
        if (!event.target.closest('#task_editor_labels_btn') && !event.target.closest('#task_editor_labels_dropdown')) {
          setIsVisible(false);
        }
    };
    useEffect(() => {
        document.addEventListener('click', handleOutsideClick);
        return () => {
          document.removeEventListener('click', handleOutsideClick);
        };
    }, []);
    function handleLabelsSelect(label_id :number){
        props.onChangeLabel(label_id)
    }
    return (
        <div className="task_editor_labels relative">
            <button onClick={(e)=>{e.preventDefault(); setIsVisible(!isVisible)}} id="task_editor_labels_btn" className="task_editor_label_btn px-1.5 border border-gray-300 rounded text-xs text-gray-500 leading-7 hover:bg-gray-100 h-8">
                <div className="flex items-center">
                    <span className="task_editor_icon mr-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" fillRule="evenodd" d="m3.914 11.086 6.5-6.5A2 2 0 0 1 11.828 4H18a2 2 0 0 1 2 2v6.172a2 2 0 0 1-.586 1.414l-6.5 6.5a2 2 0 0 1-2.828 0l-6.172-6.171a2 2 0 0 1 0-2.829Zm.707.707a1 1 0 0 0 0 1.415l6.172 6.171a1 1 0 0 0 1.414 0l6.5-6.5a1 1 0 0 0 .293-.707V6a1 1 0 0 0-1-1h-6.172a1 1 0 0 0-.707.293l-6.5 6.5Zm10.129-1.292a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5Z" clipRule="evenodd"></path></svg>
                    </span>
                    Labels
                </div>
            </button>
            {isVisible && <LabelsDropDown labelIdSelectList = {props.labelIdSelectList} handlelabelsSelect = {handleLabelsSelect}/>}
        </div>
    )
}
export default LabelSelect;
