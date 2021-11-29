import { Provider } from 'react-redux';
import './App.css';
import Controls from './components/Controls';
import Field from './components/Field';
import Info from './components/Info';
import store from './store';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <header className="App-header">
          <h1>Game of Life</h1>
        </header>
        <Controls />
        <Field />
        <Info />
      </div>
    </Provider>
  );
}

export default App;
