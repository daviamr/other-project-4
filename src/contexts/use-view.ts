import { createContext, useContext } from "react";

type ViewContextType = {
  view: string,
  changeView: (view: string) => void;
}

export const ViewContext = createContext<ViewContextType | undefined>(undefined);

export const useView = () => {
  const context = useContext(ViewContext);
  if (!context) {
    throw new Error("useView deve ser usado dentro de ViewProvider");
  }
  return context;
};