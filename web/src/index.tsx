// Library Imports
import React from 'react'
import ReactDOM from 'react-dom'


const App: React.FC = () => {
  return <div>Hello Ward</div>
}

// By passing the `store` in as a wrapper around our React component
// we make the state available throughout it
ReactDOM.render(<App />, document.getElementById('react'))
