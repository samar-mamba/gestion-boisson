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
  const [isLoading, setIsLoading] = useState(false); // État pour gérer le loader

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
      setIsLoading(true); // Afficher le loader
      
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
      } finally {
        setIsLoading(false); // Masquer le loader une fois la commande envoyée
      }
    } else {
      alert("Veuillez sélectionner une boisson, un nom et une table.");
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false); // Fermer la pop-up
  };

  return (
    <section className="py-10 px-6 lg:px-8 bg-gray-50 min-h-screen">
      <div className='border-b-2 border-gray-300 p-2 shadow-md mb-10'>
        <NavLink to="/login"> 
          <button className='rounded bg-gradient-to-r from-cyan-500 to-blue-600 w-32 p-2 hover:from-cyan-600 hover:to-blue-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
            Se Connecter
          </button>
        </NavLink>
      </div>

      <div className="container mx-auto">
        <div className="flex flex-wrap justify-center lg:justify-between items-center">
          <div className="mb-12 md:mb-0 md:w-8/12 lg:w-6/12">
            <img
              src="https://res.cloudinary.com/dcgjop9dg/image/upload/v1723682072/photo_2024-08-15_01-30-32_lon0s1.jpg"
              className="w-full rounded-lg shadow-lg"
              alt="Image téléphone"
            />
          </div>
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6 bg-white p-8 rounded-lg shadow-lg" onSubmit={handleSubmit}>
              <h2 className="text-center text-3xl font-extrabold text-gray-900">
                Dites-nous votre goût !
              </h2>

              <p className="text-center text-gray-600 mb-4">
                Remplissez le formulaire ci-dessous pour nous indiquer ce que vous souhaitez boire aujourd'hui. Nous nous occupons du reste !
              </p>

              <div>
                <label htmlFor="nom" className="block text-sm font-medium text-gray-700">
                  Prénom et Nom
                </label>
                <div className="mt-2">
                  <input
                    value={nom}
                    onChange={handleNomChange}
                    id="nom"
                    name="nom"
                    placeholder="Entrez votre prénom et nom"
                    type="text"
                    autoComplete="nom"
                    required
                    className="p-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <p className="text-gray-500 text-sm mt-1">Ce champ est obligatoire.</p>
              </div>

              <div>
                <label htmlFor="choix-boisson" className="block text-sm font-medium text-gray-700">
                  Choisissez votre boisson :
                </label>
                <div className="mt-2">
                  <select
                    id="choix-boisson"
                    name="boisson"
                    value={boissonSelectionnee || ''}
                    onChange={handleBoissonChange}
                    className="p-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  >
                    <option value="">Sélectionner une boisson</option>
                    {boissons.map((boisson) => (
                      <option key={boisson.id} value={boisson.id}>
                        {boisson.nom}
                      </option>
                    ))}
                  </select>
                </div>
                <p className="text-gray-500 text-sm mt-1">Sélectionnez votre boisson préférée parmi nos options.</p>
              </div>

              <div>
                <label htmlFor="choix-table" className="block text-sm font-medium text-gray-700">
                  Choisissez votre table :
                </label>
                <div className="mt-2">
                  <select
                    id="choix-table"
                    name="table"
                    value={tableSelectionnee || ''}
                    onChange={handleTableChange}
                    className="p-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  >
                    <option value="">Sélectionner une table</option>
                    {tables.map((table) => (
                      <option key={table.id} value={table.id}>
                        {table.nom}
                      </option>
                    ))}
                  </select>
                </div>
                <p className="text-gray-500 text-sm mt-1">Veuillez choisir votre table pour que nous sachions où vous apporter votre commande.</p>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-gradient-to-r from-cyan-500 to-blue-600 px-3 py-2.5 text-sm font-semibold leading-6 text-white shadow-sm hover:from-cyan-600 hover:to-blue-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Passer la commande
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {isLoading && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 border-4 border-t-4 border-gray-200 rounded-full animate-spin"></div>
            <span className="text-white text-xl">Envoi en cours...</span>
          </div>
        </div>
      )}

      {showPopup && !isLoading && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-2xl font-bold text-center text-gray-900 mb-4">Commande réussie !</h2>
            <p className="text-center text-gray-600">Votre commande a été envoyée avec succès. Nous vous apporterons votre boisson à la table que vous avez choisie dans les plus brefs délais.</p>
            <div className="mt-6 flex justify-center">
              <button
                className="rounded-md bg-cyan-500 px-4 py-2 text-white hover:bg-cyan-600 transition duration-300"
                onClick={handleClosePopup}
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}

      <footer className="text-center text-gray-500 text-lg mt-12">
        &copy; &copy;2024 MadilaTech mambasamar@gmail.com. Tous droits réservés.
      </footer>
    </section>
  );
}

export default App;
