import { useRef } from "react"

export const FocusScreen = () => {
    const inputRef = useRef<HTMLInputElement>(null);

    const handleBtnClick = () => {
        // inputRef.current?.focus();
        inputRef.current?.select();
    }

    return (
        <div className="bg-gradient flex flex-col gap-4">
            <h1 className="text-2xl font-thin text-white">FocusScreen</h1>

            <input
                ref={inputRef}
                type="text"
                className="bg-white text-black px-4 py-2 rounded-md"
            />

            <button
                className="bg-blue-500 px-4 py-2 cursor-pointer rounded-md"
                onClick={handleBtnClick}
            >Set focus</button>
        </div>
    );
}
