import React from 'react';
import { Typography, Alert, Table, Divider } from 'antd';
import hljs from 'highlight.js';
import { createArticleLink } from 'utils/link-generator';

const { Title, Paragraph, Text } = Typography;


export const convertToJSX = (blocks) => {
    var jsxList = [];
    var rawTexts = "";
    var textCount = 0;
    var blockCount = 0;
    var anchors = [];
    const countRegexp = /<[^>]*>|\s+|&nbsp;/g
    blocks.forEach((block, idx) => {
        const text = block.data.text
        let rawText = '';
        switch (block.type) {
            case 'header':
                jsxList.push(<Title key={"block-" + idx} level={block.data.level} id={text}><span dangerouslySetInnerHTML={{ __html: text }} /></Title>)
                anchors.push({ id: text, level: block.data.level });
                if (text) rawText = text.replace(countRegexp, '');
                if (rawText) {
                    rawTexts += rawText;
                    textCount += rawText.length;
                }
                blockCount++;
                break;
            case 'paragraph':
                jsxList.push(<Paragraph key={"block-" + idx}><span dangerouslySetInnerHTML={{ __html: text }} /></Paragraph>)
                if (text) rawText = text.replace(countRegexp, '');
                if (rawText) {
                    rawTexts += rawText;
                    textCount += rawText.length;
                }
                blockCount++;
                break;
            case 'imageUrl':
                jsxList.push(<ImageBlock block={block} idx={idx} />)
                blockCount++;
                break;
            case 'image':
                if (block.data.file) {
                    if (block.data.file.url) {
                        jsxList.push(<ImageBlock block={block} idx={idx} />)
                    }
                }
                blockCount++;
                break;
            case 'code':
                const codeHtml = "<pre><code class=\"hljs \">" + hljs.highlightAuto(block.data.code).value + "</code></pre>";
                jsxList.push(<Paragraph key={"block-" + idx} code={false}><div dangerouslySetInnerHTML={{ __html: codeHtml }} /></Paragraph>)
                if (text) rawText = text.replace(countRegexp, '');
                if (rawText) {
                    rawTexts += rawText;
                    textCount += rawText.length;
                }
                blockCount++;
                break;
            case 'list':
                let listJSX;
                if (block.data.style === 'unordered') {
                    listJSX = <ul>{block.data.items.map(i => <li dangerouslySetInnerHTML={{ __html: i }} />)}</ul>
                } else {
                    listJSX = <ol>{block.data.items.map(i => <li dangerouslySetInnerHTML={{ __html: i }} />)}</ol>
                }
                block.data.items.forEach(i => {
                    if (i) {
                        rawText = i.replace(countRegexp, '');
                        if (rawText) {
                            rawTexts += rawText;
                            textCount += rawText.length;
                        }
                    }
                })
                jsxList.push(<Paragraph key={"block-" + idx}>{listJSX}</Paragraph>)
                blockCount++;
                break;
            case 'embed':
                jsxList.push(
                    <React.Fragment key={"block-" + idx}>
                        {block.data.caption ? <Text strong>{block.data.caption}</Text> : <></>}
                        <Paragraph>
                            <iframe title={block.data.caption} type="text/html" style={{ maxWidth: '100%', maxHeight: '500px', width: block.data.width, height: block.data.height }} src={block.data.embed} frameBorder={0} />
                        </Paragraph >
                    </React.Fragment>
                )
                blockCount++;
                break;
            case 'delimiter':
                jsxList.push(
                    <div className="ce-delimiter" />
                )
                blockCount++;
                break;
            case 'warning':
                jsxList.push(
                    <Alert
                        key={"block-" + idx}
                        message={block.data.title}
                        description={block.data.message}
                        type="info"
                        showIcon
                        style={{ marginBottom: '14px' }}
                    />
                )
                if (block.data.title) {
                    rawText = block.data.title.replace(countRegexp, '');
                    if (rawText) {
                        rawTexts += rawText;
                        textCount += rawText.length;
                    }
                }
                if (block.data.message) {
                    rawText = block.data.message.replace(countRegexp, '');
                    if (rawText) {
                        rawTexts += rawText;
                        textCount += rawText.length;
                    }
                }
                blockCount++;
                break;
            case 'table':
                if (block.data.content.length === 0) jsxList.push(<></>)
                const columns = block.data.content[0].map((c, index) => {
                    return {
                        title: <span dangerouslySetInnerHTML={{ __html: c }} />,
                        dataIndex: c + index,
                        key: c + index,
                        render: c => <span dangerouslySetInnerHTML={{ __html: c }} />
                    }
                })
                const data = [];
                block.data.content.forEach((row, index) => {
                    if (index > 0) {
                        let row_data = { key: index }
                        row.forEach((d, d_index) => {
                            row_data = { ...row_data, [columns[d_index].key]: d }
                        });
                        data.push(row_data);
                    }
                })
                jsxList.push(
                    <Table key={"block-" + idx} tableLayout="fixed" size="middle" bordered columns={columns} dataSource={data} pagination={false} />
                )
                blockCount++;
                break;
            case 'quote':
                jsxList.push(
                    <React.Fragment key={"block-" + idx}>
                        <blockquote style={{
                            marginTop: '10px',
                            marginBottom: '10px',
                            paddingLeft: '15px',
                            borderLeft: '3px solid #ccc',
                            textAlign: block.data.alignment
                        }}>
                            <p dangerouslySetInnerHTML={{ __html: text }} />
                        </blockquote>
                        <cite dangerouslySetInnerHTML={{ __html: block.data.caption }} />
                    </React.Fragment>
                )
                if (block.data.caption) {
                    rawText = block.data.caption.replace(countRegexp, '');
                    if (rawText) {
                        rawTexts += rawText;
                        textCount += rawText.length;
                    }
                }
                if (text) {
                    rawText = text.replace(countRegexp, '');
                    if (rawText) {
                        rawTexts += rawText;
                        textCount += rawText.length;
                    }
                    textCount += text.replace(countRegexp, '').length;
                }
                blockCount++;
                break;
            default:
                break;
        }
    })
    return { text: jsxList, rawTexts: rawTexts, textCount: textCount, blockCount: blockCount, anchors: anchors }
}

