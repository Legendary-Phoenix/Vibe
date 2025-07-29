import { createContext, useContext } from "react";

const ScreenFocusContext = createContext(false);

export const useScreenFocus = () => useContext(ScreenFocusContext);

export const ScreenFocusProvider = ({ children, isFocused }) => {
  return (
    <ScreenFocusContext.Provider value={isFocused}>
      {children}
    </ScreenFocusContext.Provider>
  );
};
