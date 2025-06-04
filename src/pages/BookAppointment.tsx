import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/Header";
import { 
  Heart, 
  Baby, 
  Brain, 
  User
} from "lucide-react";

const BookAppointment = () => {
  const specializations = [
    {
      id: "gynecologist",
      name: "Gynecologist",
      icon: <User className="h-8 w-8 text-pink-600" />,
      description: "Women's health and reproductive care",
      doctorCount: "12 doctors available"
    },
    {
      id: "child-specialist",
      name: "Child Specialist",
      icon: <Baby className="h-8 w-8 text-blue-600" />,
      description: "Pediatric care for children and infants",
      doctorCount: "8 doctors available"
    },
    {
      id: "neurologist",
      name: "Neurologist",
      icon: <Brain className="h-8 w-8 text-purple-600" />,
      description: "Brain and nervous system disorders",
      doctorCount: "6 doctors available"
    },
    {
      id: "psychiatrist",
      name: "Psychiatrist",
      icon: <User className="h-8 w-8 text-green-600" />,
      description: "Mental health and psychological care",
      doctorCount: "10 doctors available"
    },
    {
      id: "dentist",
      name: "Dentist",
      icon: <User className="h-8 w-8 text-yellow-600" />,
      description: "Oral health and dental care",
      doctorCount: "15 doctors available"
    },
    {
      id: "speech-therapist",
      name: "Speech Therapist",
      icon: <User className="h-8 w-8 text-indigo-600" />,
      description: "Speech and language disorders",
      doctorCount: "5 doctors available"
    },
    {
      id: "cardiologist",
      name: "Cardiologist",
      icon: <Heart className="h-8 w-8 text-red-600" />,
      description: "Heart and cardiovascular health",
      doctorCount: "9 doctors available"
    },
    {
      id: "dermatologist",
      name: "Dermatologist",
      icon: <User className="h-8 w-8 text-orange-600" />,
      description: "Skin, hair, and nail conditions",
      doctorCount: "7 doctors available"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-green-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-slide-in-left">
            Search Doctors
          </h1>
          <p className="text-xl animate-slide-in-right">
            Find the best medical professionals for your healthcare needs
          </p>
        </div>
      </section>

      {/* Specializations Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 animate-slide-in-left">
              Select a Specialization
            </h2>
            <p className="text-lg text-gray-600 animate-slide-in-right">
              Find the right doctor for your specific health needs
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {specializations.map((spec, index) => (
              <Link
                key={spec.id}
                to={`/doctors/${spec.id}`}
                className="block animate-fade-in"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-2 cursor-pointer">
                  <CardHeader className="text-center">
                    <div className="mx-auto mb-4 p-3 bg-green-50 rounded-full w-fit">
                      {spec.icon}
                    </div>
                    <CardTitle className="text-xl">{spec.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <CardDescription className="text-gray-600 mb-2">
                      {spec.description}
                    </CardDescription>
                    <p className="text-sm text-green-600 font-medium">
                      {spec.doctorCount}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default BookAppointment;
