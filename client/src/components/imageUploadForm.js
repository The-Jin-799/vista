import React, { Component } from "react";
import web3 from "web3";
import ipfs from "./ipfs";
import "./styles/uploadForm.css";
class ImageUploadForm extends Component {
  state = {
    title: "",
    price: 0,
    buffer: null,
    ipfsHash: null,
    accounts: this.props.accounts,
    contract: this.props.contract,
    storageValue: [],
    uploadedImages: [],
    image1hash: [],
    imageURL: "",
  };

  runExample = async (ipfsHash) => {
    console.log(ipfsHash);
    const { accounts, contract } = this.state;
    const priceInWei = web3.utils.toWei(this.state.price, "gwei");
    // Stores a given value, 5 by default.
    await contract.methods
      .set(ipfsHash, this.state.title, priceInWei)
      .send({ from: accounts[0] });

    // Get the value from the contract to prove it worked.
    const response = await contract.methods.get().call();

    // Update state with the result.
    this.setState({ storageValue: response });
  };

  // getUploadedImages = async () => {
  //   const uploadedImages = await this.state.contract.methods.get().call();
  //   this.setState({ uploadedImages });
  // };

  captureFile = (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    this.setState({
      imageURL: URL.createObjectURL(file),
    });
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = () => {
      this.setState({ buffer: Buffer(reader.result) });
      console.log("buffer", this.state.buffer);
    };
  };

  // componentDidMount = async () => {
  //   await this.getUploadedImages();
  //   console.log(this.state.uploadedImages[0].hash);
  //   let ImageArray = this.state.uploadedImages.map((obj) => {
  //     return obj.hash;
  //   });
  //   this.setState({ image1hash: ImageArray });
  // };

  onSubmit = (event) => {
    event.preventDefault();
    ipfs.files.add(this.state.buffer, async (error, result) => {
      if (error) {
        console.error(error);
        return;
      }
      this.setState({ ipfsHash: result[0].hash });

      console.log("ifpsHash", this.state.ipfsHash);
      //let CID = await "helloworld"
      await this.runExample(this.state.ipfsHash);
    });
  };

  handleImageTitle = (event) => {
    this.setState({ title: event.target.value });
  };

  handlePrice = (event) => {
    this.setState({ price: event.target.value });
  };

  render() {
    return (
      <div>
        <main className="container">
          <div className="pure-g">
            <div className="pure-u-1-1">
              <h1 className="upldheader">Upload Image</h1>
              <p className="upldpara">
                This image is stored on IPFS & The Ethereum Blockchain!
              </p>
              {this.state.imageURL && (
                <img
                  id="uploadedimage"
                  style={{ width: "400px", height: "250px" }}
                  src={this.state.imageURL}
                  alt=""
                />
              )}

              <form onSubmit={this.onSubmit}>
                <div class="col-3">
                  <input
                    class="effect-2"
                    type="file"
                    onChange={this.captureFile}
                  />
                  <span class="focus-border"></span>
                </div>
                <div className="col-3">
                  <input
                    className="effect-2"
                    type="text"
                    placeholder="Image Title"
                    onChange={this.handleImageTitle}
                  />
                  <span class="focus-border"></span>
                </div>
                {/* <input
                  type="text"
                  placeholder="Image Title"
                  onChange={this.handleImageTitle}
                /> */}
                <div class="col-3">
                  <input
                    className="effect-2"
                    type="number"
                    placeholder="Price in Gwei"
                    onChange={this.handlePrice}
                  />
                  <span class="focus-border"></span>
                </div>
                {/* <input
                  type="number"
                  placeholder="Price in Gwei"
                  onChange={this.handlePrice}
                /> */}
                <input className="form-submit-button" type="submit" />
              </form>
              {/* <p>{this.state.storageValue}</p> */}
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default ImageUploadForm;
