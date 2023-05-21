import './App.css'
import Favourites from './components/Favourites';
import Meals from './components/Meals';
import Modal from './components/Modal';
import Search from './components/Search';

export default function App() {
  return (
    <main>
      <Favourites />
      <Meals />
      <Modal />
      <Search />
    </main>
  )
}
