import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Header from "@/components/Header";
import { MapPin, Clock, User, ArrowLeft } from "lucide-react";

const DoctorSpecialization = () => {
  const { specialization } = useParams();
  const [genderFilter, setGenderFilter] = useState("all");
  
  // Mock data - in real app this would come from API
  const allDoctors = [
    {
      id: 1,
      name: "Dr.Yamini",
      specialization: "Gynecologist",
      experience: 8,
      location: "Hyderabad",
      contact: "+91 987654321",
      availability: "Available Today",
      gender: "female",
      image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=200&h=200&fit=crop",
    },
    {
      id: 2,
      name: "Dr. Rajesh",
      specialization: "Neurologist",
      experience: 12,
      location: "Hyderabad",
      contact: "+91 987654321",
      availability: "Available Tomorrow",
      gender: "male",
      image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=200&h=200&fit=crop",
    },
    {
      id: 3,
      name: "Dr. Akshaya",
      specialization: "Child Specialist",
      experience: 6,
      location: "Hyderabad",
      contact: "+91 987654321",
      availability: "Available Today",
      gender: "female",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&h=200&fit=crop",
    },
    {
      id: 4,
      name: "Dr. Balram",
      specialization: "Cardiologist",
      experience: 15,
      location: "Hyderabad",
      contact: "+91 987654321",
      availability: "Available in 2 days",
      gender: "male",
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200&h=200&fit=crop",
    }
  ];

  const filteredDoctors = genderFilter === "all" 
    ? allDoctors 
    : allDoctors.filter(doctor => doctor.gender === genderFilter);

  const specializationName = specialization?.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()) || "Specialists";

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      

      {/* Filter Section */}
      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <Link to="/book-appointment" className="flex items-center text-black-600 hover:text-green-800 transition-colors">
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Specializations
            </Link>
            <div className="flex items-center gap-4">
              <label className="text-gray-700 font-medium">Filter by Gender:</label>
              <Select value={genderFilter} onValueChange={setGenderFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Doctors</SelectItem>
                  <SelectItem value="male">Male Doctors</SelectItem>
                  <SelectItem value="female">Female Doctors</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Doctors Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDoctors.map((doctor, index) => (
              <Card key={doctor.id} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-2 animate-fade-in" style={{animationDelay: `${index * 0.1}s`}}>
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4">
                    <div className="w-20 h-20 medical-gradient rounded-full flex items-center justify-center overflow-hidden">
                      <img src={doctor.image} alt={doctor.name} className="w-full h-full object-cover" />
                    </div>
                  </div>
                  <CardTitle className="text-xl">{doctor.name}</CardTitle>
                  <CardDescription className="text-green-600 font-medium">
                    {doctor.specialization}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Experience:</span>
                    <span className="font-medium">{doctor.experience} years</span>
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="h-4 w-4 mr-1" />
                    {doctor.location}
                  </div>
                  
                  <div className="flex items-center text-sm">
                    <Clock className="h-4 w-4 text-green-500 mr-1" />
                    <Badge variant="secondary" className="text-green-600 bg-green-50">
                      {doctor.availability}
                    </Badge>
                  </div>
                  
                  <div className="text-sm">
                    <span className="text-gray-600">Contact:</span>
                    <span className="ml-2 font-medium">{doctor.contact}</span>
                  </div>
                  
                  <div className="pt-4">
                    <Button asChild className="w-full medical-gradient hover:opacity-90 text-white">
                      <Link to={`/doctor/${doctor.id}?book=true`}>
                        Book Appointment
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default DoctorSpecialization;