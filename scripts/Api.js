/* eslint-env jquery */
'use strict';

const Api = function() {
  const BASE_URL = 'http://thinkful-list-api.herokuapp.com/bryan/bookmarks';
  const getItems = function(callback) {
    $.getJSON(BASE_URL, callback);

  };
  return {
    getItems,
  };
};