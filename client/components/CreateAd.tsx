import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Switch } from "./ui/switch";
import { Badge } from "./ui/badge";
import { Alert, AlertDescription } from "./ui/alert";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import {
  Target,
  DollarSign,
  Calendar,
  Users,
  MapPin,
  Eye,
  CreditCard,
  Gift,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { AdCampaign, PaymentMethod } from "@shared/types";

interface CreateAdProps {
  onCreateCampaign: (
    campaign: Omit<
      AdCampaign,
      "id" | "createdAt" | "impressions" | "clicks" | "spent"
    >,
  ) => Promise<string>;
  onProcessPayment: (
    campaignId: string,
    amount: number,
    method: PaymentMethod,
    phone: string,
  ) => Promise<boolean>;
}

export function CreateAd({
  onCreateCampaign,
  onProcessPayment,
}: CreateAdProps) {
  const [step, setStep] = useState(1);
  const [campaignId, setCampaignId] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPayment, setShowPayment] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    imageUrl: "",
    videoUrl: "",
    targetUrl: "",
    budget: 0,
    duration: 1,
    isFree: false,
    targetAudience: {
      ageMin: 18,
      ageMax: 65,
      gender: "all" as "male" | "female" | "all",
      interests: [] as string[],
      locations: [] as string[],
    },
  });

  const [paymentData, setPaymentData] = useState({
    method: "bkash" as PaymentMethod,
    phone: "",
  });

  const calculateCost = () => {
    if (formData.isFree) return 0;
    // Base cost calculation: $1 per day + $0.1 per 1000 impressions
    const baseCost = formData.duration * 50; // 50 BDT per day
    const audienceFactor = 1; // Could be adjusted based on targeting
    return Math.max(baseCost * audienceFactor, 10); // Minimum 10 BDT
  };

  const handleInputChange = (field: string, value: any) => {
    if (field.startsWith("targetAudience.")) {
      const audienceField = field.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        targetAudience: {
          ...prev.targetAudience,
          [audienceField]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }));
    }
  };

  const handleAddInterest = (interest: string) => {
    if (interest && !formData.targetAudience.interests.includes(interest)) {
      handleInputChange("targetAudience.interests", [
        ...formData.targetAudience.interests,
        interest,
      ]);
    }
  };

  const handleRemoveInterest = (interest: string) => {
    handleInputChange(
      "targetAudience.interests",
      formData.targetAudience.interests.filter((i) => i !== interest),
    );
  };

  const handleCreateCampaign = async () => {
    setIsLoading(true);
    try {
      const campaign = {
        advertiserId: "current-user", // Should be from auth context
        advertiserName: "Current User", // Should be from auth context
        ...formData,
        budget: calculateCost(),
        dailyBudget: calculateCost() / formData.duration,
        status: "pending" as const,
        startDate: new Date().toISOString(),
        endDate: new Date(
          Date.now() + formData.duration * 24 * 60 * 60 * 1000,
        ).toISOString(),
      };

      const newCampaignId = await onCreateCampaign(campaign);
      setCampaignId(newCampaignId);

      if (formData.isFree) {
        setStep(4); // Success step
      } else {
        setStep(3); // Payment step
        setShowPayment(true);
      }
    } catch (error) {
      console.error("Failed to create campaign:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePayment = async () => {
    if (!paymentData.phone) {
      alert("ফোন নম্বার দিন");
      return;
    }

    setIsLoading(true);
    try {
      const success = await onProcessPayment(
        campaignId,
        calculateCost(),
        paymentData.method,
        paymentData.phone,
      );

      if (success) {
        setStep(4); // Success step
        setShowPayment(false);
      }
    } catch (error) {
      console.error("Payment failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setStep(1);
    setCampaignId("");
    setFormData({
      title: "",
      description: "",
      imageUrl: "",
      videoUrl: "",
      targetUrl: "",
      budget: 0,
      duration: 1,
      isFree: false,
      targetAudience: {
        ageMin: 18,
        ageMax: 65,
        gender: "all",
        interests: [],
        locations: [],
      },
    });
    setPaymentData({
      method: "bkash",
      phone: "",
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="h-6 w-6" />
            <span>বিজ্ঞাপন তৈরি করুন</span>
          </CardTitle>
          <CardDescription>
            আপনার পণ্য বা সেবার জন্য কার্যকর বিজ্ঞাপন তৈরি করুন
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Step Indicator */}
      <div className="flex items-center justify-center space-x-4 mb-6">
        {[1, 2, 3, 4].map((stepNum) => (
          <div key={stepNum} className="flex items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step >= stepNum
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-600"
              }`}
            >
              {stepNum}
            </div>
            {stepNum < 4 && (
              <div
                className={`w-16 h-1 mx-2 ${
                  step > stepNum ? "bg-blue-600" : "bg-gray-200"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Step 1: Campaign Details */}
      {step === 1 && (
        <Card>
          <CardHeader>
            <CardTitle>বিজ্ঞাপনের তথ্য</CardTitle>
            <CardDescription>আপনার বিজ্ঞাপনের মূল তথ্য দিন</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="title">বিজ্ঞাপনের শিরোনাম</Label>
              <Input
                id="title"
                placeholder="আকর্ষণীয় শিরোনাম লিখুন"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="description">বিজ্ঞাপনের বিবরণ</Label>
              <Textarea
                id="description"
                placeholder="আপনার পণ্য বা সেবার সংক্ষিপ্ত বিবরণ"
                value={formData.description}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="imageUrl">ছবির লিংক (ঐচ্ছিক)</Label>
                <Input
                  id="imageUrl"
                  placeholder="https://example.com/image.jpg"
                  value={formData.imageUrl}
                  onChange={(e) =>
                    handleInputChange("imageUrl", e.target.value)
                  }
                />
              </div>
              <div>
                <Label htmlFor="videoUrl">ভিডিওর লিংক (ঐচ্ছিক)</Label>
                <Input
                  id="videoUrl"
                  placeholder="https://example.com/video.mp4"
                  value={formData.videoUrl}
                  onChange={(e) =>
                    handleInputChange("videoUrl", e.target.value)
                  }
                />
              </div>
            </div>

            <div>
              <Label htmlFor="targetUrl">ওয়েবসাইট লিংক</Label>
              <Input
                id="targetUrl"
                placeholder="https://yourwebsite.com"
                value={formData.targetUrl}
                onChange={(e) => handleInputChange("targetUrl", e.target.value)}
              />
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                checked={formData.isFree}
                onCheckedChange={(checked) =>
                  handleInputChange("isFree", checked)
                }
              />
              <Label>১ দিনের ফ্রি বিজ্ঞাপন</Label>
              <Badge variant="secondary" className="ml-2">
                <Gift className="h-3 w-3 mr-1" />
                ফ্রি ট্রায়াল
              </Badge>
            </div>

            <Button
              onClick={() => setStep(2)}
              disabled={!formData.title || !formData.description}
              className="w-full"
            >
              পরবর্তী: অডিয়েন্স নির্বাচন
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Step 2: Audience Targeting */}
      {step === 2 && (
        <Card>
          <CardHeader>
            <CardTitle>অডিয়েন্স টার্গেটিং</CardTitle>
            <CardDescription>
              কোন ধরনের মানুষদের কাছে বিজ্ঞাপন পৌঁছাতে চান?
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label>বয়সের সীমা</Label>
              <div className="flex items-center space-x-4 mt-2">
                <div className="flex-1">
                  <Label className="text-sm">ন্যূনতম</Label>
                  <Input
                    type="number"
                    min="13"
                    max="100"
                    value={formData.targetAudience.ageMin}
                    onChange={(e) =>
                      handleInputChange(
                        "targetAudience.ageMin",
                        parseInt(e.target.value),
                      )
                    }
                  />
                </div>
                <div className="flex-1">
                  <Label className="text-sm">সর্বোচ্চ</Label>
                  <Input
                    type="number"
                    min="13"
                    max="100"
                    value={formData.targetAudience.ageMax}
                    onChange={(e) =>
                      handleInputChange(
                        "targetAudience.ageMax",
                        parseInt(e.target.value),
                      )
                    }
                  />
                </div>
              </div>
            </div>

            <div>
              <Label>লিঙ্গ</Label>
              <Select
                value={formData.targetAudience.gender}
                onValueChange={(value) =>
                  handleInputChange("targetAudience.gender", value)
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">সবাই</SelectItem>
                  <SelectItem value="male">পুরুষ</SelectItem>
                  <SelectItem value="female">মহিলা</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>আগ্রহের বিষয়</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {[
                  "টেকনোলজি",
                  "ফ্যাশন",
                  "খেলাধুলা",
                  "ভ্রমণ",
                  "খাবার",
                  "সিনেমা",
                  "সঙ্গীত",
                  "ব্যবসা",
                ].map((interest) => (
                  <Button
                    key={interest}
                    variant={
                      formData.targetAudience.interests.includes(interest)
                        ? "default"
                        : "outline"
                    }
                    size="sm"
                    onClick={() => {
                      if (
                        formData.targetAudience.interests.includes(interest)
                      ) {
                        handleRemoveInterest(interest);
                      } else {
                        handleAddInterest(interest);
                      }
                    }}
                  >
                    {interest}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <Label>সময়কাল (দিন)</Label>
              <Select
                value={formData.duration.toString()}
                onValueChange={(value) =>
                  handleInputChange("duration", parseInt(value))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">১ দিন</SelectItem>
                  <SelectItem value="3">৩ দিন</SelectItem>
                  <SelectItem value="7">৭ দিন</SelectItem>
                  <SelectItem value="14">১৪ দিন</SelectItem>
                  <SelectItem value="30">৩০ দিন</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Cost Calculation */}
            <Card className="bg-blue-50">
              <CardContent className="pt-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <DollarSign className="h-5 w-5 text-blue-600" />
                    <span className="font-medium">আনুমানিক খরচ</span>
                  </div>
                  <div className="text-right">
                    {formData.isFree ? (
                      <Badge className="bg-green-100 text-green-800">
                        ফ্রি
                      </Badge>
                    ) : (
                      <span className="text-2xl font-bold text-blue-600">
                        ৳{calculateCost()}
                      </span>
                    )}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  {formData.duration} দিনের জন্য • প্রতিদিন ৳
                  {Math.round(calculateCost() / formData.duration)}
                </p>
              </CardContent>
            </Card>

            <div className="flex space-x-4">
              <Button
                variant="outline"
                onClick={() => setStep(1)}
                className="flex-1"
              >
                পূর্ববর্তী
              </Button>
              <Button
                onClick={handleCreateCampaign}
                disabled={isLoading}
                className="flex-1"
              >
                {isLoading ? "তৈরি করা হচ্ছে..." : "বিজ্ঞাপন তৈরি করুন"}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 3: Payment */}
      {step === 3 && showPayment && (
        <Dialog open={showPayment} onOpenChange={setShowPayment}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>পেমেন্ট করুন</DialogTitle>
              <DialogDescription>
                বিজ্ঞাপন লাইভ করতে পেমেন্ট সম্পূর্ণ করুন
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <Card className="bg-blue-50">
                <CardContent className="pt-4">
                  <div className="flex justify-between items-center">
                    <span>মোট খরচ:</span>
                    <span className="text-2xl font-bold text-blue-600">
                      ৳{calculateCost()}
                    </span>
                  </div>
                </CardContent>
              </Card>

              <div>
                <Label>পেমেন্ট পদ্ধতি</Label>
                <Select
                  value={paymentData.method}
                  onValueChange={(value: PaymentMethod) =>
                    setPaymentData((prev) => ({ ...prev, method: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bkash">বিকাশ</SelectItem>
                    <SelectItem value="nagad">নগদ</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  পেমেন্ট নম্বর: <strong>01650074073</strong>
                  <br />
                  এই নম্বারে {paymentData.method === "bkash"
                    ? "বিকাশ"
                    : "নগদ"}{" "}
                  এর মাধ্যমে ৳{calculateCost()} টাকা পাঠান এবং আপনার নম্বার নিচে
                  দিন।
                </AlertDescription>
              </Alert>

              <div>
                <Label>
                  আপনার {paymentData.method === "bkash" ? "বিকাশ" : "নগদ"}{" "}
                  নম্বার
                </Label>
                <Input
                  placeholder="01XXXXXXXXX"
                  value={paymentData.phone}
                  onChange={(e) =>
                    setPaymentData((prev) => ({
                      ...prev,
                      phone: e.target.value,
                    }))
                  }
                />
              </div>

              <Button
                onClick={handlePayment}
                disabled={isLoading || !paymentData.phone}
                className="w-full"
              >
                {isLoading ? "যাচাই করা হচ্ছে..." : "পেমেন্ট সম্পূর্ণ করুন"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Step 4: Success */}
      {step === 4 && (
        <Card>
          <CardContent className="pt-6 text-center">
            <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">
              বিজ্ঞাপন সফলভাবে তৈরি হয়েছে!
            </h2>
            <p className="text-muted-foreground mb-6">
              আপনার বিজ্ঞাপন শীঘ্রই লাইভ হবে এবং টার্গেট অডিয়েন্সের কাছে
              পৌঁছাতে শুরু করবে।
            </p>
            <div className="space-y-2">
              <Button onClick={resetForm} className="w-full">
                নতুন বিজ্ঞাপন তৈরি করুন
              </Button>
              <Button
                variant="outline"
                onClick={() => window.location.reload()}
                className="w-full"
              >
                ড্যাশবোর্ডে ফিরে যান
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
