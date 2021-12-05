let grid = document.querySelector('.grid');
let colorPicker = document.querySelector('#colorPicker');
let btns = document.querySelectorAll('.btn');
let colorBtn = document.querySelector('#colorBtn');
let blackBtn = document.querySelector('#blackBtn');
let rainbowBtn = document.querySelector('#rainbowBtn');
let gridBtn = document.querySelector('#gridBtn');
let clearBtn = document.querySelector('#clearBtn');
let eraserBtn = document.querySelector('#eraserBtn');

let gridSize = document.getElementById('gridSizeInput').value;

let gridSizeInput = document.getElementById('gridSizeInput');
let sizeLabel = document.getElementById('sizeLabel');

let gridView = true;
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
		case 'eraser':
			cell.style.background = '#fff';
			break;
	}
};

let drawGrid = (grid, gridSize) => {
	grid.style.cssText += `
        grid-template-columns: repeat(${gridSize}, 1fr); 
        grid-template-rows: repeat(${gridSize}, 1fr);
    `;

	for (let i = 0; i < Math.pow(gridSize, 2); i++) {
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

	sizeLabel.innerHTML = `<span>
                        ${gridSize} x ${gridSize}
                    </span>`;
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
	} else if (colorMode === 'eraser') {
		eraserBtn.classList.add('active');
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

eraserBtn.addEventListener('click', () => {
	colorMode = 'eraser';
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

gridSizeInput.addEventListener(
	'change',
	function () {
		gridSize = document.getElementById('gridSizeInput').value;
		sizeLabel = document.getElementById('sizeLabel').innerHTML = `<span>
                        ${gridSize} x ${gridSize}
                    </span>`;
		clearGrid();
	},
	false
);

drawGrid(grid, gridSize);
activateButton(colorMode);
