import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import PlanetsProvider from '../context/PlanetsProvider';

describe('Testando o Componente Header', () => {
  it('Verifica se possui um título: "Star Wars"', () => {
    render(
      <PlanetsProvider>
        <App />
      </PlanetsProvider>
    )
    const title = screen.getByRole('heading', {  name: /star wars/i})
    expect(title).toBeInTheDocument();
  })
});
