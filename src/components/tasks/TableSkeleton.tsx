import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const TableSkeleton: React.FC = () => {
  return (
    <>
      <div className="border rounded-lg">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              {[
                "id",
                "Title",
                "Description",
                "Status",
                "Priority",
                "Due Date",
                "Actions",
              ].map((header) => (
                <th className="p-3 text-left" key={header}>
                  <Skeleton className="h-7 w-3/4" />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 4 }).map((_, index) => (
              <tr key={index} className="border-t">
                {Array.from({ length: 7 }).map((_, colIdx) => (
                  <td className="p-3" key={colIdx}>
                    <Skeleton className="h-5 w-full" />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default TableSkeleton;
