import React from 'react';
import { connect } from 'react-redux'
import { Divider, Typography, Alert } from 'antd';
import { updateTitle, updateText } from 'modules/page/edit'
import MarkdownEditor from 'components/editor/simple-mde'

const { Title } = Typography;
const cardStyle = {
    backgroundColor: 'white',
    boxShadow: '0 4px 11px 0 rgba(37,44,97,.15), 0 1px 3px 0 rgba(93,100,148,.2)',
    borderRadius: '1rem',
    width: '100%',
    maxWidth: '800px',
    margin: '0 auto',
    padding: '40px 20px',
    fontColor: 'black',
}

class PageEditFormComponent extends React.Component {
    constructor(props) {
        super(props);
        this.handleBeforeUnload = this.handleBeforeUnload.bind(this);
        this.state = {
            isInitial: true
        }
    }

    componentWillMount() {
        window.addEventListener('beforeunload', this.handleBeforeUnload);
    }

    componentWillUnmount() {
        window.removeEventListener('beforeunload', this.handleBeforeUnload);
    }

    handleBeforeUnload(e) {
        e.preventDefault();
        e.returnValue = '記事を保存せずに閉じますか？';
    }

    onChange = str => {
        this.props.updateTitle(str);
    };

    onEditStart = () => {
        if (this.state.isInitial) {
            this.setState({ isInitial: false });
        }
    };

    render() {
        const title = (!this.props.title && this.state.isInitial) ? "タイトル未設定" : this.props.title;
        if (this.props.previewMode) {
            return (
                <div style={cardStyle}>
                    <div style={{ backgroundColor: 'white', maxWidth: '700px', margin: '0 auto', padding: '20px', wordBreak: 'break-all' }}>
                        <Title level={1} style={{ fontWeight: '500' }}>{title}</Title>
                        <Divider style={{ margin: '8px 0px 24px 0px' }} />
                        {this.props.text}
                    </div>
                </div>
            )
        } else {
            return (
                <div style={cardStyle}>
                    <div style={{ backgroundColor: 'white', maxWidth: '700px', margin: '0 auto' }}>
                        <Title
                            level={1}
                            style={{ fontWeight: '500' }}
                            editable={{ onChange: this.onChange, onStart: this.onEditStart }}
                        >
                            {title}
                        </Title>
                        <TitleError titleError={this.props.titleError} />
                        <Divider style={{ margin: '8px 0px 30px 0px' }} />
                        <MarkdownEditor value={this.props.text} updateText={value => this.props.updateText(value)} />
                    </div>
                </div>
            )
        }
    }
}
const TitleError = ({ titleError }) => {
    if (titleError.status === 'error') {
        return <Alert message={titleError.message} type="error" />
    }
    return <></>
}

const mapStateToProps = state => ({
    title: state.pageEdit.title,
    titleError: state.pageEdit.error.title,
    text: state.pageEdit.text,
    previewMode: state.pageEdit.previewMode,
})

const mapDispatchToProps = dispatch => ({
    updateTitle: (title) => dispatch(updateTitle(title)),
    updateText: (text) => dispatch(updateText(text)),
})

const PageEditForm = connect(mapStateToProps, mapDispatchToProps)(PageEditFormComponent)
export default PageEditForm