import { heroes, type Hero, Owner } from '../data/heroes.data';

const getHeroById = (id: number): Hero | undefined => {
  const hero = heroes.find((hero) => {
    return hero.id === id;
  });

  // if (!hero) {
  //   throw new Error(`No existe un héroe con el id ${id}`);
  // }

  return hero;
};

console.log(getHeroById(5));

// Tarea clase #25
/**
 *  getHeroesByOwner => Hero[]
 * Filtra héroes por su propietario
 * @param Owner - El propietario por el cual filtrar (DC o Marvel), usar la enumeración Owner
 * @returns Array de héroes pertenecientes al propietario especificado
 */

export const getHeroesByOwner = (owner: Owner) => {
  return heroes.filter((hero) => hero.owner === owner);
}
