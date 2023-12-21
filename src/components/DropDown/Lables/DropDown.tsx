import { useState } from 'react'
import './lablesdropdown.css'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { gql, useQuery } from '@apollo/client'
import { useAuth } from '../../../context/auth'

const GET_LABEL_BY_USER_ID = gql`query MyQuery($userId: Int!) {
    label(where: {user_id: {_eq: $userId}}) {
      label_name
      id
      color
    }
  }`

interface Labels {
    id: number,
    label_name: string,
    color: string | null
}
interface propsType {
    labelIdSelectList: number[],
    handlelabelsSelect: (l_id: number) => void
}


function LabelsDropDown(props: propsType) {

    const {userId} = useAuth()

    const { data: data, loading: loading, refetch } = useQuery(GET_LABEL_BY_USER_ID, {
        variables: {
            userId: userId
        },
        onCompleted() {
            setLabelsList(data.label)
            refetch();
        },
        onError(error) {
            console.log(error)
        },
    });

    const [labelList, setLabelsList] = useState<Labels[]>()
    //const [labelStr,setLabelStr] = useState<string>('')

    const labelIdSelectList: number[] = props.labelIdSelectList
    //console.log("selected: " +labelIdSelectList)

    if(loading && !labelList) return <h4>Loading...</h4>

    return (
        <div id="task_editor_labels_dropdown" className="task_editor_labels_dropdown text-sm  absolute -left-14 top-8 border rounded-lg border-gray-300/[0.6] bg-white overflow-hidden z-10">
            {/* <div className="search_label_area flex items-center p-2 border-b border-gray-100">
                <div className='border border-gray-300 rounded-lg flex overflow-hidden'>
                    <input value={labelStr} onChange={(e)=>{setLabelStr(e.target.value)}} placeholder='Type a label' type="text" name='label_search' id='label_search' className='search_label_input w-full  mr-2 py-1.5 px-2 rounded-lg focus:outline-none' />
                    <button className='search_label_btn w-10 h-8 border-l border-gray-300 hover:bg-gray-300'>
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </button>
                </div>
            </div> */}
            {labelList && labelList.map((label, index) => {
                return (
                    <div onClick={() => { props.handlelabelsSelect(label.id) }} key={index} className="task_editor_label_option flex items-center pl-2 pr-3.5 py-1 leading-8 hover:cursor-pointer hover:bg-gray-100 ">
                        <div className="task_editor_label_option_container flex-1 flex items-center">
                            <div className="task_editor_label_option_icon mr-2.5">
                                <svg xmlns="http://www.w3.org/2000/svg" style={{color: `${label.color}`}} width="24" height="24" fill="none" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" fillRule="evenodd" d="m3.914 11.086 6.5-6.5A2 2 0 0 1 11.828 4H18a2 2 0 0 1 2 2v6.172a2 2 0 0 1-.586 1.414l-6.5 6.5a2 2 0 0 1-2.828 0l-6.172-6.171a2 2 0 0 1 0-2.829Zm.707.707a1 1 0 0 0 0 1.415l6.172 6.171a1 1 0 0 0 1.414 0l6.5-6.5a1 1 0 0 0 .293-.707V6a1 1 0 0 0-1-1h-6.172a1 1 0 0 0-.707.293l-6.5 6.5Zm10.129-1.292a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5Z" clipRule="evenodd"></path></svg>
                            </div>
                            <p className='text-sm mr-3'>
                                {label.label_name}
                            </p>
                        </div>
                        {labelIdSelectList.includes(label.id) && <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12" width="12" height="12" aria-hidden="true" className="dropdown_select_checkmark text-red-700"><path fill="currentColor" fillRule="evenodd" d="M4.902 6.975l4.182-4.244a.74.74 0 0 1 1.06 0 .775.775 0 0 1 0 1.081L5.432 8.597a.74.74 0 0 1-1.06 0L1.78 5.975a.775.775 0 0 1 0-1.081.74.74 0 0 1 1.061 0l2.06 2.081z"></path></svg>}
                    </div>
                )
            })}
        </div>
    )
}
export default LabelsDropDown;
