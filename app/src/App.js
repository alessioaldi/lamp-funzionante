import './App.css';
import Alunno from './Alunno'
import FormDiInserimento from './FormDiInserimento'
import {useState, useEffect} from 'react'

function App() {

  useEffect(() => {
    popolaAlunni();
  },[])

  const [alunni, setAlunni] = useState([]);
  const [pronto, setpronto] = useState(false);
  const [mostraForm, setMostraForm] = useState(false);
  const [mostraFormUp, setMostraFormUp] = useState(false);

  async function popolaAlunni(){
    const response = await fetch("http://localhost:8080/alunni", {method: "GET"});
    const array = await response.json();
    setAlunni(array);
    setpronto(true);
  }

  return (
    <div className="App">
      {
        pronto ?
          alunni.map(a => (
            <Alunno alunno={a} popolaAlunni={popolaAlunni} key={a.id} />
          ))
        :
         <div>Loading...</div>
      }

      <button onClick={() => setMostraForm(true)}>Inserisci nuovo alunno</button>
      { mostraForm &&
        <div>
          <div><FormDiInserimento popolaAlunni={popolaAlunni} /></div>
          <button onClick={() => setMostraForm(false)}>Annulla inserimento</button>
        </div>
      }

      <button onClick={() => setMostraFormUp(true)}>update alunno</button>
      { mostraFormUp &&
        <div>
          <div><FormDiUpdate popolaAlunni={popolaAlunni} /></div>
          <button onClick={() => setMostraFormUp(false)}>Annulla inserimento</button>
        </div>
      }
    </div>
  );
}

export default App;














