import styled from '@emotion/styled';
import { ChevronDown, Search, Utensils } from 'lucide-react';
import { MEAL_TYPES } from '../api/recipes';

const FilterContainer = styled.div`
  display: flex;
  gap: 1rem;
  background: white;
  padding: 1.5rem;
  border-radius: ${(props) => props.theme.borderRadius.lg};
  box-shadow: ${(props) => props.theme.shadows.sm};
  flex-wrap: wrap;
  align-items: center;
`;

const InputGroup = styled.div`
  position: relative;
  flex-grow: 1;
  min-width: 200px;
`;

const IconWrapper = styled.div`
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: ${(props) => props.theme.colors.text.light};
  pointer-events: none;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px 10px 10px 40px;
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: ${(props) => props.theme.borderRadius.md};
  font-size: 1rem;
  outline: none;
  transition: border-color 0.2s;

  &:focus {
    border-color: ${(props) => props.theme.colors.primary};
  }
`;

const SelectGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  position: relative;
`;

const Select = styled.select`
  padding: 10px 35px 10px 15px;
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: ${(props) => props.theme.borderRadius.md};
  font-size: 0.95rem;
  background-color: white;
  cursor: pointer;
  appearance: none;
  min-width: 150px;

  &:focus {
    border-color: ${(props) => props.theme.colors.primary};
    outline: none;
  }
`;

const RelativeWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const SelectIcon = styled(ChevronDown)`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: ${(props) => props.theme.colors.text.light};
  pointer-events: none;
  width: 16px;
`;

interface RecipeFiltersProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  mealType: string;
  onMealTypeChange: (value: string) => void;
  sortBy: string;
  onSortChange: (value: string) => void;
}

export default function RecipeFilters({
  searchQuery,
  onSearchChange,
  mealType,
  onMealTypeChange,
  sortBy,
  onSortChange,
}: RecipeFiltersProps) {
  return (
    <FilterContainer>
      <InputGroup>
        <IconWrapper>
          <Search size={18} />
        </IconWrapper>
        <Input
          placeholder="Поиск..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </InputGroup>

      <SelectGroup>
        <Utensils size={18} color="#666" />
        <RelativeWrapper>
          <Select
            value={mealType}
            onChange={(e) => onMealTypeChange(e.target.value)}
          >
            {MEAL_TYPES.map((type) => (
              <option key={type} value={type}>
                {type === 'All' ? 'Все типы' : type}
              </option>
            ))}
          </Select>
          <SelectIcon />
        </RelativeWrapper>
      </SelectGroup>

      <SelectGroup>
        <RelativeWrapper>
          <Select value={sortBy} onChange={(e) => onSortChange(e.target.value)}>
            <option value="">По умолчанию</option>
            <option value="rating">По рейтингу</option>
            <option value="caloriesPerServing">По калориям</option>
            <option value="reviewCount">По отзывам</option>
            <option value="cookTimeMinutes">По времени готовки</option>
          </Select>
          <SelectIcon />
        </RelativeWrapper>
      </SelectGroup>
    </FilterContainer>
  );
}
