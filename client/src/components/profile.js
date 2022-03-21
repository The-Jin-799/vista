import React, { Component } from "react";

class Profile extends Component {
  state = {
    uploadedImages: [],
    accounts: this.props.accounts,
    contract: this.props.contract,
    image1hash: [],
  };

  getUploadedImages = async () => {
    const uploadedImages = await this.state.contract.methods.get().call();
    this.setState({ uploadedImages });
  };

  componentDidMount = async () => {
    await this.getUploadedImages();
    console.log(this.state.uploadedImages[0].hash);
    let ImageArray = this.state.uploadedImages.map((obj) => {
      return obj.hash;
    });
    this.setState({ image1hash: ImageArray });
  };

  render() {
    return (
      <div>
        <h1>uploads</h1>
        {this.state.image1hash.map((hash) => {
          return (
            <img
              style={{ width: "200px", height: "150px" }}
              src={`https://ipfs.io/ipfs/${hash}`}
            />
          );
        })}
      </div>
    );
  }
}

export default Profile;
