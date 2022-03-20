import React, { Component } from "react";
import ipfs from "./ipfs";
class ImageUploadForm extends Component {
  state = {
    title: "",
    price: 0,
    buffer: null,
    ipfsHash: null,
    accounts: this.props.accounts,
    contract: this.props.contract,
    storageValue: null,
  };

  runExample = async (ipfsHash) => {
    console.log(ipfsHash);
    const { accounts, contract } = this.state;

    // Stores a given value, 5 by default.
    await contract.methods
      .set(ipfsHash, this.state.title, this.state.price)
      .send({ from: accounts[0] });

    // Get the value from the contract to prove it worked.
    const response = await contract.methods.get().call();

    // Update state with the result.
    this.setState({ storageValue: response });
  };

  captureFile = (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = () => {
      this.setState({ buffer: Buffer(reader.result) });
      console.log("buffer", this.state.buffer);
    };
  };

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
              <h1>Your Image</h1>
              <p>This image is stored on IPFS & The Ethereum Blockchain!</p>
              <img
                style={{ width: "400px", height: "250px" }}
                src={
                  this.state.ipfsHash &&
                  `https://ipfs.io/ipfs/${this.state.ipfsHash}`
                }
                alt=""
              />
              <h2>Upload Image</h2>
              <form onSubmit={this.onSubmit}>
                <input type="file" onChange={this.captureFile} />
                <input
                  type="text"
                  placeholder="Image Title"
                  onChange={this.handleImageTitle}
                />
                <input
                  type="number"
                  placeholder="Price in Gwei"
                  onChange={this.handlePrice}
                />
                <input type="submit" />
              </form>
              <p>{this.state.storageValue}</p>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default ImageUploadForm;
