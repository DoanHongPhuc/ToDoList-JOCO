import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook } from "@fortawesome/free-solid-svg-icons";

function Register() {
    const navigate = useNavigate()
    const [email, setEmail] = useState<string>('')
    const [password, setPw] = useState<string>('')
    const [Spassword, setSPw] = useState<string>('')
    let errorString  = ''
    if (password !== Spassword){
        errorString = 'Password Not Match!!!'
    }
    return(
        <div className="flex flex-col justify-center px-6 py-12 lg:px-8 min-h-full">
            <div>
                <div className="login_logo mx-auto flex items-center justify-center">
                    <div className="login_logo_icon w-12 h-12 flex items-center justify-center rounded-xl mr-2" style={{backgroundColor: '#dc4c3e'}}>
                        <FontAwesomeIcon icon={faBook} className="text-3xl text-white" />
                    </div>
                    <p className="login_logo_text text-2xl font-bold" style={{color:'#dc4c3e'}}>Todolist</p>
                </div>
                <h2 className="font-bold text-center text-2xl mt-8 leading-9 text-gray-900 tracking-tight">Sign in to your account</h2>
            </div>
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" action="#" method="post">
                    <div>
                        <label htmlFor="email" className="block text-base font-medium leading-6 text-gray-900">Email address</label>
                        <div className="mt-2"> 
                            <input onChange={(e)=>{setEmail(e.target.value)}} value={email} type="email" id="email" name="email" autoComplete="email" required className="font-semibold outline-none block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6" />
                        </div>
                    </div>
                    
                    <div>
                        <div className="flex justify-between items-center">
                            <label htmlFor="password" className="block text-base font-medium leading-6 text-gray-900">Password</label>
                        </div>
                        <div className="mt-2">
                            <input onChange={(e)=>{setPw(e.target.value)}} type="password" id="password" name="password" autoComplete="current-password" required className="font-semibold outline-none w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6" />
                        </div>
                    </div>

                    <div>
                        <div className="flex justify-between items-center">
                            <label htmlFor="second-password" className="block text-base font-medium leading-6 text-gray-900">Confirm password</label>
                        </div>
                        <div className="mt-2">
                            <input onChange={(e)=>{setSPw(e.target.value)}} type="password" id="second-password" name="second-password" autoComplete="current-password" required className="font-semibold outline-none w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6" />
                        </div>
                    </div>
                    <div className='w-full text-center font-semibold text-sm text-red-500/[0.7]'>
                        {errorString}
                    </div>
                    <div>
                        <button  type="submit" className=" w-full rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600" style={{backgroundColor:'#dc4c3e'}}>
                            Create new Account
                        </button>
                        <button onClick={()=>{ navigate('/login')}} className="w-full rounded-md bg-slate-400 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-slate-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600 mt-4">
                            Sign In
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Register;