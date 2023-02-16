import "./Input.css";

function Input({ label, type, name, placeholder, value, onChange }) {
  return (
    <div className="basicInput">
      <p>{label}</p>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
        }}
      />
    </div>
  );
}

export default Input;
