import { useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faChevronDown, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import Label_Item from "../../components/Label_Item/Label_Item";
import LabelPopup from "../../components/Popup/LabelPopup/LabelPopup";
import { gql, useQuery } from "@apollo/client";
import { useAuth } from "../../context/auth";


const GET_LABELS_BY_USER_ID = gql`query MyQuery($userId: Int!) {
    label(where: {user_id: {_eq: $userId}}) {
      color
      id
      label_name
    }
  }
  `

function Label() {

    const {userId} = useAuth()
    const [labellist, setLabelList] = useState<any>()
    const [show, setShow] = useState<boolean>(true)

    const { data: data, loading: loading, refetch } = useQuery(GET_LABELS_BY_USER_ID, {
        variables: {
            userId: userId
        },
        onCompleted(data) {
            setLabelList(data.label)
            refetch();
        },
        onError(error) {
            console.log(error)
        },
    });

    function handleAddLabel(newlabel: any) {
        const newlableList = [...labellist, newlabel]
        setLabelList(newlableList);
        refetch()
    }
    function handleEditlabel(newlabel: any) {
        console.log(newlabel)
        const newlabelList = labellist.map((label: any) => label.id !== newlabel.id ? label : newlabel)
        setLabelList(newlabelList);
        refetch()
    }
    function handleDelLabel(id: number) {
        const newList = labellist.filter((label: any) => label.id !== id)
        setLabelList(newList)
        refetch()
    }

    if (loading || !labellist) return <h3>Loading...</h3>

    return (
        <div className="label_container relative">
            <div onClick={() => { setShow(!show) }} className="show_btn absolute h-6 w-6 -left-7 top-1.5 flex items-center justify-center rounded-lg hover:bg-gray-100">
                {
                    show ?
                        <FontAwesomeIcon icon={faChevronDown} className='text-xs text-gray-400' />
                        :
                        <FontAwesomeIcon icon={faChevronRight} className='text-xs text-gray-400' />
                }
            </div>
            <div className="label_header flex items-center border-b border-gray-300">
                <h2 className='label_title flex-1 py-1.5 pr-7 mr-0.5 text-sm font-semibold'>Labels</h2>
                <div className='add_label_area'>
                    <LabelPopup
                        type={'add'}
                        handleSubmit={handleAddLabel}
                    />
                </div>
            </div>
            {
                show &&
                <div className="label_body">
                    {
                         labellist.length === 0 ?
                            <div className='no_label_comment py-4 text-sm font-light text-gray-500'>
                                Your list of labels will show up here.
                            </div>
                            :
                            <div>
                                {
                                    labellist.map((label: any, index: any) => {
                                        return (
                                            <Label_Item
                                                key={index}
                                                label={label}
                                                handleSubmit={handleEditlabel}
                                                handleDelLabel={handleDelLabel}
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
export default Label;
