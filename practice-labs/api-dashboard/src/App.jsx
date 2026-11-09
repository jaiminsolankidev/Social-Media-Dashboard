import { useState, useEffect } from 'react';

const FALLBACK_USERS = [
  { id: 1, name: 'Leanne Graham', email: 'Sincere@april.biz', phone: '1-770-736-8031', website: 'hildegard.org', company: { name: 'Romaguera-Crona' } },
  { id: 2, name: 'Ervin Howell', email: 'Shanna@melissa.tv', phone: '010-692-6593', website: 'anastasia.net', company: { name: 'Deckow-Crist' } },
  { id: 3, name: 'Clementine Bauch', email: 'Nathan@yesenia.net', phone: '1-463-123-4447', website: 'ramiro.info', company: { name: 'Romaguera-Jacobson' } },
  { id: 4, name: 'Patricia Lebsack', email: 'Julianne.OConner@kory.org', phone: '493-170-9623', website: 'kale.biz', company: { name: 'Robel-Corkery' } },
  { id: 5, name: 'Chelsey Dietrich', email: 'Lucio_Hettinger@annie.ca', phone: '(254)954-1289', website: 'demarco.info', company: { name: 'Keebler LLC' } },
  { id: 6, name: 'Dennis Schulist', email: 'Karley_Dach@jasper.info', phone: '1-477-935-8478', website: 'ola.org', company: { name: 'Considine-Lockman' } }
];

export default function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    let isCancelled = false;
    async function fetchUsers() {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        if (!isCancelled) setUsers(data);
      } catch (err) {
        if (!isCancelled) {
          setError('Could not connect to external API. Loading mock fallback dataset.');
          setUsers(FALLBACK_USERS);
        }
      } finally {
        if (!isCancelled) setLoading(false);
      }
    }
    fetchUsers();
    return () => { isCancelled = true; };
  }, []);

  const filteredUsers = users.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="dashboard">
      <h1>Practice Lab 2: API Explorer</h1>
      <p className="subtitle">Demonstrating useEffect side effects, loading, and error handling</p>

      {error && <div className="error-banner">{error}</div>}

      <input
        type="text"
        className="search-bar"
        placeholder="Filter users by name or email..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {loading ? (
        <p>Fetching remote user data...</p>
      ) : filteredUsers.length === 0 ? (
        <p>No users match your search query.</p>
      ) : (
        <div className="grid">
          {filteredUsers.map((user) => (
            <div key={user.id} className="card" onClick={() => setSelectedUser(user)}>
              <div className="card-name">{user.name}</div>
              <div className="card-email">{user.email}</div>
              <div className="card-company">{user.company?.name}</div>
            </div>
          ))}
        </div>
      )}

      {selectedUser && (
        <div className="modal-backdrop" onClick={() => setSelectedUser(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>{selectedUser.name}</h2>
            <p><strong>Email:</strong> {selectedUser.email}</p>
            <p><strong>Phone:</strong> {selectedUser.phone}</p>
            <p><strong>Website:</strong> {selectedUser.website}</p>
            <p><strong>Company:</strong> {selectedUser.company?.name}</p>
            <button
              style={{ marginTop: '16px', background: '#4f46e5', color: '#fff' }}
              onClick={() => setSelectedUser(null)}
            >
              Close Details
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
