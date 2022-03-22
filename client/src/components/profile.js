import React, { Component } from "react";
import "./styles/imageUpload.css";
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
        <h1>Uploads</h1>
        <div className="masonry">
          {this.state.image1hash.map((hash) => (
            <div class="mItem">
              <img class="img" src={`https://ipfs.io/ipfs/${hash}`} alt="" />
            </div>
          ))}
        </div>
      </div>
    );
  }
}
export default Profile;
