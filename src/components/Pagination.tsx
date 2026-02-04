import styled from '@emotion/styled';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  padding-bottom: 2rem;
`;

const PageButton = styled.button<{ $active?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: ${(props) => props.theme.borderRadius.md};
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s ease;

  background-color: ${(props) =>
    props.$active ? props.theme.colors.primary : 'white'};
  color: ${(props) => (props.$active ? 'white' : props.theme.colors.text.main)};
  border: 1px solid
    ${(props) =>
      props.$active ? props.theme.colors.primary : props.theme.colors.border};

  &:hover:not(:disabled) {
    border-color: ${(props) => props.theme.colors.primary};
    color: ${(props) => (props.$active ? 'white' : props.theme.colors.primary)};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    background-color: #f5f5f5;
  }
`;

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  isLoading?: boolean;
}

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  isLoading,
}: PaginationProps) => {
  if (totalPages <= 1) return null;

  const pagesArray = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <Container>
      <PageButton
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <ChevronLeft size={20} />
      </PageButton>

      {pagesArray.map((pageNum) => (
        <PageButton
          key={pageNum}
          onClick={() => onPageChange(pageNum)}
          $active={currentPage === pageNum}
          disabled={isLoading}
        >
          {pageNum}
        </PageButton>
      ))}

      <PageButton
        onClick={() => onPageChange(currentPage + 1)}
        disabled={isLoading || currentPage === totalPages}
      >
        <ChevronRight size={20} />
      </PageButton>
    </Container>
  );
};
