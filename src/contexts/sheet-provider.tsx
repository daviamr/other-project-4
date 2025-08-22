import { useState, type ReactNode } from "react";
import { ViewContext } from "./sheet-context";

export const ViewSheetProvider = ({ children }: { children: ReactNode }) => {
  const [viewSheet, setViewSheet] = useState("default")

  const changeViewSheet = (newView: string) => {
    setViewSheet(newView)
  }

  return (
    <ViewContext.Provider value={{ viewSheet, changeViewSheet }}>
      {children}
    </ViewContext.Provider>
  )
}