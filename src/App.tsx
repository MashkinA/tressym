import { AppRouter } from './routes/AppRouter';
import './styles/App.css';
import './styles/print.css'
import { BrowserRouter } from 'react-router-dom';
import { Provider } from "react-redux";
import { setupStore } from "./store/store.ts";



function App() {

  return (
      <Provider store={
          setupStore()
      }>
          <BrowserRouter>
              <AppRouter />
          </BrowserRouter>
      </Provider>

  )
}

export default App
