// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <8.10.0;

contract SimpleStorage {
    uint256 storedData;
    struct Image {
        address uploader;
        string hash;
        string title;
        uint256 price;
        uint256 timestamp;
    }

    Image upload;
    uint256 key = 0;
    Image[] imageUploads;
    mapping(address => Image[]) Useruploaded;
    mapping(address => Image[]) boughtImages;

    function set(
        string memory _hash,
        string memory _title,
        uint256 _price
    ) public {
        upload.uploader = msg.sender;
        upload.hash = _hash;
        upload.title = _title;
        upload.price = _price;
        upload.timestamp = block.timestamp;
        imageUploads.push(upload);
        Useruploaded[msg.sender].push(upload);
    }

    function get() public view returns (Image[] memory) {
        return Useruploaded[msg.sender];
    }

    function getALL() public view returns (Image[] memory) {
        return imageUploads;
    }

    function buyImage(uint256 _id) public payable {
        address payable seller = payable(imageUploads[_id].uploader);
        uint256 amount = imageUploads[_id].price;
        require(msg.value == amount);
        seller.transfer(amount);
        boughtImages[msg.sender].push(imageUploads[_id]);
    }

    function getBoughtImages() public view returns (Image[] memory) {
        return boughtImages[msg.sender];
    }
}
