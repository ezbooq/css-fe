import { createContext } from "react";

/* -------------------------------------------------------------------------- */
/*                                 types                                      */
/* -------------------------------------------------------------------------- */
type AppContextValue = {
  setSelectedTabIndex: React.Dispatch<React.SetStateAction<number>>;
  selectedTabIndex: number;
};

export const CheckOutContext = createContext<AppContextValue>({
  selectedTabIndex: 1,
  setSelectedTabIndex: () => {},
});
