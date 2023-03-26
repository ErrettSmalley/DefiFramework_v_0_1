package trade.mold.utils;

import org.web3j.abi.EventEncoder;
import org.web3j.abi.TypeReference;
import org.web3j.abi.datatypes.Address;
import org.web3j.abi.datatypes.Bool;
import org.web3j.abi.datatypes.Event;
import org.web3j.abi.datatypes.generated.Bytes32;
import org.web3j.abi.datatypes.generated.Int256;
import org.web3j.abi.datatypes.generated.Uint256;

import java.util.Arrays;

public class Events {

    // Events
    public static final Event IncreasePosition = new Event("IncreasePosition",
            Arrays.asList(
                    new TypeReference<Bytes32>(false) { // key
                    },
                    new TypeReference<Address>(false) { // account
                    },
                    new TypeReference<Address>(false) { // collateralToken
                    },
                    new TypeReference<Address>(false) { // indexToken
                    },
                    new TypeReference<Uint256>(false) { // collateralDelta
                    },
                    new TypeReference<Uint256>(false) { // sizeDelta
                    },
                    new TypeReference<Bool>(false) { // isLong
                    },
                    new TypeReference<Uint256>(false) { // price
                    },
                    new TypeReference<Uint256>(false) { // fee
                    }
            ));

    public static final Event UpdatePosition = new Event("UpdatePosition",
            Arrays.asList(
                    new TypeReference<Bytes32>(false) { // key
                    },
                    new TypeReference<Uint256>(false) { // size
                    },
                    new TypeReference<Uint256>(false) { // collateral
                    },
                    new TypeReference<Uint256>(false) { // averagePrice
                    },
                    new TypeReference<Uint256>(false) { // entryFundingRate
                    },
                    new TypeReference<Uint256>(false) { // reserveAmount
                    },
                    new TypeReference<Int256>(false) { // realisedPnl
                    },
                    new TypeReference<Uint256>(false) { // markPrice
                    }
            ));

    public static final Event ClosePosition = new Event("ClosePosition",
            Arrays.asList(
                    new TypeReference<Bytes32>(false) { // key
                    },
                    new TypeReference<Uint256>(false) { // size
                    },
                    new TypeReference<Uint256>(false) { // collateral
                    },
                    new TypeReference<Uint256>(false) { // averagePrice
                    },
                    new TypeReference<Uint256>(false) { // entryFundingRate
                    },
                    new TypeReference<Uint256>(false) { // reserveAmount
                    },
                    new TypeReference<Int256>(false) { // realisedPnl
                    }
            ));

    public static final Event LiquidatePosition = new Event("LiquidatePosition",
            Arrays.asList(
                    new TypeReference<Bytes32>(false) { // key
                    },
                    new TypeReference<Address>(false) { // account
                    },
                    new TypeReference<Address>(false) { // collateralToken
                    },
                    new TypeReference<Address>(false) { // indexToken
                    },
                    new TypeReference<Bool>(false) { // isLong
                    },
                    new TypeReference<Uint256>(false) { // size
                    },
                    new TypeReference<Uint256>(false) { // collateral
                    },
                    new TypeReference<Uint256>(false) { // reserveAmount
                    },
                    new TypeReference<Int256>(false) { // realisedPnl
                    },
                    new TypeReference<Uint256>(false) { // markPrice
                    }
            ));

    // Event Hashes    
    public static final String IncreasePosition_Hash = EventEncoder.encode(IncreasePosition);
    public static final String UpdatePosition_Hash = EventEncoder.encode(UpdatePosition);
    public static final String ClosePosition_Hash = EventEncoder.encode(ClosePosition);
    public static final String LiquidatePosition_Hash = EventEncoder.encode(LiquidatePosition);
}
