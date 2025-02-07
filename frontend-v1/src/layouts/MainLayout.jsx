import { useState, useRef, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { SidebarProvider, SidebarInset } from "../components/ui/sidebar";
import { AppSidebar } from "../components/app-sidebar";
import { SidebarTrigger } from "../components/ui/sidebar";
import { Separator } from "../components/ui/separator";
import { Bell, Moon, ChevronDown } from "lucide-react";
import { Button } from "../components/ui/button";
import { Search } from "lucide-react"; // Import search icon

function MainLayout() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Fetch user details from local storage
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser) {
      navigate("/login"); // Redirect if not logged in
    } else {
      setUser(storedUser);
    }
  }, [navigate]);

  // Handle Click Outside to Close Dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Logout Function
  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  // Toggle Dropdown
  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  // Function to Get Initials from Username
  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0]?.toUpperCase())
      .join("")
      .slice(0, 2);
  };

  if (!user) return null; // Prevent rendering if user is not loaded

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        {/* Header Section */}
        <header className="flex h-16 shrink-0 items-center justify-between gap-4 border-b px-4">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="trigger-button" />
            <Separator
              orientation="vertical"
              className="mr-2 h-4 hidden md:block"
            />
          </div>

          {/* User Profile Section */}
          <div className="flex items-center gap-4">
            <div className="relative w-full max-w-xs">
              <input
                type="search"
                id="location-search"
                className="block w-full p-2.5 pr-10 text-sm text-white bg-primary border border-gray-300 rounded-lg  dark:text-white"
                placeholder="Search..."
                required
              />
              <button
                type="submit"
                className="absolute inset-y-0 right-2 flex items-center pr-2 text-white dark:text-white"
              >
                <Search className="w-5 h-5" />
              </button>
            </div>
            <div className="text-xl">
              <Moon className="w-6 h-6" />
            </div>
            <div className="text-xl">
              <Bell className="w-6 h-6" />
            </div>

            {/* User Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <div
                className="w-10 h-10 flex items-center justify-center rounded-full bg-primary text-white font-bold cursor-pointer"
                onClick={toggleDropdown}
              >
                {getInitials(user.username)}
                {/* <ChevronDown className="w-4 h-4 ml-1" /> */}
              </div>

              {/* Dropdown Content */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg z-50">
                  <div className="px-1 py-3">
                    <p className="text-xs text-black-700">
                      Username: {user.username || "Unknown User"}
                    </p>
                    <p className="text-xs text-black-700">
                      Email: {user.email || "No Email"}
                    </p>
                  </div>
                  <div className="border-t">
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="flex flex-1 flex-col gap-4 p-4">
          <Outlet /> {/* Renders different pages */}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

export default MainLayout;
