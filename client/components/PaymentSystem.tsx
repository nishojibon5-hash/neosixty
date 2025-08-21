import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Alert, AlertDescription } from './ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { 
  CreditCard, 
  Smartphone, 
  DollarSign, 
  CheckCircle, 
  AlertCircle,
  Clock,
  Copy,
  ExternalLink
} from 'lucide-react';
import { PaymentMethod, PaymentTransaction } from '@shared/types';

interface PaymentSystemProps {
  amount: number;
  purpose: string;
  onPaymentSuccess: (transactionId: string) => void;
  onPaymentFailure: (error: string) => void;
}

const PAYMENT_RECEIVER = '01650074073';

export function PaymentSystem({ amount, purpose, onPaymentSuccess, onPaymentFailure }: PaymentSystemProps) {
  const [method, setMethod] = useState<PaymentMethod>('bkash');
  const [senderPhone, setSenderPhone] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [step, setStep] = useState(1); // 1: Select method, 2: Payment instructions, 3: Verify

  const handleMethodSelect = (selectedMethod: PaymentMethod) => {
    setMethod(selectedMethod);
    setStep(2);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const handlePaymentSubmit = async () => {
    if (!senderPhone || !transactionId) {
      onPaymentFailure('সকল তথ্য পূরণ করুন');
      return;
    }

    setIsProcessing(true);
    
    try {
      // Simulate payment verification
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In a real implementation, this would verify with the payment gateway
      const success = Math.random() > 0.1; // 90% success rate for demo
      
      if (success) {
        onPaymentSuccess(transactionId);
        setStep(4); // Success step
      } else {
        onPaymentFailure('��েমেন্ট যাচাই করা যায়নি। আবার চেষ্টা করুন।');
      }
    } catch (error) {
      onPaymentFailure('পেমেন্ট প্রক্রিয়ায় সমস্যা হয়েছে');
    } finally {
      setIsProcessing(false);
    }
  };

  const openPaymentApp = () => {
    const phoneNumber = PAYMENT_RECEIVER.replace(/\+88/, '');
    let url = '';
    
    if (method === 'bkash') {
      // bKash app deep link (if available)
      url = `intent://pay?phone=${phoneNumber}&amount=${amount}#Intent;scheme=bkash;package=com.bkash.customerapp;end`;
    } else if (method === 'nagad') {
      // Nagad app deep link (if available)
      url = `intent://pay?phone=${phoneNumber}&amount=${amount}#Intent;scheme=nagad;package=com.konitbd.nagad;end`;
    }
    
    // Fallback to manual instructions if deep links don't work
    window.open(url, '_blank');
  };

  return (
    <div className="max-w-md mx-auto space-y-6">
      {/* Step 1: Payment Method Selection */}
      {step === 1 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <CreditCard className="h-5 w-5" />
              <span>পেমেন্ট পদ্ধতি নির��বাচন করুন</span>
            </CardTitle>
            <CardDescription>
              {purpose} এর জন্য ৳{amount} পেমেন্ট করুন
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Button
                variant="outline"
                className="h-20 flex flex-col items-center space-y-2"
                onClick={() => handleMethodSelect('bkash')}
              >
                <div className="w-8 h-8 bg-pink-600 rounded flex items-center justify-center">
                  <Smartphone className="h-5 w-5 text-white" />
                </div>
                <span>বিকাশ</span>
              </Button>
              
              <Button
                variant="outline"
                className="h-20 flex flex-col items-center space-y-2"
                onClick={() => handleMethodSelect('nagad')}
              >
                <div className="w-8 h-8 bg-orange-600 rounded flex items-center justify-center">
                  <Smartphone className="h-5 w-5 text-white" />
                </div>
                <span>নগদ</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 2: Payment Instructions */}
      {step === 2 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <div className={`w-6 h-6 rounded ${method === 'bkash' ? 'bg-pink-600' : 'bg-orange-600'} flex items-center justify-center`}>
                <Smartphone className="h-4 w-4 text-white" />
              </div>
              <span>{method === 'bkash' ? 'বিকাশ' : 'নগদ'} পেমেন্ট</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Amount Display */}
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-sm text-muted-foreground mb-1">পেমেন্ট পরিমাণ</div>
              <div className="text-3xl font-bold text-blue-600">৳{amount}</div>
            </div>

            {/* Payment Instructions */}
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                <div className="space-y-2">
                  <p className="font-semibold">পেমেন্ট করার নিয়ম:</p>
                  <ol className="list-decimal list-inside space-y-1 text-sm">
                    <li>{method === 'bkash' ? 'বিকাশ' : 'নগদ'} অ্যাপ খুলুন</li>
                    <li>"Send Money" অপশনে ক্লিক করুন</li>
                    <li>নিচের নম্বারে টাকা পাঠান</li>
                    <li>Transaction ID সংরক্ষণ করুন</li>
                  </ol>
                </div>
              </AlertDescription>
            </Alert>

            {/* Receiver Information */}
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <div className="text-sm text-muted-foreground">প্রাপকের নম্বার</div>
                  <div className="font-mono text-lg font-semibold">{PAYMENT_RECEIVER}</div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(PAYMENT_RECEIVER)}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <div className="text-sm text-muted-foreground">পরিমাণ</div>
                  <div className="font-mono text-lg font-semibold">৳{amount}</div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(amount.toString())}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Quick Action Button */}
            <Button onClick={openPaymentApp} className="w-full" size="lg">
              <ExternalLink className="mr-2 h-4 w-4" />
              {method === 'bkash' ? 'বিকাশ' : 'নগদ'} অ্যাপে যান
            </Button>

            <Button 
              variant="outline" 
              onClick={() => setStep(3)} 
              className="w-full"
            >
              পেমেন্ট সম্পন্ন হয়েছে
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Step 3: Payment Verification */}
      {step === 3 && (
        <Card>
          <CardHeader>
            <CardTitle>পেমেন্ট যাচাই করুন</CardTitle>
            <CardDescription>
              আপনার পেমেন্টের তথ্য দিয়ে যাচাই করুন
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="senderPhone">আপনার {method === 'bkash' ? 'বিকাশ' : 'নগদ'} নম্বার</Label>
              <Input
                id="senderPhone"
                placeholder="01XXXXXXXXX"
                value={senderPhone}
                onChange={(e) => setSenderPhone(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="transactionId">Transaction ID</Label>
              <Input
                id="transactionId"
                placeholder="TRX123456789"
                value={transactionId}
                onChange={(e) => setTransactionId(e.target.value)}
              />
            </div>

            <Alert>
              <Clock className="h-4 w-4" />
              <AlertDescription>
                Transaction ID পেতে আপনার {method === 'bkash' ? 'বিকাশ' : 'নগদ'} এ পাঠানো SMS চেক করুন
              </AlertDescription>
            </Alert>

            <div className="flex space-x-3">
              <Button 
                variant="outline" 
                onClick={() => setStep(2)}
                className="flex-1"
              >
                পূর্ববর্তী
              </Button>
              <Button 
                onClick={handlePaymentSubmit}
                disabled={isProcessing || !senderPhone || !transactionId}
                className="flex-1"
              >
                {isProcessing ? (
                  <>
                    <Clock className="mr-2 h-4 w-4 animate-spin" />
                    যাচাই করা হচ্ছে...
                  </>
                ) : (
                  'পেমেন্ট যাচাই করুন'
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 4: Success */}
      {step === 4 && (
        <Card>
          <CardContent className="pt-6 text-center">
            <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">পেমেন্ট সফল!</h2>
            <p className="text-muted-foreground mb-4">
              আপনার পেমেন্ট সফলভাবে সম্পন্ন হয়েছে।
            </p>
            <Badge variant="secondary" className="mb-4">
              Transaction ID: {transactionId}
            </Badge>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

// Standalone Payment Dialog Component
interface PaymentDialogProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
  purpose: string;
  onSuccess: (transactionId: string) => void;
}

export function PaymentDialog({ isOpen, onClose, amount, purpose, onSuccess }: PaymentDialogProps) {
  const handlePaymentSuccess = (transactionId: string) => {
    onSuccess(transactionId);
    onClose();
  };

  const handlePaymentFailure = (error: string) => {
    alert(error);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>পেমেন্ট করুন</DialogTitle>
          <DialogDescription>{purpose}</DialogDescription>
        </DialogHeader>
        <PaymentSystem
          amount={amount}
          purpose={purpose}
          onPaymentSuccess={handlePaymentSuccess}
          onPaymentFailure={handlePaymentFailure}
        />
      </DialogContent>
    </Dialog>
  );
}
