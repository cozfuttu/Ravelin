import BigNumber from 'bignumber.js'
import { ethers } from 'ethers'

export const approve = async (lpContract, masterChefContract, account) => {
  return lpContract.methods
    .approve(masterChefContract.options.address, ethers.constants.MaxUint256)
    .send({ from: account, gasPrice: '32000000000' })
}

export const stake = async (masterChefContract, pid, amount, account) => {
  let amountForBrokenPids = amount
  if (pid === 9 || pid === 10) {
    amountForBrokenPids = new BigNumber(amount).div(1e12)
  } else if (pid === 7) {
    amountForBrokenPids = new BigNumber(amount).div(1e10)
  }
//  console.log('depositing:', amountForBrokenPids)
  return masterChefContract.methods
    .deposit(pid, new BigNumber(amountForBrokenPids).times(new BigNumber(10).pow(18)).toString())
    .send({ from: account, gasPrice: '32000000000' })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

export const stakeMasonry = async (masonryContract, amount, account) => {
  return masonryContract.methods
    .stake(new BigNumber(amount).times(new BigNumber(10).pow(18)).toString())
    .send({ from: account, gasPrice: '32000000000' })
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
  let amountForBrokenPids = amount
  if (pid === 9 || pid === 10) {
    amountForBrokenPids = new BigNumber(amount).div(1e12)
  } else if (pid === 7) {
    amountForBrokenPids = new BigNumber(amount).div(1e10)
  }
  return masterChefContract.methods
    .withdraw(pid, new BigNumber(amountForBrokenPids).times(new BigNumber(10).pow(18)).toString())
    .send({ from: account, gasPrice: '32000000000' })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

export const unstakeMasonry = async (masonryContract, amount, account) => {
  return masonryContract.methods
    .withdraw(new BigNumber(amount).times(new BigNumber(10).pow(18)).toString())
    .send({ from: account, gasPrice: '32000000000' })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

export const harvest = async (masterChefContract, pid, account) => {
  return masterChefContract.methods
    .deposit(pid, '0')
    .send({ from: account, gasPrice: '32000000000' })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

export const claimReward = async (masonryContract, account) => {
  return masonryContract.methods
    .claimReward()
    .send({ from: account, gasPrice: '32000000000' })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}