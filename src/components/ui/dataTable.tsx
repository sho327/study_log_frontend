"use client";

import { useState, useMemo } from 'react';
import { Pagination } from './pagination';
import { Button } from './button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './table';

type SortDirection = 'asc' | 'desc';

interface Column<T> {
  key: keyof T;
  label: string;
}

interface DataTableProps<T extends { id: number | string }> {
  data: T[];
  columns: Column<T>[];
  itemsPerPage?: number;
  onDeleteSelected?: (selectedIds: (number | string)[]) => void;
}

export function DataTable<T extends { id: number | string;[key: string]: any }>({
  data,
  columns,
  itemsPerPage = 10,
  onDeleteSelected,
}: DataTableProps<T>) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<keyof T>('created' as keyof T);
  const [sortDir, setSortDir] = useState<SortDirection>('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedItems, setSelectedItems] = useState<(number | string)[]>([]);

  const filteredData = useMemo(() => {
    if (!searchTerm) return data;
    const lowerCaseSearch = searchTerm.toLowerCase();
    return data.filter(item =>
      Object.values(item).some(value =>
        String(value).toLowerCase().includes(lowerCaseSearch)
      )
    );
  }, [data, searchTerm]);

  const sortedData = useMemo(() => {
    const sorted = [...filteredData].sort((a, b) => {
      const aVal = String(a[sortBy]).toLowerCase();
      const bVal = String(b[sortBy]).toLowerCase();

      if (aVal < bVal) return sortDir === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortDir === 'asc' ? 1 : -1;
      return 0;
    });
    if (currentPage !== 1) setCurrentPage(1);
    return sorted;
  }, [filteredData, sortBy, sortDir]);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return sortedData.slice(start, end);
  }, [sortedData, currentPage, itemsPerPage]);

  const totalPages = useMemo(() => {
    return Math.ceil(filteredData.length / itemsPerPage);
  }, [filteredData, itemsPerPage]);

  const currentItemIds = useMemo(() => {
    return paginatedData.map(item => item.id);
  }, [paginatedData]);

  const isAllSelected = useMemo(() => {
    if (currentItemIds.length === 0) return false;
    return currentItemIds.every(id => selectedItems.includes(id));
  }, [currentItemIds, selectedItems]);

  const handleSort = (key: keyof T) => {
    if (sortBy === key) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(key);
      setSortDir('desc');
    }
  };

  const toggleAll = () => {
    if (isAllSelected) {
      setSelectedItems(selectedItems.filter(id => !currentItemIds.includes(id)));
    } else {
      const newSelectedItems = [...new Set([...selectedItems, ...currentItemIds])];
      setSelectedItems(newSelectedItems);
    }
  };

  const toggleItem = (id: number | string) => {
    setSelectedItems(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleDelete = () => {
    if (onDeleteSelected) {
      onDeleteSelected(selectedItems);
      setSelectedItems([]);
    }
  };

  return (
    <div className="card bg-base-100 shadow-lg modern-card p-0">
      <div className="p-4 sm:p-6 border-b border-base-200 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="form-control w-full md:w-80 order-2 md:order-1">
          <div className="input-group">
            <input
              type="text"
              placeholder="キーワード検索..."
              className="input input-bordered w-full bg-base-200"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button variant="ghost" className="btn-square">
              <i className="fas fa-search"></i>
            </Button>
          </div>
        </div>

        {selectedItems.length > 0 && (
          <div className="flex items-center gap-3 order-3 md:order-2">
            <span className="text-sm font-semibold text-primary">
              {selectedItems.length} 件選択中
            </span>
            {onDeleteSelected && (
              <Button variant="outline" className="btn-sm btn-error rounded-md" onClick={handleDelete}>
                <i className="fas fa-trash-alt mr-1"></i> 一括削除
              </Button>
            )}
          </div>
        )}
      </div>

      <div className="p-4 border-b border-base-200 flex justify-center items-center">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={goToPage}
          variant="circular"
        />
      </div>

      <div className="table-wrapper">
        <div className="table-container">
          <Table className="w-full table-lg">
            <TableHead className="bg-base-100 sticky top-0 z-10 shadow-sm border-b border-base-200">
              <TableRow>
                <TableHeader className="table-checkbox-cell p-4">
                  <label className="flex items-center justify-center h-full">
                    <input
                      type="checkbox"
                      className="checkbox checkbox-primary"
                      checked={isAllSelected}
                      onChange={toggleAll}
                    />
                  </label>
                </TableHeader>
                {columns.map(col => (
                  <TableHeader
                    key={String(col.key)}
                    onClick={() => handleSort(col.key)}
                    className="cursor-pointer hover:bg-base-200/50 transition-colors p-4 whitespace-nowrap"
                  >
                    <div className="flex items-center justify-between">
                      <span>{col.label}</span>
                      <i className={`sort-icon fas ${sortBy === col.key ? (sortDir === 'asc' ? 'fa-sort-up sort-active' : 'fa-sort-down sort-active') : 'fa-sort'}`}></i>
                    </div>
                  </TableHeader>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedData.length > 0 ? (
                paginatedData.map(item => (
                  <TableRow key={item.id} className="hover:bg-base-200/50">
                    <TableCell className="table-checkbox-cell">
                      <label className="flex items-center justify-center h-full">
                        <input
                          type="checkbox"
                          className="checkbox checkbox-primary"
                          checked={selectedItems.includes(item.id)}
                          onChange={() => toggleItem(item.id)}
                        />
                      </label>
                    </TableCell>
                    {columns.map(col => (
                      <TableCell key={String(col.key)} className="whitespace-nowrap">
                        {item[col.key]}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length + 1} className="text-center py-10 text-base-content/70">
                    該当するデータが見つかりません。
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <div className="p-4 sm:p-6 border-t border-base-200 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-sm text-base-content/70 order-2 md:order-1">
          全 {filteredData.length} 件中 {(currentPage - 1) * itemsPerPage + 1} - {Math.min(currentPage * itemsPerPage, filteredData.length)} 件を表示
        </p>
        <div className="order-1 md:order-2">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={goToPage}
            variant="joined"
          />
        </div>
      </div>
    </div>
  );
}
