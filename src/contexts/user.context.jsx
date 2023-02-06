import { createContext, useEffect } from "react";
import { useReducer } from "react";
import { onAuthStateChangedListener } from "../utils/firebase/firebase.utils";
import { createAction } from "../utils/reducer/reducer.utils";

//as the actual value you want to access
export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

export const USER_ACTION_TYPES = {
  SET_CURRENT_USER: "SET_CURRENT_USER",
};
//instead of using use state we will use Reducer
// const [state, dispatch] = useReducer(reducer, initialArg);

const userReducer = (state, action) => {
  console.log("Dispatched");
  console.log(action);
  const { type, payload } = action;
  switch (type) {
    case USER_ACTION_TYPES.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: payload,
      };
    default:
      throw new Error(`Unhandled type ${type} in the userReducer`);
  }
};
const INITIAL_STATE = {
  currentUser: null,
};

export const UserProvider = ({ children }) => {
  const [{ currentUser }, dispatch] = useReducer(userReducer, INITIAL_STATE);
  console.log(currentUser);
  const setCurrentUser = (user) => {
    dispatch(createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user));
  };

  // const [currentUser,setCurrentUser]=useState(null);
  const value = { currentUser, setCurrentUser };

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      setCurrentUser(user);
    });
    return unsubscribe;
  }, []);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
