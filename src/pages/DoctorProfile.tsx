import { useEffect, useState } from "react";
import { useParams, useSearchParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import { MapPin, Phone, Mail, GraduationCap, Calendar, ArrowLeft } from "lucide-react";
import AppointmentBookingForm from "@/components/AppointmentBookingForm";

const DoctorProfile = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const showBooking = searchParams.get('book') === 'true';

  // Mock data - in real app this would come from API
  const doctor = {
    id: Number(id) || 1,
    name: "Dr. Yamini",
    specialization: "Gynecologist",
    experience: 8,
    qualification: "MD, MBBS, FCPS",
    location: "Hyderabad",
    contact: "+91 987654321",
    email: "yamini@gmail.com",
    availability: "Monday - Friday: 9:00 AM - 5:00 PM",
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=200&h=200&fit=crop",
    services: [
      "General gynecological examinations",
      "Prenatal care and delivery",
      "Family planning and contraception",
      "Menopause management",
      "Treatment for hormonal disorders",
      "Gynecological surgeries"
    ],
    education: [
      {
        degree: "Doctor of Medicine (MD)",
        institution: "Harvard Medical School",
        year: "2011-2015"
      },
      {
        degree: "Residency in Obstetrics & Gynecology",
        institution: "Johns Hopkins Hospital",
        year: "2015-2019"
      },
      {
        degree: "Fellowship in Reproductive Endocrinology",
        institution: "Mayo Clinic",
        year: "2019-2021"
      }
    ]
  };

  // Format specialization for the route
  const specializationRoute = doctor.specialization.toLowerCase().replace(/ /g, '-');

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Back Button */}
        <div className="mb-8">
          <Link to={`/doctors/${specializationRoute}`} className="flex items-center text-green-600 hover:text-green-800 transition-colors">
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Specializations
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Doctor Profile Card */}
          <div className="lg:col-span-1">
            <Card className="animate-fade-in">
              <CardHeader className="text-center">
                <div className="mx-auto mb-6">
                  <div className="w-24 h-24 medical-gradient rounded-full flex items-center justify-center mx-auto animate-pulse-glow overflow-hidden">
                    <img src={doctor.image} alt={doctor.name} className="w-full h-full object-cover" />
                  </div>
                </div>
                <CardTitle className="text-2xl mb-1">{doctor.name}</CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3 text-sm">
                  <MapPin className="h-5 w-5 text-green-600 shrink-0" />
                  <span>{doctor.location}</span>
                </div>
                
                <div className="flex items-start gap-3 text-sm">
                  <Phone className="h-5 w-5 text-green-600 shrink-0" />
                  <span>{doctor.contact}</span>
                </div>
                
                <div className="flex items-start gap-3 text-sm">
                  <Mail className="h-5 w-5 text-green-600 shrink-0" />
                  <span>{doctor.email}</span>
                </div>
                
                <div className="flex items-start gap-3 text-sm">
                  <GraduationCap className="h-5 w-5 text-green-600 shrink-0" />
                  <span>Experience: {doctor.experience} years</span>
                </div>
                
                <div className="flex items-start gap-3 text-sm">
                  <Calendar className="h-5 w-5 text-green-600 shrink-0" />
                  <span>{doctor.availability}</span>
                </div>
              </CardContent>
            </Card>
          </div>
          {/* Booking Form */}
          <div className="lg:col-span-2">
            <div className="animate-fade-in">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Book Appointment with {doctor.name}</h2>
              <AppointmentBookingForm 
                doctorId={doctor.id}
                doctorName={doctor.name}
                specialization={doctor.specialization}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;