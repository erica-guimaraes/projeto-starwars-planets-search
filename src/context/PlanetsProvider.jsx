import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './PlanetsContext';

function PlanetsProvider({ children }) {
  //  ESTADOS

  const [planets, setPlanets] = useState([]); // Primeiro estado que lista todos os planetas da chamada à API
  const [planetName, setPlanetName] = useState(''); // Estado que filtra pelo nome dos planetas
  const [selectedFilters, setSelectedFilters] = useState({ // Estado que seleciona o filtro numérico dos planetas
    column: 'population',
    comparison: 'maior que',
    value: 0,
  });
  const [filteredPlanets, setFilteredPlanets] = useState([]); // Segundo estado que é alterado após à chamada a API
  const [filtersPerformed, setFiltersPerformed] = useState([]); // Estado que armazena os filtros realizados
  const [filterOptions, setFilterOptions] = useState(['population',
    'orbital_period', 'diameter', 'rotation_period', 'surface_water']); // Estado que armazena as opções de filtro pelas colunas

  useEffect(() => {
    const fetchPlanets = async () => {
      const response = await fetch('https://swapi.dev/api/planets');
      const data = await response.json();
      const listPlanets = data.results.map((planet) => {
        delete planet.residents;
        return planet;
      });
      setPlanets(listPlanets);
      setFilteredPlanets(listPlanets);
    };
    fetchPlanets();
  }, []);

  const handleNameFilter = ({ target }) => {
    const { value } = target;
    setPlanetName(value);
  };

  const handleChangeFilter = ({ target }) => {
    const { value, name } = target;
    setSelectedFilters({ ...selectedFilters, [name]: value });
  };

  const { column, comparison, value } = selectedFilters;

  const handleFilter = () => {
    const filter = filteredPlanets.filter((planet) => {
      if (comparison === 'maior que') {
        return Number(planet[column]) > Number(value);
      }
      if (comparison === 'menor que') {
        return Number(planet[column]) < Number(value);
      }
      if (comparison === 'igual a') {
        return Number(planet[column]) === Number(value);
      }
      return filteredPlanets;
    });
    setFilteredPlanets(filter);
  };

  const handleButtonFilter = () => {
    setFiltersPerformed([...filtersPerformed, { column, comparison, value }]);
    handleFilter();
    const options = filterOptions.filter((element) => element !== selectedFilters.column);
    setFilterOptions(options);
    setSelectedFilters({
      ...selectedFilters,
      column: options[0],
    });
  };

  console.log(filteredPlanets);
  console.log(filtersPerformed);
  console.log(filterOptions);

  const values = { planets,
    planetName,
    handleNameFilter,
    selectedFilters,
    handleChangeFilter,
    handleButtonFilter,
    filtersPerformed,
    filterOptions,
    filteredPlanets,
  };

  return (
    <PlanetsContext.Provider value={ values }>
      {children}
    </PlanetsContext.Provider>
  );
}

PlanetsProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default PlanetsProvider;
