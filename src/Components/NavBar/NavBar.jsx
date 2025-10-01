import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
} from "@heroui/react";
import { AuthContect } from "../../Context/AuthContect";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom"; // ✅ خلي Link من react-router-dom
import { PostContext } from "../../Context/PostContext";
import { UserContext } from "../../Context/UserContext";

export default function NavBar() {
  const {setPage}=useContext(PostContext)
  
  const { isLoggedIn, setIsloggedIn } = useContext(AuthContect);

    const { data } = useContext(UserContext);
    const user = data?.user
    // console.log(user);
    
  
  
  
  const Route = useNavigate();

  function LogOut() {
    localStorage.removeItem("token");
    setIsloggedIn(false);
    Route("/login");
  }

  return (
    <Navbar className="bg-zinc-900 text-white w-full">
      <div className="w-full flex items-center justify-between px-6">
        <NavbarBrand>
          <Link onClick={()=>setPage(1)} className="cursor-pointer text-white" to={"/"}>
          
            Social App
          </Link>
        </NavbarBrand>

        {isLoggedIn && (
          <NavbarContent justify="end">
            <Dropdown placement="bottom-end">
              <DropdownTrigger className="cursor-pointer">
                <Avatar
                  isBordered
                  as="button"
                  className="transition-transform"
                  color="secondary"
                  name="Jason Hughes"
                  size="sm"
                  src={user?.photo}
                />
              </DropdownTrigger>
              <DropdownMenu aria-label="Profile Actions" variant="flat">
                <DropdownItem key="profile" className="h-14 gap-2">
                  <p className="font-semibold">Signed in as <span className="text-blue-700 ">{user?.name}</span></p>
                  <p className="font-semibold"><span className="text-blue-700 ">{user?.email}</span></p>
                </DropdownItem>
             <DropdownItem key="my-profile" as={Link} to="/profile">
  My Profile
</DropdownItem>

                <DropdownItem onClick={LogOut} key="logout" color="danger">
                  Log Out
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavbarContent>
        )}

        {!isLoggedIn && (
          <NavbarContent>
            <NavbarItem>
              <Link to="/login" className="hover:underline">
                Login
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Link to="/register" className="hover:underline">
                Register
              </Link>
            </NavbarItem>
          </NavbarContent>
        )}
      </div>
    </Navbar>
  );
}
