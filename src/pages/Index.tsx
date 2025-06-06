import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/Header";
import { Calendar, Clock, Shield, Users, Video, MessageSquare, User, Star } from "lucide-react";

const Index = () => {
  const availableDoctors = [
    {
      id: 1,
      name: "Dr.Yamini",
      specialization: "Gynecologist",
      experience: 8,
      image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=200&h=200&fit=crop",
      availability: "Available Today"
    },
    {
      id: 2,
      name: "Dr. Rajesh",
      specialization: "Neurologist", 
      experience: 12,
      image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=200&h=200&fit=crop",
      availability: "Available Today"
    },
    {
      id: 3,
      name: "Dr.Akshaya",
      specialization: "Child Specialist",
      experience: 6,
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&h=200&fit=crop",
      availability: "Available Tomorrow"
    },
    {
      id: 4,
      name: "Dr. Balram",
      specialization: "Cardiologist",
      experience: 15,
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200&h=200&fit=crop",
      availability: "Available Today"
    },
    {
      id: 5,
      name: "Dr. Bunny",
      specialization: "Dentist",
      experience: 10,
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200&h=200&fit=crop",
      availability: "Available Today"
    },
    {
      id: 6,
      name: "Dr. Rakesh",
      specialization: "Psychiatrist",
      experience: 14,
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200&h=200&fit=crop",
      availability: "Available Tomorrow"
    }
  ];

  const specializations = [
    "Gynecologist", "Child Specialist", "Neurologist", 
    "Psychiatrist", "Dentist", "Speech Therapist",
    "Cardiologist", "Dermatologist"
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="medical-gradient text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
              Connect with the Best Doctors from the Comfort of Your Home
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto animate-fade-in">
              Time and Health are two precious assets, that we don't recognize and appreciate until they have been depleted.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
              <Button asChild size="lg" className="bg-white text-green-600 hover:bg-gray-100 font-semibold px-8 py-3">
                <Link to="/book-appointment">Find Doctor</Link>
              </Button>
              <Button asChild size="lg" className="bg-white text-green-600 hover:bg-gray-100 font-semibold px-8 py-3">
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Available Doctors Section */}
      <section className="py-16 animate-fade-in">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 animate-slide-in-left">
              Our Available Doctors
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto animate-slide-in-right">
              Connect with our qualified specialists who are ready to provide you with the best medical care.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {availableDoctors.map((doctor, index) => (
              <Card key={doctor.id} className="hover:shadow-xl transition-all duration-300 hover:-translate-y-2 animate-fade-in" style={{animationDelay: `${index * 0.1}s`}}>
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4">
                    <div className="w-20 h-20 medical-gradient rounded-full flex items-center justify-center overflow-hidden">
                      <img src={doctor.image} alt={doctor.name} className="w-full h-full object-cover" />
                    </div>
                  </div>
                  <CardTitle className="text-xl text-gray-900">{doctor.name}</CardTitle>
                  <CardDescription className="text-green-600 font-semibold text-lg">
                    {doctor.specialization}
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="space-y-2 mb-4">
                    <p className="text-gray-600">
                      <span className="font-semibold">{doctor.experience}</span> years experience
                    </p>
                    <p className="text-green-600 font-medium">{doctor.availability}</p>
                  </div>
                  <Button asChild className="medical-gradient hover:opacity-90 text-white w-full">
                    <Link to={`/doctor/${doctor.id}`}>
                      Book Appointment
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Specializations Section */}
      <section className="py-16 bg-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 animate-slide-in-left">
              Medical Specializations
            </h2>
            <p className="text-lg text-gray-600 animate-slide-in-right">
              Find the right specialist for your health needs
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {specializations.map((spec, index) => (
              <Link
                key={index}
                to={`/doctors/${spec.toLowerCase().replace(' ', '-')}`}
                className="p-6 bg-white rounded-xl text-center hover:shadow-lg transition-all duration-300 group animate-fade-in"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <div className="text-gray-700 group-hover:text-green-600 font-semibold text-lg transition-colors">
                  {spec}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 medical-gradient text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-slide-in-left">
            Ready to Start Your Health Journey?
          </h2>
          <p className="text-xl mb-8 animate-slide-in-right">
            Join thousands of patients who trust HealthConnect for their medical needs
          </p>
          <Button asChild size="lg" className="bg-white text-green-600 hover:bg-gray-100 font-semibold px-8 py-3 animate-fade-in">
            <Link to="/signup">Get Started Today</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">HealthConnect</h3>
              <p className="text-gray-400">
                Connecting patients with healthcare professionals for better health outcomes.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/book-appointment" className="hover:text-white transition-colors">Book Appointment</Link></li>
                <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
                <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
              <div className="text-gray-400 space-y-2">
                <p>Email: support@healthconnect.com</p>
                <p>Phone: +1 (555) 123-4567</p>
                <p>Available 24/7</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 HealthConnect. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
