import { Suspense } from 'react';
import {
  Link,
  useSearchParams,
  useLoaderData,
  defer,
  Await,
} from 'react-router-dom';

import { getVans } from '../../api';

export const loader = () => {
  return defer({ vans: getVans() });
};

const Vans = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const typeFilter = searchParams.get('type');
  const dataPromise = useLoaderData();

  const handleFilterChange = (key, value) => {
    setSearchParams((prevParams) => {
      if (value === null) {
        prevParams.delete(key);
      } else {
        prevParams.set(key, value);
      }
      return prevParams;
    });
  };

  const renderVanElements = (vans) => {
    const displayedVans = typeFilter
      ? vans.filter((van) => van.type === typeFilter)
      : vans;

    const vansElements = displayedVans.map((van) => {
      return (
        <div key={van.id} className="van-tile">
          <Link
            to={van.id}
            state={{
              search: `?${searchParams.toString()}`,
              type: typeFilter,
            }}
          >
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

    const genClassName = (type) => {
      return `van-type ${type} ${typeFilter === type && 'selected'}`;
    };

    return (
      <>
        <div className="van-list-filter-buttons">
          <button
            type="button"
            className={genClassName('simple')}
            onClick={() => handleFilterChange('type', 'simple')}
          >
            Simple
          </button>
          <button
            type="button"
            className={genClassName('luxury')}
            onClick={() => handleFilterChange('type', 'luxury')}
          >
            Luxury
          </button>
          <button
            type="button"
            className={genClassName('rugged')}
            onClick={() => handleFilterChange('type', 'rugged')}
          >
            Rugged
          </button>
          {typeFilter && (
            <button
              type="button"
              className="van-type clear-filters"
              onClick={() => handleFilterChange('type', null)}
            >
              Clear filter
            </button>
          )}
        </div>
        <div className="van-list">{vansElements}</div>
      </>
    );
  };

  return (
    <div className="van-list-container">
      <h1>Explore our van options</h1>
      <Suspense fallback={<h2>Loading vans...</h2>}>
        <Await resolve={dataPromise.vans}>{renderVanElements}</Await>
      </Suspense>
    </div>
  );
};

export default Vans;
