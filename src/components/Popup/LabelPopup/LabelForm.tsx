import { useState } from "react"
import ColorPicker from "../../ColorPicker/ColorPicker"
import { gql, useMutation } from "@apollo/client";
import { toast } from 'react-toastify'
import { useAuth } from "../../../context/auth";

const ADD_NEW_LABEL = gql`mutation MyMutation($color: String!, $label_name: String!, $user_id: Int!) {
    insert_label_one(object: {color: $color, label_name: $label_name, user_id: $user_id}) {
      id
      label_name
    }
  }
`
const EDIT_LABEL = gql`mutation MyMutation2($id: Int!, $color: String, $label_name: String) {
    update_label_by_pk(pk_columns: {id: $id}, _set: {color: $color, label_name: $label_name}) {
      label_name
    }
  }
  
`

function LabelForm(props: any) {
    const {userId} = useAuth()
    const [name, setName] = useState<string>(props.label.label_name ? props.label.label_name : "")
    const [color, setColor] = useState<string>(props.label.color ? props.label.color : "#808080")
    const [id, setId] = useState<any>(props.label.id ? props.label.id : null)


    const [addLabel, { data: data1, loading: loading1 }] = useMutation(ADD_NEW_LABEL)
        //, {
        // update(_, result) {
        //     toast.info("You add new label  " + name)
        //     setId(result.data.insert_label_one.id)
        // },
        // variables: {
        //     color: color,
        //     label_name: name,
        // }
        //}
        //)
    
    const [editLabel, { data: data2, loading: loading2 }] = useMutation(EDIT_LABEL, {
        update(_, result) {
            toast.info("You edit label  " + name)
        },
        variables: {
            id: id,
            color: color,
            label_name: name,
        }
    })
    function EditLabel() {
        editLabel();
    }


    async function handleSubmitClick() {
        if (id) {
            // edit label
            EditLabel()
            const newlabel = {
                id: id,
                label_name: name,
                color: color,
                user_id: userId
            }
            props.handleSubmit(newlabel)
            props.closePopup()
        }
        else {
            try {
                const result = await addLabel({ variables: { color: color, label_name: name, user_id: userId}});
                const newlabel = {
                    id: result.data.insert_label_one.id,
                    label_name: name,
                    color: color
                }
                toast.success("You added new label " + result.data.insert_label_one.label_name)
                props.handleSubmit(newlabel)
                props.closePopup()
            } catch (err) {
                console.log(err)
            }
        }
    }
    return (
        <div className="add_label_container rounded-lg bg-white text-black">
            <div className="add_label_title pl-4 py-2 pr-2 border-b border-gray-300">
                <h2 className="text-xl font-bold text-left">{props.type === 'add' ? 'Add' : 'Edit'} label</h2>
            </div>
            <div className="add_label_body px-4 pt-4 pb-8">

                <form action="" className="space-y-6">
                    <div className="add_label_name_input flex flex-col ">
                        <label htmlFor='name' className=" text-sm font-semibold text-left pb-2"> Name</label>
                        <input value={name} onChange={(e) => { setName(e.target.value) }} placeholder="label name" id="name" name="name" type="text" className="text-sm px-2 py-1.5 font-light rounded-lg border border-gray-300" />
                    </div>
                    <div className="add_label_color_input">
                        <h2 className=" text-sm font-semibold text-left pb-2"> Color</h2>
                        <ColorPicker
                            color={color}
                            handleChange={(value: string) => { setColor(value) }}
                        />
                    </div>
                </form>
            </div>
            <div className="add_label_footer flex justify-end space-x-2.5 mt-2 p-4 border-t border-gray-300">
                <button onClick={() => { props.closePopup() }} className="add_label_cancel_btn px-3 bg-gray-400/[0.3]  border rounded border-transparent text-sm text-slate-500 font-medium leading-8 hover:bg-gray-200">Cancel</button>
                <button onClick={handleSubmitClick} className="add_label_submit_btn bg-orange-700/[0.7] px-5  border rounded border-transparent text-sm font-medium leading-8 hover:bg-orange-500 text-white">{props.type === 'add' ? 'Add' : 'Save'}</button>
            </div>
        </div>
    )

}
export default LabelForm;
