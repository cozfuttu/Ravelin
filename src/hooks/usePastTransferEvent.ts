import { useEffect, useState } from "react";
import { getPastEvent } from "utils/callHelpers";
import { useERC20 } from "./useContract";

const usePastTranferEvent = (tokenAddress: string, contractAddresses: string[]) => {
  const [result, setResult] = useState([]);
  const contract = useERC20(tokenAddress);

  useEffect(() => {
    const handleFetch = async () => {
      const options = {
        filter: {
          to: contractAddresses,
        },
        fromBlock: 6400000,
      };
      const result = await getPastEvent(contract, "Transfer", options);
      setResult(result);
    };
    handleFetch();
  }, [contract, contractAddresses]);

  return result;
};

export default usePastTranferEvent;
