import { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';

export default function CustomersList() {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/customers');
      setCustomers(response.data);
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  };

  const deleteCustomer = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/customers/${id}`);
      fetchCustomers();
    } catch (error) {
      console.error('Error deleting customer:', error);
    }
  };

  return (
    <div>
      <h1>All Customers</h1>
      {customers.length === 0 ? (
        <p>No customers yet.</p>
      ) : (
        <ul>
          {customers.map((cust) => (
            <li key={cust._id}>
              <strong>{cust.name}</strong> ({cust.leadSource}) <br />
              Sex: {cust.sex || ''}, Gender: {cust.gender || ''} <br />
              Address: {cust.address || ''} <br />
              <button onClick={() => deleteCustomer(cust._id)}>Delete Customer</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
