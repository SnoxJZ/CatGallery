import Spinner from '../../../shared/ui/Spinner.tsx';
import { useBreedList } from '../useBreedList.ts';
import { useBreedStore, useFavCats } from '../../../shared/store/store.ts';
import React from 'react';

import paws from '../../../assets/paw.png';

const CatFilters = () => {
  const { breeds, breedError, isLoadingBreeds } = useBreedList();

  const setBreed = useBreedStore((state) => state.setBreed);
  const breed = useBreedStore((state) => state.breed);

  const isFavoriteActive = useFavCats((state) => state.isFavoriteActive);
  const setFavoriteActive = useFavCats((state) => state.setFavoriteActive);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setBreed(e.target.value);
  };

  const btnStyles =
    'border border-blue-500 px-4 py-2 w-[100%] md:w-[200px] transition-colors duration-200';

  return (
    <div className="flex flex-col gap-4 md:flex-row justify-between items-center mb-8 ">
      <img src={paws} alt="paws" className="w-[60px]" />
      {isLoadingBreeds ? (
        <div className="mb-10">
          <Spinner />
        </div>
      ) : (
        <select
          name="breeds"
          id="breeds"
          className="w-full md:w-1/3 block px-4 py-2 text-sm text-gray-700 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-200 focus:border-blue-500"
          onChange={handleChange}
          value={breed}
        >
          <option value="" className="bg-gray-100 text-gray-700">
            {breedError ? breedError.message : 'All Breeds'}
          </option>
          {breeds?.map((breed) => {
            return (
              <option
                className="bg-gray-100 text-gray-700"
                key={breed.breedId}
                value={breed.breedId}
              >
                {breed.breedName}
              </option>
            );
          })}
        </select>
      )}
      <div className="w-full md:w-auto flex">
        <button
          className={`${btnStyles} rounded-bl-lg rounded-tl-lg border-r-0 ${!isFavoriteActive ? 'bg-blue-200' : 'bg-blue-50'}`}
          onClick={() => setFavoriteActive(false)}
        >
          Show all
        </button>
        <button
          className={`${btnStyles} rounded-br-lg rounded-tr-lg ${isFavoriteActive ? 'bg-blue-200' : 'bg-blue-50'}`}
          onClick={() => setFavoriteActive(true)}
        >
          Show favorites
        </button>
      </div>
    </div>
  );
};

export default CatFilters;
