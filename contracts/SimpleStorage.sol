// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <8.10.0;
pragma experimental ABIEncoderV2;

contract SimpleStorage {
    uint256 storedData;
    struct Image {
        string hash;
        string title;
        uint256 price;
        uint256 timestamp;
    }

    Image upload;

    mapping(address => Image[]) imageUploads;

    function set(
        string memory _hash,
        string memory _title,
        uint256 _price
    ) public {
        upload.hash = _hash;
        upload.title = _title;
        upload.price = _price;
        upload.timestamp = block.timestamp;
        imageUploads[msg.sender].push(upload);
    }

    function get() public view returns (Image[] memory) {
        return imageUploads[msg.sender];
    }
}
