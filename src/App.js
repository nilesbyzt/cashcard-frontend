// Import necessary React components and Axios for making API requests

import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [cashCards, setCashCards] = useState([]);
  const [newCashCard, setNewCashCard] = useState({ amount: 0 });
  const [selectedCashCard, setSelectedCashCard] = useState(null);

  // Function to fetch all cash cards
  const fetchCashCards = async () => {
    try {
      const response = await axios.get('/cashcards');
      setCashCards(response.data);
    } catch (error) {
      console.error('Error fetching cash cards:', error);
    }
  };

  // Function to create a new cash card
  const createCashCard = async () => {
    try {
      await axios.post('/cashcards/', newCashCard);
      setNewCashCard({ amount: 0 });
      fetchCashCards();
    } catch (error) {
      console.error('Error creating cash card:', error);
    }
  };

  // Function to update a cash card
  const updateCashCard = async () => {
    if (selectedCashCard) {
      try {
        await axios.put(`/cashcards/${selectedCashCard.id}`, selectedCashCard);
        setSelectedCashCard(null);
        fetchCashCards();
      } catch (error) {
        console.error('Error updating cash card:', error);
      }
    }
  };

  // Function to delete a cash card
  const deleteCashCard = async (id) => {
    try {
      await axios.delete(`/cashcards/${id}`);
      fetchCashCards();
    } catch (error) {
      console.error('Error deleting cash card:', error);
    }
  };

  useEffect(() => {
    fetchCashCards();
  }, []); // Fetch cash cards when the component mounts

  return (
    <div>
      <h1>Cash Cards</h1>
      
      {/* Create a new cash card */}
      <div>
        <input
          type="number"
          placeholder="Amount"
          value={newCashCard.amount}
          onChange={(e) => setNewCashCard({ amount: e.target.value })}
        />
        <button onClick={createCashCard}>Create Cash Card</button>
      </div>

      {/* List of cash cards */}
      <ul>
        {cashCards.map((cashCard) => (
          <li key={cashCard.id}>
            <span>{cashCard.amount}</span>
            <button onClick={() => setSelectedCashCard(cashCard)}>Edit</button>
            <button onClick={() => deleteCashCard(cashCard.id)}>Delete</button>
          </li>
        ))}
      </ul>

      {/* Edit cash card */}
      {selectedCashCard && (
        <div>
          <h2>Edit Cash Card</h2>
          <input
            type="number"
            value={selectedCashCard.amount}
            onChange={(e) =>
              setSelectedCashCard({
                ...selectedCashCard,
                amount: e.target.value,
              })
            }
          />
          <button onClick={updateCashCard}>Save</button>
          <button onClick={() => setSelectedCashCard(null)}>Cancel</button>
        </div>
      )}
    </div>
  );
}

export default App;
