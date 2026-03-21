import { HomeData } from '../models/HomeData';

const MOCK_HOME_DATA: HomeData = {
  title: 'Welcome to CinemaApp!',
  subtitle: 'Explore the latest movies and manage your account.',
  featuredMoviesCount: 3,
};

export const fetchHomeData = async (): Promise<HomeData> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(MOCK_HOME_DATA);
    }, 1000);
  });
};
