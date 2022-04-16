import BigNumber from 'bignumber.js'
import { ethers } from 'ethers'

export const approve = async (lpContract, masterChefContract, account) => {
  return lpContract.methods
    .approve(masterChefContract.options.address, ethers.constants.MaxUint256)
    .send({ from: account, gasPrice: '100000000000' })
}

export const stake = async (masterChefContract, pid, amount, account) => {
  console.log('depositing:', amount)
  return masterChefContract.methods
    .deposit(pid, new BigNumber(amount).toString())
    .send({ from: account, gasPrice: '100000000000' })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

export const stakeMasonry = async (masonryContract, amount, account) => {
  return masonryContract.methods
    .stake(new BigNumber(amount).toString())
    .send({ from: account, gasPrice: '100000000000' })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}
 
export const approvsse = async (lpContract, masterChefContract, account) => {
  return lpContract.methods
    .approve(masterChefContract.options.address, ethers.constants.MaxUint256)
    .send({ from: account })
}

export const unstake = async (masterChefContract, pid, amount, account) => {
  return masterChefContract.methods
    .withdraw(pid, new BigNumber(amount).times(new BigNumber(10).pow(18)).toString())
    .send({ from: account, gasPrice: '100000000000' })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

export const unstakeMasonry = async (masonryContract, amount, account) => {
  return masonryContract.methods
    .withdraw(new BigNumber(amount).times(new BigNumber(10).pow(18)).toString())
    .send({ from: account, gasPrice: '100000000000' })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

export const exitMasonry = async (masonryContract, account) => {
  return masonryContract.methods
    .exit()
    .send({ from: account, gasPrice: '100000000000' })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

export const harvest = async (masterChefContract, pid, account) => {
  return masterChefContract.methods
    .deposit(pid, '0')
    .send({ from: account, gasPrice: '100000000000' })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

export const claimReward = async (masonryContract, account) => {
  return masonryContract.methods
    .claimReward()
    .send({ from: account, gasPrice: '100000000000' })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

export const buyBonds = async (treasuryContract, tombAmount, targetPrice, account) => {
  console.log('jkas: ', new BigNumber(tombAmount).toNumber().toLocaleString('fullwide', { useGrouping: false }))
  return treasuryContract.methods
    .buyBonds(new BigNumber(tombAmount).toNumber().toLocaleString('fullwide', { useGrouping: false }), new BigNumber(targetPrice).toString())
    .send({ from: account, gasPrice: '100000000000' })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

export const redeemBonds = async (treasuryContract, bondAmount, targetPrice, account) => {
  return treasuryContract.methods
    .redeemBonds(new BigNumber(bondAmount).toNumber().toLocaleString('fullwide', { useGrouping: false }), new BigNumber(targetPrice).toString())
    .send({ from: account, gasPrice: '100000000000' })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

export const allocateSeigniorage = async (treasuryContract, account) => {
  return treasuryContract.methods
    .allocateSeigniorage()
    .send({ from: account, gasPrice: '100000000000' })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}