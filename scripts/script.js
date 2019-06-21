"use strict";

let $searchForm = $('#search-form');
let $bookList = $ ('#book-list');
let arrBooks = []
$searchForm.on("submit", function (event) {
  event.preventDefault();
  let query = $(this).find('[name="srch-term"]').val().replace(/\s/g, "+");

  getBooks(query);
});

function getBooks(query) {
  let server = 'https://www.googleapis.com/books/v1/volumes';

  $.ajax({
    url: server,
    method: "GET",
    data: `q=${query}`
  }).done(function (response) {
    arrBooks = response.items;
    $bookList.empty();
    arrBooks.forEach(function (book){
      $('<a href="">').addClass('list-group-item')
      .text(book.volumeInfo.title)
      .attr('data-id', book.id)
      .appendTo($bookList);
    })
  }).fail(function (error) {
    console.log(error);
  });
}