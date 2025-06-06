
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarIcon, MessageSquare, Video, UserRound, AlertCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface AppointmentBookingFormProps {
  doctorId: string | number;
  doctorName: string;
  specialization: string;
  onSuccess?: () => void;
}

const AppointmentBookingForm = ({
  doctorId,
  doctorName,
  specialization,
  onSuccess
}: AppointmentBookingFormProps) => {
  const [appointmentType, setAppointmentType] = useState("chat");
  const [date, setDate] = useState<Date>();
  const [timeSlot, setTimeSlot] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [alreadyBooked, setAlreadyBooked] = useState(false);
  const [price, setPrice] = useState(300);

  // Calculate price based on appointment type
  useEffect(() => {
    switch(appointmentType) {
      case "chat":
        setPrice(300);
        break;
      case "video":
        setPrice(500);
        break;
      case "physical":
        setPrice(700);
        break;
      default:
        setPrice(300);
    }
  }, [appointmentType]);

  // Time slots
  const timeSlots = [
    "09:00 AM", "10:00 AM", "11:00 AM", 
    "12:00 PM", "02:00 PM", "03:00 PM", 
    "04:00 PM", "05:00 PM", "06:00 PM"
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!date || !timeSlot) {
      toast({
        title: "Missing Information",
        description: "Please select a date and time slot for your appointment.",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    try {
  const response = await fetch("http://localhost:8000/appointments", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      doctorId,
      doctorName,
      specialization,
      appointmentType,
      date: date?.toISOString(),  // store in ISO format
      timeSlot,
      name,
      email,
      phone,
      age,
      gender,
      symptoms,
      price,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to book appointment");
  }

  toast({
    title: "Appointment Successfully Booked",
    description: `Your appointment with ${doctorName} is confirmed for ${format(date, "MMMM d, yyyy")} at ${timeSlot}.`,
  });

  setAlreadyBooked(true);
  onSuccess?.();
} catch (error) {
  toast({
    title: "Booking Failed",
    description: "There was an error booking your appointment. Please try again.",
    variant: "destructive",
  });
} finally {
  setIsSubmitting(false);
}
  }

  const handleBookAgain = () => {
    setAlreadyBooked(false);
    setDate(undefined);
    setTimeSlot("");
    setAppointmentType("chat");
  };

  if (alreadyBooked) {
    return (
      <Card className="w-full max-w-lg mx-auto animate-fade-in">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 p-3 bg-green-100 rounded-full w-fit">
            <svg className="h-12 w-12 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <CardTitle className="text-2xl text-green-600">Your Appointment Already Booked!</CardTitle>
          <CardDescription>
            Your appointment has been successfully scheduled
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Doctor:</span>
              <span className="font-semibold">{doctorName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Specialization:</span>
              <span>{specialization}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Date:</span>
              <span>{date ? format(date, "MMMM d, yyyy") : "Not selected"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Time:</span>
              <span>{timeSlot}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Type:</span>
              <span className="capitalize">{appointmentType}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Fee:</span>
              <span className="font-semibold text-green-600">Rs. {price}</span>
            </div>
          </div>
          
          <div className="space-y-2">
            <p className="text-sm text-gray-600 flex items-center">
              <AlertCircle className="h-4 w-4 mr-1" />
              Please arrive 15 minutes before your scheduled appointment time
            </p>
            <p className="text-sm text-gray-600 flex items-center">
              <AlertCircle className="h-4 w-4 mr-1" />
              You'll receive a confirmation email with further details
            </p>
          </div>
          
          <Button onClick={handleBookAgain} className="w-full bg-green-600 hover:bg-green-700 text-white">
            Book Another Appointment
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-lg mx-auto animate-fade-in">
      <CardHeader>
        <CardTitle className="text-2xl">Book Your Appointment</CardTitle>
        <CardDescription>
          Fill in the details below to schedule your appointment with {doctorName}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>Appointment Type</Label>
            <div className="grid grid-cols-3 gap-2">
              <Button
                type="button"
                variant={appointmentType === "chat" ? "default" : "outline"}
                className={appointmentType === "chat" ? "bg-green-600 text-white" : ""}
                onClick={() => setAppointmentType("chat")}
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                Chat
              </Button>
              <Button
                type="button"
                variant={appointmentType === "video" ? "default" : "outline"}
                className={appointmentType === "video" ? "bg-green-600 text-white" : ""}
                onClick={() => setAppointmentType("video")}
              >
                <Video className="h-4 w-4 mr-2" />
                Video
              </Button>
              <Button
                type="button"
                variant={appointmentType === "physical" ? "default" : "outline"}
                className={appointmentType === "physical" ? "bg-green-600 text-white" : ""}
                onClick={() => setAppointmentType("physical")}
              >
                <UserRound className="h-4 w-4 mr-2" />
                Physical
              </Button>
            </div>

            <div className="bg-blue-50 p-3 rounded-md mt-2 text-center animate-fade-in">
              <p className="text-gray-700">Consultation Fee:</p>
              <p className="text-xl font-semibold text-green-600">Rs. {price}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input 
                id="name" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                required 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input 
                id="phone" 
                value={phone} 
                onChange={(e) => setPhone(e.target.value)} 
                required 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="age">Age</Label>
              <Input 
                id="age" 
                type="number" 
                min="1" 
                max="120" 
                value={age} 
                onChange={(e) => setAge(e.target.value)} 
                required 
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="gender">Gender</Label>
            <Select value={gender} onValueChange={setGender} required>
              <SelectTrigger>
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Appointment Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "MMMM d, yyyy") : <span>Select date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    disabled={(date) => {
                      // Only allow upcoming dates (tomorrow onwards for next 7 days)
                      const tomorrow = new Date();
                      tomorrow.setDate(tomorrow.getDate() + 1);
                      tomorrow.setHours(0, 0, 0, 0);
                      
                      const maxDate = new Date();
                      maxDate.setDate(maxDate.getDate() + 7);
                      maxDate.setHours(23, 59, 59, 999);
                      
                      return date < tomorrow || date > maxDate;
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="space-y-2">
              <Label htmlFor="timeSlot">Time Slot</Label>
              <Select value={timeSlot} onValueChange={setTimeSlot} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent>
                  {timeSlots.map((slot) => (
                    <SelectItem key={slot} value={slot}>
                      {slot}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="symptoms">What is the Problem?</Label>
            <Textarea
              id="symptoms"
              placeholder="Describe your symptoms or reason for visit"
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
              rows={3}
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Booking Appointment..." : "Book Appointment"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default AppointmentBookingForm;
