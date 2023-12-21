import LabelPopup from '../Popup/LabelPopup/LabelPopup';
import './label_item.css'
import { useNavigate } from 'react-router-dom';
import { gql, useMutation } from '@apollo/client';
import {toast} from 'react-toastify'

const DELETE_LABEL = gql`mutation MyMutation($id: Int!) {
    delete_label_by_pk(id: $id) {
      id
    }
  }`

function Label_Item(props:any){
    const navigate = useNavigate()

    const [deleteLabel, { data, loading }] = useMutation(DELETE_LABEL, {
        update(_, result) {
            console.log(result)
            toast.dark("You delete a label")
        },
        variables: {id: props.label.id}
    })
    function DeleteLabel() {
        deleteLabel();
    }

    function handleDelLabel(e: any) {
        e.preventDefault()
        DeleteLabel()
        props.handleDelLabel(props.label.id)
    }

    return(
        <div className="label_item flex border-b border-gray-300 hover:cursor-pointer">
            <div onClick={()=>{navigate(`/label/${props.label.id}/${props.label.label_name}`)}}  className="label_item_name flex-1 flex items-center text-sm ">
                <div className="label_item_icon text-gray-400 mr-1" style={{color: props.label.color}}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path fill="currentColor" fillRule="evenodd" d="m3.914 11.086 6.5-6.5A2 2 0 0 1 11.828 4H18a2 2 0 0 1 2 2v6.172a2 2 0 0 1-.586 1.414l-6.5 6.5a2 2 0 0 1-2.828 0l-6.172-6.171a2 2 0 0 1 0-2.829Zm.707.707a1 1 0 0 0 0 1.415l6.172 6.171a1 1 0 0 0 1.414 0l6.5-6.5a1 1 0 0 0 .293-.707V6a1 1 0 0 0-1-1h-6.172a1 1 0 0 0-.707.293l-6.5 6.5Zm10.129-1.292a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5Z" clipRule="evenodd"></path></svg>
                </div>
                <span className="flex-1 leading-10">
                    {props.label.label_name}
                </span>
            </div>
            <div className="label_item_btn flex items-center text-sm text-gray-400 space-x-2">
                <LabelPopup 
                    type = {'edit'}
                    label = {props.label}
                    handleSubmit = {props.handleSubmit}
                />
                <button onClick={handleDelLabel} className="label_item_remove_btn h-7 w-7 flex items-center justify-center rounded-lg hover:bg-gray-100">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><g fill="none" fillRule="evenodd"><path d="M0 0h24v24H0z"></path><rect width="14" height="1" x="5" y="6" fill="currentColor" rx="0.5"></rect><path fill="currentColor" d="M10 9h1v8h-1V9zm3 0h1v8h-1V9z"></path><path stroke="currentColor" d="M17.5 6.5h-11V18A1.5 1.5 0 0 0 8 19.5h8a1.5 1.5 0 0 0 1.5-1.5V6.5zm-9 0h7V5A1.5 1.5 0 0 0 14 3.5h-4A1.5 1.5 0 0 0 8.5 5v1.5z"></path></g></svg>
                </button>
            </div>
        </div>
    )
}
export default Label_Item;
