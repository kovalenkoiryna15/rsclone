export interface IFirebaseState {
  isLoading: boolean;
}

export interface FirebaseData<T> {
  [key: string]: Omit<T, 'id'>;
}
