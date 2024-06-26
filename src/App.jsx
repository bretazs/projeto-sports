import { useEffect, useState } from "react"



function App() {
  const [names, setNames] = useState([]);
  const [years, setYears] = useState([]);
  const [medals, setMedals] = useState([]);


  useEffect(() => {
    fetch('./gold_medalists.json')
      .then((res) => res.json())
      .then((data) => {
        const names = data.map(item => item.Name);
        const years = data.map(item => item.Year);
        const medals = data.map(item => item.Medal);

        setNames(names)
        setYears(years)
        setMedals(medals)
      })
      .catch((error) => {
        console.error('Erro ao carregar os dados: ', error)
      });
  }, []);


  return (
    <div>
      <h1>Olympics Data from JSON</h1>
      <div>
        <h2>Names</h2>
        <ul>
          {names.map((name, index) => (
            <li key={index}>{name}</li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Years</h2>
        <ul>
          {years.map((year, index) => (
            <li key={index}>{year}</li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Medals</h2>
        <ul>
          {medals.map((medal, index) => (
            <li key={index}>{medal}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default App
