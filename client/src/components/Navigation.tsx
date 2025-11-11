import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface NavigationProps {
  className?: string;
}

const navigationItems = [
  { id: "hero", label: "Home", href: "#hero" },
  { id: "about", label: "About", href: "#about" },
  { id: "education", label: "Education", href: "#education" },
  { id: "certifications", label: "Certifications", href: "#certifications" },
  { id: "achievements", label: "Achievements", href: "#achievements" },
  { id: "projects", label: "Projects", href: "#projects" },
];

export function Navigation({ className = "" }: NavigationProps) {
  return (
    <div className={className}>
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="glass-subtle"
            data-testid="button-menu-toggle"
          >
            <Menu className="w-5 h-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="glass-strong w-80">
          <SheetHeader>
            <SheetTitle className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-cyan-600 dark:from-purple-400 dark:to-cyan-400 bg-clip-text text-transparent">
              Navigation
            </SheetTitle>
          </SheetHeader>
          <nav className="mt-8 space-y-2" data-testid="navigation-menu">
            {navigationItems.map((item) => (
              <a
                key={item.id}
                href={item.href}
                className="block px-4 py-3 rounded-lg text-foreground hover-elevate active-elevate-2 transition-all duration-300"
                data-testid={`link-nav-${item.id}`}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
}
