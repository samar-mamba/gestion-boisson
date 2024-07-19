import React, { useState } from "react";
import axios from "axios";
import { Link, NavLink, useNavigate } from "react-router-dom"
import datacommande from "../src/Data/data.json"

function App() {

  const [formSubmitted, setFormSubmitted] = useState(false);

  const boissons = datacommande.boisson
  const tables = datacommande.table


  // tableau  boisson et table

  // const boissons = [
  //   { id: 1, nom: 'Bouteille deau' },
  //   { id: 2, nom: 'Fanta' },
  //   { id: 3, nom: 'Sprite' },
  //   { id: 4, nom: 'Vin rouge' },

  // ];

  // const tables = [
  //   { id: 1, nom: 'windows' },
  //   { id: 2, nom: 'virus' },
  //   { id: 3, nom: 'python' },
  //   { id: 4, nom: 'bcrypt' },

  // ];


  const [boissonSelectionnee, setBoissonSelectionnee] = useState(null);
  const [nom, setNom] = useState('');
  const [tableSelectionnee, setTableSelectionnee] = useState(null);

  const handleBoissonChange = (event) => {
    setBoissonSelectionnee(parseInt(event.target.value, 10));
  };

  const handleNomChange = (event) => {
    setNom(event.target.value);
  };

  const handleTableChange = (event) => {
    setTableSelectionnee(parseInt(event.target.value, 10));
  };

  // fonction envoi de données
  const handleSubmit = (event) => {
    event.preventDefault();
    if (boissonSelectionnee && nom && tableSelectionnee) {
      
      alert(`Commande envoyée : ${nom} - Table ${tableSelectionnee} - Boisson ${boissonSelectionnee}`);
      setFormSubmitted(true);
      // Envoyer la commande au serveur ici
    } else {
      alert('Veuillez sélectionner une boisson, un nom et une table.');
    }
  };

  // const handleLogin = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const response = await axios.post( {
  //       email,
  //       password,
  //     });
  //     if (response.data.token) {
  //       // Connexion réussie, rediriger vers la page d'accueil avec un message
  //       alert('Connexion réussie');


  //     } else {
  //       setError('Erreur lors de la connexion');
  //     }
  //   } catch (error) {
  //     console.error('Erreur lors de la connexion :', error);
  //     setError('Erreur lors de la connexion');
  //   }
  // };


  return (
    <section className="yl-10 px-6  lg:px-8">
      <div className='border-b-2 border-white-500  p-2 shadow-md'>
        <NavLink to="/admin"> 
        <button className='rounded  bg-cyan-500 w-32 p-2 hover:bg-cyan-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 '>
          
          Admin</button></NavLink>

      </div>

      <div className="container h-full ">
        <div className="g-6 flex  h-full flex-wrap  justify-center lg:justify-between">
          <div className="mb-12 md:mb-0  md:w-8/12 lg:w-6/12 ">
            <img
              src="https://res.cloudinary.com/dcgjop9dg/image/upload/v1721209418/fleur_fkrgdd.jpg"
              className="w-full rounded"
              alt="Phone image"
            />
          </div>
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Dites nous votre gout ?
              </h2>
              {/* {error && <p className="text-red-500 mb-4 sm-5">{error}</p>} */}

              <div>
                <label htmlFor="nom" className="block text-sm font-medium leading-6 text-gray-900">
                  Nom
                </label>
                <div className="mt-2">
                  <input
                    value={formSubmitted ? "" : nom}
                    onChange={handleNomChange}
                    id="nom"
                    name="ville"
                    placeholder="Nom complet"
                    type="text"
                    autoComplete="nom"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="choix" className="block text-sm font-medium leading-6 text-gray-900">
                    Voulez-vous boire:
                  </label>
                </div>
                <div className="mt-2">
                  <select className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    name="categorie" id="choix" value={formSubmitted ? "" : boissonSelectionnee} onChange={handleBoissonChange} >
                    <option value="">Sélectionner une boisson</option>
                    {boissons.map((boisson) => (
                      <option key={boisson.id} value={boisson.id}>
                        {boisson.nom}
                      </option>
                    ))}
                  </select>
                </div>

              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="choix" className="block text-sm font-medium leading-6 text-gray-900">
                    votre table:
                  </label>
                </div>
                <div className="mt-2">
                  <select className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    name="categorie" id="choix" value={formSubmitted ? "" : tableSelectionnee} onChange={handleTableChange}>
                    <option value="">Sélectionner une table</option>
                    {tables.map((table) => (
                      <option key={table.id} value={table.id}>
                        {table.nom}
                      </option>
                    ))}
                  </select>
                </div>

              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-cyan-500 px-3 py-2.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-cyan-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Commander
                </button>
              </div>

            </form>
            
          </div>
        </div>
      </div>
      <p class="text-center text-gray-500 text-lg m-8">
    &copy;2024 MadilaTech  mambasamar@gmail.com. All rights reserved.
  </p>

    </section>
  );
}







export default App;
