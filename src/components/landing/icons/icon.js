import React from "react"
import 'devicon/'

const LanguageIcon = ({ iconClassName, idx }) => {
    var min = 30;
    var max = 100;

    var size = Math.floor(Math.random() * (max + 1 - min)) + min;
    return (
        <div
            // className={"dev-icon-animation" + (idx % 2 + 1)}
            style={{
                borderRadius: '1rem',
                background: 'linear-gradient(145deg, #ffffff, #d8dde6)',
                boxShadow: '8px 8px 16px #b4b8bf, -8px -8px 16px #ffffff',
                width: size + "px",
                height: size + "px",
                color: '#325afb',
                textAlign: 'center',
                verticalAlign: 'middle',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
            <i
                class={iconClassName}
                style={{ fontSize: size / 2.1 + 'px' }}
            />
        </div>
    )
}
export default LanguageIcon