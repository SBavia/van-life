import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Vans = () => {
  const [vans, setVans] = useState([]);

  useEffect(() => {
    fetch('/api/vans')
      .then((res) => res.json())
      .then(({ vans }) => setVans(vans));
  }, []);

  const vansElements = vans.map((van) => {
    return (
      <div key={van.id} className="van-tile">
        <Link to={`/vans/${van.id}`}>
          <img src={van.imageUrl} alt="van" />
          <div className="van-info">
            <h3>{van.name}</h3>
            <p>
              ${van.price}
              <span>/day</span>
            </p>
          </div>
          <i className={`van-type ${van.type} selected`}>{van.type}</i>
        </Link>
      </div>
    );
  });

  return (
    <div className="van-list-container">
      <h1>Explore our van options</h1>
      <div className="van-list">{vansElements}</div>
    </div>
  );
};

export default Vans;
