import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Copy,
  Download,
  ThumbsUp,
  ThumbsDown,
  Send,
  Loader2,
} from "lucide-react";
import { useParams } from "react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getClientMessages, sendMessage } from "@/assets/fake-data";
import type { Message } from "../interfaces/chat.interface";

export default function ChatPage() {
  const { chatId } = useParams();
  const [input, setInput] = useState("");
  const queryClient = useQueryClient();

  const { data: messages, isLoading } = useQuery({
    queryKey: ["messages", chatId],
    queryFn: () => getClientMessages(chatId ?? ""),
  });

  const { mutate: sendMessageMutation } = useMutation({
    mutationFn: sendMessage,
    onSuccess: (newMessage) => {
      queryClient.setQueryData(
        ["messages", chatId],
        (oldMessages: Message[]) => [...oldMessages, newMessage]
      );
    },
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    sendMessageMutation({
      content: input,
      clientId: chatId!,
      createdAt: new Date(),
      sender: "client",
    });
    setInput("");
  };

  if (isLoading)
    return (
      <div className="flex-1 flex flex-col items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin" />
      </div>
    );

  return (
    <div className="flex-1 flex flex-col overflow-y-hidden">
      {messages?.length ? (
        <ScrollArea className="flex-1 p-4 overflow-y-auto">
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div key={index} className="w-full">
                {message.sender === "agent" ? (
                  // Agent message - left aligned
                  <div className="flex gap-2 max-w-[80%]">
                    <div className="h-8 w-8 rounded-full bg-primary flex-shrink-0" />
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">NexTalk</span>
                        <span className="text-sm text-muted-foreground">
                          {message.createdAt.toLocaleTimeString()}
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
                        {message.createdAt.toLocaleDateString()}
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
            ))}
          </div>
        </ScrollArea>
      ) : (
        <div className="flex-1 flex flex-col justify-center">
          <p className="text-sm text-muted-foreground text-center">
            No messages yet. Start a conversation with G5
          </p>
        </div>
      )}
      <div className="p-4 border-t">
        <form onSubmit={handleSubmit}>
          <div className="flex items-center gap-2">
            <Textarea
              placeholder="Type a message as a customer"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="min-h-[44px] h-[44px] resize-none py-3"
            />
            <Button className="h-[44px] px-4 flex items-center gap-2">
              <Send className="h-4 w-4" />
              <span>Send</span>
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
