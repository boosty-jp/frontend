import React from "react"
import 'devicon/'

const LanguageIcon = ({ iconClassName }) => {
    var size = 50;
    return (
        <div
            style={{
                borderRadius: '16px',
                background: 'linear-gradient(145deg, #f0f5ff, #ffffff)',
                boxShadow: '8px 8px 16px #b4b8bf, -8px -8px 16px #ffffff',
                width: size + "px",
                height: size + "px",
                color: '#2f54eb',
                textAlign: 'center',
                verticalAlign: 'middle',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                margin: 'auto'
            }}>
            <i
                className={iconClassName}
                style={{ fontSize: size / 2.1 + 'px' }}
            />
        </div>
    )
}
export default LanguageIcon