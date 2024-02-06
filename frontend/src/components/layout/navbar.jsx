import { Link } from "react-router-dom";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useAuth from "@/hooks/useAuth";
import useLogout from "@/hooks/useLogout";
import { jwtDecode } from "jwt-decode";

export default function Navbar() {
  const { auth } = useAuth();
  const {
    user: { username, name },
  } = jwtDecode(auth.token);
  const logout = useLogout();

  return (
    <nav className="fixed top-0 z-40 h-20 w-full border-b border-gray-200 bg-white px-8 py-4">
      <div className="flex items-center justify-between">
        <ul className="flex space-x-4">
          <li className="text-xl font-medium">
            <Link to="/">Home</Link>
          </li>
          <li className="text-xl font-medium">
            <Link to="/contact">Contact</Link>
          </li>
          <li className="text-xl font-medium">
            <Link to="/address">Address</Link>
          </li>
        </ul>
        <DropdownMenu>
          {/* asChild to make it close on click */}
          <DropdownMenuTrigger asChild>
            <span className="flex items-center gap-x-2">
              <p>{name}</p>
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" alt="user" />
                <AvatarFallback>User</AvatarFallback>
              </Avatar>
            </span>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="z-50">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {/* asChild to make it close on click */}
            <DropdownMenuItem className="cursor-pointer" asChild>
              <Link to="/profile">Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer" onClick={logout}>
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
}
