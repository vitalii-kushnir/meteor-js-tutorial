import React from 'react';

export default class TitleBar extends React.Component {

    renderSubtitle(){
        if(this.props.subtitle){
            return <h2>{this.props.subtitle}</h2>
        }
    }

    render() {
        return (
            <div>
                <h1>{this.props.title}</h1>
                {this.renderSubtitle()}
            </div>
        )
    }
}

TitleBar.propTypes = {
    title : React.PropTypes.string.isRequired
};

TitleBar.defaultProps = {
    title : "Default Title"
};