
import { useState } from "react";
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
import { Calendar as CalendarIcon, AlertCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface TreatmentBookingFormProps {
  treatmentId: number;
  treatmentName: string;
  hospital: string;
  price: string;
  doctorName: string;
  onSuccess?: () => void;
}

const TreatmentBookingForm = ({
  treatmentId,
  treatmentName,
  hospital,
  price,
  doctorName,
  onSuccess
}: TreatmentBookingFormProps) => {
  const [date, setDate] = useState<Date>();
  const [timeSlot, setTimeSlot] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [alreadyBooked, setAlreadyBooked] = useState(false);

  // Get the next 14 days for treatment booking
  const getDateAfterDays = (days: number) => {
    const today = new Date();
    const nextDate = new Date(today);
    nextDate.setDate(today.getDate() + days);
    return nextDate;
  };

  const next14Days = Array.from({ length: 14 }, (_, i) => getDateAfterDays(i + 3)); // Start 3 days from now

  // Time slots
  const timeSlots = [
    "08:00 AM", "10:00 AM", "12:00 PM", "02:00 PM", "04:00 PM"
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!date || !timeSlot) {
      toast({
        title: "Missing Information",
        description: "Please select a date and time slot for your treatment.",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Treatment Successfully Booked",
        description: `Your ${treatmentName} procedure is confirmed for ${format(date, "MMMM d, yyyy")} at ${timeSlot}.`,
      });
      
      // Set already booked state to show confirmation
      setAlreadyBooked(true);
      
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      toast({
        title: "Booking Failed",
        description: "There was an error booking your treatment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBookAgain = () => {
    setAlreadyBooked(false);
    setDate(undefined);
    setTimeSlot("");
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
          <CardTitle className="text-2xl text-green-600">Treatment Booked!</CardTitle>
          <CardDescription>
            Your medical procedure has been successfully scheduled
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Treatment:</span>
              <span className="font-semibold">{treatmentName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Doctor:</span>
              <span>{doctorName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Hospital:</span>
              <span>{hospital}</span>
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
              <span className="text-gray-600">Fee:</span>
              <span className="font-semibold text-green-600">{price}</span>
            </div>
          </div>
          
          <div className="space-y-2">
            <p className="text-sm text-gray-600 flex items-center">
              <AlertCircle className="h-4 w-4 mr-1" />
              You will need to arrive at the hospital 2 hours before the procedure
            </p>
            <p className="text-sm text-gray-600 flex items-center">
              <AlertCircle className="h-4 w-4 mr-1" />
              A hospital representative will contact you with pre-procedure instructions
            </p>
          </div>
          
          <Button onClick={handleBookAgain} className="w-full medical-gradient text-white hover:opacity-90">
            Book Another Treatment
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-lg mx-auto animate-fade-in">
      <CardHeader>
        <CardTitle className="text-2xl">Book Your Treatment</CardTitle>
        <CardDescription>
          Fill in the details below to schedule your {treatmentName} procedure
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="bg-green-50 p-3 rounded-md text-center">
            <p className="text-gray-700">Treatment Fee:</p>
            <p className="text-xl font-semibold text-green-600">{price}</p>
            <p className="text-gray-600 text-sm mt-1">at {hospital}</p>
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
              <Label>Treatment Date</Label>
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
                      // Disable dates before 3 days or after 30 days
                      const minDate = new Date();
                      minDate.setDate(minDate.getDate() + 3);
                      minDate.setHours(0, 0, 0, 0);
                      
                      const maxDate = new Date();
                      maxDate.setDate(maxDate.getDate() + 30);
                      maxDate.setHours(23, 59, 59, 999);
                      
                      return date < minDate || date > maxDate;
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="space-y-2">
              <Label htmlFor="timeSlot">Time</Label>
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
            <Label htmlFor="notes">Medical Notes</Label>
            <Textarea
              id="notes"
              placeholder="Any additional medical information or special requirements"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
            />
          </div>

          <Button
            type="submit"
            className="w-full medical-gradient text-white hover:opacity-90"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Booking Treatment..." : "Book Treatment"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default TreatmentBookingForm;
