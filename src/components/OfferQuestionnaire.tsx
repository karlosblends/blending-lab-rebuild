import { track } from "../lib/analytics.js";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, RotateCcw } from "lucide-react";
import CardStack, { type CardDecision } from "./arc/card-stack/card-stack";
import OfferDoodle from "./OfferDoodle";
import { offerQuestions, selectedNeeds, needsSentence } from "../data/offer-questionnaire";
import "../styles/offer-questionnaire.css";

export default function OfferQuestionnaire({ lang = "hr" }: { lang?: "hr" | "en" }) {
  const hr = lang === "hr";
  const questions = offerQuestions[lang];
  const [answers, setAnswers] = useState<Record<string, CardDecision>>({});
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const submitting = useRef(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [generation, setGeneration] = useState(0);
  const root = useRef<HTMLDivElement>(null);
  const answerState = useRef<Record<string, CardDecision>>({});
  const started = useRef(false);
  const completed = useRef(false);
  const metadata = { form_id: "questionnaire", questionnaire_version: "offer_v1", cards_total: questions.length };
  const reduced = useReducedMotion();
  const needs = selectedNeeds(questions, answers);
  const complete = Object.keys(answers).length === questions.length;
  const sentence = needsSentence(needs, lang);

  const reset = () => {
    track("questionnaire_restart", { ...metadata, cards_answered: Object.keys(answerState.current).length });
    answerState.current = {}; started.current = false; completed.current = false;
    setAnswers({}); setSent(false); setError("");
  };

  // A card is shown only when the current card is at least half visible.
  // No historical interactions are replayed when consent is granted later.
  useEffect(() => {
    const card = root.current?.querySelector('[data-top]');
    if (!card) return;
    const position = Object.keys(answers).length;
    const item = questions[position];
    if (!item) return;
    let recorded = false;
    const record = () => {
      const rect = card.getBoundingClientRect();
      const visibleHeight = Math.min(rect.bottom, innerHeight) - Math.max(rect.top, 0);
      if (!recorded && document.visibilityState === 'visible' && rect.height > 0 && visibleHeight / rect.height >= .5) {
        recorded = Boolean(track("questionnaire_card_view", { ...metadata, card_id: item.id, card_position: position + 1, cards_answered: position }));
      }
    };
    const observer = new IntersectionObserver(record, { threshold: [.5] });
    observer.observe(card);
    window.addEventListener('bl:consent', record);
    document.addEventListener('visibilitychange', record);
    return () => { observer.disconnect(); window.removeEventListener('bl:consent', record); document.removeEventListener('visibilitychange', record); };
  }, [answers, generation, questions]);
  const restart = () => { reset(); setGeneration(value => value + 1); };

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submitting.current) return;
    const form = event.currentTarget;
    submitting.current = true;
    setSending(true);
    setError("");
    try {
      const response = await fetch(form.action, {
        method: "POST", body: new FormData(form), headers: { Accept: "application/json" },
        signal: AbortSignal.timeout(20000),
      });
      if (!response.ok) throw new Error("Submission failed");
      track("generate_lead", { ...metadata, cards_answered: Object.keys(answerState.current).length });
      setSent(true);
      setName("");
      setEmail("");
    } catch {
      track("form_error", { ...metadata, error_type: "submission" });
      setError(hr ? "Upit nije poslan. Pokušajte ponovno ili mi pišite na karlo@blending-lab.com." : "Your enquiry wasn’t sent. Please try again or email karlo@blending-lab.com.");
    } finally {
      submitting.current = false;
      setSending(false);
    }
  };

  return <div className="offer-questionnaire" ref={root}>
    <CardStack
      key={generation}
      items={questions}
      getKey={item => item.id}
      getLabel={item => item.title}
      locale={lang}
      label={hr ? "Prepoznajete li ove situacije?" : "Do these situations sound familiar?"}
      labels={{ left: hr ? "Da, to je to" : "Yes, that’s me", right: hr ? "Ne, nije u tome problem" : "No, that’s not the problem" }}
      onDecide={(item, decision) => {
        if (!started.current) started.current = Boolean(track("questionnaire_start", metadata));
        const next = { ...answerState.current, [item.id]: decision };
        answerState.current = next;
        const count = Object.keys(next).length;
        track("questionnaire_answer", { ...metadata, card_id: item.id, card_position: questions.indexOf(item) + 1, answer: decision === "left" ? "yes" : "no", cards_answered: count });
        if (count === questions.length && !completed.current) completed.current = Boolean(track("questionnaire_complete", { ...metadata, cards_answered: count }));
        setAnswers(next); setSent(false);
      }}
      onUndo={(item, decision) => {
        const next = { ...answerState.current }; delete next[item.id]; answerState.current = next;
        track("questionnaire_undo", { ...metadata, card_id: item.id, card_position: questions.indexOf(item) + 1, answer: decision === "left" ? "yes" : "no", cards_answered: Object.keys(next).length });
        setAnswers(next); setSent(false);
      }}
      onReset={reset}
      renderCard={item => <div className="oq-card-content">
        <OfferDoodle kind={item.id} />
        <h3>{item.title}</h3>
        <p>{item.description}</p>
      </div>}
      renderEmpty={() => <div className="oq-finished">
        <OfferDoodle kind={needs.length ? "done" : "improvements"} />
        <h3>{needs.length ? (hr ? "Imamo početak razgovora." : "We have a starting point.") : (hr ? "Ništa od ovoga?" : "None of these?")}</h3>
        <p>{needs.length ? (hr ? "Vaši odgovori su složeni u upit ispod." : "Your answers form the enquiry below.") : (hr ? "Možda vam treba nešto drugo. Slobodno mi napišite što imate na umu." : "You may need something else. Tell me what you have in mind.")}</p>
        {!needs.length && <a className="button button--ghost" href="#kontakt">{hr ? "Napišite mi" : "Get in touch"}<ArrowUpRight size={18} /></a>}
      </div>}
    />
    {!(complete && !needs.length) && <div className="oq-enquiry">
      <p className="oq-sentence" aria-live="polite" aria-atomic="true" data-sentence={sentence}>
        <span className="oq-stem">{hr ? "Trebam" : "I need"} </span>
        {!needs.length && <span className="oq-placeholder">…</span>}
        {needs.map((item, index) => <span key={item.need}>
          {index > 0 && <span>{index === needs.length - 1 ? (hr ? " i " : " and ") : ", "}</span>}
          <motion.span className="oq-phrase" initial={{ opacity: 0, y: reduced ? 0 : 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduced ? 0 : .24, ease: [.16, 1, .3, 1] }}>{item.phrase}</motion.span>
        </span>)}
        {needs.length > 0 && <span>{complete ? "." : " …"}</span>}
      </p>
      {complete && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: reduced ? 0 : .24 }}>
        {sent ? <div className="oq-result" role="status">
          <p>{hr ? "Hvala na javljanju. Upit je poslan." : "Thanks for getting in touch. Your enquiry has been sent."}</p>
          <span>{hr ? "Razgovor nastavljamo e-mailom." : "We’ll continue by email."}</span>
        </div> : <form className="oq-form" action="https://formspree.io/f/xpqgddeg" method="POST" onSubmit={submit} aria-busy={sending} aria-describedby="oq-status">
          <input type="hidden" name="_subject" value={`Blending Lab — questionnaire enquiry (${lang})`} />
          <input type="hidden" name="source" value={`${hr ? "/landing-stranice" : "/landing-pages"}#prepoznajete-li`} />
          <input type="hidden" name="message" value={sentence} />
          <div className="oq-form-row">
            <div>
              <label htmlFor="oq-name">{hr ? "Ime" : "Name"}</label>
              <input id="oq-name" name="name" type="text" autoComplete="name" required maxLength={150} value={name} onChange={event => setName(event.target.value)} placeholder={hr ? "Vaše ime" : "Your name"} />
            </div>
            <div>
              <label htmlFor="oq-email">{hr ? "E-mail" : "Email"}</label>
              <input id="oq-email" name="email" type="email" autoComplete="email" required maxLength={254} value={email} onChange={event => setEmail(event.target.value)} placeholder={hr ? "vas@email.hr" : "you@example.com"} />
            </div>
          </div>
          <div className="offer-honeypot" aria-hidden="true"><label htmlFor="oq-trap">Leave empty</label><input id="oq-trap" name="_gotcha" tabIndex={-1} autoComplete="off" /></div>
          <p id="oq-status" className="oq-status" role="status" aria-live="polite">{sending ? (hr ? "Slanje upita…" : "Sending your enquiry…") : error}</p>
          <button className="button oq-submit" type="submit" disabled={sending}>{sending ? (hr ? "Slanje upita…" : "Sending…") : (hr ? "Pošalji upit" : "Send enquiry")}<ArrowUpRight size={18} aria-hidden="true" /></button>
          <p className="oq-privacy">{hr ? "Vaše podatke koristim za odgovor na upit." : "Your details are used to respond to your enquiry."} <a href="/privacy-policy.html">{hr ? "Privatnost" : "Privacy"}</a></p>
        </form>}
      </motion.div>}
    </div>}
    {complete && !sent && <button className="oq-text-button oq-restart" type="button" onClick={restart} disabled={sending}><RotateCcw size={16} aria-hidden="true" />{hr ? "Kreni ispočetka" : "Start over"}</button>}
  </div>;
}
