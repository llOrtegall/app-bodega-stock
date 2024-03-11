import { NavLink } from "react-router-dom";

interface NavItemProps {
  to: string;
  children: React.ReactNode;
}

export const NavItem: React.FC<NavItemProps> = ({ to, children }) => {
  return (
    <li className="text-xl flex items-center">
      <NavLink className={({isActive}) => (isActive ? 'active' : '')} to={to}>{children}</NavLink>
    </li>
  );
};