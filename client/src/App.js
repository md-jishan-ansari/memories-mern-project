import React, { useContext } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { Container } from '@material-ui/core';

import Navbar from './components/navbar/Navbar';
import Home from './components/home/Home';
import PostDetail from './components/postDetail/PostDetail';
import Auth from './components/auth/Auth';
import { TemplateContext } from './template/TemplateProvider';

const App = () => {
  const ctx = useContext(TemplateContext);
  return (
    <Container maxWidth="xl" style={{ paddingBottom: 25 }} >
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route exact path="/" component={() => <Redirect to='/posts' />} />
          <Route exact path="/posts" component={Home} />
          <Route exact path="/posts/search" component={Home} />
          <Route exact path="/posts/:id" component={PostDetail} />
          <Route exact path="/auth" component={() => (ctx.user ? <Redirect to='/posts' /> : <Auth />)} />
        </Switch>
      </BrowserRouter>
    </Container>
  )
}


export default App;