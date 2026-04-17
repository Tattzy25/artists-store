import Image from "next/image";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer";

type PreviewProps = {
  url: string;
  priority?: boolean;
};

export const Preview = ({ url, priority }: PreviewProps) => (
  <div className="group mb-4 [perspective:1000px]">
    <div className="relative transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] rounded-xl bg-card p-2 shadow-xl">
      {/* Front Face */}
      <div className="[backface-visibility:hidden]">
        <Image
          alt={url}
          className="rounded-md w-full h-[600px] object-cover"
          height={600}
          priority={priority}
          sizes="600px"
          src={url}
          width={600}
        />
      </div>

      {/* Back Face */}
      <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] flex flex-col p-2">
        <Drawer direction="top">
          <Card className="w-full h-full flex flex-col border-none shadow-none bg-transparent">
            {/* Header: Sticky at the top */}
            <CardHeader className="shrink-0 flex-none pb-2">
              <CardTitle className="text-center">Image Actions</CardTitle>
            </CardHeader>
            
            {/* Body: Scrollable region between the header and footer */}
            <CardContent className="flex-1 overflow-y-auto flex flex-col items-center justify-center py-4">
              <p className="text-sm text-muted-foreground text-center">Flip over to create.</p>
            </CardContent>
            
            {/* Footer: Sticky at the bottom */}
            <CardFooter className="shrink-0 flex-none flex justify-center pt-2 pb-4">
              <DrawerTrigger asChild>
                <Button className="w-full">Create</Button>
              </DrawerTrigger>
            </CardFooter>
          </Card>

          <DrawerContent className="h-[70vh] md:h-[40vh] flex flex-col">
            <DrawerHeader>
              <DrawerTitle>Create Action</DrawerTitle>
              <DrawerDescription>Perform an action on this image.</DrawerDescription>
            </DrawerHeader>
            <div className="flex-1 p-4 flex items-center justify-center">
              {/* Add any drawer content here */}
              <p>Top Drawer content for image: {url.slice(-10)}</p>
            </div>
            <DrawerFooter>
              <DrawerClose asChild>
                <Button variant="outline">Cancel</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>
    </div>
  </div>
);
