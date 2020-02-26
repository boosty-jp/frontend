import React from "react"
import TargetLevel from "./level";
import TargetDescriptions from "./description";

const cardStyle = {
    backgroundColor: 'white',
    boxShadow: '0 4px 11px 0 rgba(37,44,97,.15), 0 1px 3px 0 rgba(93,100,148,.2)',
    borderRadius: '0.5rem',
    width: '100%',
    height: '100%',
    padding: '20px',
    fontColor: 'black',
}

const BookTargetUserCard = () => {
    return (
        <div style={cardStyle} className="neumorphism-card">
            <p style={{ fontWeight: 'bold', color: 'black', fontSize: '22px', textAlign: 'center', marginBottom: '20px' }}>
                対象読者
            </p>
            <TargetLevel />
            <TargetDescriptions />
        </div >
    )
}

export default BookTargetUserCard