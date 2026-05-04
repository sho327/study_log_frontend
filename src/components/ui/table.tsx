import React from "react";

type WithClassName<T> = T & { className?: string };

export const Table = React.forwardRef<HTMLTableElement, WithClassName<React.TableHTMLAttributes<HTMLTableElement>>>(
    ({ className, children, ...props }, ref) => (
        <table ref={ref} className={`table ${className ?? ""}`} {...props}>
            {children}
        </table>
    )
);
Table.displayName = "Table";

export const TableHead = React.forwardRef<HTMLTableSectionElement, WithClassName<React.HTMLAttributes<HTMLTableSectionElement>>>(
    ({ className, children, ...props }, ref) => (
        <thead ref={ref} className={className} {...props}>
            {children}
        </thead>
    )
);
TableHead.displayName = "TableHead";

export const TableBody = React.forwardRef<HTMLTableSectionElement, WithClassName<React.HTMLAttributes<HTMLTableSectionElement>>>(
    ({ className, children, ...props }, ref) => (
        <tbody ref={ref} className={className} {...props}>
            {children}
        </tbody>
    )
);
TableBody.displayName = "TableBody";

export const TableRow = React.forwardRef<HTMLTableRowElement, WithClassName<React.HTMLAttributes<HTMLTableRowElement>>>(
    ({ className, children, ...props }, ref) => (
        <tr ref={ref} className={className} {...props}>
            {children}
        </tr>
    )
);
TableRow.displayName = "TableRow";

export const TableHeader = React.forwardRef<HTMLTableCellElement, WithClassName<React.ThHTMLAttributes<HTMLTableCellElement>>>(
    ({ className, children, ...props }, ref) => (
        <th ref={ref} className={className} {...props}>
            {children}
        </th>
    )
);
TableHeader.displayName = "TableHeader";

export const TableCell = React.forwardRef<HTMLTableCellElement, WithClassName<React.TdHTMLAttributes<HTMLTableCellElement>>>(
    ({ className, children, ...props }, ref) => (
        <td ref={ref} className={className} {...props}>
            {children}
        </td>
    )
);
TableCell.displayName = "TableCell";
