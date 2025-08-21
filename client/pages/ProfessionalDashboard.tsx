import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { ProfessionalMode } from '../components/ProfessionalMode';
import { EarningsDashboard } from '../components/EarningsDashboard';
import { WithdrawalSystem } from '../components/WithdrawalSystem';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';
import { 
  Crown, 
  DollarSign, 
  Download,
  TrendingUp
} from 'lucide-react';

export default function ProfessionalDashboard() {
  const { authState, enableProfessionalMode } = useAuth();
  const { getUserEarnings, requestWithdrawal } = useApp();

  const user = authState.user;
  if (!user) return null;

  const earnings = getUserEarnings(user.id) || {
    userId: user.id,
    totalEarned: 125.50,
    currentBalance: 45.75,
    totalWithdrawn: 79.75,
    isProfessional: user.isProfessional,
    monetizationEnabled: user.monetizationEnabled
  };

  const stats = {
    userId: user.id,
    totalViews: 15420,
    totalImpressions: 890,
    totalRevenue: earnings.totalEarned,
    monthlyViews: 3240,
    monthlyRevenue: 32.50
  };

  const recentImpressions = [
    {
      id: '1',
      campaignId: 'camp-1',
      userId: user.id,
      postId: 'post-1',
      revenue: 0.85,
      viewedAt: new Date().toISOString()
    },
    {
      id: '2',
      campaignId: 'camp-2',
      userId: user.id,
      postId: 'post-2',
      revenue: 1.20,
      viewedAt: new Date(Date.now() - 86400000).toISOString()
    }
  ];

  const withdrawalHistory = [
    {
      id: 'w1',
      userId: user.id,
      amount: 50,
      method: 'bkash' as const,
      phone: '01712345678',
      transactionId: 'TRX123456',
      status: 'completed' as const,
      type: 'withdrawal' as const,
      createdAt: new Date(Date.now() - 7 * 86400000).toISOString(),
      completedAt: new Date(Date.now() - 6 * 86400000).toISOString()
    },
    {
      id: 'w2',
      userId: user.id,
      amount: 30,
      method: 'nagad' as const,
      phone: '01987654321',
      status: 'pending' as const,
      type: 'withdrawal' as const,
      createdAt: new Date(Date.now() - 86400000).toISOString()
    }
  ];

  const handleEnableProfessional = async () => {
    try {
      await enableProfessionalMode(user.id);
    } catch (error) {
      console.error('Failed to enable professional mode:', error);
    }
  };

  const handleToggleMonetization = async () => {
    // This would toggle monetization in the auth context
    console.log('Toggle monetization');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">প্রফেশনাল ড্যাশবোর্ড</h1>
          <p className="text-gray-600">আপনার কন্টেন্ট মনিটাইজেশন পরিচালনা করুন</p>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview" className="flex items-center space-x-2">
              <Crown className="h-4 w-4" />
              <span>প্রফেশনাল মোড</span>
            </TabsTrigger>
            <TabsTrigger value="earnings" className="flex items-center space-x-2">
              <DollarSign className="h-4 w-4" />
              <span>আয়ের হিসাব</span>
            </TabsTrigger>
            <TabsTrigger value="withdrawal" className="flex items-center space-x-2">
              <Download className="h-4 w-4" />
              <span>টাকা উত্তোলন</span>
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center space-x-2">
              <TrendingUp className="h-4 w-4" />
              <span>অ্যানালিটিক্স</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <ProfessionalMode
              user={user}
              onEnableProfessional={handleEnableProfessional}
              onToggleMonetization={handleToggleMonetization}
            />
          </TabsContent>

          <TabsContent value="earnings">
            <EarningsDashboard
              earnings={earnings}
              stats={stats}
              recentImpressions={recentImpressions}
              onRequestWithdrawal={requestWithdrawal}
            />
          </TabsContent>

          <TabsContent value="withdrawal">
            <WithdrawalSystem
              earnings={earnings}
              withdrawalHistory={withdrawalHistory}
              onRequestWithdrawal={requestWithdrawal}
            />
          </TabsContent>

          <TabsContent value="analytics">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Analytics content would go here */}
              <div className="text-center py-12 text-muted-foreground">
                বিস্তারিত অ্যানালিটিক্স শীঘ্রই আসছে...
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
