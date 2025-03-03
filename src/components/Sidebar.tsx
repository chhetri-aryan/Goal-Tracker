import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useAuth } from '@/contexts/auth-context';
import {
  LayoutDashboard,
  Target,
  CheckSquare,
  Calendar,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut,
} from 'lucide-react';

interface SidebarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const Sidebar = ({ open, setOpen }: SidebarProps) => {
  const location = useLocation();
  const { user, logout } = useAuth();
  
  const routes = [
    {
      name: 'Dashboard',
      path: '/',
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      name: 'Goals',
      path: '/goals',
      icon: <Target className="h-5 w-5" />,
    },
    {
      name: 'Tasks',
      path: '/tasks',
      icon: <CheckSquare className="h-5 w-5" />,
    },
    {
      name: 'Habits',
      path: '/habits',
      icon: <Calendar className="h-5 w-5" />,
    },
    {
      name: 'Reports',
      path: '/reports',
      icon: <BarChart3 className="h-5 w-5" />,
    },
    {
      name: 'Settings',
      path: '/settings',
      icon: <Settings className="h-5 w-5" />,
    },
  ];
  
  return (
    <div
      className={cn(
        "fixed inset-y-0 left-0 z-50 flex flex-col border-r bg-card transition-all duration-300 ease-in-out md:relative",
        open ? "w-64" : "w-16"
      )}
    >
      <div className="flex h-16 items-center justify-between px-4 border-b">
        <div className={cn("flex items-center", !open && "justify-center w-full")}>
          <Target className="h-6 w-6" />
          {open && <span className="ml-2 font-semibold">Goal Tracker</span>}
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setOpen(!open)}
          className={cn("hidden md:flex", !open && "hidden")}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        {!open && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setOpen(!open)}
            className="hidden md:flex"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        )}
      </div>
      
      <ScrollArea className="flex-1 py-2">
        <nav className="grid gap-1 px-2">
          {routes.map((route) => (
            <Link
              key={route.path}
              to={route.path}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                location.pathname === route.path && "bg-accent text-accent-foreground",
                !open && "justify-center px-0"
              )}
            >
              {route.icon}
              {open && <span>{route.name}</span>}
            </Link>
          ))}
        </nav>
      </ScrollArea>
      
      <div className="mt-auto border-t p-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-9 w-9 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
            {user?.name?.charAt(0).toUpperCase() || 'U'}
          </div>
          {open && (
            <div className="overflow-hidden">
              <p className="text-sm font-medium truncate">{user?.name}</p>
              <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
            </div>
          )}
        </div>
        <Button
          variant="outline"
          className={cn("w-full justify-start", !open && "justify-center")}
          onClick={logout}
        >
          <LogOut className="h-4 w-4 mr-2" />
          {open && "Logout"}
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;