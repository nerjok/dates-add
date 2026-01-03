import PageHeader from "../components/page-header";

function Suggestions() {
  return (
    <>
      <PageHeader />
      <div className="container text-start">
        <h1 className="fs-4 mb-4">Suggestions</h1>

        <section className="cardX">
          <h2 className="fs-5">Quick checklist</h2>
          <ul>
            <li>State your intention clearly (serious / long-term)</li>
            <li>Use honest, simple language</li>
            <li>Mention values & lifestyle, not income or boasting</li>
            <li>Set polite boundaries (no financial requests, no games)</li>
            <li>Keep sensitive personal details private</li>
          </ul>
        </section>

        <section className="cardX">
          <h2 className="fs-4">Template: Short ad (one-liner)</h2>
          <div className="example">
            <p className="short">
              I’m looking for a serious, long-term relationship. I value
              honesty, stability and clear communication. Not interested in
              financial requests or casual games.
            </p>
          </div>
        </section>

        <section className="cardX">
          <h2 className="fs-4">Template: Full ad (detailed)</h2>
          <div className="example">
            <p>
              I’m here with clear intentions and looking for a genuine,
              long-term partnership. I lead a calm, structured life and value
              honesty, mutual respect and consistent communication. I enjoy
              simple weekends, shared meals, thoughtful conversation and
              building a steady future together.
            </p>
            <p>
              <strong>What I’m looking for:</strong> someone emotionally mature,
              kind, and ready to invest in a committed relationship. No games,
              no financial requests, and no rushed emotional confessions.
            </p>
            <p>
              If you value sincerity and steady companionship, let’s start with
              a few honest messages and see where it goes.
            </p>
          </div>
        </section>

        <section className="cardX">
          <h2 className="fs-4">What to avoid (red flags & phrasing)</h2>
          <ul>
            <li>Avoid mentioning money or “provider” promises.</li>
            <li>
              Don’t overshare trauma or vulnerability in the first few messages.
            </li>
            <li>Avoid absolute/perfect claims (they look staged).</li>
            <li>
              Skip exact workplace, full name, home address and financial
              details.
            </li>
          </ul>
        </section>

        <section className="cardX">
          <h2 className="fs-4">Quick profile privacy tips</h2>
          <ul>
            <li>Delay sharing full contact info until you’re sure.</li>
            <li>
              Watch for vague stories or urgency around money — these are
              classic scams.
            </li>
          </ul>
        </section>

      </div>
    </>
  );
}

Suggestions.propTypes = {};

export default Suggestions;
