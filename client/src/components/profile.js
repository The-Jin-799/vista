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
    const uploadedImages = await this.state.contract.methods
      .get()
      .call({ from: this.state.accounts[0] });
    this.setState({ uploadedImages });
  };

  componentDidMount = async () => {
    await this.getUploadedImages();
    if (this.state.uploadedImages.length > 0) {
      console.log(this.state.uploadedImages[0].hash);
      let ImageArray = this.state.uploadedImages.map((obj) => {
        return obj.hash;
      });
      this.setState({ image1hash: ImageArray });
    }
  };

  render() {
    return (
      <div>
        {this.state.uploadedImages.length > 0 ? (
          <h1>Uploads</h1>
        ) : (
          <h1>No Uploads</h1>
        )}
        <div className="masonry">
          {this.state.image1hash.map((hash, i) => (
            <div key={i} class="mItem">
              <img
                key={i}
                class="img"
                src={`https://gateway.ipfs.io/ipfs/${hash}`}
                alt=""
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    );
  }
}
export default Profile;
