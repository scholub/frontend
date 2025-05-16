import ReactMarkdown from "react-markdown";
import styled from "styled-components";

interface ArticleMarkdownProps {
  content: string
}

export default function ArticleMarkdown(ArticleMarkdownProps: ArticleMarkdownProps) {
  const parsedMarkdown = ArticleMarkdownProps.content.replace(/\\n/g, "\n");

  return (
    <Wrapper>
      <ReactMarkdown>{parsedMarkdown}</ReactMarkdown>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  max-width: 700px;
  flex-direction: column;
  gap: 40px;
  align-items: start;

`;
