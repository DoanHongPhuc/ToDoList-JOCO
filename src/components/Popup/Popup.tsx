function Popup(props:any){
    return(
        <div className="popup_background fixed left-0 top-0 right-0 bottom-0 bg-black/[0.05] z-20">
            <div className="popup_body absolute h-auto top-28 right-0 left-0 z-auto flex justify-center">
                {props.children}
            </div>
        </div>
    )
}
export default Popup;