import {setupFixture, toChainlinkPrice, toUsd} from "../helpers/utils";
import {parseEther, parseUnits} from "ethers/lib/utils";
import {expect} from "chai";
import {ethers} from "hardhat";
import {getDaiConfig, getWethConfig, getWmaticConfig} from "../helpers/params";
import {errors} from "../helpers/errors";

describe("MockA", async () => {
    let
        owner: any,
        user0: any,
        user1: any,
        user2: any,

        v: any,
        ma: any;
    beforeEach(async () => {
        let fixture = await setupFixture();
        v = fixture.vault;
        ma = fixture.mockA;

        owner = fixture.owner;
        user0 = fixture.user0;
        user1 = fixture.user1;
        user2 = fixture.user2;
    })
    it("vault", async () => {
        console.log(`v.gov: ${await v.gov()}`);
        console.log(`v.address: ${v.address}`);
    });
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
});


describe("Vault", async () => {
    let
        owner: any,
        user0: any,
        user1: any,
        user2: any,
        v: any,
        ma: any;
    beforeEach(async () => {
        let fixture = await setupFixture();
        v = fixture.vault;
        ma = fixture.mockA;

        owner = fixture.owner;
        user0 = fixture.user0;
        user1 = fixture.user1;
        user2 = fixture.user2;
    })

    it("vault", async () => {
        console.log(`v.gov: ${await v.gov()}`);
        console.log(`v.address: ${v.address}`);
    });
});