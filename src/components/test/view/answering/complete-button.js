import React from "react"
import { connect } from 'react-redux'
import { Button, message } from 'antd';
import gql from 'graphql-tag';
import { withApollo } from 'react-apollo'
import { createAnswerLink } from 'utils/link-generator'
import { getErrorMessage } from 'utils/error-handle'

const isBrowser = typeof window !== 'undefined';
const navigate = isBrowser ? require('gatsby').navigate : () => { }

const SUBMIT_ANSWER = gql`
mutation SubmitAnswer($answersInput: AnswersInput!){
  submitAnswer(answers: $answersInput){
      id
  }
}
`;

class CompleteButtonComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            submiting: false,
        }
    }

    submitAnswer = async () => {
        this.setState({ submiting: true })
        try {
            const request = this.makeRequest();
            const { data } = await this.props.client.mutate({
                mutation: SUBMIT_ANSWER,
                variables: {
                    answersInput: request
                }
            });

            navigate(createAnswerLink(data.submitAnswer.id));
        } catch (err) {
            message.error(getErrorMessage(err), 7)
        }
        this.setState({ submiting: false })
    }

    makeRequest = () => {
        return {
            questionsId: this.props.questionsId,
            ownAnswers: this.props.answers,
        }
    }

    render() {

        const answeredList = this.props.answers.filter(a => a.answer);
        const completed = answeredList.length === this.props.questions.length;

        if (completed) {
            return (
                <Button
                    block
                    icon="upload"
                    type="primary"
                    shape="round"
                    loading={this.state.submiting}
                    onClick={this.submitAnswer}
                    style={{ marginTop: '10px', marginBottom: '18px', boxShadow: '0 4px 11px 0 rgba(37,44,97,.15), 0 1px 3px 0 rgba(93,100,148,.2)', }}
                >解答を提出する
            </Button >
            )
        }

        return (<></>)
    }
}

const mapStateToProps = state => ({
    questionsId: state.testView.questionsId,
    answers: state.testAnswer.answers,
    questions: state.testAnswer.questions,
})

const CompleteButton = connect(mapStateToProps)(CompleteButtonComponent)

export default withApollo(CompleteButton)