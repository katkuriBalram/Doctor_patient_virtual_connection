import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock, Stethoscope } from 'lucide-react';
import { toast } from "@/hooks/use-toast";

const Appointments = () => {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const storedUser = localStorage.getItem('currentUser');

    if (!isLoggedIn || !storedUser) {
      toast({
        title: "Access Denied",
        description: "Please login to view your appointments.",
        variant: "destructive",
      });
      navigate('/login');
      return;
    }

    const user = JSON.parse(storedUser);
    const fetchAppointments = async () => {
      try {
        const res = await fetch(`http://localhost:8000/appointments/user/${user.email}`);
        if (!res.ok) throw new Error("Failed to fetch appointments");

        const data = await res.json();
        setAppointments(data);
      } catch (err) {
        console.error(err);
        toast({
          title: "Error",
          description: "Could not fetch appointments.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Card className="animate-fade-in">
          <CardHeader>
            <CardTitle className="text-2xl">Your Appointments</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-gray-600">Loading appointments...</div>
            ) : appointments.length === 0 ? (
              <div className="text-gray-600">No appointments found.</div>
            ) : (
              <div className="space-y-4">
                {appointments.map((appt) => (
                  <Card key={appt._id} className="border-2 border-green-100 hover:border-green-200 transition-colors">
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between">
                        <div className="space-y-2">
                          <div className="flex items-center">
                            <Stethoscope className="h-5 w-5 mr-2 text-green-600" />
                            <span className="font-semibold">{appt.doctorName}</span>
                          </div>
                          <div className="text-sm text-gray-600">{appt.specialization}</div>
                          <div className="flex items-center text-sm text-gray-600">
                            <Calendar className="h-4 w-4 mr-1" />
                            {new Date(appt.date).toLocaleDateString()}
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <Clock className="h-4 w-4 mr-1" />
                            {appt.timeSlot}
                          </div>
                        </div>
                        <div className="flex flex-col items-end">
                          <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                            {appt.appointmentType}
                          </span>
                          <span className="mt-2 text-sm text-gray-600">₹{appt.price}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Appointments;
