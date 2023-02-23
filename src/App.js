/* duocelot */ /*kasodon */
/* eslint-disable no-undef */
import React from "react";
import styled from 'styled-components';
import './App.css';

function App() {
  const Theme = styled.div`
* {
    font-family: 'Bangers', cursive;
}
  ${css}
`;
    const App = styled.div`
  margin: 0;
  padding: 1rem;
  width: 100%;
  height: 100vh;
  background-color: #1E1E1E;
  background-image: url('https://ik.imagekit.io/onyedika/skycross/space_background_H1pEe91Gj.svg?ik-sdk-version=javascript-1.4.3&updatedAt=1677148309303');
background-size: cover;
background-position: center;
  color: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  font-family: 'Gajraj One', cursive;
`;

    return ( 
    <App className = "App" >
        <ul className="nav nav-pills" id="pills-tab" role="tablist">
  <li className="nav-item" role="presentation">
    <button className="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true">Start</button>
  </li>
  <li className="nav-item" role="presentation">
    <button className="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">Game</button>
  </li>
  <li className="nav-item" role="presentation">
    <button className="nav-link" id="pills-contact-tab" data-bs-toggle="pill" data-bs-target="#pills-contact" type="button" role="tab" aria-controls="pills-contact" aria-selected="false">Leaderboard</button>
  </li>
</ul>
<div className="tab-content" id="pills-tabContent">
  <div className="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab" tabindex="0">
    <div className="container-fluid stat">
      <div className="row">
        <div className="player-icon col-4">
          <img src="https://ik.imagekit.io/onyedika/skycross/avatar01_zM5ioOG4w.png?ik-sdk-version=javascript-1.4.3&updatedAt=1676939856771" alt="" />
        </div>
        <div className="player-detail col-8">
          <div className="player-stat">
            <p><span>Player:</span> Kasodon.near</p>
            <p><span>Last Score:</span> 4221</p>
          </div>
          <div className="player-actions">
          <button type="button" class="filled">Launch Game</button>
          <button type="button" class="outline">Leaderboard</button>
          </div>
        </div>
      </div>
    </div>
    <div className="controls">
      <h2 className="text-uppercase mb-4">Control Keys</h2>
      <div className="keys">
        <p className="mb-5"><span>S</span> Press and hold to shoot</p>
        <p className=""><span>⬆</span> <span>⬇</span> <span>⬅</span> <span>➡</span> To move your ship around</p>
      </div>
    </div>
    </div>
  <div className="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab" tabindex="0">This is some.</div>
  <div className="tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab" tabindex="0">
  <div className="leaderboard">
      <div className="score">
      <p className="num">1</p>
        <p className="name">Kasodon.near</p>
        <p className="points">1234</p>
      </div>
      <div className="score">
      <p className="num">1</p>
        <p className="name">Kasodon.near</p>
        <p className="points">1234</p>
      </div>
      <div className="score">
        <p className="num">1</p>
        <p className="name">Kasodon.near</p>
        <p className="points">1234</p>
      </div>
      <div className="score">
      <p className="num">1</p>
        <p className="name">Kasodon.near</p>
        <p className="points">1234</p>
      </div>
    </div>
  </div>
</div>
        </App>
       
    );
}

export default App;