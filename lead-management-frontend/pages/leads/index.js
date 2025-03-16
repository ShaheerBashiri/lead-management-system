import { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';

export default function LeadsList() {
  const [leads, setLeads] = useState([]);

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/leads');
      setLeads(response.data);
    } catch (err) {
      console.error('Error fetching leads:', err);
    }
  };

  const deleteLead = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/leads/${id}`);
      fetchLeads();
    } catch (err) {
      console.error('Error deleting lead:', err);
    }
  };

  return (
    <div>
      <h1>All Leads</h1>

      <Link href="/leads/create" className="btn-link mb-1">
        Create New Lead
      </Link>

      {leads.length === 0 ? (
        <p>No leads yet.</p>
      ) : (
        <ul>
          {leads.map((lead) => (
            <li key={lead._id}>
              <strong>{lead.name}</strong> ({lead.leadSource})
              <br />

              <div className="btn-group">
                <Link href={`/leads/${lead._id}`} className="btn-link">
                  View / Edit
                </Link>
                <button onClick={() => deleteLead(lead._id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
