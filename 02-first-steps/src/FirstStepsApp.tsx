import { ItemCounter } from "./shopping-cart/ItemCounter";

interface ItemInCart {
    productName: string;
    quantity: number;
}

const itemsInCart: ItemInCart[] = [
    { productName: 'Audífonos Sony XM6', quantity: 4 },
    { productName: 'iPhone 17', quantity: 2 },
    { productName: 'iPad Pro', quantity: 1 },
    { productName: 'Laptop Gamer', quantity: 3 },
];

export function FirstStepsApp() {
    return (
        <>
            <h1>Carrito de compras</h1>

            {/* 
            <ItemCounter name="Audífonos Sony" quantity={ 3 } />
            <ItemCounter name="iPhone 17" quantity={ 2 } />
            <ItemCounter name="iPad Pro" quantity={ 1 } /> 
            */}
            {
                itemsInCart.map(({ productName, quantity }) => (
                    <ItemCounter 
                        key={ productName }
                        name={ productName } 
                        quantity={ quantity } 
                    />
                ))
            }
        </>
    );
}
