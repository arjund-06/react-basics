# Forms and Validation in React

## Table of Contents
1. [Introduction](#introduction)
2. [Controlled Components](#controlled-components)
3. [Form Libraries](#form-libraries)
4. [Validation](#validation)
5. [Best Practices](#best-practices)

## Introduction

Handling forms in React requires managing form state, validation, and submission. This guide covers different approaches to form handling, from basic controlled components to using form libraries.

## Controlled Components

### Basic Form
```tsx
import { useState } from 'react';

function LoginForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Login</button>
    </form>
  );
}
```

### Form with Multiple Fields
```tsx
function UserForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  return (
    <form>
      <div>
        <label>First Name:</label>
        <input
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Last Name:</label>
        <input
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Street:</label>
        <input
          name="address.street"
          value={formData.address.street}
          onChange={handleChange}
        />
      </div>
      {/* More fields... */}
    </form>
  );
}
```

## Form Libraries

### React Hook Form
```tsx
import { useForm } from 'react-hook-form';

function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Email:</label>
        <input
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email address',
            },
          })}
        />
        {errors.email && <span>{errors.email.message}</span>}
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          {...register('password', {
            required: 'Password is required',
            minLength: {
              value: 8,
              message: 'Password must be at least 8 characters',
            },
          })}
        />
        {errors.password && <span>{errors.password.message}</span>}
      </div>
      <button type="submit">Login</button>
    </form>
  );
}
```

### Formik
```tsx
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email address')
    .required('Required'),
  password: Yup.string()
    .min(8, 'Must be at least 8 characters')
    .required('Required'),
});

function LoginForm() {
  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      <Form>
        <div>
          <label htmlFor="email">Email:</label>
          <Field name="email" type="email" />
          <ErrorMessage name="email" component="div" />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <Field name="password" type="password" />
          <ErrorMessage name="password" component="div" />
        </div>
        <button type="submit">Login</button>
      </Form>
    </Formik>
  );
}
```

## Validation

### Custom Validation
```tsx
function useFormValidation(initialState, validate) {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleBlur = () => {
    const validationErrors = validate(values);
    setErrors(validationErrors);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate(values);
    setErrors(validationErrors);
    setSubmitting(true);
  };

  return {
    handleChange,
    handleSubmit,
    handleBlur,
    values,
    errors,
    isSubmitting,
  };
}

// Usage
function LoginForm() {
  const validate = (values) => {
    const errors = {};
    if (!values.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = 'Email is invalid';
    }
    if (!values.password) {
      errors.password = 'Password is required';
    } else if (values.password.length < 8) {
      errors.password = 'Password must be at least 8 characters';
    }
    return errors;
  };

  const {
    handleChange,
    handleSubmit,
    handleBlur,
    values,
    errors,
    isSubmitting,
  } = useFormValidation(
    {
      email: '',
      password: '',
    },
    validate
  );

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Email:</label>
        <input
          name="email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.email && <div>{errors.email}</div>}
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.password && <div>{errors.password}</div>}
      </div>
      <button type="submit" disabled={isSubmitting}>
        Login
      </button>
    </form>
  );
}
```

## Best Practices

1. **Form Structure**
   ```tsx
   function FormLayout({ children, onSubmit }) {
     return (
       <form onSubmit={onSubmit} className="space-y-4">
         <div className="grid grid-cols-1 gap-4">
           {children}
         </div>
       </form>
     );
   }

   function FormField({ label, error, children }) {
     return (
       <div className="space-y-1">
         <label className="block text-sm font-medium text-gray-700">
           {label}
         </label>
         {children}
         {error && (
           <p className="text-sm text-red-600">{error}</p>
         )}
       </div>
     );
   }
   ```

2. **Reusable Input Components**
   ```tsx
   function Input({ label, error, ...props }) {
     return (
       <FormField label={label} error={error}>
         <input
           className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
             error ? 'border-red-300' : ''
           }`}
           {...props}
         />
       </FormField>
     );
   }
   ```

3. **Form Submission Handling**
   ```tsx
   function useFormSubmission(initialState, onSubmit) {
     const [isSubmitting, setSubmitting] = useState(false);
     const [submitError, setSubmitError] = useState(null);

     const handleSubmit = async (values) => {
       try {
         setSubmitting(true);
         setSubmitError(null);
         await onSubmit(values);
       } catch (error) {
         setSubmitError(error.message);
       } finally {
         setSubmitting(false);
       }
     };

     return {
       isSubmitting,
       submitError,
       handleSubmit,
     };
   }
   ```

4. **Form Reset**
   ```tsx
   function useFormReset(initialState) {
     const [values, setValues] = useState(initialState);

     const reset = () => {
       setValues(initialState);
     };

     return [values, setValues, reset];
   }
   ```

5. **Form Validation Rules**
   ```tsx
   const validationRules = {
     required: (value) => (!value ? 'This field is required' : ''),
     email: (value) =>
       !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)
         ? 'Invalid email address'
         : '',
     minLength: (value, length) =>
       value.length < length
         ? `Must be at least ${length} characters`
         : '',
     maxLength: (value, length) =>
       value.length > length
         ? `Must be at most ${length} characters`
         : '',
   };
   ```

## Example: Complete Form Implementation

```tsx
// components/FormField.tsx
interface FormFieldProps {
  label: string;
  error?: string;
  children: React.ReactNode;
}

function FormField({ label, error, children }: FormFieldProps) {
  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      {children}
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}

// components/Input.tsx
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

function Input({ label, error, ...props }: InputProps) {
  return (
    <FormField label={label} error={error}>
      <input
        className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
          error ? 'border-red-300' : ''
        }`}
        {...props}
      />
    </FormField>
  );
}

// components/LoginForm.tsx
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
});

function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      // Handle form submission
      console.log(data);
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        label="Email"
        type="email"
        error={errors.email?.message}
        {...register('email')}
      />
      <Input
        label="Password"
        type="password"
        error={errors.password?.message}
        {...register('password')}
      />
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
      >
        {isSubmitting ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
}
``` 