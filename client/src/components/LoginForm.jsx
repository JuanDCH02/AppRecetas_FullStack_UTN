
import axios from 'axios'
import { useState } from 'react';

export const LoginForm = ({setUser}) => {
    const [errorMsg, setErrorMsg] = useState('');
    const [userInput, setUserInput] = useState('');
    const [password, setPassword] = useState('');
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:3000/auth/login', {
            usuario: userInput,
            password,
        });
        localStorage.setItem('token', res.data.token);
        setUser(res.data.user);
        setErrorMsg('')
    }   catch (err) {
        console.error('Login fallido:', err);
        const msg = 'Error al iniciar sesion';
        setErrorMsg(msg);
    }
};
    return (
    <form onSubmit={handleSubmit}>
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0 mt-50">
            <div className="w-full bg-emerald-100 rounded-lg shadow-lg border md:mt-0 sm:max-w-md xl:p-0 group">
                {errorMsg && (
                    <div className="bg-red-100 text-red-800 p-2 rounded mb-3">
                      {errorMsg}
                    </div>
                )}
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <p className="text-xl font-bold md:text-2xl"
                        >Login
                    </p>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900"
                            >Your username
                        </label>
                        <input placeholder="Pepito" 
                            className="bg-gray-50 border border-gray-300 sm:text-sm rounded-lg block w-full p-2.5" 
                            id="username" type="text" name='userInput' 
                            value={userInput} onChange={(e) => setUserInput(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900"
                            >Password
                        </label>
                        <input className="bg-gray-50 border border-gray-300 sm:text-sm rounded-lg block w-full p-2.5" 
                            placeholder="••••••••" 
                            id="confirmPassword" type="password" name='password'
                            value={password} onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button
                        className="transition-all duration-300 w-full hover:bg-emerald-700 hover:text-white font-medium rounded-lg text-md px-5 py-2.5 text-center"
                        type="submit"
                        >Ingresar
                    </button>
            
                </div>
            </div>
        </div>
    </form>
    
  )
}
