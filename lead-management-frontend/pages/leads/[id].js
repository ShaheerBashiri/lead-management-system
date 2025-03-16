import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

export default function LeadDetail() {
  const router = useRouter();
  const { id } = router.query;

  const [name, setName] = useState('');
  const [sex, setSex] = useState('');
  const [gender, setGender] = useState('');
  const [otherGender, setOtherGender] = useState('');
  const [address, setAddress] = useState('');
  const [leadSource, setLeadSource] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchLead(id);
    }
  }, [id]);

  const fetchLead = async (leadId) => {
    try {
      const response = await axios.get(`http://localhost:4000/api/leads/${leadId}`);
      const lead = response.data;

      setName(lead.name || '');
      setSex(lead.sex || '');
      const standardGenders = ['Male', 'Female', 'Non-binary', 'Prefer not to say'];
      if (standardGenders.includes(lead.gender)) {
        setGender(lead.gender);
        setOtherGender('');
      } else {
        setGender('Other');
        setOtherGender(lead.gender || '');
      }
      setAddress(lead.address || '');
      setLeadSource(lead.leadSource || '');
      setLoading(false);
    } catch (error) {
      console.error('Error fetching lead:', error);
    }
  };

  const updateLead = async (e) => {
    e.preventDefault();
    const finalGender = gender === 'Other' ? otherGender : gender;
    try {
      await axios.put(`http://localhost:4000/api/leads/${id}`, {
        name,
        sex,
        gender: finalGender,
        address,
        leadSource,
      });
      alert('Lead updated successfully!');
      router.push('/leads');
    } catch (error) {
      console.error('Error updating lead:', error);
    }
  };

  const convertLead = async () => {
    try {
      await axios.post(`http://localhost:4000/api/leads/${id}/convert`);
      alert('Lead converted to customer!');
      router.push('/customers');
    } catch (error) {
      console.error('Error converting lead:', error);
    }
  };

  if (loading) return <div>Loading lead details...</div>;

  return (
    <div>
      <h1>Edit Lead</h1>

      <form onSubmit={updateLead}>
        <label>Name:</label>
        <input value={name} onChange={(e) => setName(e.target.value)} required />

        <label>Sex:</label>
        <select value={sex} onChange={(e) => setSex(e.target.value)} required>
          <option value="">Select Sex</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Prefer not to say">Prefer not to say</option>
        </select>

        <label>Gender:</label>
        <select value={gender} onChange={(e) => setGender(e.target.value)} required>
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Non-binary">Non-binary</option>
          <option value="Prefer not to say">Prefer not to say</option>
          <option value="Other">Other</option>
        </select>
        {gender === 'Other' && (
          <>
            <label>Please specify:</label>
            <input
              value={otherGender}
              onChange={(e) => setOtherGender(e.target.value)}
              placeholder="Enter gender"
              required
            />
          </>
        )}

        <label>Address:</label>
        <input value={address} onChange={(e) => setAddress(e.target.value)} />

        <label>Lead Source:</label>
        <input value={leadSource} onChange={(e) => setLeadSource(e.target.value)} />

        <div className="btn-group">
          <button type="submit">Update Lead</button>
          <button type="button" onClick={convertLead}>
            Convert to Customer
          </button>
        </div>
      </form>
    </div>
  );
}
