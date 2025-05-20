import { LogOut } from "lucide-react";
import { NavLink } from "react-router";
import { Button } from "~/components/ui/button";
import { ScrollArea } from "~/components/ui/scroll-area";
import type { Client } from "../interfaces/chat.interface";

interface Props {
  clients: Client[];
}

export const ContactList = ({ clients }: Props) => {
  return (
    <ScrollArea className="h-[calc(100vh-64px)]">
      <div className="space-y-4 p-4">
        <div className="space-y-1">
          <h3 className="px-2 text-sm font-semibold">Contacts</h3>
          <div className="space-y-1">
            {clients.map((client) => (
              <NavLink
                key={client.id}
                to={`/chat/client/${client.id}`}
                className={({ isActive }) =>
                  `w-full flex justify-start transition-all duration-300 pt-1 pb-1 rounded-md ${
                    isActive ? "bg-primary/10" : "bg-muted/10 hover:bg-muted/20"
                  }`
                }
              >
                <div className="h-6 w-6 rounded-full bg-blue-500 mr-2 flex-shrink-0 flex items-center justify-center text-white text-xs">
                  {client.name.slice(0, 2)}
                </div>
                {client.name}
              </NavLink>
            ))}
          </div>
        </div>
        <div className="pt-4 border-t mt-4">
          <h3 className="px-2 text-sm font-semibold mb-1">Recent</h3>
          <Button variant="ghost" className="w-full justify-start">
            <div className="h-6 w-6 rounded-full bg-gray-500 mr-2 flex-shrink-0 flex items-center justify-center text-white text-xs">
              TM
            </div>
            Thomas Miller
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <div className="h-6 w-6 rounded-full bg-red-500 mr-2 flex-shrink-0 flex items-center justify-center text-white text-xs">
              SB
            </div>
            Sarah Brown
          </Button>
        </div>
      </div>
      <div className="p-4">
        <Button variant="outline" className="w-full bg-gray-950 text-white">
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </div>
    </ScrollArea>
  );
};
