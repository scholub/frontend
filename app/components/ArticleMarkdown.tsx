import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import styled from "styled-components";
import remarkBreaks from "remark-breaks";

const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 20px;
  margin-bottom: 20px;

  img {
    width: 300px;
    height: auto;
    max-width: 800px;
    max-height: 400px;
    object-fit: cover;
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 4px;
  }
`;

interface ArticleMarkdownProps {
  content: string;
}

export default function ArticleMarkdown(
  ArticleMarkdownProps: ArticleMarkdownProps,
) {
  const parsedMarkdown = ArticleMarkdownProps.content.replace(/\\n/g, "\n");
  const fixedStrong = parsedMarkdown.replace(
    /\*\*([^*]+?\([^)]+\))\*\*(?=\S)/g,
    "**$1** ",
  );

  return (
    <Wrapper>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          p: ({ node, children, ...props }) => {
            if (!node) {
              return <p {...props}>{children}</p>;
            }
            const isOnlyImage =
              node?.children?.length === 1 &&
              (node.children[0] as any).tagName === "img";
            if (isOnlyImage) {
              return <ImageWrapper {...props}>{children}</ImageWrapper>;
            }
            return <p {...props}>{children}</p>;
          },
        }}
      >
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
  line-height: 180%;

  h1 {
    margin: 0;

    padding: 0;
    font-size: 24px;
    font-weight: 800;
    color: rgb(0, 0, 0);
  }

  h2 {
    margin: 0;

    padding: 0;
    font-size: 22px;
    font-weight: 800;
    color: rgb(0, 0, 0);
  }

  h3 {
    margin: 0;

    padding: 0;
    font-size: 20px;
    font-weight: 800;
    color: rgb(0, 0, 0);
  }

  p {
    margin: 0;
    padding: 0;
    font-size: 16px;
    line-height: 180%;
    font-weight: 400;
    color: #322f29;
  }

  ul {
    list-style-type: disc;
    margin: 0;
  }

  li {
    margin-bottom: 6px;
  }

  blockquote {
    border-left: 4px solid #f7971d;
    padding-left: 12px;
    color: #666;
    font-style: italic;
    margin-bottom: 10px;
  }

  // img {
  //   display: flex;
  //   justify-self: center;
  //   width: 80%;
  //   height: auto;
  //   object-fit: cover;
  //   max-height: 400px;
  // }

  strong {
    font-family: "NanumSquareRoundB";
    color: rgb(0, 0, 0);
  }

  em {
    font-style: italic;
    color: #322f29;
  }
  pre {
    background-color: #23272f;
    color: #ffffff;
    padding: 30px;
    border-radius: 10px;
    font-family: "Courier New", Courier, monospace;
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
