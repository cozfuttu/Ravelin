import React, { useEffect, Suspense, lazy, useState } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import NotFound from 'views/NotFound';
import PageLoader from 'components/PageLoader';
import Menu from 'components/Menu/Menu';
import { useFetchPublicData } from 'state/hooks';
import BigNumber from 'bignumber.js';

const Home = lazy(() => import('./views/Home'))
const Farm = lazy(() => import('./views/Farms'))
const BoardRoom = lazy(() => import('./views/BoardRoom'))
const Bond = lazy(() => import('./views/Bond'))

const fmt = {
  decimalSeparator: '.',
  groupSeparator: ',',
  groupSize: 3,
  secondaryGroupSize: 0,
  fractionGroupSeparator: ' ',
  fractionGroupSize: 0
}

const App = () => {
  const { account, connect } = useWallet()

  BigNumber.config({ FORMAT: fmt })

  useEffect(() => {
    if (!account && window.localStorage.getItem('accountStatus')) {
      connect('injected')
    }
  }, [account, connect])

  useFetchPublicData()

  return (
    <Router>
      <Suspense fallback={<PageLoader />}>
        <Menu />
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/farm">
            <Farm />
          </Route>
          <Route path="/boardroom">
            <BoardRoom />
          </Route>
          <Route path="/bond">
            <Bond />
          </Route>
          <Route component={NotFound} />
        </Switch>
      </Suspense>
    </Router>
  );
}

export default App;
