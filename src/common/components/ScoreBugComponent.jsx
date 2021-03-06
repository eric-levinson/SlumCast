import React, { Component } from "react";
import {
  MDBRow,
  MDBContainer,
  MDBCol,
  MDBIcon
} from 'mdbreact';
import { useSelector } from 'react-redux'
import Color from 'color';
import { SeriesScore } from './SeriesScore'
import { Team0lights, Team1lights } from './SeriesLights'
import _ from 'lodash'

const teambox = {
  boxShadow: `5px 0px 3px -2px rgba(33, 33, 33, 0.55)`,
};
const lightbox = {
  borderRadius: `50%`,
  width: `20px`,
  height: `20px`
}

const light = {}

const scoreBg = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4' viewBox='0 0 4 4'%3E%3Cpath fill='%239C92AC' fill-opacity='0.4' d='M1 3h1v1H1V3zm2-2h1v1H3V1z'%3E%3C/path%3E%3C/svg%3E")`

let dot = {
  height: `25px`,
  width: `25px`,
  backgroundColor: `#bbb`,
  borderRadius: `50%`,
  display: `inline-block`
}

export const ScoreBugComponent = () => {

  const selectGameState = state => state.wsReducer['game:update_state']
  const gaming = useSelector(state => selectGameState(state))

  const series = useSelector(state => state.gamedata.series)


  let teamData
  let time
  let isOT = false
  let teamColors = {
    team0: { primary: 'rgba(0,212,255,1)', secondary: 'rgba(9,9,121,1)' },
    team1: { primary: 'Orange', secondary: 'DarkOrange' },
  }



  if (gaming != undefined) {
    teamData = gaming.game.teams
    isOT = gaming.game.isOT
    let gameTime = gaming.game.time_seconds
    let round = Math.ceil(gameTime)
    function myTime(time) {
      var min = ~~((time % 3600) / 60);
      var sec = time % 60;
      var sec_min = "";
      sec_min += "" + min + ":" + (sec < 10 ? "0" : "");
      sec_min += "" + sec;
      return sec_min;
    }
    time = myTime(round)


    const scoreColor = (e, b) => {
      let color = Color('#' + b)

      return e === 'E5E5E5' ? color.darken(0.5).hex() : e
    }

    teamColors = {
      team0: { primary: '#' + teamData[0].color_primary, secondary: scoreColor(teamData[0].color_secondary, teamData[0].color_primary) },
      team1: { primary: '#' + teamData[1].color_primary, secondary: scoreColor(teamData[1].color_secondary, teamData[1].color_primary) },
    }


    //console.log(teamColors)

  }
  let team0grad = `linear-gradient(-270deg, rgba(0,0,0,1) 0%,` + teamColors.team0.secondary + ` 35%, ` + teamColors.team0.primary + ` 100%)`
  let team1grad = `linear-gradient(270deg, rgba(0,0,0,1) 0%,` + teamColors.team1.secondary + ` 35%, ` + teamColors.team1.primary + ` 100%)`

  let lightsActive0 = series.lights ? 'mb-1' : 'd-none'
  let lightsActive1 = series.lights ? 'mt-1' : 'd-none'


  return (
    <MDBRow top>
      <MDBCol size="3">

      </MDBCol>

      {/* Score Bug Component */}
      <MDBCol size="6" className="text-light" style={{ padding: `1px`, backgroundColor: `rgba(0, 0, 0, 0.58)` }}>
        <MDBContainer className="p-0">
          <MDBRow>

            {/* team 0 bug */}
            <MDBCol size="4" className="" >
              <MDBContainer className="m-0 p-0 h-100" style={{ background: team0grad }}>

                <MDBRow className="m-0" style={{}}>

                  <MDBCol size="3" className="d-none p-0 ">
                    {/* <img src="https://rustdeez.com/img/logos/cropped/POR.png" alt="" className="img-fluid" style={{ width: `100%`, opacity: `88%` }} /> */}
                  </MDBCol>
                  <MDBCol size="9" className="p-1 text-center text-light" style={{ teambox, fontSize: `2.0vw`, fontWeight: `800`, lineHeight: `2vw` }}>

                    <div className="h-100 d-flex align-items-center justify-content-center">
                      <div className="pt-1">
                        <strong>
                          {teamData != undefined ? teamData[0].name : 'Blue'}
                        </strong>
                      </div>

                    </div>
                  </MDBCol>
                  <MDBCol size="3" className="p-0 pt-1 text-center d-flex align-items-center justify-content-center">
                    <span style={{ fontSize: `3.2em`, fontWeight: `800` }}>
                      <strong>{teamData != undefined ? teamData[0].score : '0'}
                      </strong>
                    </span>
                  </MDBCol>

                  <div className="mb-1">
                    <Team0lights />
                  </div>

                </MDBRow>

              </MDBContainer>
            </MDBCol>



            {/* series score +  time bug */}
            <MDBCol size="4" className=" text-light text-center">

              <div className={series.text && series.active ? "p-0 m-0 text-center text-light" : "d-none"} style={{ fontSize: `1.2vw`, fontWeight: `500` }}>
                <SeriesScore />
              </div>

              <div className="" style={{ marginTop: `-10px`, marginBottom: `-20px` }} >
                <span id="overtime" className={isOT ? "" : "d-none"} style={{ fontSize: `2.6vw`, fontWeight: `800` }}>+ </span>
                <span id="time" style={{ fontSize: `2.6vw`, fontWeight: `800` }}>{time}</span>
              </div>

            </MDBCol>

            {/* team 1 bug */}
            <MDBCol size="4" className="">
              <MDBContainer className="m-0 p-0 h-100" style={{ background: team1grad }}>

                <MDBRow className="m-0">

                  <MDBCol size="3" className="d-none p-0">
                    {/* <img src="https://rustdeez.com/img/logos/cropped/ATL.png" alt="" className=" img-fluid" style={{ width: `100%`, opacity: `88%` }} /> */}
                  </MDBCol>
                  <MDBCol size="3" className="p-0 pt-1 text-center d-flex align-items-center justify-content-center" >
                    <span style={{ fontSize: `3.2em`, fontWeight: `800` }}><strong>{teamData != undefined ? teamData[1].score : '0'}</strong></span>
                  </MDBCol>
                  <MDBCol size="9" className="p-1 text-center text-light" style={{ teambox, fontSize: `2.0vw`, fontWeight: `800`, lineHeight: `2vw` }}>

                    <div className="h-100 d-flex align-items-center justify-content-center">
                      <div className="">
                        <strong>
                          {teamData != undefined ? teamData[1].name : 'Orange'}
                        </strong>
                      </div>
                    </div>

                  </MDBCol>


                  <div className="mb-1">
                    <Team1lights />
                  </div>

                </MDBRow>

              </MDBContainer>
            </MDBCol>






          </MDBRow>
        </MDBContainer>
      </MDBCol>
    </MDBRow>
  )
}