/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import 'tailwindcss/tailwind.css';

const App = () => (
  <div className="bg-gray-800">
    <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8 lg:flex lg:justify-between">
      <div className="max-w-xl">
        <h2 className="text-4xl font-extrabold text-white sm:text-5xl sm:tracking-tight lg:text-6xl">
          Tailwind Test
        </h2>
        <p className="mt-5 text-xl text-gray-400">
          Start building for free, then add a site plan to go live. Account plans unlock additional features.
        </p>
      </div>
      <div className="mt-10 w-full max-w-xs">
        <label htmlFor="currency" className="block text-base font-medium text-gray-300">
          Currency
        </label>
        <div className="mt-1.5 relative">
          <select id="currency" name="currency" defaultValue="United States (USD)" className="appearance-none block w-full bg-none bg-gray-700 border border-transparent rounded-md pl-3 pr-10 py-2 text-base text-white focus:outline-none focus:ring-1 focus:ring-white focus:border-white sm:text-sm">
            <option>Argentina (ARS)</option>
            <option>Australia (AUD)</option>
            <option>United States (USD)</option>
            <option>Canada (CAD)</option>
            <option>France (EUR)</option>
            <option>Japan (JPY)</option>
            <option>Nigeria (NGN)</option>
            <option>Switzerland (CHF)</option>
            <option>United Kingdom (GBP)</option>
          </select>
        </div>
      </div>
    </div>
  </div>
);

export default App;
