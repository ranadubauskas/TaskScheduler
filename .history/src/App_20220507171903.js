
import './App.css';
import List from "./components/List";
import Login from "./components/Login";
import {auth} from "./database"; 
import { useAuthState } from 'react-firebase-hooks/auth';


function App() {
  const [user] = useAuthState(auth);
  return (
    <div>
      {!user && <Login /> }
     {user && <List />}
    </div>
  );
}

export default App;
