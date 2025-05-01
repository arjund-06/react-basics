import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-6">Welcome to React Learning Project</h1>
      <p className="text-xl mb-8">
        This project is designed to help you learn React from basics to intermediate concepts.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Counter Example</h2>
          <p className="mb-4">Learn about React state management with useState hook.</p>
          <Link
            to="/counter"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Try Counter
          </Link>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Todo List</h2>
          <p className="mb-4">Learn about handling lists and forms in React.</p>
          <Link
            to="/todos"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            View Todos
          </Link>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">User Profile</h2>
          <p className="mb-4">Learn about API integration and data fetching.</p>
          <Link
            to="/profile"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            View Profile
          </Link>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-4">Learning Resources</h2>
        <p className="mb-4">
          Check out the documentation in the <code>docs</code> folder for detailed explanations
          of React concepts and examples.
        </p>
        <ul className="list-disc list-inside text-left max-w-md mx-auto">
          <li>React Basics</li>
          <li>React Hooks</li>
          <li>State Management</li>
          <li>Routing</li>
          <li>API Integration</li>
          <li>Forms and Validation</li>
        </ul>
      </div>
    </div>
  );
};

export default Home; 