import { useEffect, useState } from "react";
import './style.css';

function App() {
  const [names, setNames] = useState([]);
  const [years, setYears] = useState([]);
  const [medals, setMedals] = useState([]);
  const [showNames, setShowNames] = useState(false); 
  const [showYears, setShowYears] = useState(false); 
  const [showMedals, setShowMedals] = useState(false); 

  useEffect(() => {
    fetch('./gold_medalists.json')
      .then((res) => res.json())
      .then((data) => {
        const names = data.map(item => item.Name);
        const years = data.map(item => item.Year);
        const medals = data.map(item => item.Medal);

        setNames(names);
        setYears(years);
        setMedals(medals);
      })
      .catch((error) => {
        console.error('Erro ao carregar os dados: ', error);
      });
  }, []);

  return (
    <div className="container">
      <h1 className="heading">Olympics Data from JSON</h1>
      <div className="category">
        <button className="names" onClick={() => setShowNames(!showNames)}>Names</button>
        {showNames && (
          <ul>
            {names.map((name, index) => (
              <li key={index}>{name}</li>
            ))}
          </ul>
        )}
      </div>
      <div className="category">
        <button className="years" onClick={() => setShowYears(!showYears)}>Years</button>
        {showYears && (
          <ul>
            {years.map((year, index) => (
              <li key={index}>{year}</li>
            ))}
          </ul>
        )}
      </div>
      <div className="category">
        <button className="medals" onClick={() => setShowMedals(!showMedals)}>Medals</button>
        {showMedals && (
          <ul>
            {medals.map((medal, index) => (
              <li key={index}>{medal}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;
