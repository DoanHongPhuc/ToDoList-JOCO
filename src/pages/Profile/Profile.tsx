import { useState } from 'react';
import './profile.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../../context/auth';
import { gql, useMutation } from '@apollo/client';
import {toast} from 'react-toastify'


const CHANGE_EMAIL = gql`mutation MyMutation2($id: Int!,  $user_email: String!) {
    update_user_by_pk(pk_columns: {id: $id}, _set: {mail: $user_email}) {
      id
      refreshToken
      user_name
    }
  }`

const CHANGE_NAME = gql`mutation MyMutation2($id: Int!,  $user_name: String!) {
    update_user_by_pk(pk_columns: {id: $id}, _set: {user_name: $user_name}) {
        id
        refreshToken
        user_name
    }
  }`
function Profile(props:any){
    const { token, userId, user_name,user_email, updateToken } = useAuth()
    const id = parseInt(userId ? userId : '0')
    
    const [N,setN] = useState<string>(user_name? user_name:'')
    const [E,setE] = useState<string>(user_email? user_email:'')
    const [PW2,setPW2] = useState<string>("")
    const [PW,setPW] = useState<string>("")
    const [editName,setEditName] = useState<boolean>(false)
    const [editEmail,setEditEmail] = useState<boolean>(false)
    const [editPW,setEditPW] = useState<boolean>(false)
    const [visible,setVisible] = useState<boolean>(false)
    const [changeUserName] = useMutation(CHANGE_NAME, {
        update(_, result) {
            console.log(result)
            toast.success("You change new user_name ")
            updateToken(token,id,N,user_email)

        },
        onError(err){
            console.log(err)
            toast.error("Error!!!")
        },
        variables: {id: id,user_name: N}
    }) 

    const [changeUseEmail] = useMutation(CHANGE_EMAIL, {
        update(_, result) {
            console.log(result)
            toast.success("You change new user_email ")
            updateToken(token,id,user_name,E)
        },
        onError(err){
            console.log(err)
            toast.error("Error!!!")
        },
        variables: {id: id,user_email: E}
    })
    function handleSaveName(){
        changeUserName()
        setEditName(false)
    }
    function handleSaveEmail(){
        changeUseEmail()
        setEditEmail(false)
    }
    function handleSavePW(){
        if (PW !== PW2){
            toast.info("Password not match !!!")
        }
        else{
            setEditPW(false)
        }

    }
    
    return (
        <div className="profile_container px-14 w-full flex flex-col items-center">
            <div className="profile_header pt-12  pb-3  border-b border-gray-300">
                <div className='profile_header_title text-xl font-bold leading-9'>
                    Profile
                </div>
            </div>
            <div className="profile_body space-y-6">
                <div className='profile_name_area'>
                    <div className="profile_name_title text-base font-semibold leading-12" >Name</div>
                    {
                        !editName ?
                        <div className="profile_name_input flex items-center">
                            <div className='w-3/5 ml-2 mr-2 text-sm leading-10'>
                                {user_name}
                            </div>
                            <button onClick={()=>{setEditName(true)}} className='profile_change_name_btn text-sm w-28 border border-gray-100 rounded-lg bg-gray-200 px-2 py-1 hover:bg-gray-300'>Change Name</button>
                        </div>
                        :
                        <div className="profile_name_input flex items-center">
                            <input className='w-3/5 pl-2 mr-2 text-sm leading-10 border border-gray-100 focus:outline-none' type="text" value={N} onChange={(e)=>{setN(e.target.value)}} />
                            <button onClick={handleSaveName} className='profile_save_name_btn text-sm w-20 border border-gray-100 rounded-lg bg-yellow-600/[0.7] px-2 py-1 hover:bg-gray-300 mr-2'>Save</button>
                            <button onClick={()=>{setEditName(false)}} className='profile_cancel_name_btn text-sm w-20 border border-gray-100 rounded-lg bg-gray-200 px-2 py-1 hover:bg-gray-300'>Cancel</button>
                        </div>
                    }
                </div>
                <div className='profile_email_area'>
                    <div className="profile_email_title  text-base font-semibold leading-12">Email</div>
                    {
                        !editEmail?
                            <div className="profile_email_input flex items-center">
                                <div className='w-3/5 ml-2 mr-2 text-sm leading-10'>
                                    {user_email}
                                </div>
                                <button onClick={()=>{setEditEmail(true)}} className='profile_change_email_btn text-sm w-28 border border-gray-100 rounded-lg bg-gray-200 px-2 py-1 hover:bg-gray-300'>Change Email</button>
                            </div>
                        :
                        <div className="profile_email_input flex items-center">
                            <input className='w-3/5 pl-2 mr-2 text-sm leading-10 border border-gray-100 focus:outline-none' type="text" value={E} onChange={(e)=>{setE(e.target.value)}} />
                            <button onClick={handleSaveEmail} className='profile_save_email_btn text-sm w-20 border border-gray-100 rounded-lg bg-yellow-600/[0.7] px-2 py-1 hover:bg-gray-300 mr-2'>Save</button>
                            <button onClick={()=>{setEditEmail(false)}} className='profile_cancel_email_btn text-sm w-20 border border-gray-100 rounded-lg bg-gray-200 px-2 py-1 hover:bg-gray-300'>Cancel</button>
                        </div>
                    }
                    
                </div>
                <div className='profile_pw_area'>
                    {
                        !editPW ?
                        <>
                            <div className="profile_pw_title text-base font-semibold leading-12">Password</div>
                            <div className="profile_pw_input flex items-center">
                                <div className='w-3/5 ml-2 mr-2 text-sm leading-10 flex items-center'>
                                    {
                                        !visible ?
                                        <div className='w-full flex'>
                                            <input type="password" className='flex-1 bg-white' value={'12345678'} disabled/>
                                            <button className='w-10'>
                                                <FontAwesomeIcon icon={faEyeSlash} />
                                            </button>
                                        </div>
                                        :
                                        <div className='w-full flex'>
                                            <input type="text" className='flex-1 bg-white' value={'12345678'} disabled/>
                                            <button className='w-10' onClick={()=>setVisible(false)}>
                                                <FontAwesomeIcon icon={faEye} />
                                            </button>
                                        </div>

                                    }
                                </div>
                                <button  onClick={()=>{setEditPW(true)}} className='profile_change_pw_btn text-sm w-28 border border-gray-100 rounded-lg bg-gray-200 px-2 py-1 hover:bg-gray-300'>Edit Password</button>
                            </div>
                        </>
                        :  
                        <div className='flex items-center '>
                            <div className='w-3/5 mr-4'>
                                <div className="profile_pw_title text-base font-semibold leading-12 pb-4">Password</div>
                                <input type="password" className='w-full pl-2 mr-2 text-sm leading-10 border border-gray-100 focus:outline-none mb-4' value={PW} onChange={(e)=>{setPW(e.target.value)}}/>
                                <div className="profile_pw_title text-base font-semibold leading-12 pb-4"> Repeat Password</div>
                                <input type="password" className='w-full pl-2 mr-2 text-sm leading-10 border border-gray-100 focus:outline-none' value={PW2} onChange={(e)=>{setPW2(e.target.value)}}/> 
                            </div>
                            <div className='flex flex-col items-center justify-around h-full'>
                                <button onClick={handleSavePW} className='profile_save_email_btn text-sm w-28 border border-gray-100 rounded-lg bg-yellow-600/[0.7] px-2 py-1 hover:bg-gray-300 mt-10 mb-14'>Save</button>
                                <button onClick={()=>{setEditPW(false)}} className='profile_cancel_email_btn text-sm w-28 border border-gray-100 rounded-lg bg-gray-200 px-2 py-1 hover:bg-gray-300'>Cancel</button>
                            </div>
                        </div>
                    }       
                    
                </div>
            </div>
        </div>
    )
}
export default Profile;