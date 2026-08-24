import "./EmptyState.css";

/**
 * Placeholder for lists that have nothing in them yet. Keeps "no data" looking
 * deliberate rather than like a rendering bug.
 */
const EmptyState = ({
  title = "Nothing here yet",
  description,
  icon = "🍽️",
  action,
}) => (
  <div className="empty-state">
    <span className="empty-state__icon" aria-hidden="true">
      {icon}
    </span>
    <p className="empty-state__title">{title}</p>
    {description && <p className="empty-state__description">{description}</p>}
    {action && <div className="empty-state__action">{action}</div>}
  </div>
);

export default EmptyState;
