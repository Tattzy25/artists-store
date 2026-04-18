"use client";

import Image from "next/image";
import { useState } from "react";
import { X, Upload, Heart, Share, Download, Edit2 } from "lucide-react";
import { Button } from "./ui/button";
import { AspectRatio } from "./ui/aspect-ratio";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";

type PreviewProps = {
  url: string;
  priority?: boolean;
};

export const Preview = ({ url, priority }: PreviewProps) => {
  const [colorType, setColorType] = useState("black");
  const [thumbnail, setThumbnail] = useState<string | null>(null);
  const [promptText, setPromptText] = useState("");
  const [styleText, setStyleText] = useState("");
  const [flipped, setFlipped] = useState(false);
  
  // Drawer states
  const [isTopDrawerOpen, setIsTopDrawerOpen] = useState(false);
  const [isBottomDrawerOpen, setIsBottomDrawerOpen] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setThumbnail(URL.createObjectURL(file));
    }
  };

  const handleInkMeUp = () => {
    // Open bottom drawer immediately. The bottom drawer opening will visually push up/overlay the top drawer
    setIsBottomDrawerOpen(true);
    // Close the top drawer slightly after so the bottom drawer has time to start animating up
    setTimeout(() => {
      setIsTopDrawerOpen(false);
    }, 50);
  };

  const handleEditImage = () => {
    // Set the original generated image as the new thumbnail
    setThumbnail(url);
    // Close bottom drawer and open top drawer to edit
    setIsBottomDrawerOpen(false);
    setTimeout(() => {
      setIsTopDrawerOpen(true);
    }, 100);
  };

  return (
    <div className="group mb-4 [perspective:1000px]">
      <div 
        className={`relative transition-all duration-500 [transform-style:preserve-3d] rounded-xl bg-card p-2 shadow-xl cursor-pointer md:group-hover:[transform:rotateY(180deg)] ${flipped ? "[transform:rotateY(180deg)]" : ""}`}
        onClick={() => setFlipped(!flipped)}
      >
        {/* Front Face */}
        <div className="[backface-visibility:hidden]">
          <Image
            alt="Tattoo design preview"
            className="rounded-md w-full h-[600px] object-cover"
            height={600}
            priority={priority}
            sizes="600px"
            src={url}
            width={600}
          />
        </div>

        {/* Back Face */}
        <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] flex flex-col px-2 py-[3px]">
          <Drawer direction="top" open={isTopDrawerOpen} onOpenChange={setIsTopDrawerOpen}>
            <Card className="w-full h-full flex flex-col border-none shadow-none bg-transparent p-0 gap-0">
              {/* Header: Sticky at the top */}
              {/* DO NOT modify padding values: pt-4 px-4 pb-8 keeps the Body section at a breathable ~460px height */}
              <CardHeader className="shrink-0 flex-none pt-4 px-4 pb-8">
                <CardTitle className="text-center text-xl">Image Actions</CardTitle>
              </CardHeader>

              {/* Body: Scrollable region between the header and footer */}
              {/* DO NOT modify padding values: This section automatically fills to ~460px height */}
              <CardContent className="flex-1 overflow-y-auto flex flex-col items-center justify-center py-4 px-4">
                <p className="text-sm text-muted-foreground text-center">Flip over to create.</p>
              </CardContent>

              {/* Footer: Sticky at the bottom */}
              {/* DO NOT modify padding values: pt-8 pb-4 px-4 keeps the Body section at a breathable ~460px height */}
              <CardFooter className="shrink-0 flex-none flex justify-center pt-8 pb-4 px-4">
                <DrawerTrigger asChild>
                  <Button className="w-full h-12 text-md">Create</Button>
                </DrawerTrigger>
              </CardFooter>
            </Card>

            <DrawerContent className="h-[85vh] md:h-[45vh] flex flex-col">
              {/* Header with Title, Displays, and X button */}
              <DrawerHeader className="relative px-6 md:px-[50px] py-4 shrink-0 flex items-start sm:items-center pr-12">
                <div className="flex flex-wrap items-center gap-x-6 gap-y-1">
                  <DrawerTitle className="text-xl font-bold tracking-tight">/tattty_4_all</DrawerTitle>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm sm:border-l sm:border-border sm:pl-4">
                    <div><span className="font-semibold text-foreground/80">Trigger:</span> <span className="text-muted-foreground">tattty_style</span></div>
                    <div><span className="font-semibold text-foreground/80">Artist:</span> <span className="text-muted-foreground">Tattzy</span></div>
                  </div>
                </div>
                <DrawerClose asChild>
                  <Button variant="ghost" size="icon" className="absolute right-4 md:right-[50px] top-4">
                    <X className="w-5 h-5" />
                  </Button>
                </DrawerClose>
              </DrawerHeader>

              {/* Content Body - 3 Columns */}
              <div className="flex-1 px-6 md:px-[50px] pb-2 overflow-y-auto md:overflow-hidden flex flex-col">
                <div className="flex flex-col md:flex-row gap-8 h-full w-full">
                  
                  {/* Left Area: Upload & Prompt */}
                  <div className="flex flex-col gap-2 flex-[1.4] h-[150px] md:h-full pb-2">
                    <div className="flex gap-4 h-full">
                      {/* Image Upload Thumbnail */}
                      <div className="relative w-28 h-full border border-dashed border-muted-foreground/50 hover:border-primary transition-colors rounded-lg flex flex-col items-center justify-center overflow-hidden bg-muted/10 shrink-0 group/upload">
                        {thumbnail ? (
                          <>
                            <Image src={thumbnail} alt="thumbnail" className="object-cover w-full h-full" width={112} height={112} unoptimized />
                            <Button 
                              variant="destructive" 
                              size="icon" 
                              className="absolute top-1 right-1 w-6 h-6 rounded-full opacity-0 group-hover/upload:opacity-100 transition-opacity z-10"
                              onClick={(e) => { e.preventDefault(); setThumbnail(null); }}
                            >
                              <X className="w-3 h-3" />
                            </Button>
                          </>
                        ) : (
                          <>
                            <Upload className="w-6 h-6 text-muted-foreground mb-1" />
                            <span className="text-[10px] text-muted-foreground uppercase font-semibold">Upload</span>
                            <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={handleImageUpload} accept="image/*" />
                          </>
                        )}
                      </div>
                      
                      {/* Prompt Textarea */}
                      <div className="flex-1 flex flex-col">
                        <Label htmlFor="prompt" className="mb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Prompt / Description</Label>
                        <Textarea
                          id="prompt"
                          value={promptText}
                          onChange={(e) => setPromptText(e.target.value)}
                          className="flex-1 resize-none text-sm bg-muted/5 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
                          placeholder="Describe your tattoo design..."
                        />
                      </div>
                    </div>
                  </div>

                  {/* Middle Area: Style & Color Preference */}
                  <div className="flex flex-col gap-4 flex-1 justify-start">
                    <div>
                      <Label htmlFor="style" className="mb-2 block text-xs font-semibold text-muted-foreground uppercase tracking-wider">Style</Label>
                      <Input 
                        id="style" 
                        value={styleText}
                        onChange={(e) => setStyleText(e.target.value)}
                        className="h-10 text-sm bg-muted/5" 
                        placeholder="e.g. Traditional, Realism" 
                      />
                    </div>

                    <div>
                      <Label className="mb-2 block text-xs font-semibold text-muted-foreground uppercase tracking-wider">Color Preference</Label>
                      <div className="grid grid-cols-2 gap-3">
                        <div
                          className={`border rounded-lg p-3 cursor-pointer text-center flex items-center justify-center transition-all ${
                            colorType === "black" ? "border-primary bg-primary/10 shadow-sm" : "border-border hover:bg-muted/50"
                          }`}
                          onClick={() => setColorType("black")}
                        >
                          <span className="font-medium text-sm">Black & Grey</span>
                        </div>
                        <div
                          className={`border rounded-lg p-3 cursor-pointer text-center flex items-center justify-center transition-all ${
                            colorType === "color" ? "border-primary bg-primary/10 shadow-sm" : "border-border hover:bg-muted/50"
                          }`}
                          onClick={() => setColorType("color")}
                        >
                          <span className="font-medium text-sm">Color</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Area: Model Description */}
                  <div className="flex flex-col flex-[1.6] h-full md:pl-6 md:border-l border-border/50">
                    <Label className="mb-2 block text-xs font-semibold text-muted-foreground uppercase tracking-wider">Model Description</Label>
                    <div className="text-sm text-foreground/80 leading-relaxed bg-muted/10 p-4 rounded-lg flex-1">
                      This model specializes in creating high-quality, detailed tattoo designs. Whether you prefer classic traditional styles, intricate fine-line work, or bold color pieces, it generates clean artwork ready for your tattoo artist to reference.
                    </div>
                  </div>

                </div>
              </div>

              {/* Centered INK ME UP Button */}
              <div className="w-full shrink-0 flex justify-center pb-6 pt-2 px-6 md:px-[50px]">
                <Button 
                  className="w-full max-w-[300px] h-12 text-lg font-bold uppercase tracking-wider rounded-full shadow-md"
                  onClick={handleInkMeUp}
                >
                  INK ME UP
                </Button>
              </div>
            </DrawerContent>
          </Drawer>

          {/* Bottom Drawer for Generated Results */}
          <Drawer direction="bottom" open={isBottomDrawerOpen} onOpenChange={setIsBottomDrawerOpen}>
            <DrawerContent className="fixed bottom-0 left-0 right-0 h-[90vh] flex flex-col">
              {/* Absolute X Button in Top Right */}
              <DrawerClose asChild>
                <Button variant="ghost" size="icon" className="absolute top-4 right-4 md:right-[50px] z-50">
                  <X className="w-6 h-6" />
                  <span className="sr-only">Close</span>
                </Button>
              </DrawerClose>
              
              {/* Visually hidden title for accessibility */}
              <DrawerTitle className="sr-only">Generated Tattoo Result</DrawerTitle>

              {/* Main Content Area */}
              <div className="flex-1 flex flex-col items-center justify-center px-6 md:px-[50px] h-full py-6">
                
                {/* Center Image Area - Uses a style object for object-contain while enforcing a dynamically rounded shape on the image itself */}
                <div className="relative h-full w-full flex justify-center items-center overflow-hidden">
                  <img
                    src={url}
                    alt="Generated tattoo design"
                    className="h-full w-auto object-contain rounded-2xl drop-shadow-2xl"
                  />
                </div>
                
              </div>
            </DrawerContent>
          </Drawer>
        </div>
      </div>
    </div>
  );
};
