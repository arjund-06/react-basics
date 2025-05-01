# React Hooks

## Table of Contents
1. [Introduction](#introduction)
2. [Basic Hooks](#basic-hooks)
3. [Additional Hooks](#additional-hooks)
4. [Custom Hooks](#custom-hooks)
5. [Rules of Hooks](#rules-of-hooks)

## Introduction

React Hooks are functions that let you "hook into" React state and lifecycle features from function components. They were introduced in React 16.8 to allow using state and other React features without writing a class.

## Basic Hooks

### useState

`useState` lets you add state to functional components.

```tsx
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

### useEffect

`useEffect` lets you perform side effects in function components. It's similar to `componentDidMount`, `componentDidUpdate`, and `componentWillUnmount` in class components.

```tsx
import { useState, useEffect } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    // Update the document title using the browser API
    document.title = `You clicked ${count} times`;
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

### useContext

`useContext` lets you subscribe to React context without introducing nesting.

```tsx
import { useContext } from 'react';
import { ThemeContext } from './theme-context';

function ThemedButton() {
  const theme = useContext(ThemeContext);
  return (
    <button style={{ background: theme.background, color: theme.foreground }}>
      I am styled by theme context!
    </button>
  );
}
```

## Additional Hooks

### useReducer

`useReducer` is an alternative to `useState` for managing complex state logic.

```tsx
import { useReducer } from 'react';

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    default:
      throw new Error();
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, { count: 0 });

  return (
    <>
      Count: {state.count}
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
    </>
  );
}
```

### useCallback

`useCallback` returns a memoized callback function.

```tsx
import { useCallback } from 'react';

function MyComponent() {
  const memoizedCallback = useCallback(
    () => {
      doSomething(a, b);
    },
    [a, b],
  );

  return <ChildComponent callback={memoizedCallback} />;
}
```

### useMemo

`useMemo` returns a memoized value.

```tsx
import { useMemo } from 'react';

function MyComponent({ a, b }) {
  const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);

  return <div>{memoizedValue}</div>;
}
```

## Custom Hooks

Custom Hooks let you extract component logic into reusable functions.

```tsx
import { useState, useEffect } from 'react';

function useFriendStatus(friendID) {
  const [isOnline, setIsOnline] = useState(null);

  useEffect(() => {
    function handleStatusChange(status) {
      setIsOnline(status.isOnline);
    }

    ChatAPI.subscribeToFriendStatus(friendID, handleStatusChange);
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(friendID, handleStatusChange);
    };
  });

  return isOnline;
}

// Usage
function FriendStatus(props) {
  const isOnline = useFriendStatus(props.friend.id);

  if (isOnline === null) {
    return 'Loading...';
  }
  return isOnline ? 'Online' : 'Offline';
}
```

## Rules of Hooks

1. **Only Call Hooks at the Top Level**
   - Don't call Hooks inside loops, conditions, or nested functions
   - Always use Hooks at the top level of your React function

2. **Only Call Hooks from React Functions**
   - Call Hooks from React function components
   - Call Hooks from custom Hooks

3. **Naming Convention**
   - Custom Hooks should start with "use" (e.g., `useFriendStatus`)

## Best Practices

1. **Use Multiple State Variables**
   ```tsx
   const [name, setName] = useState('');
   const [age, setAge] = useState(0);
   ```

2. **Use Effect Dependencies**
   ```tsx
   useEffect(() => {
     // Effect code
   }, [dependency1, dependency2]);
   ```

3. **Cleanup in useEffect**
   ```tsx
   useEffect(() => {
     const subscription = props.source.subscribe();
     return () => {
       subscription.unsubscribe();
     };
   });
   ```

4. **Use useCallback for Event Handlers**
   ```tsx
   const handleClick = useCallback(() => {
     // Handler code
   }, [dependencies]);
   ```

5. **Use useMemo for Expensive Calculations**
   ```tsx
   const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
   ``` 