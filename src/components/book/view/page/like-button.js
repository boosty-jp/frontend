import React from 'react';
import { withApollo } from 'react-apollo'
import gql from 'graphql-tag';
import { connect } from 'react-redux'
import { Button } from 'antd';
import { HeartTwoTone, HeartOutlined } from '@ant-design/icons';
import { likePage, unLikePage } from 'modules/page/view'


const LIKE_PAGE = gql`
mutation likePage($pageId: ID!) {
  likePage(pageId: $pageId)
}
`;

const UNLIKE_PAGE = gql`
mutation unLikePage($pageId: ID!) {
  unLikePage(pageId: $pageId)
}
`;

class PageLikeButtonComponent extends React.Component {
    state = { loading: false }

    likePage = async () => {
        this.setState({ loading: true });
        try {
            await this.props.client.mutate({
                mutation: LIKE_PAGE,
                variables: {
                    pageId: this.props.id,
                }
            });

            this.props.like();
            this.setState({ loading: false });
        } catch (err) {
            this.setState({ loading: false });
        }
    };

    unLikePage = async () => {
        this.setState({ loading: true });
        try {
            await this.props.client.mutate({
                mutation: UNLIKE_PAGE,
                variables: {
                    pageId: this.props.id,
                }
            });

            this.props.unLike();
            this.setState({ loading: false });
        } catch (err) {
            this.setState({ loading: false });
        }
    };

    toggleLike = () => {
        if (!this.props.liked) {
            this.likePage();
        } else {
            this.unLikePage();
        }
    }

    render() {
        const icon = this.props.liked ? <HeartTwoTone twoToneColor="#ff7875" /> : <HeartOutlined />;
        const borderColor = this.props.liked ? "#ff7875" : "#d9d9d9";
        const color = this.props.liked ? "#ff7875" : "rgba(0, 0, 0, 0.65)";
        return (
            <>
                <Button
                    icon={icon}
                    shape="circle"
                    loading={this.state.loading}
                    style={{ marginRight: '8px', borderColor, color, ...this.props.style }}
                    onClick={this.toggleLike}
                />
                <span>{this.props.likeCount}</span>
            </>
        )
    }
}

const mapStateToProps = state => ({
    id: state.pageView.id,
    liked: state.pageView.liked,
    likeCount: state.pageView.likeCount,
})

const mapDispatchToProps = dispatch => ({
    like: () => dispatch(likePage()),
    unLike: () => dispatch(unLikePage()),
})

const PageLikeButton = connect(mapStateToProps, mapDispatchToProps)(PageLikeButtonComponent)
export default withApollo(PageLikeButton)