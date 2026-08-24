import "./Spinner.css";

const Spinner = ({ label = "Loading…" }) => (
  <div className="spinner" role="status" aria-live="polite">
    <span className="spinner__dial" aria-hidden="true" />
    <p className="spinner__label">{label}</p>
  </div>
);

export default Spinner;
