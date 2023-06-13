import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import PlanetsProvider from '../context/PlanetsProvider';
import mockPlanets from './helper/mockPlanets';
import { act } from 'react-dom/test-utils'
import userEvent from '@testing-library/user-event';


beforeEach(() => {
  global.fetch = jest.fn().mockResolvedValue({
    json: jest.fn().mockResolvedValue(mockPlanets),
  });
});

afterEach(jest.restoreAllMocks);

describe('Testando o Componente Table', () => {
  const planets = mockPlanets.results.map((planet) => {
    delete planet.residents;
    return planet;
  });
  const planetsName = planets.map(({name}) => name);
  const optionsSelect = ['population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water'];

  it('Verifica se a tabela possui 13 colunas', () => {
    render(
      <PlanetsProvider>
        <App />
      </PlanetsProvider>
    )
    const name = screen.getByRole('columnheader', {  name: /name/i});
    const rotation_period = screen.getByRole('columnheader', {  name: /rotation period/i});
    const orbital_period = screen.getByRole('columnheader', {  name: /orbital period/i});
    const diameter = screen.getByRole('columnheader', {  name: /diameter/i});
    const climate = screen.getByRole('columnheader', {  name: /climate/i});
    const gravity = screen.getByRole('columnheader', {  name: /gravity/i});
    const terrain = screen.getByRole('columnheader', {  name: /terrain/i});
    const surface_water = screen.getByRole('columnheader', {  name: /surface water/i});
    const population = screen.getByRole('columnheader', {  name: /population/i});
    const films = screen.getByRole('columnheader', {  name: /films/i});
    const created = screen.getByRole('columnheader', {  name: /created/i});
    const edited = screen.getByRole('columnheader', {  name: /edited/i});
    const url = screen.getByRole('columnheader', {  name: /url/i});

    expect(name).toBeInTheDocument();
    expect(rotation_period).toBeInTheDocument();
    expect(orbital_period).toBeInTheDocument();
    expect(diameter).toBeInTheDocument();
    expect(climate).toBeInTheDocument();
    expect(gravity).toBeInTheDocument();
    expect(terrain).toBeInTheDocument();
    expect(surface_water).toBeInTheDocument();
    expect(population).toBeInTheDocument();
    expect(films).toBeInTheDocument();
    expect(created).toBeInTheDocument();
    expect(edited).toBeInTheDocument();
    expect(url).toBeInTheDocument();
  });

  it('Verifica se a tabela tem uma linha para cada planeta', async () => {
    await act(() => render(
      <PlanetsProvider>
        <App />
      </PlanetsProvider>
    ));
    
    const rows = screen.getAllByRole('cell').map((item) => item.textContent);
    expect(rows).toEqual(expect.arrayContaining(planetsName));
  });

  it('Verifica se a tabela é atualizada de acordo com os filtros e a remoção dos mesmos', async () => {
    await act(() => render(
      <PlanetsProvider>
        <App />
      </PlanetsProvider>
    ));

    userEvent.selectOptions(screen.getByTestId('column-filter'), 'diameter');
    userEvent.selectOptions(screen.getByTestId('comparison-filter'), 'maior que');
    userEvent.type(screen.getByTestId('value-filter'), '8900');
    userEvent.click(screen.getByTestId('button-filter'));

    const filteredNames = screen.getAllByTestId('planet-name').map((item) => item.textContent);
    const filteredNamesExpected = planets.filter((planet) => planet.diameter > 8900).map((planet) => planet.name);

    const filteredColumns = Array.from(screen.getByTestId('column-filter')).map((item) => item.textContent);
    const filteredColumnsExpected = optionsSelect.filter((option) => option !== 'diameter');

    expect(filteredNames).toEqual(filteredNamesExpected);
    expect(filteredColumns).toEqual(filteredColumnsExpected);

    userEvent.click(screen.getByText(/x/i));

    const allPlanetsNames = screen.getAllByTestId('planet-name').map((item) => item.textContent);
    const allOptionsSelect = Array.from(screen.getByTestId('column-filter')).map((item) => item.textContent);

    expect(allPlanetsNames).toEqual(planetsName);
    expect(allOptionsSelect).toEqual(['population', 'orbital_period', 'rotation_period', 'surface_water']);
  });
});