export interface ICatItem {
  imgId: string;
  imgUrl: string;
  catId: string;
  catName: string;
}

export interface IBreeds {
  id: string;
  name: string;
}

export interface ICat {
  id: string;
  url: string;
  breeds: IBreeds[];
}
