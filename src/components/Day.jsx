import React, { Component } from "react";
import Show from "./Show";

class Day extends Component {
  constructor(props) {
    super(props);
    this.fetchMovies();
  }
  render() {
    return <Show />;
  }

  async fetchMovies() {
    let now = new Date().toISOString().split("T");
    let currentDate = now[0];
    let currentTime = now[1]
      .split(":")
      .slice(0, 2)
      .join(":");

    let result = await fetch("http://localhost:3000/json/shows/");
    let allShows = await result.json();

    allShows = allShows.filter(show => {
      if (show.date > currentDate) {
        return true;
      } else if (show.date === currentDate && show.time > currentTime) {
        return true;
      } else {
        return false;
      }
    });

    allShows.sort((a, b) => {
      if (a.date < b.date) {
        return -1;
      } else if (a.date > b.date) {
        return 1;
      } else if (a.time < b.time) {
        return -1;
      } else if (a.time > b.time) {
        return 1;
      } else {
        return 0;
      }
    });
    allShows.length = 21;
    if (allShows.length === 0) {
      return;
    }

    let firstDate = allShows[0].date;
    // create a day with the same date as the first show
    this.days = [new Day({ date: firstDate })];
    for (let show of allShows) {
      let currentDay = this.days[this.days.length - 1];
      // if the date of the show isn't the current day
      // create a new day
      if (show.date !== currentDay.date) {
        currentDay = new Day({ date: show.date });
        this.days.push(currentDay);
      }
      // add the show to the current day object
      currentDay.shows.push(show);
      this.setState(state => this);
    }
  }
}

export default Day;