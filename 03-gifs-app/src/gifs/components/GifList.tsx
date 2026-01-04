import type { Gif } from "../interfaces/gif.interface";

interface Props {
    topic: string;
    gifs: Gif[];
}

export const GifList = ({ topic, gifs }: Props) => {
    return (
        <>
            {
                (topic) && 
                <h2 className="text-center">{topic}</h2>
            }
            <div className="gifs-container">
                {
                    gifs.map((gif) => (
                        <div key={gif.id} className="gif-card">
                            <img src={gif.url} alt={gif.title} />
                            <h3>{gif.title}</h3>
                            <p>
                                {gif.width}x{gif.height} (1.5mb)
                            </p>
                        </div>
                    ))
                }
            </div>
        </>
    );
}
