import React from 'react';
import { CreateAd } from '../components/CreateAd';
import { useApp } from '../context/AppContext';
import { AdCampaign, PaymentMethod } from '@shared/types';

export default function CreateAds() {
  const { createAdCampaign, processPayment } = useApp();

  const handleCreateCampaign = async (campaign: Omit<AdCampaign, 'id' | 'createdAt' | 'impressions' | 'clicks' | 'spent'>): Promise<string> => {
    try {
      return await createAdCampaign(campaign);
    } catch (error) {
      console.error('Failed to create campaign:', error);
      throw error;
    }
  };

  const handleProcessPayment = async (campaignId: string, amount: number, method: PaymentMethod, phone: string): Promise<boolean> => {
    try {
      return await processPayment({
        userId: 'current-user', // Should be from auth context
        amount,
        method,
        phone,
        status: 'pending',
        type: 'ad_payment',
        campaignId
      });
    } catch (error) {
      console.error('Payment processing failed:', error);
      throw error;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <CreateAd
          onCreateCampaign={handleCreateCampaign}
          onProcessPayment={handleProcessPayment}
        />
      </div>
    </div>
  );
}
