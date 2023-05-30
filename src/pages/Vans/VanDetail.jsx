import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const VanDetail = () => {
  const [van, setVan] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetch(`/api/vans/${id}`)
      .then((res) => res.json())
      .then(({ vans }) => setVan(vans));
  }, [id]);

  return (
    <div className="van-detail-container">
      {van ? (
        <div className="van-detail">
          <img src={van.imageUrl} alt="van" />
          <i className={`van-type ${van.type} selected`}>{van.type}</i>
          <h2>{van.name}</h2>
          <p className="van-price">
            <span>${van.price}</span>/day
          </p>
          <p>{van.description}</p>
          <button type="button" className="link-button">
            Rent this van
          </button>
        </div>
      ) : (
        <h2>Loading...</h2>
      )}
    </div>
  );
};

export default VanDetail;
