import "./PageHeader.css";

/**
 * Title band shared by every interior page, so they open the same way the
 * homepage does instead of each inventing its own header.
 */
const PageHeader = ({ eyebrow, title, description, children }) => (
  <header className="page-header">
    <div className="container">
      {eyebrow && <p className="page-header__eyebrow">{eyebrow}</p>}
      <h1 className="page-header__title">{title}</h1>
      {description && <p className="page-header__description">{description}</p>}
      {children && <div className="page-header__actions">{children}</div>}
    </div>
  </header>
);

export default PageHeader;
