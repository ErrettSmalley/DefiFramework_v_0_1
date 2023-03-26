package trade.mold;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;
import org.web3j.crypto.Bip32ECKeyPair;
import org.web3j.crypto.Credentials;
import org.web3j.crypto.MnemonicUtils;
import org.web3j.crypto.RawTransaction;
import org.web3j.utils.Convert;
import trade.mold.client.Web3jClient;
import trade.mold.entity.Position;
import trade.mold.service.PositionService;
import trade.mold.service.ReaderService;
import trade.mold.service.VaultService;
import trade.mold.utils.Events;
import trade.mold.utils.MoldUtils;

import javax.annotation.Resource;
import java.math.BigDecimal;
import java.math.BigInteger;
import java.util.Arrays;
import java.util.List;

import static org.web3j.crypto.Bip32ECKeyPair.HARDENED_BIT;

@SpringBootTest(classes = Application.class)
class MoldTests {

    @Resource
    private Web3jClient web3jClient;

    @Resource
    private PositionService positionService;

    @Resource
    private VaultService vaultService;

    @Value("${chain.mne}")
    private String mne;

    @Resource
    private ReaderService readerService;

    @Test
    public void latestBlock() throws Exception {
        BigInteger num = web3jClient.latestBlockNumber();
        System.out.println(">> Test latestBlockNumber: " + num.longValue());
    }

    @Test
    public void liqPrice() {
        Position position = new Position();
        position.setSize(BigDecimal.valueOf(15000));
        position.setCollateral(BigDecimal.valueOf(1484));
        position.setAveragePrice(BigDecimal.valueOf(1504));
        position.setEntryFundingRate(BigDecimal.ZERO);
        position.setCollateralToken("0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0");
        position.setLong(true);
        positionService.getLiqPrice(position);
    }

    @Test
    public void generateRobots() {
        byte[] seed = MnemonicUtils.generateSeed(mne, "");
        Bip32ECKeyPair masterKeypair = Bip32ECKeyPair.generateKeyPair(seed);

        int number = 3;
        int chain = 80001;

        String template = "INSERT INTO t_robot VALUES (null, '%s', %s, %s, %s);";
        StringBuilder sql = new StringBuilder();

        for (int i = 0; i < number; i++) {
            final int[] path = {44 | HARDENED_BIT, 60 | HARDENED_BIT, HARDENED_BIT, 0, i};
            Bip32ECKeyPair childKeypair = Bip32ECKeyPair.deriveKeyPair(masterKeypair, path);
            Credentials credential = Credentials.create(childKeypair);
            String newLine = String.format(template, credential.getAddress().toLowerCase(), i, 0, chain);
            sql.append(newLine).append("\n");
        }

        System.out.println(sql);
    }

    @Test
    public void hashes() {
        System.out.println(Events.IncreasePosition_Hash);
        System.out.println(Events.UpdatePosition_Hash);
        System.out.println(Events.ClosePosition_Hash);
    }

    @Test
    public void testExist() {
        vaultService.isPositionExist("0x8904c4862c89f7cc9763ee4571c46b7c1a0c767514739e6de523c6300e75a600", 80001);
    }

    @Test
    public void testRates() throws Exception {
        readerService.getCumulativeFundingRates(80001);
    }

    @Test
    public void robotSend() throws Exception {
        byte[] seed = MnemonicUtils.generateSeed(mne, "");
        Bip32ECKeyPair masterKeypair = Bip32ECKeyPair.generateKeyPair(seed);

        final int[] path = {44 | HARDENED_BIT, 60 | HARDENED_BIT, HARDENED_BIT, 0, 1};
        Bip32ECKeyPair childKeypair = Bip32ECKeyPair.deriveKeyPair(masterKeypair, path);
        Credentials credential = Credentials.create(childKeypair);

        String sender = credential.getAddress();
        BigInteger nonce = web3jClient.getNonce(sender);
        RawTransaction tx = RawTransaction.createTransaction(
                nonce,
                web3jClient.gasPrice(),
                BigInteger.valueOf(21_000),
                "0x1B87292764856C0504E63D561B1Cc033e9bf8f89",
                Convert.toWei("1.8", Convert.Unit.ETHER).toBigInteger(),
                ""
        );
        web3jClient.sendContractFunction(tx, 80001, credential);
    }

    @Test
    public void updatePs() {
        List<String> keys = Arrays.asList(
                "0x25ad0da5e112ced3bc3f900487a2cbe21a108d2a7c831aaf88a7b8d02db3f1c7",
                "0x31c1602156bdfdefa3878d87ff061b3fc46b4ad1cbddb4c0082c01f37844684a",
                "0x4b5e92e034fd9c521ef052e714e531b9d436f56135c78c509cfb218601a4a216",
                "0x8c7682fdca58b09e890fb575dde027ac1e77a55250fe9f0c42de823072e311fb",
                "0xc6f26af884f5b0a252dcd30047bef6327d64c1492ced665f9dd28dbde278af40",
                "0xd4150d4aa24590d4767de0bdf259ded7d78e408db01c83a16202683f01d008be"
        );
        positionService.updatePositions(80001, keys);
    }
}
