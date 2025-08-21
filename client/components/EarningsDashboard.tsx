import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Alert, AlertDescription } from './ui/alert';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { 
  DollarSign, 
  TrendingUp, 
  Eye, 
  Video, 
  Image, 
  FileText,
  Calendar,
  Wallet,
  Download,
  CreditCard,
  BarChart3,
  Target,
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { UserEarnings, ContentCreatorStats, AdImpression, PaymentMethod } from '@shared/types';
import { PaymentDialog } from './PaymentSystem';

interface EarningsDashboardProps {
  earnings: UserEarnings;
  stats: ContentCreatorStats;
  recentImpressions: AdImpression[];
  onRequestWithdrawal: (amount: number, method: PaymentMethod, phone: string) => Promise<boolean>;
}

export function EarningsDashboard({ 
  earnings, 
  stats, 
  recentImpressions, 
  onRequestWithdrawal 
}: EarningsDashboardProps) {
  const [withdrawalAmount, setWithdrawalAmount] = useState(30);
  const [showWithdrawalDialog, setShowWithdrawalDialog] = useState(false);
  const [isProcessingWithdrawal, setIsProcessingWithdrawal] = useState(false);

  const canWithdraw = earnings.currentBalance >= 30;
  const withdrawalProgress = (earnings.currentBalance / 30) * 100;

  const handleWithdrawal = async (method: PaymentMethod, phone: string) => {
    setIsProcessingWithdrawal(true);
    try {
      const success = await onRequestWithdrawal(withdrawalAmount, method, phone);
      if (success) {
        setShowWithdrawalDialog(false);
        setWithdrawalAmount(30);
      }
    } catch (error) {
      console.error('Withdrawal failed:', error);
    } finally {
      setIsProcessingWithdrawal(false);
    }
  };

  const formatCurrency = (amount: number) => `$${amount.toFixed(2)}`;

  const thisMonthRevenue = stats.monthlyRevenue || 0;
  const lastMonthRevenue = thisMonthRevenue * 0.8; // Simulated data
  const revenueGrowth = ((thisMonthRevenue - lastMonthRevenue) / lastMonthRevenue) * 100;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">আয়ের ড্যাশবোর্ড</h1>
          <p className="text-muted-foreground">আপনার মনিটাইজেশন পারফরম্যান্স ট্র্যাক করুন</p>
        </div>
        <Badge 
          variant={earnings.monetizationEnabled ? "default" : "secondary"}
          className="text-sm py-1 px-3"
        >
          {earnings.monetizationEnabled ? 'মনিটাইজেশন চালু' : 'মনিটাইজেশন বন্ধ'}
        </Badge>
      </div>

      {/* Main Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">বর্তমান ব্যালেন্স</CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {formatCurrency(earnings.currentBalance)}
            </div>
            <p className="text-xs text-muted-foreground">
              উত্তোলনযোগ্য
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">মোট আয়</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(earnings.totalEarned)}
            </div>
            <p className="text-xs text-muted-foreground">
              সর্বমোট আয়
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">এই মাসে</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(thisMonthRevenue)}
            </div>
            <p className="text-xs text-muted-foreground">
              {revenueGrowth > 0 ? '+' : ''}{revenueGrowth.toFixed(1)}% গত মাস থেকে
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">মোট ভিউ</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats.totalViews.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              {stats.monthlyViews.toLocaleString()} এই মাসে
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Withdrawal Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Download className="h-5 w-5" />
            <span>টাকা উত্তোলন</span>
          </CardTitle>
          <CardDescription>
            ন্যূনতম $৩০ হলে আপনি আপনার আয় উত্তোলন করতে পারবেন
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>উত্তোলনের জন্য প্রয়োজন</span>
              <span>{formatCurrency(Math.max(0, 30 - earnings.currentBalance))}</span>
            </div>
            <Progress value={Math.min(withdrawalProgress, 100)} className="h-2" />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>{formatCurrency(earnings.currentBalance)}</span>
              <span>$30.00</span>
            </div>
          </div>

          {canWithdraw ? (
            <Dialog>
              <DialogTrigger asChild>
                <Button className="w-full">
                  <Download className="mr-2 h-4 w-4" />
                  টাকা উত্তোলন করুন
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>টাকা উত্তোলন</DialogTitle>
                  <DialogDescription>
                    আপনার আয় বিকাশ বা নগদের মাধ্যমে উত্তোলন করুন
                  </DialogDescription>
                </DialogHeader>
                
                <PaymentDialog
                  isOpen={showWithdrawalDialog}
                  onClose={() => setShowWithdrawalDialog(false)}
                  amount={withdrawalAmount}
                  purpose="আয় উত্তোলন"
                  onSuccess={(transactionId) => {
                    // Handle successful withdrawal
                    console.log('Withdrawal successful:', transactionId);
                  }}
                />
                
                <div className="space-y-4">
                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      উত্তোলনের অনুরোধ ২৪ ঘন্টার মধ্যে প্রক্রিয়া করা হবে
                    </AlertDescription>
                  </Alert>
                  
                  <Button 
                    onClick={() => setShowWithdrawalDialog(true)}
                    disabled={isProcessingWithdrawal}
                    className="w-full"
                  >
                    {isProcessingWithdrawal ? 'প্রক্রিয়া করা হচ্ছে...' : 'উত্তোলনের অনুরোধ করুন'}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          ) : (
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                উত্তোলনের জন্য আরও {formatCurrency(30 - earnings.currentBalance)} আয় করুন
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Detailed Analytics */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">সারসংক্ষেপ</TabsTrigger>
          <TabsTrigger value="impressions">বিজ্ঞাপন ইমপ্রেশন</TabsTrigger>
          <TabsTrigger value="content">কন্টেন্ট পারফরম্যান্স</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>আয়ের ইতিহাস</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                    <div>
                      <p className="font-medium">মোট আয়</p>
                      <p className="text-2xl font-bold text-green-600">
                        {formatCurrency(earnings.totalEarned)}
                      </p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-green-600" />
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                    <div>
                      <p className="font-medium">মোট উত্তোলন</p>
                      <p className="text-2xl font-bold text-blue-600">
                        {formatCurrency(earnings.totalWithdrawn)}
                      </p>
                    </div>
                    <Download className="h-8 w-8 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>কন্টেন্ট পারফরম্যান্স</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Video className="h-5 w-5 text-red-500" />
                      <span>ভিডিও ভিউ</span>
                    </div>
                    <span className="font-bold">{(stats.totalViews * 0.6).toLocaleString()}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Image className="h-5 w-5 text-blue-500" />
                      <span>ছবি ভিউ</span>
                    </div>
                    <span className="font-bold">{(stats.totalViews * 0.3).toLocaleString()}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <FileText className="h-5 w-5 text-green-500" />
                      <span>পোস্ট ভিউ</span>
                    </div>
                    <span className="font-bold">{(stats.totalViews * 0.1).toLocaleString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="impressions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>সাম্প্রতিক বিজ্ঞাপন ইমপ্রেশন</CardTitle>
              <CardDescription>
                আপনার কন্টেন্টে দেখানো বিজ্ঞাপন থেকে আয়
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentImpressions.length > 0 ? (
                  recentImpressions.slice(0, 5).map((impression, index) => (
                    <div key={impression.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <Target className="h-4 w-4 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium">বিজ্ঞাপন ইমপ্রেশন</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(impression.viewedAt).toLocaleDateString('bn-BD')}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-green-600">
                          {formatCurrency(impression.revenue)}
                        </p>
                        <p className="text-xs text-muted-foreground">আয়</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <Target className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                    <p className="text-muted-foreground">এখনো কোনো বিজ্ঞাপন ইমপ্রেশন নেই</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="content" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Video className="h-5 w-5 text-red-500" />
                  <span>ভিডিও</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold mb-1">
                  {(stats.totalViews * 0.6).toLocaleString()}
                </div>
                <p className="text-sm text-muted-foreground">মোট ভিউ</p>
                <div className="mt-2">
                  <div className="text-lg font-semibold text-green-600">
                    {formatCurrency(stats.totalRevenue * 0.7)}
                  </div>
                  <p className="text-xs text-muted-foreground">আয়</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Image className="h-5 w-5 text-blue-500" />
                  <span>ছবি</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold mb-1">
                  {(stats.totalViews * 0.3).toLocaleString()}
                </div>
                <p className="text-sm text-muted-foreground">মোট ভিউ</p>
                <div className="mt-2">
                  <div className="text-lg font-semibold text-green-600">
                    {formatCurrency(stats.totalRevenue * 0.2)}
                  </div>
                  <p className="text-xs text-muted-foreground">আয়</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="h-5 w-5 text-green-500" />
                  <span>পোস্ট</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold mb-1">
                  {(stats.totalViews * 0.1).toLocaleString()}
                </div>
                <p className="text-sm text-muted-foreground">মোট ভিউ</p>
                <div className="mt-2">
                  <div className="text-lg font-semibold text-green-600">
                    {formatCurrency(stats.totalRevenue * 0.1)}
                  </div>
                  <p className="text-xs text-muted-foreground">আয়</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
