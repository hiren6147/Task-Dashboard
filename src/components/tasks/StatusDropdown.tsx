import React, { useState } from "react";
import { GoPlusCircle } from "react-icons/go";
import { IconType } from "react-icons/lib";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "../ui/badge";
import {
  Command,
  CommandList,
  CommandEmpty,
  CommandInput,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";
import { Checkbox } from "../ui/checkbox";
import { ArrowUpCircle, CheckCircle2, Circle } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/utils/hook";
import { setCheckedStatues } from "@/store/features/taskSlice";
import { Status } from "@/data/tasksData";

type taskStatus = {
  value: string;
  label: string;
  icon: IconType;
};

const statues: taskStatus[] = [
  {
    value: "Todo",
    label: "Todo",
    icon: Circle,
  },
  {
    value: "In Progress",
    label: "In Progress",
    icon: ArrowUpCircle,
  },
  {
    value: "Complete",
    label: "Complete",
    icon: CheckCircle2,
  },
];

const StatusDropdown: React.FC = () => {
  const { checkedStatues } = useAppSelector((state) => state.task);
  const [open, setOpen] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const updateTheSelection = (Label: string) => {
    const validStatues: Status[] = ["Todo", "In Progress", "Complete"];
    if (!validStatues.includes(Label as Status)) {
      console.error("Invalid status type");
      return;
    }
    const status = Label as Status;

    const newCheckedStatues = checkedStatues.includes(status)
      ? checkedStatues.filter((p) => p !== status)
      : [...checkedStatues, status];

    dispatch(setCheckedStatues(newCheckedStatues));
  };

  return (
    <div className="flex items-center space-x-4">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            size="sm"
            variant="outline"
            className="h-10 justify-start border-dashed px-5"
          >
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <GoPlusCircle />
                <span>Status</span>
              </div>
              {checkedStatues?.length > 0 && (
                <>
                  <Separator
                    orientation="vertical"
                    className="!h-4 border-1 border-gray-300 max-md:hidden"
                  />

                  <div className="flex items-center gap-2 max-md:hidden">
                    {checkedStatues.map((checkedStatus) => (
                      <Badge variant="secondary" key={checkedStatus}>
                        {checkedStatus}
                      </Badge>
                    ))}
                  </div>
                </>
              )}
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0 w-52" side="bottom" align="center">
          <Command>
            <CommandInput placeholder="Change Priority..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                {statues?.map((status) => (
                  <CommandItem
                    key={status?.value}
                    value={status?.value}
                    className="justify-between flex"
                    onSelect={() => updateTheSelection(status.label)}
                  >
                    <div className="flex items-center gap-3">
                      <Checkbox
                        checked={checkedStatues.includes(
                          status.label as Status
                        )}
                      />
                      <status.icon />
                      <span>{status?.label}</span>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default StatusDropdown;
