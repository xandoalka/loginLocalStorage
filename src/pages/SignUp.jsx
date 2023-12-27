import { useRef, useState} from "react"
import { Link, useNavigate } from "react-router-dom"

const SignUp = ()=>{
    const emailRef = useRef(null)
    const passwordRef = useRef(null)
    const [errorMessage, setErrorMessage] = useState('')
    const [successMessage, setSuccessMessage] = useState('')
    const navigate = useNavigate()

    console.log(localStorage);

    const handleSubmit = (e)=>{
        e.preventDefault()

        const email = emailRef.current.value
        const password = passwordRef.current.value

        const existingData = localStorage.getItem('signupData');

        const dataArray = existingData ? JSON.parse(existingData) : []

        const emailExists = dataArray.some((data) => data.email === email);
        if (emailExists) {
            setErrorMessage('Email already exists. Please use a different email.');
            return;
        } else if (password.length < 8) {
            setErrorMessage('Password must be at least 8 characters long.');
            return;
        } else if (password.startsWith(' ')) {
            setErrorMessage('Password cannot start with spaces.');
            return;
        }

        const newSignUpData = { email, password };
        dataArray.push(newSignUpData);
        
        localStorage.setItem('signupData', JSON.stringify(dataArray));

        emailRef.current.value = ''
        passwordRef.current.value = ''
        setErrorMessage('')
        setSuccessMessage('Registration successful! Please proceed to login.')

        setTimeout(() => {
            navigate('/login')
          }, 2000)
    }

    return(
        <section className="flex justify-center items-center h-screen">
            <div className="relative bg-white max-w-md mx-auto w-full px-12 py-8 flex gap-12 flex-col items-center rounded shadow-md">
                <h2 className="text-3xl font-semibold">Register</h2>
                    {successMessage && <p className="text-green-500 absolute top-20">{successMessage}</p>}
                    {errorMessage && <p className="text-red-500 absolute top-20">{errorMessage}</p>}
                <form onSubmit={handleSubmit} className="flex flex-col gap-8 w-full">
                    <input 
                        required 
                        pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$" 
                        className="border-b focus:outline-none focus:border-black focus:invalid:border-red-500 invalid:text-red-600" 
                        type="text" 
                        id="Email" 
                        placeholder="Email"
                        ref={emailRef}/>
                    <input 
                        required 
                        className="border-b focus:outline-none focus:border-black" 
                        type="password" 
                        id="password"  
                        placeholder="Password"
                        ref={passwordRef}/>
                    <button className="bg-black text-white py-2 rounded" type="submit">SignUp</button>
                    <p>Already have an account?{' '}
                        <Link to={"/login"} className="text-cyan-600">Login</Link>
                    </p>
                </form>
            </div>
        </section>
    )
}

export default SignUp