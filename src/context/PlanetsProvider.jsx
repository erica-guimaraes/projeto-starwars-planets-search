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

  const handleFilter = () => {
    const { column, comparison, value } = selectedFilters;
    const filter = filteredPlanets.filter((planet) => {
      if (comparison === 'maior que') {
        return Number(planet[column]) > Number(value);
      }
      if (comparison === 'menor que') {
        return Number(planet[column]) < Number(value);
      }
      return Number(planet[column]) === Number(value);
    });
    setFilteredPlanets(filter);
  };

  const handleButtonFilter = () => {
    const { column, comparison, value } = selectedFilters;
    setFiltersPerformed([...filtersPerformed, { column, comparison, value }]);
    handleFilter();
    const options = filterOptions.filter((element) => element !== selectedFilters.column);
    setFilterOptions(options);
    setSelectedFilters({
      ...selectedFilters,
      column: options[0],
    });
  };

  const handleDeleteFilterButton = (updatedFilters) => {
    setFiltersPerformed(updatedFilters);
    let filtered = planets;

    updatedFilters.forEach((filter) => {
      const { column, comparison, value } = filter;
      filtered = filtered.filter((planet) => {
        if (comparison === 'maior que') {
          return Number(planet[column]) > Number(value);
        }
        if (comparison === 'menor que') {
          return Number(planet[column]) < Number(value);
        }
        return Number(planet[column]) === Number(value);
      });
    });
    setFilteredPlanets(filtered);
  };

  const handleDeleteAllFiltersButton = () => {
    setFiltersPerformed([]);
    setFilteredPlanets(planets);
  };

  const values = { planets,
    planetName,
    handleNameFilter,
    selectedFilters,
    handleChangeFilter,
    handleButtonFilter,
    filtersPerformed,
    filterOptions,
    filteredPlanets,
    handleDeleteFilterButton,
    handleDeleteAllFiltersButton,
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
