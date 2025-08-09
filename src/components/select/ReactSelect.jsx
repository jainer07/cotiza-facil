import Select from 'react-select';

function CustomSelect({ options, value, onChange, placeholder }) {
	return (
		<Select
			options={options}
			value={value}
			onChange={onChange}
			placeholder={placeholder}
		/>
	);
}

export default CustomSelect;