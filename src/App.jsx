import { useEffect, useState } from "react";
import './style.css';

function App() {
  const [data, setData] = useState([]);
  const [showNames, setShowNames] = useState(false); 
  const [showYears, setShowYears] = useState(false); 
  const [showMedals, setShowMedals] = useState(false); 
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetch('./gold_medalists.json')
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        console.error('Erro ao carregar os dados: ', error);
      });
  }, []);

  const handleClick = (event, pageNumber) => {
    event.preventDefault();
    setCurrentPage(pageNumber);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(data.length / itemsPerPage); i++) {
      pageNumbers.push(
        <li key={i}>
          <a href="!#" onClick={(event) => handleClick(event, i)} className={i === currentPage ? 'active' : ''}>
            {i}
          </a>
        </li>
      );
    }
    return pageNumbers;
  };

  return (
    <div className="container">
      <h1 className="heading">Olympics Data from JSON</h1>
      <div className="button-container">
        <button className="header-button-names" onClick={() => setShowNames(!showNames)}>Names</button>
        <button className="header-button-year" onClick={() => setShowYears(!showYears)}>Years</button>
        <button className="header-button-medals" onClick={() => setShowMedals(!showMedals)}>Medals</button>
      </div>
      <table className="data-table">
        <thead>
          <tr>
            {showNames && <th>Names</th>}
            {showYears && <th>Years</th>}
            {showMedals && <th>Medals</th>}
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item, index) => (
            <tr key={index}>
              {showNames && <td>{item.Name}</td>}
              {showYears && <td>{item.Year}</td>}
              {showMedals && <td>{item.Medal}</td>}
            </tr>
          ))}
        </tbody>
      </table>
      <ul className="pagination">
        {renderPageNumbers()}
      </ul>
    </div>
  );
}

export default App;
