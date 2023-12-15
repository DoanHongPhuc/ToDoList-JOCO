import { useState } from "react"
import ColorPicker from "../../ColorPicker/ColorPicker"

function LabelForm(props:any){
    const [name,setName] = useState<string>(props.label.label_name ? props.label.label_name : "")
    const [color,setColor] = useState<string>(props.label.color? props.label.color : "#808080")
    const [id,setId] = useState<any>(props.label.id ? props.label.id : null)
    function handleSubmitClick(){
        if (id){
            // edit label
            console.log("edit label")
            const newlabel = {
                id : id,
                label_name : name,
                color: color
            }
            props.handleSubmit(newlabel)
            props.closePopup()
        }
        else{
            //add label
            console.log("add label")
            const newlabel = {
                id : 1,
                label_name : name,
                color: color
            }
            props.handleSubmit(newlabel)
            props.closePopup()
        }
    }
    return(
        <div className="add_label_container rounded-lg bg-white text-black">
            <div className="add_label_title pl-4 py-2 pr-2 border-b border-gray-300">
                <h2 className="text-xl font-bold text-left">{props.type ==='add'? 'Add' : 'Edit'} label</h2>
            </div>
            <div className="add_label_body px-4 pt-4 pb-8">
               
                <form action="" className="space-y-6">
                    <div className="add_label_name_input flex flex-col ">
                        <label htmlFor = 'name' className=" text-sm font-semibold text-left pb-2"> Name</label>
                        <input value={name} onChange={(e)=>{setName(e.target.value)}} placeholder="label name" id="name" name="name" type="text"  className="text-sm px-2 py-1.5 font-light rounded-lg border border-gray-300"/>
                    </div>
                    <div className="add_label_color_input">
                        <h2 className=" text-sm font-semibold text-left pb-2"> Color</h2>
                        <ColorPicker
                            color={color}
                            handleChange = {(value:string)=>{setColor(value)}}
                        />
                    </div>
                </form>
            </div>
            <div className="add_label_footer flex justify-end space-x-2.5 mt-2 p-4 border-t border-gray-300">
                <button onClick={()=>{props.closePopup()}} className="add_label_cancel_btn px-3 bg-gray-400/[0.3]  border rounded border-transparent text-sm text-slate-500 font-medium leading-8 hover:bg-gray-200">Cancel</button>
                <button onClick={handleSubmitClick} className="add_label_submit_btn bg-orange-700/[0.7] px-5  border rounded border-transparent text-sm font-medium leading-8 hover:bg-orange-500 text-white">{props.type ==='add'? 'Add' : 'Save'}</button>
            </div>
        </div>
    )

}
export default LabelForm;