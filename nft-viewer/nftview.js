//Nav Mobile Menu
const navSlide = () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('nav ul');
    const navLinks = document.querySelectorAll('nav ul li')
  
    //Toggle Nav
    burger.addEventListener('click', () => {
        nav.classList.toggle('nav-active');
  
    //Animate Links
    navLinks.forEach((link, index) => {
        if (link.style.animation) {
            link.style.animation = ''
        } else {
            link.style.animation = `navLinkFade 0.5s ease forwards ${index / 10 + 0.1}s`
        }
        });
        //Burger Animation
        burger.classList.toggle('toggle');
        // Prevent body scroll when menu is open
        if (nav.classList.contains('nav-active')) {
          body.style.overflow = 'hidden';
        } else {
          body.style.overflow = '';
        }
    });
  
    // Close burger menu when clicking outside of navbar and nav ul
    document.addEventListener('click', (event) => {
      if (!event.target.closest('nav') && !event.target.closest('.burger')) {
        nav.classList.remove('nav-active');
        burger.classList.remove('toggle');
        body.style.overflow = '';
  
        // Reset nav link animations
        navLinks.forEach((link, index) => {
          link.style.animation = '';
        });
      }
    });
  }
  
  navSlide();

  /*

  //Hide Navigation on Scroll
  const body = document.body;
  let lastScroll = 0;
  
  window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;
  if (currentScroll <= 0) {
    body.classList.remove("scroll-up");
    return;
  }
  
  if (currentScroll > lastScroll && !body.classList.contains("scroll-down")) {
    body.classList.remove("scroll-up");
    body.classList.add("scroll-down");
  } else if (
    currentScroll < lastScroll &&
    body.classList.contains("scroll-down")
  ) {
    body.classList.remove("scroll-down");
    body.classList.add("scroll-up");
  }
  lastScroll = currentScroll;
  });

  */

  console.clear();


