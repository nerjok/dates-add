import PageHeader from "../components/page-header";

function Rules() {
  return (
    <>
      <PageHeader />
      <div className="container text-start">
        <h1 className="fs-4 mb-4">Terms & conditions</h1>

        <div className="cardX">
          <h2>1. Age Requirement (18+ Only)</h2>
          <ul>
            <li>
              This dating profile is intended exclusively for adults aged{" "}
              <strong>18 years or older</strong>.
            </li>
            <li>
              By initiating contact, you confirm that you are at least 18 years
              of age.
            </li>
            <li>
              Any interaction with minors is strictly prohibited and will result
              in immediate blocking and reporting.
            </li>
          </ul>
        </div>

        <div className="cardX">
          <h2>2. Purpose</h2>
          <p>
            The purpose of this profile is to seek a genuine, respectful and
            serious relationship between consenting adults. It is not intended
            for casual encounters, financial arrangements, or deceptive
            interactions.
          </p>
        </div>

        <div className="cardX">
          <h2>2. Honesty & Identity</h2>
          <ul>
            <li>
              All communication must be truthful and represent real identity.
            </li>
            <li>
              Use of fake photos, false personal details, or misleading stories
              is not acceptable.
            </li>
          </ul>
        </div>

        <div className="cardX">
          <h2>3. Financial Boundaries</h2>
          <ul>
            <li>
              No requests for money, gifts, cryptocurrency, investments, or
              financial assistance.
            </li>
            <li>
              No discussion of banking details, income, debts, or emergency
              payments.
            </li>
            <li>Any such request will immediately end communication.</li>
          </ul>
        </div>

        <div className="cardX">
          <h2>4. Communication Standards</h2>
          <ul>
            <li>Respectful language is required at all times.</li>
            <li>
              No pressure for immediate replies, emotional intimacy, or
              off‑platform contact.
            </li>
            <li>No explicit, aggressive, or manipulative messaging.</li>
          </ul>
        </div>

        <div className="cardX">
          <h2>5. Privacy & Safety</h2>
          <ul>
            <li>
              Personal identifiers (address, workplace, ID documents) are shared
              only after mutual trust is established.
            </li>
            <li>
              Screenshots, sharing messages, or misuse of photos without consent
              is prohibited.
            </li>
          </ul>
        </div>

        <div className="cardX">
          <h2>6. Meetings</h2>
          <ul>
            <li>Any meeting should be mutually agreed upon.</li>
            <li>Public locations are preferred for initial meetings.</li>
            <li>No pressure to meet before both parties are comfortable.</li>
          </ul>
        </div>

        <div className="cardX">
          <h2>7. Ending Communication</h2>
          <p>
            Either party may end communication at any time without explanation.
            Silence or lack of response should be respected as a decision to
            disengage.
          </p>
        </div>

        <div className="cardX">
          <h2>8. Zero Tolerance Policy</h2>
          <p>
            Messages involving scams, manipulation, harassment, or financial
            solicitation will result in immediate blocking and reporting.
          </p>
        </div>

        <div className="cardX">
          <h2>9. Agreement</h2>
          <p>
            By choosing to contact this profile, you acknowledge and agree to
            these terms and conditions.
          </p>
        </div>
      </div>
    </>
  );
}

Rules.propTypes = {};

export default Rules;
