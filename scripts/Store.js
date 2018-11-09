/* eslint-disable strict */
const Store = (function () {
  /* We're creating a global Store function that we invoke on the last line. We should be able to receive bookmarks from the API
  We want to default to a condensed: true statement, only changing after the user selects to expand
  We should have a function for adding a bookmark
  We should have a function to delete a bookmark
  We should have a function for filtering an array based on the rating selection
  We should have a function that iterates through an object and finds the id/key value and returns selected */
  function addBookmark(item) {
    this.items.push(Object.assign(item, {condensed: true}));
  };

  function findById(id) {
    return this.items.find(item => item.id === id);
  }

  function findAndDelete(id) {
    this.items = this.items.filter(item => item.id !== id);
  }

  function filterByRating(val) {
    this.items = this.items.filter(item => {
      return item.rating >= val;
    });
  }

  
  return {
    bookmarks: [],
    filter: 0,
    addBookmark,
    findById,
    findAndDelete,
    filterByRating,
    
  };
  
}());