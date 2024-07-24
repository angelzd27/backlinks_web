import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import Swal from "sweetalert2";
import { IoIosArrowBack } from 'react-icons/io'
import { BD_ACTION_POST } from '../../services/request'
import { validateEmail, validateName, validatePassword } from '../../utils/validators';

export const Register = () => {
    return (
        <section>
            <div className='lg:flex items-center lg:gap-96 md:gap-52 sm:gap-28 gap-10 lg:ml-28 md:ml-20 sm:ml-12 ml-5 mt-5'>
                <Link to="/" className='flex items-center justify-center mb-10'>
                    <button className='bg-zinc-400 p-4 rounded-full lg:h-16 md:h-14 h-12 lg:w-16 md:w-14 w-12 lg:text-3xl md:text-2xl text-xl flex items-center justify-center mr-8 text-white'>
                        <IoIosArrowBack />
                    </button>
                    <span className='lg:text-5xl md:text-4xl text-3xl font-bold text-center'>Create Account</span>
                </Link>
            </div>
            <RegisterForm />
            <div className='w-full flex justify-center mb-5 pt-10'>
                <span className='text-sm'>By creating an account, you agree with our Terms & Conditions and Privacy Policy</span>
            </div>
        </section>
    )
}

export const RegisterForm = ({ setIsOpen, updateTable }) => {
    const navigate = useNavigate()
    const location = useLocation()
    const [form, setForm] = useState({
        name: '',
        nameError: false,
        lastName: '',
        lastNameError: false,
        gender: '',
        genderError: false,
        email: '',
        emailError: false,
        password: '',
        passwordError: false,
        confirmPassword: '',
        confirmPasswordError: false,
        profile: '2',
        profileError: false,
    })

    const register = async () => {
        const isNameValid = validateName(form.name)
        const isLastNameValid = validateName(form.lastName)
        const isGenderValid = !!form.gender
        const isEmailValid = validateEmail(form.email)
        const isPasswordValid = validatePassword(form.password)
        const isConfirmPasswordValid = form.password === form.confirmPassword
        const isProfileValid = !!form.profile

        const updatedForm = {
            ...form,
            nameError: !isNameValid,
            lastNameError: !isLastNameValid,
            genderError: !isGenderValid,
            emailError: !isEmailValid,
            passwordError: !isPasswordValid,
            confirmPasswordError: !isConfirmPasswordValid,
            profileError: !isProfileValid,
        }
        setForm(updatedForm)

        if (isNameValid && isLastNameValid && location.pathname === '/auth/register' ? isGenderValid : true && isEmailValid && isPasswordValid && isConfirmPasswordValid) {
            const body = {
                id: 0,
                name: form.name,
                last_name: form.lastName,
                email: form.email,
                password: form.password,
                id_profile: form.profile,
                status: 1,
            }
            try {
                const data = await BD_ACTION_POST('create_user', body)

                if (!data.error) {
                    Swal.fire(
                        "Registed!",
                        'Your account has been created!',
                        'success'
                    )
                    if (location.pathname === '/auth/register') {
                        navigate('/auth')
                    } else {
                        setIsOpen(false)
                        updateTable()
                    }
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'An error occurred, please try again later!',
                    })
                }
            } catch (error) {
                console.error(error);
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'An error occurred while creating the user!',
                })
            }
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'An error occurred, check your information!',
            })
        }
    }
    return (
        <>
            <div className='flex lg:flex-row md:flex-row sm:flex-col flex-col items-center justify-around mt-16 gap-5 lg:mx-28 md:mx-7 mx-5 w-full'>
                <div className='flex flex-col lg:w-w-1/2 md:w-1/2 sm:full'>
                    <h1 className='text-2xl font-bold mb-3'>Personal Information</h1>
                    {/* Name Input */}
                    <label className='mt-4'>Name *</label>
                    <input className='bg-gray-200 rounded-3xl px-4 mt-1 h-10' type="text" placeholder='Your name' onChange={(e) => setForm({ ...form, name: e.target.value })} />
                    <span className='text-sm text-red-600 italic'>{form.nameError ? "Invalid name" : ""}</span>
                    {/* Last Name Input */}
                    <label className='mt-4'>Last Name *</label>
                    <input className='bg-gray-200 rounded-3xl px-4 mt-1 h-10' type="text" placeholder='Your last name' onChange={(e) => setForm({ ...form, lastName: e.target.value })} />
                    <span className='text-sm text-red-600 italic'>{form.lastNameError ? "Invalid name" : ""}</span>
                    {(location.pathname === '/auth/register') ? (<>
                        {/* Gender Select */}
                        <label className='mt-4'>Gender *</label>
                        <select id="profile" className='bg-gray-200 rounded-3xl px-2 mt-1 h-10' value={form.gender} onChange={(e) => setForm({ ...form, gender: e.target.value })}>
                            <option value="">Select Gender</option>
                            <option value="1">Male</option>
                            <option value="2">Female</option>
                        </select>
                        <span className='text-sm text-red-600 italic'>{form.genderError ? "Select a gender" : ""}</span>
                    </>) : (<>
                        {/* Profile Select */}
                        <label className='mt-4'>Profile *</label>
                        <select id="profile" className='bg-gray-200 rounded-3xl px-2 mt-1 h-10' value={form.profile} onChange={(e) => setForm({ ...form, profile: e.target.value })}>
                            <option value="">Select Profile</option>
                            <option value="1">Admin</option>
                            <option value="2">User</option>
                        </select>
                        <span className='text-sm text-red-600 italic'>{form.profileError ? "Select a profile" : ""}</span>
                    </>)}

                </div>
                {/* Account Information */}
                <div className='flex flex-col lg:w-w-1/2 md:w-1/2 sm:full w-full'>
                    <h1 className='text-2xl font-bold mb-3'>Account Information</h1>
                    {/* Email Input */}
                    <label className='mt-4'>Email *</label>
                    <input className='bg-gray-200 rounded-3xl px-4 mt-1 h-10' type="email" placeholder='Your email' onChange={(e) => setForm({ ...form, email: e.target.value })} />
                    <span className='text-sm text-red-600 italic'>{form.emailError ? "Invalid email" : ""}</span>
                    {/* Password Input */}
                    <label className='mt-4'>Password *</label>
                    <input className='bg-gray-200 rounded-3xl px-4 mt-1 h-10' type="password" placeholder='Create a password' onChange={(e) => setForm({ ...form, password: e.target.value })} />
                    <span className='text-sm text-red-600 italic'>{form.passwordError ? "Your password must have uppercase, lowercase, numbers and a special character." : ""}</span>
                    {/* Confirm Password Input */}
                    <label className='mt-4'>Confirm Password *</label>
                    <input className='bg-gray-200 rounded-3xl px-4 mt-1 h-10' type="password" placeholder='Confirm your password' onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })} />
                    <span className='text-sm text-red-600 italic'>{form.confirmPasswordError ? "Password doesn't mach" : ""}</span>
                </div>
            </div>
            <div className='w-full flex justify-center items-center lg:mt-16 md:mt-14 sm:mt-12 my-10'>
                <button className='bg-blue-600 hover:bg-blue-700 text-white py-4 px-20 rounded-3xl font-bold text-lg' onClick={register}>Register</button>
            </div>
        </>
    )
}