import CatItem from './components/CatItem.tsx';
import Masonry from 'react-masonry-css';
import { useCatList } from './useCatList.tsx';
import Spinner from '../../shared/ui/Spinner.tsx';
import CatFilters from './components/CatFilters.tsx';
import { useFavCats } from '../../shared/store/store.ts';

const CatList = () => {
  const { error, data, isLoading, cursor } = useCatList();

  const isFavoriteActive = useFavCats((state) => state.isFavoriteActive);
  const favCats = useFavCats((state) => state.cats);

  const breakpointColumns = {
    default: 4,
    1200: 3,
    768: 2,
    480: 1,
  };

  const loading = isLoading ? (
    <div className="fixed w-full h-full flex justify-center items-center z-50 bg-white">
      <Spinner />
    </div>
  ) : null;

  const allCats = data?.map((cat) => {
    return (
      <CatItem
        key={cat.imgId}
        imgId={cat.imgId}
        imgUrl={cat.imgUrl}
        catName={cat.catName}
        catId={cat.catId}
      />
    );
  });

  const renderFavList = () => {
    if (favCats.length > 0) {
      return favCats.map((cat) => {
        return (
          <CatItem
            key={cat.imgId}
            imgId={cat.imgId}
            imgUrl={cat.imgUrl}
            catName={cat.catName}
            catId={cat.catId}
          />
        );
      });
    } else return <div className="text-xl">The favorites list is empty</div>;
  };

  const favList = renderFavList();

  const errorMsg = error ? error.message : null;

  return (
    <>
      {loading}
      <div className="p-5 mx-auto max-w-[1400px] my-6">
        <CatFilters />
        <Masonry
          breakpointCols={breakpointColumns}
          className="flex w-auto gap-4"
          columnClassName="flex flex-col gap-4"
        >
          {isFavoriteActive ? favList : allCats}
        </Masonry>
        {errorMsg}
        {!isFavoriteActive && cursor}
      </div>
    </>
  );
};

export default CatList;
