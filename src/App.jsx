import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [events, setEvents] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [registeredIds, setRegisteredIds] = useState([]);

  useEffect(() => {
    fetch('https://dummyjson.com/posts?limit=15')
      .then((res) => res.json())
      .then((data) => {
        const formattedEvents = data.posts.map((post) => ({
          id: post.id,
          // Extracting just the first 4-5 words for a cleaner "Event Title"
          title: post.title.split(' ').slice(0, 5).join(' '), 
          date: `March ${post.id + 5}, 2026`,
          location: "Downtown Innovation Hub",
          isUpcoming: post.id % 2 === 0,
        }));
        setEvents(formattedEvents);
      });
  }, []);

  const toggleRegister = (id) => {
    setRegisteredIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const filteredEvents = events.filter((e) =>
    e.title.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="app-wrapper">
      <div className="background-blobs"></div>
      
      <div className="main-content">
       <header className="hero-section">
  <div className="hero-glass-card">
    <h1 className="glitch-text">Impact Central</h1>
    <p className="subtitle">Discover movements that matter.</p>
    
    <div className="search-wrapper">
      <input
        type="text"
        placeholder="Search missions..."
        className="glass-input"
        onChange={(e) => setSearchText(e.target.value)}
      />
    </div>
  </div>
</header>

        <main className="event-grid">
          {filteredEvents.map((event) => (
            <div key={event.id} className="event-card-modern">
              <div className="card-header">
                <span className={`pill ${event.isUpcoming ? 'upcoming' : 'past'}`}>
                  {event.isUpcoming ? 'Upcoming' : 'Past'}
                </span>
              </div>
              
              <h3 className="event-name">{event.title}</h3>
              
              <div className="event-details">
                <p><span>📅</span> {event.date}</p>
                <p><span>📍</span> {event.location}</p>
              </div>

              <button 
                onClick={() => toggleRegister(event.id)}
                className={`action-btn ${registeredIds.includes(event.id) ? 'active' : ''}`}
              >
                {registeredIds.includes(event.id) ? 'Reserved ✅' : 'Count Me In'}
              </button>
            </div>
          ))}
        </main>
      </div>
    </div>
  );
};

export default App;