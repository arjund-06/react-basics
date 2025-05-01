# Getting Started with React

## Table of Contents
1. [Introduction](#introduction)
2. [Key Differences from Angular](#key-differences-from-angular)
3. [Project Setup](#project-setup)
4. [Basic Concepts](#basic-concepts)
5. [Next Steps](#next-steps)

## Introduction

Welcome to your React learning journey! This guide will help you understand the fundamental concepts of React, especially if you're coming from an Angular background. React is a JavaScript library for building user interfaces, focusing on component-based architecture and a declarative programming style.

## Key Differences from Angular

1. **Library vs Framework**
   - React is a library, not a framework like Angular
   - You have more flexibility in choosing additional tools and libraries
   - Less opinionated about project structure

2. **Templating**
   - React uses JSX (JavaScript XML) instead of Angular's template syntax
   - JSX allows you to write HTML-like code directly in your JavaScript/TypeScript
   - No need for special directives like `*ngIf` or `*ngFor`

3. **State Management**
   - React's state management is more flexible
   - Built-in `useState` hook for local state
   - Context API for global state (similar to Angular services)
   - Can use third-party solutions like Redux or Zustand

4. **Component Lifecycle**
   - React uses hooks instead of lifecycle methods
   - `useEffect` hook replaces `ngOnInit`, `ngOnDestroy`, etc.
   - More functional approach to component lifecycle

## Project Setup

Our project uses:
- Vite as the build tool (faster than Create React App)
- TypeScript for type safety
- React Router for navigation
- TailwindCSS for styling
- Axios for API calls

## Basic Concepts

### 1. Components
React components are the building blocks of your application. They can be:
- Functional Components (recommended)
- Class Components (legacy)

Example of a functional component:
```tsx
import React from 'react';

interface Props {
  name: string;
}

const Greeting: React.FC<Props> = ({ name }) => {
  return <h1>Hello, {name}!</h1>;
};

export default Greeting;
```

### 2. JSX
JSX is a syntax extension for JavaScript that allows you to write HTML-like code:
```tsx
const element = (
  <div>
    <h1>Hello, world!</h1>
    <p>This is JSX</p>
  </div>
);
```

### 3. Props
Props are how you pass data from parent to child components:
```tsx
// Parent Component
const App = () => {
  return <Greeting name="John" />;
};

// Child Component
const Greeting = ({ name }) => {
  return <h1>Hello, {name}!</h1>;
};
```

### 4. State
State is used to manage data that changes over time:
```tsx
import { useState } from 'react';

const Counter = () => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
};
```

## Next Steps

1. Explore the project structure
2. Try modifying components in `src/components`
3. Check out the examples in `src/pages`
4. Move on to [React Basics](./react-basics.md) for more detailed concepts 