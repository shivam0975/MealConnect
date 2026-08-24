import { Link } from "react-router";
import PageHeader from "./PageHeader";

const NotFound = () => (
  <>
    <PageHeader
      eyebrow="404"
      title="404 - Page Not Found"
      description="That page has gone the way of yesterday's surplus. The links below still work."
    >
      <Link className="btn btn--primary" to="/">
        Go back to Home
      </Link>
      <Link className="btn btn--secondary" to="/contact">
        Report a broken link
      </Link>
    </PageHeader>
  </>
);

export default NotFound;
