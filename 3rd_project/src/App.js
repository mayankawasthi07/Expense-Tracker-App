import { Fragment, useState } from 'react';
import Header from './components/Layout/Header';
import Meals from './components/Meals/Meals';
import Cart from './components/Cart/Cart';
import CartProvider from './store/CartProvider';
function App() {
  const [modalOpen, setModalOpen] = useState(false);

  const openModalHandler = (props) => {
    setModalOpen(true);
  }
  
  const closeModalHandler = (props) => {
    setModalOpen(false);
  }

  return (
  <CartProvider>
    {modalOpen && <Cart closeModalHandler={closeModalHandler} />}
    <Header openModalHandler={openModalHandler} />
    <main>
      <Meals />
    </main>
  </CartProvider>
  );
}

export default App;
