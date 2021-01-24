import { IUser } from 'entities/user-entities';
import { TUserLogin } from 'Store/user/types';

export const loginLocal = (userData: TUserLogin): Promise<unknown> => {
  const localUsersJSON = String(localStorage.getItem('TimeTrackingUsers'));
  const localUsers = JSON.parse(localUsersJSON) as IUser[];
  const user: IUser | undefined = localUsers.find(
    (anyUser) => anyUser.username === userData.username && anyUser.password === userData.password,
  );
  if (!user) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        reject('Username or password is incorrect.');
      }, 0);
    });
  }
  return new Promise((resolve) => {
    setTimeout(() => {
      const textResponse = JSON.stringify({ user: userData });
      const myBody = new Blob([textResponse]);
      const myResponse = new Response(myBody);
      resolve(myResponse);
    }, 0);
  });
};

export const registerLocal = (newUser: IUser): Promise<unknown> => {
  const localUsers = localStorage.getItem('TimeTrackingUsers');
  if (localUsers) {
    const data = JSON.parse(localUsers) as IUser[];
    if (data.find((anyUser) => anyUser.username === newUser.username)) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          reject(`Username ${newUser.username} is already taken.`);
        }, 0);
      });
    }
    data.push(newUser);
    localStorage.setItem('TimeTrackingUsers', JSON.stringify(data));
    return new Promise((resolve) => {
      setTimeout(() => {
        const textResponse = JSON.stringify({ user: newUser });
        const myBody = new Blob([textResponse]);
        const myResponse = new Response(myBody);
        resolve(myResponse);
      }, 0);
    });
  }
  const users = [];
  users.push(newUser);
  localStorage.setItem('TimeTrackingUsers', JSON.stringify(users));
  return new Promise((resolve) => {
    setTimeout(() => {
      const textResponse = JSON.stringify({ user: newUser });
      const myBody = new Blob([textResponse]);
      const myResponse = new Response(myBody);
      resolve(myResponse);
    }, 0);
  });
};
