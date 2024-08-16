import { Link, NavLink, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Ajout d'un état pour le loader
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Affiche le loader

    try {
      const response = await axios.post('https://apigestionboisson.onrender.com/api/auth/signin', {
        email,
        password,
      });

      if (response.data && response.data.token) {
        localStorage.setItem('token', response.data.token);
        // alert('Connexion réussie');
        navigate('/admin');
      } else {
        setError('Email ou mot de passe incorrect');
      }
    } catch (error) {
      console.error('Erreur lors de la connexion :', error);
      setError('Email ou mot de passe incorrect');
    } finally {
      setIsLoading(false); // Cache le loader après la réponse
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className='border-b-2 border-white-500 p-2 shadow-md'>
          <NavLink className="rounded bg-cyan-500 w-32 p-2 hover:bg-cyan-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" to="/">
            <button className=''>Retour</button>
          </NavLink>
        </div>

        <div className="sm:mx-auto sm:w-full sm:max-w-sm pt-5">
          <img
            className="mx-auto h-32 w-auto"
            src="https://media.istockphoto.com/id/1407633532/fr/vectoriel/ic%C3%B4ne-oubliez-le-mot-de-passe-protection-du-compte-cl%C3%A9-de-s%C3%A9curit%C3%A9-avertissement-de.jpg?s=612x612&w=0&k=20&c=Zq5GkK7l-1ziZcy8kUGSAfErDQLFGrOW0CqRrgM-SHA="
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Connecte Toi
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleLogin}>
            {/* <div>
              <div className="flex items-center justify-between">
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                  Email
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  autoComplete="email"
                  required
                  className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div> */}

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Mot de passe
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  autoComplete="current-password"
                  required
                  className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              <div className="text-sm">
                <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                  Mot de passe oublié?
                </a>
              </div>
              {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
            </div>

            <div>
              {isLoading ? (
                <button
                  type="button"
                  className="flex w-full justify-center rounded-md bg-gray-800 px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm"
                  disabled
                >
                  <svg className="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24">
                    {/* Loader SVG */}
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    ></path>
                  </svg>
                  Connexion en cours...
                </button>
              ) : (
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-gray-800 px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Connexion
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
