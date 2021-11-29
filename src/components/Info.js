import { useSelector } from 'react-redux';

export default function Info() {
  const generation = useSelector((state) => state.generation);
  const population = useSelector((state) => state.population);

  return (
    <section id="infoBox" className="my-3">
      <span className="me-4">Generation: {generation}</span>
      <span>Population: {population}</span>
    </section>
  );
}
