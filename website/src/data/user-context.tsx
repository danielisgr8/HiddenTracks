import React, { createContext, useContext, useReducer } from 'react';

type User = null | string;

interface UserActions {
  type: 'login',
  username: User,
}

const userReducer: React.Reducer<User, UserActions> = (_prevUser, action) => {
  return action.username;
}

const UserContext = createContext<User>(null);

const UserDispatchContext = createContext<null | React.Dispatch<UserActions>>(null);

function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, dispatch] = useReducer<React.Reducer<User, UserActions>>(userReducer, null);

  return (
    <UserContext.Provider value={user}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserContext.Provider>
  );
}

function useUser() {
  return useContext(UserContext);
}

function useUserDispatch() {
  return useContext(UserDispatchContext);
}

export {
  UserProvider,
  useUser,
  useUserDispatch,
};
