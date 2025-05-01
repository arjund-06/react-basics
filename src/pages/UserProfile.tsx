import { useState, useEffect } from 'react';
import axios from 'axios';

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
  };
}

const UserProfile = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          'https://jsonplaceholder.typicode.com/users/1'
        );
        setUser(response.data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch user data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) {
    return (
      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
        <p className="mt-4">Loading user data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md text-center">
        <p className="text-red-500">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">User Profile</h1>

      {user && (
        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-semibold">Personal Information</h2>
            <p className="text-gray-600">Name: {user.name}</p>
            <p className="text-gray-600">Email: {user.email}</p>
            <p className="text-gray-600">Phone: {user.phone}</p>
            <p className="text-gray-600">Website: {user.website}</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold">Company</h2>
            <p className="text-gray-600">Name: {user.company.name}</p>
            <p className="text-gray-600">Catch Phrase: {user.company.catchPhrase}</p>
          </div>
        </div>
      )}

      <div className="mt-8 p-4 bg-gray-100 rounded">
        <h2 className="text-lg font-semibold mb-2">What's happening here?</h2>
        <p className="text-sm">
          This example demonstrates:
        </p>
        <ul className="list-disc list-inside text-sm mt-2">
          <li>API integration using Axios</li>
          <li>Using the useEffect hook for data fetching</li>
          <li>Loading and error states</li>
          <li>TypeScript interfaces for API responses</li>
        </ul>
      </div>
    </div>
  );
};

export default UserProfile; 