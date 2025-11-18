// api/hooks/useSubscriptionPlans.ts
import { useQuery } from '@tanstack/react-query';
import { api } from '@/api/apiClient';
import { toast } from 'sonner';
import { AxiosError } from 'axios';

interface SubscriptionPlan {
  id: string;
  name: string;
  minimumInvestment: number;
  roiPerMonth: number;
  durationInMonths: number;
  description?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export const useSubscriptionPlans = () => {
  return useQuery<SubscriptionPlan[], AxiosError>({
    queryKey: ['subscriptionPlans'],
    queryFn: async () => {
      const { data } = await api.get('/subscription/all');
      return data.data;
      },
  });
};