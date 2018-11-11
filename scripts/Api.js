/* eslint-disable strict */
/* eslint-env jquery */
const Api = function () {

  const BASE_URL = 'https://thinkful-list-api.herokuapp.com/bryan/bookmarks';

  function fetchFromServer(callback) {
    $.getJSON(BASE_URL,(callback));
  }
    
  function createBookmark(bookmark, callback) {
    $.ajax({
      url: BASE_URL,
      contentType: 'application/json',
      method: 'POST',
      data: JSON.stringify(bookmark),
      success: callback,
      error: function (xhr, ajaxOptions, thrownError) {
        alert(`${xhr.status}: ${thrownError} ${Object.values(JSON.parse(xhr.responseText))}`);
      }
    });
  }

  function deleteBookmark(itemId, callback) {
    $.ajax({
      url: `${BASE_URL}/${itemId}`,
      method: 'DELETE',
      success: callback,
      error:function (xhr, ajaxOptions, thrownError) {
        alert(`${xhr.status}: ${thrownError} ${Object.values(JSON.parse(xhr.responseText))}`);
      }
    });  
  }

  function updateBookmark(itemId, Object, callback) {
    $.ajax({
      url: `${BASE_URL}/${itemId}`,
      method: 'PATCH',
      contentType: 'application/json',
      data: JSON.stringify(Object),
      success: callback,
      error:function (xhr, ajaxOptions, thrownError) {
        alert(`${xhr.status}: ${thrownError} ${Object.values(JSON.parse(xhr.responseText))}`);
      }
    });
  }

  return {
    fetchFromServer,
    createBookmark,
    deleteBookmark,
    updateBookmark

  };

}();

