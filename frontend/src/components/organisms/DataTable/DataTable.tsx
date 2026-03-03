import { type ReactNode } from "react";
import { Button } from "../../atoms";

interface Column<T> {
  key: keyof T;
  label: string;
  render?: (value: unknown | ReactNode) => ReactNode;
}

interface DataTableProps<T extends { id: string }> {
  title: string;
  columns: Column<T>[];
  data: T[];
  onAdd?: () => void;
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;
  addButtonText?: string;
  addButtonVariant?: "primary" | "success" | "danger" | "warning" | "info";
  showEmptyState?: boolean;
  emptyStateMessage?: string;
}

export default function DataTable<T extends { id: string }>({
  title,
  columns,
  data,
  onAdd,
  onEdit,
  onDelete,
  addButtonText = "Add",
  addButtonVariant = "primary",
  showEmptyState = true,
  emptyStateMessage = "No data found",
}: DataTableProps<T>) {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold">{title}</h3>
        {onAdd && (
          <Button variant={addButtonVariant} onClick={onAdd}>
            {addButtonText}
          </Button>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-muted border-b">
              {columns.map((column) => (
                <th
                  key={String(column.key)}
                  className="px-4 py-2 text-left font-medium"
                >
                  {column.label}
                </th>
              ))}
              {(onEdit || onDelete) && (
                <th className="px-4 py-2 text-left font-medium">Actions</th>
              )}
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id} className="border-b hover:bg-muted">
                {columns.map((column) => (
                  <td key={String(column.key)} className="px-4 py-3">
                    {column.render
                      ? column.render(item[column.key])
                      : String(item[column.key])}
                  </td>
                ))}
                {(onEdit || onDelete) && (
                  <td className="px-4 py-3 space-x-2">
                    {onEdit && (
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => onEdit(item)}
                      >
                        Edit
                      </Button>
                    )}
                    {onDelete && (
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => onDelete(item)}
                      >
                        Delete
                      </Button>
                    )}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showEmptyState && data.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          <p>{emptyStateMessage}</p>
        </div>
      )}
    </div>
  );
}
