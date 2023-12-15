import { useState } from 'react';
import './duedate.css'
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { DateField } from '@mui/x-date-pickers/DateField';
import dayjs, { Dayjs } from 'dayjs';

function DueDateDropDown(props: any) {

    const [time, setTime] = useState<string>(props.time ? props.time : "");
    const [value, setValue] = useState<any>(props.date ? dayjs(props.date) : dayjs())
    const Due_DateStr = time === '' ? value.format().split("T")[0]: value.format().split("T")[0]+ ' ' + time 

    const handleSaveClick = (e: any) => {
        e.preventDefault();
        const due_date = value.format().split("T")[0]
        const due_time = time
        props.handleSaveClick(due_date, due_time)
    }
    function getToday() {
        const today = dayjs();
        setValue(today)
    }
    function getTomorrow() {
        const today: Dayjs = dayjs();
        const tomorrow = today.add(1, "day");
        setValue(tomorrow)
    }
    function getNextWeekend() {
        const today = dayjs()
        const nextSaturday = today.day(0).add(6, 'day')
        setValue(nextSaturday)
    }
    function getNextWeek() {
        const today = dayjs();
        const nextMonday = today.add(7, 'day').day(0)
        setValue(nextMonday)
    }

    const today: Date = new Date();
    const optionsw: Intl.DateTimeFormatOptions = { weekday: 'short' };
    const options: Intl.DateTimeFormatOptions = { weekday: 'short', day: '2-digit', month: 'short' };
    const todayString: string = today.toLocaleDateString('en-US', optionsw);

    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    const tomorrowString: string = tomorrow.toLocaleDateString('en-US', optionsw);

    const nextSunday = new Date(today);
    nextSunday.setDate(today.getDate() + ((7 - today.getDay()) + 1) % 7 + 6);
    const nextWeekendStr = nextSunday.toLocaleDateString('en-US', options);

    const nextWeek = new Date(today);
    nextWeek.setDate(today.getDate() + 7);
    const nextWeekStr = nextWeek.toLocaleDateString('en-US', options);

    return (
        <div id='due_date_dropdown' className="due_date_dropdown absolute left-0 top-8 border rounded-lg border-gray-300 bg-white z-10">
            <div className="due_date_dropdown_title font-light text-sm pl-4 pt-1 pr-2 text-base leading-8 mb-1 border-b border-gray-300">
                <div className='hidden'>
                    <DateField
                        value={value}
                    />
                </div>
                {Due_DateStr}
            </div>
            <div className='due_date_dropdown_body overflow-auto overflow-x-hidden' style={{height:"300px"}}>
                <div className="due_date_dropdown_date_select">
                    <div onClick={getToday} className="due_date_dropdown_today pl-3 py-1 pr-4 leading-8 flex items-center text-sm hover:bg-gray-100 justify-between">
                        <div className="flex items-center">
                            <div className="due_date_dropdown_today_icon mr-2 font-medium text-green-500">
                                <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M20 6.00049C20 4.89592 19.1046 4.00049 18 4.00049H6C4.89543 4.00049 4 4.89592 4 6.00049V18.0005C4 19.1051 4.89543 20.0005 6 20.0005H18C19.1046 20.0005 20 19.1051 20 18.0005V6.00049ZM17 8.00049C17.2761 8.00049 17.5 8.22435 17.5 8.50049C17.5 8.77663 17.2761 9.00049 17 9.00049H7C6.72386 9.00049 6.5 8.77663 6.5 8.50049C6.5 8.22435 6.72386 8.00049 7 8.00049H17Z" fill="currentColor" /><text fontFamily="-apple-system, system-ui, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'" fontSize={9} transform="translate(4 2)" fontWeight={500} style={{ fill: 'var(--product-library-navbar-selected-fill)' }}><tspan x={8} y={15} textAnchor="middle">08</tspan></text></svg>
                            </div>
                            <p>Today</p>
                        </div>
                        <div className='text-xs font-light text-gray-400'>{todayString}</div>
                    </div>
                    <div onClick={getTomorrow} className="due_date_dropdown_tomorrow pl-3 py-1 pr-4 leading-8 flex items-center text-sm hover:bg-gray-100 justify-between">
                        <div className="flex items-center">
                            <div className="due_date_dropdown_tomorrow_icon mr-2 font-medium text-orange-500">
                                <svg width="24" height="24" viewBox="0 0 24 24" className="scheduler-suggestions-item-icon--tomorrow" aria-hidden="true" focusable="false"><g fill="currentColor" fillRule="nonzero"><path d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" opacity=".1"></path><path d="M9.704 17.543a.5.5 0 0 1 .27.654l-.956 2.31a.5.5 0 0 1-.924-.383l.957-2.31a.5.5 0 0 1 .653-.27zm5.245.27l.957 2.31a.5.5 0 0 1-.924.383l-.956-2.31a.5.5 0 0 1 .923-.382zM12 7.5a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9zm-5.543 6.796a.5.5 0 0 1-.27.653l-2.31.957a.5.5 0 0 1-.383-.924l2.31-.956a.5.5 0 0 1 .653.27zm11.74-.27l2.31.956a.5.5 0 0 1-.383.924l-2.31-.957a.5.5 0 0 1 .383-.923zM12 8.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7zm-8.124-.406l2.31.957a.5.5 0 0 1-.383.923l-2.31-.956a.5.5 0 0 1 .383-.924zm16.9.27a.5.5 0 0 1-.27.654l-2.31.956a.5.5 0 0 1-.382-.923l2.31-.957a.5.5 0 0 1 .653.27zM9.019 3.495l.956 2.31a.5.5 0 0 1-.923.382l-.957-2.31a.5.5 0 1 1 .924-.382zm6.617-.27a.5.5 0 0 1 .271.652l-.957 2.31a.5.5 0 0 1-.923-.383l.956-2.31a.5.5 0 0 1 .653-.27z"></path></g></svg>
                            </div>
                            <p>Tomorrow</p>
                        </div>
                        <div className='text-xs font-light text-gray-400'>{tomorrowString}</div>
                    </div>
                    <div onClick={getNextWeekend} className="due_date_dropdown_nextweekend pl-3 py-1 pr-4 leading-8 flex items-center text-sm hover:bg-gray-100 justify-between">
                        <div className="flex items-center">
                            <div className="due_date_dropdown_nextweekend_icon mr-2 font-medium text-blue-500 ">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="scheduler-suggestions-item-icon--weekend" aria-hidden="true" focusable="false"><path fill="currentColor" d="M16 6a3 3 0 0 1 3 3v1h.1c1 0 1.9 1 1.9 2v4c0 1-.8 2-1.9 2H18v.5a.5.5 0 0 1-1 0V18H7v.5a.5.5 0 0 1-1 0V18H5a2 2 0 0 1-2-2v-4c0-1.1.9-2 2-2V9a3 3 0 0 1 3-3h8zm3 5a1 1 0 0 0-1 .9V15H6v-3a1 1 0 0 0-2-.1V16c0 .5.4 1 .9 1H19a1 1 0 0 0 1-.9V12c0-.6-.4-1-1-1zm-3-4H8c-1 0-2 .8-2 1.9v1.4c.6.3 1 1 1 1.7v2h10v-2a2 2 0 0 1 1-1.7V9c0-1-.8-2-1.9-2H16z"></path></svg>
                            </div>
                            <p>Next Weekend</p>
                        </div>
                        <div className='text-xs font-light text-gray-400'>{nextWeekendStr}</div>
                    </div>
                    <div onClick={getNextWeek} className="due_date_dropdown_nextweek pl-3 py-1 pr-4 leading-8 flex items-center text-sm hover:bg-gray-100 justify-between">
                        <div className="flex items-center">
                            <div className="due_date_dropdown_nextweek_icon mr-2 font-medium text-violet-600">
                                <svg width="24" height="24" viewBox="0 0 24 24" className="scheduler-suggestions-item-icon--next-week" aria-hidden="true" focusable="false"><g fill="currentColor" fillRule="evenodd"><path fillRule="nonzero" d="M6 4.5h12A1.5 1.5 0 0 1 19.5 6v2.5h-15V6A1.5 1.5 0 0 1 6 4.5z" opacity=".1"></path><path fillRule="nonzero" d="M18 4a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h12zm0 1H6a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1zm-2.109 8.188l.007.01-.004-.005-.003-.005zM17 8a.5.5 0 1 1 0 1H7a.5.5 0 0 1 0-1h10zm-1 5.52a.504.504 0 0 1-.023.131l-.015.04a.494.494 0 0 1-.05.093l-.014.018a.503.503 0 0 1-.033.04l-2.511 2.512a.5.5 0 0 1-.765-.638l.057-.07L14.292 14H8.5a.5.5 0 0 1-.492-.41L8 13.5a.5.5 0 0 1 .41-.492L8.5 13h5.792l-1.646-1.646a.5.5 0 0 1 .638-.765l.07.057 2.511 2.513.017.019.009.01-.027-.03.03.035.029.04a.52.52 0 0 1 .066.162l.008.052v.007l-.002-.026.005.072v.02z"></path></g></svg>
                            </div>
                            <p>Next Week</p>
                        </div>
                        <div className='text-xs font-light text-gray-400'>{nextWeekStr}</div>
                    </div>
                    <DateCalendar
                        value={value}
                        onChange={(newValue) => setValue(newValue)}
                        className='due_date_calendar'
                    />
                </div>
            </div>
            <div className="due_date_dropdown_time_input_area p-1 relative border-t border-gray-300 pt-2">
                <input
                    type="time"
                    className="transition-all duration-300 py-2.5 pl-4 pr-14 w-full border border-gray-300 rounded-lg tracking-wide font-light text-sm placeholder-gray-400 bg-white focus:ring disabled:opacity-40 disabled:cursor-not-allowed focus:border-blue-500 focus:ring-blue-500/20"
                    placeholder="HH:MM"
                    autoComplete="on"
                    role="presentation"
                    value={time}
                    onChange={(e) => { setTime(e.target.value) }}
                />
            </div>
            <button className="duedate_dropdown_footer w-full border-t border-gray-300 mt-1 px-3 pt-2 pb-3">
                <button onClick={(e) => { handleSaveClick(e) }} className="w-full border rounded-lg border-gray-300 text-sm leading-7 hover:bg-gray-100">Save</button>
            </button>
            
        </div>
    )
}

export default DueDateDropDown;
