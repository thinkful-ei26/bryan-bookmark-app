/* eslint-disable strict */
/* eslint-env jquery */
/*global Api,Store*/

const bookmarkList = function () {

  function listenNewBookmark() {
    $('.add-bookmark').on('submit', (e) => {
      e.preventDefault();
      let bookmark = {};
      $(e.currentTarget)
        .find('.input-add-bookmark')
        .each((index, item) => {
          let key = $(item).attr('name');
          let value = $(item).val();
          bookmark[key]= value;        
        });
      $('.input-add-bookmark').each((index, element) => {
        $(element).val('');
      });
      Api.createBookmark(bookmark, (response) => {
        Store.addBookmark(response);
        pushHTML(generateHTML(Store.bookmarks));
      });
    });
  }

  function listenFilter() {
    $('.bookmark-rating-filter-select').on('change', (e) => {
      Store.filterRating = $(e.target).val();
      pushHTML(generateHTML(Store.bookmarks));
    });
  }

  function listenSearch() {
    $('.bookmark-search-form').on('submit', (e) => {
      e.preventDefault();
      Store.searchTerm = $('.bookmark-search-input').val();
      pushHTML(generateHTML(Store.bookmarks));
    });
  }

  function listenExpanded() {
    $('.bookmark-container').on('click','.bookmark', (e) => {
      Store.isCondensed = true;
      pushHTML(generateHTML(Store.bookmarks,$(e.target).closest('li').attr('data-item-id')));
    });
  }

  function listenClose() {
    $('.bookmark-container').on('click','.bookmark-preview-close', () => {
      Store.isCondensed = false;
      pushHTML(generateHTML(Store.bookmarks));
    });
  }

  function listenDelete() {
    $('.bookmark-container').on('click', '.delete-bookmark-button', (e) => {
      Api.deleteBookmark($(e.target).closest('section').attr('data-item-id'), () => {
        Store.deleteBookmark($(e.target).closest('section').attr('data-item-id'));
        Store.isCondensed = false;
        pushHTML(generateHTML(Store.bookmarks));
      });

    });
  }

  function listenResetFilter() {
    $('.reset-all-button').on('click', ()=>{
      Store.searchTerm = null;
      Store.filterRating = 0;
      pushHTML(generateHTML(Store.bookmarks));
      $('.bookmark-rating-filter-select').val(1);
      $('.bookmark-search-input').val('');
    });
  }

  function listenEditTitle() {
    $('.bookmark-container').on('click','.expand-bookmark-title', (e) => {
      let itemId = $(e.target).closest('section').attr('data-item-id');
      let itemEdited = Store.bookmarks.find((bookmark) => {
        return bookmark.id === itemId;
      });
      itemEdited.isEditingTitle = true;
      pushHTML(generateHTML(Store.bookmarks,itemId));
      $('.expand-bookmark-title-edit').focus();
    });
  }

  function listenConfirmEditTitle() {
    $('.bookmark-container').on('submit','.expand-bookmark-title-edit-form', (e) => {
      console.log('title edit confirmed');
      e.preventDefault();
      let itemId = $(e.target).closest('.static-view-item-container').attr('data-item-id');
      let newTitle = $('.expand-bookmark-title-edit').val();
      let updateObj = {
        title: newTitle
      };
      Api.updateBookmark(itemId, updateObj, () => {
        const localBookmarkToUpdate = Store.bookmarks.find((bookmark)=> {
          return bookmark.id === itemId;
        });
        localBookmarkToUpdate.title = newTitle;
        localBookmarkToUpdate.isEditingTitle = false;
        pushHTML(generateHTML(Store.bookmarks,itemId));
      });
    });
  }

  function listenEditDesc() {
    $('.bookmark-container').on('click','.expand-bookmark-description', (e) => {
      let itemId = $(e.target).closest('section').attr('data-item-id');
      let itemEdited = Store.bookmarks.find((bookmark) => {
        return bookmark.id === itemId;
      });
      itemEdited.isEditingDesc = true;
      pushHTML(generateHTML(Store.bookmarks,itemId));
      $('.expand-bookmark-description').focus();
    });
  }

  function listenConfirmEditDesc() {
    $('.bookmark-container').on('keydown', '.expand-bookmark-description-edit', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        let itemId = $(e.target).closest('.static-view-item-container').attr('data-item-id');
        let newDescription = $('.expand-bookmark-description-edit').val();
        let updateObj = {
          desc: newDescription
        };
        Api.updateBookmark(itemId, updateObj, () => {
          const localBookmarkToUpdate = Store.bookmarks.find((bookmark)=> {
            return bookmark.id === itemId;
          });
          localBookmarkToUpdate.desc = newDescription;
          localBookmarkToUpdate.isEditingDesc = false;
          pushHTML(generateHTML(Store.bookmarks,itemId));
        });
      }
    });
  }

  function listenEditRating() {
    $('.bookmark-container').on('change','.set-new-rating',(e) => {
      let newRating = $('.set-new-rating').val();
      let itemId = $(e.target).closest('section').attr('data-item-id');
      let updateObj = {
        rating: newRating
      };
      Api.updateBookmark(itemId, updateObj, () => {
        let localRating = Store.bookmarks.find(bookmark => bookmark.id === itemId);
        localRating.rating = newRating;
        pushHTML(generateHTML(Store.bookmarks,itemId));
      });
    });
  }

  function generateStars(rating) {
    let starcode = '<p>&#9733;</p>';
    let starRatingString = '<div class=\'starCount\'>';
    for (let i=1; i<=rating; i++) {
      starRatingString+= starcode;
    }
    starRatingString += '</div>';
    return starRatingString;
  }

  function generateHTML(localBookmarks,id) {
    let HTML = '';
    let filteredArray = localBookmarks;
    if (Store.filterRating > 0) {
      filteredArray = Store.filterBookmarks(Store.filterRating);
      filteredArray.forEach((item) => {
        HTML += `
        <li class="bookmark" data-item-id='${item.id}'>
        <h3 class="bookmark-title">${item.title}</h3>
        <p class="center">${bookmarkList.generateStars(item.rating)}</p>
        </li>`;
      });
    } 

    if (Store.searchTerm) {
      let searchfilteredArray = filteredArray.filter((bookmark)=> {
        return (bookmark.title.toLowerCase().includes(Store.searchTerm.toLowerCase()) || bookmark.desc.toLowerCase().includes(Store.searchTerm.toLowerCase()));
      });
      HTML = '';
      searchfilteredArray.forEach((item) => {
        HTML += `
        <li class="bookmark" data-item-id="${item.id}">
        <h3 class="bookmark-title">${item.title}</h3>
        <p class="center">${bookmarkList.generateStars(item.rating)}</p>
        </li>`;
      });
    }


    if (!Store.searchTerm && Store.filterRating === 0) {
      localBookmarks.forEach((item) => {
        HTML += `
      <li class="bookmark" data-item-id="${item.id}">
      <h3 class="bookmark-title">${item.title}</h3>
      <p class="center">${bookmarkList.generateStars(item.rating)}</p>
      </li>`;
      });
    }

    if (Store.isCondensed) {
      let editBookmark = Store.bookmarks.find((bookmark) =>{
        return bookmark.id === id;
      });
      let editingTitleHTML = `<form class="expand-bookmark-title-edit-form"><input class="expand-bookmark-title-edit" value = "${editBookmark.title}"></form>`;
      let notEditingTitleHTML = `<h2 class="expand-bookmark-title center small-space-below">${editBookmark.title}</h2>`;
      let editingDescHTML = `<textarea class="expand-bookmark-description-edit">${editBookmark.desc}</textarea>`;
      let notEditingDescHTML = `<p class="expand-bookmark-description center">${editBookmark.desc}</p>`;
      HTML += `
      <section role="region" class="static-view-item-container lightbox" data-item-id = "${editBookmark.id}">
      ${editBookmark.isEditingTitle ? editingTitleHTML : notEditingTitleHTML}
      ${editBookmark.isEditingDesc ? editingDescHTML : notEditingDescHTML}
      <div class="expand-rating-cont">
      <p>Rating:</p>
      <select class="set-new-rating">
        <option selected disabled value="${editBookmark.rating}"> Current: ${editBookmark.rating}</option>
        <option value="1">★</option>
        <option value="2">★★</option>
        <option value="3">★★★</option>
        <option value="4">★★★★</option>
        <option value="5">★★★★★</option>
      </select>
      </div>
      <p class="expand-bookmark-url">URL: ${editBookmark.url}</p>
      <form action="${editBookmark.url}" target="_blank">
        <button class="wider-button">Click here to launch site!</button>
      </form>
      <div class="static-button-div">
        <button class="delete-bookmark-button">Delete Item</button>
        <button class="bookmark-preview-close">Close</button>

      </div>
    </section>`;
    }

    return HTML;
  }

  function pushHTML(HTML) {
    $('.bookmark-container').html(HTML);
  }

  function bindEventHandlers() {
    Api.fetchFromServer((data) => {
      Store.pullBookmarks(data);
      pushHTML(generateHTML(Store.bookmarks));
    });
    listenNewBookmark();
    listenFilter();
    listenSearch();
    listenExpanded();
    listenClose();
    listenDelete();
    listenResetFilter();
    listenEditTitle();
    listenConfirmEditTitle();
    listenEditDesc();
    listenConfirmEditDesc();
    listenEditRating();
  }

  return {
    generateStars,
    generateHTML,
    pushHTML,
    bindEventHandlers,
  };

}();