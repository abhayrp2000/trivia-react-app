import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//Custom Components
import Navbar from "./components/layout/Navbar";
import Trivia from "./components/trivia/Trivia";


function App() {
  return (
    <div>
      <ToastContainer/>
      <Navbar />
      <Trivia/>
    </div>
  );
}

export default App;
