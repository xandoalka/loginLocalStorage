import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"


const Nav = () => {

    const [loggedInEmail, setLoggedInEmail] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        const loggedInEmail = localStorage.getItem('loggedInEmail')

        if (loggedInEmail) {
            setLoggedInEmail(loggedInEmail)
        }
    }, [])

    const handleLogout = () => {
        const confirmed = window.confirm('Apakah anda ingin logout?')
        if (confirmed){
            setTimeout(() => {
                localStorage.removeItem('loggedInEmail')
                setLoggedInEmail('')
            }, 800);
        }
    }
    
    const login = ()=>{
        setTimeout(() => {
            navigate('/login')
        }, 500);
    }

    return (
        <nav className="bg-gray-900 text-white">
            <div className=" w-11/12 mx-auto flex justify-between h-16 items-center">
                <span className="font-bold">Naxqy.</span>
                <div className="flex items-center gap-4">
                    {loggedInEmail ? (
                        <>
                            <p>{loggedInEmail}</p>
                            <button onClick={handleLogout} className="bg-blue-500 w-20 h-8 grid place-items-center rounded">
                                    Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <button onClick={login} className=" bg-blue-500 w-20 h-8 grid place-items-center rounded">Login</button>
                        </>
                    )}
                </div>
            </div>
        </nav>
    )
}

export default Nav