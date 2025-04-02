export const SET_USERS = "SET_USERS";

export const setUsers = (users) => {
  return {
    type: SET_USERS,
    payload: users,
  };
};
