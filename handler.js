// NPM MODULES
const axios = require('axios');
const moment = require('moment-timezone');

// GLOBAL VARIABLES
const baseUrl = `localhost:11235`

'use strict';

module.exports.hello = async (event, context) => {
  let body;
  if (event.body) {
    body = JSON.parse(event.body);
  }
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Go Serverless v1.0! Your function executed successfully!',
      input: event,
    }),
  };

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};

module.exports.weekRange = async (event, context) => {
  const currDate = moment();
  const endOfWeekDate = moment().add(4, 'days');
  const weekStart = moment.tz(currDate, 'America/New_York').format('MM/DD/YYYY');
  const weekEnd = moment.tz(endOfWeekDate, 'America/New_York').format('MM/DD/YYYY');

  /*
    TODO:
      * change all meals on meal_schedule to false
      * use the range of dates to change the meals that are contained
        between those dates and make them currWeek meals
  */

  const allMealsToFalse = axios.put('http://pantry-managementbe.herokuapp.com/mealSchedule/current/', {
    current_week: 'true',
  });

  return {
    statusCode: 200,
    body: JSON.stringify({
      dateRange: [weekStart, weekEnd,],
      allScheduledMeals,
    }), 
  };
};