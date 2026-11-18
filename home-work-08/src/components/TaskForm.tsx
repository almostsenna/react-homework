import styled, { css } from "styled-components";
import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import { PRIORITY_LABELS } from "../types";
import type { Priority } from "../types";

const Form = styled.form`
  display: grid;
  gap: 13px;
  padding: clamp(12px, 3vw, 17px);
  border: 1px solid #e5e3f0;
  border-radius: 14px;
  background: #f8f7fd;
`;

const Controls = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr) auto;
  align-items: end;
  gap: 10px;

  @media (max-width: 520px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 350px) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

const Field = styled.div`
  display: grid;
  min-width: 0;
  gap: 5px;
  color: var(--muted);
  font-size: 0.8rem;
  font-weight: 680;
`;

const controlBase = css`
  min-width: 0;
  min-height: 44px;
  border: 1px solid var(--line);
  border-radius: 9px;
`;

const fieldControl = css`
  ${controlBase}
  width: 100%;
  padding: 8px 10px;
  color: var(--ink);
  background: #fff;
  font-size: 0.9rem;
  font-weight: 450;
  transition: border-color 150ms ease, box-shadow 150ms ease;

  &:focus {
    border-color: var(--focus);
    outline: 0;
    box-shadow: 0 0 0 3px #ded9fa;
  }

  &::placeholder {
    color: #657089;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

const Input = styled.input`
  ${fieldControl}
`;

const PrioritySelect = styled.select`
  ${fieldControl}
`;

const SubmitButton = styled.button`
  ${controlBase}
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 8px 16px;
  border-color: transparent;
  color: #fff;
  background: var(--accent);
  font-size: 0.9rem;
  font-weight: 700;
  cursor: pointer;
  transition: background-color 150ms ease, transform 150ms ease, box-shadow 150ms ease;

  &:hover {
    transform: translateY(-1px);
    background: var(--accent-dark);
    box-shadow: 0 3px 8px rgba(76, 71, 173, 0.24);
  }

  &:active {
    transform: translateY(0);
  }

  &:focus-visible {
    outline: 2px solid var(--focus);
    outline-offset: 2px;
  }

  @media (max-width: 520px) {
    grid-column: 1 / -1;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

const Plus = styled.span`
  font-size: 1rem;
  line-height: 1;
`;

const ErrorMessage = styled.p`
  color: #97242e;
  font-size: 0.8rem;
  font-weight: 550;
`;

interface TaskFormProps {
  onAdd: (text: string, priority: Priority, date?: string) => void;
}

export function TaskForm({ onAdd }: TaskFormProps) {
  const textInputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    textInputRef.current?.focus();
  }, []);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const values = new FormData(form);
    const text = String(values.get("text") ?? "").trim();
    if (text.length < 3) {
      setError("Текст завдання має містити щонайменше 3 символи.");
      textInputRef.current?.focus();
      return;
    }

    const priority = values.get("priority") as Priority;
    const date = String(values.get("date") ?? "");
    onAdd(text, priority, date || undefined);
    form.reset();
    setError(null);
    textInputRef.current?.focus();
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Field>
        <label htmlFor="task-text">Нове завдання</label>
        <Input
          id="task-text"
          ref={textInputRef}
          name="text"
          type="text"
          placeholder="Що потрібно зробити?"
          autoComplete="off"
          aria-invalid={Boolean(error)}
          aria-describedby={error ? "task-text-error" : undefined}
          onChange={() => setError(null)}
          required
        />
        {error && <ErrorMessage id="task-text-error" role="alert">{error}</ErrorMessage>}
      </Field>

      <Controls>
        <Field>
          <label htmlFor="task-priority">Пріоритет</label>
          <PrioritySelect id="task-priority" name="priority" defaultValue="normal">
            <option value="low">{PRIORITY_LABELS.low}</option>
            <option value="normal">{PRIORITY_LABELS.normal}</option>
            <option value="high">{PRIORITY_LABELS.high}</option>
          </PrioritySelect>
        </Field>

        <Field>
          <label htmlFor="task-deadline">Дедлайн</label>
          <Input id="task-deadline" name="date" type="date" />
        </Field>

        <SubmitButton type="submit">
          <Plus aria-hidden="true">＋</Plus>
          Додати
        </SubmitButton>
      </Controls>
    </Form>
  );
}
