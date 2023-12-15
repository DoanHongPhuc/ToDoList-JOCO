import { Select } from "antd";
function LabelColor(props:any){
    return (
        <div style={{display:'flex',alignItems:'center'} }>
            <div style={{backgroundColor:props.color, height: '12px',width:'12px',borderRadius:'12px', marginRight:'8px'}}></div>
            {props.label}
        </div>
    )
}
function ColorPicker(props:any){
    function handleChange(value:string){
        props.handleChange(value)
    }

    const ColorOption = [
        { value: '#808080', label: <LabelColor color={'#808080'} label={'Gray'} /> },
        { value: '#ff0000', label: <LabelColor color={'#ff0000'} label={'Red'} /> },
        { value: '#FFA500', label: <LabelColor color={'#FFA500'} label={'Orange'} /> },
        { value: '#FFFF00', label: <LabelColor color={'#FFFF00'} label={'Yellow'} /> },
        { value: '#008000', label: <LabelColor color={'#008000'} label={'Green'} /> },
        { value: '#0000FF', label: <LabelColor color={'#0000FF'} label={'Blue'} /> },
        { value: '#A52A2A', label: <LabelColor color={'#A52A2A'} label={'Brown'} /> },
        { value: '#EE82EE', label: <LabelColor color={'#EE82EE'} label={'Violet'} /> },
        { value: '#FFC0CB', label: <LabelColor color={'#FFC0CB'} label={'Pink'} /> }
    ];
    return (
        <div>
            <Select
                defaultValue={props.color}
                style={{ width: '100%'}}
                onChange={handleChange}
                options={ColorOption}
            />

        </div>
    )
}

export default ColorPicker;