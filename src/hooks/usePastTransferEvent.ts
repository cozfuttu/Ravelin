import { useCallback, useEffect, useState } from "react";
import { getPastEvent } from "utils/callHelpers";
import { useERC20, useInterstellarContract } from "./useContract";

const usePastTranferEvent = (contractAddress: string) => {
  const [result, setResult] = useState([]);
  const contract = useERC20(contractAddress);

  useEffect(() => {
    const handleFetch = async () => {
      const options = {
        filter: { to: "0x77aB41738d9dF3d0B42AdD75DC6243db18dcd36C" },
        fromBlock: 4500000,
      };
      const result = await getPastEvent(contract, "Transfer", options);
      setResult(result);
    };
    handleFetch();
  }, [contract]);

  return result;
};

export default usePastTranferEvent;
