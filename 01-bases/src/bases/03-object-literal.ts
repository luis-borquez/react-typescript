interface Person {
    firstName: string;
    lastName: string;
    age: number;
    address?: Address;
}

interface Address {
    country: string;
    city: string;
}

const ironman: Person = {
    firstName: 'Tony',
    lastName: 'Stark',
    age: 45,
    address: {
        country: 'USA',
        city: 'New York',
    }
};

console.log(ironman);

// const spiderman = structuredClone(ironman);

// spiderman.firstName = 'Peter';
// spiderman['lastName'] = 'Parker';
// spiderman.age = 20;
// spiderman.address.city = 'Queens'; 

// console.log(ironman, spiderman);
