import type { CSSProperties } from "react";

const firstName = 'Luis Fernando';
const lastName = 'Bórquez';

const myStyles: CSSProperties = {
  backgroundColor: '#fafafa',
  padding: 10,
  borderRadius: 10
}

export const MyAwesomeApp = () => {
  return (
    <div data-testid="div-app">
      <h1 
        data-testid="first-name-title"
        className="foo"
      >{ firstName }</h1>
      <h3 style={ myStyles }>
        { lastName }
      </h3>
    </div>
  );
}
