import ReactMarkdown from "react-markdown";
import styled from "styled-components";

interface ArticleMarkdownProps {
  content: string
}

export default function ArticleMarkdown(ArticleMarkdownProps: ArticleMarkdownProps) {

  return (
    <Wrapper>
      <ReactMarkdown>{ArticleMarkdownProps.content}</ReactMarkdown>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  max-width: 700px;
  flex-direction: column;
  gap: 40px;
  background-color: #f1f1f1;
  align-items: center;

  h1, h2, h3 {
    margin-top: 1.2em;
  }

  p {
    margin: 0.5em 0;
    line-height: 1.6;
  }

  ul {
    margin-left: 1.5em;
  }

  blockquote {
    border-left: 4px solid #ccc;
    padding-left: 1em;
    color: #666;
    font-style: italic;
  }

  a {
    color: #0070f3;
    text-decoration: underline;
  }

  img{

  }
`;
