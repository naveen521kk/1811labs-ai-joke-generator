"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { generateJoke } from "./actions";
import { SignOutButton } from "@clerk/nextjs";

export default function Home() {
  const [loading, setLoading] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [joke, setJoke] = useState<string | null>(null);
  return (
    <main className="flex min-h-screen flex-col p-24">
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        AI Joke Generator
      </h2>
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          if (!title) {
            setJoke("Please enter a title");
            return;
          }

          setLoading(true);
          setJoke("");
          const joke = await generateJoke({ title: title });
          setJoke(joke || "Failed to generate a joke");
          setLoading(false);
        }}
        className="mt-5 space-y-5"
      >
        <div className="flex w-full items-center space-x-2 ">
          <Input
            type="text"
            placeholder="Enter a title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            className="w-full"
          />
          <Button type="submit">Generate</Button>
        </div>

        <div className="mt-4 text-lg">
          {joke ? <p>{joke}</p> : <></>}
          {loading && <p>Generating a joke...</p>}
        </div>

        <SignOutButton>
          <Button>Sign out</Button>
        </SignOutButton>
      </form>
    </main>
  );
}
