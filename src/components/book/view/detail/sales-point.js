import React from "react"
import SalesPointNumber from "./sales-point-number";

const cardStyle = {
    backgroundColor: 'white',
    boxShadow: '0 4px 11px 0 rgba(37,44,97,.15), 0 1px 3px 0 rgba(93,100,148,.2)',
    borderRadius: '1rem',
    width: '100%',
    height: '100%',
    padding: '20px',
    fontSize: 'bold',
    fontColor: 'black',
}

const salesPoints = [
    "事前知識不要! わかりやすい解説  事前知識不要! わかりやすい解説",
    "過去問から作成したオリジナル問題集",
    "最新(2020年)のAWSシステムも網羅",
    "多数の合格者実績アリ",
]
const BookSalesPointCard = () => {
    return (
        <div style={{ marginTop: '20px', ...cardStyle }}>
            <p style={{ fontWeight: 'bold', color: 'black', fontSize: '22px', textAlign: 'center', marginBottom: '20px' }}>
                特徴
            </p>
            {salesPoints.map((s, idx) => {
                return (
                    <div style={{
                        marginBottom: '18px',
                        margin: '0px 0px 18px 0px',
                        padding: '0',
                        textIndent: '-4em',
                        paddingLeft: '4em',
                    }}
                    >
                        <SalesPointNumber number={idx} size={32} style={{ textIndent: '0' }} />
                        <span style={{
                            color: 'black',
                            fontSize: '18px',
                            marginLeft: '1.4em',
                            textIndent: '1.4em',
                            verticalAlign: 'middle',
                        }}>
                            {s}
                        </span>
                    </div>
                )
            })}
        </div >
    )
}

export default BookSalesPointCard