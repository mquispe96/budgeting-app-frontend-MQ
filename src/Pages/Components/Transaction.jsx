import {useNavigate} from 'react-router-dom';

const Transaction = ({log, isLogged}) => {
  const navigate = useNavigate();
  const {id, name, amount, from, type} = log;

  return (
    <tr>
      <td>{name}</td>
      <td style={{color: type === 'Deposit' ? 'green' : 'red'}}>
        {type === 'Deposit' ? '+' : '-'} ${amount}
      </td>
      <td>{from}</td>
      <td>{type}</td>
      {isLogged && (
        <td>
          <span onClick={() => navigate(`/transaction/${id}`)}>Details</span>
        </td>
      )}
    </tr>
  );
};

export default Transaction;
