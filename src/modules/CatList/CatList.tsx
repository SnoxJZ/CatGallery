import CatItem from './CatItem.tsx';
import Masonry from 'react-masonry-css';
import { useCatList } from './useCatList.tsx';
import Spinner from '../../shared/ui/Spinner.tsx';

const CatList = () => {
  const { error, data, isLoading, cursor } = useCatList();

  if (isLoading) {
    return (
      <div className="mt-10">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const breakpointColumns = {
    default: 4,
    1200: 3,
    768: 2,
    480: 1,
  };

  return (
    <div className="p-5 mx-auto max-w-[1400px] my-6">
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
  );
};

export default CatList;
