import { useState } from 'react';

const Counter = () => {
  const [count, setCount] = useState(0);
  const [step, setStep] = useState(5);

  const increment = () => setCount(count + step);
  const decrement = () => setCount(count - step);
  // const reset = () => setCount(0);
  const reset = (all: boolean = false) => {
    console.log(`Resetting ${all}`)
    setCount(0);
    if (all)
      setStep(1);
    return;
  }

  const handleStepChange = (value: number) => {
    setStep(value > 0 ? value : 1);
  }

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">Counter Example</h1>
      
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Step Size:
        </label>
        <input
          type="number"
          value={step}
          onChange={(e) => {console.log("Change"); handleStepChange(Number(e.target.value))}}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      <div className="text-center mb-6">
        <p className="text-4xl font-bold">{count}</p>
      </div>

      <div className="flex justify-center space-x-4">
        <button
          onClick={decrement}
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
        >
          Decrement
        </button>
        <button
          onClick={() => reset()}
          className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
        >
          Reset
        </button>
        <button
          onClick={increment}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
        >
          Increment
        </button>
        <br />
        <button
          onClick={() => reset(true)}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
        >
          Reset All
        </button>
      </div>

      <div className="mt-8 p-4 bg-gray-100 rounded">
        <h2 className="text-lg font-semibold mb-2">What's happening here?</h2>
        <p className="text-sm">
          This example demonstrates the use of the <code>useState</code> hook in React.
          The counter value and step size are stored in state, and the component
          re-renders whenever these values change.
        </p>
      </div>
    </div>
  );
};

export default Counter; 