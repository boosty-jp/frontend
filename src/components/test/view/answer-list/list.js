import React from "react"
import { connect } from 'react-redux'
import { List, Badge } from 'antd';
import { viewAnswer } from 'modules/test/view/answer'
import CompleteButton from "components/test/view/answering/complete-button";

const AnswerListCardComponent = (props) => {
    return (
        <>
            <p style={{ fontWeight: '600', fontSize: '18px', color: 'black' }}>問題一覧</p>
            <List
                itemLayout="horizontal"
                dataSource={props.questions}
                renderItem={(question, idx) => {
                    const answered = props.answers[idx].answer;
                    return (
                        <List.Item
                            actions={[<a key="list-loadmore-more" onClick={() => props.viewAnswer(idx)}>解答する</a>]}
                        >
                            <List.Item.Meta
                                title={<a href="#" onClick={() => props.viewAnswer(idx)}>問題.{idx + 1}</a>}
                            />
                            {answered ?
                                <><Badge color="cyan" />解答済</>
                                :
                                <><Badge color="grey" />未解答</>
                            }
                        </List.Item>
                    )
                }
                }
            />
            <CompleteButton />
        </>
    );
}

const mapStateToProps = state => ({
    questions: state.testAnswer.questions,
    answers: state.testAnswer.answers,
})

const mapDispatchToProps = dispatch => ({
    viewAnswer: (idx) => dispatch(viewAnswer(idx)),
})

const AnswerListCard = connect(mapStateToProps, mapDispatchToProps)(AnswerListCardComponent)
export default AnswerListCard;