import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User, Menu, X, Mail } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');
  const [userInitials, setUserInitials] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Update local storage when isLoggedIn changes
    localStorage.setItem('isLoggedIn', String(isLoggedIn));
    
    // Get user initials if logged in
    if (isLoggedIn) {
      const userData = JSON.parse(localStorage.getItem('currentUser') || 'null');
      if (userData?.name) {
        // Get initials from name (e.g., "John David" -> "JD")
        const initials = userData.name
          .split(' ')
          .map((word: string) => word[0])
          .join('')
          .toUpperCase();
        setUserInitials(initials);
      }
    }
  }, [isLoggedIn]);

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserInitials('');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('currentUser');
    navigate('/');
  };

  // Helper function to determine if a link is active
  const isActiveLink = (pathname: string) => {
    return location.pathname === pathname || location.pathname.startsWith(`${pathname}/`);
  };

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 animate-slide-in-left">
            <div className="w-10 h-10 medical-gradient rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">H+</span>
            </div>
            <span className="text-2xl font-bold text-green-600">HealthConnect</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8 animate-slide-in-right">
            <Link 
              to="/"
              className={`font-semibold pb-1 transition-colors ${isActiveLink('/') ? 'text-green-600 border-b-2 border-green-600' : 'text-gray-700 hover:text-green-600'}`}
            >
              Home
            </Link>
            <Link 
              to="/book-appointment"
              className={`font-medium pb-1 transition-colors ${isActiveLink('/book-appointment') || isActiveLink('/doctors') ? 'text-green-600 border-b-2 border-green-600' : 'text-gray-700 hover:text-green-600'}`}
            >
              Book Appointment
            </Link>

            <Link 
              to="/about"
              className={`font-medium pb-1 transition-colors ${isActiveLink('/about') ? 'text-green-600 border-b-2 border-green-600' : 'text-gray-700 hover:text-green-600'}`}
            >
              About Us
            </Link>
            <Link 
              to="/contact"
              className={`font-medium pb-1 transition-colors ${isActiveLink('/contact') ? 'text-green-600 border-b-2 border-green-600' : 'text-gray-700 hover:text-green-600'}`}
            >
              Contact Us
            </Link>
            {isLoggedIn && (
              <Link 
                to="/appointments"
                className={`font-medium pb-1 transition-colors ${isActiveLink('/appointments') ? 'text-green-600 border-b-2 border-green-600' : 'text-gray-700 hover:text-green-600'}`}
              >
                <Mail className="h-5 w-5" />
              </Link>
            )}
          </nav>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            {isLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-green-100 text-green-600 font-semibold">
                        {userInitials || <User className="h-4 w-4" />}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 bg-white" align="end" forceMount>
                  <DropdownMenuItem asChild>
                    <Link to="/profile">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout}>
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="hidden md:flex items-center space-x-2">
                <Button 
                  className="medical-gradient hover:opacity-90 text-white font-semibold px-6 py-2"
                  onClick={() => navigate("/signup")}
                >
                  Login/Signup
                </Button>
              </div>
            )}

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden text-green-600"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 animate-fade-in">
            <div className="flex flex-col space-y-4">
              <Link 
                to="/"
                className={`font-semibold ${isActiveLink('/') ? 'text-green-600' : 'text-gray-700 hover:text-green-600'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/book-appointment"
                className={`font-medium ${isActiveLink('/book-appointment') || isActiveLink('/doctors') ? 'text-green-600' : 'text-gray-700 hover:text-green-600'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Book Appointment
              </Link>
              <Link 
                to="/book-treatment"
                className={`font-medium ${isActiveLink('/book-treatment') || isActiveLink('/treatments') ? 'text-green-600' : 'text-gray-700 hover:text-green-600'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Book Treatment
              </Link>
              <Link 
                to="/about"
                className={`font-medium ${isActiveLink('/about') ? 'text-green-600' : 'text-gray-700 hover:text-green-600'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                About Us
              </Link>
              <Link 
                to="/contact"
                className={`font-medium ${isActiveLink('/contact') ? 'text-green-600' : 'text-gray-700 hover:text-green-600'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Contact Us
              </Link>
              {isLoggedIn && (
                <Link 
                  to="/appointments"
                  className={`font-medium ${isActiveLink('/appointments') ? 'text-green-600' : 'text-gray-700 hover:text-green-600'}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Mail className="h-5 w-5" />
                </Link>
              )}
              {!isLoggedIn && (
                <div className="pt-4 border-t border-gray-200">
                  <Button 
                    className="medical-gradient hover:opacity-90 text-white font-semibold w-full"
                    onClick={() => { navigate("/signup"); setIsMenuOpen(false); }}
                  >
                    Login/Signup
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;