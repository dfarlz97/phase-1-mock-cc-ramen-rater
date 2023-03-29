const ramensUrl = `http://localhost:3000/ramens`
const ramenMenu = document.getElementById('ramen-menu');
const ramenDetailContainer = document.getElementById('ramen-detail')
const ramenImage = ramenDetailContainer.querySelector('.detail-image')
const ramenName = ramenDetailContainer.querySelector('.name')
const ramenRestaurant = ramenDetailContainer.querySelector('.restaurant')

//declare variables for post request
const newRamenForm = document.getElementById('new-ramen')
const newName = document.getElementById('new-name')
const newRestaurant = document.getElementById('new-restaurant')
const newImage = document.getElementById('new-image')
const newRating = document.getElementById('new-rating')
const newComment = document.getElementById('new-comment')

/*
See all ramen images in the `div` with the id of `ramen-menu`. When the page
loads, request the data from the server to get all the ramen objects. Then,
display the image for each of the ramen using an `img` tag inside the
`#ramen-menu` div.
*/
fetch(ramensUrl)
  .then(res => res.json())
  .then(data => data.forEach(ramen => {
    const ramenImg = document.createElement('img');
    ramenImg.src = ramen.image
    ramenImg.alt = ramen.name

/*
Click on an image from the `#ramen-menu` div and see all the info about that
ramen displayed inside the `#ramen-detail` div and where it says
`insert comment here` and `insert rating here`.
*/
    ramenImg.addEventListener('click', (e) => {
      ramenImage.src = ramen.image
      ramenImage.alt = ramen.name
      ramenName.textContent = ramen.name
      ramenRestaurant.textContent = ramen.restaurant
    })
    ramenMenu.appendChild(ramenImg)
  })
  )

/*
Create a new ramen after submitting the `new-ramen` form. The new ramen should
be added to the`#ramen-menu` div. 
*/
newRamenForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const newRamenObj = {
    name: newName.value,
    restaurant: newRestaurant.value,
    image: newImage.value,
    comment: newComment.value,
    rating: newRating.value
  }

  fetch(ramensUrl, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(newRamenObj)
  }).then(res => res.json())
    .then(function(imageObj) {

      const ramenImg = document.createElement('img')
      ramenImg.src = imageObj.image
      ramenImg.alt = imageObj.name

      ramenImg.addEventListener('click', (e) => {
        ramenImage.src = imageObj.image
        ramenImage.alt = imageObj.name
        ramenName.textContent = imageObj.name
        ramenRestaurant.textContent = imageObj.restaurant
        ramenRating.textContent = imageObj.rating
        ramenComment.textContent = imageObj.comment
      })

      ramenMenu.appendChild(ramenImg)

    })

})
