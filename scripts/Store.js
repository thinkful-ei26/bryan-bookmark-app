/* eslint-disable strict */
const Store = function () {

  const bookmarks = [];
  const searchTerm = '';

  const addBookmark = function (bookmark) {
    this.bookmarks.push ({
      id: bookmark.id,
      title: bookmark.title,
      url: bookmark.url,
      desc: bookmark.desc,
      rating: bookmark.rating,
      isCondensed: false,
      isEditingTitle: false,
      isEditingDesc: false
    });   
  };

  const pullBookmarks = function (data) {
    data.forEach((item) => {
      this.bookmarks.push ({
        id: item.id,
        title: item.title,
        url: item.url,
        desc: item.desc,
        rating: item.rating,
        isCondensed: false,
        isEditingTitle: false,
        isEditingDesc: false
      });
    });
  };

  const deleteBookmark = function(itemId) {
    this.bookmarks = this.bookmarks.filter((bookmark) => {
      return bookmark.id !== itemId;
    });
  };

  const filterBookmarks = (rating) => {
    let filteredBookmarkList = Store.bookmarks.filter((bookmark) => {
      return bookmark.rating >= parseInt(rating);
    });
    return filteredBookmarkList;
  };
  
  return {
    bookmarks,
    searchTerm,
    filterRating: 0,
    addBookmark,
    pullBookmarks,
    deleteBookmark,
    filterBookmarks,
  };
}();