// NPM MODULES
const axios = require('axios');
const moment = require('moment-timezone');

'use strict';

module.exports.weekRange = async (event, context) => {
  const currDate = moment();
  const endOfWeekDate = moment().add(4, 'days');
  const weekStart = moment.tz(currDate, 'America/New_York').format('MM/DD/YYYY');
  const weekEnd = moment.tz(endOfWeekDate, 'America/New_York').format('MM/DD/YYYY');

  const allMealsToFalse = await axios.put('http://pantry-managementbe.herokuapp.com/mealSchedule/current/', {
    current_week: 'false',
  });

  const setWeeksMeals = await axios.put('http://pantry-managementbe.herokuapp.com/mealSchedule/current/toTrue?', {
    fromDate: weekStart,
    toDate: weekEnd,
  });

  return {
    statusCode: 200,
    body: JSON.stringify({
      dateRange: [weekStart, weekEnd,],
    }), 
  };
};