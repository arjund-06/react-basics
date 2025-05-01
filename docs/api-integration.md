# API Integration in React

## Table of Contents
1. [Introduction](#introduction)
2. [Fetch API](#fetch-api)
3. [Axios](#axios)
4. [React Query](#react-query)
5. [Error Handling](#error-handling)
6. [Loading States](#loading-states)
7. [Best Practices](#best-practices)

## Introduction

API integration is a crucial part of modern React applications. This guide covers different approaches to handle API calls, manage loading states, and handle errors effectively.

## Fetch API

The Fetch API is built into modern browsers and provides a simple way to make HTTP requests.

### Basic Usage
```tsx
import { useState, useEffect } from 'react';

function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://api.example.com/users');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
```

### POST Request
```tsx
const createUser = async (userData) => {
  try {
    const response = await fetch('https://api.example.com/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error('Failed to create user');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};
```

## Axios

Axios is a popular HTTP client that provides a more feature-rich API than fetch.

### Installation
```bash
npm install axios
```

### Basic Usage
```tsx
import axios from 'axios';

function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://api.example.com/users');
        setUsers(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // ... rest of the component
}
```

### Axios Instance
```tsx
// api.ts
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.example.com',
  timeout: 1000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
    }
    return Promise.reject(error);
  }
);

export default api;
```

## React Query

React Query is a powerful data-fetching and state management library for React.

### Installation
```bash
npm install @tanstack/react-query
```

### Basic Usage
```tsx
import { useQuery } from '@tanstack/react-query';

function UserList() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: () => fetch('https://api.example.com/users').then(res => res.json())
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <ul>
      {data.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
```

### Mutations
```tsx
import { useMutation, useQueryClient } from '@tanstack/react-query';

function AddUser() {
  const queryClient = useQueryClient();
  
  const mutation = useMutation({
    mutationFn: (newUser) => 
      axios.post('https://api.example.com/users', newUser),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });

  return (
    <button
      onClick={() => {
        mutation.mutate({ name: 'John Doe' });
      }}
    >
      Add User
    </button>
  );
}
```

## Error Handling

### Global Error Boundary
```tsx
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log error to an error reporting service
    console.error('Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}

// Usage
<ErrorBoundary>
  <App />
</ErrorBoundary>
```

### API Error Handling
```tsx
const handleApiError = (error) => {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.error('Error data:', error.response.data);
    console.error('Error status:', error.response.status);
    console.error('Error headers:', error.response.headers);
  } else if (error.request) {
    // The request was made but no response was received
    console.error('Error request:', error.request);
  } else {
    // Something happened in setting up the request that triggered an Error
    console.error('Error message:', error.message);
  }
};
```

## Loading States

### Loading Component
```tsx
function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
    </div>
  );
}
```

### Skeleton Loading
```tsx
function UserCardSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
      <div className="space-y-3 mt-4">
        <div className="h-4 bg-gray-200 rounded"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
      </div>
    </div>
  );
}
```

## Best Practices

1. **Centralize API Configuration**
   ```tsx
   // api/config.ts
   export const API_CONFIG = {
     baseURL: 'https://api.example.com',
     timeout: 5000,
     headers: {
       'Content-Type': 'application/json',
     },
   };
   ```

2. **Create Custom Hooks**
   ```tsx
   function useUsers() {
     return useQuery({
       queryKey: ['users'],
       queryFn: () => api.get('/users').then(res => res.data),
     });
   }
   ```

3. **Implement Retry Logic**
   ```tsx
   const fetchWithRetry = async (url, options = {}, retries = 3) => {
     try {
       const response = await fetch(url, options);
       if (!response.ok) throw new Error('Network response was not ok');
       return response;
     } catch (error) {
       if (retries > 0) {
         await new Promise(resolve => setTimeout(resolve, 1000));
         return fetchWithRetry(url, options, retries - 1);
       }
       throw error;
     }
   };
   ```

4. **Cache Management**
   ```tsx
   // Using React Query
   const { data } = useQuery({
     queryKey: ['users'],
     queryFn: fetchUsers,
     staleTime: 5 * 60 * 1000, // 5 minutes
     cacheTime: 30 * 60 * 1000, // 30 minutes
   });
   ```

5. **Type Safety**
   ```tsx
   interface User {
     id: number;
     name: string;
     email: string;
   }

   interface ApiResponse<T> {
     data: T;
     status: number;
     message: string;
   }

   const fetchUser = async (id: number): Promise<ApiResponse<User>> => {
     const response = await api.get(`/users/${id}`);
     return response.data;
   };
   ```

## Example: Complete API Integration

```tsx
// api.ts
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.example.com',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// api/users.ts
export interface User {
  id: number;
  name: string;
  email: string;
}

export const userApi = {
  getAll: async (): Promise<User[]> => {
    const response = await api.get('/users');
    return response.data;
  },

  getById: async (id: number): Promise<User> => {
    const response = await api.get(`/users/${id}`);
    return response.data;
  },

  create: async (user: Omit<User, 'id'>): Promise<User> => {
    const response = await api.post('/users', user);
    return response.data;
  },

  update: async (id: number, user: Partial<User>): Promise<User> => {
    const response = await api.put(`/users/${id}`, user);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/users/${id}`);
  },
};

// hooks/useUsers.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { userApi, User } from '../api/users';

export function useUsers() {
  return useQuery({
    queryKey: ['users'],
    queryFn: userApi.getAll,
  });
}

export function useUser(id: number) {
  return useQuery({
    queryKey: ['users', id],
    queryFn: () => userApi.getById(id),
  });
}

export function useCreateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: userApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
}

// components/UserList.tsx
function UserList() {
  const { data: users, isLoading, error } = useUsers();
  const createUser = useCreateUser();

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage error={error} />;

  return (
    <div>
      <button
        onClick={() => createUser.mutate({ name: 'New User', email: 'new@example.com' })}
      >
        Add User
      </button>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}
``` 