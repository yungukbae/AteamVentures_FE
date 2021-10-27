import Dashboard from './component/Dashboard'
import Navbar from "./component/Navbar";

const App: React.FC = () => {
  return (
    <div className="App">
        <Navbar/>
        <Dashboard/>
    </div>
  );
}

export default App;
