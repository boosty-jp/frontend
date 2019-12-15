import React from "react"
import { Rate, Typography, Tag, Divider } from 'antd';
import { convertToJSX } from "utils/html-converter";

const { Title } = Typography;
const rateDescription = ['初級', '中級', '上級'];

const data = {
    time: 1576146799791,
    blocks: [
        {
            "type": "header",
            "data": {
                "text": "Editor.js",
                "level": 2
            }
        },
        {
            "type": "paragraph",
            "data": {
                "text": "Hey. Meet the new Editor. On this page you can see it in action — try to edit this text."
            }
        },
        {
            "type": "header",
            "data": {
                "text": "Key features",
                "level": 3
            }
        },
        {
            "type": "list",
            "data": {
                "style": "unordered",
                "items": [
                    "It is a block-styled editor",
                    "It returns clean data output in JSON",
                    "Designed to be extendable and pluggable with a simple API"
                ]
            }
        },
        {
            "type": "header",
            "data": {
                "text": "What does it mean «block-styled editor»",
                "level": 3
            }
        },
        {
            "type": "paragraph",
            "data": {
                "text": "Workspace in classic editors is made of a single contenteditable element, used to create different HTML markups. Editor.js <mark class=\"cdx-marker\">workspace consists of separate Blocks: paragraphs, headings, images, lists, quotes, etc</mark>. Each of them is an independent contenteditable element (or more complex structure) provided by Plugin and united by Editor's Core."
            }
        },
        {
            "type": "paragraph",
            "data": {
                "text": "There are dozens of <a href=\"https://github.com/editor-js\">ready-to-use Blocks</a> and the <a href=\"https://editorjs.io/creating-a-block-tool\">simple API</a> for creation any Block you need. For example, you can implement Blocks for Tweets, Instagram posts, surveys and polls, CTA-buttons and even games."
            }
        },
        {
            "type": "header",
            "data": {
                "text": "What does it mean clean data output",
                "level": 3
            }
        },
        {
            "type": "paragraph",
            "data": {
                "text": "Classic WYSIWYG-editors produce raw HTML-markup with both content data and content appearance. On the contrary, Editor.js outputs JSON object with data of each Block. You can see an example below"
            }
        },
        {
            "type": "paragraph",
            "data": {
                "text": "Given data can be used as you want: render with HTML for <code class=\"inline-code\">Web clients</code>, render natively for <code class=\"inline-code\">mobile apps</code>, create markup for <code class=\"inline-code\">Facebook Instant Articles</code> or <code class=\"inline-code\">Google AMP</code>, generate an <code class=\"inline-code\">audio version</code> and so on."
            }
        },
        {
            "type": "paragraph",
            "data": {
                "text": "Clean data is useful to sanitize, validate and process on the backend."
            }
        },
        {
            "type": "delimiter",
            "data": {}
        },
        {
            "type": "paragraph",
            "data": {
                "text": "We have been working on this project more than three years. Several large media projects help us to test and debug the Editor, to make it's core more stable. At the same time we significantly improved the API. Now, it can be used to create any plugin for any task. Hope you enjoy. 😏"
            }
        },
        {
            "type": "image",
            "data": {
                "file": {
                    "url": "https://capella.pics/6d8f1a84-9544-4afa-b806-5167d45baf7c.jpg"
                },
                "caption": "",
                "withBorder": true,
                "stretched": false,
                "withBackground": false
            }
        }
    ],
    "version": "2.16.1"
}

const imageUrl = 'https://assets.st-note.com/production/uploads/images/16134453/rectangle_large_type_2_02b461d00e4d3c026d7706c5c3144351.png?fit=bounds&format=jpeg&quality=45&width=960'
const title = "Reactの基礎"

const skills = [
    { id: 'skill-1', name: 'React', level: 1 },
    { id: 'skill-2', name: 'javascript', level: 2 },
]

const tags = [
    { id: 'tag-1', label: 'react' },
    { id: 'tag-2', label: 'フロントエンド' },
    { id: 'tag-3', label: 'javascript' },
]

class ArticleContent extends React.Component {
    state = {
        preview: false,
        text: <></>,
    };

    componentDidMount = () => {
        const { text } = convertToJSX(data.blocks);
        this.setState({ text })
    }

    render() {
        return (
            <>
                <img src={imageUrl} style={{ width: '100%' }} />
                <div style={{ padding: '24px' }}>
                    <Typography>
                        <Title>{title}</Title>
                    </Typography>
                    <div>
                        {tags.map(t => {
                            return (
                                <Tag key={t.id}>{t.label}</Tag>
                            )
                        })}
                    </div>
                    <div style={{ marginTop: '12px' }}>
                        {skills.map(s => {
                            return (
                                <div key={s.id}>
                                    <span style={{ fontWeight: '500', fontSize: '16px', marginRight: '16px' }}>{s.name}</span>
                                    <Rate
                                        count={3}
                                        disabled
                                        value={s.level}
                                        tooltips={rateDescription}
                                    />
                                </div>
                            )
                        })}
                    </div>
                    <Divider />
                    {this.state.text}
                </div>
            </>
        )
    }
}

export default ArticleContent;