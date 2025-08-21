import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Alert, AlertDescription } from './ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';
import { 
  Wallet, 
  Download, 
  CreditCard, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  DollarSign,
  Smartphone,
  History,
  RefreshCw
} from 'lucide-react';
import { PaymentMethod, PaymentTransaction, UserEarnings } from '@shared/types';

interface WithdrawalSystemProps {
  earnings: UserEarnings;
  withdrawalHistory: PaymentTransaction[];
  onRequestWithdrawal: (amount: number, method: PaymentMethod, phone: string) => Promise<boolean>;
}

export function WithdrawalSystem({ 
  earnings, 
  withdrawalHistory, 
  onRequestWithdrawal 
}: WithdrawalSystemProps) {
  const [withdrawalAmount, setWithdrawalAmount] = useState(30);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('bkash');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const MINIMUM_WITHDRAWAL = 30;
  const canWithdraw = earnings.currentBalance >= MINIMUM_WITHDRAWAL;
  const withdrawalProgress = Math.min((earnings.currentBalance / MINIMUM_WITHDRAWAL) * 100, 100);

  const handleWithdrawal = async () => {
    if (!phoneNumber || withdrawalAmount < MINIMUM_WITHDRAWAL) {
      return;
    }

    setIsProcessing(true);
    try {
      const success = await onRequestWithdrawal(withdrawalAmount, paymentMethod, phoneNumber);
      if (success) {
        setShowSuccess(true);
        setWithdrawalAmount(MINIMUM_WITHDRAWAL);
        setPhoneNumber('');
        setTimeout(() => setShowSuccess(false), 5000);
      }
    } catch (error) {
      console.error('Withdrawal failed:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const formatCurrency = (amount: number) => `$${amount.toFixed(2)}`;
  const pendingWithdrawals = withdrawalHistory.filter(w => w.status === 'pending');
  const completedWithdrawals = withdrawalHistory.filter(w => w.status === 'completed');

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Wallet className="h-6 w-6" />
            <span>টাকা উত্তোলন</span>
          </CardTitle>
          <CardDescription>
            আপনার আয় বিকাশ বা নগদের মাধ্যমে উত্তোলন করুন
          </CardDescription>
        </CardHeader>
      </Card>

      <Tabs defaultValue="withdraw" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="withdraw">উত্তোলন করুন</TabsTrigger>
          <TabsTrigger value="history">উত্তোলনের ইতিহাস</TabsTrigger>
        </TabsList>

        {/* Withdrawal Tab */}
        <TabsContent value="withdraw" className="space-y-6">
          {/* Balance Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">বর্তমান ব্যালেন্স</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  {formatCurrency(earnings.currentBalance)}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  উত্তোলনযোগ্য
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">মোট উত্তোলন</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">
                  {formatCurrency(earnings.totalWithdrawn)}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  সর্বমোট
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">অপেক্ষমাণ</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-600">
                  {pendingWithdrawals.length}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  অনুরোধ
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Withdrawal Eligibility */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">উত্তোলনের যোগ্যতা</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>ন্যূনতম উত্তোলন: ${MINIMUM_WITHDRAWAL}</span>
                  <span className={canWithdraw ? "text-green-600" : "text-red-600"}>
                    {canWithdraw ? 'যোগ্য' : 'অযোগ্য'}
                  </span>
                </div>
                <Progress value={withdrawalProgress} className="h-2" />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{formatCurrency(earnings.currentBalance)}</span>
                  <span>${MINIMUM_WITHDRAWAL}</span>
                </div>
              </div>

              {!canWithdraw && (
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    উত্তোলনের জন্য আরও {formatCurrency(MINIMUM_WITHDRAWAL - earnings.currentBalance)} আয় করুন।
                    আপনার কন্টেন্টে আরও বিজ্ঞাপন দেখানো হলে আয় বাড়বে।
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>

          {/* Withdrawal Form */}
          {canWithdraw && (
            <Card>
              <CardHeader>
                <CardTitle>উত্তোলনের অনুরোধ</CardTitle>
                <CardDescription>
                  আপনার তথ্য দিয়ে উত্তোলনের অনুরোধ করুন
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {showSuccess && (
                  <Alert className="border-green-200 bg-green-50">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <AlertDescription className="text-green-800">
                      উত্তোলনের অনুরোধ সফলভাবে জমা দেওয়া হয়েছে! ২ৄ-৪৮ ঘন্টার মধ্যে প্রক্রিয়া করা হবে।
                    </AlertDescription>
                  </Alert>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="amount">উত্তোলনের পরিমাণ (USD)</Label>
                      <Input
                        id="amount"
                        type="number"
                        min={MINIMUM_WITHDRAWAL}
                        max={earnings.currentBalance}
                        value={withdrawalAmount}
                        onChange={(e) => setWithdrawalAmount(parseFloat(e.target.value) || 0)}
                        placeholder={`ন্যূনতম $${MINIMUM_WITHDRAWAL}`}
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        সর্বোচ্চ: {formatCurrency(earnings.currentBalance)}
                      </p>
                    </div>

                    <div>
                      <Label>পেমেন্ট পদ্ধতি</Label>
                      <Select value={paymentMethod} onValueChange={(value: PaymentMethod) => setPaymentMethod(value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="bkash">
                            <div className="flex items-center space-x-2">
                              <Smartphone className="h-4 w-4" />
                              <span>বিকাশ</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="nagad">
                            <div className="flex items-center space-x-2">
                              <Smartphone className="h-4 w-4" />
                              <span>নগদ</span>
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="phone">
                        {paymentMethod === 'bkash' ? 'বিকাশ' : 'নগদ'} নম্বার
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="01XXXXXXXXX"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    {/* Preview */}
                    <Card className="bg-blue-50">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-sm">উত্তোলনের বিবরণ</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <div className="flex justify-between">
                          <span>পরিমাণ:</span>
                          <span className="font-semibold">{formatCurrency(withdrawalAmount)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>পদ্ধতি:</span>
                          <span className="font-semibold capitalize">{paymentMethod}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>ফি:</span>
                          <span className="font-semibold">$0.00</span>
                        </div>
                        <hr className="my-2" />
                        <div className="flex justify-between">
                          <span className="font-semibold">প্রাপ্য:</span>
                          <span className="font-bold text-green-600">
                            {formatCurrency(withdrawalAmount)}
                          </span>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Terms */}
                    <Alert>
                      <Clock className="h-4 w-4" />
                      <AlertDescription>
                        <ul className="text-sm space-y-1">
                          <li>• উত্তোলনের অনুরোধ ২ৄ-৪৮ ঘন্টার মধ্যে প্রক্রিয়া করা হবে</li>
                          <li>• সর্বনিম্ন উত্তোলন ${MINIMUM_WITHDRAWAL}</li>
                          <li>• কোনো লুকানো ফি নেই</li>
                          <li>• সঠিক নম্বার দিন</li>
                        </ul>
                      </AlertDescription>
                    </Alert>
                  </div>
                </div>

                <Button
                  onClick={handleWithdrawal}
                  disabled={
                    isProcessing || 
                    withdrawalAmount < MINIMUM_WITHDRAWAL || 
                    withdrawalAmount > earnings.currentBalance ||
                    !phoneNumber
                  }
                  className="w-full"
                  size="lg"
                >
                  {isProcessing ? (
                    <>
                      <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                      প্রক্রিয়া করা হচ্ছে...
                    </>
                  ) : (
                    <>
                      <Download className="mr-2 h-4 w-4" />
                      {formatCurrency(withdrawalAmount)} উত্তোলনের অনুরোধ করুন
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* History Tab */}
        <TabsContent value="history" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <History className="h-5 w-5" />
                <span>উত্তোলনের ইতিহাস</span>
              </CardTitle>
              <CardDescription>
                আপনার সকল উত্তোলনের রেকর্ড
              </CardDescription>
            </CardHeader>
            <CardContent>
              {withdrawalHistory.length > 0 ? (
                <div className="space-y-4">
                  {withdrawalHistory.map((transaction) => (
                    <div 
                      key={transaction.id} 
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div className="flex items-center space-x-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          transaction.status === 'completed' ? 'bg-green-100' :
                          transaction.status === 'pending' ? 'bg-yellow-100' :
                          'bg-red-100'
                        }`}>
                          {transaction.status === 'completed' ? (
                            <CheckCircle className="h-5 w-5 text-green-600" />
                          ) : transaction.status === 'pending' ? (
                            <Clock className="h-5 w-5 text-yellow-600" />
                          ) : (
                            <AlertCircle className="h-5 w-5 text-red-600" />
                          )}
                        </div>
                        
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="font-semibold">
                              {formatCurrency(transaction.amount)}
                            </span>
                            <Badge 
                              variant={
                                transaction.status === 'completed' ? 'default' :
                                transaction.status === 'pending' ? 'secondary' :
                                'destructive'
                              }
                              className="text-xs"
                            >
                              {transaction.status === 'completed' ? 'সম্পন্ন' :
                               transaction.status === 'pending' ? 'অপেক্ষমাণ' : 'ব্যর্থ'}
                            </Badge>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {transaction.method.toUpperCase()} • {transaction.phone}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {new Date(transaction.createdAt).toLocaleDateString('bn-BD')}
                          </div>
                        </div>
                      </div>

                      {transaction.transactionId && (
                        <div className="text-right">
                          <div className="text-xs text-muted-foreground">Transaction ID</div>
                          <div className="font-mono text-sm">{transaction.transactionId}</div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <History className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                  <p className="text-muted-foreground">এখনো কোনো উত্তোলনের ইতিহাস নেই</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