document.getElementById('nft-form').addEventListener('submit', async function (e) {
    e.preventDefault();
  
    const inputContainer = document.getElementById('input-container');
    const loadingContainer = document.getElementById('loading-container');
    const nftContainer = document.getElementById('nft-container');
    const nftDisplayContainer = document.getElementById('nft-display-container');
    const nftMediaContainer = document.getElementById('nft-media-container');
    const nftInfoContainer = document.getElementById('nft-info-container');
  
    const contractAddress = document.getElementById('contract-address').value;
    const tokenId = document.getElementById('token-id').value;
  
    // Hide input container and show loading container
    inputContainer.style.display = 'none';
    loadingContainer.style.display = 'flex';
  
    try {
        // Connect to the blockchain
        const provider = new ethers.providers.JsonRpcProvider('https://evm-cronos.crypto.org'); // Use a verified RPC URL
  
        // Define ABIs for ERC-721 and ERC-1155
        const abi721 = [
            "function tokenURI(uint256 _tokenId) view returns (string)",
            "function ownerOf(uint256 _tokenId) view returns (address)"
        ];
        const abi1155 = [
            "function uri(uint256 _id) view returns (string)",
            "function balanceOf(address _owner, uint256 _id) view returns (uint256)"
        ];
  
        let contract;
        let tokenURI;
        let isERC721 = true;
  
        try {
            // Try to fetch tokenURI using ERC-721 method
            contract = new ethers.Contract(contractAddress, abi721, provider);
            tokenURI = await contract.tokenURI(tokenId);
        } catch (err) {
            // If it fails, assume the token is ERC-1155
            isERC721 = false;
            contract = new ethers.Contract(contractAddress, abi1155, provider);
            tokenURI = await contract.uri(tokenId);
        }
  
        // Resolve the tokenURI if necessary (e.g., handling IPFS)
        if (tokenURI.startsWith("ipfs://")) {
            tokenURI = `https://ipfs.io/ipfs/${tokenURI.split("ipfs://")[1]}`;
        }
  
        // Fetch the metadata from the token URI
        const metadataResponse = await fetch(tokenURI);
        const metadata = await metadataResponse.json();
  
        let mediaHtml = '';
  
        // Resolve image URL if necessary (e.g., handling IPFS)
        let imageUrl = metadata.image;
        if (imageUrl.startsWith("ipfs://")) {
            imageUrl = `https://ipfs.io/ipfs/${imageUrl.split("ipfs://")[1]}`;
        }
  
        if (metadata.animation_url) {
            // Resolve animation URL if necessary
            let animationUrl = metadata.animation_url;
            if (animationUrl.startsWith("ipfs://")) {
                animationUrl = `https://ipfs.io/ipfs/${animationUrl.split("ipfs://")[1]}`;
            }
            // Display video if animation_url is present
            mediaHtml = `
                <video src="${animationUrl}" class="nft-media" controls loop autoplay muted>
                    Your browser does not support the video tag.
                </video>
            `;
        } else if (imageUrl) {
            // Display image if animation_url is not present
            mediaHtml = `<img src="${imageUrl}" alt="NFT Media" class="nft-media">`;
        }
  
        let attributesHtml = '';
        if (metadata.attributes && metadata.attributes.length > 0) {
            attributesHtml = '<div class="attributes-container">';
            metadata.attributes.forEach(attribute => {
                attributesHtml += `
                    <div class="attribute-box">
                        <h4>${attribute.trait_type}</h4>
                        <p>${attribute.value}</p>
                    </div>
                `;
            });
            attributesHtml += '</div>';
        }
  
        const infoHtml = `
            <dl class="nft-metadata">
                <dt>Name:</dt>
                <dd>${metadata.name}</dd>
                <dt>Description</dt>
                <dd>${metadata.description}</dd>
                <dt>Properties</dt>
                <dd>${attributesHtml}</dd>
            </dl>
        `;
  
        // Hide loading container and show NFT display container
        nftContainer.style.display = "block";
        loadingContainer.style.display = 'none';
        nftDisplayContainer.style.display = 'flex';
  
        nftMediaContainer.innerHTML = mediaHtml;
        nftInfoContainer.innerHTML = infoHtml;
  
        // Add expandable container HTML to nft-container
        const expandableHtml = `
            <div class="expandable-container">
              <div class="expandable-hidden">
                <div class="details">
                  <span>Contract Address:</span>
                  <div class="formatted-string">
                    <a id="address" href="#" target="_blank"></a>
                  </div>
                </div>
                <div class="details">
                  <span>Token ID:</span>
                  <div class="formatted-string">
                    <a id="token-link" href="#" target="_blank">${tokenId}</a>
                  </div>
                </div>
                <div class="details">
                  <span>Token Standard:</span>
                  <span>${isERC721 ? 'ERC-721' : 'ERC-1155'}</span>
                </div>
              </div>
              <button class="expandable-title">
                <h1 class="title">Details</h1>
                <svg class="arrow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M7 10l5 5 5-5z"/>
                </svg>
              </button>
            </div>
        `;
  
        nftContainer.insertAdjacentHTML('beforeend', expandableHtml);
  
        // Set the formatted address and href
        const inputAddress = contractAddress;
        const formatted = inputAddress.slice(0, 7) + "..." + inputAddress.slice(-5);
        const addressUrl = "https://cronoscan.com/address/" + inputAddress; // Update the desired URL
        const addressElement = document.getElementById("address");
        addressElement.innerText = formatted;
        addressElement.href = addressUrl;
  
        // Set the token ID link
        const tokenUrl = `https://cronoscan.com/nft/${inputAddress}/${tokenId}`;
        const tokenElement = document.getElementById("token-link");
        tokenElement.href = tokenUrl;
  
        // Add event listener for expandable container
        const expandable = document.querySelector('.expandable-container');
        const expandableHidden = document.querySelector('.expandable-hidden'); //TEST
        const titleButton = document.querySelector('.expandable-title');
        const arrow = document.querySelector('.arrow');
        let isExpanded = false;
  
        titleButton.addEventListener('click', () => {
            if (titleButton.disabled) return; // Prevent clicking during transition
            titleButton.disabled = true; // Disable the button
  
            expandable.style.height = isExpanded ? '70px' : '200px';
            arrow.classList.toggle('rotate', !isExpanded);
            isExpanded = !isExpanded;
  
            setTimeout(() => {
                titleButton.disabled = false; // Re-enable the button after the transition
            }, 250); // Match the duration of the transition in CSS
        });
  
    } catch (error) {
        console.error('Error loading NFT data:', error);
        loadingContainer.style.display = 'none';
        inputContainer.style.display = 'flex';
        alert('Error loading NFT data: ' + error.message);
    }
  });