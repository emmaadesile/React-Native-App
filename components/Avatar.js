import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

class Avatar extends React.Component {
  state = {
    photo:
      'https://d3r69eeiwn2k86.cloudfront.net/items/2H46003J3L0V3c2O0g3Y/avatar-default.jpg'
  };
  componentDidMount() {
    fetch('https://uinames.com/api/?region=germany&ext')
      .then(resp => resp.json())
      .then(data => {
        this.setState({ photo: data.photo });
        this.props.updateName(`${data.name} ${data.surname}`);
      })
      .catch(error => console.log(error));
  }
  render() {
    return <Image source={{ uri: this.state.photo }} />;
  }
}

const mapStateToProps = state => ({
  name: state.name
});

const mapDispatchToProps = dispatch => {
  return {
    updateName: name =>
      dispatch({
        type: 'UPDATE_NAME',
        name
      })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Avatar);

const Image = styled.Image`
  width: 44px;
  height: 44px;
  border-radius: 22px;
`;
