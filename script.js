let grid = document.querySelector('.grid');
let colorPicker = document.querySelector('#colorPicker');
let btns = document.querySelectorAll('.btn');
let colorBtn = document.querySelector('#colorBtn');
let blackBtn = document.querySelector('#blackBtn');
let rainbowBtn = document.querySelector('#rainbowBtn');
let gridBtn = document.querySelector('#gridBtn');
let clearBtn = document.querySelector('#clearBtn');

let gridSize = 16 * 16;
let gridView = false;
let userColor = '#e66465';
let colorMode = 'color';

let watchColorPicker = (e) => {
	userColor = e.target.value;
	colorMode = 'color';
	activateButton();
};

let randomColor = () => {
	var o = Math.round,
		r = Math.random,
		s = 255;
	return 'rgb(' + o(r() * s) + ',' + o(r() * s) + ',' + o(r() * s) + ')';
};

let changeCellColor = (cell) => {
	switch (colorMode) {
		case 'color':
			cell.style.background = userColor;
			break;
		case 'black':
			cell.style.background = '#000';
			break;
		case 'rainbow':
			cell.style.background = randomColor();
			break;
	}
};

let drawGrid = (grid, gridSize) => {
	for (let i = 0; i < gridSize; i++) {
		let cell = document.createElement('div');
		cell.classList.add('cell');

		if (gridView) {
			cell.classList.add('cell--border');
		}

		cell.addEventListener('mouseenter', (e) => {
			changeCellColor(e.target);
		});
		grid.appendChild(cell);
	}
};

let clearGrid = () => {
	grid.innerHTML = '';
	drawGrid(grid, gridSize);
};

let activateButton = (colorMode) => {
	btns.forEach((btn) => {
		btn.classList.remove('active');
	});

	if (colorMode === 'color') {
		colorBtn.classList.add('active');
	} else if (colorMode === 'black') {
		blackBtn.classList.add('active');
	} else if (colorMode === 'rainbow') {
		rainbowBtn.classList.add('active');
	}
};

colorBtn.addEventListener('click', () => {
	colorMode = 'color';
	activateButton(colorMode);
});

blackBtn.addEventListener('click', () => {
	colorMode = 'black';
	activateButton(colorMode);
});

rainbowBtn.addEventListener('click', () => {
	colorMode = 'rainbow';
	activateButton(colorMode);
});

clearBtn.addEventListener('click', clearGrid);

gridBtn.addEventListener('click', () => {
	let cells = document.querySelectorAll('.cell');

	cells.forEach((cell) => {
		cell.classList.toggle('cell--border');
	});

	gridView = !gridView;
});

colorPicker.addEventListener('input', watchColorPicker, false);

drawGrid(grid, gridSize);
activateButton(colorMode);
