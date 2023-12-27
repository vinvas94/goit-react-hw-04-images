import { useState } from 'react';
import { toast } from 'react-toastify';
import {
  SearchbarHeader,
  SearchForm,
  SearchFormButton,
  SearchFormInput,
} from './Searchbar.styled';

const Searchbar = ({ onSubmit }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = event => {
    event.preventDefault();
    if (inputValue.trim() === '') {
      toast.error('Write something in the search');
      return;
    }
    onSubmit(inputValue);
    setInputValue('');
  };

  const handleChange = event => {
    setInputValue(event.target.value);
  };

  return (
    <SearchbarHeader>
      <SearchForm onSubmit={handleSubmit}>
        <SearchFormInput
          type="text"
          value={inputValue}
          onChange={handleChange}
          placeholder="Enter your search term"
        />
        <SearchFormButton type="submit">Search</SearchFormButton>
      </SearchForm>
    </SearchbarHeader>
  );
};

export default Searchbar;
