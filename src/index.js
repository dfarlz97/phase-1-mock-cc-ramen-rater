const baseUrl = `http://localhost:3000`
const ramensUrl = `http://localhost:3000/ramens`
const ramenMenu = document.getElementById('ramen-menu');
const ramenDetailContainer = document.getElementById('ramen-detail')
const ramenImage = ramenDetailContainer.querySelector('.detail-image')
const ramenName = ramenDetailContainer.querySelector('.name')
const ramenRestaurant = ramenDetailContainer.querySelector('.restaurant')

fetch(ramensUrl)
  .then(res => res.json())
  .then(data => data.forEach(ramen => {
    const ramenImg = document.createElement('img');
    ramenImg.src = ramen.image
    ramenImg.width = 200;
    ramenImg.height = 200;
    ramenImg.alt = ramen.name

    ramenImg.addEventListener('click', (e) => {
      ramenImage.src = ramen.image
      ramenImage.alt = ramen.name
      ramenName.innerText = ramen.name
      ramenRestaurant.innerText = ramen.restaurant

    })
    ramenImage.appendChild(ramenImg)

  })
  )

const newRamenForm = document.getElementById('new-ramen')
const newName = document.getElementById('new-name')
const newRestaurant = document.getElementById('new-restaurant')
const newImage = document.getElementById('new-image')
const newRating = document.getElementById('new-rating')
const newComment = document.getElementById('new-comment')



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
        ramenName.innerText = imageObj.name
        ramenRestaurant.innerText = imageObj.restaurant
        ramenRating.innerText = imageObj.rating
        ramenComment.innerText = imageObj.comment
      })

      ramenMenu.appendChild(ramenImg)

    })

})
