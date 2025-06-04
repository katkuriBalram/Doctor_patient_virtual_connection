
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/Header";
import { 
  Heart, 
  Brain, 
  User,
  Stethoscope
} from "lucide-react";

const BookTreatment = () => {
  const treatmentCategories = [
    {
      id: "cardiac-surgery",
      name: "Cardiac Surgery",
      icon: <Heart className="h-8 w-8 text-red-600" />,
      description: "Heart surgeries and cardiovascular procedures",
      treatmentCount: "15 treatments available"
    },
    {
      id: "neurosurgery",
      name: "Neurosurgery",
      icon: <Brain className="h-8 w-8 text-purple-600" />,
      description: "Brain and nervous system surgeries",
      treatmentCount: "12 treatments available"
    },
    {
      id: "orthopedic-surgery",
      name: "Orthopedic Surgery",
      icon: <User className="h-8 w-8 text-blue-600" />,
      description: "Bone, joint, and muscle surgeries",
      treatmentCount: "20 treatments available"
    },
    {
      id: "general-surgery",
      name: "General Surgery",
      icon: <Stethoscope className="h-8 w-8 text-green-600" />,
      description: "Common surgical procedures",
      treatmentCount: "25 treatments available"
    },
    {
      id: "plastic-surgery",
      name: "Plastic Surgery",
      icon: <User className="h-8 w-8 text-pink-600" />,
      description: "Cosmetic and reconstructive surgeries",
      treatmentCount: "18 treatments available"
    },
    {
      id: "dental-surgery",
      name: "Dental Surgery",
      icon: <User className="h-8 w-8 text-yellow-600" />,
      description: "Oral and dental surgical procedures",
      treatmentCount: "10 treatments available"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-green-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-slide-in-left">
            Book Your Treatment
          </h1>
          <p className="text-xl animate-slide-in-right">
            Find the right surgical procedure and specialist for your needs
          </p>
        </div>
      </section>

      {/* Treatment Categories Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 animate-slide-in-left">
              Select Treatment Category
            </h2>
            <p className="text-lg text-gray-600 animate-slide-in-right">
              Choose from our comprehensive range of medical treatments and surgeries
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {treatmentCategories.map((category, index) => (
              <Link
                key={category.id}
                to={`/treatments/${category.id}`}
                className="block animate-fade-in"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-2 cursor-pointer">
                  <CardHeader className="text-center">
                    <div className="mx-auto mb-4 p-3 bg-green-50 rounded-full w-fit">
                      {category.icon}
                    </div>
                    <CardTitle className="text-xl">{category.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <CardDescription className="text-gray-600 mb-2">
                      {category.description}
                    </CardDescription>
                    <p className="text-sm text-green-600 font-medium">
                      {category.treatmentCount}
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

export default BookTreatment;