export const convertToReferenceJSX = (block) => {
    const text = block.data.text
    var AddBlock = () => { return <></> };
    switch (block.type) {
        case 'header':
            AddBlock = () => {
                return (
                    <Title level={block.data.level} id={text}><span dangerouslySetInnerHTML={{ __html: text }} /></Title>
                )
            }
            break;
        case 'paragraph':
            AddBlock = () => {
                return (
                    <Paragraph><span dangerouslySetInnerHTML={{ __html: text }} /></Paragraph>
                )
            }
            break;
        case 'imageUrl':
            AddBlock = () => {
                return (
                    <img src={block.data.url} title={block.data.caption} alt={block.data.caption} style={{ maxWidth: '100%', height: 'auto' }} />
                )
            }
            break;
        case 'image':
            if (block.data.file) {
                if (block.data.file.url) {
                    AddBlock = () => {
                        return (
                            <img src={block.data.file.url} title={block.data.caption} alt={block.data.caption} style={{ maxWidth: '100%', height: 'auto' }} />
                        )
                    }
                }
            }
            break;
        case 'code':
            const codeHtml = "<pre><code class=\"hljs \">" + hljs.highlightAuto(block.data.code).value + "</code></pre>";
            AddBlock = () => {
                return (
                    <Paragraph code={false}><div dangerouslySetInnerHTML={{ __html: codeHtml }} /></Paragraph>
                )
            }
            break;
        case 'list':
            let listJSX;
            if (block.data.style === 'unordered') {
                listJSX = <ul>{block.data.items.map(i => <li dangerouslySetInnerHTML={{ __html: i }} />)}</ul>
            } else {
                listJSX = <ol>{block.data.items.map(i => <li dangerouslySetInnerHTML={{ __html: i }} />)}</ol>
            }
            AddBlock = () => {
                return (
                    <Paragraph >{listJSX}</Paragraph>
                )
            }
            break;
        case 'embed':
            AddBlock = () => {
                return (
                    <>
                        {block.data.caption ? <Text strong>{block.data.caption}</Text> : <></>}
                        <Paragraph>
                            <iframe title={block.data.caption} type="text/html" style={{ maxWidth: '100%', maxHeight: '500px', width: block.data.width, height: block.data.height }} src={block.data.embed} frameBorder={0} />
                        </Paragraph >
                    </>
                )
            }
            break;
        case 'warning':
            AddBlock = () => {
                return (
                    <Alert
                        message={block.data.title}
                        description={block.data.message}
                        type="info"
                        showIcon
                        style={{ marginBottom: '14px' }}
                    />
                )
            }
            break;
        case 'table':
            if (block.data.content.length === 0) {
                AddBlock = () => { return (<></>) }
            }
            const columns = block.data.content[0].map((c, index) => {
                return {
                    title: <span dangerouslySetInnerHTML={{ __html: c }} />,
                    dataIndex: c + index,
                    key: c + index,
                    render: c => <span dangerouslySetInnerHTML={{ __html: c }} />
                }
            })
            const data = [];
            block.data.content.forEach((row, index) => {
                if (index > 0) {
                    let row_data = { key: index }
                    row.forEach((d, d_index) => {
                        row_data = { ...row_data, [columns[d_index].key]: d }
                    });
                    data.push(row_data);
                }
            })

            AddBlock = () => {
                return (
                    <Table tableLayout="fixed" size="middle" bordered columns={columns} dataSource={data} pagination={false} />
                )
            }
            break;
        case 'quote':
            AddBlock = () => {
                return (
                    <>
                        <blockquote style={{
                            marginTop: '10px',
                            marginBottom: '10px',
                            paddingLeft: '15px',
                            borderLeft: '3px solid #ccc',
                            textAlign: block.data.alignment
                        }}>
                            <p dangerouslySetInnerHTML={{ __html: text }} />
                        </blockquote>
                        <cite dangerouslySetInnerHTML={{ __html: block.data.caption }} />
                    </>
                )
            }
            break;
        default:
            break;
    }
    return <AddBlock />;
}

