import React from 'react';



export class TextArea extends React.Component {
  state = {value: ''}

  render(){
    return(
      <textarea
        value={this.state.value}
        onChange={
            async (e) => {
              await this.setState({value: e.target.value})
              this.props.refreshRedux(this.state.value)
            }
        }
        placeholder = {this.props.name}
      />
    )
  }
}

