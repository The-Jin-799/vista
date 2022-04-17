import React, { Component } from "react";
import "./styles/imageUpload.css";
class Profile extends Component {
  state = {
    uploadedImages: [],
    boughtImages: [],
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

  getBoughtImages = async () => {
    const boughtImages = await this.state.contract.methods
      .getBoughtImages()
      .call({ from: this.state.accounts[0] });
    this.setState({ boughtImages });
  };

  componentDidMount = async () => {
    await this.getUploadedImages();
    await this.getBoughtImages();
    if (this.state.uploadedImages.length > 0) {
      console.log(this.state.uploadedImages[0].hash);
      let ImageArray = this.state.uploadedImages.map((obj) => {
        return obj.hash;
      });
      this.setState({ image1hash: ImageArray });
    }
    console.log(this.state.boughtImages);
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
            <div key={i} className="mItem">
              <img
                key={i}
                className="img"
                src={`https://cloudflare-ipfs.com/ipfs/${hash}`}
                alt=""
                loading="lazy"
              />
            </div>
          ))}
        </div>
        <h1>Images Purchased</h1>
        <div className="masonry">
          {this.state.boughtImages.map((image, i) => (
            <div key={i} className="mItem">
              <img
                key={i}
                className="img"
                src={`https://cloudflare-ipfs.com/ipfs/${image.hash}`}
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
