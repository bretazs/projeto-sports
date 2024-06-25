import { useEffect, useState } from "react"



function App() {
  const [name, setName] = useState([]);
  const [year, setYear] = useState([]);
  const [season, setSeason] = useState([]);
  const [medal, setMedal] = useState([]);

  useEffect(() => {
    fetch('./olympics.json')
    .then(res => res.json)
    .then(json => {
      setMedal(json.sort((a, b) => a.name))
    })
  })




  return (
    <>
      
    </>
  )
}

export default App
