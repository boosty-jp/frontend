import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { FaApple, FaTerminal, FaRegFile, FaDocker, FaReact, FaPhp, FaCss3, FaFileExcel, FaHtml5, FaCode, FaPython, FaSass, FaDatabase } from 'react-icons/fa';
import { DiHaskell, DiRubyRough, DiScala, DiSwift, DiVim } from 'react-icons/di';
import GraphQL_IMG from "images/graphql.png"
import 'devicon/'

const langMaps = {
  apple: { icon: <FaApple />, background: "#ccc", color: "black", text: "APPLE" },
  applescript: { icon: <FaApple />, background: "#ccc", color: "black", text: "APPLE" },
  angular: { icon: <i class="devicon-angularjs-plain"></i>, background: "#C4463A", color: "#FFFFFF", text: "Angular" },
  bash: { icon: <FaTerminal />, background: '#33465C', color: "#36D827", text: "BASH" },
  c: { icon: < i class="devicon-c-plain" ></i>, background: "#4D9DFF", color: "#FFFFFF", text: "C言語" },
  cpp: { icon: <i class="devicon-cplusplus-plain"></i>, background: "#4D9DFF", color: "#FFFFFF", text: "C++" },
  csharp: { icon: <i class="devicon-csharp-plain"></i>, background: "#A077D8", color: "#FFFFFF", text: "C#" },
  css: { icon: <FaCss3 />, background: "#264E80", color: "#99C7FF", text: "CSS" },
  docker: { icon: <FaDocker />, background: "#264E80", color: "#99C7FF", text: "Docker" },
  excel: { icon: <FaFileExcel />, background: "#185A36", color: "#5AF9B0", text: "EXCEL" },
  go: { icon: <i class="devicon-go-plain"></i>, background: "#264E80", color: "#99C7FF", text: "GO" },
  gradle: { icon: <i class="devicon-gradle-plain"></i>, background: "#CCC", color: "black", text: "Gradle" },
  graphql: { icon: <img src={GraphQL_IMG} style={{ width: '16px', height: 'auto', marginBottom: '4px' }} />, background: "#fafafa", color: "#DF32A7", text: "GraphQL" },
  gql: { icon: <img src={GraphQL_IMG} style={{ width: '16px', height: 'auto', marginBottom: '4px' }} />, background: "#fafafa", color: "#DF32A7", text: "gql" },
  groovy: { icon: <FaCode />, background: "#264E80", color: "#99C7FF", text: "Groovy" },
  fish: { icon: <FaTerminal />, background: '#33465C', color: "#36D827", text: "FISH" },
  haskell: { icon: <DiHaskell />, background: "#264E80", color: "#99C7FF", text: "Haskell" },
  html: { icon: <FaHtml5 />, background: "#EE5624", color: "#FFFFFF", text: "HTML" },
  java: { icon: <FaCode />, background: "#E01936", color: "#FFFFFF", text: "JAVA" },
  js: { icon: <FaCode />, background: "#EBD54D", color: "#31322E", text: "JS" },
  jsx: { icon: <FaReact />, background: "#264E80", color: "#99C7FF", text: "JSX" },
  javascript: { icon: <FaCode />, background: "#EBD54D", color: "#31322E", text: "JS" },
  json: { icon: <FaCode />, background: "#EBD54D", color: "#31322E", text: "JSON" },
  kotlin: { icon: <FaCode />, background: "#6A75E1", color: "#F88808", text: "Kotlin" },
  less: { icon: <FaCode />, background: "#264E80", color: "#ccc", text: "LESS" },
  lisp: { icon: <FaCode />, background: "#264E80", color: "#ccc", text: "LISP" },
  markdown: { icon: <FaCode />, background: "#264E80", color: "#ccc", text: "Markdown" },
  powershell: { icon: <FaTerminal />, background: '#33465C', color: "#36D827", text: "PowerShell" },
  plain: { icon: <FaRegFile />, background: "#264E80", color: "#ccc", text: "PLAIN" },
  php: { icon: <FaPhp />, background: "#8892BF", color: "black", text: "PHP" },
  py: { icon: <FaPython />, background: "#356690", color: "#F8BE2E", text: "PYTHON" },
  python: { icon: <FaPython />, background: "#356690", color: "#F8BE2E", text: "PYTHON" },
  react: { icon: <FaReact />, background: "#264E80", color: "#99C7FF", text: "REACT" },
  ruby: { icon: <DiRubyRough />, background: "#D41304", color: "#FFFFFF", text: "RUBY" },
  rb: { icon: <DiRubyRough />, background: "#D41304", color: "#FFFFFF", text: "RUBY" },
  rails: { icon: <i class="devicon-rails-plain"></i>, background: "#D41304", color: "#FFFFFF", text: "RAILS" },
  rubyonrails: { icon: <i class="devicon-rails-plain"></i>, background: "#D41304", color: "#FFFFFF", text: "RAILS" },
  scala: { icon: <DiScala />, background: "#370D0A", color: "#D93121", text: "SCALA" },
  scss: { icon: <FaSass />, background: "#C15E8E", color: "#FFFFFF", text: "SCSS" },
  sass: { icon: <FaSass />, background: "#C15E8E", color: "#FFFFFF", text: "Sass" },
  shell: { icon: <FaTerminal />, background: '#33465C', color: "#36D827", text: "SHELL" },
  sh: { icon: <FaTerminal />, background: '#33465C', color: "#36D827", text: "SHELL" },
  sql: { icon: <FaDatabase />, background: "#264E80", color: "#ccc", text: "SQL" },
  swift: { icon: <DiSwift />, background: "#EB4F37", color: "#FFFFFF", text: "SWIFT" },
  ts: { icon: <i class="devicon-typescript-plain"></i>, background: "#0177C7", color: "#FFFFFF", text: "TypeScript" },
  typescript: { icon: <i class="devicon-typescript-plain"></i>, background: "#0177C7", color: "#FFFFFF", text: "TypeScript" },
  tsx: { icon: <FaReact />, background: "#264E80", color: "#99C7FF", text: "TSX" },
  tsh: { icon: <FaTerminal />, background: '#33465C', color: "#36D827", text: "TSH" },
  unknown: { icon: <FaRegFile />, background: "#264E80", color: "#ccc", text: "PLAIN" },
  vim: { icon: <DiVim />, background: '#33465C', color: "#36D827", text: "VIM" },
  vue: { icon: <FaCode />, background: '#33465C', color: "#36D827", text: "Vue" },
  zsh: { icon: <FaTerminal />, background: '#33465C', color: "#36D827", text: "ZSH" },
}

const LangIcon = ({ lang }) => {

  if (lang === 'unknown') {
    return <></>
  }

  var langData = langMaps.plain;
  langData.text = lang.toUpperCase();
  if (lang && langMaps[lang]) {
    langData = langMaps[lang];
  }

  return (
    <div style={{ padding: "0px 24px", marginTop: "6px" }}>
      <span style={{
        background: langData.background,
        color: langData.color,
        verticalAlign: "middle",
        padding: "8px",
        borderBottomLeftRadius: "4px",
        borderBottomRightRadius: "4px",
      }}>
        <span style={{ marginRight: "4px", verticalAlign: "middle" }}>{langData.icon}</span><span>{langData.text}</span>
      </span>
    </div>
  );
}

export const toLangTagString = (lang) => {
  return ReactDOMServer.renderToStaticMarkup(<LangIcon lang={lang} />);
}