import { MobileNav } from "./mobile-nav";
import { PCNavBar } from "./pc-nav";

export const NavBar = () => {
  return (
    <>
      <PCNavBar />
      <MobileNav />
    </>
  );
};
