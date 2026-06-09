import React, { createContext, useContext, useState, useCallback } from "react";

interface CalendlyContextValue {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const CalendlyContext = createContext<CalendlyContextValue>({
  isOpen: false,
  openModal: () => {},
  closeModal: () => {},
});

export const CalendlyProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const openModal = useCallback(() => setIsOpen(true), []);
  const closeModal = useCallback(() => setIsOpen(false), []);

  return (
    <CalendlyContext.Provider value={{ isOpen, openModal, closeModal }}>
      {children}
    </CalendlyContext.Provider>
  );
};

export const useCalendly = () => useContext(CalendlyContext);
