import Pet from "./Pet";

const Results = ({ pets }) => {
  if (!pets?.length) {
    return <h1>No Pets Found</h1>;
  }

  return (
    <div className="search">
      {pets.map((pet) => (
        <Pet
          key={pet.id}
          animal={pet.animal}
          name={pet.name}
          breed={pet.breed}
          images={pet.images}
          location={`${pet.city}, ${pet.state}`}
          id={pet.id}
        />
      ))}
    </div>
  );
};

export default Results;
