import { useState, useEffect } from 'react'
import { removeJWT, setJWT } from '../../services/jwt'
import { Link, useNavigate } from 'react-router-dom'
import { validateEmail, validatePassword } from '../../utils/validators'
import { BD_ACTION_POST } from '../../services/request'
import Swal from 'sweetalert2'

const Login = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [emailError, setEmailError] = useState(false)
    const [password, setPassword] = useState("")
    const [passwordError, setPasswordError] = useState(false)

    useEffect(() => {
        removeJWT()
    }, [])

    const sign_in = async () => {
        const isEmailValid = validateEmail(email);
        const isPasswordValid = validatePassword(password);

        setEmailError(!isEmailValid)
        setPasswordError(!isPasswordValid)

        if (isEmailValid && isPasswordValid) {
            const body = {
                email: email,
                password: password,
            };
            const data = await BD_ACTION_POST('login', body)
            console.log(data)
            if (!data.error) {
                setJWT(data.token);
                Swal.fire(
                    "You're in!",
                    'You have successfully logged in!',
                    'success'
                )
                navigate('/')
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: data.msg,
                })
            }
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'An error occurred, check your email or password!',
            })
        }
    };
    return (
        <>
            <div className='flex flex-col col-span-1 items-center justify-center h-screen lg:px-32 md:px-24 px-16 lg:mt-0 md:mt-16 lg:ml-10'>
                <h1 className='lg:text-6xl md:text-4xl sm:text-3xl text-3xl font-extrabold text-center mb-20'>Welcome Back</h1>
                <h3 className='font-semibold text-2xl'>Type your credentials</h3>
                <div className='flex flex-col justify-start items-start rounded-3xl p-8 px-10 text-lg'>
                    <label>Email *</label>
                    <input className='bg-white rounded-3xl px-4 py-1.5 mt-1 w-96 text-base border border-gray-400 focus:outline-none focus:border-bug-800 duration-200' placeholder='Write your email' type="email" onChange={(e) => setEmail(e.target.value)} />
                    <span className='text-sm text-red-600 italic'>{emailError ? "Invalid email" : ""}</span>
                    <label className='mt-3'>Password *</label>
                    <input className='bg-white rounded-3xl px-4 py-1.5 mt-1 w-96 text-base border border-gray-400 focus:outline-none focus:border-bug-800 duration-200' placeholder='Write your password' type="password" onChange={(e) => setPassword(e.target.value)} />
                    <span className='text-sm text-red-600 italic'>{passwordError ? "Invalid password" : ""}</span>
                    <Link className='text-sm mt-5 font-bold hover:cursor-pointer' to='/auth/recovery'>
                        Forgot your password?
                    </Link>
                    <h3 className=''></h3>
                </div>

                <button className='bg-blue-600 hover:shadow-2xl p-2 px-10 rounded-3xl my-5 font-bold text-white' onClick={sign_in}>Login</button>
            </div>
        </>
    )
}

export default Login