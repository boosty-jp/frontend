import React from 'react'
import LogoImage from 'images/logo_invert.png'
import { Link } from 'gatsby'

const InvertLogo = () => {
    return (
        <Link to="/home">
            < img alt="ロゴ" src={LogoImage} style={{ width: "120px", marginBottom: '0px' }} />
        </Link>
    )
}

export default InvertLogo