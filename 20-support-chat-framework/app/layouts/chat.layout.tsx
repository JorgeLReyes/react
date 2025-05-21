import { X } from "lucide-react";
import { Link, Outlet, redirect } from "react-router";
import { getClients } from "~/assets/fake-data";
import { ContactInformationCard } from "~/chat/components/ContactInformationCard";
import { ContactList } from "~/chat/components/ContactList";
import { Button } from "~/components/ui/button";
import type { Route } from "./+types/chat.layout";
import { getSession } from "~/sessions.server";

export async function loader({ request, params }: Route.LoaderArgs) {
  const session = await getSession(request.headers.get("Cookie"));

  if (!session.has("userId")) return redirect("/auth/login");
  const { id } = params;

  const clients = await getClients();
  const client = clients.find((client) => client.id === params.id);
  return { clients, name: session.get("name"), client, id };
}

const ChatLayout = ({ loaderData }: Route.ComponentProps) => {
  const { clients, client } = loaderData;

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div className="w-64 border-r bg-muted/10">
        <div className="p-4 border-b">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-full bg-primary" />
            <Link to={"/chat"} className="font-semibold">
              {loaderData.name}
            </Link>
          </div>
        </div>
        <ContactList clients={clients} />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex">
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="h-14 border-b px-4 flex items-center justify-between">
            <div></div> {/* Empty div to maintain spacing */}
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm">
                Save conversation
              </Button>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <X className="h-4 w-4" />
              </Button>
            </div>
          </header>
          <Outlet />
        </div>

        {/* Right Panel - Contact Details */}
        <div className="w-80 border-l">
          <div className="h-14 border-b px-4 flex items-center">
            <h2 className="font-medium">Contact details</h2>
          </div>
          <ContactInformationCard />
        </div>
      </div>
    </div>
  );
};

export default ChatLayout;
