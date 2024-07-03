import {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import CreatableSelect from 'react-select/creatable';
import Select from 'react-select';
import axios from 'axios';
import Loading from './Components/Loading';

const NewTransaction = () => {
  const BASE_URL = import.meta.env.VITE_APP_BASE_URL;
  const navigate = useNavigate();
  const [newTransaction, setNewTransaction] = useState({
    name: '',
    amount: '',
    from: '',
    category: '',
    type: {value: 'Withdrawal', label: 'Withdrawal'},
  });
  const [names, setNames] = useState([]);
  const [froms, setFroms] = useState([]);
  const [categories, setCategories] = useState([]);
  const types = [
    {value: 'Withdrawal', label: 'Withdrawal'},
    {value: 'Deposit', label: 'Deposit'},
  ];
  const [isLoading, setIsLoading] = useState(true);
  const [confirm, setConfirm] = useState(false);
  const [error, setError] = useState('');

  const handleChange = e => {
    setNewTransaction({...newTransaction, [e.target.name]: e.target.value});
  };

  const handleSelectChange = (selectedOption, actionMeta) => {
    setNewTransaction({...newTransaction, [actionMeta.name]: selectedOption});
  };

  const handleSubmit = e => {
    e.preventDefault();
    setIsLoading(true);
    const transactionValues = Object.keys(newTransaction).reduce((obj, key) => {
      if (key !== 'amount') {
        obj[key] = newTransaction[key].value;
      } else {
        obj[key] = Number(newTransaction[key]);
      }
      return obj;
    }, {});
    axios
      .post(`${BASE_URL}/transactions`, transactionValues)
      .then(res => {
        setConfirm(res.data);
      })
      .catch(error => {
        setError([
          'Make sure all fields are filled out, and try again.',
          'Make sure the amount is a number.',
          'Psst, you can create new options by typing them in!',
        ]);
        setTimeout(() => {
          setError('');
        }, 5000);
      });
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  };

  useEffect(() => {
    axios.get(`${BASE_URL}/transactions`).then(response => {
      setNames(
        response.data.map(transaction => ({
          value: transaction.name,
          label: transaction.name,
        })),
      );
      setFroms(
        response.data.map(transaction => ({
          value: transaction.from,
          label: transaction.from,
        })),
      );
      setCategories(
        response.data.map(transaction => ({
          value: transaction.category,
          label: transaction.category,
        })),
      );
      setTimeout(() => {
        setIsLoading(false);
      }, 3000);
    });
  }, []);

  return (
    <main className="create-transaction">
      {confirm ? (
        <section className="confirm">
          <p>Transaction created successfully!</p>
          <div className="confirm__btns">
            <button
              onClick={() => {
                setConfirm(false);
                navigate('/transactions');
              }}
            >
              Go to Transactions
            </button>
            <button
              onClick={() => {
                setConfirm(false);
                navigate(`/transactions/transaction/${confirm}`);
              }}
            >
              View Transaction
            </button>
            <button
              onClick={() => {
                setConfirm(false);
                navigate('transactions/transaction/new');
              }}
            >
              Create Another
            </button>
          </div>
        </section>
      ) : (
        <>
          <h1>New Transaction</h1>
          {isLoading ? (
            <Loading />
          ) : (
            <form onSubmit={handleSubmit} className="form">
              <div className="form__section">
                <label htmlFor="name">Name</label>
                <CreatableSelect
                  inputId="name"
                  name="name"
                  value={newTransaction.name}
                  onChange={handleSelectChange}
                  options={names}
                  isClearable
                />
              </div>
              <div className="form__section">
                <label htmlFor="amount">Amount</label>
                <br />
                <input
                  type="number"
                  id="amount"
                  name="amount"
                  value={newTransaction.amount}
                  onChange={handleChange}
                  placeholder="0.00"
                />
              </div>
              <div className="form__section">
                <label htmlFor="from">From</label>
                <CreatableSelect
                  inputId="from"
                  name="from"
                  value={newTransaction.from}
                  onChange={handleSelectChange}
                  options={froms}
                  isClearable
                />
              </div>
              <div className="form__section">
                <label htmlFor="category">Category</label>
                <CreatableSelect
                  inputId="category"
                  name="category"
                  value={newTransaction.category}
                  onChange={handleSelectChange}
                  options={categories}
                  isClearable
                />
              </div>
              <div className="form__section">
                <label htmlFor="type">Type</label>
                <Select
                  inputId="type"
                  name="type"
                  value={newTransaction.type}
                  onChange={handleSelectChange}
                  options={types}
                />
              </div>
              <div className="form__btns">
                <button type="button" onClick={() => navigate('/transactions')}>
                  Cancel
                </button>
                <button type="submit">Create</button>
              </div>
              {error && (
                <div className="form__errors">
                  {error && <p style={{color: 'red'}}>{error[0]}</p>}
                  {error && <p style={{color: 'red'}}>{error[1]}</p>}
                  {error && <p style={{color: 'red'}}>{error[2]}</p>}
                </div>
              )}
            </form>
          )}
        </>
      )}
    </main>
  );
};

export default NewTransaction;
