import { MessageCircleOff } from "lucide-react";

const NoChatSelectedPage = () => {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="flex flex-col items-center gap-2 text-center text-muted-foreground">
        <MessageCircleOff className="h-10 w-10 text-gray-400" />
        <h3 className="text-lg font-semibold">Chat no seleccionado</h3>
        <p className="text-sm text-gray-500">
          Selecciona una conversación para comenzar
        </p>
      </div>
    </div>
  );
};

export default NoChatSelectedPage;
