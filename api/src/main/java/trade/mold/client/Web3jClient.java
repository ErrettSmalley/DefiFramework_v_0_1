package trade.mold.client;

import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.web3j.abi.FunctionEncoder;
import org.web3j.abi.FunctionReturnDecoder;
import org.web3j.abi.datatypes.Function;
import org.web3j.abi.datatypes.Type;
import org.web3j.crypto.*;
import org.web3j.protocol.Web3j;
import org.web3j.protocol.core.DefaultBlockParameter;
import org.web3j.protocol.core.DefaultBlockParameterName;
import org.web3j.protocol.core.DefaultBlockParameterNumber;
import org.web3j.protocol.core.methods.request.Transaction;
import org.web3j.protocol.core.methods.response.*;
import org.web3j.protocol.http.HttpService;
import org.web3j.utils.Numeric;

import java.math.BigInteger;
import java.util.List;

import static org.web3j.crypto.Bip32ECKeyPair.HARDENED_BIT;

@Slf4j
@Component
public class Web3jClient {

    @Value("${chain.rpc}")
    private String rpc;

    @Value("${chain.mne}")
    private String mne;

    private Web3j web3j;

    private void setupWeb3j() {
        if (web3j == null)
            web3j = Web3j.build(new HttpService(rpc));
    }

    public BigInteger latestBlockNumber() throws Exception {
        setupWeb3j();
        EthBlockNumber result = web3j.ethBlockNumber().sendAsync().get();
        return result.getBlockNumber();
    }

    public EthBlock.Block getBlockByNumber(long num) throws Exception {
        setupWeb3j();
        return web3j.ethGetBlockByNumber(new DefaultBlockParameterNumber(num), true).send().getBlock();
    }

    public Credentials getCredentials(int index) {
        byte[] seed = MnemonicUtils.generateSeed(mne, "");
        Bip32ECKeyPair masterKeypair = Bip32ECKeyPair.generateKeyPair(seed);
        final int[] path = {44 | HARDENED_BIT, 60 | HARDENED_BIT, HARDENED_BIT, 0, index}; // m/44/60'/0'/0/+
        Bip32ECKeyPair childKeypair = Bip32ECKeyPair.deriveKeyPair(masterKeypair, path);
        return Credentials.create(childKeypair);
    }

    public BigInteger getNonce(String address) throws Exception {
        setupWeb3j();
        EthGetTransactionCount ethGetTransactionCount = web3j.ethGetTransactionCount(address, DefaultBlockParameter.valueOf("latest")).send();
        return ethGetTransactionCount.getTransactionCount();
    }

    public BigInteger gasPrice() throws Exception {
        EthGasPrice ethGasPrice = web3j.ethGasPrice().send();
        return ethGasPrice.getGasPrice();
    }

    public List<Type> viewContractFunction(Function function, String contract, String address) throws Exception {
        setupWeb3j();
        String encodedFunction = FunctionEncoder.encode(function);
        EthCall response = web3j.ethCall(Transaction.createEthCallTransaction(address, contract, encodedFunction),
                DefaultBlockParameterName.LATEST).sendAsync().get();
        return FunctionReturnDecoder.decode(response.getValue(), function.getOutputParameters());
    }

    public String sendContractFunction(RawTransaction transaction, long chain, Credentials credentials) throws Exception {
        setupWeb3j();

        byte[] signMessage = TransactionEncoder.signMessage(transaction, chain, credentials);
        String hexValue = Numeric.toHexString(signMessage);

        EthSendTransaction response = web3j.ethSendRawTransaction(hexValue).sendAsync().get();
        return response.getTransactionHash();
    }

    public boolean isTxSuccess(String txHash) {
        setupWeb3j();

        if (StringUtils.isBlank(txHash))
            return false;

        try {
            EthGetTransactionReceipt resp = web3j.ethGetTransactionReceipt(txHash).send();
            if (resp.getTransactionReceipt().isPresent()) {
                TransactionReceipt receipt = resp.getTransactionReceipt().get();
                return StringUtils.equals(receipt.getStatus(), "0x1");
            } else {
                return false;
            }
        } catch (Exception e) {
            log.error("### Web3jClient isTxSuccess error:", e);
            return false;
        }
    }

    public TransactionReceipt getTransactionReceiptByHash(String txHash) {
        try {
            setupWeb3j();
            EthGetTransactionReceipt ethGetTransactionReceipt = web3j.ethGetTransactionReceipt(txHash).send();
            if (ethGetTransactionReceipt.getTransactionReceipt().isPresent()) {
                return ethGetTransactionReceipt.getTransactionReceipt().get();
            } else {
                return null;
            }
        } catch (Exception e) {
            log.error("### Web3jClient getTransactionReceiptByHash error:", e);
            return null;
        }
    }

}
