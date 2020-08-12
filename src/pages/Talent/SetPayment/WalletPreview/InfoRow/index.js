import React from 'react'

export default function InfoRow(props) {
    return (
        <div className="info-row">
            <div className="left-info">{props.left}</div>
            <div className="right-info">{props.right}</div>
        </div>
    )
}
