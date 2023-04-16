import './App.css';
import Todos from './components/Todos';

function App() {
  return (
    <div className="App">
      <h2>Todo App</h2>
      <div className='content'>
        <Todos />
      </div>
    </div>
  );
}

export default App;
