import { IUser } from 'entities/user-entities';
import { TUserLogin } from 'Store/user/user-types';

export const authenticate = ({ username, password }: TUserLogin): IUser => {
  const users = JSON.parse(localStorage.getItem('TimeTrackingUsers')) || [];
  const user = users.find((anyUser) => anyUser.username === username && anyUser.password === password);
  if (!user) return error('Username or password is incorrect.');
  return {
    id: user.id,
    username: user.username,
    firstName: user.firstName,
    lastName: user.lastName,
    token: 'fake-jwt-token',
  };
};

export const register = (user: IUser) => {
  const users = JSON.parse(localStorage.getItem('TimeTrackingUsers')) || [];
  if (users.find((anyUser) => anyUser.username === user.username)) {
    return error(`Username ${user.username} is already taken.`);
  }
  user.id = Date.now();
  users.push(user);
  localStorage.setItem('users', JSON.stringify(users));
};
