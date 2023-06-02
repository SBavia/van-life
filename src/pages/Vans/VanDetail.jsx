import { Link, useLocation, useLoaderData } from 'react-router-dom';

import { getVan } from '../../api';

export const loader = ({ params }) => {
  return getVan(params.id);
};

const VanDetail = () => {
  const { state } = useLocation();
  const van = useLoaderData();

  const search = state?.search || '';
  const type = state?.type || 'all';

  return (
    <div className="van-detail-container">
      <Link to={`..${search}`} relative="path" className="back-button">
        &larr; <span>Back to {type} vans</span>
      </Link>
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
    </div>
  );
};

export default VanDetail;
