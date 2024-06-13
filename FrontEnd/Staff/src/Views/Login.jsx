import { useForm } from 'react-hook-form'
import { InputField } from './../Components/InputField'
import { Button } from '../Components/Button'
import LoginImg from './../Assets/LoginImg.png'
import { StickyFooterMobile } from '../Components/StickyFooterMobile'
import { Navbar } from '../Components/Navbar'
import { useNavigate } from 'react-router-dom'
import { postRequest } from '../Services/Api'
import Cookies from 'js-cookie'
import { useUser } from '../Services/AuthContext'

const LoginForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const navigate = useNavigate()

    // This will contain all form data once submit button is clicked.
    const onSubmit1 = (data) => {
        console.log(data)
        const sendDataToLogin = async () => {
            try {
                const dataToSend = {
                    mobile: data.Mobile,
                    password: data.Password
                }

                // console.log(dataToSend)

                const response = await postRequest('staff/login', dataToSend)
                // console.log(response)

                if (response.status == 200) {
                    alert('Login Successful')
                    // window.location.reload()
                    await Cookies.set('token', response.data.token, { expires: 1, secure: true, sameSite: 'strict' })
                    navigate('/profile')
                }
                else if (response.status === 400) {
                    alert('Invalid Credentials')
                }
                else {
                    alert('Something went wrong')
                }
            } catch (error) {
                alert('Invalid Credentials')
            }
        }
        sendDataToLogin()
    }

    // Registering the fields with react-hook-form
    register('Mobile', {    
        required: { value: true, message: 'Mobile is required' },
    })

    register('Password', {
        required: { value: true, message: 'Password is required' },
    })

    return (
        <>
            <Navbar />

            {/* flex div with login and image  */}
            <div className='flex justify-evenly w-screen items-center h-screen'>

                {/* login form div */}
                <div className='flex justify-center items-center h-screen'>

                    {/* form with box shadow */}
                    <form className='md:bg-white p-10 md:rounded-2xl md:shadow-2xl w-[400px] space-y-5 ' autoComplete='off'
                        id='loginForm' onSubmit={handleSubmit(onSubmit1)}>
                        <h1 className='text-2xl font-bold'>Staff Login</h1>
                        <p className='text-gray-500'>Please fill your detail to access your account.</p>

                        {/* Mobile and password input fields */}
                        <InputField
                            placeholder='Enter Mobile'
                            label='Mobile'
                            type='text'
                            register={register}
                            error={errors.Mobile?.message}
                        />
                        
                        <InputField
                            placeholder='Enter Password'
                            label='Password'
                            type='password'
                            register={register}
                            error={errors.Password?.message}
                        />

                        {/* login button */}
                        <Button type='submit'>Login</Button>
                    </form>
                </div>

                {/* image div, only displayed in large screens */}
                <div className='hidden lg:block'>
                    {/* image */}
                    <img src={LoginImg} alt='login' className='w-[600px]' />
                </div>
            </div>

            <StickyFooterMobile />
        </>
    )
}

export default LoginForm