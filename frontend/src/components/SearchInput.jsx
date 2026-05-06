function SearchInput({ value, onChange }) {
    return (
      <input
        type="text"
        placeholder="Поиск товара..."
        value={value}
        onChange={event => onChange(event.target.value)}
      />
    );
  }
  
  export default SearchInput;