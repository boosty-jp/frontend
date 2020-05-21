import React from "react"
import SimpleCoverExampleImage1 from "components/image/cover/simple/1"
import SimpleCoverImage1 from "images/cover/simple/1.png"

const simpleTemplates = [
    {
        title: {
            align: "center",
            width: 300,
            y: 130,
            padding: 22,
            fontSize: 22,
            lineHeight: 1.2,
            fill: '#FFFFFF',
            fontStyle: 'bold',
            fontFamily: 'ヒラギノ丸ゴ Pro W4'
        },
        subTitle: {
            align: "center",
            fontSize: 18,
            width: 100,
            x: 100,
            y: 0,
            padding: 20,
            fill: '#FF0000',
            fontFamily: 'ヒラギノ丸ゴ Pro W4'
        },
        author: {
            align: "center",
            fontSize: 18,
            width: 100,
            x: 100,
            y: 0,
            padding: 20,
            fill: '#27377A',
            fontFamily: 'ヒラギノ丸ゴ Pro W4'
        },
        image: {
            src: SimpleCoverImage1,
            example: <SimpleCoverExampleImage1 />,
            x: -13,
            y: -20,
            width: 415,
            height: 557,
        },
    },
]

export default simpleTemplates