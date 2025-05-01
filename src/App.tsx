import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Counter from './pages/Counter';
import TodoList from './pages/TodoList';
import UserProfile from './pages/UserProfile';
import './App.css'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-white shadow-lg">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex justify-between">
              <div className="flex space-x-7">
                <div className="flex items-center py-4">
                  <Link to="/" className="text-gray-700 hover:text-gray-900">
                    Home
                  </Link>
                </div>
                <div className="flex items-center space-x-4">
                  <Link to="/counter" className="text-gray-700 hover:text-gray-900">
                    Counter
                  </Link>
                  <Link to="/todos" className="text-gray-700 hover:text-gray-900">
                    Todo List
                  </Link>
                  <Link to="/profile" className="text-gray-700 hover:text-gray-900">
                    User Profile
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </nav>

        <main className="max-w-6xl mx-auto py-6 px-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/counter" element={<Counter />} />
            <Route path="/todos" element={<TodoList />} />
            <Route path="/profile" element={<UserProfile />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
