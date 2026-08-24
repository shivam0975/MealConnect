import { Link } from "react-router";
import PageHeader from "../../common/components/PageHeader";
import "./Info.css";

const LAST_UPDATED = "24 August 2026";

const Terms = () => (
  <>
    <PageHeader
      eyebrow="Legal"
      title="Terms of Service"
      description={`Last updated ${LAST_UPDATED}`}
    />

    <div className="info-page">
      <div className="container">
        <p className="notice">
          These terms are a working draft written for the MealConnect product.
          They have not yet been reviewed by a qualified lawyer, and they should
          be before the service operates publicly.
        </p>

        <div className="prose" style={{ marginTop: "var(--space-lg)" }}>
          <h2>1. What MealConnect is</h2>
          <p>
            MealConnect is a coordination platform. We introduce businesses with
            surplus food to organisations that can distribute it, and to
            volunteers who can move it. We do not cook, own, store or sell the
            food itself.
          </p>

          <h2>2. Who may use it</h2>
          <p>
            Donating businesses must hold whatever food licence their local
            authority requires. Receiving organisations must be a registered
            charity, shelter or community group. Volunteers must be 18 or over.
          </p>

          <h2>3. Food safety is the donor&rsquo;s responsibility</h2>
          <p>
            If you list food, you confirm that it was prepared and stored safely,
            is within its safe-to-eat window, and has not been served to a
            customer. Listing food you would not serve is a breach of these
            terms.
          </p>

          <h2>4. Collection and delivery</h2>
          <p>
            Volunteers collect within the window the donor specifies. Once food
            is collected, responsibility for safe transport and storage passes to
            the collecting organisation.
          </p>

          <h2>5. Accounts</h2>
          <p>
            Keep your account details accurate and your credentials to yourself.
            You are responsible for activity carried out under your account.
          </p>

          <h2>6. Acceptable use</h2>
          <p>
            Do not use MealConnect to sell food, to list food you do not have, or
            to collect donations you have no means of distributing. We may
            suspend accounts that do.
          </p>

          <h2>7. Availability</h2>
          <p>
            We work to keep the service running but do not guarantee
            uninterrupted availability. Time-sensitive collections should always
            be confirmed directly between donor and recipient.
          </p>

          <h2>8. Liability</h2>
          <p>
            As a coordination platform, MealConnect is not liable for the
            condition of donated food, for losses arising from a collection that
            does not happen, or for disputes between donors and recipients.
            Nothing here limits liability that cannot lawfully be limited.
          </p>

          <h2>9. Changes</h2>
          <p>
            We may update these terms. Material changes will be announced on the
            site before they take effect.
          </p>

          <h2>10. Contact</h2>
          <p>
            Questions about these terms can be sent through the{" "}
            <Link to="/contact">contact page</Link>.
          </p>
        </div>
      </div>
    </div>
  </>
);

export default Terms;
