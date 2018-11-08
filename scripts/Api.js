/* eslint-env jquery */
'use strict';

const Api = (function() {
  const BASE_URL = 'http://thinkful-list-api.herokuapp.com/bryan/bookmarks';
  function getBookmark(callback) {
    $.getJSON(BASE_URL, callback);

  };

  function createBookmark(name, url, description, rating, callback, errorCallback) {
    const newBookmark = JSON.stringify(
      {
        name,
        url, 
        description,
        rating,
      }
    );
    $.ajax({
      url: `${BASE_URL}`,
      method: 'POST',
      contentType: 'application/json',
      data: newBookmark,
      success: callback,
      error: errorCallback,
    });
  };

  function updateBookmark(id, updateData, callback, errorCallback) {
    $.ajax({
      url: `${BASE_URL}/${id}`,
      method: 'PATCH',
      contentType: 'application/json',
      data: JSON.stringify(updateData),
      success: callback,
      error: errorCallback,
    });
  };

  function deleteBookmark(id, updateData, callback, errorCallback) {
    $.ajax({
      url: `${BASE_URL}/${id}`,
      method: 'DELETE',
      success: callback,
      error: errorCallback,
    })
  };

  return {
    getBookmark,
    createBookmark,
    updateBookmark,
    deleteBookmark,
  };
})();