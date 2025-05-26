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


  h1 {
    margin: 0;
    padding: 0;
    font-size: 24px;
    font-weight: 700;
    color: #322F29;
  }

  h2 {
    margin: 0;
    padding: 0;
    font-size: 20px;
    font-weight: 600;
    color: #333;
  }

  h3 {
    margin: 0;
    padding: 0;
    font-size: 18px;
    font-weight: 500;
    color: #444;
  }

  p {
    margin: 0;
    padding: 0;
    font-size: 16px;
    line-height: 1.6;
  }

  ul {
    list-style-type: disc;
    margin: 0;
  }

  li {
    margin-bottom: 6px;
  }

  blockquote {
    border-left: 4px solid #F7971D;
    padding-left: 12px;
    color: #666;
    font-style: italic;
    margin-bottom: 10px;
  }

  img {
    display: flex;
    justify-self: center;
    width: 80%;
  }

  strong {
    //font-weight: bold;
    //color: #ff0000;  // 필요시 색상 지정
  }

  em {
    font-style: italic;
    color: #555;
  }
`;
