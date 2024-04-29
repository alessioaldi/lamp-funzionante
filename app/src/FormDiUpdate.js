import { useState } from "react";


export default function FormDiUpdate(popolaAlunni){
    const [nome, setNome] = useState("");
    const [cognome, setCognome] = useState("");
    const [id, setId] = useState("");

    async function salvaAlunno(){
      
        await fetch(`http://localhost:8080/alunni/update`, 
            {  
              method: "POST",
              headers: { 'Content-Type': 'application/json'},
              body: JSON.stringify({nome: nome, cognome: cognome,id: id })
            }
        );
        popolaAlunni();
    }

    function gestisciCambioNome(e){
        setNome(e.target.value);
    }
    function gestisciCambioCognome(e){
        setCognome(e.target.value);
    }
    
    function gestisciCambioId(e){
        setId(e.target.value);
    }

    return(
        <>
            <h1>Form di inseriemto</h1>
            <div>Nome: <input type="text" onChange={gestisciCambioNome} /></div>
            <div>Cognome: <input type="text"  onChange={gestisciCambioCognome} /></div>
            <div>Id: <input type="text"  onChange={gestisciCambioId} /></div>
            <div><button onClick={salvaAlunno}>salva</button></div>
            {nome} <br />{cognome}

        </>

    )
}