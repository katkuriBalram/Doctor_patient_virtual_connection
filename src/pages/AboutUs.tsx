
import Header from "@/components/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Award, Heart, Target } from "lucide-react";

const AboutUs = () => {
  const teamMembers = [
    {
      name: "Dr. Michael Johnson",
      role: "Chief Medical Officer",
      experience: "15+ years",
      specialization: "Internal Medicine"
    },
    {
      name: "Dr. Sarah Wilson",
      role: "Head of Cardiology",
      experience: "12+ years", 
      specialization: "Cardiology"
    },
    {
      name: "Dr. David Chen",
      role: "Neurology Specialist",
      experience: "10+ years",
      specialization: "Neurology"
    },
    {
      name: "Dr. Emily Rodriguez",
      role: "Pediatrics Lead",
      experience: "8+ years",
      specialization: "Pediatrics"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="medical-gradient text-white py-16 animate-fade-in">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-slide-in-left">
            About <span className="text-green-200">HealthConnect</span>
          </h1>
          <p className="text-xl text-green-100 animate-slide-in-right">
            Revolutionizing healthcare through technology and compassionate care
          </p>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 animate-slide-in-left">
              Meet Our Expert Team
            </h2>
            <p className="text-lg text-gray-600 animate-slide-in-right">
              Our dedicated healthcare professionals are committed to providing you with the best medical care
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-2 animate-fade-in" style={{animationDelay: `${index * 0.1}s`}}>
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4">
                    <div className="w-20 h-20 medical-gradient rounded-full flex items-center justify-center">
                      <Users className="h-10 w-10 text-white" />
                    </div>
                  </div>
                  <CardTitle className="text-xl">{member.name}</CardTitle>
                  <CardDescription className="text-green-600 font-medium">
                    {member.role}
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center space-y-2">
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold">Experience:</span> {member.experience}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold">Specialization:</span> {member.specialization}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
