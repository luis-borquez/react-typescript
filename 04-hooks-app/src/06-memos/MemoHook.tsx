import { useCallback, useState } from "react";
import { MyTitle } from "./ui/MyTitle";
import { MySubtitle } from "./ui/MySubtitle";

// const handleCallMyApi = (myValue: string) => {
//     console.log('Llamado a API - ', myValue);
// }

export const MemoHook = () => {
    const [title, setTitle] = useState('Hola');
    const [subtitle, setSubtitle] = useState('Mundo');

    /*
     * useCallback se utiliza para memorizar funciones y evitar que se recreen en cada 
     * renderización del componente. Es especialmente útil cuando se pasa una función 
     * como prop a componentes hijos optimizados que dependen de la igualdad 
     * referencial (===) de las props para evitar renderizaciones innecesarias.
     */
    const handleCallMyApi = useCallback(() => {
        console.log('Llamado a API -', subtitle);
    }, [subtitle]);

    return (
        <div className="bg-gradient flex flex-col gap-4">
            <h1 className="text-2xl font-thin text-white">MemoApp</h1>

            <MyTitle title={title} />

            <MySubtitle
                subtitle={subtitle}
                callMyAPI={handleCallMyApi}
            />

            <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer"
                onClick={() => setTitle('Hello ' + new Date().getTime())}
            >
                Cambiar título
            </button>

            <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer"
                onClick={() => setSubtitle('World')}
            >
                Cambiar subtítulo
            </button>
        </div>
    );
}
