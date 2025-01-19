import Spinner from '../../../shared/ui/Spinner.tsx';
import { useBreedList } from '../useBreedList.ts';
import { useBreedStore } from '../../../shared/store/store.ts';
import React from 'react';

const CatFilters = () => {
  const { breeds, breedError, isLoadingBreeds } = useBreedList();
  const setBreed = useBreedStore((state) => state.setBreed);
  const breed = useBreedStore((state) => state.breed);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setBreed(e.target.value);
  };

  return (
    <div>
      {isLoadingBreeds ? (
        <div className="mb-10">
          <Spinner />
        </div>
      ) : (
        <select
          name="breeds"
          id="breeds"
          className="mb-8 w-full lg:w-1/3 block px-4 py-2 text-sm text-gray-700 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-200 focus:border-blue-500"
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
    </div>
  );
};

export default CatFilters;
