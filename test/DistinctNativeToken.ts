import {setupFixture, toChainlinkPrice, toUsd} from "../helpers/utils";
import {parseEther, parseUnits} from "ethers/lib/utils";
import {expect} from "chai";
import {ethers} from "hardhat";
import {getDaiConfig, getWethConfig, getWmaticConfig} from "../helpers/params";
import {errors} from "../helpers/errors";

describe("DistinctNativeToken", async () => {
    let ma: any;

    beforeEach(async () => {
        // let fixture = await setupFixture();
        // ma = fixture.mockA;
    })

    it("weth", async () => {
        console.log("hello world");
    });
});