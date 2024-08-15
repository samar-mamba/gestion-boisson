import React, { useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import datacommande from "../src/Data/data.json";

function App() {
  const boissons = datacommande.boisson;
  const tables = datacommande.table;

  const [boissonSelectionnee, setBoissonSelectionnee] = useState(null);
  const [nom, setNom] = useState('');
  const [tableSelectionnee, setTableSelectionnee] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const handleBoissonChange = (event) => {
    setBoissonSelectionnee(parseInt(event.target.value, 10));
  };

  const handleNomChange = (event) => {
    setNom(event.target.value);
  };

  const handleTableChange = (event) => {
    setTableSelectionnee(parseInt(event.target.value, 10));
  };

  const getNomById = (id, type) => {
    const list = type === 'boisson' ? boissons : tables;
    const item = list.find((item) => item.id === parseInt(id, 10));
    return item ? item.nom : '';
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (boissonSelectionnee && nom && tableSelectionnee) {
      
      const boissonNom = getNomById(boissonSelectionnee, 'boisson');
      const tableNom = getNomById(tableSelectionnee, 'table');

      try {
        const response = await axios.post("https://apigestionboisson.onrender.com/api/com", {
          nom,
          boissonNom,
          tableNom,
          status: false,
        });
        if (response.status === 201) {
          setNom('');
          setBoissonSelectionnee(null);
          setTableSelectionnee(null);
          setShowPopup(true); // Afficher la pop-up
        } else {
          console.error("Erreur lors de l'envoi de la commande");
        }
      } catch (error) {
        console.error("Erreur d'envoi de la commande :", error);
        alert("Une erreur est survenue. Veuillez réessayer plus tard.");
      }
    } else {
      alert("Veuillez sélectionner une boisson, un nom et une table.");
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false); // Fermer la pop-up
  };

  return (
    <section className="yl-10 px-6  lg:px-8">
      <div className='border-b-2 border-white-500  p-2 shadow-md'>
        <NavLink to="/login"> 
          <button className='rounded  bg-cyan-500 w-32 p-2 hover:bg-cyan-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 '>
            Admin
          </button>
        </NavLink>
      </div>

      <div className="container h-full">
        <div className="g-6 flex h-full flex-wrap justify-center lg:justify-between">
          <div className="mb-12 md:mb-0 md:w-8/12 lg:w-6/12">
            <img
              src="https://res.cloudinary.com/dcgjop9dg/image/upload/v1723682072/photo_2024-08-15_01-30-32_lon0s1.jpg"
              className="w-full rounded"
              alt="Phone image"
            />
          </div>
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Dites nous votre gout ?
              </h2>

              <div>
                <label htmlFor="nom" className="block text-sm font-medium leading-6 text-gray-900">
                  Prénom et Nom
                </label>
                <div className="mt-2">
                  <input
                    value={nom}
                    onChange={handleNomChange}
                    id="nom"
                    name="nom"
                    placeholder="Prenom et Nom"
                    type="text"
                    autoComplete="nom"
                    required
                    className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                  <select className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    name="categorie" id="choix" value={boissonSelectionnee || ''} onChange={handleBoissonChange}>
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
                  <select className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    name="categorie" id="choix" value={tableSelectionnee || ''} onChange={handleTableChange}>
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

      {showPopup && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Commande réussie !</h2>
            <p>Votre commande a été envoyée avec succès.</p>
            <button
              className="mt-4 rounded bg-cyan-500 px-4 py-2 text-white hover:bg-cyan-600"
              onClick={handleClosePopup}
            >
              Fermer
            </button>
          </div>
        </div>
      )}

      <p className="text-center text-gray-500 text-lg m-8">
        &copy;2024 MadilaTech mambasamar@gmail.com. All rights reserved.
      </p>
    </section>
  );
}

export default App;
