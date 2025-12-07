import { useQuery } from '@tanstack/react-query';
import { api } from '@/api/apiClient';
import { AxiosError } from 'axios';

interface QrCodeData {
  id: string;
    qrCodeUrl?: {
      public_id: string;
      secure_url: string;
    }; 
  wallentaddress?: string;
  createdAt: Date;
  updatedAt: Date;
}

export const useQrCode = () => {
  return useQuery<QrCodeData, AxiosError>({
    queryKey: ['qrCode'],
    queryFn: async () => {
      const { data } = await api.get('/qr-code/get');
      return data.data;
      },
      staleTime: 5 * 60 * 1000,
  });
};