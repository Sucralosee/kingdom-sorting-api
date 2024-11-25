"use client";

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Countries from './components/Countries';
import Details from './components/Details';
import ClientOnly from './components/ClientOnly';
import { useEffect, useState } from 'react';

export default function App() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (typeof window === 'undefined') return null;
  if (!mounted) return null;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Countries />} />
        <Route path="countries" element={<Countries />}>
          <Route path=":cca2" element={<Details />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}