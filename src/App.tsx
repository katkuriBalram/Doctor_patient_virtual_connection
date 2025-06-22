
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import BookAppointment from "./pages/BookAppointment";
import DoctorSpecialization from "./pages/DoctorSpecialization";
import TreatmentSpecialization from "./pages/TreatmentSpecialization";
import DoctorProfile from "./pages/DoctorProfile";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import Appointments from "./pages/Appointments";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/book-appointment" element={<BookAppointment />} />
          <Route path="/doctors/:specialization" element={<DoctorSpecialization />} />
          <Route path="/doctor/:id" element={<DoctorProfile />} />
          <Route path="/treatments/:specialization" element={<TreatmentSpecialization />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
