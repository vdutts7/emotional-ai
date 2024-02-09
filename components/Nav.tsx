"use client";

import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Moon, Sun, Brain, Heart, Smile, Frown } from "lucide-react";
import Github from "./logos/GitHub";
import pkg from '@/package.json';

const icons = [Brain, Heart, Smile, Frown];

export const Nav = () => {
  const [isLightMode, setIsLightMode] = useState(false);
  const [EmotionalAIIcon, setEmotionalAIIcon] = useState(Brain);

  useEffect(() => {
    const el = document.documentElement;
    setIsLightMode(el.classList.contains("light"));
    setEmotionalAIIcon(icons[Math.floor(Math.random() * icons.length)]);
  }, []);

  const toggleLight = () => {
    const el = document.documentElement;
    el.classList.toggle("light");
    setIsLightMode((prev) => !prev);
  };

  return (
    <div className="px-4 py-2 flex items-center h-14 z-50 bg-card border-b border-border">
      <div>
        <EmotionalAIIcon className="h-5 w-auto" />
      </div>
      <div className="ml-auto flex items-center gap-1">
        <Button
          onClick={() => {
            window.open(
              "https://github.com/vdutts7/emotional-ai",
              "_blank",
              "noopener noreferrer"
            );
          }}
          variant="ghost"
          className="ml-auto flex items-center gap-1.5"
        >
          <span>
            <Github className="size-4" />
          </span>
          <span>Star on GitHub</span>
        </Button>
        <Button
          onClick={toggleLight}
          variant="ghost"
          className="ml-auto flex items-center gap-1.5"
        >
          <span>
            {isLightMode ? (
              <Moon className="size-4" />
            ) : (
              <Sun className="size-4" />
            )}
          </span>
          <span>{isLightMode ? "Dark" : "Light"} Mode</span>
        </Button>
      </div>
    </div>
  );
};