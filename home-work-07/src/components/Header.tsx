import styled from "styled-components";

interface HeaderProps {
  title?: string;
  subtitle?: string;
}

const HeaderBar = styled.header`
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 24px;
`;

const Icon = styled.div`
  display: grid;
  flex: 0 0 clamp(44px, 9vw, 56px);
  aspect-ratio: 1;
  place-items: center;
  border: 1px solid #e2def7;
  border-radius: 15px;
  background: #efecfa;
  font-size: 1.5rem;
  line-height: 1;
`;

const HeadingContent = styled.div`
  min-width: 0;
`;

const Title = styled.h1`
  color: #302864;
  font-size: clamp(1.85rem, 5.5vw, 2.65rem);
  font-weight: 780;
  line-height: 1;
  letter-spacing: -0.055em;
`;

const Subtitle = styled.p`
  margin-top: 6px;
  color: var(--muted);
  font-size: 0.88rem;
`;

export function Header({
  title = "Task List",
  subtitle = "Організуй свої щоденні справи та завдання",
}: HeaderProps) {
  return (
    <HeaderBar>
      <Icon aria-hidden="true">📋</Icon>
      <HeadingContent>
        <Title>{title}</Title>
        <Subtitle>{subtitle}</Subtitle>
      </HeadingContent>
    </HeaderBar>
  );
}
