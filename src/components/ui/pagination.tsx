"use client";

import { useMemo } from 'react';
import { Button } from './button';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  variant?: 'circular' | 'joined';
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  variant = 'joined',
}: PaginationProps) {

  const visiblePages = useMemo(() => {
    const total = totalPages;
    const current = currentPage;
    const maxVisible = 5;

    if (total <= maxVisible) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }

    let start = Math.max(1, current - Math.floor(maxVisible / 2));
    let end = Math.min(total, start + maxVisible - 1);

    if (end === total) {
      start = Math.max(1, total - maxVisible + 1);
    } else if (start === 1) {
      end = Math.min(total, maxVisible);
    }

    const pages = [];
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  }, [totalPages, currentPage]);

  const isCircular = variant === 'circular';

  return (
    <div className={isCircular ? "flex items-center space-x-2" : "join"}>
      <Button
        className={isCircular ? "btn-sm btn-circle" : "join-item btn-sm"}
        variant={isCircular ? "ghost" : "outline"}
        title="最初へ"
        disabled={currentPage === 1}
        onClick={() => onPageChange(1)}
      >
        <i className="fas fa-angle-double-left"></i>
      </Button>
      <Button
        className={isCircular ? "btn-sm btn-circle" : "join-item btn-sm"}
        variant={isCircular ? "ghost" : "outline"}
        title="前へ"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        <i className="fas fa-angle-left"></i>
      </Button>

      {visiblePages.map(page => (
        <Button
          key={page}
          className={isCircular ? "btn-sm btn-circle" : "join-item btn-sm"}
          variant={currentPage === page ? "primary" : (isCircular ? "ghost" : "outline")}
          onClick={() => onPageChange(page)}
          disabled={totalPages === 0}
        >
          <span>{page}</span>
        </Button>
      ))}

      <Button
        className={isCircular ? "btn-sm btn-circle" : "join-item btn-sm"}
        variant={isCircular ? "ghost" : "outline"}
        title="次へ"
        disabled={currentPage === totalPages || totalPages === 0}
        onClick={() => onPageChange(currentPage + 1)}
      >
        <i className="fas fa-angle-right"></i>
      </Button>
      <Button
        className={isCircular ? "btn-sm btn-circle" : "join-item btn-sm"}
        variant={isCircular ? "ghost" : "outline"}
        title="最後へ"
        disabled={currentPage === totalPages || totalPages === 0}
        onClick={() => onPageChange(totalPages)}
      >
        <i className="fas fa-angle-double-right"></i>
      </Button>
    </div>
  );
}