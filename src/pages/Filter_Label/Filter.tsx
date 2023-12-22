import { useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus,faChevronDown,faChevronRight } from '@fortawesome/free-solid-svg-icons';
import Filter_Item from '../../components/Filter_Item/Filter_Item';
import dayjs from "dayjs";
//import FilterPopup from "../../components/Popup/FilterPopup/FilterPopup";

const today = dayjs()
const fixFilterList = [
    {
        id:1,
        filter_name: 'Tasks due next week',
        start_date: today.startOf('week').add(7, 'days').format("YYYY-MM-DD"),
        end_date: today.endOf('week').add(7, 'days').format('YYYY-MM-DD')
    },
    {
        id: 2,
        filter_name: 'Task due this week',
        start_date: today.startOf('week').format("YYYY-MM-DD"),
        end_date: today.endOf('week').format('YYYY-MM-DD')
    }
]

function Filter(){

    const [filterlist,setFilterList] = useState<any>(fixFilterList)
    const [show,setShow] = useState<boolean>(true)
    const numberfilter = filterlist.length

    function handleAddFilter(newfilter: any) {
        const newFilterList = [...filterlist,newfilter]
        setFilterList(newFilterList);
    }

    function handleEditFilter(newfilter: any){
        console.log(newfilter)
        const newFilterList = filterlist.map((filter:any)=> filter.id !== newfilter.id? filter: newfilter)
        setFilterList(newFilterList);
    }
    function handleDelFilter(id: number){
        const newList = filterlist.filter((filter:any)=> filter.id !== id)
        setFilterList(newList)
    }
    return(
        <div className="filter_container relative">
            <div onClick={()=>{setShow(!show)}} className="show_btn absolute h-6 w-6 -left-7 top-1.5 flex items-center justify-center rounded-lg hover:bg-gray-200">
                {
                    show ?
                    <FontAwesomeIcon icon={faChevronDown} className='text-xs text-gray-400' />
                    :
                    <FontAwesomeIcon icon={faChevronRight} className='text-xs text-gray-400' />
                }
            </div>
            <div className="filter_header flex items-center border-b border-gray-300">
                <h2 className='filter_title flex-1 py-1.5 pr-7 mr-0.5 text-sm font-semibold'>Filters</h2>
                {/* <div className='add_filter_area'>
                    <FilterPopup
                        type = {'add'} 
                        handleSubmit = {handleAddFilter}
                    />
                </div> */}
            </div>
            {
                show &&
                <div className="filter_body">
                    {
                        !numberfilter ? 
                        <div className='no_filter_comment py-4 text-sm font-light text-gray-500'>
                            Your list of filters will show up here.
                        </div>
                        :
                        <div>
                            {
                                filterlist.map((filter:any, index: any)=>{
                                    return(
                                        <Filter_Item
                                            key={index}
                                            filter = {filter}
                                            handleSubmit = {handleEditFilter}
                                            handleDelFilter = {handleDelFilter}
                                        />
                                    )
                                })
                            }

                        </div>
                    }
                </div>
            }
        </div>
    )
}
export default Filter
