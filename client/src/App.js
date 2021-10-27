import React, { useContext } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { Container } from '@material-ui/core';

import Navbar from './components/navbar/Navbar';
import Home from './components/home/Home';
import PostDetail from './components/postDetail/PostDetail';
import SavedMemories from './components/savedMemories/SavedMemories';
import UserMemories from './components/userMemories/UserMemories';
import Auth from './components/auth/Auth';
import ResetPassword from './components/auth/ResetPassword';
import UserProfile from './components/userProfile/UserProfile';
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
          <Route exact path="/savedMemories" component={() => (!ctx.user ? <Redirect to='/posts' /> : <SavedMemories />)} />
          <Route exact path="/myMemories" component={() => (!ctx.user ? <Redirect to='/posts' /> : <UserMemories />)} />
          <Route exact path="/user/:signin" component={() => (ctx.user ? <Redirect to='/posts' /> : <Auth />)} />
          <Route exact path="/user/resetPassword/:token" component={() => (ctx.user ? <Redirect to='/posts' /> : <ResetPassword />)} />
          <Route exact path="/me" component={UserProfile} />
        </Switch>
      </BrowserRouter>
    </Container>
  )
}


export default App;