interface TagListProps {
  items: string[];
}

export default function TagList({ items }: TagListProps) {
  return (
    <ul className="tag-list">
      {items.map((item) => <li key={item}>{item}</li>)}
    </ul>
  );
}
