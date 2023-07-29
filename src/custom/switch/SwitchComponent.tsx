import './switch.css';
interface SwitchProps {
  name: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
export const SwitchComponent = (props: SwitchProps) => {
  const { name, checked, onChange } = props;
  return (
    <label className="switch">
      <input
        type="checkbox"
        name={name}
        checked={checked}
        onChange={onChange}
      />
      <span className="slider"></span>
    </label>
  );
};
