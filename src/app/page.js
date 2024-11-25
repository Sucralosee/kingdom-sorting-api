"use client";

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Countries from './components/Countries';
import Details from './components/Details';
import ClientOnly from './components/ClientOnly'; // Adjust path as needed

export default function App() {
  return (
    <ClientOnly>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Countries />} />
          <Route path="countries" element={<Countries />}>
            <Route path=":cca2" element={<Details />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ClientOnly>
  );
}
