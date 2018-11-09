/* eslint-disable strict */
/* eslint-env jquery*/

const Api = function () {

  const BASE_URL = 'https://thinkful-list-api.herokuapp.com/bryan/bookmarks';

  function fetchFromServer(callback) {
    $.getJSON(BASE_URL,(callback));
  }
  
  function createBookmark(bookmark,callback) {
    const updateQueryObj = JSON.stringify(bookmark);
    $.ajax({
      url: BASE_URL,
      contentType: 'application/json',
      method: 'POST',
      data: updateQueryObj,
      success: callback
    });
  }

  function deleteBookmark(itemId, callback) {
    $.ajax({
      url: `${BASE_URL}/${itemId}`,
      method: 'DELETE',
      success: callback});
  }

  function updateBookmark(itemId, Object, callback) {
    $.ajax({
      url: `${BASE_URL}/${itemId}`,
      method: 'PATCH',
      contentType: 'application/json',
      data: JSON.stringify(Object),
      success: callback
    });
  }

  return {
    fetchFromServer,
    createBookmark,
    deleteBookmark,
    updateBookmark
  };

}();