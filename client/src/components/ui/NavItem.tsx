import { NavLink } from "react-router-dom";

interface NavItemProps {
  children: React.ReactNode;
  to: string;
  title?: string;
}

export const NavItem: React.FC<NavItemProps> = ({to, children, title }) => {
  return (
    <li className="flex flex-col items-center w-full gap-2" title={title}>
      <NavLink to={to} className={({isActive}) => (isActive ? 'active' : '')}>
        {children}
      </NavLink>
    </li>
  );
};