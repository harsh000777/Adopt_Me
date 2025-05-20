import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useContext, useState } from "react";
import AdoptedPetContext from "../store/adoptedPet";
import ErrorBoundary from "./ErrorBoundary";
import fetchPet from "../store/fetchPet";
import Modal from "./Modal";
import Carousel from "./Carousel";

const Details = () => {
  const { id } = useParams();
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const [, setAdoptedPet] = useContext(AdoptedPetContext);

  const { data, isLoading, error } = useQuery({
    queryKey: ["details", id],
    queryFn: ({ queryKey }) => fetchPet({ queryKey }),  // updated here
  });

  if (isLoading) {
    return (
      <div className="loading-pane">
        <h2 className="loader">🌀</h2>
      </div>
    );
  }

  if (error || !data?.pets?.length) {
    return <h2 className="error">Something went wrong fetching the pet data.</h2>;
  }

  const pet = data.pets[0];

  return (
    <div className="details">
      <Carousel images={pet.images} />
      <div>
        <h1>{pet.name}</h1>
        <h2>{`${pet.animal} — ${pet.breed} — ${pet.city}, ${pet.state}`}</h2>
        <button onClick={() => setShowModal(true)}>Adopt {pet.name}</button>
        <p>{pet.description}</p>
        {showModal && (
          <Modal>
            <div>
              <h1>Would you like to adopt {pet.name}?</h1>
              <div className="buttons">
                <button
                  onClick={() => {
                    setAdoptedPet(pet);
                    navigate("/");
                  }}
                >
                  Yes
                </button>
                <button onClick={() => setShowModal(false)}>No</button>
              </div>
            </div>
          </Modal>
        )}
      </div>
    </div>
  );
};

export default function DetailsErrorBoundary(props) {
  return (
    <ErrorBoundary>
      <Details {...props} />
    </ErrorBoundary>
  );
}
