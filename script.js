document.getElementById('fieldSelect').addEventListener('change', function() {
    const selectedField = this.value;
    const conditionInputs = document.getElementById('conditionInputs');
    conditionInputs.innerHTML = '';

    let inputHtml = '';
    if (selectedField === 'date') {
        inputHtml = `
            <label for="startDate">Date de début:</label>
            <input type="date" id="startDate" name="startDate" oninput="checkInput()" value="<?php echo $StartDate;?>">
            <label for="endDate">Date de fin:</label>
            <input type="date" id="endDate" name="endDate" oninput="checkInput()">
        `;
    } else if (selectedField != 'all') {
        inputHtml = `<input type="text" name="conditionValue" id="conditionValue" placeholder="Valeur de condition" oninput="checkInput()" value="<?php echo $ConditionValue;?>">`;
    }

    conditionInputs.innerHTML = inputHtml;

    checkInput();

    // Gérer l'affichage de sqlCodeDisplay en fonction de la sélection
    const sqlCodeDisplay = document.getElementById('sqlCodeDisplay');
    if (selectedField !== 'date') {
        sqlCodeDisplay.style.display = 'none';
    } else {
        sqlCodeDisplay.style.display = 'block';
    }
});


document.getElementById('previewSqlBtn').addEventListener('click', function() {
    const selectedField = document.getElementById('fieldSelect').value;
    console.log("Selected Field:", selectedField);

    let sqlQuery = generateSqlQuery(selectedField);
    console.log("Generated SQL Query:", sqlQuery);

    const sqlCodeDisplay = document.getElementById('sqlCodeDisplay');
    const sqlCode = document.getElementById('sqlCode');
    sqlCode.textContent = sqlQuery;
    sqlCodeDisplay.style.display = 'block';
});
document.getElementById('executeBtn').addEventListener('click', function() {
    const selectedField = document.getElementById('fieldSelect').value;
    let sqlQuery = generateSqlQuery(selectedField);
    
    // Exécuter la requête SQL
    // Remplacez cette partie par votre propre code pour exécuter la requête
    const results = executeQuery(sqlQuery); // Supposons que executeQuery est une fonction qui exécute la requête SQL

    // Afficher les résultats dans le tableau
    const resultTableBody = document.getElementById('resultTableBody');
    resultTableBody.innerHTML = ''; // Nettoyer le contenu précédent du tableau
    
    for (let i = 0; i < results.length; i++) {
        const row = document.createElement('tr');
        
        // Ajoutez des cellules de données pour chaque champ dans l'enregistrement
        for (const key in results[i]) {
            if (results[i].hasOwnProperty(key)) {
                const cell = document.createElement('td');
                cell.textContent = results[i][key];
                row.appendChild(cell);
            }
        }
        
        // Ajoutez la case à cocher et la classe "glow" (à adapter)
        const checkboxCell = document.createElement('td');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = true; // Par défaut, coché
        checkbox.addEventListener('change', function() {
            if (this.checked) {
                row.classList.add('glow');
            } else {
                row.classList.remove('glow');
            }
        });
        checkboxCell.appendChild(checkbox);
        row.appendChild(checkboxCell);
        
        // Ajoutez la ligne au tableau
        resultTableBody.appendChild(row);
    }

    // Afficher le tableau
    document.getElementById('resultTable').style.display = 'block';
});







//probleme ici avec le return de cette fonction
function generateSqlQuery(selectedField) {
    //console.log("Selected Field:", selectedField);

    let sqlQuery = '';
    const tableName = 'facebook_infos.users';
    const dateField = 'date';

    
    if (selectedField === 'date') {
        let startDate = document.getElementById('startDate').value;
        let endDate = document.getElementById('endDate').value;
        //console.log("Start Date:", startDate);
        //console.log("End Date:", endDate);
        sqlQuery = `SELECT * FROM ${tableName} WHERE ${dateField} BETWEEN '${startDate}' AND '${endDate}'`;
    }else if (selectedField === 'all') {
        sqlQuery = `SELECT * FROM ${tableName}`; // Sélectionner tous les utilisateurs
    } else if (selectedField) { 
        let conditionValue = document.getElementById('conditionValue').value;
        //console.log("Condition Value:", conditionValue);
        sqlQuery = `SELECT * FROM ${tableName} WHERE ${selectedField} = '${conditionValue}'`;
    }

    console.log("Generated SQL Query:", sqlQuery);

    return sqlQuery;
}


function checkInput() {
    const inputs = document.querySelectorAll('#conditionInputs input');
    const allFilled = Array.from(inputs).every(input => input.value.trim() !== '');
    const selectedField = document.getElementById('fieldSelect').value;
    const executeBtn = document.getElementById('executeBtn');
    const previewBtn = document.getElementById('previewSqlBtn');

    if (selectedField && allFilled) {
        executeBtn.removeAttribute('disabled');
        executeBtn.classList.remove('inactive');
        previewBtn.style.opacity = 1;
        previewBtn.style.display = 'block';
        previewBtn.classList.remove('inactive');
    } else if (selectedField== 'all'){
        executeBtn.removeAttribute('disabled');
        executeBtn.classList.remove('inactive');
        previewBtn.style.opacity = 1;
        previewBtn.style.display = 'block';
        previewBtn.classList.remove('inactive');
    }else {
        executeBtn.setAttribute('disabled', 'disabled');
        executeBtn.classList.add('inactive');
        previewBtn.style.opacity = 0;
        setTimeout(() => {
            previewBtn.style.display = 'none';
        }, 300);
        previewBtn.classList.add('inactive');
    }
}


checkInput();
window.onload = function() {
    const selectedField = document.getElementById('fieldSelect').value;
    const executeBtn = document.getElementById('executeBtn');
    const previewBtn = document.getElementById('previewSqlBtn');
    // Réinitialiser les valeurs des inputs à leur état par défaut
    
    // Réinitialiser la sélection du dropdown menu à sa valeur par défaut
    document.getElementById('fieldSelect').selectedIndex = 0;

    // Réinitialiser l'état des boutons à leur état par défaut
    executeBtn.setAttribute('disabled', 'disabled');
    executeBtn.classList.add('inactive');
    setTimeout(() => {
    previewBtn.style.display = 'none';
    }, 300);
    previewBtn.style.display = 'none';
    previewBtn.classList.add('inactive');
    previewBtn.style.opacity = 0;
    //document.getElementById('bouton1').disabled = false;
    //document.getElementById('bouton2').disabled = true;
}
function executeQuery(sqlQuery) {
    $.ajax({
        url: 'execute_query.php', // Chemin vers le script PHP qui exécutera la requête SQL
        method: 'POST',
        data: { sqlQuery: sqlQuery },
        dataType: 'json',
        success: function(response) {
            displayResults(response);
        },
        error: function(xhr, status, error) {
            console.error('Erreur lors de l\'exécution de la requête SQL :', error);
        }
    });
}

function displayResults(results) {
    const tableBody = $('#resultTableBody');
    tableBody.empty(); // Nettoyer le contenu précédent du tableau

    $.each(results, function(index, row) {
        const tr = $('<tr>');
        $.each(row, function(key, value) {
            tr.append($('<td>').text(value));
        });
        tableBody.append(tr);
    });

    $('#resultTable').show(); // Afficher le tableau des résultats
}

// Appel à la fonction executeQuery avec la requête SQL générée
$('#executeBtn').click(function() {
    const selectedField = $('#fieldSelect').val();
    const sqlQuery = generateSqlQuery(selectedField);
    executeQuery(sqlQuery);
});

