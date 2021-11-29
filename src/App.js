import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Controls from './components/Controls';
import Field from './components/Field';
import Info from './components/Info';
import store from './store';
import { Col, Container, Row } from 'react-bootstrap';

function App() {
  return (
    <Provider store={store}>
      <Container className="App">
        <header className="App-header my-3">
          <h1>Game of Life</h1>
        </header>
        <Row>
          <Col lg="auto">
            <Field />
            <Info />
          </Col>
          <Col lg="2">
            <Controls />
          </Col>
        </Row>
      </Container>
    </Provider>
  );
}

export default App;
