import './App.css';
import Layout from './components/Layout/Layout';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer} from 'react-toastify';


function App() {
  return (
    <div className="App">
    <ToastContainer/>
      <ScrollToTop/>
      <Layout/>
    </div>
  );
}

export default App;
