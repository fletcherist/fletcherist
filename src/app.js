const app = document.querySelector('#app')

for (var i = 0; i < 5; i++) {
	const el = document.createElement('li')
	const el2 = document.createElement('li')

	const ul = document.createElement('ul')
	ul.id = 'list'

	const text = document.createTextNode(Math.floor(Math.random() * 100).toString())

	app.appendChild(ul)

	el.appendChild(text)


	ul.appendChild(el)
	ul.appendChild(el)
	ul.appendChild(el)
	ul.appendChild(el2)
	ul.appendChild(el2)
	ul.appendChild(el2)
}