import React from "react"
import { connect } from 'react-redux'
import Stripe1Cover from "./stripe/stripe1"
import Stripe2Cover from "./stripe/stripe2"
import Stripe3Cover from "./stripe/stripe3"
import Stripe4Cover from "./stripe/stripe4"
import Stripe5Cover from "./stripe/stripe5"
import Curve1Cover from "./curve/curve1"
import Curve2Cover from "./curve/curve2"
import Curve3Cover from "./curve/curve3"
import Curve4Cover from "./curve/curve4"
import Curve5Cover from "./curve/curve5"
import Simple1Cover from "./simple/simple1"
import Simple2Cover from "./simple/simple2"
import Simple3Cover from "./simple/simple3"
import Simple4Cover from "./simple/simple4"
import Simple5Cover from "./simple/simple5"
import Pattern1Cover from "./pattern/pattern1"
import Pattern2Cover from "./pattern/pattern2"
import Pattern3Cover from "./pattern/pattern3"
import Pattern4Cover from "./pattern/pattern4"
import Pattern5Cover from "./pattern/pattern5"

const items = {
    "simple": [<Simple1Cover />, <Simple2Cover />, <Simple3Cover />, <Simple4Cover />, <Simple5Cover />],
    "stripe": [<Stripe1Cover />, <Stripe2Cover />, <Stripe3Cover />, <Stripe4Cover />, <Stripe5Cover />],
    "curve": [<Curve1Cover />, <Curve2Cover />, <Curve3Cover />, <Curve4Cover />, <Curve5Cover />],
    "pattern": [<Pattern1Cover />, <Pattern2Cover />, <Pattern3Cover />, <Pattern4Cover />, <Pattern5Cover />],
}

class CoverPreviewComponent extends React.Component {
    render() {
        return (
            items[this.props.templateType][this.props.templateValue]
        )
    }
}

const mapStateToProps = state => ({
    templateType: state.bookGenerator.templateType,
    templateValue: state.bookGenerator.templateValue,
})

const CoverPreview = connect(mapStateToProps)(CoverPreviewComponent);
export default CoverPreview