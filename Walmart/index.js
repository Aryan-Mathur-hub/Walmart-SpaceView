document.getElementById('bgUpload').addEventListener('change', function(event) {
    const room = document.getElementById('room');
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function(e) {
        const imageUrl = e.target.result;
        room.style.backgroundImage = `url(${imageUrl})`;
    };

    if (file) {
        reader.readAsDataURL(file);
    }
});

document.getElementById('objimage').addEventListener('click', function(event) {
    const room = document.getElementById('room');
    const imageUrl = document.getElementById('objimage').getAttribute("src");
    const tableContainer = createResizableImage(imageUrl);
    tableContainer.setAttribute("draggable", "true")
    room.appendChild(tableContainer);
});

function createResizableImage(imageUrl) {
    const tableContainer = document.createElement('div');
    tableContainer.classList.add('resizable');

    const table = document.createElement('img');
    table.src = imageUrl;
    table.classList.add('table');
    table.draggable = true;
    table.height=300;
    table.width=300;
    const resizers = ['top-left', 'top-right', 'bottom-left', 'bottom-right'];
    resizers.forEach(position => {
        const resizer = document.createElement('div');
        resizer.classList.add('resizer', position);
        resizer.addEventListener('mousedown', startResize);
        tableContainer.appendChild(resizer);
    });

    tableContainer.appendChild(table);

    // tableContainer.addEventListener('dragstart', function(event) {
    //     event.dataTransfer.setData('text/plain', null);
    // });

    tableContainer.addEventListener('dragend', function(event) {
        const rect = document.getElementById('room').getBoundingClientRect();
        const x = event.clientX - rect.left - tableContainer.offsetWidth / 2;
        const y = event.clientY - rect.top - tableContainer.offsetHeight / 2;

        tableContainer.style.left = `${x}px`;
        tableContainer.style.top = `${y}px`;
    });

    return tableContainer;
}

let currentResizer;

function startResize(event) {
    event.preventDefault();
    currentResizer = event.target;
    const resizable = currentResizer.parentElement;

    const originalWidth = parseFloat(getComputedStyle(resizable, null).getPropertyValue('width').replace('px', ''));
    const originalHeight = parseFloat(getComputedStyle(resizable, null).getPropertyValue('height').replace('px', ''));
    const originalX = resizable.getBoundingClientRect().left;
    const originalY = resizable.getBoundingClientRect().top;
    const originalMouseX = event.pageX;
    const originalMouseY = event.pageY;

    function resize(event) {
        const dx = event.pageX - originalMouseX;
        const dy = event.pageY - originalMouseY;

        if (currentResizer.classList.contains('bottom-right')) {
            resizable.style.width = originalWidth + dx + 'px';
            resizable.style.height = originalHeight + dy + 'px';
        } else if (currentResizer.classList.contains('bottom-left')) {
            resizable.style.width = originalWidth - dx + 'px';
            resizable.style.height = originalHeight + dy + 'px';
            resizable.style.left = originalX + dx + 'px';
        } else if (currentResizer.classList.contains('top-right')) {
            resizable.style.width = originalWidth + dx + 'px';
            resizable.style.height = originalHeight - dy + 'px';
            resizable.style.top = originalY + dy + 'px';
        } else if (currentResizer.classList.contains('top-left')) {
            resizable.style.width = originalWidth - dx + 'px';
            resizable.style.height = originalHeight - dy + 'px';
            resizable.style.top = originalY + dy + 'px';
            resizable.style.left = originalX + dx + 'px';
        }
    }

    function stopResize() {
        window.removeEventListener('mousemove', resize);
        window.removeEventListener('mouseup', stopResize);
    }

    window.addEventListener('mousemove', resize);
    window.addEventListener('mouseup', stopResize);
}

document.getElementById("objimage").setAttribute("src",localStorage.getItem("ImageURL"))