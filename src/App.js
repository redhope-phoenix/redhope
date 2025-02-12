import 'bootstrap-icons/font/bootstrap-icons.css';
import 'remixicon/fonts/remixicon.css';
import "./styles/utils.css"
import "./styles/root.css"

import { Navbar } from './components/navbar/Navbar';
import { Home } from './pages/home-page/Home';
import { AppRoutes } from './routes/App.routes';

function App() {
  return (
    <>
      <Navbar />
      <main>
        <AppRoutes />
      </main>
    </>
  );
}

export default App;
