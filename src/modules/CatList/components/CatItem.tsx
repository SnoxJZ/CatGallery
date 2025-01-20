import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { ICatItem } from '../types.ts';
import { useFavCats } from '../../../shared/store/store.ts';

const CatItem = (cat: ICatItem) => {
  const toggleFavorite = useFavCats((state) => state.toggleFavorite);
  const isLiked = useFavCats((state) => state.isLiked);

  return (
    <div className="mb-4 break-inside-avoid rounded p-5 bg-gray-200">
      <img
        src={cat.imgUrl}
        alt={cat.catName}
        className="w-full h-auto rounded"
      />
      <div className="mt-3 flex justify-between items-center">
        <p className="text-xl text-gray-800 font-bold">{cat.catName}</p>
        <FontAwesomeIcon
          tabIndex={0}
          icon={faHeart}
          color={isLiked(cat.imgId) ? 'red' : 'grey'}
          className="cursor-pointer transition-colors duration-200"
          onClick={() => {
            toggleFavorite(cat);
          }}
        />
      </div>
    </div>
  );
};

export default CatItem;
