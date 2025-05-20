import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const Modal = ({ children }) => {
  const elRef = useRef(null);

  if (!elRef.current) {
    elRef.current = document.createElement("div");
    elRef.current.className = "modal-overlay";
    elRef.current.setAttribute("role", "dialog");
    elRef.current.setAttribute("aria-modal", "true");
  }

  useEffect(() => {
    const modalRoot = document.getElementById("modal");

    if (!modalRoot) {
      console.error("Modal root not found: Make sure <div id='modal' /> exists in index.html");
      return;
    }

    modalRoot.appendChild(elRef.current);
    return () => {
      modalRoot.removeChild(elRef.current);
    };
  }, []);

  return createPortal(children, elRef.current);
};

export default Modal;
