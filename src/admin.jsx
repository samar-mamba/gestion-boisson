import axios from "axios";
import { useState, useEffect } from "react";
import { FaSyncAlt } from "react-icons/fa";
import { AiOutlineCheckCircle, AiOutlineClockCircle } from "react-icons/ai";

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
        <div className="pt-10 pb-20 lg:px-8 bg-gray-50 min-h-screen">
            <h2 className="mb-10 bg-gradient-to-r from-blue-600 to-cyan-600 text-center text-white py-4 text-3xl font-bold tracking-tight shadow-lg rounded-lg">
                Commandes de boissons
            </h2>

            <div className="flex justify-end mb-5">
                <button 
                    onClick={handleRefresh} 
                    className="flex items-center bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-colors duration-300"
                >
                    <FaSyncAlt className="mr-2" /> Actualiser le tableau
                </button>
            </div>

            <div className="overflow-x-auto shadow-lg rounded-lg">
                <table className="min-w-full bg-white border border-slate-200">
                    <thead className="bg-gradient-to-r from-gray-200 to-gray-300">
                        <tr>
                            <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Nom</th>
                            <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Boissons</th>
                            <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Table</th>
                            <th className="py-3 px-4 text-center text-sm font-semibold text-gray-700">Statut</th>
                        </tr>
                    </thead>
                    <tbody>
                        {commande && commande.map(commande => (
                            <tr key={commande._id} className="hover:bg-gray-50 transition-colors duration-200">
                                <td className="py-3 px-4 border-b border-slate-200">{commande.nom}</td>
                                <td className="py-3 px-4 border-b border-slate-200">{commande.boissonNom}</td>
                                <td className="py-3 px-4 border-b border-slate-200">{commande.tableNom}</td>
                                <td 
                                    className={`py-3 px-4 border-b border-slate-200 cursor-pointer text-center font-semibold transition-colors duration-200 
                                    ${commande.status ? 'bg-green-500 text-white' : 'bg-red-500 text-white'} 
                                    hover:${commande.status ? 'bg-green-600' : 'bg-red-600'}`}
                                    onClick={() => handleCellClick(commande._id, commande.status)}
                                >
                                    {commande.status ? (
                                        <span className="flex justify-center items-center space-x-2">
                                            <AiOutlineCheckCircle className="text-xl" /> <span>Servi</span>
                                        </span>
                                    ) : (
                                        <span className="flex justify-center items-center space-x-2">
                                            <AiOutlineClockCircle className="text-xl" /> <span>En attente</span>
                                        </span>
                                    )}
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
