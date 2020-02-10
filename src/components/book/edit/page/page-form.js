import React from 'react';
import Editor from 'components/editor';
import { connect } from 'react-redux'
import { Divider, Typography, Alert } from 'antd';
import { updateTitle } from 'modules/page/edit'

const { Title } = Typography;
const cardStyle = {
    backgroundColor: 'white',
    boxShadow: '0 4px 11px 0 rgba(37,44,97,.15), 0 1px 3px 0 rgba(93,100,148,.2)',
    borderRadius: '1rem',
    width: '100%',
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
    fontColor: 'black',
}

const backgroundStyle = {
    backgroundColor: '#f0f5ff',
    borderRadius: '4rem',
    width: '100%',
    maxWidth: '900px',
    margin: '0 auto',
    padding: '30px',
}

class PageEditFormComponent extends React.Component {
    constructor(props) {
        super(props);
        this.handleBeforeUnload = this.handleBeforeUnload.bind(this);
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

    render() {
        const title = this.props.title ? this.props.title : "タイトル未設定"
        return (
            <div style={backgroundStyle}>
                <div style={cardStyle}>
                    <div style={{ backgroundColor: 'white', maxWidth: '700px', margin: '0 auto', padding: '20px' }}>
                        <Title editable={{ onChange: this.onChange }} level={2}>{title}</Title>
                        <TitleError titleError={this.props.titleError} />
                        <Divider style={{ margin: '8px 0px' }} />
                    </div>
                    <Editor />
                </div>
            </div>
        )
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
})

const mapDispatchToProps = dispatch => ({
    updateTitle: (title) => dispatch(updateTitle(title)),
})

const PageEditForm = connect(mapStateToProps, mapDispatchToProps)(PageEditFormComponent)
export default PageEditForm