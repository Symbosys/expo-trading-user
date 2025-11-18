// api/hooks/useWithdrawals.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/api/apiClient';
import { getAuth } from '@/hooks/auth';
import { toast } from 'sonner';
import { AxiosError } from 'axios';
import { ErrorMessage } from '@/utils/utils';

interface CreateWithdrawalData {
  amount: number;
  destinationAddress: string;
}

interface Withdrawal {
  id: string;
  userId: string;
  amount: number;
  destinationAddress: string;
  status: string;
  processedAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

export const useUserWithdrawals = () => {
  const { userId } = getAuth();
  const queryClient = useQueryClient();

  return useQuery<Withdrawal[], AxiosError>({
    queryKey: ['withdrawals', userId],
    queryFn: async () => {
      const { data } = await api.get(`/withdraw/user/${userId}`);
      return data.data;
    },
    enabled: !!userId,
  });
};

export const useCreateWithdrawal = () => {
  const { userId } = getAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (withdrawalData: CreateWithdrawalData) => {
      const { data } = await api.post('/withdraw/create', {
        userId,
        ...withdrawalData,
      });
      return data.data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['withdrawals', userId], (old: Withdrawal[] | undefined) => [...(old || []), data]);
      toast.success('Withdrawal request submitted successfully!');
    },
    onError: (error) => {
     ErrorMessage(error)
    },
  });
};