import './filter_label.css'
import Filter from './Filter';
import Label from './Label';
function Filter_Label(){
    
    return(
        <div className="fb_container px-14 w-full flex flex-col items-center">
            <div className="fb_header pt-12 pb-3 mb-6">
                <div className='fb_header_title text-xl font-bold leading-9'>
                    Filters & Labels
                </div>
            </div>
            <div className="fb_body space-y-8">
                <Filter />
                <Label />

            </div>
                
        </div>
    )
    
}
export default Filter_Label;