import { useState, type ReactNode } from "react";
import { ViewContext } from "./use-view";

export const ViewProvider = ({ children }: { children: ReactNode }) => {
  const [view, setView] = useState("userpage")

  const changeView = (newView: string) => {
    setView(newView)
  }

  return (
    <ViewContext.Provider value={{ view, changeView }}>
      {children}
    </ViewContext.Provider>
  )
}