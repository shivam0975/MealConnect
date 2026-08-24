import { Link } from "react-router";
import PageHeader from "../../common/components/PageHeader";
import "./Info.css";

const FAQS = [
  {
    question: "Who can donate food through MealConnect?",
    answer:
      "Any licensed food business — restaurants, cafés, caterers, canteens, grocers and bakeries. You need to be able to confirm the food was stored safely and is still within its safe-to-eat window.",
  },
  {
    question: "What kinds of food can I donate?",
    answer:
      "Prepared meals that have been kept at a safe temperature, unopened packaged goods, fresh produce and bakery items. We cannot accept food that has been served to a customer, left at room temperature for an extended period, or is past its use-by date.",
  },
  {
    question: "Is donating food a legal risk for my business?",
    answer:
      "Food donated in good faith and in a safe condition is protected in most jurisdictions by good-samaritan food donation legislation. We ask every partner to follow the handling checklist in their onboarding pack, which is written to meet those requirements.",
  },
  {
    question: "How quickly is food collected?",
    answer:
      "Most listings are claimed within an hour, and volunteers usually collect within the pickup window you specify. You choose that window when you post the donation, so nothing is collected at a time that disrupts service.",
  },
  {
    question: "Does it cost anything to take part?",
    answer:
      "No. MealConnect is free for both donating businesses and receiving NGOs. Our running costs are covered by supporters and grants.",
  },
  {
    question: "How do NGOs join the network?",
    answer:
      "Register your organisation and share your registration details plus your food handling arrangements. Once verified you can see and claim listings in your area straight away.",
  },
  {
    question: "Can I volunteer without a car?",
    answer:
      "Yes. Plenty of collections are within walking or cycling distance, and some volunteers help with sorting and packing rather than transport. You tell us what works when you sign up.",
  },
  {
    question: "How do you measure impact?",
    answer:
      "We record the quantity of every donation collected and delivered. Partners can see their own contribution, and the totals shown across the site are the aggregate of those records.",
  },
];

const Faq = () => (
  <>
    <PageHeader
      eyebrow="Help"
      title="Frequently Asked Questions"
      description="The things restaurants, NGOs and volunteers ask us most often."
    />

    <div className="info-page">
      <div className="container">
        <div className="faq-list">
          {FAQS.map(({ question, answer }) => (
            <details key={question} className="faq-item">
              <summary className="faq-item__question">{question}</summary>
              <p className="faq-item__answer">{answer}</p>
            </details>
          ))}
        </div>

        <section className="info-section" style={{ textAlign: "center" }}>
          <h2>Still stuck?</h2>
          <p className="info-section__intro">
            If your question is not here, send it over and a real person will
            answer.
          </p>
          <Link className="btn btn--primary" to="/contact">
            Contact us
          </Link>
        </section>
      </div>
    </div>
  </>
);

export default Faq;
