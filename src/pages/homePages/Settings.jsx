import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { IoIosArrowBack } from 'react-icons/io'
import { decodedJWT, getJWT } from '../../services/jwt'
import { BD_ACTION_DELETE, BD_ACTION_GET, BD_ACTION_POST } from '../../services/request'
import { EmailModal } from '../../components/CreateModal'
import { FiSave } from "react-icons/fi";
import { validateEmail } from '../../utils/validators'
import Swal from 'sweetalert2'

const Settings = () => {
    const jwt = decodedJWT()
    const user = jwt.user_id
    const [rerender, setRerender] = useState(false);
    const [emails, setEmails] = useState([])

    const [form, setForm] = useState({
        name: user.name,
        nameError: false,
        lastName: user.last_name,
        lastNameError: false,
        email: user.email,
        emailError: false,
    })

    const [formConfig, setFormConfig] = useState({
        id: "",
        pages_number: "",
        pages_number_error: false,
        contact_number: "",
        contact_number_error: false,
        author: "",
        author_error: false,
        config_email: "",
        config_email_error: false,
        url: "",
        url_error: false,
        comment: "",
        comment_error: false,
        subject: "",
        subject_error: false,
        message: "",
        message_error: false,
        related_emails: ""
    })

    const update = () => {
        setRerender(prev => !prev);
    }

    const updateConfig = async () => {
        const isValidNumberPages = formConfig.pages_number > 0
        const isValidNumberContacts = formConfig.contact_number > 0
        const isValidAuthor = formConfig.author.length > 0
        const isValidEmail = validateEmail(formConfig.config_email)
        const isValidUrl = formConfig.url.length > 0
        const isValidComment = formConfig.comment.length > 0
        const isValidSubject = formConfig.subject.length > 0
        const isValidMessage = formConfig.message.length > 0

        const updatedForm = {
            ...formConfig,
            pages_number_error: !isValidNumberPages,
            contact_number_error: !isValidNumberContacts,
            author_error: !isValidAuthor,
            config_email_error: !isValidEmail,
            url_error: !isValidUrl,
            comment_error: !isValidComment,
            subject_error: !isValidSubject,
            message_error: !isValidMessage,
        }
        setFormConfig(updatedForm)

        if (isValidNumberPages && isValidNumberContacts && isValidAuthor && isValidEmail && isValidUrl && isValidComment && isValidSubject && isValidMessage) {
            const body = {
                id: formConfig.id,
                pages_number: formConfig.pages_number,
                contacts_number: formConfig.contact_number,
                author: formConfig.author,
                email: formConfig.config_email,
                url: formConfig.url,
                comment: formConfig.comment,
                subject: formConfig.subject,
                message: formConfig.message,
            }
            console.log(body);
            try {
                const data = await BD_ACTION_POST('edit_config', body, getJWT())
                console.log(data);

                if (!data.error) {
                    Swal.fire(
                        "Configuration edited!",
                        'Your configuration has been edited!',
                        'success'
                    )
                    update()
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
                    text: 'An error occurred while editing the configuration!',
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

    const getConfig = async () => {
        const data = await BD_ACTION_GET(`get_config/${user.id_profile}`, null, getJWT())

        const updatedForm = {
            ...formConfig,
            id: data.msg[0].id,
            pages_number: data.msg[0].pages_number,
            contact_number: data.msg[0].contact_number,
            author: data.msg[0].author,
            config_email: data.msg[0].config_email,
            url: data.msg[0].url,
            comment: data.msg[0].comment,
            subject: data.msg[0].subject,
            message: data.msg[0].message,
            related_emails: data.msg[0].related_emails
        }
        setFormConfig(updatedForm)
        setEmails(JSON.parse(data.msg[0].related_emails))
    }

    useEffect(() => {
        getConfig()
    }, [rerender])

    const EmailContainer = ({ id, email, password }) => {
        const [form, setForm] = useState({
            email: email,
            emailError: false,
            password: password,
            passwordError: false,
        })

        const editEmail = async () => {
            const isEmailValid = validateEmail(form.email)
            const isPasswordValid = form.password.length > 0

            const updatedForm = {
                ...form,
                emailError: !isEmailValid,
                passwordError: !isPasswordValid,
            }
            setForm(updatedForm)

            if (isEmailValid && isPasswordValid) {
                const body = {
                    id: id,
                    email: form.email,
                    password: form.password,
                    status: 1
                }
                try {
                    const data = await BD_ACTION_POST('edit_email', body, getJWT())
                    console.log(data);

                    if (!data.error) {
                        Swal.fire(
                            "Email edited!",
                            'Your email has been edited!',
                            'success'
                        )
                        update()
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
                        text: 'An error occurred while editing the email!',
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

        const removeEmail = async () => {
            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#1F9C19",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
            }).then(async (result) => {
                if (result.isConfirmed) {
                    const data = await BD_ACTION_DELETE('delete_email', id, getJWT())
                    console.log(data);
                    if (data.error) {
                        Swal.fire({
                            icon: "error",
                            title: "Oops...",
                            text: "Server error try again!",
                        });
                    } else {
                        Swal.fire({
                            title: "Deleted!",
                            text: `Email deleted`,
                            icon: "success"
                        });
                        update()
                    }
                }
            });
        }

        return (
            <>
                {(email != null & password != null) ? (
                    <div className='flex flex-row items-center justify-around mt-5 mb-5'>
                        <div className='flex flex-row w-full gap-7'>
                            <div className='w-1/2'>
                                <p className='mt-4'>Email *</p>
                                <input className='bg-gray-200 rounded-3xl px-4 mt-1 h-10 w-full' type="email" value={form.email || ""} placeholder='Write your email' onChange={(e) => setForm({ ...form, email: e.target.value })} />
                                <span className='text-sm text-red-600 italic'>{form.emailError ? "Invalid email" : ""}</span>
                            </div>
                            <div className='w-1/2'>

                                <p className='mt-4'>Password *</p>
                                <input className='bg-gray-200 rounded-3xl px-4 mt-1 h-10 w-full' type="text" value={form.password || ""} placeholder='Write your password' onChange={(e) => setForm({ ...form, password: e.target.value })} />
                                <span className='text-sm text-red-600 italic'>{form.passwordError ? "Invalid password" : ""}</span>
                            </div>
                            <button className="text-green-600 hover:text-green-700 hover:underline font-bold rounded-xl mt-7" onClick={editEmail}>Save</button>
                            <button className="text-red-400 hover:text-red-500 hover:underline font-bold rounded-xl mt-7" onClick={removeEmail}>Remove</button>
                        </div>
                    </div>
                ) : (
                    <></>
                )}
            </>

        )
    }

    return (
        <div className='bg-okip-100 dark:bg-okip-700 lg:px-10 md:px-8 sm:px-6 px-5 pt-10 pb-32'>
            <div className='w-full flex justify-between'>
                <Link to="/" className='flex items-center justify-center mb-10'>
                    <button className='bg-zinc-400 p-4 rounded-full lg:h-16 md:h-14 h-12 lg:w-16 md:w-14 w-12 lg:text-3xl md:text-2xl text-xl flex items-center justify-center mr-8 text-white'>
                        <IoIosArrowBack />
                    </button>
                    <span className='lg:text-5xl md:text-4xl text-3xl font-bold text-center'>Settings</span>
                </Link>
                <button className='px-20 h-12 text-white text-2xl rounded-3xl bg-blue-600 hover:bg-blue-700 font-bold' onClick={updateConfig}><div className='flex justify-center items-center gap-5'><p>Save configuration</p> <FiSave /></div></button>
            </div>
            <span className='text-2xl text-center ml-24'>Settings and options for your application.</span>

            <div className='flex mt-10 mx-24'>
                <div className='w-1/2'>
                    <h2 className='text-3xl font-bold mt-10 mb-5'>Personal Information</h2>
                    <p>Change your personal Information</p>
                </div>
                <div className='w-1/2'>
                    <div className='flex lg:flex-row md:flex-row sm:flex-col flex-col items-center justify-around mt-5 mb-5'>
                        <div className='flex flex-col w-full'>

                            <p className='mt-4'>Name *</p>
                            <input className='bg-gray-200 rounded-3xl px-4 mt-1 h-10' type="text" value={form.name || ""} placeholder='Your name' onChange={(e) => setForm({ ...form, name: e.target.value })} />
                            <span className='text-sm text-red-600 italic'>{form.nameError ? "Invalid name" : ""}</span>
                            {/* Last Name Input */}
                            <p className='mt-4'>Last Name *</p>
                            <input className='bg-gray-200 rounded-3xl px-4 mt-1 h-10' type="text" value={form.lastName || ""} placeholder='Your last name' onChange={(e) => setForm({ ...form, lastName: e.target.value })} />
                            <span className='text-sm text-red-600 italic'>{form.lastNameError ? "Invalid last name" : ""}</span>
                            {/* Email Input */}
                            <p className='mt-4'>Email *</p>
                            <input className='bg-gray-200 rounded-3xl px-4 mt-1 h-10' type="email" value={form.email || ""} placeholder='Your email' onChange={(e) => setForm({ ...form, email: e.target.value })} />
                            <span className='text-sm text-red-600 italic'>{form.emailError ? "Invalid email" : ""}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className='flex mt-10 mx-24'>
                <div className='w-1/2'>
                    <h2 className='text-3xl font-bold mt-10 mb-5'>Searcher Information</h2>
                    <p>Change the configuration of sercher</p>
                </div>
                <div className='w-1/2'>
                    <div className='flex flex-row items-center justify-around mt-5 mb-5'>
                        <div className='flex flex-row w-full gap-7'>
                            <div className='w-1/2'>

                                <p className='mt-4'>Nomber of pages *</p>
                                <input className='bg-gray-200 rounded-3xl px-4 mt-1 h-10 w-full' type="text" value={formConfig.pages_number || ""} placeholder='Write the number of pages to search' onChange={(e) => setFormConfig({ ...formConfig, pages_number: e.target.value })} />
                                <span className='text-sm text-red-600 italic'>{formConfig.pages_number_error ? "Invalid number of pages" : ""}</span>
                            </div>
                            <div className='w-1/2'>

                                <p className='mt-4'>Number of contacts *</p>
                                <input className='bg-gray-200 rounded-3xl px-4 mt-1 h-10 w-full' type="text" value={formConfig.contact_number || ""} placeholder='Write the number of contacts to search' onChange={(e) => setFormConfig({ ...formConfig, contact_number: e.target.value })} />
                                <span className='text-sm text-red-600 italic'>{formConfig.contact_number_error ? "Invalid number of contacts" : ""}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='flex mt-10 mx-24'>
                <div className='w-1/2'>
                    <h2 className='text-3xl font-bold mt-4 mb-5'>Comment configuration</h2>
                    <p>Change the configuration of the Information or your comments</p>
                </div>
                <div className='w-1/2'>

                    <p className='mt-4'>Author *</p>
                    <input className='bg-gray-200 rounded-3xl px-4 mt-1 h-10 w-full' type="text" value={formConfig.author || ""} placeholder='Author of the comment' onChange={(e) => setFormConfig({ ...formConfig, author: e.target.value })} />
                    <span className='text-sm text-red-600 italic'>{formConfig.author_error ? "Invalid author" : ""}</span>

                    <p className='mt-4'>Email *</p>
                    <input className='bg-gray-200 rounded-3xl px-4 mt-1 h-10 w-full' type="text" value={formConfig.config_email || ""} placeholder='Email to sent in comment' onChange={(e) => setFormConfig({ ...formConfig, config_email: e.target.value })} />
                    <span className='text-sm text-red-600 italic'>{formConfig.config_email_error ? "Invalid email" : ""}</span>

                    <p className='mt-4'>Url *</p>
                    <input className='bg-gray-200 rounded-3xl px-4 mt-1 h-10 w-full' type="text" value={formConfig.url || ""} placeholder='Url to send in comment' onChange={(e) => setFormConfig({ ...formConfig, url: e.target.value })} />
                    <span className='text-sm text-red-600 italic'>{formConfig.url_error ? "Invalid url" : ""}</span>

                    <p className='mt-4'>Comment *</p>
                    <textarea className='bg-gray-200 rounded-3xl px-4 py-2 mt-1 h-32 w-full' type="text" value={formConfig.comment || ""} placeholder='Write the comment that you want to send' onChange={(e) => setFormConfig({ ...formConfig, comment: e.target.value })} />
                    <span className='text-sm text-red-600 italic'>{formConfig.comment_error ? "Invalid comment" : ""}</span>
                </div>
            </div>

            <div className='flex mt-10 mx-24'>
                <div className='w-1/2'>
                    <h2 className='text-3xl font-bold mt-4 mb-5'>Email configuration</h2>
                    <p>Change the configuration of your emails</p>
                </div>
                <div className='w-1/2'>

                    <p className='mt-4'>Subject *</p>
                    <input className='bg-gray-200 rounded-3xl px-4 mt-1 h-10 w-full' type="text" value={formConfig.subject || ""} placeholder='Email subject' onChange={(e) => setFormConfig({ ...formConfig, subject: e.target.value })} />
                    <span className='text-sm text-red-600 italic'>{formConfig.subject_error ? "Invalid subject" : ""}</span>

                    <p className='mt-4'>Message Text/HTML *</p>
                    <textarea className='bg-gray-200 rounded-3xl px-4 py-2 mt-1 h-96 w-full' type="text" value={formConfig.message || ""} placeholder='Email body' onChange={(e) => setFormConfig({ ...formConfig, message: e.target.value })} />
                    <span className='text-sm text-red-600 italic'>{formConfig.message_error ? "Invalid message" : ""}</span>
                </div>
            </div>

            <div className='flex mt-10 mx-24'>
                <div className='w-1/2'>
                    <h2 className='text-3xl font-bold mt-4 mb-5'>Linked Accounts</h2>
                    <p>Change the credentials of your accounts</p>
                </div>
                <div className='w-1/2'>
                    {emails.map((email, index) => (<EmailContainer key={index} id={email.id} email={email.email} password={email.password} />))}
                    <div className='w-full flex justify-end'>
                        <EmailModal id={formConfig.id} text="Add Email" update={update} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Settings