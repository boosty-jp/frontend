import React from "react"
import { connect } from 'react-redux'
import SalesPointNumber from "./sales-point-number";

const cardStyle = {
    backgroundColor: 'white',
    boxShadow: '0 4px 11px 0 rgba(37,44,97,.15), 0 1px 3px 0 rgba(93,100,148,.2)',
    borderRadius: '0.5rem',
    width: '100%',
    padding: '20px',
    fontColor: 'black',
}

const BookSalesPointCardComponent = (props) => {
    return (
        <div style={{ ...cardStyle }}>
            <p style={{ fontWeight: 'bold', color: 'black', fontSize: '22px', textAlign: 'center', marginBottom: '20px' }}>
                特徴
            </p>
            {props.features.map((feature, idx) => {
                return (
                    <div style={{
                        marginBottom: '18px',
                        margin: '0px 0px 18px 0px',
                        padding: '0',
                        textIndent: '-2.4em',
                        paddingLeft: '2.4em',
                    }}
                        key={feature}
                    >
                        <SalesPointNumber number={idx} size={24} style={{ textIndent: '0', fontSize: '14px' }} />
                        <span style={{
                            color: 'black',
                            fontSize: '18px',
                            marginLeft: '0.5em',
                            textIndent: '0.5em',
                            verticalAlign: 'middle',
                        }}>
                            {feature}
                        </span>
                    </div>
                )
            })}
        </div >
    )
}

const mapStateToProps = state => ({
    features: state.bookView.features
})

const BookSalesPointCard = connect(mapStateToProps)(BookSalesPointCardComponent);
export default BookSalesPointCard