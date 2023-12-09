import { useState } from 'react';
import './edittask.css'
import DueDate from '../../DropDown/DueDate/DueDate';
import ProritySelect from '../../DropDown/Prority/ProritySelect';
import LabelSelect from '../../DropDown/Lables/LablesSelect';
function TaskEditor(props:any){
    const [title,setTitle] = useState<string>(props.task.task_name)
    const [desc,setDesc] = useState<string>(props.task.task_desc)
    const [due_date,setDueDate] = useState<any>(props.task.due_date)
    const [prorityId,setProrityId] = useState<any>(props.task.prority_id)
    const [labels,setLabels] = useState<number[]>(props.task.labels_id) // list label_id
    function onChangeDueDate(str: string){
        setDueDate(str)
        console.log(str)
    }
    function onChangePrority(p_id: number){
        setProrityId(p_id)
    }
    function onChangeLabel(l_id: number){
        if (labels.includes(l_id)){
            const newLables = labels.filter((label)=> { return label !==l_id})
            setLabels(newLables)
        }
        else{
            const newLables = [...labels,l_id]
            setLabels(newLables)
        }
    }
    return(
        <form action="" className="task_editor w-full border border-gray-300 rounded mt-1 ">
            <div className="task_editor_area pt-2.5 px-2.5">
                <div className="task_editor_input_field mb-2.5">
                    <div className="task_editor_title_input w-full text-sm font-semibold leading-6">
                        <input className='w-full focus:outline-none' onChange={(e)=>{setTitle(e.target.value)}} type="text" name="task_editor_title" id="task_editor_title" placeholder="Task name" value={title}/>
                    </div>
                    <div  className="task_editor_desc_input w-full text-xs font-light leading-6">
                        <textarea className='w-full focus:outline-none' onChange={(e)=>{setDesc(e.target.value)}} name="task_editor_desc" id="task_editor_desc" placeholder="Description" value={desc}></textarea>
                    </div>
                </div>
                <div className="task_editor_select_area flex space-x-2 mb-3">
                    <DueDate due_date = {due_date} onChangeDueDate = {onChangeDueDate} />
                    <ProritySelect prority_id = {prorityId} onChangePrority = {onChangePrority}/>
                    <LabelSelect labelIdSelectList = {labels} onChangeLabel= {onChangeLabel}/>
                </div>
            </div>
            <div className="task_editor_footer flex justify-end space-x-2.5 mt-2 py-2 pl-2 pr-3 border-t border-gray-300">
                <button onClick={ (e)=> { e.preventDefault(); props.handleCancelClick();}} className="task_editor_cancle_btn px-3 border rounded border-transparent text-sm text-slate-500 font-medium leading-8 hover:bg-gray-200">
                    Cancel
                </button>
                <button onClick={(e)=>{e.preventDefault(); props.handleSubmitClick(props.task.task_id,title,desc,due_date,prorityId,labels); props.handleCancelClick();} } type="submit" className="task_editor_submit_btn px-3 px-3 border rounded border-transparent text-sm font-medium leading-8 hover:bg-orange-700">
                    {props.SubmitString}
                </button>
            </div>
        </form>
    )
}
export default TaskEditor;