import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Textarea } from "~/components/ui/textarea";
import { ScrollArea } from "~/components/ui/scroll-area";
import {
  Copy,
  Download,
  ThumbsUp,
  ThumbsDown,
  Send,
  MessageSquare,
} from "lucide-react";
import type { Route } from "./+types/client-chat-page";
import { getClientMessages, sendMessage } from "~/assets/fake-data";
import { formatDate } from "~/lib/date-formater";
import { Form } from "react-router";

// export function shouldRevalidate() {
//   return false;
// }

export async function loader({ params }: Route.LoaderArgs) {
  const messages = await getClientMessages(params.id);
  return { messages };
}

export async function action({ request, params }: Route.ActionArgs) {
  const formData = await request.formData();
  const message = `${formData.get("message")}`;

  const newMessage = await sendMessage({
    sender: "agent",
    clientId: params.id,
    content: message,
    createdAt: new Date(),
  });
  return { newMessage };
}

const ClientChatPage = ({ loaderData }: Route.ComponentProps) => {
  const { messages } = loaderData;
  const [input, setInput] = useState("");

  return (
    <div className="flex-1 flex flex-col">
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.length > 0 ? (
            messages.map((message, index) => (
              <div key={index} className="w-full">
                {message.sender === "client" ? (
                  // Agent message - left aligned
                  <div className="flex gap-2 max-w-[80%]">
                    <div className="h-8 w-8 rounded-full bg-primary flex-shrink-0" />
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">NexTalk</span>
                        <span className="text-sm text-muted-foreground">
                          {formatDate(message.createdAt)}
                        </span>
                      </div>
                      <div className="p-3 bg-muted/50 rounded-lg">
                        <p className="text-sm whitespace-pre-wrap">
                          {message.content}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Copy className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <ThumbsUp className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <ThumbsDown className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ) : (
                  // User message - right aligned
                  <div className="flex flex-col items-end">
                    <div className="text-right mb-1">
                      <span className="text-sm font-medium mr-2">G5</span>
                      <span className="text-sm text-muted-foreground">
                        {formatDate(message.createdAt)}
                      </span>
                    </div>
                    <div className="bg-black text-white p-3 rounded-lg max-w-[80%]">
                      <p className="text-sm whitespace-pre-wrap">
                        {message.content}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="flex flex-col justify-center items-center">
              <MessageSquare className="h-6 w-6 text-muted-foreground" />
              <p className="text-sm text-muted-foreground h-full">
                No messages yet
              </p>
            </div>
          )}
        </div>
      </ScrollArea>
      <Form method="post" className="p-4 border-t">
        <div className="flex items-center gap-2">
          <Textarea
            placeholder="Type a message as a customer"
            value={input}
            name="message"
            onChange={(e) => setInput(e.target.value)}
            className="min-h-[44px] h-[44px] resize-none py-3"
          />
          <Button
            className="h-[44px] px-4 flex items-center gap-2"
            type="submit"
          >
            <Send className="h-4 w-4" />
            <span>Send</span>
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default ClientChatPage;
