import React from 'react'

export const LoginForm = () => {
  return (
    <form>
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0 mt-20">
            <div className="w-full bg-emerald-100 rounded-lg shadow-lg border md:mt-0 sm:max-w-md xl:p-0 group">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <p className="text-xl font-bold md:text-2xl"
                        >Login
                    </p>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900"
                            >Your username
                        </label>
                        <input placeholder="Pepito" className="bg-gray-50 border border-gray-300 sm:text-sm rounded-lg block w-full p-2.5" id="username" type="text"/>
                    </div>

                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900"
                            >Password
                        </label>
                        <input className="bg-gray-50 border border-gray-300 sm:text-sm rounded-lg block w-full p-2.5" placeholder="••••••••" id="confirmPassword" type="password"/>
                    </div>
                    <button
                        className="opacity-0 group-hover:opacity-100 transition-all duration-300 w-full hover:bg-emerald-700 hover:text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                        type="submit"
                        >Ingresar
                    </button>
            
                </div>
            </div>
        </div>
    </form>
    
  )
}
