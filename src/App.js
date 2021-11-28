import { Provider } from 'react-redux';
import './App.css';
import Field from './components/Field';
import store from './store';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <header className="App-header">
          <h1>Game of Life</h1>
        </header>
        <Field />
      </div>
    </Provider>
  );
}

export default App;
