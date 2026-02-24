import React from "react";
import { StoreContext, initialStoreContext } from "./StoreContext";
import { reducer } from "./StoreReducer";

export const StoreContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialStoreContext.state);
  
  React.useEffect(() => {
    localStorage.setItem("todo-list:todos", JSON.stringify(state));
  }, [state]);

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
}; 
