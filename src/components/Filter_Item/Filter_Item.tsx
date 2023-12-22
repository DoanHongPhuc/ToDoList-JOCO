//import FilterPopup from '../Popup/FilterPopup/FilterPopup';
import './filter_item.css'
import { useNavigate } from 'react-router-dom';

function Filter_Item(props:any){
    const navigate = useNavigate()
    return(
        <div className="filter_item flex border-b border-gray-300 hover:cursor-pointer">
            <div onClick={()=>{navigate(`/filter/${props.filter.id}/${props.filter.filter_name}/${props.filter.start_date}/${props.filter.end_date}`)}} className="filter_item_name flex-1 flex items-center text-sm ">
                <div className="filter_item_icon text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path fill="currentColor" fillRule="evenodd" d="M17 14a5 5 0 0 1-10 0c0-1.102.345-2 1.064-3.03.138-.198.534-.71.915-1.202.33-.427.65-.84.782-1.023.775-1.077 1.338-2.123 1.765-3.403a.5.5 0 0 1 .948 0c.427 1.28.99 2.326 1.765 3.403.131.183.451.596.782 1.023.38.493.776 1.004.915 1.202C16.656 12 17 12.898 17 14Zm-2.709-3.54c-.587-.76-.738-.957-.863-1.13A13.702 13.702 0 0 1 12 6.882c-.377.844-.84 1.632-1.428 2.448-.125.173-.276.37-.863 1.13l-.004.004c-.493.638-.725.941-.821 1.079C8.252 12.448 8 13.15 8 14a4 4 0 0 0 8 0c0-.851-.252-1.553-.884-2.458a40.582 40.582 0 0 0-.821-1.079l-.004-.005Z" clipRule="evenodd"></path></svg>
                </div>
                <span className="flex-1 leading-10">
                    {props.filter.filter_name}
                </span>
            </div>
            <div className="filter_item_btn flex items-center text-sm text-gray-400 space-x-2">
                {/* <FilterPopup 
                    type = {'edit'}
                    filter = {props.filter}
                    handleSubmit = {props.handleSubmit}
                />
                <button onClick={()=>{props.handleDelFilter(props.filter.id)}} className="filter_item_remove_btn h-7 w-7 flex items-center justify-center rounded-lg hover:bg-gray-100">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><g fill="none" fillRule="evenodd"><path d="M0 0h24v24H0z"></path><rect width="14" height="1" x="5" y="6" fill="currentColor" rx="0.5"></rect><path fill="currentColor" d="M10 9h1v8h-1V9zm3 0h1v8h-1V9z"></path><path stroke="currentColor" d="M17.5 6.5h-11V18A1.5 1.5 0 0 0 8 19.5h8a1.5 1.5 0 0 0 1.5-1.5V6.5zm-9 0h7V5A1.5 1.5 0 0 0 14 3.5h-4A1.5 1.5 0 0 0 8.5 5v1.5z"></path></g></svg>
                </button> */}
            </div>
        </div>
    )
}
export default Filter_Item;
