import {Route, Routes, Navigate} from 'react-router-dom';
import NavBar from './Pages/NavBar';
import ShowTransactions from './Pages/ShowTransactions';
import ShowTransaction from './Pages/ShowTransaction';
import NewTransaction from './Pages/NewTransaction';
// import EditTransaction from './Pages/EditTransaction';
import LogIn from './Pages/LogIn';
import SignUp from './Pages/SignUp';
import DeleteAccount from './Pages/DeleteAccount';
import ChangePassword from './Pages/ChangePassword';

const App = () => {
  // <Route path="/transactions/transaction/edit/:id" element={<EditTransaction />} />
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/transactions" replace />} />
      <Route path="/transactions" element={<NavBar />}>
        <Route index element={<ShowTransactions />} />
        <Route
          path="/transactions/transaction/:id"
          element={<ShowTransaction />}
        />
        <Route path="/transactions/transaction/new" element={<NewTransaction />} />

        <Route path="/transactions/login" element={<LogIn />} />
        <Route path="/transactions/signup" element={<SignUp />} />
        <Route
          path="/transactions/delete-account"
          element={<DeleteAccount />}
        />
        <Route
          path="/transactions/change-password"
          element={<ChangePassword />}
        />
      </Route>
    </Routes>
  );
};

export default App;
