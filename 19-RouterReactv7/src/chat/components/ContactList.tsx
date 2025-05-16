import { getClients } from "@/assets/fake-data";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { NavLink, useParams } from "react-router";

export const ContactList = ({ children }: { children?: React.ReactNode }) => {
  const { chatId } = useParams();

  const { data: clients, isLoading } = useQuery({
    queryKey: ["clients"],
    queryFn: () => getClients(),
    // Marca los datos como obsoletos después de 5 min; no se actualizan solos, solo al volver a usarlos.
    staleTime: 1000 * 60 * 5,
  });

  return (
    <ScrollArea className="h-[calc(100vh-64px)]">
      <div className="space-y-4 p-4">
        <div className="space-y-1">
          <h3 className="px-2 text-sm font-semibold">Contacts</h3>
          <div className="space-y-1">
            {isLoading && (
              <div className="w-full flex justify-center items-center">
                <Loader2 className="w-4 h-4 animate-spin" />
              </div>
            )}
            {clients?.map((client) => (
              <NavLink
                key={client.id}
                to={`/chat/${client.id}`}
                className={({ isActive }) =>
                  `w-full flex justify-start transition-all duration-300 rounded-md px-2 pt-1 pb-1 ${
                    isActive ? "bg-primary/5" : ""
                  }`
                }
              >
                <div
                  className={`h-6 w-6 rounded-full mr-2 flex-shrink-0 flex items-center justify-center text-white text-xs transition-all duration-300 ${
                    chatId === client.id ? "bg-blue-500" : "bg-gray-300"
                  }`}
                >
                  {client.name.slice(0, 2)}
                </div>
                <span
                  className={`transition-all duration-300 ${
                    chatId === client.id ? "text-blue-500" : "text-gray-500"
                  }`}
                >
                  {client.name}
                </span>
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
      {children}
    </ScrollArea>
  );
};