export const convertToReferenceCard = (block, key) => {
    const ReferenceJSX = () => convertToReferenceJSX(block);
    return (
        <div
            style={{
                padding: '10px 16px',
                borderRadius: '0.25rem',
                border: '1px solid #d9d9d9',
                marginTop: '12px',
                background: 'white'
            }}
            key={key}
        >
            <ReferenceJSX />
            <Divider style={{ margin: '8px 0' }} />
            <span style={{ fontSize: '12px' }}>
                「<a href={createArticleLink(block.articleId)} target="_blank" rel="noopener noreferrer">{block.articleTitle}</a>」の第{block.idx}ブロックより
            </span>
        </div>
    )
}

const ImageBlock = ({ block, idx }) => {
    return (
        <div style={{
            marginBottom: '16px',
            background: block.data.withBackground ? "#eff2f5" : 'white',
            textAlign: block.data.withBackground ? "center" : "left",
            padding: block.data.withBackground ? "15px" : "0px",
            border: block.data.withBorder ? "1px solid #eff2f5" : "none",
        }}>
            <img
                key={"block-" + idx}
                src={block.data.file.url}
                title={block.data.caption}
                alt={block.data.caption}
                style={{
                    maxWidth: block.data.withBackground ? "60%" : "100%",
                    width: block.data.stretched ? "100%" : "auto",
                    height: 'auto'
                }}
            />
        </div>
    )
}