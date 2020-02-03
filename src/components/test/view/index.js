import React from "react"
import PageLoader from "components/loader/page";
import ErrorResult from "components/error/result";
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { connect } from 'react-redux'
import { clearTest, setTest } from 'modules/test/view'
import { setQuestions } from 'modules/test/view/answer'
import TestStartCard from 'components/test/view/start'
import AnsweringComponent from 'components/test/view/answering/'
import AnswerList from "components/test/view/answer-list/";

const GET_TEST = gql`
  query Test($testId: ID!) {
    test(testId: $testId) {
      id
      questionsId
      title
      description
      status
      createDate
      updateDate

      referenceCourse {
        id
        title
        imageUrl
      }

      questions {
        id
        text
        type
        candidates
        answerLength
        showCount
     }

      author {
        id
        displayName
        imageUrl
        description
        url
        twitterId
        facebookId
      }
    }
  }
`;


class TestContentComponent extends React.Component {
  constructor(props) {
    super(props);
    props.clearTest();
  }

  render() {
    return (
      <Query
        query={GET_TEST}
        variables={{ testId: this.props.id }}
        onCompleted={(data) => {
          this.props.setTest(data.test);
          this.props.setQuestions(data.test.questions);
        }}
      >
        {({ loading, error }) => {
          if (loading) return <PageLoader />
          if (error) return <ErrorResult />
          return (
            <>
              {
                this.props.mode === 'start' &&
                <TestStartCard />
              }
              {
                this.props.mode === 'answering' &&
                <AnsweringComponent />
              }
              {
                this.props.mode === 'answerList' &&
                <AnswerList />
              }
            </>
          )
        }}
      </Query>
    )
  }
}

const mapStateToProps = state => ({
  mode: state.testAnswer.mode,
})

const mapDispatchToProps = dispatch => ({
  setQuestions: (questions) => dispatch(setQuestions(questions)),
  setTest: (test) => dispatch(setTest(test)),
  clearTest: () => dispatch(clearTest()),
})

const TestContent = connect(mapStateToProps, mapDispatchToProps)(TestContentComponent)
export default TestContent;