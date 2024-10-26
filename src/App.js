import {BrowserRouter, Route, Switch} from 'react-router-dom'

import './App.css'
import Header from './components/Header'
import MainSection from './components/MainSection'
import Cart from './components/Cart'

import {CartProvider} from './context/CartContext'

const App = () => (
  <CartProvider>
    <div className="appContainer">
      <BrowserRouter>
        <Header />
        <Switch>
          <Route exact path="/cart" component={Cart} />
          <Route exact path="/" component={MainSection} />
        </Switch>
      </BrowserRouter>
    </div>
  </CartProvider>
)

export default App
