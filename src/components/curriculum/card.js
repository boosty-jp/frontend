import React from "react"
import { Card, Progress } from 'antd';

const { Meta } = Card;

const CurriculumCard = ({ image, title, progress, LastLearnedDate }) => {
    return (
        <Card
            cover={
                <img
                    alt={title}
                    src={image}
                />
            }
        >
            <Meta
                title={title}
                description={
                    <>
                        <p>{LastLearnedDate}</p>
                        <Progress percent={progress} />
                    </>
                }
            />
        </Card>
    )
}
export default CurriculumCard