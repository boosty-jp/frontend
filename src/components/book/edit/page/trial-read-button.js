import React from 'react';
import { Switch, message } from 'antd'
import { connect } from 'react-redux'
import gql from 'graphql-tag';
import { withApollo } from 'react-apollo'
import { updateTrialRead } from 'modules/book/edit'
import { getErrorMessage } from "utils/error-handle";

const UPDATE_PAGE_TRIAL_READ = gql`
mutation UpdatePageTrialRead($pageId: ID!, $canPreview: Boolean){
  updatePageTrialRead(pageId: $pageId, canPreview: $canPreview)
}
`;

class TrialReadButtonComponent extends React.Component {
    state = { loading: false }

    handleTrialRead = async checked => {
        this.props.updateTrialRead(this.props.sectionId, this.props.pageId, checked);
        this.setState({ loading: true });
        try {
            await this.props.client.mutate({
                mutation: UPDATE_PAGE_TRIAL_READ,
                variables: {
                    pageId: this.props.pageId,
                    canPreview: checked,
                }
            });
        } catch (err) {
            message.error(getErrorMessage(err), 7)
            this.props.updateTrialRead(this.props.sectionId, this.props.pageId, !checked);
        }
        this.setState({ loading: false })
    }

    render() {
        return (
            <Switch
                checked={this.props.checked}
                checkedChildren="試し読み"
                unCheckedChildren=" 試し読み"
                loading={this.state.loading}
                onChange={this.handleTrialRead}
            />
        )
    }
}

const mapDispatchToProps = dispatch => ({
    updateTrialRead: (sectionId, pageId, checked) => dispatch(updateTrialRead(sectionId, pageId, checked)),
})

const TrialReadButton = connect(null, mapDispatchToProps)(TrialReadButtonComponent);
export default withApollo(TrialReadButton)