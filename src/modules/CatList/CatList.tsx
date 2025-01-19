import CatItem from './components/CatItem.tsx';
import Masonry from 'react-masonry-css';
import { useCatList } from './useCatList.tsx';
import Spinner from '../../shared/ui/Spinner.tsx';
import CatFilters from './components/CatFilters.tsx';

const CatList = () => {
  const { error, data, isLoading, cursor } = useCatList();

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

  const errorMsg = error ? error.message : null;

  return (
    <>
      {loading}
      <div className="p-5 mx-auto max-w-[1400px] my-6">
        <CatFilters />
        {errorMsg}

        <Masonry
          breakpointCols={breakpointColumns}
          className="flex w-auto gap-4"
          columnClassName="flex flex-col gap-4"
        >
          {data?.map((cat) => {
            return (
              <CatItem
                key={cat.imgId}
                imgId={cat.imgId}
                imgUrl={cat.imgUrl}
                catName={cat.catName}
                catId={cat.catId}
              />
            );
          })}
        </Masonry>
        {cursor}
      </div>
    </>
  );
};

export default CatList;
