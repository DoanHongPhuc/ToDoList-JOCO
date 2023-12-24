import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../context/auth";
import { gql, useMutation } from "@apollo/client";
import { toast } from 'react-toastify'

const SIGN_IN_MUTATION = gql`mutation MyMutation($mail: String!, $password: String!) {
    signin(mail: $mail, password: $password) {
      refreshToken
      token
      statusCode
      message
      id
      user_name
    }
  }  
`

function Login() {
    const { updateToken } = useAuth()
    const [email, setEmail] = useState<any>("")
    const [password, setPW] = useState<any>("")
    const navigate = useNavigate()

    const [signin, { data, loading, error }] = useMutation(SIGN_IN_MUTATION)

    async function handleSubmit(e: any) {
        e.preventDefault()
        try {
            const result = await signin({ variables: { mail: email, password: password } })
            if (result.data.signin.statusCode !== 200) { toast.error(result.data.signin.message) }
            if (result.data.signin.statusCode === 200) {
                updateToken(result.data.signin.token, result.data.signin.id, result.data.signin.user_name,email)
                navigate("/")
            }
        } catch (e) {
            toast.error("Unhandled Error happen! Please check your input")
            console.log(e);
        }
    }


    return (
        <div className="flex flex-col justify-center px-6 py-12 lg:px-8 min-h-full">
            <div>
                <div className="login_logo mx-auto flex items-center justify-center">
                    <div className="login_logo_icon w-12 h-12 flex items-center justify-center rounded-xl mr-2" style={{ backgroundColor: '#dc4c3e' }}>
                        <FontAwesomeIcon icon={faBook} className="text-3xl text-white" />
                    </div>
                    <p className="login_logo_text text-2xl font-bold" style={{ color: '#dc4c3e' }}>Todolist</p>
                </div>
                <h2 className="font-bold text-center text-2xl mt-8 leading-9 text-gray-900 tracking-tight">We 've missed you!</h2>
            </div>
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" action="#" method="post">
                    <div>
                        <label htmlFor="email" className="block text-base font-medium leading-6 text-gray-900">Email address</label>
                        <div className="mt-2">
                            <input value={email} onChange={(e) => { setEmail(e.target.value) }} type="text" id="email" name="email" autoComplete="email" required className="font-semibold outline-none block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-700 sm:text-sm sm:leading-6" />
                        </div>
                    </div>

                    <div>
                        <div className="flex justify-between items-center">
                            <label htmlFor="password" className="block text-base font-medium leading-6 text-gray-900">Password</label>
                            <div className="text-sm">
                                <a href='/login' role='button' className="font-semibold text-orange-700 hover:text-orange-600" style={{ color: '#dc4c3e' }}>Forgot Password?</a>
                            </div>
                        </div>
                        <div className="mt-2">
                            <input value={password} onChange={(e) => { setPW(e.target.value) }} type="password" id="password" name="password" autoComplete="current-password" required className="font-semibold outline-none w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6" />
                        </div>
                    </div>

                    <div>
                        <button onClick={handleSubmit} type="submit" className=" w-full rounded-md bg-orange-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-700" style={{ backgroundColor: '#dc4c3e' }}>
                            Sign in
                        </button>
                        <button onClick={() => (navigate('/register'))} className="w-full rounded-md bg-slate-400 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-slate-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-700 mt-4">
                            Create New Account
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )

}
export default Login;
