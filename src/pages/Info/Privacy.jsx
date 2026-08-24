import { Link } from "react-router";
import PageHeader from "../../common/components/PageHeader";
import "./Info.css";

const LAST_UPDATED = "24 August 2026";

const Privacy = () => (
  <>
    <PageHeader
      eyebrow="Legal"
      title="Privacy Policy"
      description={`Last updated ${LAST_UPDATED}`}
    />

    <div className="info-page">
      <div className="container">
        <p className="notice">
          This policy is a working draft written for the MealConnect product. It
          has not yet been reviewed by a qualified lawyer, and it should be
          before the service handles real user data.
        </p>

        <div className="prose" style={{ marginTop: "var(--space-lg)" }}>
          <h2>What we collect</h2>
          <p>
            We collect only what we need to move food from a kitchen to a person
            who needs it:
          </p>
          <ul>
            <li>
              <strong>Account details</strong> — the name, email address and
              phone number you give us when you register as a restaurant, NGO or
              volunteer.
            </li>
            <li>
              <strong>Donation records</strong> — the food type, quantity and
              pickup window attached to each listing.
            </li>
            <li>
              <strong>Collection details</strong> — which volunteer collected a
              donation and when, so a delivery can be traced if something goes
              wrong.
            </li>
          </ul>

          <h2>What we do not collect</h2>
          <p>
            We do not ask for payment card details on this site, we do not
            collect data about the individuals who ultimately receive meals, and
            we do not sell or rent any data to third parties.
          </p>

          <h2>Why we hold it</h2>
          <p>
            Contact details let us coordinate a collection. Donation records let
            us trace a specific batch of food if a safety concern is raised, and
            let partners see their own contribution. That is the whole purpose.
          </p>

          <h2>How long we keep it</h2>
          <p>
            Donation and collection records are retained for two years to satisfy
            food traceability expectations. Account details are kept while your
            account is active and removed within 30 days of you closing it.
          </p>

          <h2>Who can see it</h2>
          <p>
            An NGO claiming a donation sees the donating business and the pickup
            details. A volunteer assigned to a collection sees the addresses at
            both ends. Nobody else on the platform sees your contact details.
          </p>

          <h2>Your rights</h2>
          <p>
            You can ask us for a copy of the data we hold about you, ask us to
            correct it, or ask us to delete it. We will respond within 30 days.
          </p>

          <h2>Cookies</h2>
          <p>
            This site stores your draft donations in your own browser so they
            survive a page refresh. That information never leaves your device and
            is not used for tracking or advertising.
          </p>

          <h2>Contact</h2>
          <p>
            Questions about any of the above should go to our team via the{" "}
            <Link to="/contact">contact page</Link>.
          </p>
        </div>
      </div>
    </div>
  </>
);

export default Privacy;
