document.addEventListener('DOMContentLoaded', () => {
    const firstNameInput = document.getElementById('firstName');
    const lastNameInput = document.getElementById('lastName');
    const saveButton = document.getElementById('saveButton');
    const displayContainer = document.getElementById('displayContainer');

    // Load saved data from localStorage
    function loadSavedData() {
        const savedData = localStorage.getItem('displayData');
        if (savedData) {
            const displayData = JSON.parse(savedData);
            displayData.forEach(item => {
                createDisplayBox(item.firstName, item.lastName, item.fine, item.timestamp);
            });
        }
    }
    saveButton.addEventListener('click', () => {
        const firstName = firstNameInput.value.trim();
        const lastName = lastNameInput.value.trim();
        if (firstName !== "" && lastName !== "") {
            const data = { firstName, lastName };
            localStorage.setItem('oquvchiData', JSON.stringify(data));
            window.location.href = 'oquvchi.html';
        } else {
            alert('Пожалуйста, заполните все поля.');
        }
    });

    function saveDataToLocalStorage() {
        const displayData = [];
        const displayBoxes = displayContainer.querySelectorAll('.display-box');
        displayBoxes.forEach(box => {
            const firstName = box.querySelector('p:nth-child(1)').textContent.replace('Имя: ', '');
            const lastName = box.querySelector('p:nth-child(2)').textContent.replace('Фамилия: ', '');
            const fine = box.querySelector('.fine-text').textContent.replace('Штраф: ', '');
            const timestamp = box.dataset.timestamp;
            displayData.push({ firstName, lastName, fine, timestamp });
        });
        localStorage.setItem('displayData', JSON.stringify(displayData));
    }

    function createDisplayBox(firstName, lastName, fine = '', timestamp = Date.now()) {
        const displayBox = document.createElement('div');
        displayBox.className = 'display-box';
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
            saveDataToLocalStorage();
        });

        displayContainer.appendChild(displayBox);

        const timeRemaining = 60 * 1000 - (Date.now() - timestamp);
        setTimeout(() => {
            displayBox.classList.add('red');
        }, timeRemaining > 0 ? timeRemaining : 0);

        saveDataToLocalStorage();
    }

    saveButton.addEventListener('click', () => {
        const firstName = firstNameInput.value.trim();
        const lastName = lastNameInput.value.trim();
        if (firstName !== "" && lastName !== "") {
            createDisplayBox(firstName, lastName);
            firstNameInput.value = ''; 
            lastNameInput.value = ''; 
        }
    });

    loadSavedData();
});


  