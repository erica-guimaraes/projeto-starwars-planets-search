import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import PlanetsContext from '../context/PlanetsContext';
import PlanetsProvider from '../context/PlanetsProvider';
import Table from '../components/Table';
import mockPlanets from './helper/mockPlanets';
import { act } from 'react-dom/test-utils'


beforeEach(() => {
  global.fetch = jest.fn().mockResolvedValue({
    json: jest.fn().mockResolvedValue(mockPlanets),
  });
});

afterEach(jest.restoreAllMocks);

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

describe('Testando o Componente FormFilter', () => {
  it('Verifica se possui um elemento input de texto para digitar o nome do planeta', () => {
    render(
      <PlanetsProvider>
        <App />
      </PlanetsProvider>
    )
    const planetName = screen.getByRole('textbox')
    expect(planetName).toBeInTheDocument();
  })
  it('Verifica se possui um elemento select com opções de coluna como filtro', () => {
    render(
      <PlanetsProvider>
        <App />
      </PlanetsProvider>
    )
    const columnSelect = screen.getByTestId('column-filter')
    expect(columnSelect).toBeInTheDocument();
  })
  it('Verifica se possui um elemento select com opções de operador como filtro', () => {
    render(
      <PlanetsProvider>
        <App />
      </PlanetsProvider>
    )
    const comparisonSelect = screen.getByTestId('comparison-filter')
    expect(comparisonSelect).toBeInTheDocument();
  })
  it('Verifica se possui um elemento input de número', () => {
    render(
      <PlanetsProvider>
        <App />
      </PlanetsProvider>
    )
    const numberInput = screen.getByRole('spinbutton')
    expect(numberInput).toBeInTheDocument();
  })
  it('Verifica se possui um button: "FILTRAR"', () => {
    render(
      <PlanetsProvider>
        <App />
      </PlanetsProvider>
    )
    const filterButton = screen.getByRole('button', {  name: /filtrar/i})
    expect(filterButton).toBeInTheDocument();
  })
});

describe('Testando o Componente Table', () => {
  it('Verifica se a tabela possui 13 colunas', () => {
    render(
      <PlanetsProvider>
        <App />
      </PlanetsProvider>
    )
    const name = screen.getByRole('columnheader', {  name: /name/i})
    const rotation_period = screen.getByRole('columnheader', {  name: /rotation period/i})
    const orbital_period = screen.getByRole('columnheader', {  name: /orbital period/i})
    const diameter = screen.getByRole('columnheader', {  name: /diameter/i})
    const climate = screen.getByRole('columnheader', {  name: /climate/i})
    const gravity = screen.getByRole('columnheader', {  name: /gravity/i})
    const terrain = screen.getByRole('columnheader', {  name: /terrain/i})
    const surface_water = screen.getByRole('columnheader', {  name: /surface water/i})
    const population = screen.getByRole('columnheader', {  name: /population/i})
    const films = screen.getByRole('columnheader', {  name: /films/i})
    const created = screen.getByRole('columnheader', {  name: /created/i})
    const edited = screen.getByRole('columnheader', {  name: /edited/i})
    const url = screen.getByRole('columnheader', {  name: /url/i})

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
  })
  it('Verifica se a aplicação faz uma requisição à API', async () => {
    await act(() => render(
      <PlanetsProvider>
        <App />
      </PlanetsProvider>
    ));
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith('https://swapi.dev/api/planets');
  })
  // it('Verifica se a tabela tem uma linha para cada planeta', async () => {
  //   const planets = planetsData.results.map((planet) => {
  //     delete planet.residents;
  //     return planet;
  //   });
    
  //   const planetsName = planets.map(({name}) => name);
  //   await act(() => render(
  //     <PlanetsProvider>
  //       <App />
  //     </PlanetsProvider>
  //   ));
  //   const rows = screen.getAllByRole('cell').map((item) => item.textContent);
  //   expect(rows).toEqual(expect.arrayContaining(planetsName));
  // });

  // it('Verifica se os filtros estão funcionando corretamente', async () => {
  //   await act(() => render(
  //     <PlanetsProvider>
  //       <App />
  //     </PlanetsProvider>
  //   ));
  //   const columnSelect = screen.getByTestId('column-filter')
  //   const comparisonSelect = screen.getByTestId('comparison-filter')
  //   const numberInput = screen.getByRole('spinbutton');
  //   const filterButton = screen.getByRole('button', {  name: /filtrar/i})

  //   userEvent.selectOptions(columnSelect[0], 'population');
  //   userEvent.selectOptions(comparisonSelect[2], 'igual a');
  //   userEvent.type(numberInput, '1000');
  //   userEvent.click(filterButton);

  //   const planetFilter = screen.getByRole('cell', {  name: /yavin iv/i})
  //   expect(planetFilter).toBeInTheDocument();
  // });
});