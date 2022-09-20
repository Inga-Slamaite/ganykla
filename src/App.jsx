// Ganykla. tuscias masyvas state, kuri return pramapinam
//Turim trijų rūšių gyvulius: avis, antis ir antilopes. (tai yra select html elementas su trim option avis,...) Kiekvienas gyvulys turi savo svorį. {tipas: antis, svoris: 45}
// Parašyti localStorage CRUD aplikaciją, kurioje būtų galima
//pridėti naujus gyvulius su jų svoriais į ganyklą,
//ištrinti iš ganyklos ir
//redaguoti kiekvieno jų svorį.

import { useEffect } from "react";
import { useState } from "react";
import "./App.scss";


function App() {
  const [gyvuliai, setGyvuliai] = useState([]);
  const [type, setType] = useState("");
  const [svoris, setSvoris] = useState(0);
  const [spalva, setSpalva] = useState("");
  const [deleteData, setDeleteData] = useState(null);
  

  useEffect(() => {
    const lokalusSandelys=localStorage.getItem('tvartas')

    if (lokalusSandelys) {
      setGyvuliai(JSON.parse(lokalusSandelys));
    }
  }, []);

  function destroy (key, id) {
    const lokalusSandelys = JSON.parse(localStorage.getItem(key)).filter((row, i) => i !== id)
    setGyvuliai(lokalusSandelys);
    localStorage.setItem('tvartas', JSON.stringify(lokalusSandelys));

  }

  useEffect (() => {
    if (null ===deleteData) {
      return; 
    }
    destroy ("tvartas", deleteData);
    setDeleteData(null)
  }, [deleteData]);
  

  function prideti(e) {
    e.preventDefault();
    const kopija = [...gyvuliai];
    kopija.push({ tipas: type, kg: svoris, farge: spalva });
    setGyvuliai(kopija);

    localStorage.setItem("tvartas", JSON.stringify(kopija));
  }
  return (
    <div className="container">
      <div className="row">
    <div className="field">
      <div className="col-4">
        <form>
          <label htmlFor="fname">Gyvuliai:</label>
          <select
            className="form-control"
            onChange={(e) => setType(e.target.value)}
            name=""
            id=""
          >
            <option>Avis</option>
            <option>Antis</option>
            <option>Antilope</option>
          </select>
          <label htmlFor="lname">Spalva:</label>
          <input
            className="form-control"
            type="text"
            onChange={(e) => setSpalva(e.target.value)}
          />
          <label htmlFor="lname">Svoris:</label>
          <input
            className="form-control"
            type="number"
            onChange={(e) => setSvoris(e.target.value)}
          />
          
          <button onClick={prideti} className="btn btn-success">
            prideti
          </button>
          
        </form>

        {gyvuliai.map((gyvulys, i) => (
          <p key={i}>
            {" "}
            {gyvulys.tipas} {gyvulys.farge} {gyvulys.kg} <button onClick={()=> setDeleteData(i)} className="btn btn-success">
            Istrinti
          </button> <button className="btn btn-success">
            Edit
          </button>

          </p>
          
        ))}
      </div>
    </div>
    </div>
    </div>

  );
}

export default App;
