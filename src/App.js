import React from 'react';
import './App.css';
import Header from './components/Header';
import Table from './components/Table';
import FormFilter from './components/FormFilter';

function App() {
  return (
    <div>
      <Header />
      <FormFilter />
      <Table />
    </div>
  );
}

export default App;
