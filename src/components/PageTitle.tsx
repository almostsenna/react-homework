interface PageTitleProps {
  eyebrow: string;
  title: string;
  description?: string;
}

export default function PageTitle({ eyebrow, title, description }: PageTitleProps) {
  return (
    <header className="page-title">
      <p className="section-eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
      {description && <p className="page-description">{description}</p>}
    </header>
  );
}
