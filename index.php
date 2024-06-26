<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>SKRT - Requête Dynamique</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
<?php
 /*   if(isset($_POST['fieldSelect'])){
        $selectedField = $_POST['fieldSelect'];

    }
    if(isset($_POST['executeBtn'])){
       creation_table_result();
    }*/
?>

    <div class="container">
        <form id="queryForm" action="#" method="post">
            <select name="fieldSelect" id="fieldSelect" value="<?php echo $selectedField;?>">
                <option value="">Sélectionner un champ</option>
                <option value="psid">senderpsid</option>
                <option value="user_id">userid</option>
                <option value="date">date</option>
                <option value="location">location</option>
                <option value="all">all</option>
            </select>

            <div id="conditionInputs"></div>

            <button type="button" id="previewSqlBtn" style="display: none;">Aperçu SQL</button>
        </form>
    </div>

    <div id="sqlCodeDisplay" class="sql-code-display">
        <h2>Code SQL</h2>
        <pre id="sqlCode"></pre>
        <button id="btnModifier" style="background-color: blue">Modifier</button>
        <div id="btnActions" style="display: none;">
        <button id="btnValider" style="background-color: green;">Valider les changements</button>
        <button id="btnAnnuler" style="background-color: red;">Annuler les changements</button>
    </div>
</div>
    </div>
    <button id="executeBtn">Exécuter</button>
    <div id="resultat"></div>    

    <script src="jquery-3.6.0.min.js"></script>
    <script src="script.js"></script>
</body>
</html>