import { useQuery } from '@tanstack/react-query';
import { fetchUserProfile, fetchUserTickets } from '../api/userApi';
import { useAuth } from '../context/AuthContext';

export const useUserViewModel = () => {
  const { token } = useAuth();

  const { 
    data: user, 
    isLoading: isUserLoading, 
    isError: isUserError, 
    error: userError 
  } = useQuery({
    queryKey: ['userProfile', token],
    queryFn: () => fetchUserProfile(token!),
    enabled: !!token,
  });

  const {
    data: tickets,
    isLoading: isTicketsLoading,
    isError: isTicketsError,
    error: ticketsError,
  } = useQuery({
    queryKey: ['userTickets', token],
    queryFn: () => fetchUserTickets(token!),
    enabled: !!token,
  });

  return {
    user,
    tickets,
    isLoading: isUserLoading || isTicketsLoading,
    isError: isUserError || isTicketsError,
    error: userError || ticketsError,
  };
};
