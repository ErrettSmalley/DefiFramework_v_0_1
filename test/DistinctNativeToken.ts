import {setupFixture, toChainlinkPrice, toUsd} from "../helpers/utils";
import {parseEther, parseUnits} from "ethers/lib/utils";
import {expect} from "chai";
import {ethers} from "hardhat";
import {getDaiConfig, getWethConfig, getWmaticConfig} from "../helpers/params";
import {errors} from "../helpers/errors";

describe("DistinctNativeToken", async () => {
    let v: any;
    beforeEach(async () => {
        let fixture = await setupFixture();
        v = fixture.vault;
    })

    it("vault", async () => {
        console.log(`v.gov: ${await v.gov()}`);
        console.log(`v.address: ${v.address}`);
    });
});