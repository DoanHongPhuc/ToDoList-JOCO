import { DatePicker } from "antd";
import dayjs, { Dayjs } from 'dayjs';
import { useState } from "react";
function FilterForm(props:any) {
    const [name,setName] = useState<string>(props.filter.filter_name ? props.filter.filter_name : "")
    const [startDate,setStartDate] = useState<any>(props.filter.start_date ? dayjs(props.filter.start_date) : null)
    const [endDate,setEndDate] = useState<any>(props.filter.end_date ? dayjs(props.filter.end_date) : null)
    const [id,setId] = useState<any>(props.filter.id ? props.filter.id : null)
    function handleSubmitClick(){
        if (id){
            // edit filter
            console.log("edit filter")
            const newfilter = {
                id : id,
                filter_name : name,
                start_date:  startDate.format().split("T")[0],
                end_date: endDate.format().split("T")[0]
            }
            props.handleSubmit(newfilter)
            props.closePopup()
        }
        else{
            //add filter
            console.log("add filter")
            const newfilter = {
                id : 2,
                filter_name : name,
                start_date:  startDate.format().split("T")[0],
                end_date: endDate.format().split("T")[0]
            }
            props.handleSubmit(newfilter)
            props.closePopup()
        }
    }
    
    return(
        <div className="add_filter_container rounded-lg bg-white text-black">
            <div className="add_filter_title pl-4 py-2 pr-2 border-b border-gray-300">
                <h2 className="text-xl font-bold text-left">{props.type ==='add'? 'Add' : 'Edit'} filter</h2>
            </div>
            <div className="add_filter_body px-4 pt-4 pb-8">
               
                <form action="" className="space-y-6">
                    <div className="add_filter_name_input flex flex-col ">
                        <label htmlFor = 'name' className=" text-sm font-semibold text-left pb-2"> Name</label>
                        <input value={name} onChange={(e)=>{setName(e.target.value)}} placeholder="Filter name" id="name" name="name" type="text"  className="text-sm px-2 py-1.5 font-light rounded-lg border border-gray-300"/>
                    </div>
                    <div className="add_filter_start_input">
                        <h2 className=" text-sm font-semibold text-left pb-2"> Start date</h2>
                        <DatePicker defaultValue={startDate}  onChange={(newValue)=>{setStartDate(newValue)}} placeholder="Select start date" style={{width:"100%", padding:'6px 8px'}}/>
                    </div>
                    <div className="add_filter_end_input">
                        <h2 className=" text-sm font-semibold text-left pb-2"> End date</h2>
                        <DatePicker defaultValue={endDate}  onChange={(newValue)=>{setEndDate(newValue)}} placeholder="Select end date" style={{width:"100%", padding:'6px 8px'}}/>
                    </div>

                </form>
            </div>
            <div className="add_filter_footer flex justify-end space-x-2.5 mt-2 p-4 border-t border-gray-300">
                <button onClick={()=>{props.closePopup()}} className="add_filter_cancel_btn px-3 bg-gray-400/[0.3]  border rounded border-transparent text-sm text-slate-500 font-medium leading-8 hover:bg-gray-200">Cancel</button>
                <button onClick={handleSubmitClick} className="add_filter_submit_btn bg-orange-700/[0.7] px-5  border rounded border-transparent text-sm font-medium leading-8 hover:bg-orange-500 text-white">{props.type ==='add'? 'Add' : 'Save'}</button>
            </div>
        </div>
    )
    
}
export default FilterForm;