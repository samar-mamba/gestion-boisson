
import axios from "axios";
import { useState, useEffect} from "react";
import Datacommande from "./Data/data.json"






function Admin(){

  // const [commande, setCommande] = useState([]);

  // async function getCommande () {
  //   try {
  //     const response = await axios.get("http://localhost:3000/api/com");
  //     // console.log(response.data);
  //     setCommande(response.data);
  //     return response
  //   } catch (error) {
  //     return error
  //   }
  // }

  // getCommande();

//  approche differente d'appel de données:src/Data/data.json

const [commande, setCommande]= useState([]);
    useEffect(() => {
        axios.get("https://apigestionboisson.onrender.com/api/com")
        .then(response => {
           setCommande(response.data)
        })
        .catch(error => {
           console.error("Erreur lors de la récupération des house:" ,error)
        });
}, [])

  



    return(

      
<div className="pt-5 pb-20 lg:px-8 ">

  <h2 className=" mb-10 bg-sky-500 text-center text-white pb-10  text-2xl font-semibold leading-9 tracking-tight ">
  Commandes de boissons
  </h2>

      <table className="border-separate border-spacing-2 border border-slate-400 ...">
      
      <thead>
        <tr>
          {/* <th className="border border-slate-300 ...">id</th> */}
          <th className="border border-slate-300 ...">Nom </th>
          <th className="border border-slate-300 ...">Boissons </th>
          <th className="border border-slate-300 ...">Table</th>
          <th className="border border-slate-300 ..." >
            Statut</th>
        </tr>
      </thead>
      <tbody>
      
      {commande && commande.map(commande =>(
        <tr key={commande._id}
        
        >
              {/* <td className="border border-slate-300 ..." >{commande._id} </td> */}
              <td className="border border-slate-300 ...">{commande.nom} </td>
              <td className="border border-slate-300 ...">{commande.boissonNom} </td>
              <td className="border border-slate-300 ...">{commande.tableNom} </td>
              <td className="border border-slate-300 ..." 
               >
          
                
                 </td>
               </tr>

               ))
            }
            
      </tbody>
    </table>
        </div>

    )
}

export default Admin;
