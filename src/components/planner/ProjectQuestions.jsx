import { useEffect, useRef, useState } from "react";
import { RadioGroup } from "../arc/radio-group/radio-group";
import { Checkbox } from "../arc/checkbox/checkbox";
import { Input } from "../arc/input/input";
import { Slider } from "../arc/slider/slider";
import { questionnaireSteps, questionnaireMessage } from "../../lib/planner/questionnaire";

export default function ProjectQuestions({ brief, onComplete }) {
  const [answers, setAnswers] = useState({});
  const [index, setIndex] = useState(0);
  const [error, setError] = useState("");
  const panel = useRef(null);
  const steps = questionnaireSteps(brief, answers);
  const review = index >= steps.length;
  const step = steps[index];
  const value = step ? answers[step.id] : undefined;
  useEffect(() => { panel.current?.focus(); }, [index]);
  function answer(next) { setAnswers(previous => ({ ...previous, [step.id]: next })); setError(""); }
  function next() {
    // Continue also allows unanswered questions; missing answers stay missing.
    setError(""); setIndex(index + 1);
  }
  return <section className="planner-questions" ref={panel} tabIndex={-1} aria-label={review ? "Review your project answers" : step.label}>
    <p className="planner-question-progress">{review ? "Anything you'd change?" : `Question ${index + 1} of ${steps.length}`}</p>
    {review ? <>
      <h2>Here's what you've told me.</h2>
      <dl>{steps.filter(item => answers[item.id] !== undefined && answers[item.id] !== "" && (!Array.isArray(answers[item.id]) || answers[item.id].length)).map(item => <div key={item.id}><dt>{item.label}</dt><dd>{item.type === "scale" ? item.labels[answers[item.id] - 1] : item.type === "radio" ? item.options.find(option => option.value === answers[item.id])?.label : Array.isArray(answers[item.id]) ? answers[item.id].join(", ") : answers[item.id]}</dd></div>)}</dl>
      <p>I'll use these answers alongside what we've already discussed. This doesn't book a project or send your contact details.</p>
    </> : <div key={step.id} className="planner-question-control">
      {step.type === "radio" ? <RadioGroup label={step.label} name={`planner-${step.id}`} options={step.options} value={value || ""} onValueChange={answer} /> : null}
      {step.type === "input" ? <Input label={step.label} description={step.hint} placeholder={step.placeholder} value={value || ""} maxLength={400} onChange={event => answer(event.target.value)} /> : null}
      {step.type === "checkbox" ? <fieldset><legend>{step.label}</legend><p>{step.hint}</p><div className="planner-question-options">{step.options.map(option => <Checkbox key={option.value} label={option.label} checked={(value || []).includes(option.value)} onCheckedChange={checked => answer(checked ? [...(value || []), option.value] : (value || []).filter(item => item !== option.value))} />)}</div></fieldset> : null}
      {step.type === "scale" ? <><Slider label={step.label} value={value ?? 1} min={1} max={5} step={1} format={number => step.labels[number - 1]} onValueChange={answer} /><p>{step.hint}</p><p className="planner-question-scale-ends"><span>Just exploring</span><span>Ready to start</span></p>{value === undefined ? <p>You can continue without answering.</p> : null}</> : null}
    </div>}
    {error ? <p role="alert">{error}</p> : null}
    <div className="planner-question-actions" role="group" aria-label="Question navigation">
      {index > 0 ? <button type="button" className="planner-chat-action planner-chat-action-secondary" onClick={() => { setError(""); setIndex(index - 1); }}>Back</button> : null}
      <button type="button" className="planner-chat-action" onClick={review ? () => {
        const message = questionnaireMessage(steps, answers);
        if (!Object.values(answers).some(item => Array.isArray(item) ? item.length : item !== "" && item !== undefined)) { setError("Add an answer first, or tell me what you have in mind in the chat below."); return; }
        onComplete(message);
      } : next}>{review ? "Let's work from this" : "Continue"}</button>
    </div>
  </section>;
}
