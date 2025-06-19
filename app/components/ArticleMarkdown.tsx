import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import styled from "styled-components";
import remarkBreaks from "remark-breaks";



interface ArticleMarkdownProps {
  content: string
}

export default function ArticleMarkdown(ArticleMarkdownProps: ArticleMarkdownProps) {
  const parsedMarkdown = ArticleMarkdownProps.content.replace(/\\n/g, "\n");
  const fixedStrong = parsedMarkdown.replace(/\*\*([^*]+?\([^)]+\))\*\*(?=\S)/g,'**$1** ');

  return (
    <Wrapper>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {fixedStrong}
      </ReactMarkdown>
    </Wrapper>
  );
} 

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  max-width: 800px;
  flex-direction: column;
  gap: 14px;
  align-items: start;
  font-weight: 400;
  line-height: 180%;

  h1 {
    margin: 0;
    margin-top: 16px;
    padding: 0;
    font-size: 24px;
    font-weight: 700;
    color: #322F29;
  }

  h2 {
    margin: 0;
    margin-top: 16px;
    padding: 0;
    font-size: 20px;
    font-weight: 700;
    color: #322F29;
  }

  h3 {
    margin: 0;
    margin-top: 16px;
    padding: 0;
    font-size: 18px;
    font-weight: 700;
    color: #322F29;
  }

  p {
    margin: 0;
    padding: 0;
    font-size: 16px;
    line-height: 180%;
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
    height: auto;
    object-fit: cover;
    max-height: 560px;
  }

  strong {
  font-family: 'NanumSquareRoundB';
    // color: #ff0000;
  }

  em {
    font-style: italic;
    color: #322F29;
  }
    pre {
    background-color: #23272f;
    color: #ffffff;
    padding: 30px;
    border-radius: 10px;
    font-family: 'Courier New', Courier, monospace;
    overflow-x: auto;
    font-size: 1em;
    box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.5);
    margin-bottom: 16px;
    width: 100%;
  }

  code {
    background: none;
    color: inherit;
    font-family: inherit;
    font-size: inherit;
    padding: 0;
  }

`;
