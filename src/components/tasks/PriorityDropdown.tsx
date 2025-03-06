import React, { useState } from "react";
import { IoArrowBack, IoArrowDown, IoArrowUp } from "react-icons/io5";
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
import { useAppDispatch, useAppSelector } from "@/utils/hook";
import { Priority } from "@/data/tasksData";
import { setCheckedPriorities } from "@/store/features/taskSlice";

type Status = {
  value: string;
  label: string;
  icon: IconType;
};

const statues: Status[] = [
  {
    value: "low",
    label: "Low",
    icon: IoArrowDown,
  },
  {
    value: "medium",
    label: "Medium",
    icon: IoArrowBack,
  },
  {
    value: "high",
    label: "High",
    icon: IoArrowUp,
  },
];

const PriorityDropdown: React.FC = () => {
  const { checkedPriorities } = useAppSelector((state) => state.task);
  const [open, setOpen] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const updateTheSelection = (Label: string) => {
    const validPriorities: Priority[] = ["Low", "Medium", "High"];
    if (!validPriorities.includes(Label as Priority)) {
      console.error("Invalid priority type");
      return;
    }
    const priority = Label as Priority;

    const newCheckedProrities = checkedPriorities.includes(priority)
      ? checkedPriorities.filter((p) => p !== priority)
      : [...checkedPriorities, priority];

    dispatch(setCheckedPriorities(newCheckedProrities));
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
                <span>Priority</span>
              </div>
              {checkedPriorities?.length > 0 && (
                <>
                  <Separator
                    orientation="vertical"
                    className="!h-4 border-1 border-gray-300 max-md:hidden"
                  />

                  <div className="flex items-center gap-2 max-md:hidden">
                    {checkedPriorities.map((checkedPriority) => (
                      <Badge variant="secondary" key={checkedPriority}>
                        {checkedPriority}
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
                        checked={checkedPriorities.includes(
                          status.label as Priority
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

export default PriorityDropdown;
