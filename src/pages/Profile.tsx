import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Mail, Phone, MapPin } from 'lucide-react';
import { toast } from "@/hooks/use-toast";

const Profile = () => {
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) {
      toast({
        title: "Access Denied",
        description: "Please login to view your profile.",
        variant: "destructive",
      });
      navigate('/login');
      return;
    }

    // Get user data from localStorage
    const userData = JSON.parse(localStorage.getItem('currentUser') || 'null');
    if (userData) {
      setUser(userData);
    }
  }, [navigate]);

  if (!user) {
    return null; // or a loading spinner
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Card className="animate-fade-in">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4">
              <Avatar className="w-24 h-24 mx-auto">
                <AvatarImage src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=random`} alt={user.name} />
                <AvatarFallback>
                  <User className="h-12 w-12" />
                </AvatarFallback>
              </Avatar>
            </div>
            <CardTitle className="text-2xl">{user.name}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center text-gray-700">
              <Mail className="h-5 w-5 mr-2 text-green-600" />
              <span>{user.email}</span>
            </div>
            <div className="flex items-center text-gray-700">
              <Phone className="h-5 w-5 mr-2 text-green-600" />
              <span>{user.phone}</span>
            </div>
            <div className="flex items-center text-gray-700">
              <MapPin className="h-5 w-5 mr-2 text-green-600" />
              <span>{user.location}</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
