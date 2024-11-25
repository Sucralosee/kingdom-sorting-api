"use client";
import { useState, useEffect } from 'react';
import { useNavigate, Outlet, useLocation } from 'react-router-dom';

export default function Countries() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://restcountries.com/v3.1/name/kingdom');
        if (!response.ok) throw new Error('Failed to fetch data');
        const data = await response.json();
        setCountries(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCountrySelect = (event) => {
    const selectedCountry = countries.find(country => country.cca2 === event.target.value);
    if (selectedCountry) {
      navigate(`/countries/${selectedCountry.cca2}`, { state: { country: selectedCountry } });
    }
  };
  //this is useing cca2 to get the country code

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center p-4">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center text-white">Countries of the World</h1>
      
      <div className="mb-8 space-y-4">
        <select 
          className="p-2 border rounded-md bg-gray-800 text-white w-full max-w-md mx-auto block"
          onChange={handleCountrySelect}
          value={location.pathname.split('/')[2] || ''}
        >
          <option value="">Select a country</option>
          {countries.map(country => (
            <option key={country.cca2} value={country.cca2} className="text-white">
              {country.name.common}
            </option>
          ))}
        </select>
      </div>

      <Outlet />
    </div>
  );
}