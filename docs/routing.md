# Routing in React

## Table of Contents
1. [Introduction](#introduction)
2. [React Router Basics](#react-router-basics)
3. [Route Parameters](#route-parameters)
4. [Nested Routes](#nested-routes)
5. [Navigation](#navigation)
6. [Protected Routes](#protected-routes)
7. [Best Practices](#best-practices)

## Introduction

React Router is the most popular routing library for React applications. It enables navigation between different components in a React application, allowing for a single-page application (SPA) experience.

## React Router Basics

### Installation
```bash
npm install react-router-dom
```

### Basic Setup
```tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
}
```

## Route Parameters

### Dynamic Routes
```tsx
<Route path="/users/:id" element={<UserProfile />} />

// In UserProfile component
import { useParams } from 'react-router-dom';

function UserProfile() {
  const { id } = useParams();
  return <h1>User Profile: {id}</h1>;
}
```

### Optional Parameters
```tsx
<Route path="/users/:id?" element={<UserProfile />} />
```

### Multiple Parameters
```tsx
<Route path="/users/:userId/posts/:postId" element={<Post />} />
```

## Nested Routes

### Basic Nested Routes
```tsx
<Routes>
  <Route path="/dashboard" element={<Dashboard />}>
    <Route path="profile" element={<Profile />} />
    <Route path="settings" element={<Settings />} />
  </Route>
</Routes>

// In Dashboard component
import { Outlet } from 'react-router-dom';

function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      <nav>
        <Link to="profile">Profile</Link>
        <Link to="settings">Settings</Link>
      </nav>
      <Outlet />
    </div>
  );
}
```

### Index Routes
```tsx
<Routes>
  <Route path="/dashboard" element={<Dashboard />}>
    <Route index element={<DashboardHome />} />
    <Route path="profile" element={<Profile />} />
  </Route>
</Routes>
```

## Navigation

### Link Component
```tsx
import { Link } from 'react-router-dom';

function Navigation() {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <Link to="/contact">Contact</Link>
    </nav>
  );
}
```

### Programmatic Navigation
```tsx
import { useNavigate } from 'react-router-dom';

function LoginButton() {
  const navigate = useNavigate();

  const handleLogin = () => {
    // Perform login logic
    navigate('/dashboard');
  };

  return <button onClick={handleLogin}>Login</button>;
}
```

### Navigation with State
```tsx
navigate('/dashboard', { state: { from: 'login' } });

// In Dashboard component
import { useLocation } from 'react-router-dom';

function Dashboard() {
  const location = useLocation();
  const { from } = location.state || {};
  return <h1>Welcome from {from}</h1>;
}
```

## Protected Routes

### Basic Protected Route
```tsx
function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  return isAuthenticated ? children : null;
}

// Usage
<Routes>
  <Route
    path="/dashboard"
    element={
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    }
  />
</Routes>
```

### Route Guards
```tsx
function PrivateRoute({ element: Element, ...rest }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <Route
      {...rest}
      element={isAuthenticated ? <Element /> : <Navigate to="/login" />}
    />
  );
}
```

## Best Practices

1. **Route Organization**
   - Group related routes together
   - Use nested routes for hierarchical navigation
   - Keep route definitions in a separate file

2. **Code Splitting**
   ```tsx
   const Dashboard = lazy(() => import('./pages/Dashboard'));
   
   <Route
     path="/dashboard"
     element={
       <Suspense fallback={<LoadingSpinner />}>
         <Dashboard />
       </Suspense>
     }
   />
   ```

3. **404 Route**
   ```tsx
   <Route path="*" element={<NotFound />} />
   ```

4. **Route Configuration**
   ```tsx
   const routes = [
     {
       path: '/',
       element: <Home />,
     },
     {
       path: '/dashboard',
       element: <Dashboard />,
       children: [
         { path: 'profile', element: <Profile /> },
         { path: 'settings', element: <Settings /> },
       ],
     },
   ];

   function App() {
     return (
       <Router>
         <Routes>
           {routes.map((route) => (
             <Route key={route.path} {...route} />
           ))}
         </Routes>
       </Router>
     );
   }
   ```

5. **Query Parameters**
   ```tsx
   import { useSearchParams } from 'react-router-dom';

   function SearchResults() {
     const [searchParams] = useSearchParams();
     const query = searchParams.get('q');
     return <h1>Search Results for: {query}</h1>;
   }
   ```

## Example: Complete Routing Setup

```tsx
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Outlet,
  useParams,
  useNavigate,
} from 'react-router-dom';

function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/users">Users</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardHome />} />
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        <Route path="/users" element={<UsersLayout />}>
          <Route index element={<UserList />} />
          <Route path=":id" element={<UserProfile />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

function DashboardLayout() {
  return (
    <div>
      <h1>Dashboard</h1>
      <nav>
        <Link to="profile">Profile</Link>
        <Link to="settings">Settings</Link>
      </nav>
      <Outlet />
    </div>
  );
}

function UserProfile() {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div>
      <h1>User Profile: {id}</h1>
      <button onClick={() => navigate('/users')}>Back to Users</button>
    </div>
  );
}
``` 