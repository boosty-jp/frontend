import React from "react"
import { Affix, Button, message } from 'antd';
import { connect } from 'react-redux'
import { Query } from 'react-apollo'
import gql from 'graphql-tag';
import { setBookData, reorderSections } from 'modules/book/edit'
import { withApollo } from 'react-apollo'
import ErrorResult from "components/error/result";
import { getErrorMessage } from "utils/error-handle";
import BookEditMenuSections from "components/book/edit/section/section-menu";
import { RetweetOutlined, PlusOutlined } from '@ant-design/icons';
import AddSectionModal from "components/book/edit/section/add-section-modal"
import ReorderSectionModal from "components/book/edit/section/reoder-section-modal"
import BookEditMenuHeader from "components/book/edit/page/book-header";

const GET_BOOK = gql`
  query GetBook($bookId: ID!) {
    book(bookId: $bookId) {
        id
        title
        imageUrl
        description
        price
        features
        targets {
            levelStart
            levelEnd
            targetDescriptions
        }
        status
        tags {
            id
            name
        }
        sections {
            id
            number
            title
            pages {
                id
                number
                title
                canPreview
            }
        }
        author {
            id
            displayName
            imageUrl
            description
            url
            twitterId
            githubId
        }
        updateDate
    }
}
`;

const bookMenuStyle = {
    padding: '16px',
    width: '100%',
    backgroundColor: '#F7FAFF',
    height: '100vh',
    borderRight: '1px solid #d6e4ff',
}

class PcBookEditMenuComponent extends React.Component {
    state = {
        addSectionModalVisible: false,
        reoderSectionModalVisible: false,
        beforeReorderSections: [],
    }

    closeAddSectionModal = e => {
        this.setState({
            addSectionModalVisible: false,
        });
    };

    showAddSectionModal = () => {
        if (this.props.sections.length >= 20) {
            message.error("作成できるセクションは20までです", 7)
            return;
        }
        this.setState({
            addSectionModalVisible: true,
        });
    };

    showReorderSectionModal = () => {
        if (!this.props.sections || this.props.sections.length === 0) {
            message.error("セクションがありません。", 7)
            return;
        }

        this.setState({
            reoderSectionModalVisible: true,
            beforeReorderSections: this.props.sections
        });
    };

    cancelReorderSectionModal = e => {
        this.closeReorderModal();
        this.props.reorderSections(this.state.beforeReorderSections);
    };

    closeReorderModal = e => {
        this.setState({
            reoderSectionModalVisible: false,
        });
    };

    render() {
        return (
            <Affix offsetTop={0}>
                <div style={{ maxWidth: '300px', ...bookMenuStyle }}>
                    <Query
                        query={GET_BOOK}
                        variables={{ bookId: this.props.bookId }}
                        onCompleted={(data) => {
                            this.props.setBookData(data.book, false);
                        }}
                    >
                        {({ loading, error }) => {
                            if (loading) return <></>
                            if (error) return <ErrorResult title={getErrorMessage(error)} />
                            return (
                                <>
                                    <div style={{ padding: '0px 10px', height: '70px' }}>
                                        <BookEditMenuHeader />
                                    </div>
                                    <div style={{ marginTop: '0px', height: 'calc(100vh - 200px)' }}>
                                        <BookEditMenuSections pageId={this.props.id} background="#F7FAFF" />
                                    </div>
                                </>
                            )
                        }}
                    </Query >
                </div>
                <div style={{ position: 'fixed', bottom: '20px', left: '14px', maxWidth: '260px' }}>
                    <Button
                        block
                        shape="round"
                        onClick={this.showAddSectionModal}
                        onCancel={this.closeAddSectionModal}
                        style={{ marginBottom: '10px' }}
                    >
                        <PlusOutlined />セクション追加
                    </Button>
                    <Button
                        block
                        shape="round"
                        onClick={this.showReorderSectionModal}
                        onCancel={this.cancelReorderSectionModal}
                    >
                        <RetweetOutlined rotate={90} />セクション並び替え
                    </Button>
                    <AddSectionModal
                        id={this.props.bookId}
                        onCancel={this.closeAddSectionModal}
                        visible={this.state.addSectionModalVisible}
                    />
                    <AddSectionModal
                        id={this.props.bookId}
                        onCancel={this.closeAddSectionModal}
                        visible={this.state.addSectionModalVisible}
                    />
                    <ReorderSectionModal
                        onCancel={this.cancelReorderSectionModal}
                        onClose={this.closeReorderModal}
                        visible={this.state.reoderSectionModalVisible}
                    />
                </div>
            </Affix >
        )
    }
}

const mapStateToProps = state => ({
    sections: state.bookEdit.sections,
})

const mapDispatchToProps = dispatch => ({
    setBookData: (book, isPreview) => dispatch(setBookData(book, isPreview)),
    reorderSections: (id, title) => dispatch(reorderSections(id, title)),
})

const PcBookEditMenu = connect(mapStateToProps, mapDispatchToProps)(PcBookEditMenuComponent);
export default withApollo(PcBookEditMenu)