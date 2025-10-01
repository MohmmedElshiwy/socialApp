import {Card, Skeleton} from "@heroui/react";

export default function PostSkelton() {
  return (
    <Card className="w-full space-y-5 p-4" radius="lg">
        <div className="max-w-[300px] w-full flex items-center gap-3">
      <div>
        <Skeleton className="flex rounded-full w-12 h-12" />
      </div>
      <div className="w-full flex flex-col gap-2">
        <Skeleton className="h-3 w-3/5 rounded-lg" />
        <Skeleton className="h-3 w-4/5 rounded-lg" />
      </div>
    </div>
      <Skeleton className="rounded-lg">
        <div className="h-96 rounded-lg bg-default-300" />
      </Skeleton>
      
            <div className="space-y-3">
        <Skeleton className="w-full h-7 rounded-lg">
          <div className="h-3 w-3/5 rounded-lg bg-default-200" />
        </Skeleton>

        <Skeleton className="w-full h-10 rounded-lg">
          <div className="h-3 w-4/5 rounded-lg bg-default-200" />
        </Skeleton>

      </div>
    </Card>
  );
}
