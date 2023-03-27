import {setupFixture, toChainlinkPrice, toUsd} from "../helpers/utils";
import {parseEther, parseUnits} from "ethers/lib/utils";
import {expect} from "chai";
import {ethers} from "hardhat";
import {getDaiConfig, getWethConfig, getWmaticConfig} from "../helpers/params";
import {errors} from "../helpers/errors";
import {constants} from "ethers";

describe("MockA", async () => {
    let
        owner: any,
        user0: any,
        user1: any,
        user2: any,
        ma: any;
    beforeEach(async () => {
        let fixture = await setupFixture();
        ma = fixture.mockA;

        owner = fixture.owner;
        user0 = fixture.user0;
        user1 = fixture.user1;
        user2 = fixture.user2;
    })
    it("mockA.func => name()", async () => {
        expect(await ma.name()).to.equal("MockA");
    });
    it("mockA.func => symbol()", async () => {
        expect(await ma.symbol()).to.equal("MKA");
    });
    it("mockA.func => decimals()", async () => {
        expect(await ma.decimals()).to.equal(18);
    });
    it("mockA.func => totalSupply()", async () => {
        expect(await ma.totalSupply()).to.equal(parseEther("1000000"));
    });
    it("mockA.func => balanceOf()", async () => {
        expect(await ma.balanceOf(owner.address)).to.equal(parseEther("1000000"));
    });
    it("mockA.func => transfer()", async () => {
        await ma.transfer(user0.address, parseEther("100"));
        expect(await ma.balanceOf(user0.address)).to.equal(parseEther("100"));
    });
    it("mockA.func => transferFrom()", async () => {
        await ma.approve(user0.address, parseEther("100"));
        await ma.connect(user0).transferFrom(owner.address, user1.address, parseEther("100"));
        expect(await ma.balanceOf(user1.address)).to.equal(parseEther("100"));
    });
    it("mockA.func => allowance()", async () => {
        await ma.approve(user0.address, parseEther("100"));
        expect(await ma.allowance(owner.address, user0.address)).to.equal(parseEther("100"));
    });
    it("mockA.func => increaseAllowance()", async () => {
        await ma.increaseAllowance(user0.address, parseEther("100"));
        expect(await ma.allowance(owner.address, user0.address)).to.equal(parseEther("100"));
    });
    it("mockA.func => decreaseAllowance()", async () => {
        await ma.increaseAllowance(user0.address, parseEther("200"));
        expect(await ma.allowance(owner.address, user0.address)).to.equal(parseEther("200"));
        await ma.decreaseAllowance(user0.address, parseEther("100"));
        expect(await ma.allowance(owner.address, user0.address)).to.equal(parseEther("100"));
    });
});


describe("copilotA", async () => {
    let
        owner: any,
        user0: any,
        user1: any,
        user2: any,
        cpa: any,
        ma: any;
    beforeEach(async () => {
        let fixture = await setupFixture();
        cpa = fixture.copilotA;
        ma = fixture.mockA;

        owner = fixture.owner;
        user0 = fixture.user0;
        user1 = fixture.user1;
        user2 = fixture.user2;
    })

    it("copilotA.func => name()", async () => {
        expect(await cpa.name()).to.equal("CopilotA");
    });

    it("copilotA.func => symbol()", async () => {
        expect(await cpa.symbol()).to.equal("CPA");
    });

    it("copilotA.func => deposit()", async () => {
        await ma.approve(cpa.address, parseEther("100"));
        await cpa.deposit(parseEther("100"));
        expect(await ma.balanceOf(cpa.address)).to.equal(parseEther("100"));
    });

    it("copilotA.func => withdraw()", async () => {
        await ma.approve(cpa.address, parseEther("100"));
        await cpa.deposit(parseEther("100"));
        await cpa.withdraw(parseEther("100"));
        expect(await ma.balanceOf(cpa.address)).to.equal(parseEther("0"));
    });

    it("copilotA.func => withdraw() => Insufficient balance", async () => {
        await ma.approve(cpa.address, parseEther("100"));
        await cpa.deposit(parseEther("100"));
        await expect(cpa.withdraw(parseEther("101"))).to.be.revertedWith("Insufficient balance");
    });

    it("copilotA.func => owner()", async () => {
        expect(await cpa.owner()).to.equal(owner.address);
    });

    it("copilotA.func => setName()", async () => {
        await cpa.setName("CopilotA");
        expect(await cpa.name()).to.equal("CopilotA");
    });

    it("copilotA.func => setSymbol()", async () => {
        await cpa.setSymbol("CPA");
        expect(await cpa.symbol()).to.equal("CPA");
    });

    it("copilotA.func => setToken()", async () => {
        await cpa.setToken(ma.address);
        expect(await cpa.token()).to.equal(ma.address);
    });

    it("copilotA.func => setToken() => reverted", async () => {
        await expect(cpa.connect(user0).setToken(ma.address)).to.be.reverted;
    });

    it("copilotA.func => setName() => reverted", async () => {
        await expect(cpa.connect(user0).setName("CopilotA")).to.be.reverted;
    });

    it("copilotA.func => setSymbol() => reverted", async () => {
        await expect(cpa.connect(user0).setSymbol("CPA")).to.be.reverted;
    });

    it("copilotA.func => tokenBalance()", async () => {
        await ma.approve(cpa.address, parseEther("100"));
        await cpa.deposit(parseEther("100"));
        expect(await cpa.tokenBalances(owner.address)).to.equal(parseEther("100"));
        await cpa.withdraw(parseEther("30"));
        expect(await cpa.tokenBalances(owner.address)).to.equal(parseEther("70"));
    });
});

// describe("copilotFactory", async () => {
//     let
//         owner: any,
//         user0: any,
//         user1: any,
//         user2: any,
//         cpa: any,
//         cf: any,
//         mb: any,
//         ma: any;
//     beforeEach(async () => {
//         let fixture = await setupFixture();
//         cf = fixture.copilotFactory;
//         ma = fixture.mockA;
//         mb = fixture.mockB;
//
//         owner = fixture.owner;
//         user0 = fixture.user0;
//         user1 = fixture.user1;
//         user2 = fixture.user2;
//     })
//
//     it("copilotFactory.func => name()", async () => {
//         expect(await cf.address).not.eq(constants.AddressZero);
//     });
//
//     it("copilotFactory.func => createCopilot()", async () => {
//         await cf.createCopilotA(ma.address, "MA", "MA");
//         expect(await cf.copilotAAddresses[0]).not.eq(constants.AddressZero);
//
//         await cf.createCopilotA(mb.address, "MB", "MB");
//         expect(await cf.copilotAAddresses[1]).not.eq(constants.AddressZero);
//
//         console.log(`cf.copilotAAddresses[0] = ${await cf.copilotAAddresses(0)}`);
//         console.log(`cf.copilotAAddresses[1] = ${await cf.copilotAAddresses(1)}`);
//     });
//
//
// });