import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function FormFilter() {
  const { planetName, handleNameFilter,
    selectedFilters,
    handleChangeFilter,
    handleButtonFilter,
    filterOptions,
    filtersPerformed } = useContext(PlanetsContext);

  return (
    <div>
      <label htmlFor="planetName">Nome do Planeta</label>
      <input
        data-testid="name-filter"
        type="text"
        value={ planetName }
        onChange={ handleNameFilter }
        name="planetName"
        placeholder="Digite o nome do planeta"
      />

      <label htmlFor="column">Coluna</label>
      <select
        data-testid="column-filter"
        name="column"
        onChange={ ({ target }) => handleChangeFilter({ target }) }
      >
        {filterOptions.map((options) => (
          <option key={ options } value={ options }>{options}</option>
        ))}
      </select>

      <label htmlFor="comparison">Operador</label>
      <select
        data-testid="comparison-filter"
        name="comparison"
        onChange={ ({ target }) => handleChangeFilter({ target }) }
      >
        <option value="maior que">maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual a">igual a</option>
      </select>

      <input
        data-testid="value-filter"
        type="number"
        name="value"
        value={ selectedFilters.value }
        onChange={ ({ target }) => handleChangeFilter({ target }) }
      />

      <button
        data-testid="button-filter"
        type="button"
        onClick={ handleButtonFilter }
      >
        FILTRAR
      </button>
      <div>
        {filtersPerformed.map((filter, index) => (
          <div
            key={ index }
            data-testid="filter"
          >
            <p>{filter.column}</p>
            <p>{filter.comparison}</p>
            <p>{filter.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FormFilter;
