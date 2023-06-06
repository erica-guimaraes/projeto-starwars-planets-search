import { useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';
import planetsContext from './PlanetsContext';

function PlanetsProvider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [erro, setError] = useState(null);

  const fetchPlanets = async () => {
    try {
      const response = await fetch('https://swapi.dev/api/planets');
      const data = await response.json();
      const listPlanets = data.results.map((planet) => {
        delete planet.residents;
        return planet;
      });
      setPlanets(listPlanets);
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    fetchPlanets();
  }, []);

  const values = { planets, erro };

  return (
    <planetsContext.Provider value={ values }>
      {children}
    </planetsContext.Provider>
  );
}

PlanetsProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default PlanetsProvider;
