import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Video, Copy, ExternalLink } from "lucide-react";
import { format } from "date-fns";
import { toast } from "@/hooks/use-toast";

interface VideoConsultationInterfaceProps {
  doctorName: string;
  specialization: string;
  appointmentDate: Date;
  appointmentTime: string;
  onClose: () => void;
}

const VideoConsultationInterface = ({
  doctorName,
  specialization,
  appointmentDate,
  appointmentTime,
  onClose
}: VideoConsultationInterfaceProps) => {
  const [isCopied, setIsCopied] = useState(false);
  const meetLink = "https://meet.google.com/dyn-ieqr-pyo";

  const handleCopyLink = () => {
    navigator.clipboard.writeText(meetLink);
    setIsCopied(true);
    toast({
      title: "Link Copied",
      description: "Meeting link has been copied to clipboard",
    });
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleJoinMeeting = () => {
    window.open(meetLink, "_blank");
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="border-b">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="hover:bg-gray-100"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <CardTitle className="text-xl">Video Consultation with Dr. {doctorName}</CardTitle>
            <p className="text-sm text-gray-500">
              {specialization} • {format(appointmentDate, "MMMM d, yyyy")} at {appointmentTime}
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-6 space-y-6">
        <div className="bg-blue-50 p-6 rounded-lg space-y-4">
          <div className="flex items-center gap-3">
            <Video className="h-6 w-6 text-blue-600" />
            <h3 className="text-lg font-semibold text-blue-900">Your Video Consultation is Ready</h3>
          </div>
          
          <div className="space-y-2">
            <p className="text-sm text-gray-600">
              Please join the meeting at your scheduled time:
            </p>
            <p className="font-medium">
              {format(appointmentDate, "MMMM d, yyyy")} at {appointmentTime}
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Input
                value={meetLink}
                readOnly
                className="bg-white"
              />
              <Button
                variant="outline"
                size="icon"
                onClick={handleCopyLink}
                className={isCopied ? "bg-green-100" : ""}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
            
            <Button
              onClick={handleJoinMeeting}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Join Meeting
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="font-medium text-gray-900">Before joining:</h4>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-start gap-2">
              <span className="text-blue-600">•</span>
              Make sure you have a stable internet connection
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600">•</span>
              Test your camera and microphone
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600">•</span>
              Find a quiet, well-lit place for the consultation
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600">•</span>
              Have your medical records ready if needed
            </li>
          </ul>
        </div>

        <div className="bg-yellow-50 p-4 rounded-lg">
          <p className="text-sm text-yellow-800">
            Note: The meeting link will be active 5 minutes before your scheduled time.
            Please join on time to avoid any delays.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default VideoConsultationInterface; 