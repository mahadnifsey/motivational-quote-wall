// Defining Variables
// Click even button for - Update
const update = document.querySelector('#update-button')

// Click event button for - Delete
const deleteButton = document.querySelector('#delete-button')

// No more quotes variable
const messageDiv = document.querySelector('#message')

// ==================================================================================================================
// Update Request Section
update.addEventListener('click', _ => {
    // Send PUT request when the button is clicked
    fetch('/quotes', {
        method: 'put',
        // Tell the server we're sending JSON data
        headers: { 'Content-Type': 'application/json'},
        // Convert the date into JSON using stringify
        body: JSON.stringify({
            name: 'Eric Thomas',
            quote: `"Done is better than perfect if perfect ain't done."`
        })
    })
    .then(res => {
        if (res.ok) return res.json()
    })
    .then(response => {
        window.location.reload(true) //Automatically refreshed the browser once user clicks the button
    })
})

// ==================================================================================================================
// Delete Request Section
deleteButton.addEventListener('click', _ => {
    // Send Delete request when the button is clicked
    fetch('/quotes', {
      method: 'delete',
      // Tell the server we're sending JSON data
      headers: { 'Content-Type': 'application/json' },
      // Convert the date into JSON using stringify
      body: JSON.stringify({
        name: 'Eric Thomas' // This only deletes items from 'Dan Lok'.
      })
    })
      .then(res => {
        if (res.ok) return res.json()
      })
      .then(response => {
        if (response === 'No quote to delete') {
            messageDiv.textContent = 'Phew! No more Dan Lok quotes left.'
        } else {
            window.location.reload(true) //Automatically refreshed the browser once user clicks the button
        }
      })
      .catch(error => console.error(error))
})