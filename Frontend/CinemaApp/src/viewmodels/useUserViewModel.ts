import { useQuery } from '@tanstack/react-query';
import { fetchUserProfile } from '../api/userApi';

export const useUserViewModel = () => {
  const { data: user, isLoading, isError, error } = useQuery({
    queryKey: ['userProfile'],
    queryFn: fetchUserProfile,
  });

  return {
    user,
    isLoading,
    isError,
    error,
  };
};
