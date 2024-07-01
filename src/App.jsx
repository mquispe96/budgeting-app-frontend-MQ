import {Route, Routes, Navigate} from 'react-router-dom';
import NavBar from './Pages/NavBar';
import ShowTransactions from './Pages/ShowTransactions';
import ShowTransaction from './Pages/ShowTransaction';
import NewTransaction from './Pages/NewTransaction';
import EditTransaction from './Pages/EditTransaction';
import LogIn from './Pages/LogIn';
import SignUp from './Pages/SignUp';

const App = () => {
  // <Route index element={<ShowTransactions />} />
  // <Route path="/transaction/:id" element={<ShowTransaction />} />
  // <Route path="/transaction/new" element={<NewTransaction />} />
  // <Route path="/transaction/edit/:id" element={<EditTransaction />} />
  // <Route path="/login" element={<LogIn />} />
  // <Route path="/signup" element={<SignUp />} />
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/transactions" replace/>} />
      <Route path="/transactions" element={<NavBar />}>
      </Route>
    </Routes>
  );
};

export default App;
