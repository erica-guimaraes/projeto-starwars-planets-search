import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function FormFilter() {
  const { planetName, handleChange } = useContext(PlanetsContext);

  return (
    <div>
      <label htmlFor="planetName">Nome do Planeta</label>
      <input
        data-testid="name-filter"
        type="text"
        value={ planetName }
        onChange={ handleChange }
        name="planetName"
        placeholder="Digite o nome do planeta"
      />
    </div>
  );
}

export default FormFilter;
