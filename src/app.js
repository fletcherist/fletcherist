(function (){
	console.log('vanya privet!')
	const techbox = document.querySelector('#tech')

	const boxWords = [
		'react.js', 'angular 1.x', 'd3.js', 'redux', 'dan abramov',
		'canvas', 'audioCtx api', 'mobx', 'mongodb', 'nodejs', 'mean stack',
		'express.js', 'koa.js', 'react-native'
	]

	const selectWord = () => {
		return boxWords[Math.floor(Math.random() * boxWords.length)]
	}

	let latestWordIndex = undefined

	const iterateOverWord = word => {
		if (word === latestWordIndex) {
			return iterateOverWord(selectWord())
		}
		techbox.innerHTML = ''
		let i = 0
		let a = word.length
		const interval = setInterval(() => {
			techbox.innerHTML = techbox.innerHTML + word[i]
			if (i === a - 1) {
				
				clearInterval(interval)
				setTimeout(() => {
					latestWordIndex = boxWords.indexOf(word)
					iterateOverWord(selectWord())
				}, 1000)
			}
			i++
		}, 50)		
	}
	iterateOverWord(selectWord())
})()
