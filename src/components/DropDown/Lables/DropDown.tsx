import { useEffect, useState } from 'react'
import './lablesdropdown.css'

interface Labels{
    label_id :number,
    label_name:string
}
interface propsType{
    labelIdSelectList: number[],
    handlelabelsSelect: (l_id:number) =>void
}
function LabelsDropDown(props:propsType){
    const A = [
        {
            label_id: 1,
            label_name: 'Label 1',
        },
        {
            label_id: 2,
            label_name: 'Label 2',
        },
        {
            label_id: 3,
            label_name: 'Label 3',
        },
        {
            label_id: 4,
            label_name: 'Label 4',
        }      
    ]
    const [labelList,setLabelsList] = useState<Labels[]>([])
    function fetchAPI(){
        setLabelsList(A)
    }
    useEffect(()=>{
        fetchAPI();
    },[])
    const labelIdSelectList: number[] = props.labelIdSelectList
    
    return(
        <div id ="task_editor_labels_dropdown" className="task_editor_labels_dropdown absolute -left-5 top-8 border rounded-lg border-gray-300 bg-white overflow-hidden z-10">
            {labelList.map((label,index)=>{
                return(
                    <div onClick={()=>{props.handlelabelsSelect(label.label_id)}} key={index} className="task_editor_label_option flex items-center px-2 py-1 leading-8 hover:cursor-pointer hover:bg-gray-100 ">
                        <div className="task_editor_label_option_container flex items-center">
                            <div className="task_editor_label_option_icon mr-2.5">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" fill-rule="evenodd" d="m3.914 11.086 6.5-6.5A2 2 0 0 1 11.828 4H18a2 2 0 0 1 2 2v6.172a2 2 0 0 1-.586 1.414l-6.5 6.5a2 2 0 0 1-2.828 0l-6.172-6.171a2 2 0 0 1 0-2.829Zm.707.707a1 1 0 0 0 0 1.415l6.172 6.171a1 1 0 0 0 1.414 0l6.5-6.5a1 1 0 0 0 .293-.707V6a1 1 0 0 0-1-1h-6.172a1 1 0 0 0-.707.293l-6.5 6.5Zm10.129-1.292a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5Z" clip-rule="evenodd"></path></svg>
                            </div>
                            <p className='text-sm mr-3'>
                                {label.label_name}
                            </p>
                        </div>
                        {labelIdSelectList.includes(label.label_id) && <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12" width="12" height="12" aria-hidden="true" className="dropdown_select_checkmark text-red-700"><path fill="currentColor" fill-rule="evenodd" d="M4.902 6.975l4.182-4.244a.74.74 0 0 1 1.06 0 .775.775 0 0 1 0 1.081L5.432 8.597a.74.74 0 0 1-1.06 0L1.78 5.975a.775.775 0 0 1 0-1.081.74.74 0 0 1 1.061 0l2.06 2.081z"></path></svg>}
                    </div>
                )
            })}
        </div>
    )
}
export default LabelsDropDown;