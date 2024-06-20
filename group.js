document.addEventListener('DOMContentLoaded', () => {
    const firstNameInput = document.getElementById('firstName');
    const lastNameInput = document.getElementById('lastName');
    const saveButton = document.getElementById('saveButton');
    const displayContainer = document.getElementById('displayContainer');

    let displayData = []; // Variable to hold the current display data

    // Load saved data from localStorage
    function loadSavedData() {
        const savedData = localStorage.getItem('displayData');
        if (savedData) {
            displayData = JSON.parse(savedData);
            displayData.forEach(item => {
                createDisplayBox(item.id, item.firstName, item.lastName, item.fine, item.timestamp);
            });
        }
    }

    function saveDataToLocalStorage() {
        localStorage.setItem('displayData', JSON.stringify(displayData));
    }

    function createDisplayBox(id, firstName, lastName, fine = '', timestamp = Date.now()) {
        const existingDisplayBox = displayContainer.querySelector(`.display-box[data-id="${id}"]`);
        if (existingDisplayBox) {
            return; // Do not create if already exists
        }

        const displayBox = document.createElement('div');
        displayBox.className = 'display-box';
        displayBox.dataset.id = id;
        displayBox.dataset.timestamp = timestamp;
        displayBox.innerHTML = `
            <p>Имя: ${firstName}</p>
            <p>Фамилия: ${lastName}</p>
            <input type="text" class="fine-input" name="fine" value="${fine}">
            <button class="save-fine-button">Сохранить Штраф</button>
            <p class="fine-text" style="display: ${fine ? 'block' : 'none'};">Штраф: ${fine}</p>
            <button class="delete-button">Удалить</button>
        `;

        const deleteButton = displayBox.querySelector('.delete-button');
        deleteButton.addEventListener('click', () => {
            displayContainer.removeChild(displayBox);
            displayData = displayData.filter(item => item.id !== id); // Update displayData
            saveDataToLocalStorage();
        });

        const saveFineButton = displayBox.querySelector('.save-fine-button');
        saveFineButton.addEventListener('click', () => {
            const fineInput = displayBox.querySelector('.fine-input');
            const fineText = displayBox.querySelector('.fine-text');
            fineText.textContent = `Штраф: ${fineInput.value}`;
            fineText.style.display = 'block';
            fineInput.style.display = 'none';
            saveFineButton.style.display = 'none';
            displayData = displayData.map(item => {
                if (item.id === id) {
                    return { ...item, fine: fineInput.value };
                }
                return item;
            });
            saveDataToLocalStorage();
        });

        displayContainer.appendChild(displayBox);

        const timeRemaining = 60 * 1000 - (Date.now() - timestamp);
        setTimeout(() => {
            displayBox.classList.add('red');
        }, timeRemaining > 0 ? timeRemaining : 0);

        // Add to displayData only if it's a new item
        const existingItem = displayData.find(item => item.id === id);
        if (!existingItem) {
            displayData.push({ id, firstName, lastName, fine, timestamp });
        }
    }

    saveButton.addEventListener('click', () => {
        const firstName = firstNameInput.value.trim();
        const lastName = lastNameInput.value.trim();
        if (firstName !== "" && lastName !== "") {
            const existingItem = displayData.find(item => item.firstName === firstName && item.lastName === lastName);
            if (!existingItem) {
                const id = Date.now(); // Generate unique ID (timestamp)
                createDisplayBox(id, firstName, lastName);
            } else {
                alert('Bu Yazuv bor');
            }
            firstNameInput.value = '';
            lastNameInput.value = '';
            saveDataToLocalStorage(); // Save data after adding new item
        }
    });

    loadSavedData(); // Load saved data on page load
});
