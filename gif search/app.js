const submit = document.querySelector('.sub')
const container = document.querySelector('.container')


const getGifs = () => {
    const input = document.querySelector('input')
    const count = 12

    let finalUrl = `https://api.giphy.com/v1/gifs/search?api_key=Bx0Ij8dEPbx3hHScgw1VHrAOiP3ZeKZc&q=${input.value}&limit=${count}&offset=0&rating=g&lang=en&bundle=messaging_non_clips`
    container.innerHTML = ''
    fetch(finalUrl)
    .then(data => data.json())
    .then(item => {
        item.data.forEach(gif => {
            const div = document.createElement('div')
            div.classList.add('gif')
            const imageDiv = document.createElement('div')
            imageDiv.classList.add('image')
            const img = document.createElement('img')
            img.src = gif.images.original.url
            const btn = document.createElement('button')
            btn.classList.add('copy')
            btn.textContent = 'Copy Link'
            imageDiv.appendChild(img)
            div.appendChild(imageDiv)
            div.appendChild(btn)
            container.appendChild(div)
            input.value = ''

            btn.addEventListener('click', (e) => {
                const tempTextArea = document.createElement('textarea');
                tempTextArea.value = gif.images.original.url;
                document.body.appendChild(tempTextArea);
                tempTextArea.select();
                document.execCommand('copy');
                document.body.removeChild(tempTextArea);
                
                e.target.textContent = 'Copied';

            })
        })
    })
}

submit.addEventListener('click', () => {
    const loader = document.querySelector('.loader')
    loader.style.display = 'block'
    container.innerHTML = ''
    setTimeout(() => {  
        loader.style.display = 'none'
        getGifs()   
    }, 2000)
      
})

window.onload = () => {
    getGifs()
}