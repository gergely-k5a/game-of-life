import { useSelector } from 'react-redux';

export default function Info() {
  const generation = useSelector((state) => state.generation);
  const population = useSelector((state) => state.population);

  return (
    <section id="infoBox">
      <p>Generation: {generation}</p>
      <p>Population: {population}</p>
    </section>
  );
}
