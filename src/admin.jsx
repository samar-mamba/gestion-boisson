
import axios from "axios";
import { useState, useEffect} from "react";




function Admin(){

  const [commande, setCommande] = useState([]);

  async function getCommande () {
    try {
      const response = await axios.get("src/Data/data.json");
      console.log(response.data);
      setCommande(response.data);
      return response
    } catch (error) {
      return error
    }
  }

  getCommande();


    

    return(

      
<div className="pt-5 pb-20 lg:px-8 ">

  <h2 className=" mb-10 bg-sky-500 text-center text-white pb-10  text-2xl font-semibold leading-9 tracking-tight ">
  Commandes de boissons
  </h2>

      <table className="border-separate border-spacing-2 border border-slate-400 ...">
      
      <thead>
        <tr>
          <th className="border border-slate-300 ...">id</th>
          <th className="border border-slate-300 ...">Nom </th>
          <th className="border border-slate-300 ...">Boissons </th>
          <th className="border border-slate-300 ...">Table</th>
          <th className="border border-slate-300 ...">Statut</th>
        </tr>
      </thead>
      <tbody>
      
      {commande.commande && commande.commande.map(commande=>(
        <tr key={commande.id}>
              <td className="border border-slate-300 ..." >{commande.id} </td>
              <td className="border border-slate-300 ...">{commande.nom} </td>
              <td className="border border-slate-300 ...">{commande.boisson} </td>
              <td className="border border-slate-300 ...">{commande.table} </td>
              <td className="border border-slate-300 ...">{commande.statut} </td>
               </tr>

               ))
            }
            
      </tbody>
    </table>
        </div>

    )
}

export default Admin;
