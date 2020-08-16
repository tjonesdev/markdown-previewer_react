import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import marked from 'marked';

function Editor(props) {
  return (
    <div
      className={
        props.resize ? "editor-container expand" : "editor-container compress"
      }
    >
      <div className="editor-title">
        <p>Editor</p>
        <button className="editor-resize" onClick={props.handleClick}>
          <i
            className={
              props.resize ? "fas fa-compress-alt" : "fas fa-expand-alt"
            }
          ></i>
        </button>
      </div>
      <textarea className="editor" autofocus onChange={props.handleChange}>
        {props.text}
      </textarea>
    </div>
  );
}

function Previewer(props) {
  return (
    <div
      className="preview"
      dangerouslySetInnerHTML={{
        __html: marked(props.preview)
      }}
    ></div>
  );
}

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      text: `# Markdown Previewer Guide
## That^ is an H1 and this is an H2
### And this is an H3!

This is inline code: \`<div></div>\`
\`\`\`
\\\\ And this is a multi-line code block

const notReal = () => {
  console.log('I'm not real');
}
\`\`\`\

Here's some **bold text**

This is *italicized text*

And ***bold italics***

~scratch that~

I'm a [link]() to nowhere

> This is a block quote

And here's a table:

| Element | Markdown Syntax |
| - | - |
| H1 | # H1 |
| H2 | ## H2 |
| H3 | ### H3 |

- This is an unordered list
  - This is nested
    - This is extra nested

1. Numbered lists exist too
2. With multiple numbers
  - Obviously

And here's an embedded image:

![image](https://www.neat.la/wp-content/uploads/2017/02/logo-neat-circle.png)
`,
      resize: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange = (e) => {
    this.setState({
      text: e.target.value
    });
  };

  handleClick = () => {
    this.setState({
      resize: !this.state.resize
    });
  };

  render() {
    return (
      <div className="container">
        <Editor
          text={this.state.text}
          handleChange={this.handleChange}
          handleClick={this.handleClick}
          resize={this.state.resize}
        />
        <Previewer preview={this.state.text} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
