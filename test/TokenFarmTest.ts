import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("TokenFarm", async function () {
    const MINTED_LP_TOKENS = 1e18;

    async function getOwner() {
        return (await ethers.getSigners())[0];
    }

    async function deployContractWithMintedTokens() {
        const dappTokenContract = await (await ethers.getContractFactory('DappToken')).deploy();

        const lpTokenContract = await (await ethers.getContractFactory('LPToken')).deploy();
        lpTokenContract.mint((await getOwner()).getAddress(), MINTED_LP_TOKENS);

        const tokenFarmContract = await (await ethers.getContractFactory('TokenFarm')).deploy(dappTokenContract.address, lpTokenContract.address);

        return { tokenFarmContract };
    }

    describe("Deployment", function () {
        it("Should deploy the contract", async function () {
            const {tokenFarmContract} = await loadFixture(deployContractWithMintedTokens);

            expect(tokenFarmContract).to.not.empty;
        });
    });
});
