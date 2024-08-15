import axios from "axios";
import { useState, useEffect } from "react";
import { FaSyncAlt } from "react-icons/fa"; // Import the sync icon

function Admin() {
    const [commande, setCommande] = useState([]);

    useEffect(() => {
        const fetchCommandes = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get("https://apigestionboisson.onrender.com/api/com", {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setCommande(response.data);
            } catch (error) {
                console.error("Erreur lors de la récupération des commandes:", error);
                if (error.response && error.response.status === 401) {
                    alert("Vous n'êtes pas autorisé à accéder à cette page. Veuillez vous connecter.");
                }
            }
        };

        fetchCommandes();
    }, []);

    const handleCellClick = async (id, currentStatus) => {
        const newStatus = !currentStatus;

        try {
            await axios.patch(`https://apigestionboisson.onrender.com/api/com/${id}`, { status: newStatus });
            setCommande(prevCommandes => 
                prevCommandes.map(commande => 
                    commande._id === id ? { ...commande, status: newStatus } : commande
                )
            );
        } catch (error) {
            console.error("Erreur lors de la mise à jour du statut :", error);
        }
    };

    const handleRefresh = () => {
        window.location.reload();
    };

    return (
        <div className="pt-10 pb-20 lg:px-8 bg-gray-100 min-h-screen">
            <h2 className="mb-10 bg-blue-600 text-center text-white py-4 text-3xl font-semibold leading-9 tracking-tight shadow-lg rounded-lg">
                Commandes de boissons
            </h2>

            <div className="flex justify-end mb-5">
                <button 
                    onClick={handleRefresh} 
                    className="flex items-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-md"
                >
                    <FaSyncAlt className="mr-2" /> Actualiser le tableau
                </button>
            </div>

            <div className="overflow-x-auto shadow-lg rounded-lg">
                <table className="min-w-full bg-white border border-slate-300">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Nom</th>
                            <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Boissons</th>
                            <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Table</th>
                            <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Statut</th>
                        </tr>
                    </thead>
                    <tbody>
                        {commande && commande.map(commande => (
                            <tr key={commande._id} className="hover:bg-gray-50">
                                <td className="py-3 px-4 border-b border-slate-300">{commande.nom}</td>
                                <td className="py-3 px-4 border-b border-slate-300">{commande.boissonNom}</td>
                                <td className="py-3 px-4 border-b border-slate-300">{commande.tableNom}</td>
                                <td 
                                    className={`py-3 px-4 border-b border-slate-300 cursor-pointer text-center font-semibold ${commande.status ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}
                                    onClick={() => handleCellClick(commande._id, commande.status)}
                                >
                                    {commande.status ? 'Servi' : 'En attente'}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Admin;
