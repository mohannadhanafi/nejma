import React from 'react';
import "./index.scss"

export default function FormCard(props) {
    return (
        <section className="talent-sign-up-section">
            <div className="form-section-wrapper">
                {props.children}
            </div>
        </section>
    )
}
