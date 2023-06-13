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

describe('Testando o Componente FormFilter', () => {
  it('Verifica se a aplicação faz uma requisição à API', async () => {
    await act(() => render(
      <PlanetsProvider>
        <App />
      </PlanetsProvider>
    ));
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith('https://swapi.dev/api/planets');
  });

  it('Verifica se possui um elemento input de texto para digitar o nome do planeta', () => {
    render(
      <PlanetsProvider>
        <App />
      </PlanetsProvider>
    )
    const planetName = screen.getByRole('textbox');
    expect(planetName).toBeInTheDocument();
  });

  it('Verifica se possui um elemento select com 5 opções de coluna como filtro', () => {
    render(
      <PlanetsProvider>
        <App />
      </PlanetsProvider>
    )
    const columnSelect = screen.getByTestId('column-filter');
    expect(columnSelect).toBeInTheDocument();
    expect(columnSelect).toHaveLength(5);
  });

  it('Verifica se possui um elemento select com 3 opções de operador como filtro', () => {
    render(
      <PlanetsProvider>
        <App />
      </PlanetsProvider>
    )
    const comparisonSelect = screen.getByTestId('comparison-filter');
    expect(comparisonSelect).toBeInTheDocument();
    expect(comparisonSelect).toHaveLength(3);
  });

  it('Verifica se possui um elemento input de número', () => {
    render(
      <PlanetsProvider>
        <App />
      </PlanetsProvider>
    )
    const numberInput = screen.getByRole('spinbutton');
    expect(numberInput).toBeInTheDocument();
  });

  it('Verifica se possui um button: "FILTRAR"', () => {
    render(
      <PlanetsProvider>
        <App />
      </PlanetsProvider>
    )
    const filterButton = screen.getByRole('button', {  name: /filtrar/i});
    expect(filterButton).toBeInTheDocument();
  });

  it('Verifica se possui um button: "REMOVER FILTROS"', () => {
    render(
      <PlanetsProvider>
        <App />
      </PlanetsProvider>
    )
    const removefilterButton = screen.getByRole('button', {  name: /remover filtros/i});
    expect(removefilterButton).toBeInTheDocument();
  });

  it('Verifica a funcionalidade do filtro por nome', async () => {
    await act(() => render(
      <PlanetsProvider>
        <App />
      </PlanetsProvider>
    ));
    const planetName = await screen.findByTestId('name-filter');
    userEvent.type(planetName, 'a');
    expect(await screen.findAllByRole('row')).toHaveLength(8);
  });

  it('Verifica se os filtros de "menor que", "igual a" e "maior que" funcionam corretamente', async () => {
    await act(() => render(
      <PlanetsProvider>
        <App />
      </PlanetsProvider>
    ));
    const columnSelect = screen.getByTestId('column-filter');
    const comparisonSelect = screen.getByTestId('comparison-filter');
    const numberInput = screen.getByRole('spinbutton');
    const filterButton = screen.getByRole('button', {  name: /filtrar/i});

    userEvent.selectOptions(columnSelect, 'surface_water');
    userEvent.selectOptions(comparisonSelect, 'menor que');
    userEvent.type(numberInput, '40');
    userEvent.click(filterButton);

    expect(await screen.findAllByRole('row')).toHaveLength(7);
    userEvent.clear(numberInput);

    userEvent.selectOptions(columnSelect, 'population');
    userEvent.selectOptions(comparisonSelect, 'igual a');
    userEvent.type(numberInput, '1000');
    userEvent.click(filterButton);

    expect(await screen.findAllByRole('row')).toHaveLength(2);
    userEvent.clear(numberInput);

    userEvent.selectOptions(columnSelect, 'diameter');
    userEvent.selectOptions(comparisonSelect, 'maior que');
    userEvent.type(numberInput, '12500');
    userEvent.click(filterButton);

    expect(await screen.findAllByRole('row')).toHaveLength(1);
    userEvent.clear(numberInput);
  });

  it('Verifica se os botões de remover filtros estão funcionando', async () => {
    render(
      <PlanetsProvider>
        <App />
      </PlanetsProvider>
    );
    const buttonRemoveAllFilters = screen.getByTestId('button-remove-filters');
    const buttonFilter = await screen.findByTestId('button-filter');

    userEvent.click(buttonFilter);
    userEvent.click(buttonFilter);

    expect(screen.getAllByTestId('filter')).toHaveLength(2);

    userEvent.click(buttonRemoveAllFilters);
    expect(screen.queryAllByTestId('filter')).toHaveLength(0);
  });

  it('Testando se mais de um filtro esta funcionando', async () => {
    const removeFilter = async () => {
      const filters = await screen.findAllByTestId('filter');
      userEvent.click(filters[0].querySelector('button'));
    };
    await act(async () => {
      render(
        <PlanetsProvider>
          <App />
        </PlanetsProvider>
      );
    });
    expect(await screen.findAllByRole('row')).toHaveLength(11);

    const columnSelect = await screen.findAllByTestId('column-filter');
    const comparisonSelect = await screen.findAllByTestId('comparison-filter');
    const numberInput = await screen.findByTestId('value-filter');
    const filterButton = await screen.findByTestId('button-filter');

    userEvent.selectOptions(columnSelect[0], 'population');
    userEvent.selectOptions(comparisonSelect[0], 'maior que');
    userEvent.type(numberInput, '1000');
    userEvent.click(filterButton);

    expect(await screen.findAllByRole('row')).toHaveLength(8);

    userEvent.selectOptions(columnSelect[0], 'diameter');
    userEvent.selectOptions(comparisonSelect[0], 'menor que');
    userEvent.clear(numberInput);
    userEvent.type(numberInput, '19720');
    userEvent.click(filterButton);
    
    expect(await screen.findAllByRole('row')).toHaveLength(6);

    userEvent.selectOptions(columnSelect[0], 'orbital_period'); 
    userEvent.selectOptions(comparisonSelect[0], 'igual a');
    userEvent.clear(numberInput);
    userEvent.type(numberInput, '304');
    userEvent.click(filterButton);
   
    expect(await screen.findAllByRole('row')).toHaveLength(2);

    await removeFilter();
    await removeFilter();
    await removeFilter();

    expect(await screen.findAllByRole('row')).toHaveLength(11);
  });
});
  