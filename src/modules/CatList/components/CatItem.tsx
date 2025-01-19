import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

interface ICatItem {
  imgId: string;
  imgUrl: string;
  catId: string;
  catName: string;
}

const CatItem = ({ imgUrl, catName }: ICatItem) => {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <div className="mb-4 break-inside-avoid rounded p-5 bg-gray-200">
      <img src={imgUrl} alt={catName} className="w-full h-auto rounded" />
      <div className="mt-3 flex justify-between items-center">
        <p className="text-xl text-gray-800 font-bold">{catName}</p>
        <FontAwesomeIcon
          icon={faHeart}
          color={isLiked ? 'red' : 'grey'}
          className="cursor-pointer transition-colors duration-200"
          onClick={() => {
            setIsLiked(!isLiked);
          }}
        />
      </div>
    </div>
  );
};

export default CatItem;
