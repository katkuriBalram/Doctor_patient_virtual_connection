import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Header from "@/components/Header";
import { MapPin, GraduationCap, User, ArrowLeft } from "lucide-react";
import TreatmentBookingForm from "@/components/TreatmentBookingForm";

const TreatmentSpecialization = () => {
  const { specialization } = useParams();
  const [selectedTreatment, setSelectedTreatment] = useState<number | null>(null);
  const [genderFilter, setGenderFilter] = useState("all");
  
  // Mock treatment data with doctor details
  const treatments = [
    {
      id: 1,
      name: "Coronary Bypass Surgery",
      hospital: "Yashoda Hospital",
      location: "Hyderabad",
      cost: "Rs. 10,000",
      doctorName: "Dr.Rajesh",
      doctorGender: "male",
      experience: 15,
      achievements: "Board-certified Cardiac Surgeon, Published 50+ research papers",
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200&h=200&fit=crop"
    },
    {
      id: 2,
      name: "Heart Valve Replacement",
      hospital: "Care Hospital",
      location: "Yusafguda",
      cost: "Rs. 14,999",
      doctorName: "Dr.Yamini",
      doctorGender: "female",
      experience: 12,
      achievements: "Fellowship in Cardiovascular Surgery, Award for Excellence in Patient Care",
      image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=200&h=200&fit=crop"
    },
    {
      id: 3,
      name: "Angioplasty",
      hospital: "Sagam Hospital",
      location: "Amberpet",
      cost: "Rs. 25,000",
      doctorName: "Dr. Balram",
      doctorGender: "male",
      experience: 10,
      achievements: "Interventional Cardiology Specialist, 500+ successful procedures",
      image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=200&h=200&fit=crop"
    }
  ];

  const filteredTreatments = genderFilter === "all" 
    ? treatments 
    : treatments.filter(treatment => treatment.doctorGender === genderFilter);

  const specializationName = specialization?.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()) || "Treatments";

  const handleBookTreatment = (treatmentId: number) => {
    setSelectedTreatment(treatmentId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBookingSuccess = () => {
    // Could do more here in a real app
  };

  if (selectedTreatment) {
    const treatment = treatments.find(t => t.id === selectedTreatment);
    if (treatment) {
      return (
        <div className="min-h-screen bg-gray-50">
          <Header />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <Button 
              variant="outline" 
              className="mb-8"
              onClick={() => setSelectedTreatment(null)}
            >
              &larr; Back to Treatments
            </Button>
            
            <div className="mb-8 animate-fade-in">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Book {treatment.name}
              </h2>
            </div>
            
            <TreatmentBookingForm 
              treatmentId={treatment.id}
              treatmentName={treatment.name}
              hospital={treatment.hospital}
              price={treatment.cost}
              doctorName={treatment.doctorName}
              onSuccess={handleBookingSuccess}
            />
          </div>
        </div>
      );
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Filter Section */}
      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <Link to="/book-appointment" className="flex items-center text-green-600 hover:text-green-800 transition-colors">
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Specializations
            </Link>
            <div className="flex items-center gap-4">
              <label className="text-gray-700 font-medium">Filter by Doctor Gender:</label>
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

      {/* Treatments Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            {filteredTreatments.map((treatment, index) => (
              <Card 
                key={treatment.id} 
                className="hover:shadow-lg transition-shadow duration-300 animate-fade-in" 
                style={{animationDelay: `${index * 0.2}s`}}
              >
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-2xl mb-2">{treatment.name}</CardTitle>
                    </div>
                    <Badge variant="outline" className="text-green-600 border-green-600">
                      Available
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    {/* Doctor Details */}
                    <div>
                      <h3 className="font-semibold text-lg mb-3 text-green-600">Doctor Details</h3>
                      <div className="flex items-start space-x-3">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center overflow-hidden">
                          <img src={treatment.image} alt={treatment.doctorName} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-lg">{treatment.doctorName}</p>
                          <div className="flex items-center mt-1">
                            <GraduationCap className="h-4 w-4 text-green-600 mr-1" />
                            <p className="text-sm text-gray-600">{treatment.experience} years experience</p>
                          </div>
                          <p className="text-sm text-gray-600 mt-2">{treatment.achievements}</p>
                        </div>
                      </div>
                    </div>

                    {/* Hospital Details */}
                    <div>
                      <h3 className="font-semibold text-lg mb-3 text-green-600">Hospital Details</h3>
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 text-green-600 mr-2" />
                          <div>
                            <p className="font-medium">{treatment.hospital}</p>
                            <p className="text-sm text-gray-600">{treatment.location}</p>
                          </div>
                        </div>
                        <div className="text-right mt-4">
                          <p className="text-sm text-gray-600">Treatment Fee</p>
                          <p className="font-semibold text-green-600 text-lg">{treatment.cost}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full medical-gradient text-white hover:opacity-90" 
                    onClick={() => handleBookTreatment(treatment.id)}
                  >
                    Book Treatment
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default TreatmentSpecialization;
