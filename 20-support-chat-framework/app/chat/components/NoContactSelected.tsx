import { MessageSquare } from "lucide-react";

export const NoContactSelected = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center px-4 gap-4 text-muted-foreground">
      <div className="rounded-full bg-muted p-4 shadow-sm">
        <MessageSquare className="w-8 h-8 text-muted-foreground" />
      </div>
      <div>
        <h3 className="text-lg font-semibold">Chat no seleccionado</h3>
        <p className="text-sm text-muted-foreground">
          Por favor, seleccione un cliente para comenzar una conversación.
        </p>
      </div>
    </div>
  );
};
