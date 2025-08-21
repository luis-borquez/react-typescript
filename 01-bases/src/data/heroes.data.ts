export interface Hero {
  id: number;
  name: string;
  owner: Owner; // <----
}

// type Owner = 'DC' | 'Marvel';

// export enum Owner {
//   DC, // Owner.DC = 0
//   Marvel, // Owner.Marvel = 1
// }

export enum Owner {
  DC = 'DC', // Owner.DC = 'DC'
  Marvel = 'Marvel', // Owner.Marvel = 'Marvel'
}

export const heroes: Hero[] = [
  {
    id: 1,
    name: 'Batman',
    owner: Owner.DC,
  },
  {
    id: 2,
    name: 'Spiderman',
    owner: Owner.Marvel,
  },
  {
    id: 3,
    name: 'Superman',
    owner: Owner.DC,
  },
  {
    id: 4,
    name: 'Flash',
    owner: Owner.DC,
  },
  {
    id: 5,
    name: 'Wolverine',
    owner: Owner.Marvel,
  },
  {
    id: 6,
    name: 'Green Lantern',
    owner: Owner.DC,
  },
];

// export default heroes;
