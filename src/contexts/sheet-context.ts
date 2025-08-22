import { createContext, useContext } from "react";

type ViewContextType = {
  viewSheet: string,
  changeViewSheet: (view: string) => void;
}

export const ViewContext = createContext<ViewContextType | undefined>(undefined);

export const useViewSheet = () => {
  const context = useContext(ViewContext);
  if (!context) {
    throw new Error("useView deve ser usado dentro de ViewProvider");
  }
  return context;
};