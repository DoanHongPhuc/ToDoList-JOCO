import { useState } from 'react';
import './profile.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../../context/auth';
import { gql, useMutation } from '@apollo/client';
import { toast } from 'react-toastify'

const cloud_name = 'dfcl4jofp'
const upload_preset = 'h1r8kgif'
const upload_url = `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`

const CHANGE_PASSWORD = gql`mutation UpdatePw($id: String!, $password: String!){
    updatePassword(id: $id, password: $password) {
        token
        statusCode
        message
    }
}`
const CHANGE_AVATAR = gql`mutation MyMutation1($id: Int!,  $avatar: String!) {
    update_user_by_pk(pk_columns: {id: $id}, _set: {image: $avatar}) {
      id
    }
  }
`
const CHANGE_EMAIL = gql`mutation MyMutation2($id: Int!,  $user_email: String!) {
    update_user_by_pk(pk_columns: {id: $id}, _set: {mail: $user_email}) {
      id
    }
  }`

const CHANGE_NAME = gql`mutation MyMutation3($id: Int!,  $user_name: String!) {
    update_user_by_pk(pk_columns: {id: $id}, _set: {user_name: $user_name}) {
        id
    }
  }`

function Profile(props: any) {
    const { token, userId, user_name, user_email, avatar, updateToken } = useAuth()
    const id = parseInt(userId ? userId : '0')

    const [N, setN] = useState<string>(user_name ? user_name : '')
    const [E, setE] = useState<string>(user_email ? user_email : '')
    const [PW2, setPW2] = useState<string>("")
    const [PW, setPW] = useState<string>("")
    const [A, setA] = useState<string>(avatar ? avatar : "https://live.staticflickr.com/65535/53362224454_0fcc605d5d_w.jpg")
    const [uploadImg, setUploadImg] = useState<any>(null);

    const [editName, setEditName] = useState<boolean>(false)
    const [editEmail, setEditEmail] = useState<boolean>(false)
    const [editPW, setEditPW] = useState<boolean>(false)
    const [editImg, setEditImg] = useState<boolean>(false)
    const [visible, setVisible] = useState<boolean>(false)

    const [changeUserName] = useMutation(CHANGE_NAME, {
        update(_, result) {
            //console.log(result)
            toast.success("You changed your username ")
            updateToken(token, id, N, user_email, avatar)

        },
        onError(err) {
            console.log(err)
            toast.error("Error!!!")
        },
        variables: { id: id, user_name: N }
    })
    const [changeUserEmail] = useMutation(CHANGE_EMAIL, {
        update(_, result) {
            //console.log(result)
            toast.success("You changed your email ")
            updateToken(token, id, user_name, E, avatar)
        },
        onError(err) {
            console.log(err)
            toast.error("Error!!!")
        },
        variables: { id: id, user_email: E }
    })
    const [changeUserPassword] = useMutation(CHANGE_PASSWORD, {
        update(_, result) {
            if (result.data.updatePassword.statusCode !== 200) {
                toast.error(result.data.updatePassword.message)
            }
            toast.success("You changed your password ")
            updateToken(result.data.updatePassword.token, id, user_name, E, avatar)
        },
        onError(err) {
            console.log(err)
            toast.error("Error!!!")
        },
        variables: { id: userId, password: PW }
    })
    const [changeUserAvatar] = useMutation(CHANGE_AVATAR, {
        onError(err) {
            console.log(err)
            toast.error("Error!!!")
        }
    })

    function handleSaveName() {
        changeUserName()
        setEditName(false)
    }
    function handleSaveEmail() {
        changeUserEmail()
        setEditEmail(false)
    }
    function handleSavePW(e: any) {
        e.preventDefault()
        if (PW !== PW2 || PW === '') {
            console.log(PW)
            toast.info("Please check your input")
        }
        else {
            changeUserPassword()
            setEditPW(false)
        }

    }
    function handleImageChange(e: any) {
        setUploadImg(e.target.files[0])
        setA(URL.createObjectURL(e.target.files[0]))
    }
    async function handleSaveAvatar(e: any) {
        e.preventDefault()
        try {
            if (uploadImg && ["image/png", "image/jpeg", "image/jpg"].includes(uploadImg.type)) {
                const formData = new FormData()
                formData.append("file", uploadImg)
                formData.append("cloud_name", cloud_name)
                formData.append("upload_preset", upload_preset)
                const response = await fetch(upload_url, { method: "post", body: formData })
                const jsonRes = await response.json()
                setA(jsonRes.url.toString())
                //update on db
                const updateDb = await changeUserAvatar({ variables: {id: id, avatar: jsonRes.url.toString()}})
                if(!updateDb.errors) {
                    toast.success("You sucessfully upload image")
                    updateToken(token, id, user_name, user_email, jsonRes.url.toString())
                }
                setEditImg(false)
            }
        } catch (error) {
            toast.error("Error happened")
            console.log(error)
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
                                <button onClick={() => { setEditName(true) }} className='profile_change_name_btn text-sm w-28 border border-gray-100 rounded-lg bg-gray-200 px-2 py-1 hover:bg-gray-300'>Change Name</button>
                            </div>
                            :
                            <div className="profile_name_input flex items-center">
                                <input className='w-3/5 pl-2 mr-2 text-sm leading-10 border border-gray-100 focus:outline-none' type="text" value={N} onChange={(e) => { setN(e.target.value) }} />
                                <button onClick={handleSaveName} className='profile_save_name_btn text-sm w-20 border border-gray-100 rounded-lg bg-yellow-600/[0.7] px-2 py-1 hover:bg-gray-300 mr-2'>Save</button>
                                <button onClick={() => { setEditName(false) }} className='profile_cancel_name_btn text-sm w-20 border border-gray-100 rounded-lg bg-gray-200 px-2 py-1 hover:bg-gray-300'>Cancel</button>
                            </div>
                    }
                </div>
                <div className='profile_email_area'>
                    <div className="profile_email_title  text-base font-semibold leading-12">Email</div>
                    {
                        !editEmail ?
                            <div className="profile_email_input flex items-center">
                                <div className='w-3/5 ml-2 mr-2 text-sm leading-10'>
                                    {user_email}
                                </div>
                                <button onClick={() => { setEditEmail(true) }} className='profile_change_email_btn text-sm w-28 border border-gray-100 rounded-lg bg-gray-200 px-2 py-1 hover:bg-gray-300'>Change Email</button>
                            </div>
                            :
                            <div className="profile_email_input flex items-center">
                                <input className='w-3/5 pl-2 mr-2 text-sm leading-10 border border-gray-100 focus:outline-none' type="text" value={E} onChange={(e) => { setE(e.target.value) }} />
                                <button onClick={handleSaveEmail} className='profile_save_email_btn text-sm w-20 border border-gray-100 rounded-lg bg-yellow-600/[0.7] px-2 py-1 hover:bg-gray-300 mr-2'>Save</button>
                                <button onClick={() => { setEditEmail(false) }} className='profile_cancel_email_btn text-sm w-20 border border-gray-100 rounded-lg bg-gray-200 px-2 py-1 hover:bg-gray-300'>Cancel</button>
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
                                                    <input type="password" className='flex-1 bg-white' value={'12345678'} disabled />
                                                    <button className='w-10'>
                                                        <FontAwesomeIcon icon={faEyeSlash} />
                                                    </button>
                                                </div>
                                                :
                                                <div className='w-full flex'>
                                                    <input type="text" className='flex-1 bg-white' value={'12345678'} disabled />
                                                    <button className='w-10' onClick={() => setVisible(false)}>
                                                        <FontAwesomeIcon icon={faEye} />
                                                    </button>
                                                </div>

                                        }
                                    </div>
                                    <button onClick={() => { setEditPW(true) }} className='profile_change_pw_btn text-sm w-28 border border-gray-100 rounded-lg bg-gray-200 px-2 py-1 hover:bg-gray-300'>Edit Password</button>
                                </div>
                            </>
                            :
                            <div className='flex items-center '>
                                <div className='w-3/5 mr-4'>
                                    <div className="profile_pw_title text-base font-semibold leading-12 pb-4">Password</div>
                                    <input type="password" className='w-full pl-2 mr-2 text-sm leading-10 border border-gray-100 focus:outline-none mb-4' value={PW} onChange={(e) => { setPW(e.target.value) }} />
                                    <div className="profile_pw_title text-base font-semibold leading-12 pb-4"> Repeat Password</div>
                                    <input type="password" className='w-full pl-2 mr-2 text-sm leading-10 border border-gray-100 focus:outline-none' value={PW2} onChange={(e) => { setPW2(e.target.value) }} />
                                </div>
                                <div className='flex flex-col items-center justify-around h-full'>
                                    <button onClick={handleSavePW} className='profile_save_email_btn text-sm w-28 border border-gray-100 rounded-lg bg-yellow-600/[0.7] px-2 py-1 hover:bg-gray-300 mt-10 mb-14'>Save</button>
                                    <button onClick={() => { setEditPW(false) }} className='profile_cancel_email_btn text-sm w-28 border border-gray-100 rounded-lg bg-gray-200 px-2 py-1 hover:bg-gray-300'>Cancel</button>
                                </div>
                            </div>
                    }

                </div>
                <div className='profile_name_area'>
                    <div className="profile_name_title text-base font-semibold leading-12" >Avatar</div>
                    {
                        !editImg ?
                            <div className="profile_name_input flex items-center">
                                <div className='w-3/5 ml-2 mr-2 text-sm leading-10'>
                                    <img src={A} alt="user avatar" className='profile_avatar_image mt-3' />
                                </div>
                                <button onClick={() => { setEditImg(true) }} className='profile_change_name_btn text-sm w-28 border border-gray-100 rounded-lg bg-gray-200 px-2 py-1 hover:bg-gray-300'>Change Avatar</button>
                            </div>
                            :
                            <>
                                <div className="profile_name_input flex items-center">
                                    <input className='w-3/5 pl-2 mr-2 text-sm leading-10 border border-gray-100 focus:outline-none'
                                        type="file" onChange={handleImageChange} accept='image/png, image/jpeg, image/jpg'
                                    />
                                    <button onClick={handleSaveAvatar} className='profile_save_name_btn text-sm w-20 border border-gray-100 rounded-lg bg-yellow-600/[0.7] px-2 py-1 hover:bg-gray-300 mr-2'>Save</button>
                                    <button onClick={() => { setEditImg(false) }} className='profile_cancel_name_btn text-sm w-20 border border-gray-100 rounded-lg bg-gray-200 px-2 py-1 hover:bg-gray-300'>Cancel</button>
                                </div>
                                <div className='w-full flex items-center justify-center mt-3'>
                                    <img src={A} alt="preview before upload" className='profile_image_preview' />
                                </div>
                            </>
                    }
                </div>
            </div>
        </div>
    )
}
export default Profile;
