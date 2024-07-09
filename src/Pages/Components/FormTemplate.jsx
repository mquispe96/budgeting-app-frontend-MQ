import {useState, useEffect} from 'react';
import CreatableSelect from 'react-select/creatable';
import Select from 'react-select';
import axios from 'axios';

const FormTemplate = ({
  transaction,
  setTransaction,
  handleSubmit,
  error,
  navigate,
}) => {
  const BASE_URL = import.meta.env.VITE_APP_BASE_URL;
  const [names, setNames] = useState([]);
  const [froms, setFroms] = useState([]);
  const [categories, setCategories] = useState([]);
  const types = [
    {value: 'Withdrawal', label: 'Withdrawal'},
    {value: 'Deposit', label: 'Deposit'},
  ];

  const handleChange = e => {
    setTransaction({...transaction, [e.target.name]: e.target.value});
  };

  const handleSelectChange = (selectedOption, actionMeta) => {
    setTransaction({...transaction, [actionMeta.name]: selectedOption});
  };

  useEffect(() => {
    axios.get(`${BASE_URL}/transactions`).then(response => {
      setNames(
        response.data.reduce((acc, transaction) => {
          const exists = acc.some(item => item.value === transaction.name);
          if (!exists) {
            acc.push({value: transaction.name, label: transaction.name});
          }
          return acc;
        }, []),
      );
      setFroms(
        response.data.reduce((acc, transaction) => {
          const exists = acc.some(item => item.value === transaction.from);
          if (!exists) {
            acc.push({value: transaction.from, label: transaction.from});
          }
          return acc;
        }, []),
      );
      setCategories(
        response.data.reduce((acc, transaction) => {
          const exists = acc.some(item => item.value === transaction.category);
          if (!exists) {
            acc.push({
              value: transaction.category,
              label: transaction.category,
            });
          }
          return acc;
        }, []),
      );
      setTimeout(() => {
        setIsLoading(false);
      }, 3000);
    });
  }, []);

  return (
    <form onSubmit={handleSubmit} className="form">
      <div className="form__section">
        <label htmlFor="name">Name</label>
        <CreatableSelect
          inputId="name"
          name="name"
          value={transaction.name}
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
          value={transaction.amount}
          onChange={handleChange}
          placeholder="0.00"
        />
      </div>
      <div className="form__section">
        <label htmlFor="from">From</label>
        <CreatableSelect
          inputId="from"
          name="from"
          value={transaction.from}
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
          value={transaction.category}
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
          value={transaction.type}
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
  );
};

export default FormTemplate;
