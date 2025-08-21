import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Label } from '../components/ui/label';
import { Alert, AlertDescription } from '../components/ui/alert';
import { Loader2, UserPlus, User, Phone, Lock, Mail, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { RegisterData } from '@shared/types';

export default function Register() {
  const [formData, setFormData] = useState<RegisterData>({
    name: '',
    phoneOrEmail: '',
    password: ''
  });
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const { register, authState, adminSettings } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!formData.name || !formData.phoneOrEmail || !formData.password) {
      setError('সকল ফিল্ড পূরণ করুন');
      return;
    }

    if (formData.name.length < 2) {
      setError('নাম কমপক্ষে ২ অক্ষরের হতে হবে');
      return;
    }

    if (formData.password.length < 6) {
      setError('পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে');
      return;
    }

    if (formData.password !== confirmPassword) {
      setError('পাসওয়ার্ড মিলছে না');
      return;
    }

    // Phone number validation (Bangladeshi format)
    if (!formData.phoneOrEmail.includes('@')) {
      const phoneRegex = /^01[3-9]\d{8}$/;
      if (!phoneRegex.test(formData.phoneOrEmail)) {
        setError('সঠিক ফোন নম্বর দিন (01XXXXXXXXX)');
        return;
      }
    } else {
      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.phoneOrEmail)) {
        setError('সঠিক ইমেইল ঠিকানা দিন');
        return;
      }
    }

    const success = await register(formData);
    if (success) {
      navigate('/');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'confirmPassword') {
      setConfirmPassword(value);
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  if (!adminSettings.allowRegistration) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-xl border-0">
          <CardContent className="p-6 text-center">
            <div className="mb-4">
              <UserPlus className="h-16 w-16 mx-auto text-gray-400" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              রেজিস্ট্রেশন বন্ধ
            </h2>
            <p className="text-gray-600 mb-4">
              বর্তমানে নতুন রেজিস্ট্রে��ন বন্ধ রয়েছে
            </p>
            <Link to="/login">
              <Button variant="outline" className="w-full">
                লগইন পেজে ফিরে যান
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo Section */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-blue-600 text-white rounded-xl p-3 text-2xl font-bold">
              N60
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Neo sixty</h1>
          <p className="text-gray-600">নতুন অ্যাকাউন্ট তৈরি করুন</p>
        </div>

        <Card className="shadow-xl border-0">
          <CardHeader className="space-y-1 pb-6">
            <CardTitle className="text-2xl font-bold text-center text-gray-900">
              রেজিস্টার করুন
            </CardTitle>
            <CardDescription className="text-center text-gray-600">
              আপনার তথ্য দিয়ে অ্যাকাউন্ট তৈরি করুন
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="name">পূর্ণ নাম</Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-4 w-4 text-gray-400" />
                  </div>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="আপনার পূর্ণ নাম লিখুন"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="pl-10"
                    disabled={authState.isLoading}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phoneOrEmail">ফোন নম্বার অথবা ইমেইল</Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    {formData.phoneOrEmail.includes('@') ? (
                      <Mail className="h-4 w-4 text-gray-400" />
                    ) : (
                      <Phone className="h-4 w-4 text-gray-400" />
                    )}
                  </div>
                  <Input
                    id="phoneOrEmail"
                    name="phoneOrEmail"
                    type="text"
                    placeholder="01XXXXXXXXX অথবা email@example.com"
                    value={formData.phoneOrEmail}
                    onChange={handleInputChange}
                    className="pl-10"
                    disabled={authState.isLoading}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">পাসওয়ার্ড</Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-4 w-4 text-gray-400" />
                  </div>
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="কমপক্ষে ৬ অক্ষরের পাসওয়ার্ড"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="pl-10 pr-10"
                    disabled={authState.isLoading}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">পাসওয়ার্ড নিশ্চিত করুন</Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-4 w-4 text-gray-400" />
                  </div>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="পুনরায় পাসওয়ার্ড লিখুন"
                    value={confirmPassword}
                    onChange={handleInputChange}
                    className="pl-10 pr-10"
                    disabled={authState.isLoading}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-blue-600 hover:bg-blue-700" 
                disabled={authState.isLoading}
              >
                {authState.isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    অ্যাকাউন্ট তৈরি হচ্ছে...
                  </>
                ) : (
                  <>
                    <UserPlus className="mr-2 h-4 w-4" />
                    রেজিস্টার করুন
                  </>
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                ইতিমধ্যে অ্যাকাউন্ট আছে?{' '}
                <Link 
                  to="/login" 
                  className="font-medium text-blue-600 hover:text-blue-500 transition-colors"
                >
                  লগইন করুন
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 text-center text-sm text-gray-500">
          <p>© 2024 Neo sixty. সর্বস্বত্ব সংরক্ষিত।</p>
        </div>
      </div>
    </div>
  );
}
