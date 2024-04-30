import {useState} from 'react';

export default function Alunno({alunno, popolaAlunni}){
    const [inCancellazione, setInCancellazione] = useState(false);
    const [inUpdate, setInUpdate] = useState(false);
    const [richiestaConferma, setRichiestaConferma] = useState(false);
    const [nome, setNome] = useState("");
    const [cognome, setCognome] = useState("");
    const [up, mostraUp] = useState(false);

    async function cancellaAlunno(){
        setRichiestaConferma(false);
        setInCancellazione(true)
        await fetch(`http://localhost:8080/alunni/${alunno.id}`, {method: "DELETE"});
        popolaAlunni();
    }

    async function salvaAlunno(){
        mostraUp(false);
        setInUpdate(true);
        await fetch(`http://localhost:8080/alunni/${alunno.id}`, 
            {  
              method: "PUT",
              headers: { 'Content-Type': 'application/json'},
              body: JSON.stringify({nome: nome, cognome: cognome})
            }
        );
        setInUpdate(false);
        popolaAlunni();
    }

    function richiesta(){
        setRichiestaConferma(true);
    }

    function annulla(){
        setRichiestaConferma(false);
    }

    function gestisciCambioNome(e){
        setNome(e.target.value);
    }

    function gestisciCambioCognome(e){
        setCognome(e.target.value);
    }
    return(
        <div>
            {alunno.id} {alunno.nome} {alunno.cognome}
            
            { richiestaConferma ?
                <span>Sei sicuro? 
                <button onClick={cancellaAlunno}>si</button>
                <button onClick={annulla}>no</button>
                </span>
            :
              <button onClick={richiesta}>Cancella</button>
            }
            { inCancellazione &&
                <span>in fase di cancellazione </span>
            }

            { up ?
                <span>
                    <input type="text" onChange={gestisciCambioNome} value={alunno.nome}/>
                    <input type="text"  onChange={gestisciCambioCognome} value={alunno.cognome}/>
                    <button onClick={salvaAlunno}>salva</button>
                    <button onClick={() =>  mostraUp(false)}>annulla</button>
                </span>

                :
                <button onClick={() => mostraUp(true)}>update</button>
            }
            { inUpdate &&
                <span>in fase di modifica</span>
            }

            <hr />

        </div>

    )
}