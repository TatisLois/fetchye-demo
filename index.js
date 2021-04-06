import React, { useState } from 'react';
import { render } from 'react-dom';
import { AbortExample } from "./examples/abort";
import { OnErrorExample } from "./examples/onerror";

function App() {
  const [toggle, setToggle] = useState(true)

  return (
    <>
      <button className='toggle' onClick={() => setToggle((pre) => !pre)}> Toggle </button>
      { toggle ? <OnErrorExample /> : <AbortExample /> }
    </>
  )
}
render(
  <App />,
  document.getElementById('root')
);