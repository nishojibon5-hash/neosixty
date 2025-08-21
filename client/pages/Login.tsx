import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Label } from '../components/ui/label';
import { Alert, AlertDescription } from '../components/ui/alert';
import { Loader2, LogIn, Phone, Lock, Mail } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { LoginCredentials } from '@shared/types';

export default function Login() {
  const [credentials, setCredentials] = useState<LoginCredentials>({
    phoneOrEmail: '',
    password: ''
  });
  const [error, setError] = useState('');
  const { login, authState } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!credentials.phoneOrEmail || !credentials.password) {
      setError('সকল ফিল্ড পূরণ করুন');
      return;
    }

    const success = await login(credentials);
    if (success) {
      navigate('/');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
  };

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
          <p className="text-gray-600">বন্ধুদের সাথে সংযুক্ত থাকুন</p>
        </div>

        <Card className="shadow-xl border-0">
          <CardHeader className="space-y-1 pb-6">
            <CardTitle className="text-2xl font-bold text-center text-gray-900">
              লগইন করুন
            </CardTitle>
            <CardDescription className="text-center text-gray-600">
              আপনার অ্যাকাউন্টে প্রবেশ করুন
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
                <Label htmlFor="phoneOrEmail">ফোন নম্বার অথবা ইমেইল</Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    {credentials.phoneOrEmail.includes('@') ? (
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
                    value={credentials.phoneOrEmail}
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
                    type="password"
                    placeholder="আপনার পাসওয়ার্ড লিখুন"
                    value={credentials.password}
                    onChange={handleInputChange}
                    className="pl-10"
                    disabled={authState.isLoading}
                  />
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
                    লগইন হচ্ছে...
                  </>
                ) : (
                  <>
                    <LogIn className="mr-2 h-4 w-4" />
                    লগইন করুন
                  </>
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                নতুন অ্যাকাউন্ট প্রয়োজন?{' '}
                <Link 
                  to="/register" 
                  className="font-medium text-blue-600 hover:text-blue-500 transition-colors"
                >
                  রেজিস্টার করুন
                </Link>
              </p>
            </div>

            {/* Demo credentials hint */}
            <div className="mt-4 p-3 bg-gray-50 rounded-lg text-sm text-gray-600">
              <p className="font-medium text-gray-800 mb-1">ডেমো লগইন:</p>
              <p>এডমিন: 01650074073 / Sal123@#$</p>
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
