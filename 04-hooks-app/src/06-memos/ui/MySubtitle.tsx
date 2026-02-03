import React from "react";

interface Props {
    subtitle: string;
    // callMyAPI: (myValue: string) => void;
    callMyAPI: () => void;
}

export const MySubtitle = React.memo(({ subtitle, callMyAPI }: Props) => {
    console.log('MySubtitle re-render');
    return (
        <>
            <h6 className="text-xl">{subtitle}</h6>

            <button 
                className="bg-indigo-500 py-1 px-2 text-white rounded-md cursor-pointer"
                // onClick={() => callMyAPI(subtitle)}
                onClick={callMyAPI}
            >
                Llamar a función
            </button>
        </>
    );
});
