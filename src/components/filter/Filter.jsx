import { setFilter } from 'redux/filterSlice';
import { getContactsFilter } from 'redux/selectors';

import { FilterWrapper, FilterLabel, FilterInput } from './Filter.styled';
import { useDispatch, useSelector } from 'react-redux';

const Filter = ({ value, onChange }) => {
  const filteredValue = useSelector(getContactsFilter);
  const dispatch = useDispatch();

  const handleChangeFilter = e => {
    dispatch(setFilter(e.target.value));
  };

  return (
    <FilterWrapper>
      <FilterLabel>
        Find contacts by name/number
        <FilterInput
          type="text"
          value={filteredValue}
          onChange={handleChangeFilter}
        />
      </FilterLabel>
    </FilterWrapper>
  );
};

export default Filter;
