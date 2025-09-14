import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter, Route, Routes } from "react-router";
import { PrimeReactProvider } from 'primereact/api';
import './index.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import 'primereact/resources/primereact.css';
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { DataList } from './ui';
import { Tracker, Report } from './modules';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter>
      <PrimeReactProvider>
        <Routes>
          <Route index element={<DataList />} />
          <Route path="new" element={<Report/> } />
          <Route path="track" element={ <Tracker/> } />
        </Routes>
      </PrimeReactProvider>
    </HashRouter>
  </StrictMode>,
)
