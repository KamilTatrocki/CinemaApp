import { User } from '../models/User';

const MOCK_USER: User = {
  id: '1',
  name: 'John Doe',
  email: 'john.doe@example.com',
  avatarUrl: 'https://i.pravatar.cc/150?u=1',
};

export const fetchUserProfile = async (): Promise<User> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(MOCK_USER);
    }, 1000);
  });
};
