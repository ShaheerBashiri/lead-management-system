import { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function CreateLead() {
  const [name, setName] = useState('');
  const [sex, setSex] = useState('');
  const [gender, setGender] = useState('');
  const [otherGender, setOtherGender] = useState('');
  const [address, setAddress] = useState('');
  const [leadSource, setLeadSource] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const finalGender = gender === 'Other' ? otherGender : gender;
    try {
      await axios.post('http://localhost:4000/api/leads', {
        name,
        sex,
        gender: finalGender,
        address,
        leadSource,
      });
      router.push('/leads');
    } catch (error) {
      console.error('Error creating lead:', error);
    }
  };

  return (
    <div>
      <h1>Create a New Lead</h1>
      <form onSubmit={handleSubmit}>
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

        <button type="submit">Create Lead</button>
      </form>
    </div>
  );
}
