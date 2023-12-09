import './proritydropdown.css'
function ProrityDropDown(props:any){
    const prorityList = [
        {
            prority_id: 1,
            prority_name: 'Prority 1',
            prority_icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" className="g1pQExb text-red-500" data-icon-name="priority-icon" data-priority="1"><path fill="currentColor" fill-rule="evenodd" d="M4.223 4.584A.5.5 0 0 0 4 5v14.5a.5.5 0 0 0 1 0v-5.723C5.886 13.262 7.05 13 8.5 13c.97 0 1.704.178 3.342.724 1.737.58 2.545.776 3.658.776 1.759 0 3.187-.357 4.277-1.084A.5.5 0 0 0 20 13V4.5a.5.5 0 0 0-.777-.416C18.313 4.69 17.075 5 15.5 5c-.97 0-1.704-.178-3.342-.724C10.421 3.696 9.613 3.5 8.5 3.5c-1.758 0-3.187.357-4.277 1.084Z" clip-rule="evenodd"></path></svg>
        },
        {
            prority_id: 2,
            prority_name: 'Prority 2',
            prority_icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" className="g1pQExb text-yellow-500" data-icon-name="priority-icon" data-priority="2"><path fill="currentColor" fill-rule="evenodd" d="M4.223 4.584A.5.5 0 0 0 4 5v14.5a.5.5 0 0 0 1 0v-5.723C5.886 13.262 7.05 13 8.5 13c.97 0 1.704.178 3.342.724 1.737.58 2.545.776 3.658.776 1.759 0 3.187-.357 4.277-1.084A.5.5 0 0 0 20 13V4.5a.5.5 0 0 0-.777-.416C18.313 4.69 17.075 5 15.5 5c-.97 0-1.704-.178-3.342-.724C10.421 3.696 9.613 3.5 8.5 3.5c-1.758 0-3.187.357-4.277 1.084Z" clip-rule="evenodd"></path></svg>
        },
        {
            prority_id: 3,
            prority_name: 'Prority 3',
            prority_icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" className="g1pQExb text-blue-600" data-icon-name="priority-icon" data-priority="3"><path fill="currentColor" fill-rule="evenodd" d="M4.223 4.584A.5.5 0 0 0 4 5v14.5a.5.5 0 0 0 1 0v-5.723C5.886 13.262 7.05 13 8.5 13c.97 0 1.704.178 3.342.724 1.737.58 2.545.776 3.658.776 1.759 0 3.187-.357 4.277-1.084A.5.5 0 0 0 20 13V4.5a.5.5 0 0 0-.777-.416C18.313 4.69 17.075 5 15.5 5c-.97 0-1.704-.178-3.342-.724C10.421 3.696 9.613 3.5 8.5 3.5c-1.758 0-3.187.357-4.277 1.084Z" clip-rule="evenodd"></path></svg>
        },
        {
            prority_id: 4,
            prority_name: 'Prority 4',
            prority_icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" className="g1pQExb" data-icon-name="priority-icon" data-priority="4"><path fill="currentColor" fill-rule="evenodd" d="M4 5a.5.5 0 0 1 .223-.416C5.313 3.857 6.742 3.5 8.5 3.5c1.113 0 1.92.196 3.658.776C13.796 4.822 14.53 5 15.5 5c1.575 0 2.813-.31 3.723-.916A.5.5 0 0 1 20 4.5V13a.5.5 0 0 1-.223.416c-1.09.727-2.518 1.084-4.277 1.084-1.113 0-1.92-.197-3.658-.776C10.204 13.178 9.47 13 8.5 13c-1.45 0-2.614.262-3.5.777V19.5a.5.5 0 0 1-1 0V5Zm4.5 7c-1.367 0-2.535.216-3.5.654V5.277c.886-.515 2.05-.777 3.5-.777.97 0 1.704.178 3.342.724 1.737.58 2.545.776 3.658.776 1.367 0 2.535-.216 3.5-.654v7.377c-.886.515-2.05.777-3.5.777-.97 0-1.704-.178-3.342-.724C10.421 12.196 9.613 12 8.5 12Z" clip-rule="evenodd"></path></svg>
        }      
    ]
    return(
        <div id ="task_editor_prority_dropdown" className="task_editor_prority_dropdown absolute -left-5 top-8 border rounded-lg border-gray-300 bg-white overflow-hidden z-10">
            {prorityList.map((prority,index)=>{
                return(
                    <div onClick={()=>{props.handleProritySelect(prority.prority_id)}} key={index} className="task_editor_prority_option flex items-center px-2 py-1 leading-8 hover:cursor-pointer hover:bg-gray-100 ">
                        <div className="task_editor_prority_option_container flex items-center">
                            <div className="task_editor_prority_option_icon mr-2.5">
                                {prority.prority_icon}
                            </div>
                            <p className='text-sm mr-3'>
                                {prority.prority_name}
                            </p>
                        </div>
                        {prority.prority_id === props.prority_id && <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12" width="12" height="12" aria-hidden="true" className="dropdown_select_checkmark text-red-700"><path fill="currentColor" fill-rule="evenodd" d="M4.902 6.975l4.182-4.244a.74.74 0 0 1 1.06 0 .775.775 0 0 1 0 1.081L5.432 8.597a.74.74 0 0 1-1.06 0L1.78 5.975a.775.775 0 0 1 0-1.081.74.74 0 0 1 1.061 0l2.06 2.081z"></path></svg>}
                    </div>
                )
            })}
        </div>
    )
}
export default ProrityDropDown;