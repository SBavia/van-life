import { useOutletContext } from 'react-router-dom';

const HostVanPhotos = () => {
  const { currentVan } = useOutletContext();

  return (
    <img
      src={currentVan.imageUrl}
      alt={currentVan.name}
      className="host-van-detail-image"
    />
  );
};

export default HostVanPhotos;
