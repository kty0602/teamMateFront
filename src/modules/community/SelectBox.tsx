import styles from '../../css/modules/community/selectBox.module.css';

interface Option {
    value: string;
    label: string;
}

interface SelectBoxProps {
  options: Option[];
  onSelectChange: (selectedValue: string) => void;
}

const SelectBox: React.FC<SelectBoxProps> = ({ options, onSelectChange }) => {
  return (
    <select className={styles.selectBox} onChange={(e) => onSelectChange(e.target.value)}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default SelectBox;