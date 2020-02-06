import React from "react"
import { connect } from 'react-redux'
import gql from 'graphql-tag';
import { withApollo } from 'react-apollo'
import { Skeleton, message, Typography } from 'antd';
import CoverImageUploader from 'components/image/cover-image-uploader'
import { setBookData, setImageUrl } from 'modules/book/edit'
import SimpleShadowButton from "components/button/simple-shadow";
import { Query } from 'react-apollo'
import ErrorResult from "components/error/result";

const { Paragraph } = Typography;

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
    }
}
`;


const UPDATE_BOOK_IMAGE = gql`
mutation updateBookCoverImage($bookId: ID!, $imageUrl: String!){
  updateBookCoverImage(bookId: $bookId, imageUrl: $imageUrl)
}
`;

class BookImageUploaderComponent extends React.Component {
    state = {
        loading: false,
        imageUrl: ''
    }

    updateImage = async () => {
        this.setState({ loading: true })
        try {
            await this.props.client.mutate({
                mutation: UPDATE_BOOK_IMAGE,
                variables: {
                    bookId: this.props.id,
                    imageUrl: this.props.imageUrl
                }
            });
            message.success("更新しました", 7)
        } catch (err) {
            message.error("エラーが発生しました。お手数ですが、再度お試しください", 7)
        }

        this.setState({ loading: false })
    }

    render() {
        return (
            <Query
                query={GET_BOOK}
                variables={{ bookId: this.props.id }}
                onCompleted={(data) => this.props.setBookData(data.book)}
            >
                {({ loading, error, data }) => {
                    if (loading) return <Skeleton active paragraph={{ rows: 6 }} />
                    if (error) return <ErrorResult />
                    return (
                        <>
                            <Paragraph style={{ textAlign: 'center', }}>3MB以下の画像を投稿できます。<br />カバー画像は縦横比1.6 : 1にトリミングしたものに変換されます。</Paragraph>
                            <div style={{ maxWidth: '250px', margin: '0 auto' }}>
                                <CoverImageUploader
                                    imageUrl={this.props.imageUrl}
                                    onComplete={(imageUrl) => this.props.setImageUrl(imageUrl)}
                                />
                            </div>
                            <div style={{ textAlign: 'center', marginTop: '20px' }}>
                                <SimpleShadowButton text="更新する" loading={this.state.loading} size="large" onClick={this.updateImage} />
                            </div>
                        </>
                    )
                }}
            </Query >
        )
    }
}

const mapStateToProps = state => ({
    imageUrl: state.bookEdit.imageUrl,
})

const mapDispatchToProps = dispatch => ({
    setBookData: (book) => dispatch(setBookData(book)),
    setImageUrl: (imageUrl) => dispatch(setImageUrl(imageUrl)),
})

const BookImageUploader = connect(mapStateToProps, mapDispatchToProps)(BookImageUploaderComponent)
export default withApollo(BookImageUploader)