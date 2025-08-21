import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Switch } from './ui/switch';
import { Alert, AlertDescription } from './ui/alert';
import { 
  Crown, 
  DollarSign, 
  Users, 
  TrendingUp, 
  Video, 
  Image, 
  FileText,
  Eye,
  Wallet,
  CheckCircle,
  Info
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { User, UserEarnings } from '@shared/types';

interface ProfessionalModeProps {
  user: User;
  onEnableProfessional: () => void;
  onToggleMonetization: () => void;
}

export function ProfessionalMode({ user, onEnableProfessional, onToggleMonetization }: ProfessionalModeProps) {
  const { authState } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const isEligible = user.followerCount >= 1000;
  const isProfessional = user.isProfessional;
  const monetizationEnabled = user.monetizationEnabled;

  const handleEnableProfessional = async () => {
    if (!isEligible) return;
    
    setIsLoading(true);
    try {
      await onEnableProfessional();
    } catch (error) {
      console.error('Failed to enable professional mode:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const earnings: UserEarnings = user.earnings || {
    userId: user.id,
    totalEarned: 0,
    currentBalance: 0,
    totalWithdrawn: 0,
    isProfessional: false,
    monetizationEnabled: false
  };

  return (
    <div className="space-y-6">
      {/* Professional Mode Status */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Crown className="h-6 w-6 text-yellow-600" />
              <CardTitle>প্রফেশনাল মোড</CardTitle>
              {isProfessional && (
                <Badge className="bg-yellow-100 text-yellow-800">
                  <Crown className="h-3 w-3 mr-1" />
                  প্রফেশনাল
                </Badge>
              )}
            </div>
          </div>
          <CardDescription>
            আপনার কন্টেন্ট থেকে আয় করার জন্য প্রফেশনাল মোড চালু করুন
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Eligibility Check */}
          <div className="p-4 bg-muted rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5" />
                <span className="font-medium">ফলোয়ার প্রয়োজনীয়তা</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-lg font-bold">{user.followerCount.toLocaleString()}</span>
                <span className="text-muted-foreground">/ ১,০০০</span>
                {isEligible && <CheckCircle className="h-5 w-5 text-green-600" />}
              </div>
            </div>
            
            {!isEligible && (
              <Alert>
                <Info className="h-4 w-4" />
                <AlertDescription>
                  প্রফেশন��ল মোড চালু করতে আপনার কমপক্ষে ১,০০০ ফলোয়ার প্রয়োজন। 
                  বর্তমানে আপনার {1000 - user.followerCount} ফলোয়ার বেশি প্রয়োজন।
                </AlertDescription>
              </Alert>
            )}
          </div>

          {/* Professional Mode Toggle */}
          {isEligible && !isProfessional && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">প্রফেশনাল মোড সক্রিয় করুন</h3>
              <p className="text-muted-foreground">
                প্রফেশনাল মোড চালু করলে আপনি আপনার ভিডিও, ছবি, স্টোরি এবং পোস্ট থেকে আয় করতে পারবেন।
              </p>
              <Button 
                onClick={handleEnableProfessional}
                disabled={isLoading}
                className="w-full"
              >
                {isLoading ? 'সক্রিয় করা হচ্ছে...' : 'প্রফেশনাল মোড চালু করুন'}
              </Button>
            </div>
          )}

          {/* Monetization Controls */}
          {isProfessional && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">মনিটাইজেশন</h3>
                  <p className="text-sm text-muted-foreground">
                    আপনার কন্টেন্টে বিজ্ঞাপন দেখানো হবে
                  </p>
                </div>
                <Switch
                  checked={monetizationEnabled}
                  onCheckedChange={onToggleMonetization}
                />
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Earnings Dashboard */}
      {isProfessional && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <DollarSign className="h-5 w-5" />
              <span>আয়ের হিসাব</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-green-50 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Wallet className="h-5 w-5 text-green-600" />
                  <span className="font-medium">বর্তমান ব্যালেন্স</span>
                </div>
                <p className="text-2xl font-bold text-green-600">
                  ${earnings.currentBalance.toFixed(2)}
                </p>
              </div>
              
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <TrendingUp className="h-5 w-5 text-blue-600" />
                  <span className="font-medium">মোট আয়</span>
                </div>
                <p className="text-2xl font-bold text-blue-600">
                  ${earnings.totalEarned.toFixed(2)}
                </p>
              </div>
            </div>

            <div className="mt-4 p-4 bg-yellow-50 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Info className="h-5 w-5 text-yellow-600" />
                <span className="font-medium">উত্তোলনের শর্ত</span>
              </div>
              <p className="text-sm text-muted-foreground">
                ন্যূনতম $৩০ হলে আপনি আপনার আয় উত��তোলন করতে পারবেন।
              </p>
              {earnings.currentBalance >= 30 && (
                <Button className="mt-2" size="sm">
                  টাকা উত্তোলন করুন
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Monetization Features */}
      {isProfessional && (
        <Card>
          <CardHeader>
            <CardTitle>মনিটাইজেশন ফিচার</CardTitle>
            <CardDescription>
              যে ধরনের কন্টেন্ট থেকে আয় করতে পারবেন
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-3 p-3 border rounded-lg">
                <Video className="h-6 w-6 text-red-500" />
                <div>
                  <h4 className="font-medium">ভিডিও</h4>
                  <p className="text-sm text-muted-foreground">অটো বিজ্ঞাপন</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-3 border rounded-lg">
                <Image className="h-6 w-6 text-blue-500" />
                <div>
                  <h4 className="font-medium">ছবি</h4>
                  <p className="text-sm text-muted-foreground">স্পন্সর কন্টেন্ট</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-3 border rounded-lg">
                <Eye className="h-6 w-6 text-purple-500" />
                <div>
                  <h4 className="font-medium">স্টোরি</h4>
                  <p className="text-sm text-muted-foreground">স্টোরি বিজ্ঞাপন</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-3 border rounded-lg">
                <FileText className="h-6 w-6 text-green-500" />
                <div>
                  <h4 className="font-medium">টেক্সট</h4>
                  <p className="text-sm text-muted-foreground">প্রমোটেড পোস্ট</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
