const Faq = () => {
  return (
    <div className="max-w-[1024px] mx-auto py-4 sm:px-8 lg:px-0">
      <div className="text-[24px] text-center py-4">About</div>
      <div className="flex flex-col gap-4">
        <div className="text-[18px]">How does the Tezos NFT marketplace work?</div>
        <div className="text-[12px]">
        Somethingrare is a platform where users can buy and sell NFTs specifically built on the Tezos blockchain. Sellers can list their Tezos-based NFTs for sale, and buyers can browse the available listings and purchase the desired NFTs using Tezos (XTZ) as the primary currency. The marketplace facilitates the secure transaction and ensures ownership transfer.
        </div>
      </div>
      <div className="flex flex-col gap-4 pt-4">
        <div className="text-[18px]">What is the focus of the platform?</div>
        <div className="text-[12px]">
        We focus on Rare Digital Art. For now, we only offer Unique Digital Art (1/1), but in the future, we will explore other options based on the principles of rarity.
        </div>
      </div>
      <div className="flex flex-col gap-4 pt-4">
        <div className="text-[18px]">As an Artist , How do I sell an NFT on SomethingRare?</div>
        <div className="text-[12px]">
        To sell an NFT on our marketplace, create an account (currently only by invitation) and follow the listing process provided. This usually involves uploading the digital file or providing the necessary details and setting a price for your NFT. When a buyer completes the purchase, the ownership is transferred, and you will receive the payment in Tezos (XTZ).
        </div>
      </div>
      <div className="flex flex-col gap-4 pt-4">
        <div className="text-[18px]">As a Collector, How do I buy an NFT ?</div>
        <div className="text-[12px]">
        To buy an NFT on our Tezos NFT marketplace, browse the listings and select the NFT you wish to purchase. Follow the designated purchase process, which typically involves confirming the transaction details and making the payment using Tezos (XTZ). Once the transaction is completed, the ownership of the NFT will be transferred to you.
        </div>
      </div>
      <div className="flex flex-col gap-4 pt-4">
        <div className="text-[18px]">Curation Filter: "Chronological" versus "UNDER THE RADAR"</div>
        <div className="text-[12px]">
        On the Primary Market Page, as a user, you can select the Chronological or Under the Radar option. The Chronological option displays NFTs minted in chronological order. The Under the Radar option displays minted NFTs from artists collected by other users you have flagged. This option allows you to discover and follow new artists based on your friends' taste.
        </div>
      </div>
      <div className="flex flex-col gap-4 pt-4">
        <div className="text-[18px]">Marketplace Fees Structure & Royalties</div>
        <ul className="ml-8"><li className="list-disc text-[12px]">We charge a 5% fee for all sales, primary and secondary.</li><li className="list-disc text-[12px]">Artists can set a royalty fee between 0 and 10%. ( we think this is an accepted standard practice)</li></ul>
      </div>
      <div className="flex flex-col gap-4 pt-4">
        <div className="text-[18px]">How is the authenticity of a Tezos-based NFT verified?</div>
        <div className="text-[12px]">
        Tezos-based NFTs on our marketplace are verified using the Tezos blockchain, which ensures their uniqueness and authenticity. Each Tezos-based NFT has a unique identifier and ownership history recorded on the Tezos blockchain, providing transparent proof of ownership and verifying its originality.
        </div>
      </div>
      <div className="flex flex-col gap-4 pt-4">
        <div className="text-[18px]">What type of tokens can I mint?</div>
        <div className="text-[12px]">
        We are a young startup and we are currently supporting just images ( png, jpg, gif). We will soon introduce other formats. The maximum file size is currently set at 10 MB.
        </div>
      </div>
      <div className="flex flex-col gap-4 pt-4">
        <div className="text-[18px]">IMPORTANT NOTICE:</div>
        <div className="text-[12px]">
        We are running this project as an experiment, take it at your own risk. Smart Contracts has been reviewed but not been audited yet.
        </div>
      </div>
      <div className="flex flex-col gap-4 pt-4">
        <div className="text-[18px]">CONTACT US:</div>
        <div className="text-[12px]">
        Twitter Account (@_somethingrare) or by email at gm@somethingrare.xyz
        </div>
      </div>
    </div>
  );
};

export default Faq;
